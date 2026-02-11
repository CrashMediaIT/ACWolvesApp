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
} from '../types';

// ── Sessions ──────────────────────────────────────────────
export const sessionsApi = {
  list: () => api.get<ApiResponse<Session[]>>('/api/sessions'),
  get: (id: number) => api.get<ApiResponse<Session>>(`/api/sessions/${id}`),
  create: (data: Partial<Session>) => api.post<ApiResponse<Session>>('/api/sessions', data),
  update: (id: number, data: Partial<Session>) =>
    api.put<ApiResponse<Session>>(`/api/sessions/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/api/sessions/${id}`),
  book: (id: number) => api.post<ApiResponse<void>>(`/api/sessions/${id}/book`),
  cancel: (id: number) => api.post<ApiResponse<void>>(`/api/sessions/${id}/cancel`),
};

// ── Athletes ──────────────────────────────────────────────
export const athletesApi = {
  list: () => api.get<ApiResponse<Athlete[]>>('/api/athletes'),
  get: (id: number) => api.get<ApiResponse<Athlete>>(`/api/athletes/${id}`),
  create: (data: Partial<Athlete>) => api.post<ApiResponse<Athlete>>('/api/athletes', data),
  update: (id: number, data: Partial<Athlete>) =>
    api.put<ApiResponse<Athlete>>(`/api/athletes/${id}`, data),
};

// ── Drills ────────────────────────────────────────────────
export const drillsApi = {
  list: () => api.get<ApiResponse<Drill[]>>('/api/drills'),
  get: (id: number) => api.get<ApiResponse<Drill>>(`/api/drills/${id}`),
  create: (data: Partial<Drill>) => api.post<ApiResponse<Drill>>('/api/drills', data),
  update: (id: number, data: Partial<Drill>) =>
    api.put<ApiResponse<Drill>>(`/api/drills/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/api/drills/${id}`),
};

// ── Practice Plans ────────────────────────────────────────
export const practicePlansApi = {
  list: () => api.get<ApiResponse<PracticePlan[]>>('/api/practice-plans'),
  get: (id: number) => api.get<ApiResponse<PracticePlan>>(`/api/practice-plans/${id}`),
  create: (data: Partial<PracticePlan>) =>
    api.post<ApiResponse<PracticePlan>>('/api/practice-plans', data),
  update: (id: number, data: Partial<PracticePlan>) =>
    api.put<ApiResponse<PracticePlan>>(`/api/practice-plans/${id}`, data),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/api/practice-plans/${id}`),
};

// ── Evaluations ───────────────────────────────────────────
export const evaluationsApi = {
  list: () => api.get<ApiResponse<Evaluation[]>>('/api/evaluations'),
  get: (id: number) => api.get<ApiResponse<Evaluation>>(`/api/evaluations/${id}`),
  create: (data: Partial<Evaluation>) =>
    api.post<ApiResponse<Evaluation>>('/api/evaluations', data),
};

// ── Messages ──────────────────────────────────────────────
export const messagesApi = {
  list: () => api.get<ApiResponse<Message[]>>('/api/messages'),
  get: (id: number) => api.get<ApiResponse<Message>>(`/api/messages/${id}`),
  send: (data: Partial<Message>) => api.post<ApiResponse<Message>>('/api/messages', data),
  markRead: (id: number) => api.put<ApiResponse<void>>(`/api/messages/${id}/read`),
};

// ── Notifications ─────────────────────────────────────────
export const notificationsApi = {
  list: () => api.get<ApiResponse<Notification[]>>('/api/notifications'),
  markRead: (id: number) => api.put<ApiResponse<void>>(`/api/notifications/${id}/read`),
  markAllRead: () => api.put<ApiResponse<void>>('/api/notifications/read-all'),
};

// ── Dashboard / Stats ─────────────────────────────────────
export const dashboardApi = {
  getStats: () => api.get<ApiResponse<Record<string, unknown>>>('/api/dashboard/stats'),
  getSchedule: () => api.get<ApiResponse<Session[]>>('/api/dashboard/schedule'),
};

// ── Reports ───────────────────────────────────────────────
export const reportsApi = {
  list: () => api.get<ApiResponse<unknown[]>>('/api/reports'),
  generate: (type: string, params?: Record<string, unknown>) =>
    api.post<ApiResponse<unknown>>('/api/reports/generate', { type, ...params }),
};

// ── Finance / POS ─────────────────────────────────────────
export const financeApi = {
  getOverview: () => api.get<ApiResponse<unknown>>('/api/finance/overview'),
  getTransactions: () => api.get<ApiResponse<unknown[]>>('/api/finance/transactions'),
  getBilling: () => api.get<ApiResponse<unknown[]>>('/api/finance/billing'),
};

// ── HR ────────────────────────────────────────────────────
export const hrApi = {
  getPayroll: () => api.get<ApiResponse<unknown[]>>('/api/hr/payroll'),
  getContracts: () => api.get<ApiResponse<unknown[]>>('/api/hr/contracts'),
  getTimeTracking: () => api.get<ApiResponse<unknown[]>>('/api/hr/time-tracking'),
};

// ── Health ────────────────────────────────────────────────
export const healthApi = {
  getNutrition: (athleteId: number) =>
    api.get<ApiResponse<unknown>>(`/api/health/nutrition/${athleteId}`),
  getWorkouts: (athleteId: number) =>
    api.get<ApiResponse<unknown>>(`/api/health/workouts/${athleteId}`),
};

// ── Video ─────────────────────────────────────────────────
export const videoApi = {
  list: () => api.get<ApiResponse<unknown[]>>('/api/videos'),
  get: (id: number) => api.get<ApiResponse<unknown>>(`/api/videos/${id}`),
};

// ── Shop ──────────────────────────────────────────────────
export const shopApi = {
  getProducts: () => api.get<ApiResponse<unknown[]>>('/api/shop/products'),
  getCategories: () => api.get<ApiResponse<unknown[]>>('/api/shop/categories'),
  getCart: () => api.get<ApiResponse<unknown>>('/api/shop/cart'),
  addToCart: (productId: number, qty: number) =>
    api.post<ApiResponse<unknown>>('/api/shop/cart', { productId, quantity: qty }),
};

// ── Admin ─────────────────────────────────────────────────
export const adminApi = {
  getUsers: () => api.get<ApiResponse<unknown[]>>('/api/admin/users'),
  getAuditLogs: () => api.get<ApiResponse<unknown[]>>('/api/admin/audit-logs'),
  getSystemHealth: () => api.get<ApiResponse<unknown>>('/api/admin/system-health'),
  getPermissions: () => api.get<ApiResponse<unknown[]>>('/api/admin/permissions'),
  getSettings: () => api.get<ApiResponse<unknown>>('/api/admin/settings'),
  updateSettings: (data: Record<string, unknown>) =>
    api.put<ApiResponse<unknown>>('/api/admin/settings', data),
};
