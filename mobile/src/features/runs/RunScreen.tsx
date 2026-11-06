import React, { useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSession } from '../auth/SessionProvider';
import { useRecorder } from './useRecorder';
import { runsApi } from './api';
import { RouteTrace } from './RouteTrace';
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
export function RunScreen() {
  const { user } = useSession();
  const recorder = useRecorder(user!.id);
  const { draft, active, ready } = recorder;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const sent = useRef(false);
  async function save() {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      // Once acknowledged, never POST the same draft again if local cleanup fails.
      if (!sent.current) {
        await runsApi.create({
          startedAt: draft.startedAt,
          durationMs: Math.round(draft.durationMs),
          distanceM: draft.distanceM,
          points: draft.points,
        });
        sent.current = true;
      }
      await recorder.clear();
      sent.current = false;
      setMessage('Course enregistrée ! Retrouvez-la dans Activité.');
    } catch (e) {
      setError(
        errorText(e) +
          (sent.current
            ? ' La course est déjà sur le serveur. Réessayez pour nettoyer le brouillon.'
            : ' Votre course reste sur ce téléphone. En cas de délai réseau, vérifiez l’historique avant de réessayer pour éviter un doublon.'),
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <Page>
      <Brand />
      <Text style={s.title}>À vous de{'\n'}donner le rythme.</Text>
      <Text style={s.muted}>
        {active
          ? '● Enregistrement en cours · GPS au premier plan'
          : 'Une sortie, un pas de plus vers votre objectif.'}
      </Text>
      <View style={s.card}>
        <Text style={s.eyebrow}>
          {active
            ? 'COURSE EN DIRECT'
            : draft.durationMs
            ? 'COURSE EN PAUSE'
            : 'PRÊT POUR LE DÉPART'}
        </Text>
        <Text style={s.big}>{duration(draft.durationMs)}</Text>
        <View style={s.row}>
          <View>
            <Text style={s.h2}>{km(draft.distanceM)} km</Text>
            <Text style={s.muted}>Distance</Text>
          </View>
          <View>
            <Text style={s.h2}>
              {draft.distanceM > 0
                ? duration(draft.durationMs / (draft.distanceM / 1000))
                : '—'}
            </Text>
            <Text style={s.muted}>Allure / km</Text>
          </View>
        </View>
      </View>
      <RouteTrace points={draft.points} />
      <ErrorNotice
        message={[recorder.error, error].filter(Boolean).join('\n')}
      />
      {!!message && <Text style={s.text}>{message}</Text>}
      {active ? (
        <Button title="Mettre en pause" onPress={recorder.pause} />
      ) : (
        <>
          <Button
            title={
              draft.durationMs ? 'Reprendre la course' : 'Démarrer ma course'
            }
            busy={busy || !ready}
            disabled={sent.current}
            onPress={() => {
              setBusy(true);
              setMessage('');
              setError('');
              void recorder.start().finally(() => setBusy(false));
            }}
          />
          {draft.durationMs > 0 && (
            <>
              <Button
                title={
                  sent.current
                    ? 'Terminer la sauvegarde locale'
                    : 'Terminer et enregistrer'
                }
                busy={busy}
                onPress={() => {
                  void save();
                }}
              />
              <Button
                title="Abandonner le brouillon"
                secondary
                disabled={busy}
                onPress={() =>
                  Alert.alert(
                    'Abandonner cette sortie ?',
                    'Le brouillon local sera supprimé.',
                    [
                      { text: 'Garder', style: 'cancel' },
                      {
                        text: 'Abandonner',
                        style: 'destructive',
                        onPress: () => {
                          void recorder
                            .clear()
                            .then(() => {
                              sent.current = false;
                              setError('');
                            })
                            .catch(e => setError(errorText(e)));
                        },
                      },
                    ],
                  )
                }
              />
            </>
          )}
        </>
      )}
      <Text style={s.muted}>
        Le suivi se met en pause si l’application passe en arrière-plan.
        Reprenez ici à votre retour. Votre brouillon est sauvegardé localement
        pendant la course.
      </Text>
    </Page>
  );
}
