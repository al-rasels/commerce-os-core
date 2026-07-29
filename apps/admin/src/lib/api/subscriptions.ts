import { api } from './client';

export interface Subscription {
  id: string;
  tenant_id: string;
  customer_id: string;
  plan_code: string;
  status: 'active' | 'past_due' | 'canceled' | 'paused';
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionInput {
  customer_id: string;
  plan_code: string;
  status?: 'active' | 'past_due' | 'canceled' | 'paused';
  current_period_end: string;
}

export const subscriptionsApi = {
  subscriptions: {
    list: () => api.get<Subscription[]>('/api/v1/business/subscriptions'),
    get: (id: string) => api.get<Subscription>(`/api/v1/business/subscriptions/${id}`),
    create: (data: SubscriptionInput) => api.post<Subscription>('/api/v1/business/subscriptions', data),
    update: (id: string, data: Partial<SubscriptionInput>) =>
      api.patch<Subscription>(`/api/v1/business/subscriptions/${id}`, data),
    delete: (id: string) => api.delete<void>(`/api/v1/business/subscriptions/${id}`),
  }
};
