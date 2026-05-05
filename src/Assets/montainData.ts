export const mountains = [
  // ======================
  // 🌍 8000m Peaks (14)
  // ======================
  {
    name: 'Everest',
    latitude: 27.9881,
    longitude: 86.925,
    altitude: 8848,
    region: 'Himalayas',
    country: 'Nepal/China',
    description: 'Highest mountain in the world (8,848m).',
    track: [
      { latitude: 28.0072, longitude: 86.8594 }, // Base Camp
      { latitude: 27.9995, longitude: 86.8612 }, // Khumbu Icefall
      { latitude: 27.9865, longitude: 86.8745 }, // Camp 1
      { latitude: 27.978, longitude: 86.892 }, // Camp 2
      { latitude: 27.973, longitude: 86.915 }, // Camp 3
      { latitude: 27.9805, longitude: 86.9215 }, // South Col
      { latitude: 27.9881, longitude: 86.925 }, // Summit
    ],
    baseCamp: { latitude: 28.0072, longitude: 86.8594, altitude: '5,364m' },
  },
  {
    name: 'K2',
    latitude: 35.8808,
    longitude: 76.5155,
    altitude: 8611,
    region: 'Karakoram',
    country: 'Pakistan/China',
    description: 'Second highest and most dangerous mountain.',
    track: [
      { latitude: 35.845, longitude: 76.51 }, // Base Camp
      { latitude: 35.855, longitude: 76.512 }, // Camp 1
      { latitude: 35.865, longitude: 76.513 }, // Camp 2
      { latitude: 35.875, longitude: 76.5145 }, // Camp 4
      { latitude: 35.8808, longitude: 76.5155 }, // Summit
    ],
    baseCamp: { latitude: 35.845, longitude: 76.51, altitude: '5,150m' },
  },
  {
    name: 'Kangchenjunga',
    latitude: 27.7025,
    longitude: 88.1475,
    altitude: 8586,
    region: 'Himalayas',
    country: 'Nepal/India',
    description: 'Third highest peak in the world.',
    track: [
      { latitude: 27.68, longitude: 88.12 },
      { latitude: 27.69, longitude: 88.135 },
      { latitude: 27.7025, longitude: 88.1475 },
    ],
    baseCamp: { latitude: 27.68, longitude: 88.12, altitude: '5,475m' },
  },
  {
    name: 'Lhotse',
    latitude: 27.9617,
    longitude: 86.933,
    altitude: 8516,
    region: 'Himalayas',
    country: 'Nepal',
    description: 'Connected to Everest via South Col.',
    track: [
      { latitude: 27.973, longitude: 86.915 }, // Shared route with Everest Camp 3
      { latitude: 27.9617, longitude: 86.933 },
    ],
    baseCamp: { latitude: 27.973, longitude: 86.915, altitude: '7,100m' },
  },
  {
    name: 'Makalu',
    latitude: 27.8897,
    longitude: 87.0883,
    altitude: 8485,
    region: 'Himalayas',
    country: 'Nepal/China',
    description: 'Fifth highest mountain in the world.',
    track: [
      { latitude: 27.86, longitude: 87.05 },
      { latitude: 27.8897, longitude: 87.0883 },
    ],
    baseCamp: { latitude: 27.86, longitude: 87.05, altitude: '5,700m' },
  },
  {
    name: 'Cho Oyu',
    latitude: 28.0942,
    longitude: 86.6608,
    altitude: 8188,
    region: 'Himalayas',
    country: 'Nepal/China',
    description: 'One of the easiest 8000m peaks.',
    track: [
      { latitude: 28.11, longitude: 86.64 },
      { latitude: 28.0942, longitude: 86.6608 },
    ],
    baseCamp: { latitude: 28.11, longitude: 86.64, altitude: '5,700m' },
  },
  {
    name: 'Dhaulagiri I',
    latitude: 28.6966,
    longitude: 83.487,
    altitude: 8167,
    region: 'Himalayas',
    country: 'Nepal',
    description: 'Seventh highest peak in the world.',
    track: [
      { latitude: 28.67, longitude: 83.46 },
      { latitude: 28.6966, longitude: 83.487 },
    ],
    baseCamp: { latitude: 28.67, longitude: 83.46, altitude: '4,740m' },
  },
  {
    name: 'Manaslu',
    latitude: 28.5497,
    longitude: 84.5597,
    altitude: 8163,
    region: 'Himalayas',
    country: 'Nepal',
    description: 'Mountain of the Spirit.',
    track: [
      { latitude: 28.52, longitude: 84.53 },
      { latitude: 28.5497, longitude: 84.5597 },
    ],
    baseCamp: { latitude: 28.52, longitude: 84.53, altitude: '4,800m' },
  },
  {
    name: 'Nanga Parbat',
    latitude: 35.2372,
    longitude: 74.5892,
    altitude: 8126,
    region: 'Himalayas',
    country: 'Pakistan',
    description: 'Killer Mountain due to high fatality rate.',
    track: [
      { latitude: 35.21, longitude: 74.56 },
      { latitude: 35.2372, longitude: 74.5892 },
    ],
    baseCamp: { latitude: 35.21, longitude: 74.56, altitude: '3,850m' },
  },
  {
    name: 'Annapurna I',
    latitude: 28.5961,
    longitude: 83.8203,
    altitude: 8091,
    region: 'Himalayas',
    country: 'Nepal',
    description: 'One of the most dangerous mountains.',
    track: [
      { latitude: 28.57, longitude: 83.8 },
      { latitude: 28.5961, longitude: 83.8203 },
    ],
    baseCamp: { latitude: 28.57, longitude: 83.8, altitude: '4,130m' },
  },
  {
    name: 'Gasherbrum I',
    latitude: 35.7245,
    longitude: 76.6965,
    altitude: 8080,
    region: 'Karakoram',
    country: 'Pakistan/China',
    description: 'Hidden Peak.',
    track: [
      { latitude: 35.7, longitude: 76.67 },
      { latitude: 35.7245, longitude: 76.6965 },
    ],
    baseCamp: { latitude: 35.7, longitude: 76.67, altitude: '5,100m' },
  },
  {
    name: 'Broad Peak',
    latitude: 35.8122,
    longitude: 76.5651,
    altitude: 8051,
    region: 'Karakoram',
    country: 'Pakistan/China',
    description: 'Near K2.',
    track: [
      { latitude: 35.79, longitude: 76.54 },
      { latitude: 35.8122, longitude: 76.5651 },
    ],
    baseCamp: { latitude: 35.79, longitude: 76.54, altitude: '4,900m' },
  },
  {
    name: 'Gasherbrum II',
    latitude: 35.7583,
    longitude: 76.6533,
    altitude: 8035,
    region: 'Karakoram',
    country: 'Pakistan/China',
    description: 'More accessible 8000m peak.',
    track: [
      { latitude: 35.73, longitude: 76.63 },
      { latitude: 35.7583, longitude: 76.6533 },
    ],
    baseCamp: { latitude: 35.73, longitude: 76.63, altitude: '5,100m' },
  },
  {
    name: 'Shishapangma',
    latitude: 28.3525,
    longitude: 85.7792,
    altitude: 8027,
    region: 'Tibet',
    country: 'China',
    description: 'Lowest 8000m peak.',
    track: [
      { latitude: 28.37, longitude: 85.75 },
      { latitude: 28.3525, longitude: 85.7792 },
    ],
    baseCamp: { latitude: 28.37, longitude: 85.75, altitude: '5,000m' },
  },

  // ======================
  // 🏔️ Major 7000m Peaks
  // ======================
  {
    name: 'Noshaq',
    latitude: 36.434,
    longitude: 71.823,
    altitude: 7492,
    region: 'Hindu Kush',
    country: 'Afghanistan',
    description: 'Highest mountain in Afghanistan.',
    track: [
      { latitude: 36.42, longitude: 71.8 },
      { latitude: 36.434, longitude: 71.823 },
    ],
    baseCamp: { latitude: 36.42, longitude: 71.8, altitude: '4,450m' },
  },
  {
    name: 'Tirich Mir',
    latitude: 36.255,
    longitude: 71.841,
    altitude: 7708,
    region: 'Hindu Kush',
    country: 'Pakistan',
    description: 'Highest peak of Hindu Kush.',
    track: [
      { latitude: 36.23, longitude: 71.82 },
      { latitude: 36.255, longitude: 71.841 },
    ],
    baseCamp: { latitude: 36.23, longitude: 71.82, altitude: '4,700m' },
  },
  {
    name: 'Trivor',
    latitude: 36.086,
    longitude: 75.175,
    altitude: 7720,
    region: 'Karakoram',
    country: 'Pakistan',
    description: 'Remote Karakoram peak.',
    track: [
      { latitude: 36.06, longitude: 75.15 },
      { latitude: 36.086, longitude: 75.175 },
    ],
    baseCamp: { latitude: 36.06, longitude: 75.15, altitude: '4,800m' },
  },

  // ======================
  // 🇮🇷 Iranian Peaks
  // ======================
  {
    name: 'Damavand',
    latitude: 35.951,
    longitude: 52.109,
    altitude: 5610,
    region: 'Alborz',
    country: 'Iran',
    description: 'Highest mountain in Iran and Middle East.',
    track: [
      { latitude: 35.92, longitude: 52.11 }, // Southern Route Start
      { latitude: 35.935, longitude: 52.11 }, // Bargah Sevom
      { latitude: 35.951, longitude: 52.109 }, // Summit
    ],
    baseCamp: { latitude: 35.92, longitude: 52.11, altitude: '3,000m' },
  },
  {
    name: 'Sabalan',
    latitude: 38.272,
    longitude: 47.845,
    altitude: 4811,
    region: 'Iran',
    country: 'Iran',
    description: 'Dormant volcano in northwest Iran.',
    track: [
      { latitude: 38.29, longitude: 47.82 },
      { latitude: 38.272, longitude: 47.845 },
    ],
    baseCamp: { latitude: 38.29, longitude: 47.82, altitude: '3,600m' },
  },
  {
    name: 'Alam Kuh',
    latitude: 36.384,
    longitude: 50.983,
    altitude: 4850,
    region: 'Alborz',
    country: 'Iran',
    description: 'Technical climbing peak in Iran.',
    track: [
      { latitude: 36.36, longitude: 50.96 },
      { latitude: 36.384, longitude: 50.983 },
    ],
    baseCamp: { latitude: 36.36, longitude: 50.96, altitude: '3,800m' },
  },
];
