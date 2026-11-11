import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../stores/authStore';
import { useRunStore } from '../stores/runStore';
import { PREFAB_GHOSTS } from '../data/prefab-ghosts';

export default function SettingsScreen() {
  const ghostMode = useRunStore((s) => s.ghostMode);
  const setGhostMode = useRunStore((s) => s.setGhostMode);
  const setRefreshPreview = useRunStore((s) => s.setRefreshPreview);
  const clearAllRuns = useRunStore((s) => s.clearAllRuns);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleClear = () => {
    Alert.alert('Supprimer les runs', 'Effacer tout l\'historique local ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: () => clearAllRuns() },
    ]);
  };

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Voulez-vous vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Déconnecter', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {user && (
        <>
          <Text style={styles.section}>Compte</Text>
          <Text style={styles.accountText}>{user.username} ({user.email})</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.section}>Parcours Nancy (prefab)</Text>
      <View style={styles.column}>
        {PREFAB_GHOSTS.map((ghost) => {
          const key = `prefab:${ghost.id}`;
          return (
            <TouchableOpacity
              key={ghost.id}
              style={[styles.choiceFull, ghostMode === key && styles.choiceActive]}
              onPress={() => {
                setGhostMode(key);
                setRefreshPreview(true);
              }}
            >
              <Text style={styles.choiceText}>{ghost.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.section}>Donnees locales</Text>
      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearText}>Supprimer l'historique</Text>
      </TouchableOpacity>
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
  section: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '600',
    color: '#333',
  },
  column: {
    gap: 10,
  },
  accountText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
    marginTop: 4,
  },
  logoutButton: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FDECEA',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E74C3C',
  },
  logoutText: {
    color: '#E74C3C',
    fontWeight: '700',
  },
  choiceFull: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  choiceActive: {
    borderColor: '#4A90E2',
    backgroundColor: '#EAF2FD',
  },
  choiceText: {
    fontWeight: '600',
  },
  clearButton: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FDECEA',
    borderRadius: 10,
    alignItems: 'center',
  },
  clearText: {
    color: '#E74C3C',
    fontWeight: '700',
  },
});
