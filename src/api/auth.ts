/**
 * Authentication API calls for login, logout, and 2FA verification.
 *
 * The Arctic Wolves backend returns responses in a different shape than
 * the app's internal types.  This module transforms those responses so
 * the rest of the app can work with a consistent `ApiResponse<T>` shape.
 */

import api, { setToken, getToken, removeToken } from './client';
import type { ApiResponse, LoginCredentials, LoginResponse, User } from '../types';

// ── helpers ───────────────────────────────────────────────

/** Split a single "First Last" name string into first / last parts. */
function splitName(name: string | undefined): { firstName: string; lastName: string } {
  const parts = (name ?? '').trim().split(/\s+/);
  return {
    firstName: parts[0] ?? '',
    lastName: parts.slice(1).join(' '),
  };
}

/** Build an app-level User from a backend user object. */
function toUser(raw: Record<string, unknown>): User {
  const { firstName, lastName } = splitName(
    (raw.first_name || raw.last_name)
      ? `${raw.first_name ?? ''} ${raw.last_name ?? ''}`.trim()
      : (raw.name as string | undefined),
  );

  const role = (raw.role as string) ?? 'athlete';

  return {
    id: raw.id as number,
    email: raw.email as string,
    firstName,
    lastName,
    role: role as User['role'],
    roles: [role] as User['roles'],
    is2FAEnabled: false,
  };
}

// ── public API ────────────────────────────────────────────

/** Log in with email and password */
export async function login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
  // The backend returns a flat object: { success, api_key, user, expires_at }
  const raw: Record<string, unknown> = await api.post('/auth/login', credentials);

  if (raw.success && raw.api_key) {
    await setToken(raw.api_key as string);

    return {
      success: true,
      data: {
        user: toUser(raw.user as Record<string, unknown>),
        token: raw.api_key as string,
        requires2FA: false,
      },
    };
  }

  return {
    success: false,
    error: (raw.error as string) ?? 'Login failed',
  };
}

/** Verify a 2FA code (maps to /auth/validate on the backend) */
export async function verify2FA(userId: number, code: string): Promise<ApiResponse<LoginResponse>> {
  // Backend validate returns: { success, valid, user, permissions }
  const raw: Record<string, unknown> = await api.post('/auth/validate', {
    userId,
    code,
  });

  if (raw.success && raw.user) {
    const token = await getToken();
    return {
      success: true,
      data: {
        user: toUser(raw.user as Record<string, unknown>),
        token: token ?? '',
        requires2FA: false,
      },
    };
  }

  return {
    success: false,
    error: (raw.error as string) ?? '2FA verification failed',
  };
}

/** Fetch the currently authenticated user */
export async function getCurrentUser(): Promise<ApiResponse<LoginResponse['user']>> {
  // Backend returns: { success, data: { id, email, first_name, last_name, role, … } }
  const raw: Record<string, unknown> = await api.get('/users/me');

  if (raw.success && raw.data) {
    return {
      success: true,
      data: toUser(raw.data as Record<string, unknown>),
    };
  }

  return {
    success: false,
    error: (raw.error as string) ?? 'Failed to fetch user',
  };
}

/** Log out and clear the stored token */
export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout');
  } finally {
    await removeToken();
  }
}
