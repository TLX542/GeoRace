import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function formatCoord(value) {
  if (value === null || value === undefined) return '--';
  return value.toFixed(5);
}

export default function DebugHUD({ pointsCount, lastLocation, lastUpdateMs }) {
  const now = Date.now();
  const secondsAgo = lastUpdateMs ? Math.max(0, Math.round((now - lastUpdateMs) / 1000)) : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GPS Debug</Text>
      <Text style={styles.line}>Points: {pointsCount}</Text>
      <Text style={styles.line}>Lat: {formatCoord(lastLocation?.lat)}</Text>
      <Text style={styles.line}>Lng: {formatCoord(lastLocation?.lng)}</Text>
      <Text style={styles.line}>Accuracy: {lastLocation?.accuracy ?? '--'} m</Text>
      <Text style={styles.line}>Speed: {lastLocation?.speed ?? '--'} m/s</Text>
      <Text style={styles.line}>Update: {secondsAgo !== null ? `${secondsAgo}s` : '--'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  line: {
    color: '#fff',
    fontSize: 11,
  },
});
