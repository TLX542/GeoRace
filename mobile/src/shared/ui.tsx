import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { TextInputProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export const colors = {
  bg: '#101715',
  card: '#1c2823',
  line: '#34453b',
  text: '#f1f6ed',
  muted: '#a6b7ac',
  accent: '#c7f568',
  danger: '#ffaaa0',
};
export const s = StyleSheet.create({
  field: { gap: 8 },
  icon: { fontSize: 24 },
  centered: { alignItems: 'center', justifyContent: 'center' },
  page: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, gap: 20, paddingBottom: 40 },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 3,
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
  },
  h2: { color: colors.text, fontSize: 20, fontWeight: '700' },
  text: { color: colors.text, fontSize: 16, lineHeight: 24 },
  muted: { color: colors.muted, fontSize: 14, lineHeight: 21 },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 22,
    padding: 20,
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  big: {
    color: colors.accent,
    fontSize: 48,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    padding: 17,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
  },
  secondary: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
  },
  buttonText: { color: colors.bg, fontSize: 16, fontWeight: '800' },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 14,
    color: colors.text,
    padding: 16,
    fontSize: 16,
  },
  error: { color: colors.danger, fontSize: 14, lineHeight: 21 },
});
export function Page({ children }: React.PropsWithChildren) {
  return (
    <SafeAreaView style={s.page} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={s.page}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={s.content}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export function Brand() {
  return <Text style={s.eyebrow}>◈ GEORACE / RUN TOGETHER</Text>;
}
export function Button({
  title,
  onPress,
  busy,
  disabled,
  secondary,
}: {
  title: string;
  onPress: () => void;
  busy?: boolean;
  disabled?: boolean;
  secondary?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || busy, busy }}
      disabled={disabled || busy}
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        secondary && s.secondary,
        { opacity: disabled || busy ? 0.5 : pressed ? 0.75 : 1 },
      ]}
    >
      {busy ? (
        <ActivityIndicator color={secondary ? colors.accent : colors.bg} />
      ) : (
        <Text style={[s.buttonText, secondary && { color: colors.text }]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}
export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View style={s.field}>
      <Text style={s.muted}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.muted}
        {...props}
        style={s.input}
      />
    </View>
  );
}
export function ErrorNotice({ message }: { message: string }) {
  return message ? (
    <Text accessibilityRole="alert" style={s.error}>
      {message}
    </Text>
  ) : null;
}
export const duration = (ms: number) => {
  const sec = Math.floor(ms / 1000);
  return (
    String(Math.floor(sec / 60)).padStart(2, '0') +
    ':' +
    String(sec % 60).padStart(2, '0')
  );
};
export const km = (meters: number) => (meters / 1000).toFixed(2);
