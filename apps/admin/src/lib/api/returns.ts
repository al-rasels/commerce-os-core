import { api } from './client';

export interface ReturnRequest {
  id: string;
  tenant_id: string;
  order_id: string;
  customer_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'received' | 'refunded';
  reason: string;
  refund_amount_cents: number | null;
  created_at: string;
  updated_at: string;
}

export interface ReturnRequestInput {
  order_id: string;
  customer_id: string;
  status?: 'pending' | 'approved' | 'rejected' | 'received' | 'refunded';
  reason: string;
  refund_amount_cents?: number | null;
}

export const returnsApi = {
  returns: {
    list: () => api.get<ReturnRequest[]>('/api/v1/commerce/returns'),
    get: (id: string) => api.get<ReturnRequest>(`/api/v1/commerce/returns/${id}`),
    create: (data: ReturnRequestInput) => api.post<ReturnRequest>('/api/v1/commerce/returns', data),
    update: (id: string, data: Partial<ReturnRequestInput>) =>
      api.patch<ReturnRequest>(`/api/v1/commerce/returns/${id}`, data),
    delete: (id: string) => api.delete<void>(`/api/v1/commerce/returns/${id}`),
  }
};
