export interface Coordinate {
  latitude: number;
  longitude: number;
  altitude?: number;
  timestamp?: number;
}

export interface Waypoint {
  id: string;
  name: string;
  type:
    | 'start'
    | 'summit'
    | 'rest'
    | 'water'
    | 'viewpoint'
    | 'end'
    | 'waypoint';
  coordinate: Coordinate;
  elevation: number;
  distanceFromStart: number; // km
  description?: string;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
  altitude?: number;
}

// (Unified above)

export interface TrailTrack {
  id: string;
  name: string;
  region: string;
  country: string;
  difficulty: 'easy' | 'moderate' | 'hard' | 'expert';
  trailType: 'loop' | 'out-and-back' | 'one-way';
  distance: number; // km
  elevationGain: number; // m
  elevationLoss: number; // m
  maxElevation: number; // m
  minElevation: number; // m
  estimatedDuration: number; // minutes
  rating: number;
  reviewCount: number;

  // --- New Fields Added ---
  latitude: number; // Main peak latitude
  longitude: number; // Main peak longitude
  altitude: number; // Main peak altitude
  description: string; // Mountain description
  // -------------------------

  coordinates: Coordinate[];
  waypoints: Waypoint[];
  elevationProfile: number[]; // elevation readings along route
}

export interface ActiveSession {
  trailId: string;
  startTime: number;
  elapsedSeconds: number;
  currentPosition: Coordinate | null;
  distanceCovered: number; // km
  currentElevation: number; // m
  currentSpeed: number; // km/h
  avgSpeed: number; // km/h
  recordedPath: Coordinate[];
  isPaused: boolean;
}

// ─── Mock trail data ──────────────────────────────────────────────────────────

export const ZIGANA_PEAK_TRACK: TrailTrack = {
  id: 'zigana-peak-001',
  name: 'Zigana Peak Summit',
  region: 'Trabzon',
  country: 'Turkey',
  difficulty: 'hard',
  trailType: 'loop',
  distance: 12.4,
  elevationGain: 1240,
  elevationLoss: 1027,
  maxElevation: 2847,
  minElevation: 1607,
  estimatedDuration: 260,
  rating: 4.8,
  reviewCount: 124,
  coordinates: generateCoordinates(),
  waypoints: [
    {
      id: 'wp-1',
      name: 'Trailhead',
      type: 'start',
      coordinate: { latitude: 40.721, longitude: 39.815, altitude: 1607 },
      elevation: 1607,
      distanceFromStart: 0,
      description: 'Parking area with toilets available',
    },
    {
      id: 'wp-2',
      name: 'Yayla Spring',
      type: 'water',
      coordinate: { latitude: 40.728, longitude: 39.822, altitude: 2105 },
      elevation: 2105,
      distanceFromStart: 4.2,
      description: 'Natural spring — water is safe to drink',
    },
    {
      id: 'wp-3',
      name: 'Ridge Viewpoint',
      type: 'viewpoint',
      coordinate: { latitude: 40.734, longitude: 39.83, altitude: 2480 },
      elevation: 2480,
      distanceFromStart: 6.8,
      description: 'Panoramic view of the Black Sea coastline',
    },
    {
      id: 'wp-4',
      name: 'Zigana Peak',
      type: 'summit',
      coordinate: { latitude: 40.739, longitude: 39.837, altitude: 2847 },
      elevation: 2847,
      distanceFromStart: 8.9,
      description: 'Summit! Highest point of the trail',
    },
  ],
  elevationProfile: [
    1607, 1650, 1710, 1780, 1850, 1940, 2050, 2105, 2180, 2270, 2380, 2480,
    2580, 2690, 2760, 2820, 2847, 2810, 2750, 2680, 2590, 2490, 2390, 2280,
    2160, 2060, 1960, 1870, 1820,
  ],
};

function generateCoordinates(): Coordinate[] {
  const coords: Coordinate[] = [];
  const startLat = 40.721;
  const startLon = 39.815;
  const points = 50;
  for (let i = 0; i < points; i++) {
    const t = i / (points - 1);
    // Simulate a loop trail going up then returning
    const angle = t < 0.7 ? t * Math.PI * 0.6 : (1 - t) * Math.PI * 0.8;
    coords.push({
      latitude:
        startLat + 0.02 * Math.sin(angle) + 0.001 * (Math.random() - 0.5),
      longitude: startLon + 0.025 * t * (t < 0.7 ? 1 : (1 - t) * 2),
      altitude:
        t < 0.72 ? 1607 + 1240 * (t / 0.72) : 2847 - 1027 * ((t - 0.72) / 0.28),
      timestamp: Date.now() - (points - i) * 5 * 60 * 1000,
    });
  }
  return coords;
}

export const SAMPLE_TRACKS: TrailTrack[] = [
  ZIGANA_PEAK_TRACK,
  {
    ...ZIGANA_PEAK_TRACK,
    id: 'karadere-002',
    name: 'Karadere Valley Loop',
    region: 'Bolu',
    difficulty: 'moderate',
    distance: 8.2,
    elevationGain: 620,
    maxElevation: 1965,
    rating: 4.5,
    reviewCount: 87,
  },
  {
    ...ZIGANA_PEAK_TRACK,
    id: 'ilgaz-003',
    name: 'Ilgaz Mountain Ridge',
    region: 'Kastamonu',
    difficulty: 'expert',
    distance: 18.7,
    elevationGain: 2100,
    maxElevation: 2587,
    rating: 4.9,
    reviewCount: 43,
  },
];
