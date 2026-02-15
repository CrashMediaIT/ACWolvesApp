/**
 * Main bottom-tab navigator shown to authenticated users.
 *
 * Each tab may contain its own nested stack navigator.
 * Tabs shown depend on the authenticated user's role.
 */

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useAuth } from '../contexts/AuthContext';
import { canAccess } from '../utils/roles';
import { faHouse, faCalendarCheck, faUsers, faBars } from '../theme/icons';

// ── Screens ───────────────────────────────────────────────
import HomeScreen from '../screens/dashboard/HomeScreen';
import ScheduleScreen from '../screens/dashboard/ScheduleScreen';
import SessionsScreen from '../screens/sessions/SessionsScreen';
import SessionDetailScreen from '../screens/sessions/SessionDetailScreen';
import AthletesScreen from '../screens/athletes/AthletesScreen';
import AthleteDetailScreen from '../screens/athletes/AthleteDetailScreen';
import TeamRosterScreen from '../screens/athletes/TeamRosterScreen';
import DrillsScreen from '../screens/drills/DrillsScreen';
import DrillDetailScreen from '../screens/drills/DrillDetailScreen';
import PracticePlansScreen from '../screens/drills/PracticePlansScreen';
import EvaluationsScreen from '../screens/evaluations/EvaluationsScreen';
import GoalsScreen from '../screens/evaluations/GoalsScreen';
import HealthScreen from '../screens/health/HealthScreen';
import NutritionScreen from '../screens/health/NutritionScreen';
import WorkoutsScreen from '../screens/health/WorkoutsScreen';
import FinanceScreen from '../screens/finance/FinanceScreen';
import POSScreen from '../screens/finance/POSScreen';
import HRScreen from '../screens/hr/HRScreen';
import ReportsScreen from '../screens/reports/ReportsScreen';
import MessagesScreen from '../screens/messages/MessagesScreen';
import NotificationsScreen from '../screens/messages/NotificationsScreen';
import VideoScreen from '../screens/video/VideoScreen';
import ShopScreen from '../screens/shop/ShopScreen';
import AdminScreen from '../screens/admin/AdminScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import GamePlanScreen from '../screens/gameplan/GamePlanScreen';
import RosterScreen from '../screens/gameplan/RosterScreen';
import AddPlayerScreen from '../screens/gameplan/AddPlayerScreen';
import PlayerDetailScreen from '../screens/gameplan/PlayerDetailScreen';
import TeamCalendarScreen from '../screens/gameplan/TeamCalendarScreen';
import AddEventScreen from '../screens/gameplan/AddEventScreen';
import ImportCalendarScreen from '../screens/gameplan/ImportCalendarScreen';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SessionsStack = createNativeStackNavigator();
const AthletesStack = createNativeStackNavigator();
const MoreStack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: colors.bgSecondary },
  headerTintColor: colors.textWhite,
};

// ── Home Stack ────────────────────────────────────────────
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../../assets/ArcticWolves.png')}
              style={headerStyles.logo}
              resizeMode="contain"
            />
          ),
        }}
      />
      <HomeStack.Screen name="Schedule" component={ScheduleScreen} />
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} />
    </HomeStack.Navigator>
  );
}

// ── Sessions Stack ────────────────────────────────────────
function SessionsStackScreen() {
  return (
    <SessionsStack.Navigator screenOptions={screenOptions}>
      <SessionsStack.Screen name="SessionsList" component={SessionsScreen} options={{ title: 'Sessions' }} />
      <SessionsStack.Screen name="SessionDetail" component={SessionDetailScreen} options={{ title: 'Session Detail' }} />
    </SessionsStack.Navigator>
  );
}

// ── Athletes Stack ────────────────────────────────────────
function AthletesStackScreen() {
  return (
    <AthletesStack.Navigator screenOptions={screenOptions}>
      <AthletesStack.Screen name="AthletesList" component={AthletesScreen} options={{ title: 'Athletes' }} />
      <AthletesStack.Screen name="AthleteDetail" component={AthleteDetailScreen} options={{ title: 'Athlete Detail' }} />
      <AthletesStack.Screen name="TeamRoster" component={TeamRosterScreen} options={{ title: 'Team Roster' }} />
    </AthletesStack.Navigator>
  );
}

