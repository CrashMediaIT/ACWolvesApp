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
import colors from '../../theme/colors';
import { useApiData } from '../../hooks/useApiData';
import { videoApi } from '../../api/services';

type VideoRecord = Record<string, unknown>;

export default function VideoScreen() {
  const { data, loading, error, refresh } = useApiData<unknown[]>(videoApi.list);

  if (loading && !data) {
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

  if (!data || data.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.icon}>🎬</Text>
        <Text style={styles.emptyText}>No videos</Text>
      </View>
    );
  }

  const renderItem = ({ item, index }: { item: unknown; index: number }) => {
    const record = (item ?? {}) as VideoRecord;
    const title = String(record.title ?? record.name ?? `Video ${index + 1}`);
    const description = record.description ?? record.summary ?? '';
    const date = record.date ?? record.createdAt ?? record.created_at ?? '';

    return (
      <View style={styles.card}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {description ? (
          <Text style={styles.description} numberOfLines={2}>
            {String(description)}
          </Text>
        ) : null}
        {date ? (
          <Text style={styles.date}>
            {new Date(String(date)).toLocaleDateString()}
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.listContent}
      data={data}
      keyExtractor={(_item, index) => String((_item as VideoRecord)?.id ?? index)}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={loading && !!data}
          onRefresh={refresh}
          tintColor={colors.primary}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  listContent: { padding: 16 },
  center: {
    flex: 1,
    backgroundColor: colors.bgMain,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  icon: { fontSize: 48, marginBottom: 8 },
  emptyText: { fontSize: 16, color: colors.textMuted, textAlign: 'center' },
  errorText: { fontSize: 14, color: colors.error, textAlign: 'center', marginBottom: 12 },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { color: colors.textWhite, fontWeight: '600' },
  card: {
    backgroundColor: colors.bgCard,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textWhite,
    marginBottom: 4,
  },
  description: { fontSize: 13, color: colors.textSecondary, marginBottom: 8 },
  date: { fontSize: 12, color: colors.textMuted },
});
