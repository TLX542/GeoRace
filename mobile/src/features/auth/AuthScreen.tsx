import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useSession } from './SessionProvider';
import { errorText } from '../../shared/api/client';
import { Brand, Button, ErrorNotice, Field, Page, s } from '../../shared/ui';
import { ConnectionCard } from '../settings/ConnectionCard';
export function AuthScreen() {
  const { authenticate, expired } = useSession();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function submit() {
    setError('');
    if (
      !email.trim().includes('@') ||
      password.length < 8 ||
      password.length > 200 ||
      (register && (!username.trim() || username.trim().length > 50))
    ) {
      setError(
        'Vérifiez votre email, le mot de passe (8 à 200 caractères) et le pseudo (1 à 50 caractères).',
      );
      return;
    }
    setBusy(true);
    try {
      await authenticate(email, password, register ? username : undefined);
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Page>
      <Brand />
      <Text style={s.title}>Votre prochaine{'\n'}victoire commence ici.</Text>
      <Text style={s.muted}>
        Enregistrez vos sorties. Retrouvez vos progrès. Courez à votre rythme.
      </Text>
      <View style={s.card}>
        <Text style={s.h2}>
          {register ? 'Rejoindre la course' : 'Heureux de vous revoir'}
        </Text>
        {expired && (
          <Text style={s.muted}>
            Votre session a expiré. Reconnectez-vous pour continuer.
          </Text>
        )}
        {register && (
          <Field
            label="Pseudo"
            value={username}
            onChangeText={setUsername}
            maxLength={50}
            autoComplete="username"
          />
        )}
        <Field
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          maxLength={254}
        />
        <Field
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete={register ? 'new-password' : 'current-password'}
          maxLength={200}
        />
        <ErrorNotice message={error} />
        <Button
          title={register ? 'Créer mon compte' : 'Me connecter'}
          busy={busy}
          onPress={() => {
            void submit();
          }}
        />
        <Button
          title={register ? 'J’ai déjà un compte' : 'Créer un compte'}
          secondary
          disabled={busy}
          onPress={() => {
            setRegister(!register);
            setError('');
          }}
        />
      </View>
      <ConnectionCard />
    </Page>
  );
}
