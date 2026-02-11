/**
 * Core type definitions for the ACWolves mobile app.
 * Mirrors the Arctic Wolves backend role and data structures.
 */

/** User roles matching the backend ENUM values */
export type UserRole =
  | 'admin'
  | 'coach'
  | 'athlete'
  | 'parent'
  | 'health_coach'
  | 'team_coach'
  | 'front_desk_staff';

/** Authenticated user returned after login */
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  roles: UserRole[];
  is2FAEnabled: boolean;
}

/** Credentials sent to the login endpoint */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Standard API response envelope */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/** Login response from the API */
export interface LoginResponse {
  user: User;
  token: string;
  requires2FA: boolean;
}

/** Session (training session) */
export interface Session {
  id: number;
  title: string;
  description: string;
  sessionType: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  coachId: number;
  coachName: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}

/** Athlete */
export interface Athlete {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  position: string;
  teamId: number;
  teamName: string;
}

/** Drill */
export interface Drill {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
  createdBy: number;
}

/** Practice Plan */
export interface PracticePlan {
  id: number;
  title: string;
  description: string;
  date: string;
  duration: number;
  drills: Drill[];
  createdBy: number;
}

/** Evaluation */
export interface Evaluation {
  id: number;
  athleteId: number;
  athleteName: string;
  coachId: number;
  coachName: string;
  date: string;
  score: number;
  notes: string;
  type: string;
}

/** Message */
export interface Message {
  id: number;
  senderId: number;
  senderName: string;
  recipientId: number;
  recipientName: string;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

/** Notification */
export interface Notification {
  id: number;
  title: string;
  body: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

/** Navigation route parameter types */
export type RootStackParamList = {
  Login: undefined;
  Verify2FA: { userId: number };
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Sessions: undefined;
  Athletes: undefined;
  More: undefined;
};
