import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function DrillsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🎯</Text>
        <Text style={styles.title}>Drill Library</Text>
        <Text style={styles.subtitle}>
          Browse and manage drills for practices and training
        </Text>
      </View>

      {['Skating', 'Shooting', 'Passing', 'Defensive'].map((cat) => (
        <View key={cat} style={styles.card}>
          <Text style={styles.cardTitle}>{cat} Drills</Text>
          <Text style={styles.cardText}>Tap to browse drills in this category</Text>
        </View>
      ))}
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
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 4 },
  cardText: { fontSize: 14, color: '#94A3B8' },
});
