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
import { useNavigation } from '@react-navigation/native';
import { drillsApi } from '../../api/services';
import { useApiData } from '../../hooks/useApiData';
import colors from '../../theme/colors';
import type { Drill } from '../../types';

const categoryColors: Record<string, string> = {
  Skating: colors.info,
  Shooting: colors.error,
  Passing: colors.success,
  Defensive: colors.warning,
};

function getCategoryColor(category: string): string {
  return categoryColors[category] ?? colors.primary;
}

export default function DrillsScreen() {
  const navigation = useNavigation<any>();
  const { data: drills, loading, error, refresh } = useApiData<Drill[]>(
    () => drillsApi.list(),
  );

  if (loading && !drills) {
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

  if (!drills || drills.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No drills found</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.listContent}
      data={drills}
      keyExtractor={(item) => String(item.id)}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('DrillDetail', { drill: item })}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={[styles.badge, { backgroundColor: getCategoryColor(item.category) }]}>
              <Text style={styles.badgeText}>{item.category}</Text>
            </View>
          </View>
          <View style={styles.cardMeta}>
            <Text style={styles.metaText}>Difficulty: {item.difficulty}</Text>
            <Text style={styles.metaText}>{item.duration} min</Text>
          </View>
        </TouchableOpacity>
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.textWhite, flex: 1, marginRight: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 12, fontWeight: '600', color: colors.textWhite },
  cardMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  metaText: { fontSize: 13, color: colors.textSecondary },
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
