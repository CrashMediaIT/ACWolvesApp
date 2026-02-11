import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../theme/colors';

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
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.textWhite, marginBottom: 4 },
  cardText: { fontSize: 14, color: colors.textSecondary },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
});
