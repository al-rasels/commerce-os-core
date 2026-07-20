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
  list: () => api.get<TaxRule[]>('/api/v1/commerce/tax'),
};
