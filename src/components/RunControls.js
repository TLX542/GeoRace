import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatDuration, paceFrom } from '../utils/time';

export default function RunControls({
  isRunning,
  distanceM,
  elapsedMs,
  onStart,
  onStop,
  starting = false,
  startCountdown = 0,
  bottomInset = 0,
}) {
  const countdownActive = starting || startCountdown > 0;

  return (
    <View style={[styles.container, { paddingBottom: 16 + bottomInset }]}>
      <View style={styles.stats}>
        <View style={styles.statBlock}>
          <Text style={styles.label}>Distance</Text>
          <Text style={styles.value}>{(distanceM / 1000).toFixed(2)} km</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={styles.label}>Temps</Text>
          <Text style={styles.value}>{formatDuration(elapsedMs)}</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={styles.label}>Allure</Text>
          <Text style={styles.value}>{paceFrom(distanceM, elapsedMs)} /km</Text>
        </View>
      </View>

      {!isRunning ? (
        <TouchableOpacity
          style={[styles.button, styles.start, countdownActive && styles.disabled]}
          onPress={onStart}
          disabled={countdownActive}
        >
          <Text style={styles.buttonText}>{startCountdown > 0 ? `${startCountdown}` : 'Start'}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.button, styles.stop]} onPress={onStop}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
    backgroundColor: '#FFFFFF',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statBlock: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  start: {
    backgroundColor: '#1DB954',
  },
  stop: {
    backgroundColor: '#E74C3C',
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
