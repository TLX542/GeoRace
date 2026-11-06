import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HistoryStackParams } from '../../app/RootNavigator';
import type { Run } from '../../shared/types';
import { runsApi } from './api';
import { RouteTrace } from './RouteTrace';
import { errorText } from '../../shared/api/client';
import { Button, ErrorNotice, Page, duration, km, s } from '../../shared/ui';
export function RunDetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<HistoryStackParams, 'RunDetail'>) {
  const [run, setRun] = useState<Run>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function load() {
    setBusy(true);
    setError('');
    try {
      setRun((await runsApi.get(route.params.id)).run);
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    void load();
  }, [route.params.id]); // eslint-disable-line react-hooks/exhaustive-deps
  async function remove() {
    setBusy(true);
    try {
      await runsApi.remove(route.params.id);
      navigation.goBack();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Page>
      <Text style={s.title}>Votre sortie</Text>
      <ErrorNotice message={error} />
      {run ? (
        <>
          <Text style={s.muted}>
            {new Date(run.started_at).toLocaleString('fr-FR')}
          </Text>
          <View style={s.card}>
            <Text style={s.big}>{km(run.distance_m)} km</Text>
            <Text style={s.h2}>{duration(run.duration_ms)} de course</Text>
          </View>
          <RouteTrace points={run.points} />
          <Button
            title="Supprimer cette course"
            secondary
            busy={busy}
            onPress={() =>
              Alert.alert(
                'Supprimer la course ?',
                'Cette suppression est définitive.',
                [
                  { text: 'Annuler', style: 'cancel' },
                  {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: () => {
                      void remove();
                    },
                  },
                ],
              )
            }
          />
        </>
      ) : (
        <Button
          title="Charger la course"
          busy={busy}
          onPress={() => {
            void load();
          }}
        />
      )}
    </Page>
  );
}
