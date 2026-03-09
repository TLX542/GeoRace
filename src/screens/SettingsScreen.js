import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRunStore } from '../stores/runStore';
import { PREFAB_GHOSTS } from '../data/prefab-ghosts';

export default function SettingsScreen() {
  const ghostMode = useRunStore((s) => s.ghostMode);
  const setGhostMode = useRunStore((s) => s.setGhostMode);
  const clearAllRuns = useRunStore((s) => s.clearAllRuns);

  const handleClear = () => {
    Alert.alert('Supprimer les runs', 'Effacer tout l\'historique local ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: () => clearAllRuns() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.section}>Parcours Nancy (prefab)</Text>
      <View style={styles.column}>
        {PREFAB_GHOSTS.map((ghost) => {
          const key = `prefab:${ghost.id}`;
          return (
            <TouchableOpacity
              key={ghost.id}
              style={[styles.choiceFull, ghostMode === key && styles.choiceActive]}
              onPress={() => setGhostMode(key)}
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
