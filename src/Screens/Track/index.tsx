/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { TrackScreenProps } from '../../Types/navigationTypes';
import LinearGradient from 'react-native-linear-gradient'; // Add this package

const TrackScreen: React.FC<TrackScreenProps> = ({ navigation, route }) => {
  const { mountain } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trackCoords = mountain.track || [];
  const summitCoord = {
    latitude: mountain.latitude,
    longitude: mountain.longitude,
  };
  const bcCoord = mountain.baseCamp || trackCoords[0];

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType="terrain"
        initialRegion={{
          latitude: mountain.latitude,
          longitude: mountain.longitude,
          latitudeDelta: 0.1, // Slightly tighter zoom for "better" look
          longitudeDelta: 0.1,
        }}
        customMapStyle={mapDarkStyle}
      >
        {/* Glow effect for Polyline (Double Layer) */}
        <Polyline
          coordinates={trackCoords}
          strokeColor="rgba(144, 238, 144, 0.3)"
          strokeWidth={10}
        />
        <Polyline
          coordinates={trackCoords}
          strokeColor="#90EE90"
          strokeWidth={4}
          lineDashPattern={[8, 12]}
          geodesic={true}
          zIndex={10}
        />

        {/* Base Camp Marker */}
        {bcCoord && (
          <Marker coordinate={bcCoord}>
            <Animated.View
              style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
            >
              <View
                style={[styles.markerContainer, { borderColor: '#FF8A3D' }]}
              >
                <Text style={styles.markerEmoji}>⛺</Text>
                <View style={styles.textContainer}>
                  <Text style={styles.markerTitle}>Base Camp</Text>
                  <Text style={styles.markerSub}>
                    {mountain.baseCamp?.altitude}
                  </Text>
                </View>
              </View>
              <View style={[styles.arrow, { borderTopColor: '#FF8A3D' }]} />
            </Animated.View>
          </Marker>
        )}

        {/* Summit Marker */}
        <Marker coordinate={summitCoord}>
          <Animated.View
            style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
          >
            <View
              style={[
                styles.markerContainer,
                { borderColor: '#A5F3FC', elevation: 10 },
              ]}
            >
              <Text style={styles.markerEmoji}>🚩</Text>
              <View style={styles.textContainer}>
                <Text style={styles.markerTitle}>{mountain.name} Summit</Text>
                <Text style={styles.markerSub}>{mountain.altitude}m</Text>
              </View>
            </View>
            <View style={[styles.arrow, { borderTopColor: '#A5F3FC' }]} />
          </Animated.View>
        </Marker>
      </MapView>

      {/* Top Gradient Overlay for readability */}
      <LinearGradient
        colors={['rgba(11, 18, 32, 0.8)', 'transparent']}
        style={styles.topGradient}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>⬅ Back to Map</Text>
      </TouchableOpacity>

      {/* Bottom Floating Info Card */}
      <Animated.View style={[styles.infoCard, { opacity: fadeAnim }]}>
        <View style={styles.pill} />
        <Text style={styles.routeTitle}>{mountain.name}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Altitude</Text>
            <Text style={styles.statValue}>{mountain.altitude}m</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Region</Text>
            <Text style={styles.statValue}>{mountain.region}</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default TrackScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#0B1220',
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 30,
    left: 20,
    backgroundColor: 'rgba(26, 36, 54, 0.9)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  backText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  infoCard: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(26, 36, 54, 0.95)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  pill: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginBottom: 15,
  },
  routeTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: 15,
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  // MARKER STYLES
  markerContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A2436',
    borderRadius: 12,
    borderWidth: 2,
    padding: 8,
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 8,
  },
  markerTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  markerSub: {
    color: '#94A3B8',
    fontSize: 12,
  },
  markerEmoji: {
    fontSize: 24,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 6,
    alignSelf: 'center',
    marginTop: -2,
  },
});

const mapDarkStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0B1220' }] },
  { elementType: 'labels.text.stroke', stylers: [{ visibility: 'off' }] },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#111827' }],
  },
];
