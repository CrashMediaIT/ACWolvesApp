import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import colors from '../../theme/colors';
import { faDumbbell } from '../../theme/icons';
import { healthApi } from '../../api/services';
import { useApiData } from '../../hooks/useApiData';

export default function WorkoutsScreen() {
  const { data, loading, error, refresh } = useApiData<unknown>(
    () => healthApi.getWorkouts(0),
  );

  const items = Array.isArray(data) ? (data as Record<string, unknown>[]) : [];

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
    <FlatList
      style={styles.container}
      data={items}
      keyExtractor={(_, i) => String(i)}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <FontAwesomeIcon icon={faDumbbell} size={48} color={colors.primary} style={styles.icon} />
          <Text style={styles.title}>Workouts</Text>
          <Text style={styles.subtitle}>Off-ice workout programs, exercise logs, and progress tracking</Text>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.card}>
          <Text style={styles.emptyText}>No workouts scheduled</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          {Object.entries(item).map(([key, value]) => (
            <View key={key} style={styles.row}>
              <Text style={styles.rowLabel}>{key}</Text>
              <Text style={styles.rowValue}>{String(value ?? '—')}</Text>
            </View>
          ))}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  center: { flex: 1, backgroundColor: colors.bgMain, justifyContent: 'center', alignItems: 'center', padding: 24 },
  header: { padding: 24, alignItems: 'center' },
  icon: { marginBottom: 8 },
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
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  rowLabel: { fontSize: 14, color: colors.textSecondary },
  rowValue: { fontSize: 14, fontWeight: '600', color: colors.textWhite },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
  errorText: { fontSize: 16, color: colors.error, marginBottom: 16, textAlign: 'center' },
  retryBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: { color: colors.textWhite, fontWeight: '600', fontSize: 14 },
});
