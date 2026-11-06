jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
import {
  ApiError,
  onUnauthorized,
  request,
  setToken,
} from '../src/shared/api/client';
const fetchMock = jest.fn();
globalThis.fetch = fetchMock;
afterEach(() => {
  jest.clearAllMocks();
  setToken();
  onUnauthorized();
});
test('sends the exact backend run payload with bearer authentication', async () => {
  setToken('sample');
  fetchMock.mockResolvedValue({
    ok: true,
    status: 201,
    json: async () => ({ run: { id: 'run-1' } }),
  });
  const body = { durationMs: 1000, distanceM: 25, points: [] };
  await request('/runs', { method: 'POST', authenticated: true, body });
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining('/runs'),
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(body),
      headers: expect.objectContaining({ Authorization: 'Bearer sample' }),
    }),
  );
});
test('invalidates an expired authenticated session', async () => {
  const expire = jest.fn();
  onUnauthorized(expire);
  setToken('expired');
  fetchMock.mockResolvedValue({
    ok: false,
    status: 401,
    json: async () => ({ error: 'Invalid authentication token' }),
  });
  await expect(request('/me', { authenticated: true })).rejects.toBeInstanceOf(
    ApiError,
  );
  expect(expire).toHaveBeenCalledTimes(1);
});
test('a rejected login does not invalidate a session', async () => {
  const expire = jest.fn();
  onUnauthorized(expire);
  fetchMock.mockResolvedValue({
    ok: false,
    status: 401,
    json: async () => ({ error: 'Invalid email or password' }),
  });
  await expect(
    request('/auth/login', { method: 'POST', body: {} }),
  ).rejects.toThrow('Invalid email or password');
  expect(expire).not.toHaveBeenCalled();
});
test('handles successful deletion without parsing JSON', async () => {
  const json = jest.fn();
  fetchMock.mockResolvedValue({ ok: true, status: 204, json });
  await expect(
    request('/runs/id', { method: 'DELETE', authenticated: true }),
  ).resolves.toBeUndefined();
  expect(json).not.toHaveBeenCalled();
});
test('network failure produces an actionable error', async () => {
  fetchMock.mockRejectedValue(new TypeError('Network failed'));
  await expect(request('/health')).rejects.toThrow('Backend inaccessible');
});
