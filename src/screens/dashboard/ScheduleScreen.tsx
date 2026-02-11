import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ScheduleScreen() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>📅</Text>
        <Text style={styles.title}>Schedule</Text>
        <Text style={styles.subtitle}>
          Weekly calendar view of sessions, games, and events
        </Text>
      </View>

      <View style={styles.weekRow}>
        {days.map((d) => (
          <View key={d} style={styles.dayCell}>
            <Text style={styles.dayLabel}>{d}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Your upcoming sessions and events will be shown here. Pull to refresh
          for the latest schedule.
        </Text>
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
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  dayCell: { alignItems: 'center' },
  dayLabel: { fontSize: 14, fontWeight: '600', color: '#94A3B8' },
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
});
