import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../theme/colors';

export default function AthletesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>⛸️</Text>
        <Text style={styles.title}>Athletes</Text>
        <Text style={styles.subtitle}>
          View and manage athlete profiles and performance
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Athlete list will appear here. Coaches and admins can add, edit, and
          review athlete profiles.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.emptyText}>No athletes loaded yet</Text>
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
