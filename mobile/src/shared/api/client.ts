import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const defaultUrl =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
let baseUrl = defaultUrl;
let token: string | undefined;
let unauthorized: (() => void) | undefined;
export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}
export function getBaseUrl() {
  return baseUrl;
}
export function setToken(value?: string) {
  token = value;
}
export function onUnauthorized(handler?: () => void) {
  unauthorized = handler;
}
export async function loadApiUrl() {
  baseUrl = (await AsyncStorage.getItem('georace.api')) || defaultUrl;
}
export async function saveApiUrl(value: string) {
  const clean = value.trim().replace(/\/+$/, '');
  if (!/^https?:\/\/[^/\s?#]+(?::[0-9]+)?$/.test(clean)) {
    throw new Error(
      'Saisissez une origine HTTP(S), par exemple http://192.168.1.20:3000',
    );
  }
  if (!__DEV__ && !clean.startsWith('https://')) {
    throw new Error('Une URL HTTPS est nécessaire en production.');
  }
  await AsyncStorage.setItem('georace.api', clean);
  baseUrl = clean;
}
export async function request<T>(
  route: string,
  options: { method?: string; body?: unknown; authenticated?: boolean } = {},
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  const sentToken = options.authenticated ? token : undefined;
  try {
    const response = await fetch(baseUrl + route, {
      method: options.method || 'GET',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(options.body !== undefined
          ? { 'Content-Type': 'application/json' }
          : {}),
        ...(sentToken ? { Authorization: 'Bearer ' + sentToken } : {}),
      },
      body:
        options.body === undefined ? undefined : JSON.stringify(options.body),
    });
    if (response.status === 204) {
      return undefined as T;
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 401 && sentToken && token === sentToken) {
        unauthorized?.();
      }
      throw new ApiError(
        data.error || 'Le serveur a refusé la demande.',
        response.status,
      );
    }
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(
      'Backend inaccessible. Vérifiez son démarrage, l’adresse API et votre réseau.',
    );
  } finally {
    clearTimeout(timer);
  }
}
export const errorText = (error: unknown) =>
  error instanceof Error ? error.message : 'Une erreur est survenue.';
