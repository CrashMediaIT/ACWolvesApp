import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../theme/colors';

export default function AthleteDetailScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>⛸️</Text>
        <Text style={styles.title}>Athlete Detail</Text>
        <Text style={styles.subtitle}>
          Profile, statistics, and evaluation history
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>—</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Position</Text>
        <Text style={styles.value}>—</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Team</Text>
        <Text style={styles.value}>—</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Season Stats</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Games Played</Text>
          <Text style={styles.statValue}>—</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Goals</Text>
          <Text style={styles.statValue}>—</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Assists</Text>
          <Text style={styles.statValue}>—</Text>
        </View>
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
  label: { fontSize: 12, color: colors.textSecondary, marginBottom: 4, textTransform: 'uppercase' },
  value: { fontSize: 16, color: colors.textWhite },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.textWhite, marginBottom: 12 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statLabel: { fontSize: 14, color: colors.textSecondary },
  statValue: { fontSize: 14, fontWeight: '600', color: colors.textWhite },
});
