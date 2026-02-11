import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../theme/colors';

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
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.textWhite, marginBottom: 12 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statLabel: { fontSize: 14, color: colors.textSecondary },
  statValue: { fontSize: 14, fontWeight: '600', color: colors.textWhite },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
});
