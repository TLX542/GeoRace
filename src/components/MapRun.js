import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';

export default function MapRun({ startCoord, ghostPoints, ghostPosition, checkpoints, lastLocation, onRecenter }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const base =
      startCoord ||
      (ghostPoints && ghostPoints.length > 0 ? ghostPoints[0] : null);
    if (!base) return;
    mapRef.current.animateToRegion(
      {
        latitude: base.lat,
        longitude: base.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      400
    );
  }, [startCoord, ghostPoints]);

  const handleRecenter = () => {
    if (onRecenter) {
      onRecenter();
      return;
    }
    if (lastLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: lastLocation.lat,
          longitude: lastLocation.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        400
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation
        showsMyLocationButton={false}
        initialRegion={
          startCoord
            ? {
                latitude: startCoord.lat,
                longitude: startCoord.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : ghostPoints && ghostPoints.length > 0
              ? {
                  latitude: ghostPoints[0].lat,
                  longitude: ghostPoints[0].lng,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }
              : undefined
        }
      >
        {ghostPoints?.length ? (
          <Polyline
            coordinates={ghostPoints.map((p) => ({ latitude: p.lat, longitude: p.lng }))}
            strokeColor="#4A90E2"
            strokeWidth={4}
            lineDashPattern={[8, 6]}
          />
        ) : null}
        {ghostPosition ? (
          <Marker
            coordinate={{ latitude: ghostPosition.lat, longitude: ghostPosition.lng }}
            title="Ghost"
            pinColor="#4A90E2"
          />
        ) : null}
        {checkpoints?.map((cp, idx) => (
          <Marker
            key={`${idx}-${cp.reached ? 'reached' : 'pending'}`}
            coordinate={{ latitude: cp.lat, longitude: cp.lng }}
            pinColor={cp.reached ? '#1DB954' : '#E74C3C'}
            title={`Checkpoint ${idx + 1}`}
          />
        ))}
      </MapView>
      <TouchableOpacity style={styles.recenterButton} onPress={handleRecenter}>
        <Text style={styles.recenterIcon}>⊙</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  recenterButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  recenterIcon: {
    fontSize: 18,
    color: '#333',
  },
});
