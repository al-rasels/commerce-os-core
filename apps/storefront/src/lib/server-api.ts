import { headers } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function serverRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const headersList = await headers();
  const host = headersList.get('host');
  
  const res = await fetch(`${API_BASE}/api/v1${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(host ? { 'Host': host } : {}),
      ...options?.headers,
    },
  });
  
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.message || res.statusText, res.status);
  }
  return res.json();
}

export const serverApi = {
  experience: {
    getTheme: () => serverRequest<any>('/experience/theme'),
    getPage: (pageKey: string) => serverRequest<any>(`/experience/pages/${pageKey}/published`),
  },
  products: {
    list: (params?: { category?: string; q?: string; page?: number; limit?: number; attributes?: Record<string, string> }) => {
      const search = new URLSearchParams();
      if (params?.category) search.set('categoryId', params.category);
      if (params?.q) search.set('q', params.q);
      if (params?.page) search.set('page', params.page.toString());
      if (params?.limit) search.set('limit', params.limit.toString());
      if (params?.attributes && Object.keys(params.attributes).length > 0) {
        search.set('attributes', JSON.stringify(params.attributes));
      }
      const qs = search.toString();
      return serverRequest<{ data: any[], facets: any }>(`/catalog/products${qs ? `?${qs}` : ''}`); // Note: according to API docs, it's catalog/products
    },
    get: (id: string) => serverRequest<any>(`/catalog/products/${id}`),
  },
  categories: {
    list: () => serverRequest<any[]>('/catalog/categories'),
  }
};
