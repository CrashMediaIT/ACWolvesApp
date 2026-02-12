import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useAuth } from '../../contexts/AuthContext';
import { canAccess } from '../../utils/roles';
import type { AppSection } from '../../utils/roles';
import type { UserRole } from '../../types';
import colors from '../../theme/colors';
import {
  faClipboardList,
  faFileLines,
  faClipboardCheck,
  faBullseye,
  faHeartPulse,
  faChartPie,
  faCashRegister,
  faMoneyCheckDollar,
  faChartLine,
  faComments,
  faVideo,
  faStore,
  faUserGear,
  faSignOutAlt,
  faChevronRight,
  type IconDefinition,
} from '../../theme/icons';

interface MenuItem {
  label: string;
  icon: IconDefinition;
  route: string;
  section: AppSection;
}

const MENU_ITEMS: MenuItem[] = [
  { label: 'Drills', icon: faClipboardList, route: 'Drills', section: 'drills' },
  { label: 'Practice Plans', icon: faFileLines, route: 'PracticePlans', section: 'practicePlans' },
  { label: 'Evaluations', icon: faClipboardCheck, route: 'Evaluations', section: 'evaluations' },
  { label: 'Goals', icon: faBullseye, route: 'Goals', section: 'goals' },
  { label: 'Health', icon: faHeartPulse, route: 'Health', section: 'health' },
  { label: 'Finance', icon: faChartPie, route: 'Finance', section: 'finance' },
  { label: 'POS', icon: faCashRegister, route: 'POS', section: 'pos' },
  { label: 'HR', icon: faMoneyCheckDollar, route: 'HR', section: 'hr' },
  { label: 'Reports', icon: faChartLine, route: 'Reports', section: 'reports' },
  { label: 'Messages', icon: faComments, route: 'Messages', section: 'messages' },
  { label: 'Video', icon: faVideo, route: 'Video', section: 'video' },
  { label: 'Shop', icon: faStore, route: 'Shop', section: 'shop' },
  { label: 'Admin', icon: faUserGear, route: 'Admin', section: 'admin' },
];

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { state, signOut } = useAuth();
  const user = state.user;

  const userRoles: UserRole[] = user?.roles ?? (user?.role ? [user.role] : []);

  const visibleItems = MENU_ITEMS.filter((item) => canAccess(userRoles, item.section));

  const initials =
    ((user?.firstName?.[0] ?? '') + (user?.lastName?.[0] ?? '')).toUpperCase() || '?';

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => signOut() },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.title}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.subtitle}>{user?.email}</Text>
        <Text style={styles.role}>
          {user?.roles?.join(', ').replace(/_/g, ' ') ?? user?.role?.replace(/_/g, ' ') ?? '—'}
        </Text>
      </View>

      {/* Menu items */}
      <View style={styles.menuContainer}>
        {visibleItems.map((item, index) => (
          <TouchableOpacity
            key={item.route}
            style={[
              styles.menuItem,
              index === visibleItems.length - 1 && { borderBottomWidth: 0 },
            ]}
            onPress={() => navigation.navigate(item.route)}
          >
            <View style={styles.menuIconWrap}>
              <FontAwesomeIcon icon={item.icon} size={16} color={colors.primary} />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <FontAwesomeIcon icon={faChevronRight} size={12} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} size={16} color={colors.textWhite} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgMain },
  header: { padding: 24, alignItems: 'center' },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 28, fontWeight: '700', color: colors.textWhite },
  title: { fontSize: 24, fontWeight: '700', color: colors.textWhite, marginBottom: 4 },
  subtitle: { fontSize: 14, color: colors.textSecondary, textAlign: 'center' },
  role: {
    fontSize: 13,
    color: colors.primaryLight,
    textTransform: 'capitalize',
    marginTop: 4,
  },
  menuContainer: {
    marginHorizontal: 16,
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIconWrap: { width: 32, alignItems: 'center', marginRight: 12 },
  menuLabel: { flex: 1, fontSize: 16, color: colors.textWhite },
  logoutButton: {
    backgroundColor: colors.danger,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: { fontSize: 16, fontWeight: '700', color: colors.textWhite },
});
