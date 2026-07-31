import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { api } from '@/lib/api/client';

interface AuthUser {
  id: string;
  email: string;
}

interface MfaState {
  mfa_token: string;
  user_id: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<MfaState | void>;
  mfaVerify: (token: string, code: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = 'admin_token';
const REFRESH_KEY = 'admin_refresh_token';
const USER_KEY = 'admin_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<AuthUser | null>(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  
  // Sync state if localStorage changes in another tab
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === TOKEN_KEY) setToken(e.newValue);
      if (e.key === USER_KEY) setUser(e.newValue ? JSON.parse(e.newValue) : null);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Note: We use raw fetch here because api client might intercept 401s and redirect to /login
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Incorrect email or password');
      }

      const data = await res.json();

      if (data.mfa_token || data.mfa_required) {
        return { mfa_token: data.mfa_token, user_id: data.user?.id || data.user_id, email } as MfaState;
      }

      localStorage.setItem(TOKEN_KEY, data.access_token);
      if (data.refresh_token) localStorage.setItem(REFRESH_KEY, data.refresh_token);
      localStorage.setItem(USER_KEY, JSON.stringify({ id: data.user?.id || data.user_id, email: data.user?.email || email }));
      
      // React state flush is queued. The component calling login() can safely rely on localStorage 
      // or use AuthContext next render.
      setToken(data.access_token);
      setUser({ id: data.user?.id || data.user_id, email: data.user?.email || email });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      if (message.includes('Failed to fetch') || message.includes('NetworkError')) {
        throw new Error('Cannot connect to server. Please ensure the API server is running.');
      }
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  const mfaVerify = useCallback(async (mfaToken: string, code: string) => {
    const data = await api.post<any>('/api/v1/auth/mfa/verify', { mfa_token: mfaToken, code });
    localStorage.setItem(TOKEN_KEY, data.access_token);
    if (data.refresh_token) localStorage.setItem(REFRESH_KEY, data.refresh_token);
    localStorage.setItem(USER_KEY, JSON.stringify({ id: data.user_id, email: data.email }));
    setToken(data.access_token);
    setUser({ id: data.user_id, email: data.email });
  }, []);

  const logout = useCallback(async () => {
    try {
      if (user) {
        await fetch('/api/v1/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ user_id: user.id }),
        });
      }
    } catch (e) {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(USER_KEY);
      setToken(null);
      setUser(null);
    }
  }, [user, token]);

  return (
    <AuthContext.Provider value={{ user, token, login, mfaVerify, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
