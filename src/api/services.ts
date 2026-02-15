/**
 * API service for data endpoints (sessions, athletes, drills, etc.).
 */

import api from './client';
import type {
  ApiResponse,
  Session,
  Athlete,
  Drill,
  PracticePlan,
  Evaluation,
  Message,
  Notification,
  Team,
  RosterPlayer,
  GamePlan,
} from '../types';

// ── Sessions ──────────────────────────────────────────────
export const sessionsApi = {
  list: () => api.get<ApiResponse<Session[]>>('/sessions'),
  get: (id: number) => api.get<ApiResponse<Session>>(`/sessions/${id}`),
  create: (data: Partial<Session>) => api.post<ApiResponse<Session>>('/sessions', data),
  update: (id: number, data: Partial<Session>) =>
    api.put<ApiResponse<Session>>(`/sessions/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/sessions/${id}`),
  book: (id: number) => api.post<ApiResponse<void>>(`/sessions/${id}/book`),
  cancel: (id: number) => api.post<ApiResponse<void>>(`/sessions/${id}/cancel`),
};

// ── Athletes ──────────────────────────────────────────────
export const athletesApi = {
  list: () => api.get<ApiResponse<Athlete[]>>('/athletes'),
  get: (id: number) => api.get<ApiResponse<Athlete>>(`/athletes/${id}`),
  create: (data: Partial<Athlete>) => api.post<ApiResponse<Athlete>>('/athletes', data),
  update: (id: number, data: Partial<Athlete>) =>
    api.put<ApiResponse<Athlete>>(`/athletes/${id}`, data),
};

// ── Drills ────────────────────────────────────────────────
export const drillsApi = {
  list: () => api.get<ApiResponse<Drill[]>>('/drills'),
  get: (id: number) => api.get<ApiResponse<Drill>>(`/drills/${id}`),
  create: (data: Partial<Drill>) => api.post<ApiResponse<Drill>>('/drills', data),
  update: (id: number, data: Partial<Drill>) =>
    api.put<ApiResponse<Drill>>(`/drills/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/drills/${id}`),
};

// ── Practice Plans ────────────────────────────────────────
export const practicePlansApi = {
  list: () => api.get<ApiResponse<PracticePlan[]>>('/practice-plans'),
  get: (id: number) => api.get<ApiResponse<PracticePlan>>(`/practice-plans/${id}`),
  create: (data: Partial<PracticePlan>) =>
    api.post<ApiResponse<PracticePlan>>('/practice-plans', data),
  update: (id: number, data: Partial<PracticePlan>) =>
    api.put<ApiResponse<PracticePlan>>(`/practice-plans/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/practice-plans/${id}`),
};

// ── Evaluations ───────────────────────────────────────────
export const evaluationsApi = {
  list: () => api.get<ApiResponse<Evaluation[]>>('/evaluations'),
  get: (id: number) => api.get<ApiResponse<Evaluation>>(`/evaluations/${id}`),
  create: (data: Partial<Evaluation>) =>
    api.post<ApiResponse<Evaluation>>('/evaluations', data),
};

// ── Messages ──────────────────────────────────────────────
export const messagesApi = {
  list: () => api.get<ApiResponse<Message[]>>('/messages'),
  get: (id: number) => api.get<ApiResponse<Message>>(`/messages/${id}`),
  send: (data: Partial<Message>) => api.post<ApiResponse<Message>>('/messages', data),
  markRead: (id: number) => api.put<ApiResponse<void>>(`/messages/${id}/read`),
};

// ── Notifications ─────────────────────────────────────────
export const notificationsApi = {
  list: () => api.get<ApiResponse<Notification[]>>('/notifications'),
  markRead: (id: number) => api.put<ApiResponse<void>>(`/notifications/${id}/read`),
  markAllRead: () => api.put<ApiResponse<void>>('/notifications/read-all'),
};

// ── Dashboard / Stats ─────────────────────────────────────
export const dashboardApi = {
  getStats: () => api.get<ApiResponse<Record<string, unknown>>>('/dashboard/stats'),
  getSchedule: () => api.get<ApiResponse<Session[]>>('/dashboard/schedule'),
};

// ── Reports ───────────────────────────────────────────────
export const reportsApi = {
  list: () => api.get<ApiResponse<unknown[]>>('/reports'),
  generate: (type: string, params?: Record<string, unknown>) =>
    api.post<ApiResponse<unknown>>('/reports/generate', { type, ...params }),
};

// ── Finance / POS ─────────────────────────────────────────
export const financeApi = {
  getOverview: () => api.get<ApiResponse<unknown>>('/finance/overview'),
  getTransactions: () => api.get<ApiResponse<unknown[]>>('/finance/transactions'),
  getBilling: () => api.get<ApiResponse<unknown[]>>('/finance/billing'),
};

