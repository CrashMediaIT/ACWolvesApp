import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import * as authApi from '../api/auth';
import { getToken, removeToken } from '../api/client';
import type { User, LoginCredentials } from '../types';

// ── State ─────────────────────────────────────────────────
interface AuthState {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  requires2FA: boolean;
  pendingUserId: number | null;
}

type AuthAction =
  | { type: 'RESTORE_TOKEN'; user: User | null }
  | { type: 'SIGN_IN'; user: User }
  | { type: 'REQUIRE_2FA'; userId: number }
  | { type: 'SIGN_OUT' }
  | { type: 'SET_LOADING'; isLoading: boolean };

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isSignedIn: false,
  requires2FA: false,
  pendingUserId: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        user: action.user,
        isSignedIn: action.user !== null,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        user: action.user,
        isSignedIn: true,
        isLoading: false,
        requires2FA: false,
        pendingUserId: null,
      };
    case 'REQUIRE_2FA':
      return {
        ...state,
        requires2FA: true,
        pendingUserId: action.userId,
        isLoading: false,
      };
    case 'SIGN_OUT':
      return { ...initialState, isLoading: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────
interface AuthContextValue {
  state: AuthState;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  verify2FA: (code: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // On mount, check for an existing token and restore the session
  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        if (token) {
          const res = await authApi.getCurrentUser();
          if (res.success && res.data) {
            dispatch({ type: 'RESTORE_TOKEN', user: res.data });
            return;
          }
        }
      } catch {
        // Token expired or invalid – fall through to signed-out state
      }
      dispatch({ type: 'RESTORE_TOKEN', user: null });
    })();
  }, []);

  const actions = useMemo(
    () => ({
      signIn: async (credentials: LoginCredentials) => {
        dispatch({ type: 'SET_LOADING', isLoading: true });
        try {
          const res = await authApi.login(credentials);
          if (!res.success) {
            throw new Error(res.error ?? 'Login failed');
          }
          if (res.data?.requires2FA) {
            dispatch({ type: 'REQUIRE_2FA', userId: res.data.user.id });
          } else if (res.data?.user) {
            dispatch({ type: 'SIGN_IN', user: res.data.user });
          } else {
            throw new Error('Invalid login response');
          }
        } catch (err) {
          dispatch({ type: 'SET_LOADING', isLoading: false });
          throw err;
        }
      },

      verify2FA: async (code: string) => {
        if (!state.pendingUserId) throw new Error('No pending 2FA verification');
        dispatch({ type: 'SET_LOADING', isLoading: true });
        try {
          const res = await authApi.verify2FA(state.pendingUserId, code);
          if (!res.success) throw new Error(res.error ?? '2FA verification failed');
          if (res.data?.user) {
            dispatch({ type: 'SIGN_IN', user: res.data.user });
          } else {
            throw new Error('Invalid 2FA response');
          }
        } catch (err) {
          dispatch({ type: 'SET_LOADING', isLoading: false });
          throw err;
        }
      },

      signOut: async () => {
        try {
          await authApi.logout();
        } catch {
          // Best-effort logout on server
        }
        await removeToken();
        dispatch({ type: 'SIGN_OUT' });
      },
    }),
    [state.pendingUserId],
  );

  const value = useMemo(() => ({ state, ...actions }), [state, actions]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── Hook ──────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
