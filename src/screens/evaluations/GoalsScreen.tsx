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
import { faBullseye } from '../../theme/icons';
import { evaluationsApi } from '../../api/services';
import { useApiData } from '../../hooks/useApiData';
import type { Evaluation } from '../../types';

export default function GoalsScreen() {
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

  const goals = data ?? [];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />
      }
    >
      <View style={styles.header}>
        <FontAwesomeIcon icon={faBullseye} size={48} color={colors.primary} style={styles.icon} />
        <Text style={styles.title}>Goals</Text>
      </View>

      {goals.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.emptyText}>No goals set yet</Text>
        </View>
      ) : (
        goals.map((g) => (
          <View key={g.id} style={styles.card}>
            <Text style={styles.athleteName}>{g.athleteName}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.goalType}>{g.type}</Text>
              <Text style={styles.date}>{g.date}</Text>
            </View>
            <View style={styles.progressRow}>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${Math.min(g.score * 10, 100)}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressLabel}>{g.score}/10</Text>
            </View>
            {g.notes ? (
              <Text style={styles.notes} numberOfLines={2}>
                {g.notes}
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
  athleteName: { fontSize: 16, fontWeight: '600', color: colors.textWhite },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  goalType: { fontSize: 13, color: colors.accent, fontWeight: '600' },
  date: { fontSize: 13, color: colors.textSecondary },
  progressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  progressTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: { height: 8, borderRadius: 4, backgroundColor: colors.primary },
  progressLabel: { fontSize: 13, fontWeight: '600', color: colors.textWhite, width: 36 },
  notes: { fontSize: 13, color: colors.textMuted, marginTop: 8 },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
  errorText: { fontSize: 14, color: colors.error },
});
