import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import colors from '../../theme/colors';
import { faCalendar, faLocationDot } from '../../theme/icons';
import { dashboardApi } from '../../api/services';
import { useApiData } from '../../hooks/useApiData';
import type { Session } from '../../types';

const statusColors: Record<Session['status'], string> = {
  scheduled: colors.info,
  in_progress: colors.warning,
  completed: colors.success,
  cancelled: colors.error,
};

function groupByDate(sessions: Session[]): Record<string, Session[]> {
  return sessions.reduce<Record<string, Session[]>>((acc, s) => {
    const key = s.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});
}

export default function ScheduleScreen() {
  const { data, loading, error, refresh } = useApiData<Session[]>(
    () => dashboardApi.getSchedule(),
  );

  if (loading && !data) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const sessions = data ?? [];
  const grouped = groupByDate(sessions);
  const sortedDates = Object.keys(grouped).sort();

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />
      }
    >
      <View style={styles.header}>
        <FontAwesomeIcon icon={faCalendar} size={48} color={colors.primary} style={styles.icon} />
        <Text style={styles.title}>Schedule</Text>
      </View>

      {sessions.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.emptyText}>No upcoming events</Text>
        </View>
      ) : (
        sortedDates.map((date) => (
          <View key={date}>
            <Text style={styles.dateHeader}>{date}</Text>
            {grouped[date].map((s) => (
              <View key={s.id} style={styles.card}>
                <View style={styles.cardRow}>
                  <Text style={styles.time}>
                    {s.startTime} – {s.endTime}
                  </Text>
                  <View style={[styles.badge, { backgroundColor: statusColors[s.status] }]}>
                    <Text style={styles.badgeText}>{s.status.replace('_', ' ')}</Text>
                  </View>
                </View>
                <Text style={styles.sessionTitle}>{s.title}</Text>
                {s.location ? (
                  <View style={styles.locationRow}>
                    <FontAwesomeIcon icon={faLocationDot} size={13} color={colors.textMuted} />
                    <Text style={styles.location}> {s.location}</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  center: { justifyContent: 'center', alignItems: 'center' },
  header: { padding: 24, alignItems: 'center' },
  icon: { marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: colors.textWhite, marginBottom: 4 },
  dateHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  card: {
    backgroundColor: colors.bgCard,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  time: { fontSize: 13, color: colors.textSecondary },
  sessionTitle: { fontSize: 16, fontWeight: '600', color: colors.textWhite, marginTop: 6 },
  location: { fontSize: 13, color: colors.textMuted },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  badge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: 11, fontWeight: '700', color: colors.textWhite, textTransform: 'capitalize' },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
  errorText: { fontSize: 14, color: colors.error },
});
