import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../theme/colors';

export default function FinanceScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>💰</Text>
        <Text style={styles.title}>Finance</Text>
        <Text style={styles.subtitle}>
          Financial overview, invoicing, and payment tracking
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Revenue Summary</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>This Month</Text>
          <Text style={styles.statValue}>$—</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Outstanding</Text>
          <Text style={styles.statValue}>$—</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>YTD Total</Text>
          <Text style={styles.statValue}>$—</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Manage invoices, track payments, and view financial reports. Admin
          access required for full financial management.
        </Text>
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
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.textWhite, marginBottom: 12 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statLabel: { fontSize: 14, color: colors.textSecondary },
  statValue: { fontSize: 14, fontWeight: '600', color: colors.textWhite },
  cardText: { fontSize: 14, color: colors.textWhite },
});
