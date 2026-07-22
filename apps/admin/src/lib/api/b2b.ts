import { api } from './client';

export interface CompanyProfile {
  id: string;
  tenant_id: string;
  name: string;
  tax_id: string | null;
  credit_limit_cents: number | null;
  payment_terms: string;
  price_list_id: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface CompanyProfileInput {
  name: string;
  tax_id?: string;
  credit_limit_cents?: number;
  payment_terms?: string;
  price_list_id?: string;
  status?: 'pending' | 'approved' | 'rejected';
}

export const b2bApi = {
  companyProfiles: {
    list: () => api.get<CompanyProfile[]>('/api/v1/business/b2b/companies'),
    get: (id: string) => api.get<CompanyProfile>(`/api/v1/business/b2b/companies/${id}`),
    create: (data: CompanyProfileInput) => api.post<CompanyProfile>('/api/v1/business/b2b/companies', data),
    update: (id: string, data: Partial<CompanyProfileInput>) =>
      api.patch<CompanyProfile>(`/api/v1/business/b2b/companies/${id}`, data),
    delete: (id: string) => api.delete<void>(`/api/v1/business/b2b/companies/${id}`),
  }
};
