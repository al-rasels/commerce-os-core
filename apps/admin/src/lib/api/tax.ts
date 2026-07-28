import { api } from './client';

export interface TaxRule {
  id: string;
  name: string;
  type: string;
  rate: number;
  region: string | null;
  is_active: boolean;
  created_at: string;
}

export const taxApi = {
  list: () => api.get<TaxRule[]>('/api/v1/commerce/tax-rules'),
  get: (id: string) => api.get<TaxRule>(`/api/v1/commerce/tax-rules/${id}`),
  create: (data: Partial<TaxRule>) => api.post<TaxRule>('/api/v1/commerce/tax-rules', data),
  update: (id: string, data: Partial<TaxRule>) => api.patch<TaxRule>(`/api/v1/commerce/tax-rules/${id}`, data),
  remove: (id: string) => api.delete<void>(`/api/v1/commerce/tax-rules/${id}`),
};
