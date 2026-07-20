import { api } from './client';

export interface ShippingRule {
  id: string;
  name: string;
  type: string;
  is_active: boolean;
  config: Record<string, unknown>;
  created_at: string;
}

export const shippingApi = {
  list: () => api.get<ShippingRule[]>('/api/v1/commerce/shipping'),
};