// ── HR ────────────────────────────────────────────────────
export const hrApi = {
  getPayroll: () => api.get<ApiResponse<unknown[]>>('/hr/payroll'),
  getContracts: () => api.get<ApiResponse<unknown[]>>('/hr/contracts'),
  getTimeTracking: () => api.get<ApiResponse<unknown[]>>('/hr/time-tracking'),
};

// ── Health ────────────────────────────────────────────────
export const healthApi = {
  getNutrition: (athleteId: number) =>
    api.get<ApiResponse<unknown>>(`/health/nutrition/${athleteId}`),
  getWorkouts: (athleteId: number) =>
    api.get<ApiResponse<unknown>>(`/health/workouts/${athleteId}`),
};

// ── Video ─────────────────────────────────────────────────
export const videoApi = {
  list: () => api.get<ApiResponse<unknown[]>>('/videos'),
  get: (id: number) => api.get<ApiResponse<unknown>>(`/videos/${id}`),
};

// ── Shop ──────────────────────────────────────────────────
export const shopApi = {
  getProducts: () => api.get<ApiResponse<unknown[]>>('/shop/products'),
  getCategories: () => api.get<ApiResponse<unknown[]>>('/shop/categories'),
  getCart: () => api.get<ApiResponse<unknown>>('/shop/cart'),
  addToCart: (productId: number, qty: number) =>
    api.post<ApiResponse<unknown>>('/shop/cart', { productId, quantity: qty }),
};

// ── Admin ─────────────────────────────────────────────────
export const adminApi = {
  getUsers: () => api.get<ApiResponse<unknown[]>>('/admin/users'),
  getAuditLogs: () => api.get<ApiResponse<unknown[]>>('/admin/audit-logs'),
  getSystemHealth: () => api.get<ApiResponse<unknown>>('/admin/system-health'),
  getPermissions: () => api.get<ApiResponse<unknown[]>>('/admin/permissions'),
  getSettings: () => api.get<ApiResponse<unknown>>('/admin/settings'),
  updateSettings: (data: Record<string, unknown>) =>
    api.put<ApiResponse<unknown>>('/admin/settings', data),
};

// ── Teams (Game Plan module) ──────────────────────────────
export const teamsApi = {
  list: () => api.get<ApiResponse<Team[]>>('/teams'),
  get: (id: number) => api.get<ApiResponse<Team>>(`/teams/${id}`),
  create: (data: Partial<Team>) => api.post<ApiResponse<Team>>('/teams', data),
  update: (id: number, data: Partial<Team>) =>
    api.put<ApiResponse<Team>>(`/teams/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/teams/${id}`),
};

// ── Rosters (Game Plan module) ────────────────────────────
export const rostersApi = {
  /** List all players on a team roster */
  listByTeam: (teamId: number) =>
    api.get<ApiResponse<RosterPlayer[]>>(`/teams/${teamId}/roster`),
  /** Get a single roster player */
  get: (teamId: number, playerId: number) =>
    api.get<ApiResponse<RosterPlayer>>(`/teams/${teamId}/roster/${playerId}`),
  /** Add a player to the roster (may or may not be linked to a user) */
  addPlayer: (teamId: number, data: Partial<RosterPlayer>) =>
    api.post<ApiResponse<RosterPlayer>>(`/teams/${teamId}/roster`, data),
  /** Update a roster player */
  updatePlayer: (teamId: number, playerId: number, data: Partial<RosterPlayer>) =>
    api.put<ApiResponse<RosterPlayer>>(`/teams/${teamId}/roster/${playerId}`, data),
  /** Remove a player from the roster */
  removePlayer: (teamId: number, playerId: number) =>
    api.delete<ApiResponse<void>>(`/teams/${teamId}/roster/${playerId}`),
  /** Link a roster player to an existing Arctic Wolves user account */
  linkUser: (teamId: number, playerId: number, userId: number) =>
    api.post<ApiResponse<RosterPlayer>>(`/teams/${teamId}/roster/${playerId}/link`, { userId }),
  /** Unlink a roster player from their user account */
  unlinkUser: (teamId: number, playerId: number) =>
    api.post<ApiResponse<RosterPlayer>>(`/teams/${teamId}/roster/${playerId}/unlink`),
};

// ── Game Plans ────────────────────────────────────────────
export const gamePlansApi = {
  listByTeam: (teamId: number) =>
    api.get<ApiResponse<GamePlan[]>>(`/teams/${teamId}/game-plans`),
  get: (teamId: number, planId: number) =>
    api.get<ApiResponse<GamePlan>>(`/teams/${teamId}/game-plans/${planId}`),
  create: (teamId: number, data: Partial<GamePlan>) =>
    api.post<ApiResponse<GamePlan>>(`/teams/${teamId}/game-plans`, data),
  update: (teamId: number, planId: number, data: Partial<GamePlan>) =>
    api.put<ApiResponse<GamePlan>>(`/teams/${teamId}/game-plans/${planId}`, data),
  delete: (teamId: number, planId: number) =>
    api.delete<ApiResponse<void>>(`/teams/${teamId}/game-plans/${planId}`),
};
