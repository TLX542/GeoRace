import dummy from '../data/dummy-ghost.json';
import { EPITECH_NANCY_ANCHOR } from '../data/prefab-ghosts';
import { distanceMeters, offsetLatLng } from '../utils/distance';
import { fetchRoutePoints } from './routing';

export function buildGhostFromCheckpoints(
  checkpoints,
  paceMsPerKm = 360000 /* 6:00/km */,
  ghostCheckpointTimes = null
) {
  if (!checkpoints || checkpoints.length < 2) return null;

  const useTimes =
    Array.isArray(ghostCheckpointTimes) && ghostCheckpointTimes.length === checkpoints.length;

  let total = 0;
  const points = checkpoints.map((cp, idx) => {
    if (idx === 0) return { lat: cp.lat, lng: cp.lng, t: 0 };
    total += distanceMeters(checkpoints[idx - 1], cp);
    const t = useTimes ? ghostCheckpointTimes[idx] : Math.round((total / 1000) * paceMsPerKm);
    return { lat: cp.lat, lng: cp.lng, t };
  });

  const distanceM = Math.round(total);
  const durationMs = points[points.length - 1]?.t ?? 0;

  return withCumulativeDistances({
    id: 'checkpoint-route',
    startedAt: Date.now(),
    durationMs,
    distanceM,
    points,
    checkpoints: checkpoints.map((cp) => ({ lat: cp.lat, lng: cp.lng })),
  });
}

/**
 * Builds a ghost route where the path between checkpoints follows actual
 * roads, using the OSRM public routing API.
 *
 * Falls back to straight-line (buildGhostFromCheckpoints) when the network
 * request fails or returns no geometry.
 *
 * @param {Array<{lat: number, lng: number}>} checkpoints
 * @param {number} paceMsPerKm
 * @param {Array<number>|null} ghostCheckpointTimes  Optional cumulative ms at each checkpoint
 */
export async function buildGhostFromCheckpointsAsync(
  checkpoints,
  paceMsPerKm = 360000 /* 6:00/km */,
  ghostCheckpointTimes = null
) {
  if (!checkpoints || checkpoints.length < 2) return null;

  const routePoints = await fetchRoutePoints(checkpoints);

  // Fall back to straight-line when routing is unavailable
  if (!routePoints || routePoints.length < 2) {
    return buildGhostFromCheckpoints(checkpoints, paceMsPerKm, ghostCheckpointTimes);
  }

  return _buildGhostFromRoutePoints(routePoints, checkpoints, paceMsPerKm, ghostCheckpointTimes);
}

/** @private */
function _buildGhostFromRoutePoints(routePoints, checkpoints, paceMsPerKm, ghostCheckpointTimes = null) {
  const useTimes =
    Array.isArray(ghostCheckpointTimes) && ghostCheckpointTimes.length === checkpoints.length;

  if (!useTimes) {
    // Simple uniform pace: assign t proportional to cumulative distance
    let total = 0;
    const points = routePoints.map((p, idx) => {
      if (idx === 0) return { lat: p.lat, lng: p.lng, t: 0 };
      total += distanceMeters(routePoints[idx - 1], p);
      const t = Math.round((total / 1000) * paceMsPerKm);
      return { lat: p.lat, lng: p.lng, t };
    });

    const distanceM = Math.round(total);
    const durationMs = points[points.length - 1]?.t ?? 0;

    return withCumulativeDistances({
      id: 'checkpoint-route',
      startedAt: Date.now(),
      durationMs,
      distanceM,
      points,
      checkpoints: checkpoints.map((cp) => ({ lat: cp.lat, lng: cp.lng })),
    });
  }

  // --- ghostCheckpointTimes provided ---
  // For each checkpoint, find the nearest road point (searching forward from
  // the previous boundary to keep boundaries monotonically non-decreasing).
  const boundaries = [0];
  for (let s = 1; s < checkpoints.length; s++) {
    const cp = checkpoints[s];
    let minDist = Infinity;
    let nearestIdx = boundaries[s - 1];
    for (let i = boundaries[s - 1]; i < routePoints.length; i++) {
      const d = distanceMeters(routePoints[i], cp);
      if (d < minDist) {
        minDist = d;
        nearestIdx = i;
      }
    }
    boundaries.push(nearestIdx);
  }

  // Compute cumulative distances along the road route
  const cumDist = [0];
  for (let i = 1; i < routePoints.length; i++) {
    cumDist.push(cumDist[i - 1] + distanceMeters(routePoints[i - 1], routePoints[i]));
  }

  // Assign times: within each checkpoint segment interpolate linearly by distance
  let segIdx = 0;
  const points = routePoints.map((p, i) => {
    // Advance to the segment whose end boundary is beyond i
    while (segIdx < boundaries.length - 2 && i > boundaries[segIdx + 1]) {
      segIdx++;
    }

    const fromIdx = boundaries[segIdx];
    const toIdx = boundaries[segIdx + 1];
    const tStart = ghostCheckpointTimes[segIdx];
    const tEnd = ghostCheckpointTimes[segIdx + 1];

    const segDistStart = cumDist[fromIdx];
    const segDistEnd = cumDist[toIdx];
    const segDist = segDistEnd - segDistStart;

    const ratio = segDist > 0 ? (cumDist[i] - segDistStart) / segDist : 0;
    const t = Math.round(tStart + ratio * (tEnd - tStart));
    return { lat: p.lat, lng: p.lng, t };
  });

  const distanceM = Math.round(cumDist[cumDist.length - 1]);
  const durationMs = ghostCheckpointTimes[ghostCheckpointTimes.length - 1];

  return withCumulativeDistances({
    id: 'checkpoint-route',
    startedAt: Date.now(),
    durationMs,
    distanceM,
    points,
    checkpoints: checkpoints.map((cp) => ({ lat: cp.lat, lng: cp.lng })),
  });
}

