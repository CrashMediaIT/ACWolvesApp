import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PracticePlansScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>📋</Text>
        <Text style={styles.title}>Practice Plans</Text>
        <Text style={styles.subtitle}>
          Create, organize, and schedule structured practice plans
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Build practice plans by combining drills, setting durations, and
          assigning them to upcoming sessions.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.emptyText}>No practice plans created yet</Text>
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
  cardText: { fontSize: 14, color: '#E2E8F0' },
  emptyText: { fontSize: 14, color: '#64748B', textAlign: 'center' },
});
