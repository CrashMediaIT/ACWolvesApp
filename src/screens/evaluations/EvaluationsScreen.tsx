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
import { faClipboardCheck } from '../../theme/icons';
import { evaluationsApi } from '../../api/services';
import { useApiData } from '../../hooks/useApiData';
import type { Evaluation } from '../../types';

function scoreColor(score: number): string {
  if (score >= 8) return colors.success;
  if (score >= 5) return colors.warning;
  return colors.error;
}

export default function EvaluationsScreen() {
  const { data, loading, error, refresh } = useApiData<Evaluation[]>(
    () => evaluationsApi.list(),
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

  const evaluations = data ?? [];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />
      }
    >
      <View style={styles.header}>
        <FontAwesomeIcon icon={faClipboardCheck} size={48} color={colors.primary} style={styles.icon} />
        <Text style={styles.title}>Evaluations</Text>
      </View>

      {evaluations.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.emptyText}>No evaluations to display</Text>
        </View>
      ) : (
        evaluations.map((ev) => (
          <View key={ev.id} style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.athleteName}>{ev.athleteName}</Text>
              <View style={[styles.scoreBadge, { backgroundColor: scoreColor(ev.score) }]}>
                <Text style={styles.scoreText}>{ev.score}</Text>
              </View>
            </View>
            <Text style={styles.meta}>
              Coach: {ev.coachName}  ·  {ev.date}  ·  {ev.type}
            </Text>
            {ev.notes ? (
              <Text style={styles.notes} numberOfLines={2}>
                {ev.notes}
              </Text>
            ) : null}
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
  athleteName: { fontSize: 16, fontWeight: '600', color: colors.textWhite },
  scoreBadge: {
    borderRadius: 10,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: { fontSize: 14, fontWeight: '700', color: colors.textWhite },
  meta: { fontSize: 13, color: colors.textSecondary, marginTop: 6 },
  notes: { fontSize: 13, color: colors.textMuted, marginTop: 6 },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
  errorText: { fontSize: 14, color: colors.error },
});