export function buildGhostFromDummy(startCoord) {
  if (!startCoord) return null;
  const points = dummy.points.map((p) => {
    const pos = offsetLatLng(startCoord, p.dx, p.dy);
    return { lat: pos.lat, lng: pos.lng, t: p.t };
  });

  return withCumulativeDistances({
    id: 'dummy',
    startedAt: Date.now(),
    durationMs: dummy.durationMs,
    distanceM: dummy.distanceM,
    points,
  });
}

export function buildGhostFromRun(run) {
  if (!run || !run.points || run.points.length === 0) return null;
  return withCumulativeDistances(run);
}

export function buildGhostFromPrefab(prefab, anchor) {
  if (!prefab) return null;

  // Checkpoint-based prefab: build route directly from checkpoints
  if (prefab.checkpoints && prefab.checkpoints.length > 0) {
    const paceMsPerKm = prefab.paceMsPerKm || 360000;
    const ghost = buildGhostFromCheckpoints(
      prefab.checkpoints,
      paceMsPerKm,
      prefab.ghostCheckpointTimes ?? null
    );
    return ghost ? { ...ghost, id: prefab.id } : null;
  }

  if (!prefab.points || prefab.points.length === 0) return null;
  const hasLatLng = prefab.points[0].lat !== undefined && prefab.points[0].lng !== undefined;
  const base = anchor || EPITECH_NANCY_ANCHOR;
  const rawPoints = hasLatLng
    ? prefab.points.map((p) => ({ lat: p.lat, lng: p.lng, t: p.t ?? 0 }))
    : prefab.points.map((p) => {
        const pos = offsetLatLng(base, p.dx, p.dy);
        return { lat: pos.lat, lng: pos.lng, t: p.t ?? 0 };
      });

  const paceMsPerKm = prefab.paceMsPerKm || 360000;
  let total = 0;
  const points = rawPoints.map((p, idx) => {
    if (idx === 0) return { ...p, t: 0 };
    total += distanceMeters(rawPoints[idx - 1], p);
    const t = Math.round((total / 1000) * paceMsPerKm);
    return { ...p, t };
  });

  const distanceM = Math.round(total);
  const durationMs = points[points.length - 1]?.t ?? 0;

  return withCumulativeDistances({
    id: prefab.id,
    startedAt: Date.now(),
    durationMs,
    distanceM,
    points,
  });
}

/**
 * Async version of buildGhostFromPrefab.
 * For checkpoint-based prefabs, the ghost path follows actual roads via OSRM.
 * Falls back to straight-line if the network request fails.
 */
