import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { useAuthStore } from './src/stores/authStore';
import RunScreen from './src/screens/RunScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AuthScreen from './src/screens/AuthScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const user = useAuthStore((s) => s.user);
  const initialize = useAuthStore((s) => s.initialize);
  const loadMe = useAuthStore((s) => s.loadMe);
  const [ready, setReady] = useState(false);

  // Restore any persisted session, then recover the profile from the JWT so
  // returning users stay signed in. `ready` tracks whether that check has finished.
  useEffect(() => {
    let mounted = true;
    (async () => {
      await initialize();
      await loadMe();
      if (mounted) setReady(true);
    })();
    return () => {
      mounted = false;
    };
  }, [initialize, loadMe]);

  // Still checking for an existing session.
  if (!ready) {
    return (
      <SafeAreaView style={styles.center}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color="#111" />
      </SafeAreaView>
    );
  }

  // No session yet: show login / register.
  if (!user) {
    return (
      <>
        <StatusBar style="dark" />
        <AuthScreen />
      </>
    );
  }

  // Signed in: the main tab navigator.
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarActiveTintColor: '#111',
          tabBarInactiveTintColor: '#777',
          tabBarIcon: ({ color, size }) => {
            const icon =
              route.name === 'Run'
                ? 'play'
                : route.name === 'Historique'
                  ? 'time'
                  : route.name === 'Profil'
                    ? 'person'
                    : 'settings';
            return <Ionicons name={icon} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Run" component={RunScreen} />
        <Tab.Screen name="Historique" component={HistoryScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
