import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import colors from '../../theme/colors';

export default function ProfileScreen() {
  const { state, signOut } = useAuth();
  const user = state.user;

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => signOut() },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>👤</Text>
        <Text style={styles.title}>{user?.firstName} {user?.lastName}</Text>
        <Text style={styles.subtitle}>{user?.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Role</Text>
        <Text style={styles.value}>
          {user?.roles?.join(', ').replace(/_/g, ' ') ?? user?.role?.replace(/_/g, ' ') ?? '—'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Two-Factor Authentication</Text>
        <Text style={styles.value}>{user?.is2FAEnabled ? 'Enabled' : 'Disabled'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Account ID</Text>
        <Text style={styles.value}>{user?.id ?? '—'}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
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
  value: { fontSize: 16, color: colors.textWhite, textTransform: 'capitalize' },
  logoutButton: {
    backgroundColor: colors.danger,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 32,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  logoutText: { fontSize: 16, fontWeight: '700', color: colors.textWhite },
});
