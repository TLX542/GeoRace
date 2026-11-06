import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useSession } from '../auth/SessionProvider';
import { Button, ErrorNotice, Page, s } from '../../shared/ui';
import { errorText, getBaseUrl } from '../../shared/api/client';
export function SettingsScreen() {
  const { user, logout } = useSession();
  const [error, setError] = useState('');
  return (
    <Page>
      <Text style={s.eyebrow}>VOTRE ESPACE</Text>
      <Text style={s.title}>{user?.username}</Text>
      <View style={s.card}>
        <Text style={s.h2}>Profil coureur</Text>
        <Text style={s.text}>{user?.email}</Text>
        <Text style={s.muted}>
          Compte créé le{' '}
          {user && new Date(user.createdAt).toLocaleDateString('fr-FR')}
        </Text>
      </View>
      <View style={s.card}>
        <Text style={s.h2}>Environnement local</Text>
        <Text selectable style={s.muted}>
          {getBaseUrl()}
        </Text>
        <Text style={s.muted}>
          Déconnectez-vous pour modifier l’adresse API. Le suivi GPS fonctionne
          au premier plan et se met en pause lorsque vous quittez l’application.
        </Text>
      </View>
      <View style={s.card}>
        <Text style={s.h2}>Et la Ghost Race ?</Text>
        <Text style={s.muted}>
          Le backend actuel gère vos comptes et vos sorties. Le matchmaking, les
          duels et le classement seront connectés lorsque leurs API seront
          disponibles.
        </Text>
      </View>
      <ErrorNotice message={error} />
      <Button
        title="Me déconnecter"
        secondary
        onPress={() => {
          void logout().catch(e => setError(errorText(e)));
        }}
      />
    </Page>
  );
}
