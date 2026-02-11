import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../theme/colors';

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
