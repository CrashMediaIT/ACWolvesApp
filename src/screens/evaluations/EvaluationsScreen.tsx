import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function EvaluationsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>📊</Text>
        <Text style={styles.title}>Evaluations</Text>
        <Text style={styles.subtitle}>
          Review and submit player performance evaluations
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Coaches can evaluate athletes on skating, shooting, passing, hockey IQ,
          and more. Athletes can view their evaluation history and track progress.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.emptyText}>No evaluations to display</Text>
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
