import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import RunScreen from './src/screens/RunScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
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
                  : 'settings';
            return <Ionicons name={icon} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Run" component={RunScreen} />
        <Tab.Screen name="Historique" component={HistoryScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
