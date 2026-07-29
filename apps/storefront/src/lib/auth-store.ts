import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  mfa_enabled: boolean;
  mfa_configured: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  mfaRequired: boolean;
  mfaToken: string | null;
  setUser: (user: User | null) => void;
  setAuthenticated: (status: boolean) => void;
  setLoading: (status: boolean) => void;
  setMfaRequired: (token: string) => void;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true, // initial state is loading until checked
      mfaRequired: false,
      mfaToken: null,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAuthenticated: (status) => set({ isAuthenticated: status }),
      setLoading: (status) => set({ isLoading: status }),
      setMfaRequired: (token) => set({ mfaRequired: true, mfaToken: token }),
      
      logout: async () => {
        set({ isLoading: true });
        try {
          const userId = get().user?.id;
          if (userId) {
            await api.auth.logout(userId);
          }
        } catch (error) {
          console.error('Logout failed:', error);
        } finally {
          localStorage.removeItem('auth_token');
          set({ user: null, isAuthenticated: false, mfaRequired: false, mfaToken: null, isLoading: false });
        }
      },
      
      checkSession: async () => {
        set({ isLoading: true });
        try {
          // If we have an HttpOnly cookie, we just call the /me endpoint.
          // The API returns the user if the session is valid.
          const user = await api.auth.me();
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          // Try to refresh the token if /me failed (maybe access_token expired but refresh_token exists)
          try {
            const refreshResult = await api.auth.refresh('');
            if (refreshResult.access_token) {
              localStorage.setItem('auth_token', refreshResult.access_token);
              const user = await api.auth.me();
              set({ user, isAuthenticated: true, isLoading: false });
              return;
            }
          } catch (refreshError) {
            // Both failed, session is invalid
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
