import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSession } from '../features/auth/SessionProvider';
import { AuthScreen } from '../features/auth/AuthScreen';
import { RunScreen } from '../features/runs/RunScreen';
import { HistoryScreen } from '../features/runs/HistoryScreen';
import { RunDetailScreen } from '../features/runs/RunDetailScreen';
import { SettingsScreen } from '../features/settings/SettingsScreen';
import { colors, s } from '../shared/ui';
export type HistoryStackParams = {
  History: undefined;
  RunDetail: { id: string };
};
type TabsParams = { Courir: undefined; Activité: undefined; Profil: undefined };
const Tabs = createBottomTabNavigator<TabsParams>();
const Stack = createNativeStackNavigator<HistoryStackParams>();
function HistoryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RunDetail"
        component={RunDetailScreen}
        options={{ title: 'Détail de la course' }}
      />
    </Stack.Navigator>
  );
}
const icons: Record<string, string> = {
  Courir: '↗',
  Activité: '≋',
  Profil: '◉',
};
// React Navigation expects an icon-render callback in screen options.
function TabIcon({ name, color }: { name: string; color: string }) {
  return <Text style={[s.icon, { color }]}>{icons[name]}</Text>;
}
export function RootNavigator() {
  const { user, ready } = useSession();
  if (!ready) {
    return (
      <View style={[s.page, s.centered]}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }
  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.bg,
          card: colors.card,
          text: colors.text,
          primary: colors.accent,
          border: colors.line,
        },
      }}
    >
      {user ? (
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: colors.accent,
            tabBarInactiveTintColor: colors.muted,
            tabBarStyle: {
              backgroundColor: colors.bg,
              borderTopColor: colors.line,
            },
            tabBarIcon: ({ color }) => (
              <TabIcon name={route.name} color={color} />
            ),
          })}
        >
          <Tabs.Screen name="Courir" component={RunScreen} />
          <Tabs.Screen name="Activité" component={HistoryNavigator} />
          <Tabs.Screen name="Profil" component={SettingsScreen} />
        </Tabs.Navigator>
      ) : (
        <AuthScreen />
      )}
    </NavigationContainer>
  );
}
