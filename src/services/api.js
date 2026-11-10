import { Platform } from 'react-native';

/**
 * Base URL of the GeoRace backend (Express, port 3000).
 *
 * In dev the mobile app talks to a backend running on the same machine:
 *  - iOS simulator / web  -> http://localhost:3000
 *  - Android emulator    -> http://10.0.2.2:3000 (emulator's "localhost" is the host)
 *
 * Override in production with the EXPO_PUBLIC_API_BASE_URL env var.
 */
const API_BASE_URL = __DEV__
  ? Platform.OS === 'android'
    ? 'http://10.0.2.2:3000'
    : 'http://localhost:3000'
  : process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000';

let authToken = null;

/**
 * Call the backend and return the parsed JSON body.
 * Throws an error with `.status` and `.data` on non-2xx responses.
 */
async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : { text: await res.text() };

  if (!res.ok) {
    const error = new Error(data?.error || `Request failed (${res.status})`);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export function setAuthToken(token) {
  authToken = token || null;
}

export function clearAuthToken() {
  authToken = null;
}

export const api = {
  register: (body) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  me: () => request('/me'),
  postRun: (body) =>
    request('/runs', { method: 'POST', body: JSON.stringify(body) }),
  getRuns: () => request('/runs'),
  getRun: (id) => request(`/runs/${id}`),
  deleteRun: (id) => request(`/runs/${id}`, { method: 'DELETE' }),
};

export default { api, setAuthToken, clearAuthToken };
