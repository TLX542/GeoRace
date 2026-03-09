import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Formats a millisecond delta as M:SS (unsigned, for display with sign prefix).
 */
function formatTimeDelta(ms) {
  const totalSeconds = Math.floor(Math.abs(ms) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * HUD overlay showing the live time difference between the player and the ghost.
 *
 * Props:
 *   deltaMs – player elapsed time minus ghost elapsed time at the same distance.
 *             Positive  → player is slower (behind ghost).
 *             Negative  → player is faster (ahead of ghost).
 */
export default function GhostHUD({ deltaMs }) {
  // Negative delta means the player has covered their current distance FASTER
  // than the ghost did → player is ahead.
  const ahead = deltaMs < 0;
  const formatted = formatTimeDelta(deltaMs);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ghost</Text>
      <Text style={[styles.value, ahead ? styles.ahead : styles.behind]}>
        {ahead ? '-' : '+'}{formatted}
      </Text>
      <Text style={styles.caption}>{ahead ? 'En avance' : 'En retard'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 12,
    color: '#666',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
  },
  ahead: {
    color: '#1DB954',
  },
  behind: {
    color: '#E74C3C',
  },
  caption: {
    fontSize: 12,
    color: '#666',
  },
});
