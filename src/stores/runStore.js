import { create } from 'zustand';
import { distanceMeters } from '../utils/distance';
import { ensureLocationPermissions, startLocationWatch, getLastKnownLocation } from '../services/location';
import { clearRuns, loadRuns, saveRun } from '../services/storage';
import { buildGhostFromDummy, buildGhostFromPrefab, buildGhostFromPrefabAsync, buildGhostFromRun, ghostTimeAtCheckpoint } from '../services/ghost';
import { PREFAB_GHOSTS } from '../data/prefab-ghosts';
import { paceFrom } from '../utils/time';

const CHECKPOINT_RADIUS_METERS = 20;
const START_PROXIMITY_METERS = 30;
const START_COUNTDOWN_SECONDS = 5;

function makePoint(location, startTime, pausedMs) {
  return {
    lat: location.coords.latitude,
    lng: location.coords.longitude,
    t: Math.max(0, Date.now() - startTime - (pausedMs || 0)),
  };
}

export function buildCheckpoints(ghostRun, count = 4) {
  // If the ghost run was built from explicit checkpoints, use them directly
  if (ghostRun?.checkpoints?.length) {
    return ghostRun.checkpoints.map((cp) => ({ lat: cp.lat, lng: cp.lng, reached: false }));
  }

  const points = ghostRun?.points;
  if (!points?.length) return [];

  // Not enough interior points - fall back to evenly spaced
  if (points.length <= count + 2) {
    const step = Math.max(1, Math.floor(points.length / (count + 1)));
    const result = [];
    for (let i = 1; i <= count && i * step < points.length; i++) {
      const p = points[i * step];
      result.push({ lat: p.lat, lng: p.lng, reached: false });
    }
    return result;
  }

  // Smoothing window: ~1/15 of the route length, minimum 2 points.
  // The divisor 15 was chosen so ~5-7 points are averaged on a typical
  // 80-100 point GPS trace, smoothing out per-sample jitter.
  const k = Math.max(2, Math.floor(points.length / 15));

  // Compute a heading-change score at every interior point using the
  // direction (prev→curr) vs (curr→next) over the smoothing window.
  const scores = [];
  for (let i = k; i < points.length - k; i++) {
    const prev = points[i - k];
    const curr = points[i];
    const next = points[i + k];

    const h1 = Math.atan2(curr.lng - prev.lng, curr.lat - prev.lat);
    const h2 = Math.atan2(next.lng - curr.lng, next.lat - curr.lat);

    let diff = Math.abs(h2 - h1);
    if (diff > Math.PI) diff = 2 * Math.PI - diff;

    scores.push({ idx: i, score: diff });
  }

  // Sort by turn angle descending so we consider the sharpest turns first
  scores.sort((a, b) => b.score - a.score);

  // Enforce minimum index separation so checkpoints are spread along the route
  const minSep = Math.floor(points.length / (count + 1));
  const selected = [];
  for (const s of scores) {
    if (selected.length >= count) break;
    const tooClose = selected.some((sel) => Math.abs(sel.idx - s.idx) < minSep);
    if (!tooClose) selected.push(s);
  }

  // Fill any remaining slots with evenly spaced points (edge case: flat route).
  // Use half of minSep so fill points don't cluster with already-selected turns.
  if (selected.length < count) {
    const step = Math.floor(points.length / (count + 1));
    // fillMinSep: at least 3 indices apart so fills don't collapse on a
    // single spot; capped to half of minSep so they don't crowd detected turns.
    const fillMinSep = Math.max(3, Math.floor(minSep / 2));
    for (let i = 1; i <= count && selected.length < count; i++) {
      const idx = i * step;
      const tooClose = selected.some((sel) => Math.abs(sel.idx - idx) < fillMinSep);
      if (!tooClose) selected.push({ idx, score: 0 });
    }
  }

  // Return in route order (ascending index)
  selected.sort((a, b) => a.idx - b.idx);
  return selected.map(({ idx }) => ({
    lat: points[idx].lat,
    lng: points[idx].lng,
    reached: false,
  }));
}

