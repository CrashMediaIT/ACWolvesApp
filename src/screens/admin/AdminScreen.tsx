import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';
import { adminApi } from '../../api/services';
import { useApiData } from '../../hooks/useApiData';

export default function AdminScreen() {
  const { data, loading, error, refresh } = useApiData<unknown>(
    () => adminApi.getSystemHealth(),
  );

  const healthEntries = data ? Object.entries(data as Record<string, unknown>) : [];

  if (loading && !data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error && !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={refresh}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />}
    >
      <View style={styles.header}>
        <Text style={styles.icon}>⚙️</Text>
        <Text style={styles.title}>Admin Panel</Text>
        <Text style={styles.subtitle}>System administration and configuration</Text>
      </View>

      <Text style={styles.sectionTitle}>System Health</Text>
      {healthEntries.map(([key, value]) => (
        <View key={key} style={styles.kvCard}>
          <Text style={styles.kvLabel}>{key}</Text>
          <Text style={styles.kvValue}>{String(value ?? '—')}</Text>
        </View>
      ))}

      {healthEntries.length === 0 && (
        <View style={styles.kvCard}>
          <Text style={styles.emptyText}>No system health data available</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  center: { flex: 1, backgroundColor: colors.bgMain, justifyContent: 'center', alignItems: 'center', padding: 24 },
  header: { padding: 24, alignItems: 'center' },
  icon: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: colors.textWhite, marginBottom: 4 },
  subtitle: { fontSize: 14, color: colors.textSecondary, textAlign: 'center' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textWhite,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  kvCard: {
    backgroundColor: colors.bgCard,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kvLabel: { fontSize: 14, color: colors.textSecondary, flex: 1 },
  kvValue: { fontSize: 14, fontWeight: '600', color: colors.textWhite, flexShrink: 0 },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center', flex: 1 },
  errorText: { fontSize: 16, color: colors.error, marginBottom: 16, textAlign: 'center' },
  retryBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: { color: colors.textWhite, fontWeight: '600', fontSize: 14 },
});
