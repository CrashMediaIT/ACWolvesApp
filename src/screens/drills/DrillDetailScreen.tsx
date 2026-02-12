import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import colors from '../../theme/colors';
import type { Drill } from '../../types';

export default function DrillDetailScreen() {
  const route = useRoute();
  const { drill } = route.params as { drill: Drill };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{drill.title}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Category</Text>
        <Text style={styles.value}>{drill.category}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Difficulty</Text>
        <Text style={styles.value}>{drill.difficulty}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Duration</Text>
        <Text style={styles.value}>{drill.duration} min</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.cardText}>{drill.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  content: { padding: 16 },
  header: { marginBottom: 12 },
  title: { fontSize: 24, fontWeight: '700', color: colors.textWhite },
  card: {
    backgroundColor: colors.bgCard,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: { fontSize: 12, color: colors.textSecondary, marginBottom: 4, textTransform: 'uppercase' },
  value: { fontSize: 16, color: colors.textWhite },
  cardText: { fontSize: 14, color: colors.textWhite, lineHeight: 20 },
});
