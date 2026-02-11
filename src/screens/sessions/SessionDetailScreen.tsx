import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../theme/colors';

export default function SessionDetailScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>🏒</Text>
        <Text style={styles.title}>Session Detail</Text>
        <Text style={styles.subtitle}>
          View session information, roster, and attendance
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>—</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Date & Time</Text>
        <Text style={styles.value}>—</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>—</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Coach</Text>
        <Text style={styles.value}>—</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Participants</Text>
        <Text style={styles.value}>— / —</Text>
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
  label: { fontSize: 12, color: colors.textSecondary, marginBottom: 4, textTransform: 'uppercase' },
  value: { fontSize: 16, color: colors.textWhite },
});
