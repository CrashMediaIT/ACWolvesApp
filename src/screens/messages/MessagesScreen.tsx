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
import { messagesApi } from '../../api/services';
import type { Message } from '../../types';

export default function MessagesScreen() {
  const { data, loading, error, refresh } = useApiData<Message[]>(messagesApi.list);

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
        <Text style={styles.icon}>✉️</Text>
        <Text style={styles.emptyText}>No messages</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.card, !item.isRead && styles.cardUnread]}>
      <View style={styles.cardHeader}>
        {!item.isRead && <View style={styles.unreadDot} />}
        <Text style={styles.senderName} numberOfLines={1}>
          {item.senderName}
        </Text>
        <Text style={styles.date}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <Text style={styles.subject} numberOfLines={1}>
        {item.subject}
      </Text>
      <Text style={styles.bodyPreview} numberOfLines={2}>
        {item.body}
      </Text>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.listContent}
      data={data}
      keyExtractor={(item) => String(item.id)}
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
  cardUnread: {
    borderColor: colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 8,
  },
  senderName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.textWhite,
  },
  date: { fontSize: 12, color: colors.textMuted },
  subject: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textWhite,
    marginBottom: 4,
  },
  bodyPreview: { fontSize: 13, color: colors.textSecondary },
});
