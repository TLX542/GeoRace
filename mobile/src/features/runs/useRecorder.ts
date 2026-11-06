import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Point, RunInput } from '../../shared/types';
import { distance } from './geo';
import { errorText, getBaseUrl } from '../../shared/api/client';
type Draft = RunInput & { segment: number };
const empty = (): Draft => ({
  startedAt: new Date().toISOString(),
  durationMs: 0,
  distanceM: 0,
  points: [],
  segment: 0,
});
export function useRecorder(userId: string) {
  const key = 'georace.draft.' + getBaseUrl() + '.' + userId;
  const [draft, setDraft] = useState<Draft>(empty);
  const draftRef = useRef(draft);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const [error, setError] = useState('');
  const activeRef = useRef(false);
  const watch = useRef<number | null>(null);
  const started = useRef(0);
  const elapsed = useRef(0);
  const mounted = useRef(true);
  const storageQueue = useRef(Promise.resolve());
  const commit = useCallback((next: Draft) => {
    draftRef.current = next;
    setDraft(next);
  }, []);
  const persist = useCallback(
    (next: Draft | null) => {
      storageQueue.current = storageQueue.current
        .catch(() => {})
        .then(() =>
          next
            ? AsyncStorage.setItem(key, JSON.stringify(next))
            : AsyncStorage.removeItem(key),
        );
      void storageQueue.current.catch(() => {
        if (mounted.current) {
          setError(
            'La sauvegarde locale a échoué. Gardez l’application ouverte.',
          );
        }
      });
      return storageQueue.current;
    },
    [key],
  );
  const pause = useCallback(() => {
    if (watch.current !== null) {
      Geolocation.clearWatch(watch.current);
      watch.current = null;
    }
    if (activeRef.current) {
      const next = {
        ...draftRef.current,
        durationMs: Math.min(
          2147483647,
          elapsed.current + Date.now() - started.current,
        ),
      };
      activeRef.current = false;
      commit(next);
      void persist(next);
    }
    setActive(false);
  }, [commit, persist]);
  useEffect(() => {
    mounted.current = true;
    void AsyncStorage.getItem(key)
      .then(raw => {
        if (raw) {
          const parsed: Draft = JSON.parse(raw);
          if (
            !Array.isArray(parsed.points) ||
            !Number.isFinite(parsed.durationMs) ||
            !Number.isFinite(parsed.distanceM) ||
            parsed.durationMs < 0 ||
            parsed.distanceM < 0 ||
            parsed.points.length > 10000 ||
            !Number.isFinite(parsed.segment) ||
            !parsed.points.every(
              p =>
                Number.isFinite(p.lat) &&
                Number.isFinite(p.lng) &&
                Number.isFinite(p.t),
            )
          ) {
            throw new Error('Brouillon illisible');
          }
          if (mounted.current) {
            commit(parsed);
          }
        }
      })
      .catch(() =>
        setError('Impossible de restaurer la dernière course locale.'),
      )
      .finally(() => {
        if (mounted.current) {
          setReady(true);
        }
      });
    const subscription = AppState.addEventListener('change', state => {
      if (state !== 'active') {
        pause();
      }
    });
    return () => {
      pause();
      mounted.current = false;
      subscription.remove();
    };
  }, [key, commit, pause]);
  useEffect(() => {
    if (!active) {
      return;
    }
    const timer = setInterval(() => {
      const next = {
        ...draftRef.current,
        durationMs: Math.min(
          2147483647,
          elapsed.current + Date.now() - started.current,
        ),
      };
      commit(next);
      if (next.durationMs === 2147483647) {
        pause();
      }
    }, 1000);
    const backup = setInterval(() => {
      void persist(draftRef.current);
    }, 5000);
    return () => {
      clearInterval(timer);
      clearInterval(backup);
    };
  }, [active, commit, pause, persist]);
  async function start() {
    setError('');
    try {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error(
            'Autorisez la localisation précise dans les réglages du téléphone pour enregistrer une course.',
          );
        }
      } else {
        Geolocation.setRNConfiguration({
          skipPermissionRequests: false,
          authorizationLevel: 'whenInUse',
        });
        await new Promise<void>((resolve, reject) =>
          Geolocation.requestAuthorization(resolve, () =>
            reject(
              new Error(
                'La localisation doit être autorisée dans les réglages iOS.',
              ),
            ),
          ),
        );
      }
      if (!mounted.current || AppState.currentState !== 'active') {
        return;
      }
      if (draftRef.current.points.length >= 10000) {
        throw new Error(
          'Limite de 10 000 positions atteinte. Enregistrez cette course.',
        );
      }
      const current = draftRef.current;
      commit({
        ...current,
        startedAt:
          current.durationMs === 0 && current.points.length === 0
            ? new Date().toISOString()
            : current.startedAt,
        segment: current.segment + 1,
      });
      elapsed.current = current.durationMs;
      started.current = Date.now();
      activeRef.current = true;
      setActive(true);
      watch.current = Geolocation.watchPosition(
        position => {
          if (!activeRef.current) {
            return;
          }
          const now = draftRef.current;
          if (position.coords.accuracy > 35) {
            setError('Signal GPS imprécis. Cherchez un endroit plus dégagé.');
            return;
          }
          const p: Point = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            t: position.timestamp,
            segment: now.segment,
          };
          const prev = now.points[now.points.length - 1];
          if (prev && p.t <= prev.t) {
            return;
          }
          const delta =
            prev && prev.segment === p.segment ? distance(prev, p) : 0;
          if (prev && delta > 0 && delta / ((p.t - prev.t) / 1000) > 15) {
            setError('Position GPS anormale ignorée.');
            return;
          }
          setError('');
          commit({
            ...now,
            distanceM: now.distanceM + delta,
            points: [...now.points, p],
            durationMs: elapsed.current + Date.now() - started.current,
          });
          if (now.points.length + 1 >= 10000) {
            pause();
            setError(
              'Limite de 10 000 positions atteinte. Vous pouvez enregistrer la course.',
            );
          }
        },
        () => {
          setError(
            'Signal GPS indisponible. Vérifiez les services de localisation puis reprenez.',
          );
          pause();
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 5,
          interval: 2000,
          fastestInterval: 1000,
          timeout: 20000,
          maximumAge: 0,
        },
      );
    } catch (e) {
      setError(errorText(e));
      pause();
    }
  }
  async function clear() {
    await persist(null);
    commit(empty());
    setError('');
  }
  return { draft, ready, active, error, start, pause, clear };
}
