// NestJS backend has setGlobalPrefix('api') in main.ts, so all routes are prefixed with /api
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000') + '/api';

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}/v1/storefront${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.message || res.statusText, res.status);
  }
  return res.json();
}

async function authRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}/v1/auth${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.message || res.statusText, res.status);
  }
  return res.json();
}

async function authRequestWithToken<T>(path: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  return authRequest<T>(path, {
    ...options,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      authRequest<any>('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    register: (email: string, password: string) =>
      authRequest<any>('/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    forgotPassword: (email: string) =>
      authRequest<any>('/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
    resetPassword: (token: string, password: string) =>
      authRequest<any>('/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password }),
      }),
    changePassword: (userId: string, currentPassword: string, newPassword: string) =>
      authRequestWithToken<any>('/change-password', {
        method: 'POST',
        body: JSON.stringify({ user_id: userId, current_password: currentPassword, new_password: newPassword }),
      }),
    mfaVerify: (mfaToken: string, code: string) =>
      authRequest<any>('/mfa/verify', {
        method: 'POST',
        body: JSON.stringify({ mfa_token: mfaToken, code }),
      }),
    mfaSetup: (userId: string) =>
      authRequestWithToken<any>('/mfa/setup', {
        method: 'POST',
        body: JSON.stringify({ user_id: userId }),
      }),
    mfaEnable: (userId: string, token: string) =>
      authRequestWithToken<any>('/mfa/enable', {
        method: 'POST',
        body: JSON.stringify({ user_id: userId, token }),
      }),
    mfaDisable: (userId: string, password: string) =>
      authRequestWithToken<any>('/mfa/disable', {
        method: 'POST',
        body: JSON.stringify({ user_id: userId, password }),
      }),
    me: () =>
      authRequestWithToken<any>('/me'),
    logout: (userId: string) =>
      authRequestWithToken<any>('/logout', {
        method: 'POST',
        body: JSON.stringify({ user_id: userId }),
      }),
    refresh: (refreshToken: string) =>
      authRequest<any>('/refresh', {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refreshToken }),
      }),
  },
  products: {
    list: (params?: { category?: string; q?: string; attributes?: Record<string, string> }) => {
      const search = new URLSearchParams();
      if (params?.category) search.set('category', params.category);
      if (params?.q) search.set('q', params.q);
      if (params?.attributes && Object.keys(params.attributes).length > 0) {
        search.set('attributes', JSON.stringify(params.attributes));
      }
      const qs = search.toString();
      return request<{ data: any[], facets: any }>(`/products${qs ? `?${qs}` : ''}`);
    },
    get: (slug: string) => request<any>(`/products/${slug}`),
  },
  categories: {
    list: () => request<any[]>('/categories'),
  },
  cart: {
    create: (sessionId: string) =>
      request<any>('/cart', {
        method: 'POST',
        body: JSON.stringify({ session_id: sessionId }),
      }),
    get: (sessionId: string) =>
      request<any>(`/cart?session_id=${sessionId}`),
    addItem: (cartId: string, variantId: string, quantity: number) =>
      request<any>(`/cart/${cartId}/items`, {
        method: 'POST',
        body: JSON.stringify({ variant_id: variantId, quantity }),
      }),
    updateItem: (cartId: string, itemId: string, quantity: number) =>
      request<any>(`/cart/${cartId}/items/${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity }),
      }),
    removeItem: (cartId: string, itemId: string) =>
      request<any>(`/cart/${cartId}/items/${itemId}`, { method: 'DELETE' }),
  },
  checkout: {
    submit: (cartId: string, email: string, sessionId: string) =>
      request<any>(`/checkout/${cartId}`, {
        method: 'POST',
        body: JSON.stringify({ email, session_id: sessionId }),
      }),
  },
  orders: {
    get: (id: string) => request<any>(`/orders/${id}`),
    listByEmail: (email: string) =>
      request<any[]>(`/orders/by-email?email=${encodeURIComponent(email)}`),
  },
};
