const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

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

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<any>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    register: (email: string, password: string) =>
      request<any>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
  },
  products: {
    list: (category?: string) =>
      request<any[]>(`/products${category ? `?category=${category}` : ''}`),
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
