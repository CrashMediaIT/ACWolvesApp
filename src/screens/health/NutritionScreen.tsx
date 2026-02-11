import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function NutritionScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🥗</Text>
        <Text style={styles.title}>Nutrition</Text>
        <Text style={styles.subtitle}>
          Meal plans, calorie tracking, and nutritional guidance
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Today's Summary</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Calories</Text>
          <Text style={styles.statValue}>— / — kcal</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Protein</Text>
          <Text style={styles.statValue}>— g</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Carbs</Text>
          <Text style={styles.statValue}>— g</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Fat</Text>
          <Text style={styles.statValue}>— g</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.emptyText}>Log your meals to get started</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B1929' },
  header: { padding: 24, alignItems: 'center' },
  icon: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#94A3B8', textAlign: 'center' },
  card: {
    backgroundColor: '#1E293B',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 12 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statLabel: { fontSize: 14, color: '#94A3B8' },
  statValue: { fontSize: 14, fontWeight: '600', color: '#E2E8F0' },
  emptyText: { fontSize: 14, color: '#64748B', textAlign: 'center' },
});
