import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HistoryStackParams } from '../../app/RootNavigator';
import type { Run } from '../../shared/types';
import { runsApi } from './api';
import { errorText } from '../../shared/api/client';
import {
  Brand,
  Button,
  ErrorNotice,
  Page,
  duration,
  km,
  s,
} from '../../shared/ui';
export function HistoryScreen({
  navigation,
}: NativeStackScreenProps<HistoryStackParams, 'History'>) {
  const [runs, setRuns] = useState<Run[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const load = useCallback(async () => {
    setBusy(true);
    setError('');
    try {
      setRuns((await runsApi.list()).runs);
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );
  return (
    <Page>
      <Brand />
      <Text style={s.title}>Chaque sortie compte.</Text>
      <View style={s.card}>
        <Text style={s.eyebrow}>VOTRE ACTIVITÉ</Text>
        <Text style={s.big}>
          {km(runs.reduce((sum, r) => sum + r.distance_m, 0))} km
        </Text>
        <Text style={s.muted}>{runs.length} course(s) enregistrée(s)</Text>
      </View>
      <View style={s.row}>
        <Text style={s.h2}>Vos courses</Text>
      </View>
      <Button
        title="Actualiser"
        secondary
        busy={busy}
        onPress={() => {
          void load();
        }}
      />
      <ErrorNotice message={error} />
      {!busy && !error && !runs.length && (
        <View style={s.card}>
          <Text style={s.h2}>Le premier pas est le vôtre.</Text>
          <Text style={s.muted}>
            Démarrez une course dans l’onglet Courir. Votre historique sera
            synchronisé ici.
          </Text>
        </View>
      )}
      {runs.map(run => (
        <View key={run.id} style={s.card}>
          <Text style={s.muted}>
            {new Date(run.started_at).toLocaleString('fr-FR')}
          </Text>
          <Text style={s.h2}>
            {km(run.distance_m)} km · {duration(run.duration_ms)}
          </Text>
          <Button
            title="Voir le parcours →"
            secondary
            onPress={() => navigation.navigate('RunDetail', { id: run.id })}
          />
        </View>
      ))}
    </Page>
  );
}
