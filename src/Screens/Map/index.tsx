import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { MapScreenProps } from '../../Types/navigationTypes';
import { mountains } from '../../Assets/montainData';

const MapScreen: React.FC<MapScreenProps> = ({ navigation }) => {
  const [selectedMountain, setSelectedMountain] = React.useState<any>(null);

  const handleMarkerPress = (mountain: any) => {
    setSelectedMountain(mountain);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>⬅ Back to Chat</Text>
        </TouchableOpacity>
      </View>
      {/* MAP */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 28.3949,
          longitude: 84.124,
          latitudeDelta: 6, // bigger = zoom out
          longitudeDelta: 6, // bigger = wider view
        }}
      >
        {mountains.map((mountain, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: mountain.latitude,
              longitude: mountain.longitude,
            }}
            onPress={() => handleMarkerPress(mountain)}
          >
            <Text style={styles.emoji}>⛰</Text>
          </Marker>
        ))}
      </MapView>

      <View style={styles.bottomCard}>
        {selectedMountain ? (
          <>
            <Text style={styles.cardTitle}>
              ⛰ {selectedMountain.name} ({selectedMountain.altitude}m)
            </Text>

            <Text style={styles.cardText}>{selectedMountain.description}</Text>

            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => navigation.navigate('Chat')}
            >
              <Text style={styles.chatText}>Chat About This Peak</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chatButtonTrack}
              onPress={() => {
                if (selectedMountain) {
                  console.log(
                    'Navigating to Track with mountain:',
                    selectedMountain,
                  );
                  navigation.navigate('Track', { trail: selectedMountain });
                } else {
                  Alert.alert('Track data not available for this peak yet.');
                }
              }}
            >
              <Text style={styles.chatText}>View Track</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View>
            <Text style={styles.cardTitle}>🧭 Select a Summit</Text>

            <Text style={styles.cardText}>
              Tap on any mountain on the map to see its details, altitude, and
              climbing information.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  headerWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingHorizontal: 16,
  },

  header: {
    position: 'absolute',
    top: 0,
    zIndex: 10,
    left: 0,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  headerBtn: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },

  bottomCard: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,

    backgroundColor: '#0B1220',
    borderRadius: 24,
    padding: 20,

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 8,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },

  cardText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 22,
    marginBottom: 18,
  },

  chatButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: '#FFF',

    justifyContent: 'center',
    alignItems: 'center',
  },

  chatButtonTrack: {
    height: 50,
    borderRadius: 14,
    backgroundColor: '#FFF',

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  chatText: {
    color: '#0B1220',
    fontSize: 16,
    fontWeight: '600',
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  emoji: {
    fontSize: 30,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 30,
    left: 20,
    backgroundColor: '#1A2436',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A3A55',
  },
  backText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
