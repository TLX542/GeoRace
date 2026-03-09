export function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function paceFrom(distanceM, durationMs) {
  if (!distanceM || distanceM < 10) return '--:--';
  const paceSecPerKm = (durationMs / 1000) / (distanceM / 1000);
  if (!Number.isFinite(paceSecPerKm) || paceSecPerKm <= 0) return '--:--';
  const minutes = Math.floor(paceSecPerKm / 60);
  const seconds = Math.round(paceSecPerKm % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
