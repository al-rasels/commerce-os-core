import { api } from './client';

export interface ResolvedTheme {
  id: string;
  version: string;
  tokens: Record<string, unknown>;
  conflicts: string[];
}

export const themeApi = {
  get: () => api.get<ResolvedTheme>('/api/v1/experience/theme'),
  updateOverride: (themeBaseId: string, overridesJson: Record<string, unknown>) =>
    api.put<ResolvedTheme>('/api/v1/experience/theme/override', { themeBaseId, overridesJson }),
};
