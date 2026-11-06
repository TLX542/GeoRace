export type User = {
  id: string;
  email: string;
  username: string;
  createdAt: string;
};
export type AuthResponse = { user: User; token: string };
export type Point = { lat: number; lng: number; t: number; segment?: number };
export type RunInput = {
  startedAt: string;
  durationMs: number;
  distanceM: number;
  points: Point[];
  raceResults?: unknown;
};
export type Run = {
  id: string;
  started_at: string;
  duration_ms: number;
  distance_m: number;
  points: Point[];
  race_results: unknown;
  created_at: string;
};
