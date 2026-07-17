import { api } from './client';

export interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  status: string;
  created_at: string;
  role?: { id: string; name: string };
}

export interface UserListResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

export interface UserDetail extends User {
  tenant?: { id: string; name: string };
}

export interface ListUsersParams {
  search?: string;
  page?: number;
  limit?: number;
}

export interface InviteUserInput {
  email: string;
  role_id: string;
}

export interface UpdateUserInput {
  first_name?: string;
  last_name?: string;
  role_id?: string;
}

export interface UpdateUserStatusInput {
  status: 'active' | 'suspended';
}

export const userApi = {
  list: (params?: ListUsersParams) => {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    const qs = searchParams.toString();
    return api.get<UserListResponse>(`/api/v1/users${qs ? `?${qs}` : ''}`);
  },
  get: (id: string) => api.get<UserDetail>(`/api/v1/users/${id}`),
  update: (id: string, data: UpdateUserInput) => api.patch<User>(`/api/v1/users/${id}`, data),
  updateStatus: (id: string, data: UpdateUserStatusInput) => api.patch<User>(`/api/v1/users/${id}/status`, data),
  invite: (data: InviteUserInput) => api.post<User>('/api/v1/auth/invite', data),
};
