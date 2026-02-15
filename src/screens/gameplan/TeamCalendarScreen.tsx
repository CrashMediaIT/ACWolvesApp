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
import {
  faPlus,
  faFileImport,
  faLocationDot,
  faHockeyPuck,
  faDumbbell,
} from '../../theme/icons';
import { teamEventsApi } from '../../api/services';
import { useApiData } from '../../hooks/useApiData';
import colors from '../../theme/colors';
import type { Team, TeamEvent } from '../../types';

const typeColors: Record<TeamEvent['type'], string> = {
  practice: colors.info,
  game: colors.warning,
};

const statusColors: Record<TeamEvent['status'], string> = {
  scheduled: colors.primary,
  in_progress: colors.warning,
  completed: colors.success,
  cancelled: colors.error,
};

export default function TeamCalendarScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { team } = route.params as { team: Team };

  const fetcher = useCallback(() => teamEventsApi.listByTeam(team.id), [team.id]);
  const { data, loading, error, refresh } = useApiData<TeamEvent[]>(fetcher);

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

  const events = data ?? [];

  const renderEvent = ({ item }: { item: TeamEvent }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <FontAwesomeIcon
            icon={item.type === 'game' ? faHockeyPuck : faDumbbell}
            size={14}
            color={typeColors[item.type]}
          />
          <Text style={[styles.typeBadge, { color: typeColors[item.type] }]}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColors[item.status] }]}>
          <Text style={styles.statusText}>{item.status.replace('_', ' ')}</Text>
        </View>
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      {item.opponent ? (
        <Text style={styles.cardText}>vs {item.opponent}</Text>
      ) : null}
      <Text style={styles.cardText}>
        {item.date} · {item.startTime} – {item.endTime}
      </Text>
      {item.location ? (
        <View style={styles.locationRow}>
          <FontAwesomeIcon icon={faLocationDot} size={12} color={colors.textMuted} />
          <Text style={styles.locationText}> {item.location}</Text>
        </View>
      ) : null}
      {item.coachName ? (
        <Text style={styles.coachText}>Coach: {item.coachName}</Text>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={events.length === 0 ? styles.emptyContainer : styles.listContent}
        data={events}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderEvent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{team.name} Calendar</Text>
            <Text style={styles.headerSubtitle}>
              {events.length} event{events.length !== 1 ? 's' : ''} · Season: {team.season || 'N/A'}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No events scheduled</Text>
          </View>
        }
      />
      <View style={styles.fabRow}>
        <TouchableOpacity
          style={styles.fabSecondary}
          onPress={() => navigation.navigate('ImportCalendar', { team })}
        >
          <FontAwesomeIcon icon={faFileImport} size={18} color={colors.textWhite} />
          <Text style={styles.fabText}>Import</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fabPrimary}
          onPress={() => navigation.navigate('AddEvent', { team })}
        >
          <FontAwesomeIcon icon={faPlus} size={18} color={colors.textWhite} />
          <Text style={styles.fabText}>Add Event</Text>
        </TouchableOpacity>
      </View>
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
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  typeBadge: { fontSize: 12, fontWeight: '700', marginLeft: 6, textTransform: 'capitalize' },
  statusBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  statusText: { fontSize: 11, fontWeight: '700', color: colors.textWhite, textTransform: 'capitalize' },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.textWhite, marginBottom: 2 },
  cardText: { fontSize: 14, color: colors.textSecondary, marginTop: 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationText: { fontSize: 13, color: colors.textMuted },
  coachText: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
  errorText: { fontSize: 14, color: colors.error, marginBottom: 12, textAlign: 'center' },
  retryButton: { backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 },
  retryText: { fontSize: 14, fontWeight: '600', color: colors.textWhite },
  fabRow: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: 12,
  },
  fabSecondary: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabPrimary: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: { fontSize: 14, fontWeight: '600', color: colors.textWhite, marginLeft: 8 },
});
