import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Waypoint } from '../Types/trackTypes';
import { Colors, Typography, Spacing, Radius } from '../Assets/theme';

const WAYPOINT_CONFIG = {
  start: { bg: Colors.primaryBg, color: Colors.primary, icon: '⛳' },
  summit: { bg: Colors.accentBg, color: Colors.accent, icon: '⛰️' },
  water: { bg: Colors.infoBg, color: Colors.info, icon: '💧' },
  rest: { bg: Colors.infoBg, color: Colors.info, icon: '🏕️' },
  waypoint: { bg: '#F0E6F6', color: '#7B3FA0', icon: '🏁' },
  end: { bg: Colors.gray50, color: Colors.gray700, icon: '🏁' },
  viewpoint: { bg: Colors.infoBg, color: Colors.info, icon: '🔭' },
};

interface Props {
  waypoint: Waypoint;
  isReached?: boolean;
  isNext?: boolean;
}

export function WaypointItem({
  waypoint,
  isReached = false,
  isNext = false,
}: Props) {
  const cfg = WAYPOINT_CONFIG[waypoint.type];

  return (
    <View style={[styles.container, isNext && styles.containerNext]}>
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: cfg.bg },
          isReached && styles.iconReached,
        ]}
      >
        <Text style={styles.icon}>{cfg.icon}</Text>
        {isReached && (
          <View style={styles.checkBadge}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{waypoint.name}</Text>
        <Text style={styles.sub}>
          {waypoint.distanceFromStart.toFixed(1)} km
          {waypoint.description ? ` · ${waypoint.description}` : ''}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={[styles.elev, { color: cfg.color }]}>
          {waypoint.elevation.toLocaleString()} m
        </Text>
        {isNext && (
          <View style={[styles.nextBadge, { backgroundColor: cfg.bg }]}>
            <Text style={[styles.nextLabel, { color: cfg.color }]}>Next</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray100,
  },
  containerNext: {
    backgroundColor: Colors.surfaceAlt,
    marginHorizontal: -Spacing.lg,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.sm,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconReached: {
    opacity: 0.7,
  },
  icon: {
    fontSize: 16,
  },
  checkBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    fontSize: 8,
    color: Colors.white,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: Typography.base,
    fontWeight: Typography.medium,
    color: Colors.gray900,
  },
  sub: {
    fontSize: Typography.xs,
    color: Colors.gray500,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    gap: 4,
  },
  elev: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
  },
  nextBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.round,
  },
  nextLabel: {
    fontSize: 10,
    fontWeight: Typography.semibold,
  },
});
