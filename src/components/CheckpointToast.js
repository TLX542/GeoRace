import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

/**
 * Formats a millisecond delta as +M:SS (behind) or -M:SS (ahead of ghost).
 * A positive delta means the player was slower than the ghost.
 */
function formatDelta(ms) {
  const sign = ms >= 0 ? '+' : '-';
  const totalSeconds = Math.floor(Math.abs(ms) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${sign}${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Briefly animated overlay shown when the player crosses a checkpoint.
 *
 * Props:
 *   checkpoint – { idx, playerTimeMs, ghostTimeMs, deltaMs }  or null
 *   hasGhost   – boolean, whether a ghost run is active
 *
 * The toast appears as soon as `checkpoint` becomes non-null and
 * auto-dismisses after VISIBLE_DURATION_MS.
 */
const VISIBLE_DURATION_MS = 5000;
const FADE_DURATION_MS = 400;

export default function CheckpointToast({ checkpoint, hasGhost }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const lastIdx = useRef(null);

  useEffect(() => {
    if (!checkpoint) return;
    // Only animate when the checkpoint index actually changes
    if (checkpoint.idx === lastIdx.current) return;
    lastIdx.current = checkpoint.idx;

    // Reset and animate in
    opacity.setValue(0);
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: FADE_DURATION_MS,
        useNativeDriver: true,
      }),
      Animated.delay(VISIBLE_DURATION_MS - FADE_DURATION_MS * 2),
      Animated.timing(opacity, {
        toValue: 0,
        duration: FADE_DURATION_MS,
        useNativeDriver: true,
      }),
    ]).start();
  }, [checkpoint, opacity]);

  if (!checkpoint) return null;

  const ahead = checkpoint.deltaMs < 0;
  const deltaStr = formatDelta(checkpoint.deltaMs);

  return (
    <Animated.View style={[styles.container, { opacity }]} pointerEvents="none">
      <Text style={styles.title}>✓ Checkpoint {checkpoint.idx + 1}</Text>
      {hasGhost ? (
        <>
          <Text style={[styles.delta, ahead ? styles.ahead : styles.behind]}>
            {deltaStr} vs ghost
          </Text>
          <Text style={[styles.caption, ahead ? styles.ahead : styles.behind]}>
            {ahead ? '🟢 Ahead of ghost' : '🔴 Behind ghost'}
          </Text>
        </>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
    backgroundColor: 'rgba(10,10,26,0.9)',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  delta: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
  },
  caption: {
    fontSize: 12,
    marginTop: 2,
  },
  ahead: {
    color: '#1DB954',
  },
  behind: {
    color: '#E74C3C',
  },
});
