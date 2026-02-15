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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUsers, faCalendar } from '../../theme/icons';
import { teamsApi } from '../../api/services';
import { useApiData } from '../../hooks/useApiData';
import colors from '../../theme/colors';
import type { Team } from '../../types';

export default function GamePlanScreen() {
  const navigation = useNavigation<any>();
  const { data, loading, error, refresh } = useApiData<Team[]>(
    () => teamsApi.list(),
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

  const teams = data ?? [];

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={teams.length === 0 ? styles.emptyContainer : styles.listContent}
      data={teams}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardText}>
              {item.organization} · {item.ageGroup}
            </Text>
            <Text style={styles.cardText}>Season: {item.season}</Text>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Roster', { team: item })}
            >
              <FontAwesomeIcon icon={faUsers} size={14} color={colors.primary} />
              <Text style={styles.actionText}>Roster</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('TeamCalendar', { team: item })}
            >
              <FontAwesomeIcon icon={faCalendar} size={14} color={colors.primary} />
              <Text style={styles.actionText}>Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />
      }
      ListEmptyComponent={
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No teams found</Text>
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
  cardBody: { marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.textWhite, marginBottom: 2 },
  cardText: { fontSize: 14, color: colors.textSecondary, marginTop: 2 },
  cardActions: { flexDirection: 'row', gap: 10 },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgMain,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
  },
  actionText: { fontSize: 13, fontWeight: '600', color: colors.primary, marginLeft: 6 },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
  errorText: { fontSize: 14, color: colors.error, marginBottom: 12, textAlign: 'center' },
  retryButton: { backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 },
  retryText: { fontSize: 14, fontWeight: '600', color: colors.textWhite },
});
