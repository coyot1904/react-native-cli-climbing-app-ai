import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../Assets/theme';

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  accent?: boolean;
  small?: boolean;
}

export function StatCard({
  label,
  value,
  unit,
  accent = false,
  small = false,
}: StatCardProps) {
  return (
    <View style={[styles.card, accent && styles.cardAccent]}>
      <Text
        style={[
          styles.value,
          accent && styles.valueAccent,
          small && styles.valueSmall,
        ]}
      >
        {value}
        {unit ? <Text style={styles.unit}> {unit}</Text> : null}
      </Text>
      <Text style={[styles.label, accent && styles.labelAccent]}>{label}</Text>
    </View>
  );
}

interface StatRowProps {
  stats: Array<{ label: string; value: string; unit?: string }>;
}

export function StatRow({ stats }: StatRowProps) {
  return (
    <View style={styles.row}>
      {stats.map((s, i) => (
        <React.Fragment key={i}>
          <View style={styles.statCell}>
            <Text style={styles.cellValue}>{s.value}</Text>
            {s.unit ? <Text style={styles.cellUnit}>{s.unit}</Text> : null}
            <Text style={styles.cellLabel}>{s.label}</Text>
          </View>
          {i < stats.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  // StatCard
  card: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
    flex: 1,
  },
  cardAccent: {
    backgroundColor: Colors.primaryBg,
  },
  value: {
    fontSize: Typography.lg,
    fontWeight: Typography.semibold,
    color: Colors.gray900,
    lineHeight: 24,
  },
  valueAccent: {
    color: Colors.primary,
  },
  valueSmall: {
    fontSize: Typography.md,
  },
  unit: {
    fontSize: Typography.xs,
    fontWeight: Typography.regular,
    color: Colors.gray500,
  },
  label: {
    fontSize: Typography.xs,
    color: Colors.gray500,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  labelAccent: {
    color: Colors.primaryDark,
  },

  // StatRow
  row: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray100,
  },
  statCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  cellValue: {
    fontSize: Typography.md,
    fontWeight: Typography.semibold,
    color: Colors.gray900,
  },
  cellUnit: {
    fontSize: Typography.xs,
    color: Colors.gray500,
  },
  cellLabel: {
    fontSize: 10,
    color: Colors.gray500,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  divider: {
    width: 0.5,
    backgroundColor: Colors.gray100,
    marginVertical: Spacing.sm,
  },
});
