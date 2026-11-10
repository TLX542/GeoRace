import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useAuthStore } from '../stores/authStore';

/**
 * Login page: existing users sign in with email + password.
 *
 * Props:
 *   onRegister – called when the user taps "create an account"
 */
export default function LoginScreen({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((s) => s.login);
  const error = useAuthStore((s) => s.error);

  const handleLogin = async () => {
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.ok) {
      Alert.alert('Connexion échouée', result.error || 'Réessayez plus tard.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.subtitle}>Connectez-vous à GeoRace</Text>

        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="prenom@exemple.com"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} disabled={loading} onPress={handleLogin}>
          <Text style={styles.buttonText}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <Text style={styles.dividerText}>ou</Text>
        </View>

        <TouchableOpacity style={styles.outlineButton} onPress={onRegister}>
          <Text style={styles.outlineButtonText}>Créer un compte</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    gap: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111',
    marginBottom: 4,
  },
  errorBanner: {
    width: '100%',
    backgroundColor: '#FDECEA',
    borderColor: '#E74C3C',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    alignSelf: 'stretch',
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 13,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1DB954',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  outlineButton: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#1DB954',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  outlineButtonText: {
    color: '#1DB954',
    fontSize: 17,
    fontWeight: '700',
  },
  divider: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerText: {
    color: '#999',
    fontSize: 13,
    marginHorizontal: 8,
  },
});
