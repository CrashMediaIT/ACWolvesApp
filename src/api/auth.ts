/**
 * Authentication API calls for login, logout, and 2FA verification.
 */

import api, { setToken, removeToken } from './client';
import type { ApiResponse, LoginCredentials, LoginResponse } from '../types';

/** Log in with email and password */
export async function login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
  const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials);
  if (response.success && response.data?.token) {
    await setToken(response.data.token);
  }
  return response;
}

/** Verify a 2FA code */
export async function verify2FA(userId: number, code: string): Promise<ApiResponse<LoginResponse>> {
  const response = await api.post<ApiResponse<LoginResponse>>('/auth/validate', {
    userId,
    code,
  });
  if (response.success && response.data?.token) {
    await setToken(response.data.token);
  }
  return response;
}

/** Fetch the currently authenticated user */
export async function getCurrentUser(): Promise<ApiResponse<LoginResponse['user']>> {
  return api.get<ApiResponse<LoginResponse['user']>>('/users/me');
}

/** Log out and clear the stored token */
export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout');
  } finally {
    await removeToken();
  }
}
