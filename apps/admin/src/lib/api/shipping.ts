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
  list: () => api.get<ShippingRule[]>('/api/v1/commerce/shipping-rules'),
  get: (id: string) => api.get<ShippingRule>(`/api/v1/commerce/shipping-rules/${id}`),
  create: (data: Partial<ShippingRule>) => api.post<ShippingRule>('/api/v1/commerce/shipping-rules', data),
  update: (id: string, data: Partial<ShippingRule>) => api.patch<ShippingRule>(`/api/v1/commerce/shipping-rules/${id}`, data),
  remove: (id: string) => api.delete<void>(`/api/v1/commerce/shipping-rules/${id}`),
};
