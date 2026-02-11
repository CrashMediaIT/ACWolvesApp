import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function DrillDetailScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🎯</Text>
        <Text style={styles.title}>Drill Detail</Text>
        <Text style={styles.subtitle}>
          Step-by-step drill breakdown and instructions
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>—</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>—</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Difficulty</Text>
        <Text style={styles.value}>—</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Duration</Text>
        <Text style={styles.value}>— min</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.cardText}>Drill instructions will appear here.</Text>
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
  label: { fontSize: 12, color: '#94A3B8', marginBottom: 4, textTransform: 'uppercase' },
  value: { fontSize: 16, color: '#E2E8F0' },
  cardText: { fontSize: 14, color: '#E2E8F0' },
});
