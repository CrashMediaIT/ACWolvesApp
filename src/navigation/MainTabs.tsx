/**
 * Main bottom-tab navigator shown to authenticated users.
 *
 * Each tab may contain its own nested stack navigator.
 * Tabs shown depend on the authenticated user's role.
 */

import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { canAccess } from '../utils/roles';

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

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SessionsStack = createNativeStackNavigator();
const AthletesStack = createNativeStackNavigator();
const MoreStack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: '#13131A' },
  headerTintColor: '#fff',
};

// ── Home Stack ────────────────────────────────────────────
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen name="Dashboard" component={HomeScreen} />
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
    </MoreStack.Navigator>
  );
}

// ── Tab icon helper ───────────────────────────────────────
function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>
      {emoji}
    </Text>
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
        tabBarStyle: { backgroundColor: '#13131A', borderTopColor: '#2D2D3F' },
        tabBarActiveTintColor: '#6B46C1',
        tabBarInactiveTintColor: '#6B6B7B',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
        }}
      />
      {canAccess(roles, 'sessions') && (
        <Tab.Screen
          name="SessionsTab"
          component={SessionsStackScreen}
          options={{
            title: 'Sessions',
            tabBarIcon: ({ focused }) => <TabIcon emoji="🏒" focused={focused} />,
          }}
        />
      )}
      {canAccess(roles, 'athletes') && (
        <Tab.Screen
          name="AthletesTab"
          component={AthletesStackScreen}
          options={{
            title: 'Athletes',
            tabBarIcon: ({ focused }) => <TabIcon emoji="⛸️" focused={focused} />,
          }}
        />
      )}
      <Tab.Screen
        name="MoreTab"
        component={MoreStackScreen}
        options={{
          title: 'More',
          tabBarIcon: ({ focused }) => <TabIcon emoji="☰" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}
