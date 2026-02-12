import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import colors from '../../theme/colors';
import type { Athlete } from '../../types';

export default function AthleteDetailScreen() {
  const route = useRoute();
  const { athlete } = route.params as { athlete: Athlete };

  const initials = `${athlete.firstName.charAt(0)}${athlete.lastName.charAt(0)}`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarWrapper}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>First Name</Text>
        <Text style={styles.value}>{athlete.firstName}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Last Name</Text>
        <Text style={styles.value}>{athlete.lastName}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{athlete.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Date of Birth</Text>
        <Text style={styles.value}>{athlete.dateOfBirth}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Position</Text>
        <Text style={styles.value}>{athlete.position}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Team</Text>
        <Text style={styles.value}>{athlete.teamName}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain, padding: 16 },
  avatarWrapper: { alignItems: 'center', marginVertical: 24 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 32, fontWeight: '700', color: colors.textWhite },
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
});
