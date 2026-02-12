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
import { sessionsApi } from '../../api/services';
import { useApiData } from '../../hooks/useApiData';
import colors from '../../theme/colors';
import type { Session } from '../../types';

const statusColors: Record<Session['status'], string> = {
  scheduled: colors.primary,
  in_progress: colors.warning,
  completed: colors.success,
  cancelled: colors.error,
};

const statusLabels: Record<Session['status'], string> = {
  scheduled: 'Scheduled',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export default function SessionsScreen() {
  const navigation = useNavigation<any>();
  const { data, loading, error, refresh } = useApiData<Session[]>(
    () => sessionsApi.list(),
  );

  if (loading && !data) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error && !data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refresh}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const sessions = data ?? [];

  const renderSession = ({ item }: { item: Session }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('SessionDetail', { session: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={[styles.badge, { backgroundColor: statusColors[item.status] }]}>
          <Text style={styles.badgeText}>{statusLabels[item.status]}</Text>
        </View>
      </View>
      <Text style={styles.cardText}>{item.sessionType}</Text>
      <Text style={styles.cardText}>
        {item.date} • {item.startTime} – {item.endTime}
      </Text>
      <Text style={styles.cardText}>{item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={sessions.length === 0 ? styles.emptyContainer : styles.listContent}
      data={sessions}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderSession}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />
      }
      ListEmptyComponent={
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No sessions found</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  listContent: { padding: 16 },
  emptyContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  centered: { flex: 1, backgroundColor: colors.bgMain, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: colors.bgCard,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.textWhite, flexShrink: 1 },
  cardText: { fontSize: 14, color: colors.textSecondary, marginTop: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  badgeText: { fontSize: 12, fontWeight: '600', color: colors.textWhite },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
  errorText: { fontSize: 14, color: colors.error, marginBottom: 12, textAlign: 'center' },
  retryButton: { backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 },
  retryText: { fontSize: 14, fontWeight: '600', color: colors.textWhite },
});
