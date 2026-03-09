import AsyncStorage from '@react-native-async-storage/async-storage';

const RUNS_KEY = 'georace:runs';

export async function loadRuns() {
  const raw = await AsyncStorage.getItem(RUNS_KEY);
  if (!raw) return [];
  try {
    const runs = JSON.parse(raw);
    return Array.isArray(runs) ? runs : [];
  } catch (e) {
    return [];
  }
}

export async function saveRun(run) {
  const runs = await loadRuns();
  runs.unshift(run);
  await AsyncStorage.setItem(RUNS_KEY, JSON.stringify(runs));
  return runs;
}

export async function clearRuns() {
  await AsyncStorage.removeItem(RUNS_KEY);
}
