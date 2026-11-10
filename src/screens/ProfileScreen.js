import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../stores/authStore';
import { useRunStore } from '../stores/runStore';

/**
 * Profile page: shows the signed-in user's account info and run stats.
 * Links back to Settings (logout) via the tab bar.
 */
export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const runs = useRunStore((s) => s.runs);

  const totalDistanceM = runs.reduce((sum, r) => sum + (r.distanceM || 0), 0);
  const totalRuns = runs.length;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Profil</Text>
        {user ? (
          <>
            <Text style={styles.fieldLabel}>Nom d'utilisateur</Text>
            <Text style={styles.fieldValue}>{user.username}</Text>
            <Text style={styles.fieldLabel}>E-mail</Text>
            <Text style={styles.fieldValue}>{user.email}</Text>
            <Text style={styles.fieldLabel}>Membre depuis</Text>
            <Text style={styles.fieldValue}>
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
            </Text>
          </>
        ) : (
          <Text style={styles.fieldValue}>Non connecté</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Vos courses</Text>
        <View style={styles.statRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{totalRuns}</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {(totalDistanceM / 1000).toFixed(2)} km
            </Text>
            <Text style={styles.statLabel}>Distance totale</Text>
          </View>
        </View>
        {totalRuns === 0 && (
          <Text style={styles.empty}>Aucune course enregistrée pour l'instant.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 16,
  },
  card: {
    backgroundColor: '#F6F6F6',
    borderRadius: 14,
    padding: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginTop: 12,
  },
  fieldValue: {
    fontSize: 17,
    color: '#111',
    marginTop: 4,
  },
  statRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  stat: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1DB954',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  empty: {
    color: '#999',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});
