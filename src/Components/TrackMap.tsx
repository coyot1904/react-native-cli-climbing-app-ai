import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, {
  Polyline,
  Marker,
  PROVIDER_GOOGLE,
  MapType,
} from 'react-native-maps';
import { Coordinate, Waypoint } from '../Types/trackTypes';
import { Colors, Radius, Shadow } from '../Assets/theme';

const WAYPOINT_COLORS = {
  start: Colors.primary,
  summit: Colors.accent,
  water: Colors.info,
  rest: Colors.info,
  viewpoint: '#7B3FA0',
  end: Colors.gray500,
};

const WAYPOINT_ICONS = {
  start: '🏁',
  summit: '⛰',
  water: '💧',
  rest: '🏕',
  viewpoint: '👁',
  waypoint: '🏕',
  end: '🎯',
};

interface Props {
  coordinates: Coordinate[];
  waypoints: Waypoint[];
  currentPosition?: Coordinate | null;
  recordedPath?: Coordinate[];
  mapType?: MapType;
  onMapTypeToggle?: () => void;
}

export function TrackMap({
  coordinates,
  waypoints,
  currentPosition,
  recordedPath = [],
  mapType = 'terrain',
  onMapTypeToggle,
}: Props) {
  const mapRef = useRef<MapView>(null);

  // Center on current position when it changes
  useEffect(() => {
    if (currentPosition && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        500,
      );
    }
  }, [currentPosition]);

  const initialRegion =
    coordinates.length > 0
      ? {
          latitude: coordinates[Math.floor(coordinates.length / 2)].latitude,
          longitude: coordinates[Math.floor(coordinates.length / 2)].longitude,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        }
      : {
          latitude: 40.73,
          longitude: 39.83,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType={mapType}
        initialRegion={initialRegion}
        showsUserLocation={false}
        showsCompass
        showsScale
        rotateEnabled
        pitchEnabled
      >
        {/* Full planned route — gray dashed */}
        <Polyline
          coordinates={coordinates}
          strokeColor="rgba(136,135,128,0.6)"
          strokeWidth={2}
          lineDashPattern={[6, 4]}
        />

        {/* Recorded path — green solid */}
        {recordedPath.length > 1 && (
          <Polyline
            coordinates={recordedPath}
            strokeColor={Colors.primary}
            strokeWidth={3}
            lineCap="round"
            lineJoin="round"
          />
        )}

        {/* Waypoint markers */}
        {waypoints.map(wp => (
          <Marker
            key={wp.id}
            coordinate={{
              latitude: wp.coordinate.latitude,
              longitude: wp.coordinate.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View
              style={[
                styles.markerWrap,
                { borderColor: WAYPOINT_COLORS[wp.type] },
              ]}
            >
              <Text style={styles.markerIcon}>{WAYPOINT_ICONS[wp.type]}</Text>
            </View>
          </Marker>
        ))}

        {/* Current position */}
        {currentPosition && (
          <Marker
            coordinate={{
              latitude: currentPosition.latitude,
              longitude: currentPosition.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={styles.currentPositionOuter}>
              <View style={styles.currentPositionInner} />
            </View>
          </Marker>
        )}
      </MapView>

      {/* Map type toggle */}
      <TouchableOpacity
        style={styles.layersBtn}
        onPress={onMapTypeToggle}
        activeOpacity={0.8}
      >
        <Text style={styles.layersBtnText}>🗺</Text>
      </TouchableOpacity>

      {/* Center on user */}
      <TouchableOpacity
        style={[styles.layersBtn, styles.centerBtn]}
        onPress={() => {
          if (currentPosition && mapRef.current) {
            mapRef.current.animateToRegion(
              {
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              },
              400,
            );
          }
        }}
        activeOpacity={0.8}
      >
        <Text style={styles.layersBtnText}>⊕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 260,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadow.md,
  },
  map: {
    flex: 1,
  },
  markerWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.sm,
  },
  markerIcon: {
    fontSize: 14,
  },
  currentPositionOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(58,125,68,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  currentPositionInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  layersBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.sm,
  },
  centerBtn: {
    top: 54,
  },
  layersBtnText: {
    fontSize: 18,
    color: Colors.white,
  },
});
