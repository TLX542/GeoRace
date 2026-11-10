import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, setAuthToken, clearAuthToken } from '../services/api';

const TOKEN_KEY = 'georace:auth_token';

async function persistToken(token) {
  if (token) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } else {
    await AsyncStorage.removeItem(TOKEN_KEY);
  }
}

/**
 * Authentication state.
 *
 * The backend issues a JWT on login/register and exposes /me to recover the
 * profile from an existing token. The token is sent on every authenticated
 * request via the api client's Authorization header and persisted to
 * AsyncStorage so the session survives app restarts.
 */
export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  /** Restore a previously saved token from AsyncStorage (call on app launch). */
  initialize: async () => {
    const { token } = get();
    if (token) return;
    try {
      const stored = await AsyncStorage.getItem(TOKEN_KEY);
      if (stored) {
        setAuthToken(stored);
        set({ token: stored });
      }
    } catch {
      // ignore storage errors; user will simply log in again
    }
  },

  setToken: (token) => {
    persistToken(token);
    setAuthToken(token);
    set({ token });
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { user, token } = await api.login({ email, password });
      setAuthToken(token);
      set({ user, token, loading: false, error: null });
      return { ok: true };
    } catch (error) {
      set({ loading: false, error: error.message || 'Connexion échouée' });
      return { ok: false, error: error.message || 'Connexion échouée' };
    }
  },

  register: async (email, username, password) => {
    set({ loading: true, error: null });
    try {
      const { user, token } = await api.register({ email, username, password });
      setAuthToken(token);
      set({ user, token, loading: false, error: null });
      return { ok: true };
    } catch (error) {
      set({ loading: false, error: error.message || 'Inscription échouée' });
      return { ok: false, error: error.message || 'Inscription échouée' };
    }
  },

  logout: () => {
    persistToken(null);
    clearAuthToken();
    set({ user: null, token: null, error: null });
  },

  /** Recover the logged-in profile from a stored token (used on app launch). */
  loadMe: async () => {
    const { token } = get();
    if (!token) {
      set({ loading: false });
      return;
    }
    set({ loading: true });
    try {
      const { user } = await api.me();
      set({ user, loading: false, error: null });
    } catch (error) {
      // Token invalid or expired -> drop it so the user is sent back to login.
      clearAuthToken();
      set({ user: null, token: null, loading: false, error: null });
    }
  },
}));
