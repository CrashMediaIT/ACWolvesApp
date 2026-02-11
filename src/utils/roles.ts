/**
 * Role-based access helpers.
 *
 * Maps each user role to the dashboard sections it may access.
 * These mirror the permission checks in the Arctic Wolves backend
 * (dashboard.php and security.php).
 */

import type { UserRole } from '../types';

/** All navigable sections of the app */
export type AppSection =
  | 'home'
  | 'sessions'
  | 'schedule'
  | 'athletes'
  | 'drills'
  | 'practicePlans'
  | 'evaluations'
  | 'goals'
  | 'health'
  | 'nutrition'
  | 'workouts'
  | 'video'
  | 'messages'
  | 'notifications'
  | 'reports'
  | 'finance'
  | 'pos'
  | 'shop'
  | 'hr'
  | 'admin'
  | 'profile'
  | 'stats'
  | 'teamRoster'
  | 'campCheckin';

/**
 * Defines which sections each role can access.
 * Admin has access to everything.
 */
const roleSections: Record<UserRole, AppSection[]> = {
  admin: [
    'home', 'sessions', 'schedule', 'athletes', 'drills', 'practicePlans',
    'evaluations', 'goals', 'health', 'nutrition', 'workouts', 'video',
    'messages', 'notifications', 'reports', 'finance', 'pos', 'shop',
    'hr', 'admin', 'profile', 'stats', 'teamRoster', 'campCheckin',
  ],
  coach: [
    'home', 'sessions', 'schedule', 'athletes', 'drills', 'practicePlans',
    'evaluations', 'goals', 'video', 'messages', 'notifications', 'reports',
    'profile', 'stats', 'teamRoster',
  ],
  health_coach: [
    'home', 'sessions', 'schedule', 'athletes', 'drills', 'practicePlans',
    'evaluations', 'goals', 'health', 'nutrition', 'workouts', 'video',
    'messages', 'notifications', 'reports', 'profile', 'stats',
  ],
  team_coach: [
    'home', 'sessions', 'schedule', 'athletes', 'evaluations', 'goals',
    'video', 'messages', 'notifications', 'profile', 'stats', 'teamRoster',
  ],
  athlete: [
    'home', 'sessions', 'schedule', 'evaluations', 'goals', 'health',
    'nutrition', 'workouts', 'video', 'messages', 'notifications', 'shop',
    'profile', 'stats',
  ],
  parent: [
    'home', 'sessions', 'schedule', 'messages', 'notifications', 'shop',
    'profile', 'campCheckin',
  ],
  front_desk_staff: [
    'home', 'sessions', 'schedule', 'pos', 'messages', 'notifications',
    'profile', 'campCheckin',
  ],
};

/** Check whether a given role (or set of roles) can access a section */
export function canAccess(roles: UserRole | UserRole[], section: AppSection): boolean {
  const list = Array.isArray(roles) ? roles : [roles];
  return list.some((role) => roleSections[role]?.includes(section));
}

/** Return all sections accessible to the given role(s) */
export function accessibleSections(roles: UserRole | UserRole[]): AppSection[] {
  const list = Array.isArray(roles) ? roles : [roles];
  const combined = new Set<AppSection>();
  list.forEach((role) => {
    roleSections[role]?.forEach((s) => combined.add(s));
  });
  return Array.from(combined);
}