export async function buildGhostFromPrefabAsync(prefab, anchor) {
  if (!prefab) return null;

  if (prefab.checkpoints && prefab.checkpoints.length >= 2) {
    const paceMsPerKm = prefab.paceMsPerKm || 360000;
    const ghost = await buildGhostFromCheckpointsAsync(
      prefab.checkpoints,
      paceMsPerKm,
      prefab.ghostCheckpointTimes ?? null
    );
    return ghost ? { ...ghost, id: prefab.id } : null;
  }

  // Points-based prefab - synchronous path is sufficient
  return buildGhostFromPrefab(prefab, anchor);
}

export function withCumulativeDistances(run) {
  const cum = [];
  let total = 0;
  for (let i = 0; i < run.points.length; i += 1) {
    if (i > 0) {
      total += distanceMeters(run.points[i - 1], run.points[i]);
    }
    cum.push(total);
  }
  return { ...run, cumDistances: cum };
}

export function ghostPositionAtTime(run, elapsedMs) {
  if (!run || !run.points || run.points.length === 0) return null;
  const t = Math.min(elapsedMs, run.durationMs);
  for (let i = 1; i < run.points.length; i += 1) {
    const prev = run.points[i - 1];
    const next = run.points[i];
    if (t <= next.t) {
      const ratio = (t - prev.t) / Math.max(1, next.t - prev.t);
      return {
        lat: prev.lat + (next.lat - prev.lat) * ratio,
        lng: prev.lng + (next.lng - prev.lng) * ratio,
      };
    }
  }
  return run.points[run.points.length - 1];
}

export function ghostDistanceAtTime(run, elapsedMs) {
  if (!run || !run.cumDistances || run.cumDistances.length === 0) return 0;
  const t = Math.min(elapsedMs, run.durationMs);
  for (let i = 1; i < run.points.length; i += 1) {
    const prev = run.points[i - 1];
    const next = run.points[i];
    if (t <= next.t) {
      const ratio = (t - prev.t) / Math.max(1, next.t - prev.t);
      const prevD = run.cumDistances[i - 1];
      const nextD = run.cumDistances[i];
      return prevD + (nextD - prevD) * ratio;
    }
  }
  return run.cumDistances[run.cumDistances.length - 1];
}

/**
 * Returns the ghost's elapsed time (ms) when it has covered the given
 * distance.  This is the inverse of ghostDistanceAtTime and is used to
 * compute the live time-delta between the player and the ghost.
 *
 * @param {{ points: Array<{t:number}>, cumDistances: number[] }} ghostRun
 * @param {number} distanceM
 * @returns {number} milliseconds
 */
export function ghostTimeAtDistance(ghostRun, distanceM) {
  if (!ghostRun?.cumDistances?.length) return 0;
  const maxDist = ghostRun.cumDistances[ghostRun.cumDistances.length - 1];
  const d = Math.min(distanceM, maxDist);
  for (let i = 1; i < ghostRun.cumDistances.length; i += 1) {
    const prevD = ghostRun.cumDistances[i - 1];
    const nextD = ghostRun.cumDistances[i];
    if (d <= nextD) {
      const ratio = (d - prevD) / Math.max(1, nextD - prevD);
      const prevT = ghostRun.points[i - 1].t;
      const nextT = ghostRun.points[i].t;
      return prevT + (nextT - prevT) * ratio;
    }
  }
  return ghostRun.points[ghostRun.points.length - 1].t;
}

/**
 * Returns the ghost's elapsed time (ms since race start) when it passes
 * the point on its route that is closest to checkpointLatLng.
 *
 * For checkpoint-based ghosts the returned value is exact because each
 * checkpoint IS a ghost route point.  For route-based ghosts it is the
 * time of the nearest sampled point, which is a close approximation.
 *
 * @param {{ points: Array<{lat:number,lng:number,t:number}> }} ghostRun
 * @param {{ lat: number, lng: number }} checkpointLatLng
 * @returns {number} milliseconds
 */
export function ghostTimeAtCheckpoint(ghostRun, checkpointLatLng) {
  if (!ghostRun?.points?.length) return 0;
  let minDist = Infinity;
  let closestT = 0;
  for (const p of ghostRun.points) {
    const d = distanceMeters(p, checkpointLatLng);
    if (d < minDist) {
      minDist = d;
      closestT = p.t;
    }
  }
  return closestT;
}
