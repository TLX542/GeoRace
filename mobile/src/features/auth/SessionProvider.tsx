import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import {
  ApiError,
  loadApiUrl,
  onUnauthorized,
  request,
  setToken,
} from '../../shared/api/client';
import type { AuthResponse, User } from '../../shared/types';
const service = 'com.georace.mobile.session';
type Session = {
  user: User | null;
  ready: boolean;
  expired: boolean;
  authenticate: (
    email: string,
    password: string,
    username?: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
};
const Context = createContext<Session | null>(null);
export function SessionProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [expired, setExpired] = useState(false);
  async function logout() {
    await Keychain.resetGenericPassword({ service });
    setToken();
    setUser(null);
  }
  useEffect(() => {
    let alive = true;
    onUnauthorized(() => {
      setToken();
      setUser(null);
      setExpired(true);
      void Keychain.resetGenericPassword({ service }).catch(() => {});
    });
    async function restore() {
      try {
        await loadApiUrl();
        const saved = await Keychain.getGenericPassword({ service });
        if (saved) {
          setToken(saved.password);
          try {
            const response = await request<{ user: User }>('/me', {
              authenticated: true,
            });
            if (alive) {
              setUser(response.user);
            }
          } catch (error) {
            setToken();
            if (error instanceof ApiError && error.status === 401) {
              await Keychain.resetGenericPassword({ service });
            }
          }
        }
      } finally {
        if (alive) {
          setReady(true);
        }
      }
    }
    void restore().catch(() => {
      if (alive) {
        setReady(true);
      }
    });
    return () => {
      alive = false;
      onUnauthorized();
    };
  }, []);
  async function authenticate(
    email: string,
    password: string,
    username?: string,
  ) {
    const response = await request<AuthResponse>(
      username === undefined ? '/auth/login' : '/auth/register',
      {
        method: 'POST',
        body: {
          email: email.trim().toLowerCase(),
          password,
          ...(username !== undefined ? { username: username.trim() } : {}),
        },
      },
    );
    await Keychain.setGenericPassword(response.user.id, response.token, {
      service,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
    setToken(response.token);
    setExpired(false);
    setUser(response.user);
  }
  return (
    <Context.Provider value={{ user, ready, expired, authenticate, logout }}>
      {children}
    </Context.Provider>
  );
}
export function useSession() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('SessionProvider manquant');
  }
  return context;
}
