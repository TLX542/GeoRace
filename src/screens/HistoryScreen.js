import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRunStore } from '../stores/runStore';
import { formatDuration } from '../utils/time';

export default function HistoryScreen() {
  const runs = useRunStore((s) => s.runs);
  const reloadRuns = useRunStore((s) => s.reloadRuns);

  useFocusEffect(
    useCallback(() => {
      reloadRuns();
    }, [reloadRuns])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique</Text>
      <FlatList
        data={runs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Aucun run enregistré.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.8}>
            <Text style={styles.cardTitle}>Run {new Date(item.startedAt).toLocaleString()}</Text>
            <Text style={styles.cardMeta}>{(item.distanceM / 1000).toFixed(2)} km</Text>
            <Text style={styles.cardMeta}>{formatDuration(item.durationMs)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  list: {
    paddingBottom: 24,
  },
  empty: {
    color: '#666',
    marginTop: 12,
  },
  card: {
    backgroundColor: '#F6F6F6',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  cardMeta: {
    color: '#444',
  },
});
