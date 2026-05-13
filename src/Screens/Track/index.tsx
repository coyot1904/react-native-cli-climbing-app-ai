/* eslint-disable react-native/no-inline-styles */
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Animated,
} from 'react-native';
import { MapType } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import { TrackMap } from '../../Components/TrackMap';
import { ElevationProfile } from '../../Components/ElevationProfile';
import { StatRow } from '../../Components/StatCard';
import { WaypointItem } from '../../Components/WaypointItem';
import { useTracking, formatDuration } from '../../Hooks/useTracking';
import { Waypoint } from '../../Types/trackTypes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadow,
} from '../../Assets/theme';
import { TrackScreenProps } from '../../Types/navigationTypes';

const DIFFICULTY_COLORS = {
  easy: { bg: Colors.primaryBg, text: Colors.primary },
  moderate: { bg: '#FFF8E0', text: '#B68A00' },
  hard: { bg: Colors.accentBg, text: Colors.accent },
  expert: { bg: '#F5E6F6', text: '#7B3FA0' },
};

const DIFFICULTY_LABELS = {
  easy: 'Easy',
  moderate: 'Moderate',
  hard: 'Hard',
  expert: 'Expert',
};

const TrackScreen: React.FC<TrackScreenProps> = ({ navigation, route }) => {
  const { trail } = route.params;
  const insets = useSafeAreaInsets();
  //const trail = ZIGANA_PEAK_TRACK;
  const [mapType, setMapType] = useState<MapType>('terrain');
  const [isSaved, setIsSaved] = useState(false);

  const {
    session,
    isActive,
    startTracking,
    pauseTracking,
    resumeTracking,
    stopTracking,
  } = useTracking(trail.id);

  const progressRatio =
    trail.distance > 0 ? session.distanceCovered / trail.distance : 0;

  const nextWaypoint = useMemo(() => {
    return trail.waypoints.find(
      wp => wp.distanceFromStart > session.distanceCovered,
    );
  }, [trail.waypoints, session.distanceCovered]);

  const handleStartStop = () => {
    if (!isActive) {
      startTracking();
    } else {
      Alert.alert('End tracking?', 'Your route will be saved.', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End',
          style: 'destructive',
          onPress: stopTracking,
        },
      ]);
    }
  };

  const toggleMapType = () => {
    setMapType(prev =>
      prev === 'terrain'
        ? 'satellite'
        : prev === 'satellite'
        ? 'standard'
        : 'terrain',
    );
  };

  const diffCfg =
    DIFFICULTY_COLORS[trail.difficulty as keyof typeof DIFFICULTY_COLORS];

  const liveStats = [
    {
      label: 'Distance',
      value: session.distanceCovered.toFixed(2),
      unit: 'km',
    },
    {
      label: 'Elevation',
      value:
        session.currentElevation > 0
          ? session.currentElevation.toFixed(0)
          : trail.minElevation.toFixed(0),
      unit: 'm',
    },
    { label: 'Duration', value: formatDuration(session.elapsedSeconds) },
    { label: 'Speed', value: session.avgSpeed.toFixed(1), unit: 'km/h' },
  ];

  const trailStats = [
    { label: 'Distance', value: trail.distance.toString(), unit: 'km' },
    { label: 'Ascent', value: trail.elevationGain.toLocaleString(), unit: 'm' },
    {
      label: 'Est. time',
      value: `${Math.floor(trail.estimatedDuration / 60)}h ${
        trail.estimatedDuration % 60
      }m`,
    },
    {
      label: 'Max alt.',
      value: trail.maxElevation.toLocaleString(),
      unit: 'm',
    },
  ];

  return (
    <View
      style={[
        styles.safe,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <TouchableOpacity
        style={styles.floatingBackButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={styles.backButtonIcon}>←</Text>
      </TouchableOpacity>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.trailName}>{trail.name}</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.location}>
                {trail.region}, {trail.country}
              </Text>
            </View>
            <View style={styles.metaRow}>
              <View style={[styles.diffBadge, { backgroundColor: diffCfg.bg }]}>
                <Text style={[styles.diffText, { color: diffCfg.text }]}>
                  {DIFFICULTY_LABELS[trail.difficulty]}
                </Text>
              </View>
              <View style={styles.typeBadge}>
                <Text style={styles.typeText}>
                  {trail.trailType.replace('-', ' ')}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.ratingWrap}>
              <Text style={styles.ratingNum}>{trail.rating}</Text>
              <Text style={styles.ratingStar}>★</Text>
            </View>
            <Text style={styles.ratingCount}>{trail.reviewCount} reviews</Text>
            <TouchableOpacity
              style={[styles.saveBtn, isSaved && styles.saveBtnActive]}
              onPress={() => setIsSaved(v => !v)}
            >
              <Text style={styles.saveBtnIcon}>{isSaved ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Map ── */}
        <View style={styles.mapWrap}>
          <TrackMap
            coordinates={trail.coordinates}
            waypoints={trail.waypoints}
            currentPosition={session.currentPosition}
            recordedPath={session.recordedPath}
            mapType={mapType}
            onMapTypeToggle={toggleMapType}
          />

          {/* Live badge */}
          {isActive && (
            <View style={styles.liveBadge}>
              <Animated.View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          )}

          {/* Current elevation overlay */}
          {session.currentElevation > 0 && (
            <View style={styles.elevBadge}>
              <Text style={styles.elevBadgeText}>
                ⛰ {Math.round(session.currentElevation)} m
              </Text>
            </View>
          )}
        </View>

        {/* ── Live stats (only during tracking) ── */}
        {isActive && (
          <View style={styles.liveStatsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Live stats</Text>
              <View style={styles.livePill}>
                <View style={styles.liveDotSmall} />
                <Text style={styles.livePillText}>Recording</Text>
              </View>
            </View>
            <StatRow stats={liveStats} />

            {/* Progress bar */}
            <View style={styles.progressWrap}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>
                  {session.distanceCovered.toFixed(2)} km of {trail.distance} km
                </Text>
                <Text style={styles.progressPct}>
                  {Math.round(progressRatio * 100)}%
                </Text>
              </View>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${Math.min(progressRatio * 100, 100)}%` as any },
                  ]}
                />
              </View>
              {nextWaypoint && (
                <Text style={styles.nextWpHint}>
                  Next: {nextWaypoint.name} in{' '}
                  {(
                    nextWaypoint.distanceFromStart - session.distanceCovered
                  ).toFixed(1)}{' '}
                  km
                </Text>
              )}
            </View>
          </View>
        )}

        {/* ── Trail stats ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trail info</Text>
        </View>
        <StatRow stats={trailStats} />

        {/* ── Elevation profile ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Elevation profile</Text>
          <View style={styles.elevChart}>
            <ElevationProfile
              data={trail.elevationProfile}
              progressRatio={progressRatio}
              width={340}
              height={100}
            />
          </View>
          <View style={styles.elevSummary}>
            <View style={styles.elevItem}>
              <Text style={styles.elevItemIcon}>↑</Text>
              <Text style={styles.elevItemVal}>
                +{trail.elevationGain.toLocaleString()} m
              </Text>
              <Text style={styles.elevItemLabel}>Gain</Text>
            </View>
            <View style={styles.elevItem}>
              <Text style={[styles.elevItemIcon, { color: Colors.info }]}>
                ↓
              </Text>
              <Text style={styles.elevItemVal}>
                -{trail.elevationLoss.toLocaleString()} m
              </Text>
              <Text style={styles.elevItemLabel}>Loss</Text>
            </View>
            <View style={styles.elevItem}>
              <Text style={[styles.elevItemIcon, { color: Colors.accent }]}>
                ▲
              </Text>
              <Text style={styles.elevItemVal}>
                {trail.maxElevation.toLocaleString()} m
              </Text>
              <Text style={styles.elevItemLabel}>Max</Text>
            </View>
            <View style={styles.elevItem}>
              <Text style={[styles.elevItemIcon, { color: Colors.gray500 }]}>
                ▼
              </Text>
              <Text style={styles.elevItemVal}>
                {trail.minElevation.toLocaleString()} m
              </Text>
              <Text style={styles.elevItemLabel}>Min</Text>
            </View>
          </View>
        </View>

        {/* ── Waypoints ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Waypoints</Text>
          <View style={styles.waypointList}>
            {trail.waypoints.map((wp: Waypoint) => (
              <WaypointItem
                key={wp.id}
                waypoint={wp}
                isReached={session.distanceCovered >= wp.distanceFromStart}
                isNext={nextWaypoint?.id === wp.id}
              />
            ))}
          </View>
        </View>

        {/* ── Bottom padding for FAB ── */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Floating action buttons ── */}
      <View style={styles.fabArea}>
        {isActive && (
          <TouchableOpacity
            style={styles.fabSecondary}
            onPress={session.isPaused ? resumeTracking : pauseTracking}
            activeOpacity={0.85}
          >
            <Text style={styles.fabSecondaryText}>
              {session.isPaused ? '▶ Resume' : '⏸ Pause'}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.fabPrimary, isActive && styles.fabPrimaryStop]}
          onPress={handleStartStop}
          activeOpacity={0.88}
        >
          <LinearGradient
            colors={
              isActive
                ? [Colors.danger, '#C0392B']
                : [Colors.primaryLight, Colors.primary]
            }
            style={styles.fabGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.fabPrimaryIcon}>{isActive ? '⏹' : '▶'}</Text>
            <Text style={styles.fabPrimaryText}>
              {isActive ? 'End tracking' : 'Start tracking'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TrackScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
    paddingTop: Spacing.md,
  },
  content: {
    paddingTop: Spacing.md,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  headerLeft: { flex: 1, marginRight: Spacing.md },
  trailName: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.gray900,
    lineHeight: 28,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  locationIcon: { fontSize: 12 },
  location: {
    fontSize: Typography.sm,
    color: Colors.gray500,
  },
  metaRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  diffBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.round,
  },
  diffText: {
    fontSize: 11,
    fontWeight: Typography.semibold,
  },
  typeBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.round,
    backgroundColor: Colors.gray50,
  },
  typeText: {
    fontSize: 11,
    color: Colors.gray700,
    textTransform: 'capitalize',
  },
  headerRight: { alignItems: 'flex-end', gap: 4 },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingNum: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.gray900,
  },
  ratingStar: { fontSize: Typography.md, color: '#E8A020' },
  ratingCount: { fontSize: 10, color: Colors.gray500 },
  saveBtn: {
    marginTop: Spacing.xs,
    width: 32,
    height: 32,
    borderRadius: Radius.round,
    backgroundColor: Colors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnActive: { backgroundColor: '#FFF0F0' },
  saveBtnIcon: { fontSize: 16 },

  // Map
  mapWrap: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    position: 'relative',
  },
  liveBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: Radius.round,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.primaryLight,
  },
  liveText: {
    fontSize: 11,
    color: Colors.white,
    fontWeight: Typography.bold,
    letterSpacing: 1,
  },
  elevBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: Radius.round,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  elevBadgeText: {
    fontSize: 11,
    color: Colors.white,
    fontWeight: Typography.medium,
  },

  // Live stats
  liveStatsSection: {
    marginBottom: Spacing.lg,
    backgroundColor: Colors.surface,
    ...Shadow.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray100,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.primaryBg,
    borderRadius: Radius.round,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
  },
  liveDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  livePillText: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: Typography.semibold,
  },

  progressWrap: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  progressLabel: { fontSize: Typography.sm, color: Colors.gray500 },
  progressPct: {
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
    color: Colors.primary,
  },
  progressTrack: {
    height: 6,
    backgroundColor: Colors.gray100,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  nextWpHint: {
    marginTop: Spacing.sm,
    fontSize: 11,
    color: Colors.gray500,
  },

  // Sections
  section: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: Typography.semibold,
    color: Colors.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: Spacing.sm,
  },

  // Elevation chart
  elevChart: {
    alignItems: 'center',
    marginHorizontal: -Spacing.xs,
  },
  elevSummary: {
    flexDirection: 'row',
    marginTop: Spacing.md,
    gap: Spacing.xs,
  },
  elevItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.sm,
  },
  elevItemIcon: {
    fontSize: Typography.md,
    color: Colors.primary,
    fontWeight: Typography.bold,
  },
  elevItemVal: {
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
    color: Colors.gray900,
  },
  elevItemLabel: {
    fontSize: 10,
    color: Colors.gray500,
    marginTop: 1,
  },

  // Waypoints
  waypointList: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    ...Shadow.sm,
  },

  // FAB
  fabArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.md,
    backgroundColor: Colors.background,
    borderTopWidth: 0.5,
    borderColor: Colors.gray100,
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  fabPrimary: {
    flex: 1,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadow.md,
    marginBottom: 10,
  },
  fabPrimaryStop: {},
  fabGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 58,
    marginBottom: 10,
  },
  fabPrimaryIcon: { fontSize: Typography.md, color: Colors.white },
  fabPrimaryText: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.white,
  },
  fabSecondary: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.gray300,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    ...Shadow.sm,
  },
  fabSecondaryText: {
    fontSize: Typography.base,
    fontWeight: Typography.medium,
    color: Colors.gray700,
  },
  floatingBackButton: {
    position: 'absolute',
    top: 40, // Adjust based on your theme Spacing
    left: Spacing.lg,
    zIndex: 100, // Ensure it stays above the Map and Header
    width: 40,
    height: 40,
    borderRadius: Radius.round,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight transparency
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray100,
    ...Shadow.sm, // Using your theme's shadow
  },
  backButtonIcon: {
    fontSize: 22,
    color: Colors.gray900,
    fontWeight: 'bold',
    // Fine-tune position if the arrow isn't centered
    marginTop: -2,
  },
});
