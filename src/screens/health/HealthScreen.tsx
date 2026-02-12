import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../theme/colors';

const sections = [
  { key: 'Nutrition', icon: '🥗', desc: 'Track meals, macros, and meal plans' },
  { key: 'Workouts', icon: '💪', desc: 'Off-ice workout programs and logs' },
];

export default function HealthScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>💚</Text>
        <Text style={styles.title}>Health</Text>
        <Text style={styles.subtitle}>
          Holistic health management — nutrition, workouts, and wellness
        </Text>
      </View>

      {sections.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={styles.card}
          activeOpacity={0.7}
          onPress={() => navigation.navigate(item.key)}
        >
          <Text style={styles.cardIcon}>{item.icon}</Text>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{item.key}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
        </TouchableOpacity>
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
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: { fontSize: 36, marginRight: 16 },
  cardBody: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: colors.textWhite, marginBottom: 4 },
  cardDesc: { fontSize: 14, color: colors.textSecondary },
});
