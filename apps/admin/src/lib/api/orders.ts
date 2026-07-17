import { api } from './client';

export interface OrderItem {
  id: string;
  variant_id: string;
  sku: string;
  quantity: number;
  unit_price: number;
}

export interface Order {
  id: string;
  customer_id: string;
  status: 'pending' | 'paid' | 'fulfilled' | 'cancelled' | 'refunded';
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  currency: string;
  channel: string;
  created_at: string;
  items: OrderItem[];
}

export interface OrderListResponse {
  data: Order[];
  total: number;
  page: number;
  limit: number;
}

export interface ListOrdersParams {
  status?: string;
  customer_id?: string;
  page?: number;
  limit?: number;
}

export const ORDER_VALID_TRANSITIONS: Record<string, string[]> = {
  pending: ['paid', 'cancelled'],
  paid: ['fulfilled', 'refunded', 'cancelled'],
  fulfilled: ['refunded'],
  cancelled: [],
  refunded: [],
};

export function canTransition(from: string, to: string): boolean {
  return ORDER_VALID_TRANSITIONS[from]?.includes(to) ?? false;
}

export const orderApi = {
  list: (params?: ListOrdersParams) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set('status', params.status);
    if (params?.customer_id) searchParams.set('customer_id', params.customer_id);
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    const qs = searchParams.toString();
    return api.get<OrderListResponse>(`/api/v1/commerce/orders${qs ? `?${qs}` : ''}`);
  },
  get: (id: string) => api.get<Order>(`/api/v1/commerce/orders/${id}`),
  updateStatus: (id: string, status: string) =>
    api.patch<Order>(`/api/v1/commerce/orders/${id}/status`, { status }),
};