// ── More Stack (all other features) ──────────────────────
function MoreStackScreen() {
  const { state } = useAuth();
  const roles = state.user?.roles ?? (state.user?.role ? [state.user.role] : []);

  return (
    <MoreStack.Navigator screenOptions={screenOptions}>
      <MoreStack.Screen name="MoreMenu" component={ProfileScreen} options={{ title: 'More' }} />
      {canAccess(roles, 'drills') && (
        <>
          <MoreStack.Screen name="Drills" component={DrillsScreen} />
          <MoreStack.Screen name="DrillDetail" component={DrillDetailScreen} options={{ title: 'Drill Detail' }} />
        </>
      )}
      {canAccess(roles, 'practicePlans') && (
        <MoreStack.Screen name="PracticePlans" component={PracticePlansScreen} options={{ title: 'Practice Plans' }} />
      )}
      {canAccess(roles, 'evaluations') && (
        <MoreStack.Screen name="Evaluations" component={EvaluationsScreen} />
      )}
      {canAccess(roles, 'goals') && (
        <MoreStack.Screen name="Goals" component={GoalsScreen} />
      )}
      {canAccess(roles, 'health') && (
        <>
          <MoreStack.Screen name="Health" component={HealthScreen} />
          <MoreStack.Screen name="Nutrition" component={NutritionScreen} />
          <MoreStack.Screen name="Workouts" component={WorkoutsScreen} />
        </>
      )}
      {canAccess(roles, 'finance') && (
        <MoreStack.Screen name="Finance" component={FinanceScreen} />
      )}
      {canAccess(roles, 'pos') && (
        <MoreStack.Screen name="POS" component={POSScreen} />
      )}
      {canAccess(roles, 'hr') && (
        <MoreStack.Screen name="HR" component={HRScreen} />
      )}
      {canAccess(roles, 'reports') && (
        <MoreStack.Screen name="Reports" component={ReportsScreen} />
      )}
      {canAccess(roles, 'messages') && (
        <MoreStack.Screen name="Messages" component={MessagesScreen} />
      )}
      {canAccess(roles, 'video') && (
        <MoreStack.Screen name="Video" component={VideoScreen} />
      )}
      {canAccess(roles, 'shop') && (
        <MoreStack.Screen name="Shop" component={ShopScreen} />
      )}
      {canAccess(roles, 'admin') && (
        <MoreStack.Screen name="Admin" component={AdminScreen} />
      )}
      {canAccess(roles, 'gamePlan') && (
        <>
          <MoreStack.Screen name="GamePlan" component={GamePlanScreen} options={{ title: 'Game Plan' }} />
          <MoreStack.Screen name="Roster" component={RosterScreen} options={{ title: 'Roster' }} />
          <MoreStack.Screen name="AddPlayer" component={AddPlayerScreen} options={{ title: 'Add Player' }} />
          <MoreStack.Screen name="PlayerDetail" component={PlayerDetailScreen} options={{ title: 'Player' }} />
          <MoreStack.Screen name="TeamCalendar" component={TeamCalendarScreen} options={{ title: 'Team Calendar' }} />
          <MoreStack.Screen name="AddEvent" component={AddEventScreen} options={{ title: 'Add Event' }} />
          <MoreStack.Screen name="ImportCalendar" component={ImportCalendarScreen} options={{ title: 'Import Calendar' }} />
        </>
      )}
    </MoreStack.Navigator>
  );
}

// ── Main Tabs ─────────────────────────────────────────────
export default function MainTabs() {
  const { state } = useAuth();
  const roles = state.user?.roles ?? (state.user?.role ? [state.user.role] : []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.bgSecondary, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHouse} size={size} color={color} />
          ),
        }}
      />
      {canAccess(roles, 'sessions') && (
        <Tab.Screen
          name="SessionsTab"
          component={SessionsStackScreen}
          options={{
            title: 'Sessions',
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faCalendarCheck} size={size} color={color} />
            ),
          }}
        />
      )}
      {canAccess(roles, 'athletes') && (
        <Tab.Screen
          name="AthletesTab"
          component={AthletesStackScreen}
          options={{
            title: 'Athletes',
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faUsers} size={size} color={color} />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="MoreTab"
        component={MoreStackScreen}
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faBars} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const headerStyles = StyleSheet.create({
  logo: { width: 32, height: 32 },
});
