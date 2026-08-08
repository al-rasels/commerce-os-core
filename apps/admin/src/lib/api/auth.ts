import { api } from './client';

export interface MfaSetupResult {
  secret: string;
  qr_code: string;
}

export interface MeResult {
  id: string;
  email: string;
  mfa_configured: boolean;
  [key: string]: unknown;
}

export const authApi = {
  me: () => api.get<MeResult>('/api/v1/auth/me'),
  mfaSetup: (userId: string) =>
    api.post<MfaSetupResult>('/api/v1/auth/mfa/setup', { user_id: userId }),
  mfaEnable: (userId: string, code: string) =>
    api.post<{ message: string }>('/api/v1/auth/mfa/enable', {
      user_id: userId,
      code,
    }),
  mfaDisable: (userId: string, password: string) =>
    api.post<{ message: string }>('/api/v1/auth/mfa/disable', {
      user_id: userId,
      password,
    }),
};