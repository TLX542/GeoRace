import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatDuration } from '../utils/time';

/**
 * Formats a millisecond delta as +M:SS (behind ghost) or -M:SS (ahead of ghost).
 */
function formatDelta(ms) {
  if (ms == null) return '--:--';
  const sign = ms >= 0 ? '+' : '-';
  const totalSeconds = Math.floor(Math.abs(ms) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${sign}${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Full-screen modal shown when all race checkpoints have been crossed.
 *
 * Props:
 *   visible   – boolean
 *   results   – {
 *                 totalTimeMs, totalGhostTimeMs, totalDeltaMs,
 *                 totalDistanceM, avgPace,
 *                 checkpoints: [{ index, playerTimeMs, ghostTimeMs, deltaMs }]
 *               }
 *   onDismiss – () => void
 */
export default function ResultsModal({ visible, results, onDismiss }) {
  if (!results) return null;

  const {
    totalTimeMs,
    totalGhostTimeMs,
    totalDeltaMs,
    totalDistanceM,
    avgPace,
    checkpoints,
  } = results;

  const beatGhost = totalDeltaMs < 0;

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onDismiss}>
      <View style={styles.root}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Text style={styles.header}>🏁 Race Complete!</Text>

          {/* Summary cards */}
          <View style={styles.cardRow}>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Your time</Text>
              <Text style={styles.cardValue}>{formatDuration(totalTimeMs)}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Ghost time</Text>
              <Text style={styles.cardValue}>{formatDuration(totalGhostTimeMs)}</Text>
            </View>
          </View>

          <View style={styles.cardRow}>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>vs Ghost</Text>
              <Text style={[styles.cardValue, beatGhost ? styles.ahead : styles.behind]}>
                {formatDelta(totalDeltaMs)}
              </Text>
              <Text style={[styles.cardCaption, beatGhost ? styles.ahead : styles.behind]}>
                {beatGhost ? 'Beat ghost 🎉' : 'Ghost was faster'}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Avg pace</Text>
              <Text style={styles.cardValue}>{avgPace} /km</Text>
            </View>
          </View>

          <View style={styles.cardRow}>
            <View style={[styles.card, styles.cardFull]}>
              <Text style={styles.cardLabel}>Distance</Text>
              <Text style={styles.cardValue}>{(totalDistanceM / 1000).toFixed(2)} km</Text>
            </View>
          </View>

          {/* Per-checkpoint table */}
          {checkpoints && checkpoints.length > 0 ? (
            <View style={styles.table}>
              <Text style={styles.tableTitle}>Checkpoint splits</Text>
              {/* Header row */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, styles.tableHeaderText]}>#</Text>
                <Text style={[styles.tableCell, styles.tableHeaderText]}>You</Text>
                <Text style={[styles.tableCell, styles.tableHeaderText]}>Ghost</Text>
                <Text style={[styles.tableCell, styles.tableHeaderText]}>Delta</Text>
              </View>
              {checkpoints.map((cp) => {
                const cpAhead = cp.deltaMs < 0;
                return (
                  <View key={cp.index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{cp.index}</Text>
                    <Text style={styles.tableCell}>{formatDuration(cp.playerTimeMs)}</Text>
                    <Text style={styles.tableCell}>{formatDuration(cp.ghostTimeMs)}</Text>
                    <Text style={[styles.tableCell, cpAhead ? styles.ahead : styles.behind]}>
                      {formatDelta(cp.deltaMs)}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : null}

          {/* Close button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onDismiss}>
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  scroll: {
    padding: 20,
    paddingTop: 48,
    paddingBottom: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: '800',
    color: '#4fc3f7',
    textAlign: 'center',
    marginBottom: 24,
  },
  cardRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#1a237e22',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1a237e',
  },
  cardFull: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 12,
    color: '#81d4fa',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  cardCaption: {
    fontSize: 11,
    marginTop: 2,
  },
  ahead: {
    color: '#1DB954',
  },
  behind: {
    color: '#E74C3C',
  },
  table: {
    marginTop: 16,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1a237e',
    marginBottom: 24,
  },
  tableTitle: {
    color: '#4fc3f7',
    fontSize: 14,
    fontWeight: '700',
    padding: 10,
    backgroundColor: '#1a237e44',
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#1e2a4a',
  },
  tableHeader: {
    backgroundColor: '#1a237e55',
  },
  tableHeaderText: {
    color: '#4fc3f7',
    fontWeight: '700',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
  },
  closeBtn: {
    backgroundColor: '#4fc3f7',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  closeBtnText: {
    color: '#0a0a1a',
    fontSize: 16,
    fontWeight: '800',
  },
});
