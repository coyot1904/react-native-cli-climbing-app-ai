import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyChat = () => (
  <View style={styles.emptyContainer}>
    <View style={styles.iconCircle}>
      <Text style={styles.logoIcon}>🏔️</Text>
    </View>
    <Text style={styles.emptyTitle}>Summit Intelligence</Text>
    <Text style={styles.emptySubtitle}>
      Ready for your next ascent? Ask about weather, knots, or the best crags in
      the Alps.
    </Text>

    <View style={styles.chipContainer}>
      {['Top 10 Peaks', 'Safety Gear', 'Local Crags'].map(item => (
        <View key={item} style={styles.chip}>
          <Text style={styles.chipText}>{item}</Text>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    transform: [{ scaleY: -1 }], // Flips back because GiftedChat is inverted
    paddingBottom: 30,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#7C8AA5',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1A2436',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A3A55',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 24,
    gap: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF8A3D33',
    backgroundColor: '#FF8A3D11',
  },
  chipText: { color: '#FF8A3D', fontSize: 12, fontWeight: '600' },
  logoIcon: { fontSize: 40 },
});

export default EmptyChat;
