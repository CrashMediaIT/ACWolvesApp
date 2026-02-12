import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { practicePlansApi } from '../../api/services';
import { useApiData } from '../../hooks/useApiData';
import colors from '../../theme/colors';
import type { PracticePlan } from '../../types';

export default function PracticePlansScreen() {
  const { data: plans, loading, error, refresh } = useApiData<PracticePlan[]>(
    () => practicePlansApi.list(),
  );

  if (loading && !plans) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refresh}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No practice plans found</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.listContent}
      data={plans}
      keyExtractor={(item) => String(item.id)}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          {item.description ? (
            <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
          ) : null}
          <View style={styles.cardMeta}>
            <Text style={styles.metaText}>{new Date(item.date).toLocaleDateString()}</Text>
            <Text style={styles.metaText}>{item.duration} min</Text>
            <Text style={styles.metaText}>{item.drills.length} drills</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  listContent: { padding: 16 },
  center: { flex: 1, backgroundColor: colors.bgMain, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: colors.bgCard,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.textWhite, marginBottom: 4 },
  cardDesc: { fontSize: 14, color: colors.textSecondary, marginBottom: 8 },
  cardMeta: { flexDirection: 'row', gap: 16 },
  metaText: { fontSize: 13, color: colors.textMuted },
  errorText: { fontSize: 16, color: colors.error, marginBottom: 12 },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { fontSize: 14, fontWeight: '600', color: colors.textWhite },
  emptyText: { fontSize: 16, color: colors.textMuted },
});
