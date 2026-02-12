import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { accessibleSections, type AppSection } from '../../utils/roles';
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

export default function HomeScreen() {
  const { state } = useAuth();
  const user = state.user;
  const roles = user?.roles ?? (user?.role ? [user.role] : []);
  const sections = accessibleSections(roles).filter((s) => s !== 'home');

  return (
    <ScrollView style={styles.container}>
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

      <View style={styles.grid}>
        {sections.map((section) => {
          const meta = sectionMeta[section];
          return (
            <TouchableOpacity
              key={section}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => Alert.alert('Navigate', `Navigate to ${meta.label}`)}
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
