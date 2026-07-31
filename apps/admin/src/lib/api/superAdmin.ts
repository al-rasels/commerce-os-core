import { api } from './client';

export interface Tenant {
  id: string;
  name: string;
  plan_id: string;
  status: string;
  domains: { id: string; domain: string; is_primary: boolean }[];
  flags: { id: string; key: string; is_enabled: boolean }[];
  created_at: string;
}

export interface TenantListResponse {
  data: Tenant[];
  total: number;
  page: number;
  limit: number;
}

export type TenantDetail = Tenant;

export interface ProvisionTenantInput {
  name: string;
  plan_id: string;
  domain?: string;
  template_id?: string;
}

export const superAdminApi = {
  listTenants: () => api.get<TenantListResponse>('/api/v1/super-admin/tenants'),
  getTenant: (id: string) => api.get<TenantDetail>(`/api/v1/super-admin/tenants/${id}`),
  suspendTenant: (id: string) =>
    api.patch<void>(`/api/v1/super-admin/tenants/${id}`, { status: 'suspended' }),
  toggleFlag: (id: string, flag_key: string, enabled: boolean) =>
    api.post<void>(`/api/v1/super-admin/tenants/${id}/flags`, { flag_key, enabled }),
  provisionTenant: (input: ProvisionTenantInput) =>
    api.post<TenantDetail>('/api/v1/super-admin/tenants', input),
};
