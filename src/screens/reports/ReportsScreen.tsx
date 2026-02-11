import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../theme/colors';

export default function ReportsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>📈</Text>
        <Text style={styles.title}>Reports</Text>
        <Text style={styles.subtitle}>
          Analytics, performance data, and exportable reports
        </Text>
      </View>

      {[
        { label: 'Attendance Report', desc: 'Session attendance by athlete and date range' },
        { label: 'Performance Report', desc: 'Evaluation scores and trend analysis' },
        { label: 'Financial Report', desc: 'Revenue, expenses, and projections' },
        { label: 'Health Report', desc: 'Nutrition and workout compliance data' },
      ].map((item) => (
        <View key={item.label} style={styles.card}>
          <Text style={styles.cardTitle}>{item.label}</Text>
          <Text style={styles.cardText}>{item.desc}</Text>
        </View>
      ))}
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
});
