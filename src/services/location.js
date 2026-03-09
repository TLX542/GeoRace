import * as Location from 'expo-location';

export async function ensureLocationPermissions() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return false;
  const enabled = await Location.hasServicesEnabledAsync();
  return enabled;
}

export async function startLocationWatch(onLocation) {
  return Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 500,
      distanceInterval: 0,
    },
    onLocation
  );
}

export async function getCurrentLocation() {
  return Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.BestForNavigation,
  });
}

export async function getLastKnownLocation() {
  return Location.getLastKnownPositionAsync();
}
