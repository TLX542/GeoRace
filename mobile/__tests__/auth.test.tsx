jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
import React from 'react';
import Renderer, { act } from 'react-test-renderer';
import { TextInput } from 'react-native';
import { AuthScreen } from '../src/features/auth/AuthScreen';
import { Button } from '../src/shared/ui';
const mockAuthenticate = jest.fn();
jest.mock('../src/features/auth/SessionProvider', () => ({
  useSession: () => ({ authenticate: mockAuthenticate, expired: false }),
}));
jest.mock('../src/features/settings/ConnectionCard', () => ({
  ConnectionCard: () => null,
}));
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: require('react-native').View,
}));
test('login screen validates credentials and sends the entered account', async () => {
  let screen: Renderer.ReactTestRenderer;
  await act(() => {
    screen = Renderer.create(<AuthScreen />);
  });
  const root = screen!.root;
  await act(async () => {
    await root
      .findAllByType(Button)
      .find(b => b.props.title === 'Me connecter')!
      .props.onPress();
  });
  expect(mockAuthenticate).not.toHaveBeenCalled();
  await act(() => {
    const fields = root.findAllByType(TextInput);
    fields[0].props.onChangeText('runner@example.com');
    fields[1].props.onChangeText('correct-password');
  });
  await act(async () => {
    await root
      .findAllByType(Button)
      .find(b => b.props.title === 'Me connecter')!
      .props.onPress();
  });
  expect(mockAuthenticate).toHaveBeenCalledWith(
    'runner@example.com',
    'correct-password',
    undefined,
  );
  await act(() => screen!.unmount());
});
test('registration exposes the username and calls the registration contract', async () => {
  mockAuthenticate.mockClear();
  let screen: Renderer.ReactTestRenderer;
  await act(() => {
    screen = Renderer.create(<AuthScreen />);
  });
  await act(() => {
    screen!.root
      .findAllByType(Button)
      .find(b => b.props.title === 'Créer un compte')!
      .props.onPress();
  });
  await act(() => {
    const fields = screen!.root.findAllByType(TextInput);
    fields[0].props.onChangeText('Lina');
    fields[1].props.onChangeText('lina@example.com');
    fields[2].props.onChangeText('correct-password');
  });
  await act(async () => {
    await screen!.root
      .findAllByType(Button)
      .find(b => b.props.title === 'Créer mon compte')!
      .props.onPress();
  });
  expect(mockAuthenticate).toHaveBeenCalledWith(
    'lina@example.com',
    'correct-password',
    'Lina',
  );
  await act(() => screen!.unmount());
});
