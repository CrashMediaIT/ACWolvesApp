import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../theme/colors';

export default function GoalsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🥅</Text>
        <Text style={styles.title}>Goals</Text>
        <Text style={styles.subtitle}>
          Set, track, and achieve personal development goals
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Define short-term and long-term goals with measurable targets. Track
          progress and receive feedback from coaches.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.emptyText}>No goals set yet</Text>
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
