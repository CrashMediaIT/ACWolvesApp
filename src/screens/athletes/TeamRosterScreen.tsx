import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TeamRosterScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>📝</Text>
        <Text style={styles.title}>Team Roster</Text>
        <Text style={styles.subtitle}>
          Full roster view with player positions and numbers
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={[styles.colHeader, { flex: 0.5 }]}>#</Text>
          <Text style={[styles.colHeader, { flex: 2 }]}>Name</Text>
          <Text style={[styles.colHeader, { flex: 1 }]}>Position</Text>
        </View>
        <Text style={styles.emptyText}>Roster data will load here</Text>
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
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 8,
    marginBottom: 12,
  },
  colHeader: { fontSize: 12, color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase' },
  emptyText: { fontSize: 14, color: '#64748B', textAlign: 'center', paddingVertical: 16 },
});
