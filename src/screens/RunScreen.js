import React, { useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapRun from '../components/MapRun';
import RunControls from '../components/RunControls';
import GhostHUD from '../components/GhostHUD';
import DebugHUD from '../components/DebugHUD';
import CheckpointToast from '../components/CheckpointToast';
import ResultsModal from '../components/ResultsModal';
import { useRunStore, buildCheckpoints } from '../stores/runStore';
import { ghostDistanceAtTime, ghostPositionAtTime, ghostTimeAtDistance, buildGhostFromDummy, buildGhostFromPrefab, buildGhostFromPrefabAsync, buildGhostFromRun } from '../services/ghost';
import { PREFAB_GHOSTS } from '../data/prefab-ghosts';
import { ensureLocationPermissions, getCurrentLocation, getLastKnownLocation } from '../services/location';

export default function RunScreen() {
  const init = useRunStore((s) => s.init);
  const startRun = useRunStore((s) => s.startRun);
  const stopRun = useRunStore((s) => s.stopRun);
  const pauseRun = useRunStore((s) => s.pauseRun);
  const resumeRun = useRunStore((s) => s.resumeRun);
  const dismissResults = useRunStore((s) => s.dismissResults);
  const isRunning = useRunStore((s) => s.isRunning);
  const starting = useRunStore((s) => s.starting);
  const startCountdown = useRunStore((s) => s.startCountdown);
  const distanceM = useRunStore((s) => s.distanceM);
  const elapsedMs = useRunStore((s) => s.elapsedMs);
  const points = useRunStore((s) => s.points);
  const startCoord = useRunStore((s) => s.startCoord);
  const ghostRun = useRunStore((s) => s.ghostRun);
  const checkpoints = useRunStore((s) => s.checkpoints);
  const lastLocation = useRunStore((s) => s.lastLocation);
  const lastUpdateMs = useRunStore((s) => s.lastUpdateMs);
  const ghostMode = useRunStore((s) => s.ghostMode);
  const lastRun = useRunStore((s) => s.lastRun);
  const raceFinished = useRunStore((s) => s.raceFinished);
  const raceResults = useRunStore((s) => s.raceResults);
  const lastCrossedCheckpoint = useRunStore((s) => s.lastCrossedCheckpoint);

  const [previewGhost, setPreviewGhost] = useState(null);
  const [previewCoord, setPreviewCoord] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(tabBarHeight, insets.bottom);

  useEffect(() => {
    init();
  }, [init]);

  // Fetch an initial device location so the recenter button works even before
  // a run starts (the store's lastLocation is only populated during a run).
  useEffect(() => {
    let cancelled = false;
    getLastKnownLocation()
      .then((loc) => {
        if (cancelled || !loc?.coords) return;
        setUserLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadPreview = async () => {
      if (isRunning) return;
      if (ghostMode === 'last' && lastRun) {
        const preview = buildGhostFromRun(lastRun);
        if (!cancelled) setPreviewGhost(preview);
        return;
      }

      if (ghostMode.startsWith('prefab:')) {
        const id = ghostMode.replace('prefab:', '');
        const prefab = PREFAB_GHOSTS.find((g) => g.id === id);
        const preview = await buildGhostFromPrefabAsync(prefab);
        if (!cancelled) setPreviewGhost(preview);
        return;
      }

      if (ghostMode === 'dummy') {
        const ok = await ensureLocationPermissions();
        if (!ok) return;
        try {
          const loc = await getCurrentLocation();
          const coord = { lat: loc.coords.latitude, lng: loc.coords.longitude };
          const preview = buildGhostFromDummy(coord);
          if (!cancelled) {
            setPreviewCoord(coord);
            setPreviewGhost(preview);
          }
        } catch (e) {
          // ignore preview errors
        }
      }
    };

    loadPreview();
    return () => {
      cancelled = true;
    };
  }, [ghostMode, lastRun, isRunning]);

  const activeGhost = isRunning ? ghostRun : previewGhost;
  const ghostPosition = useMemo(
    () => (isRunning ? ghostPositionAtTime(activeGhost, elapsedMs) : null),
    [activeGhost, elapsedMs, isRunning]
  );
  const ghostDistance = useMemo(
    () => (isRunning ? ghostDistanceAtTime(activeGhost, elapsedMs) : 0),
    [activeGhost, elapsedMs, isRunning]
  );
  // Time delta: how many ms the player is behind (+) or ahead (-) of the ghost
  // at the player's current distance. ghostTimeAtDistance gives the ghost's
  // elapsed time when it covered the same distance the player has covered so far.
  const deltaMs = useMemo(() => {
    if (!isRunning || !activeGhost) return 0;
    const ghostElapsedAtPlayerDist = ghostTimeAtDistance(activeGhost, distanceM);
    return elapsedMs - ghostElapsedAtPlayerDist;
  }, [activeGhost, distanceM, elapsedMs, isRunning]);
  const showGhost = isRunning && !!activeGhost;

  // Show preview checkpoints when not in a run, active checkpoints when running/starting
  const previewCheckpoints = useMemo(
    () => (isRunning || starting ? [] : buildCheckpoints(previewGhost)),
    [previewGhost, isRunning, starting]
  );
  const activeCheckpoints = isRunning || starting ? checkpoints : previewCheckpoints;

  const handleStart = async () => {
    const result = await startRun();
    if (!result.ok) {
      if (result.error === 'not_at_start') {
        Alert.alert('GPS', 'Move to the start point to begin the race.');
      } else {
        const message =
          result.error === 'permission'
            ? "Active les permissions de localisation pour demarrer un run."
            : "GPS indisponible. Active le service de localisation et reessaie.";
        Alert.alert('GPS', message);
      }
    }
  };

  const handleStop = async () => {
    await stopRun();
  };

  const handlePause = async () => {
    await pauseRun();
  };

  const handleResume = async () => {
    const result = await resumeRun();
    if (!result.ok) {
      Alert.alert('GPS', 'GPS indisponible. Active le service de localisation et reessaie.');
    }
  };

  return (
    <View style={styles.container}>
      <MapRun
        startCoord={startCoord || previewCoord}
        ghostPoints={activeGhost?.points}
        ghostPosition={ghostPosition}
        checkpoints={activeCheckpoints}
        lastLocation={lastLocation || userLocation}
      />
      {showGhost ? <GhostHUD deltaMs={deltaMs} /> : null}
      {/* Checkpoint crossing toast */}
      <CheckpointToast checkpoint={lastCrossedCheckpoint} hasGhost={!!activeGhost} />
      <RunControls
        isRunning={isRunning}
        distanceM={distanceM}
        elapsedMs={elapsedMs}
        onStart={handleStart}
        onStop={handleStop}
        starting={starting}
        startCountdown={startCountdown}
        bottomInset={3}
      />
      {/* Race results modal – shown when all checkpoints are crossed */}
      <ResultsModal visible={raceFinished} results={raceResults} onDismiss={dismissResults} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
