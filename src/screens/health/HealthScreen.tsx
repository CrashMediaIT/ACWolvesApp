import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

const healthSections = [
  { label: 'Nutrition', icon: '🥗', desc: 'Track meals, macros, and meal plans' },
  { label: 'Workouts', icon: '💪', desc: 'Off-ice workout programs and logs' },
  { label: 'Sleep', icon: '😴', desc: 'Monitor sleep quality and patterns' },
  { label: 'Injury Log', icon: '🩹', desc: 'Track injuries and recovery status' },
];

export default function HealthScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>💚</Text>
        <Text style={styles.title}>Health</Text>
        <Text style={styles.subtitle}>
          Holistic health management — nutrition, workouts, and wellness
        </Text>
      </View>

      {healthSections.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={styles.card}
          activeOpacity={0.7}
          onPress={() => Alert.alert('Navigate', `Open ${item.label}`)}
        >
          <Text style={styles.cardIcon}>{item.icon}</Text>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{item.label}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  header: { padding: 24, alignItems: 'center' },
  icon: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#A8A8B8', textAlign: 'center' },
  card: {
    backgroundColor: '#16161F',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2D3F',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: { fontSize: 28, marginRight: 16 },
  cardBody: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 2 },
  cardDesc: { fontSize: 13, color: '#A8A8B8' },
});
