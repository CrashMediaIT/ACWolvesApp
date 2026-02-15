import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLink, faUserPlus } from '../../theme/icons';
import { rostersApi } from '../../api/services';
import { useApiData } from '../../hooks/useApiData';
import colors from '../../theme/colors';
import type { Team, RosterPlayer } from '../../types';

export default function RosterScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { team } = route.params as { team: Team };

  const fetcher = useCallback(() => rostersApi.listByTeam(team.id), [team.id]);
  const { data, loading, error, refresh } = useApiData<RosterPlayer[]>(fetcher);

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

  const players = data ?? [];

  const renderPlayer = ({ item }: { item: RosterPlayer }) => {
    const initials = `${item.firstName.charAt(0)}${item.lastName.charAt(0)}`;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('PlayerDetail', { team, player: item })}
      >
        <View style={styles.cardRow}>
          <View style={[styles.avatar, item.isLinked ? styles.avatarLinked : styles.avatarUnlinked]}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.nameRow}>
              <Text style={styles.cardTitle}>
                {item.firstName} {item.lastName}
              </Text>
              {item.isLinked && (
                <FontAwesomeIcon icon={faLink} size={12} color={colors.success} style={styles.linkIcon} />
              )}
            </View>
            <Text style={styles.cardText}>
              {item.position}{item.jerseyNumber ? ` · #${item.jerseyNumber}` : ''}
            </Text>
            {item.isLinked && (
              <Text style={styles.linkedText}>Linked to Arctic Wolves account</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={players.length === 0 ? styles.emptyContainer : styles.listContent}
        data={players}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderPlayer}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{team.name}</Text>
            <Text style={styles.headerSubtitle}>
              {players.length} player{players.length !== 1 ? 's' : ''} · {players.filter((p) => p.isLinked).length} linked
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No players on this roster yet</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPlayer', { team })}
      >
        <FontAwesomeIcon icon={faUserPlus} size={18} color={colors.textWhite} />
        <Text style={styles.addButtonText}>Add Player</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  list: { flex: 1 },
  listContent: { padding: 16, paddingBottom: 80 },
  emptyContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  centered: { flex: 1, backgroundColor: colors.bgMain, justifyContent: 'center', alignItems: 'center' },
  header: { marginBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors.textWhite },
  headerSubtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  card: {
    backgroundColor: colors.bgCard,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarLinked: { backgroundColor: colors.success },
  avatarUnlinked: { backgroundColor: colors.primary },
  avatarText: { fontSize: 16, fontWeight: '700', color: colors.textWhite },
  cardBody: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  linkIcon: { marginLeft: 6 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.textWhite },
  cardText: { fontSize: 14, color: colors.textSecondary, marginTop: 2 },
  linkedText: { fontSize: 12, color: colors.success, marginTop: 2 },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
  errorText: { fontSize: 14, color: colors.error, marginBottom: 12, textAlign: 'center' },
  retryButton: { backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 },
  retryText: { fontSize: 14, fontWeight: '600', color: colors.textWhite },
  addButton: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: { fontSize: 16, fontWeight: '600', color: colors.textWhite, marginLeft: 8 },
});
