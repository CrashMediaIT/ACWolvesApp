import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { accessibleSections, type AppSection } from '../../utils/roles';
import { dashboardApi } from '../../api/services';
import { useApiData } from '../../hooks/useApiData';
import colors from '../../theme/colors';

const sectionMeta: Record<AppSection, { label: string; icon: string }> = {
  home: { label: 'Home', icon: '🏠' },
  sessions: { label: 'Sessions', icon: '🏒' },
  schedule: { label: 'Schedule', icon: '📅' },
  athletes: { label: 'Athletes', icon: '⛸️' },
  drills: { label: 'Drills', icon: '🎯' },
  practicePlans: { label: 'Practice Plans', icon: '📋' },
  evaluations: { label: 'Evaluations', icon: '📊' },
  goals: { label: 'Goals', icon: '🥅' },
  health: { label: 'Health', icon: '💚' },
  nutrition: { label: 'Nutrition', icon: '🥗' },
  workouts: { label: 'Workouts', icon: '💪' },
  video: { label: 'Video', icon: '🎬' },
  messages: { label: 'Messages', icon: '✉️' },
  notifications: { label: 'Notifications', icon: '🔔' },
  reports: { label: 'Reports', icon: '📈' },
  finance: { label: 'Finance', icon: '💰' },
  pos: { label: 'POS', icon: '🏪' },
  shop: { label: 'Shop', icon: '🛍️' },
  hr: { label: 'HR', icon: '👥' },
  admin: { label: 'Admin', icon: '⚙️' },
  profile: { label: 'Profile', icon: '👤' },
  stats: { label: 'Stats', icon: '📉' },
  teamRoster: { label: 'Team Roster', icon: '📝' },
  campCheckin: { label: 'Camp Check-in', icon: '✅' },
};

// Maps sections that live in the tab navigator directly
const tabSections: Record<string, string> = {
  sessions: 'SessionsTab',
  athletes: 'AthletesTab',
};

// Maps sections that live inside HomeStack
const homeStackSections: Record<string, string> = {
  schedule: 'Schedule',
  notifications: 'Notifications',
};

// Maps sections that live inside MoreStack (via MoreTab)
const moreScreenMap: Record<string, string> = {
  drills: 'Drills',
  practicePlans: 'PracticePlans',
  evaluations: 'Evaluations',
  goals: 'Goals',
  health: 'Health',
  nutrition: 'Nutrition',
  workouts: 'Workouts',
  video: 'Video',
  messages: 'Messages',
  reports: 'Reports',
  finance: 'Finance',
  pos: 'POS',
  shop: 'Shop',
  hr: 'HR',
  admin: 'Admin',
  profile: 'Profile',
  stats: 'Stats',
  teamRoster: 'TeamRoster',
  campCheckin: 'CampCheckin',
};

interface DashboardStats {
  upcoming_sessions?: number;
  total_athletes?: number;
  unread_messages?: number;
  [key: string]: unknown;
}

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { state } = useAuth();
  const user = state.user;
  const roles = user?.roles ?? (user?.role ? [user.role] : []);
  const sections = accessibleSections(roles).filter((s) => s !== 'home');

  const fetcher = useCallback(() => dashboardApi.getStats(), []);
  const { data: stats, loading, error, refresh } = useApiData<DashboardStats>(fetcher);

  const handleNavigate = (section: AppSection) => {
    if (tabSections[section]) {
      navigation.navigate(tabSections[section]);
    } else if (homeStackSections[section]) {
      navigation.navigate(homeStackSections[section]);
    } else if (moreScreenMap[section]) {
      navigation.navigate('MoreTab', { screen: moreScreenMap[section] });
    }
  };

  const statCards: { label: string; value: number; icon: string }[] = [
    { label: 'Upcoming Sessions', value: stats?.upcoming_sessions ?? 0, icon: '🏒' },
    { label: 'Total Athletes', value: stats?.total_athletes ?? 0, icon: '⛸️' },
    { label: 'Unread Messages', value: stats?.unread_messages ?? 0, icon: '✉️' },
  ];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={loading && !!stats}
          onRefresh={refresh}
          tintColor={colors.primary}
        />
      }
    >
      <View style={styles.header}>
        <Image
          source={require('../../../assets/ArcticWolves.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          Welcome, {user?.firstName ?? 'Player'}!
        </Text>
        <Text style={styles.subtitle}>
          Role: {roles.join(', ').replace(/_/g, ' ') || 'N/A'}
        </Text>
      </View>

      {loading && !stats ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load dashboard stats.</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refresh}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.statsRow}>
          {statCards.map((card) => (
            <View key={card.label} style={styles.statCard}>
              <Text style={styles.statIcon}>{card.icon}</Text>
              <Text style={styles.statValue}>{card.value}</Text>
              <Text style={styles.statLabel}>{card.label}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.grid}>
        {sections.map((section) => {
          const meta = sectionMeta[section];
          return (
            <TouchableOpacity
              key={section}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => handleNavigate(section)}
            >
              <Text style={styles.cardIcon}>{meta.icon}</Text>
              <Text style={styles.cardLabel}>{meta.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  header: { padding: 24, alignItems: 'center' },
  logo: { width: 64, height: 64, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: colors.textWhite, marginBottom: 4 },
  subtitle: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', textTransform: 'capitalize' },
  loader: { marginTop: 32 },
  errorContainer: { alignItems: 'center', padding: 24 },
  errorText: { color: colors.error, fontSize: 14, marginBottom: 12 },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryText: { color: colors.textWhite, fontWeight: '600', fontSize: 14 },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    margin: 4,
    padding: 12,
    alignItems: 'center',
  },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: '700', color: colors.textWhite },
  statLabel: { fontSize: 11, color: colors.textSecondary, textAlign: 'center', marginTop: 2 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    width: '45%',
    margin: '2.5%',
    padding: 20,
    alignItems: 'center',
  },
  cardIcon: { fontSize: 32, marginBottom: 8 },
  cardLabel: { fontSize: 14, fontWeight: '600', color: colors.textWhite, textAlign: 'center' },
});
