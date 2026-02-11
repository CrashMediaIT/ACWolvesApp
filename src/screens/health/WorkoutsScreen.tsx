import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../theme/colors';

export default function WorkoutsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>💪</Text>
        <Text style={styles.title}>Workouts</Text>
        <Text style={styles.subtitle}>
          Off-ice workout programs, exercise logs, and progress tracking
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Follow assigned workout plans, log completed exercises, and track
          strength and conditioning progress over the season.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.emptyText}>No workouts scheduled</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  header: { padding: 24, alignItems: 'center' },
  icon: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: colors.textWhite, marginBottom: 4 },
  subtitle: { fontSize: 14, color: colors.textSecondary, textAlign: 'center' },
  card: {
    backgroundColor: colors.bgCard,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardText: { fontSize: 14, color: colors.textWhite },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
});
