import { api } from './client';

export interface Promotion {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  is_active: boolean;
  uses: number;
  max_uses: number | null;
  min_order: number | null;
  expires_at: string | null;
  created_at: string;
}

export const promotionsApi = {
  list: () => api.get<Promotion[]>('/api/v1/commerce/promotions'),
};
