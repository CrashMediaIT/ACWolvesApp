import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../theme/colors';

export default function POSScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🏪</Text>
        <Text style={styles.title}>Point of Sale</Text>
        <Text style={styles.subtitle}>
          Front desk sales terminal for walk-in transactions
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Process payments for sessions, merchandise, and drop-in fees.
          Designed for front desk staff to handle quick transactions.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <Text style={styles.cardText}>• New Sale</Text>
        <Text style={styles.cardText}>• Session Drop-in</Text>
        <Text style={styles.cardText}>• Merchandise Purchase</Text>
        <Text style={styles.cardText}>• Refund</Text>
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
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.textWhite, marginBottom: 8 },
  cardText: { fontSize: 14, color: colors.textWhite, marginBottom: 4 },
});
