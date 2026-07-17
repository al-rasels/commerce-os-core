import { api } from './client';

export interface Customer {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  _count?: { orders: number };
}

export interface CustomerListResponse {
  data: Customer[];
  total: number;
  page: number;
  limit: number;
}

export interface CustomerDetail extends Customer {
  orders: {
    id: string;
    status: string;
    total_cents: number;
    currency: string;
    created_at: string;
  }[];
}

export interface ListCustomersParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface CustomerInput {
  email: string;
  first_name?: string;
  last_name?: string;
}

export const customerApi = {
  list: (params?: ListCustomersParams) => {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    const qs = searchParams.toString();
    return api.get<CustomerListResponse>(`/api/v1/commerce/customers${qs ? `?${qs}` : ''}`);
  },
  get: (id: string) => api.get<CustomerDetail>(`/api/v1/commerce/customers/${id}`),
  create: (data: CustomerInput) => api.post<Customer>('/api/v1/commerce/customers', data),
  update: (id: string, data: Partial<CustomerInput>) => api.patch<Customer>(`/api/v1/commerce/customers/${id}`, data),
  remove: (id: string) => api.delete(`/api/v1/commerce/customers/${id}`),
};