export const useRunStore = create((set, get) => {
  // Holds data needed by doActualStart() after the countdown finishes
  let _pendingStart = null;

  /**
   * Computes the checkpoint objects that were newly crossed in this update,
   * enriching each with playerTimeMs, ghostTimeMs, and deltaMs.
   */
  function applyCheckpointCrossings(checkpoints, nextPoint, ghostRun) {
    let lastCrossed = null;
    // Only allow crossing the next expected checkpoint (sequential order).
    // Find the first unreached checkpoint; checkpoints before it must be
    // reached before this one can be credited.
    const nextIdx = checkpoints.findIndex((cp) => !cp.reached);
    if (nextIdx === -1) return { updatedCheckpoints: checkpoints, lastCrossed };

    const updated = checkpoints.map((cp, idx) => {
      if (cp.reached) return cp;
      // Skip checkpoints that aren't the next one in sequence
      if (idx !== nextIdx) return cp;
      const d = distanceMeters({ lat: nextPoint.lat, lng: nextPoint.lng }, cp);
      if (d <= CHECKPOINT_RADIUS_METERS) {
        const playerTimeMs = nextPoint.t;
        const ghostTimeMs = ghostTimeAtCheckpoint(ghostRun, cp);
        const deltaMs = playerTimeMs - ghostTimeMs;
        lastCrossed = { idx, playerTimeMs, ghostTimeMs, deltaMs };
        return { ...cp, reached: true, reachedAt: Date.now(), playerTimeMs, ghostTimeMs, deltaMs };
      }
      return cp;
    });
    return { updatedCheckpoints: updated, lastCrossed };
  }

  /**
   * Saves the run, computes race results, and marks the race as finished.
   * Called automatically when all checkpoints are crossed.
   */
  async function finalizeRace(finalCheckpoints) {
    const state = get();
    // Clean up active timers / subscription
    state.watchSubscription?.remove();
    if (state.timerId) clearInterval(state.timerId);

    const totalTimeMs = state.elapsedMs;
    const totalDistanceM = state.distanceM;
    const totalGhostTimeMs = state.ghostRun?.durationMs ?? 0;
    const totalDeltaMs = totalTimeMs - totalGhostTimeMs;

    const checkpointStats = finalCheckpoints.map((cp, idx) => ({
      index: idx + 1,
      playerTimeMs: cp.playerTimeMs ?? 0,
      ghostTimeMs: cp.ghostTimeMs ?? 0,
      deltaMs: cp.deltaMs ?? 0,
    }));

    const raceResults = {
      totalTimeMs,
      totalGhostTimeMs,
      totalDeltaMs,
      totalDistanceM,
      avgPace: paceFrom(totalDistanceM, totalTimeMs),
      checkpoints: checkpointStats,
    };

    const run = {
      id: `${state.startTime}`,
      startedAt: state.startTime,
      durationMs: totalTimeMs,
      distanceM: totalDistanceM,
      points: state.points,
      raceResults,
    };

    const runs = await saveRun(run);

    set({
      isRunning: false,
      isPaused: false,
      watchSubscription: null,
      timerId: null,
      lastRun: run,
      runs,
      raceFinished: true,
      raceResults,
      checkpoints: finalCheckpoints,
      pausedMs: 0,
      pauseStartedAt: null,
      skipNextDistance: false,
    });
  }

  // Called after the countdown reaches zero; performs the actual run initialisation
  async function doActualStart() {
    const pending = _pendingStart;
    _pendingStart = null;
    if (!pending) return;

    const { cachedCoords, ghostRun, checkpoints, startCoord } = pending;
    const startTime = Date.now();
    const hasCached = !!cachedCoords;
    const startPoint = hasCached
      ? { lat: cachedCoords.latitude, lng: cachedCoords.longitude, t: 0 }
      : null;

    set({
      isRunning: true,
      starting: false,
      startTime,
      elapsedMs: 0,
      distanceM: 0,
      points: startPoint ? [startPoint] : [],
      startCoord,
      ghostRun,
      checkpoints,
      lastLocation: startPoint
        ? {
            lat: startPoint.lat,
            lng: startPoint.lng,
            accuracy: cachedCoords.accuracy ?? null,
            speed: cachedCoords.speed ?? null,
          }
        : null,
      lastUpdateMs: startPoint ? Date.now() : null,
      pausedMs: 0,
      pauseStartedAt: null,
      skipNextDistance: false,
      raceFinished: false,
      raceResults: null,
      lastCrossedCheckpoint: null,
    });

    const timerId = setInterval(() => {
      const state = get();
      if (!state.isRunning) return;
      if (state.isPaused) return;
      set({ elapsedMs: Date.now() - state.startTime - state.pausedMs });
    }, 1000);

    let subscription;
    try {
      subscription = await startLocationWatch((location) => {
        const state = get();
        if (!state.isRunning || state.isPaused) return;
        const nextPoint = makePoint(location, state.startTime, state.pausedMs);
        const lastPoint = state.points[state.points.length - 1];

        if (!lastPoint) {
          const coord = { lat: nextPoint.lat, lng: nextPoint.lng };
          const nextGhost =
            !state.ghostRun && state.ghostMode === 'dummy' ? buildGhostFromDummy(coord) : state.ghostRun;
          const updatedCheckpoints =
            state.checkpoints.length === 0 ? buildCheckpoints(nextGhost) : state.checkpoints;
          set({
            points: [nextPoint],
            startCoord: state.startCoord || coord,
            ghostRun: nextGhost,
            checkpoints: updatedCheckpoints,
            lastLocation: {
              lat: nextPoint.lat,
              lng: nextPoint.lng,
              accuracy: location.coords.accuracy ?? null,
              speed: location.coords.speed ?? null,
            },
            lastUpdateMs: Date.now(),
            elapsedMs: Date.now() - state.startTime - state.pausedMs,
            skipNextDistance: false,
          });
          return;
        }

        const delta = state.skipNextDistance ? 0 : distanceMeters(lastPoint, nextPoint);
        const { updatedCheckpoints, lastCrossed } = applyCheckpointCrossings(
          state.checkpoints,
          nextPoint,
          state.ghostRun
        );

        const allCrossed =
          updatedCheckpoints.length > 0 && updatedCheckpoints.every((cp) => cp.reached);

        const newLocation = {
          lat: nextPoint.lat,
          lng: nextPoint.lng,
          accuracy: location.coords.accuracy ?? null,
          speed: location.coords.speed ?? null,
        };

        if (allCrossed) {
          // Stop the run timer immediately so the elapsed time is frozen
          set({
            points: [...state.points, nextPoint],
            distanceM: state.distanceM + delta,
            checkpoints: updatedCheckpoints,
            elapsedMs: nextPoint.t,
            lastLocation: newLocation,
            lastUpdateMs: Date.now(),
            lastCrossedCheckpoint: lastCrossed ?? state.lastCrossedCheckpoint,
            skipNextDistance: false,
            isRunning: false,
          });
          // Async: save the run and show results
          finalizeRace(updatedCheckpoints).catch((err) => {
            console.error('[GeoRace] finalizeRace failed:', err);
          });
        } else {
          set({
            points: [...state.points, nextPoint],
            distanceM: state.distanceM + delta,
            checkpoints: updatedCheckpoints,
            lastLocation: newLocation,
            lastUpdateMs: Date.now(),
            elapsedMs: Date.now() - state.startTime - state.pausedMs,
            lastCrossedCheckpoint: lastCrossed ?? state.lastCrossedCheckpoint,
            skipNextDistance: false,
          });
        }
      });
    } catch (e) {
      if (timerId) clearInterval(timerId);
      set({ isRunning: false, starting: false, watchSubscription: null, timerId: null });
      return;
    }

    set({ watchSubscription: subscription, timerId });
  }

  return {
    isRunning: false,
    isPaused: false,
    starting: false,
    startCountdown: 0,
    startCountdownTimerId: null,
    checkpoints: [],
    startTime: null,
    elapsedMs: 0,
    distanceM: 0,
    points: [],
    startCoord: null,
    watchSubscription: null,
    timerId: null,
    runs: [],
    lastRun: null,
    ghostMode: 'prefab:dummy-nancy',
    ghostRun: null,
    lastLocation: null,
    lastUpdateMs: null,
    pausedMs: 0,
    pauseStartedAt: null,
    skipNextDistance: false,
    ghostPaceMsPerKm: 390000,
    // Race completion state
    raceFinished: false,
    raceResults: null,
    lastCrossedCheckpoint: null,

    async init() {
      const runs = await loadRuns();
      set({ runs, lastRun: runs[0] || null });
    },

    setGhostMode(mode) {
      set({ ghostMode: mode });
    },

    setGhostPace(paceMsPerKm) {
      set({ ghostPaceMsPerKm: paceMsPerKm });
    },

    getGhostPrefabs() {
      return PREFAB_GHOSTS;
    },

    /** Dismiss the post-race results screen without resetting the whole run state. */
    dismissResults() {
      set({ raceFinished: false, raceResults: null });
    },

    async startRun() {
      if (get().isRunning || get().starting) return { ok: true };
      const permOk = await ensureLocationPermissions();
      if (!permOk) return { ok: false, error: 'permission' };

      let cached = null;
      try {
        cached = await getLastKnownLocation();
      } catch (e) {
        cached = null;
      }
      const hasCached = !!cached?.coords;
      const startCoord = hasCached
        ? { lat: cached.coords.latitude, lng: cached.coords.longitude }
        : null;

      let ghostRun = null;
      const mode = get().ghostMode;
      if (mode === 'last' && get().lastRun) {
        ghostRun = buildGhostFromRun(get().lastRun);
      } else if (mode === 'dummy') {
        ghostRun = startCoord ? buildGhostFromDummy(startCoord) : null;
      } else if (mode.startsWith('prefab:')) {
        const id = mode.replace('prefab:', '');
        const prefab = PREFAB_GHOSTS.find((g) => g.id === id);
        const pace = get().ghostPaceMsPerKm;
        const prefabWithPace = prefab ? { ...prefab, paceMsPerKm: pace } : null;
        ghostRun = await buildGhostFromPrefabAsync(prefabWithPace, startCoord);
      }

      if (!ghostRun && startCoord) {
        ghostRun = buildGhostFromDummy(startCoord);
      }

      // Prevent start if user is not near the ghost/run start point
      if (ghostRun?.points?.length && startCoord) {
        const ghostStart = ghostRun.points[0];
        const dist = distanceMeters(startCoord, ghostStart);
        if (dist > START_PROXIMITY_METERS) {
          return { ok: false, error: 'not_at_start' };
        }
      }

      const checkpoints = buildCheckpoints(ghostRun);

      _pendingStart = {
        cachedCoords: cached?.coords || null,
        ghostRun,
        checkpoints,
        startCoord,
      };

      set({
        starting: true,
        startCountdown: START_COUNTDOWN_SECONDS,
        startCoord,
        ghostRun,
        checkpoints,
        isRunning: false,
        isPaused: false,
        startTime: null,
        elapsedMs: 0,
        distanceM: 0,
        points: [],
        lastLocation: hasCached
          ? {
              lat: cached.coords.latitude,
              lng: cached.coords.longitude,
              accuracy: cached.coords.accuracy ?? null,
              speed: cached.coords.speed ?? null,
            }
          : null,
        lastUpdateMs: hasCached ? Date.now() : null,
        pausedMs: 0,
        pauseStartedAt: null,
        skipNextDistance: false,
      });

      const countdownTimer = setInterval(() => {
        const current = get();
        if (!current.starting) {
          clearInterval(countdownTimer);
          return;
        }
        const next = current.startCountdown - 1;
        if (next <= 0) {
          clearInterval(countdownTimer);
          set({ startCountdown: 0, startCountdownTimerId: null });
          doActualStart();
        } else {
          set({ startCountdown: next });
        }
      }, 1000);

      set({ startCountdownTimerId: countdownTimer });
      return { ok: true };
    },

    async pauseRun() {
      const state = get();
      if (!state.isRunning || state.isPaused) return { ok: true };
      state.watchSubscription?.remove();
      set({
        isPaused: true,
        watchSubscription: null,
        elapsedMs: Date.now() - state.startTime - state.pausedMs,
        pauseStartedAt: Date.now(),
      });
      return { ok: true };
    },

    async resumeRun() {
      const state = get();
      if (!state.isRunning || !state.isPaused) return { ok: true };
      const now = Date.now();
      const pausedDelta = state.pauseStartedAt ? now - state.pauseStartedAt : 0;
      const nextPausedMs = state.pausedMs + pausedDelta;

      set({
        isPaused: false,
        pausedMs: nextPausedMs,
        pauseStartedAt: null,
        skipNextDistance: true,
      });

      let subscription;
      try {
        subscription = await startLocationWatch((location) => {
          const current = get();
          if (!current.isRunning || current.isPaused) return;
          const nextPoint = makePoint(location, current.startTime, current.pausedMs);
          const lastPoint = current.points[current.points.length - 1];
          const delta = current.skipNextDistance ? 0 : distanceMeters(lastPoint, nextPoint);
          const { updatedCheckpoints, lastCrossed } = applyCheckpointCrossings(
            current.checkpoints,
            nextPoint,
            current.ghostRun
          );

          const allCrossed =
            updatedCheckpoints.length > 0 && updatedCheckpoints.every((cp) => cp.reached);

          const newLocation = {
            lat: nextPoint.lat,
            lng: nextPoint.lng,
            accuracy: location.coords.accuracy ?? null,
            speed: location.coords.speed ?? null,
          };

          if (allCrossed) {
            set({
              points: [...current.points, nextPoint],
              distanceM: current.distanceM + delta,
              checkpoints: updatedCheckpoints,
              elapsedMs: nextPoint.t,
              lastLocation: newLocation,
              lastUpdateMs: Date.now(),
              lastCrossedCheckpoint: lastCrossed ?? current.lastCrossedCheckpoint,
              skipNextDistance: false,
              isRunning: false,
            });
            finalizeRace(updatedCheckpoints).catch((err) => {
              console.error('[GeoRace] finalizeRace failed:', err);
            });
          } else {
            set({
              points: [...current.points, nextPoint],
              distanceM: current.distanceM + delta,
              checkpoints: updatedCheckpoints,
              lastLocation: newLocation,
              lastUpdateMs: Date.now(),
              elapsedMs: Date.now() - current.startTime - current.pausedMs,
              lastCrossedCheckpoint: lastCrossed ?? current.lastCrossedCheckpoint,
              skipNextDistance: false,
            });
          }
        });
      } catch (e) {
        set({ isPaused: true });
        return { ok: false, error: 'gps' };
      }

      set({ watchSubscription: subscription });

      return { ok: true };
    },

    async stopRun() {
      const state = get();

      // Cancel the countdown if still in starting phase
      if (state.starting) {
        if (state.startCountdownTimerId) clearInterval(state.startCountdownTimerId);
        _pendingStart = null;
        set({
          starting: false,
          startCountdown: 0,
          startCountdownTimerId: null,
        });
        return null;
      }

      if (!state.isRunning) return null;
      state.watchSubscription?.remove();
      if (state.timerId) clearInterval(state.timerId);

      const durationMs = state.elapsedMs;
      const run = {
        id: `${state.startTime}`,
        startedAt: state.startTime,
        durationMs,
        distanceM: state.distanceM,
        points: state.points,
      };

      const runs = await saveRun(run);

      set({
        isRunning: false,
        isPaused: false,
        watchSubscription: null,
        timerId: null,
        lastRun: run,
        runs,
        pausedMs: 0,
        pauseStartedAt: null,
        skipNextDistance: false,
      });

      return run;
    },

    async reloadRuns() {
      const runs = await loadRuns();
      set({ runs, lastRun: runs[0] || null });
    },

    async clearAllRuns() {
      await clearRuns();
      set({ runs: [], lastRun: null });
    },

    clearCurrent() {
      const state = get();
      if (state.startCountdownTimerId) clearInterval(state.startCountdownTimerId);
      if (state.timerId) clearInterval(state.timerId);
      _pendingStart = null;
      set({
        isRunning: false,
        isPaused: false,
        starting: false,
        startCountdown: 0,
        startCountdownTimerId: null,
        checkpoints: [],
        startTime: null,
        elapsedMs: 0,
        distanceM: 0,
        points: [],
        startCoord: null,
        ghostRun: null,
        timerId: null,
        lastLocation: null,
        lastUpdateMs: null,
        pausedMs: 0,
        pauseStartedAt: null,
        skipNextDistance: false,
        raceFinished: false,
        raceResults: null,
        lastCrossedCheckpoint: null,
      });
    },
  };
});
