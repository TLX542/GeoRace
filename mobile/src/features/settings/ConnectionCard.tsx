import React, { useState } from 'react';
import { Text, View } from 'react-native';
import {
  errorText,
  getBaseUrl,
  request,
  saveApiUrl,
} from '../../shared/api/client';
import { Button, ErrorNotice, Field, s } from '../../shared/ui';
export function ConnectionCard() {
  const [url, setUrl] = useState(getBaseUrl());
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function connect() {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      await saveApiUrl(url);
      const health = await request<{ status: string }>('/health');
      if (health.status !== 'ok') {
        throw new Error('Réponse /health inattendue.');
      }
      setMessage('Backend connecté · /health OK');
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <View style={s.card}>
      <Text style={s.h2}>Connexion au backend</Text>
      <Text style={s.muted}>
        Émulateur Android : 10.0.2.2:3000. Simulateur iOS : localhost:3000. Sur
        téléphone, utilisez l’IP locale de votre ordinateur, sur le même Wi-Fi.
      </Text>
      <Field
        label="Adresse API"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="url"
      />
      <Button
        title="Enregistrer et tester"
        busy={busy}
        secondary
        onPress={() => {
          void connect();
        }}
      />
      <ErrorNotice message={error} />
      {!!message && <Text style={s.text}>{message}</Text>}
    </View>
  );
}
