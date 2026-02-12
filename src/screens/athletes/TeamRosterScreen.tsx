import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { athletesApi } from '../../api/services';
import { useApiData } from '../../hooks/useApiData';
import colors from '../../theme/colors';
import type { Athlete } from '../../types';

interface TeamSection {
  title: string;
  data: Athlete[];
}

const UNASSIGNED_TEAM = 'Unassigned';

function groupByTeam(athletes: Athlete[]): TeamSection[] {
  const map = new Map<string, Athlete[]>();
  for (const a of athletes) {
    const team = a.teamName || UNASSIGNED_TEAM;
    if (!map.has(team)) map.set(team, []);
    map.get(team)!.push(a);
  }
  return Array.from(map, ([title, data]) => ({ title, data }));
}

export default function TeamRosterScreen() {
  const { data, loading, error, refresh } = useApiData<Athlete[]>(
    () => athletesApi.list(),
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

  const sections = groupByTeam(data ?? []);

  return (
    <SectionList
      style={styles.container}
      contentContainerStyle={sections.length === 0 ? styles.emptyContainer : styles.listContent}
      sections={sections}
      keyExtractor={(item) => String(item.id)}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionHeader}>{section.title}</Text>
      )}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.cardText}>{item.position}</Text>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />
      }
      ListEmptyComponent={
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No athletes found</Text>
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textWhite,
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: colors.bgCard,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.textWhite, marginBottom: 2 },
  cardText: { fontSize: 14, color: colors.textSecondary },
  emptyText: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
  errorText: { fontSize: 14, color: colors.error, marginBottom: 12, textAlign: 'center' },
  retryButton: { backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 },
  retryText: { fontSize: 14, fontWeight: '600', color: colors.textWhite },
});
