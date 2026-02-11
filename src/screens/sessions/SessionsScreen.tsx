import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function SessionsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🏒</Text>
        <Text style={styles.title}>Sessions</Text>
        <Text style={styles.subtitle}>
          Browse, book, and manage training sessions
        </Text>
      </View>

      {['Morning Skate', 'Power Skating', 'Stick Handling Clinic'].map((name, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={styles.cardText}>Scheduled • Tap to view details</Text>
        </View>
      ))}

      <View style={styles.card}>
        <Text style={styles.emptyText}>Pull to refresh for latest sessions</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  header: { padding: 24, alignItems: 'center' },
  icon: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#A8A8B8', textAlign: 'center' },
  card: {
    backgroundColor: '#16161F',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2D3F',
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 4 },
  cardText: { fontSize: 14, color: '#A8A8B8' },
  emptyText: { fontSize: 14, color: '#6B6B7B', textAlign: 'center' },
});
