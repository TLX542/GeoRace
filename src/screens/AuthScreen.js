import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

/**
 * Auth gate shown when no user is signed in. Toggles between the login and
 * registration forms. Once authenticated, App.js replaces this with the tab
 * navigator.
 */
export default function AuthScreen() {
  const [mode, setMode] = useState('login');

  return (
    <View style={styles.container}>
      {mode === 'login' ? (
        <LoginScreen onRegister={() => setMode('register')} />
      ) : (
        <RegisterScreen onLogin={() => setMode('login')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
