import { request } from '../../shared/api/client';
import type { Run, RunInput } from '../../shared/types';
export const runsApi = {
  list: () => request<{ runs: Run[] }>('/runs', { authenticated: true }),
  get: (id: string) =>
    request<{ run: Run }>('/runs/' + encodeURIComponent(id), {
      authenticated: true,
    }),
  create: (input: RunInput) =>
    request<{ run: Run }>('/runs', {
      method: 'POST',
      authenticated: true,
      body: input,
    }),
  remove: (id: string) =>
    request<void>('/runs/' + encodeURIComponent(id), {
      method: 'DELETE',
      authenticated: true,
    }),
};
