import { headers } from 'next/headers';
import type { PageLayoutDTO } from '@commerceos/shared-types';

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
    getPage: (pageKey: string, draft?: boolean) =>
      serverRequest<PageLayoutDTO>(
        `/experience/builder/pages/${pageKey}${draft ? '?draft=true' : ''}`,
        draft && process.env.PREVIEW_SECRET
          ? { headers: { 'x-preview-secret': process.env.PREVIEW_SECRET } }
          : undefined,
      ),
  },
  products: {
    list: (params?: { category?: string; q?: string; page?: number; limit?: number; attributes?: Record<string, string> }) => {
      const search = new URLSearchParams();
      if (params?.category) search.set('category', params.category);
      if (params?.q) search.set('q', params.q);
      if (params?.page) search.set('page', params.page.toString());
      if (params?.limit) search.set('limit', params.limit.toString());
      if (params?.attributes && Object.keys(params.attributes).length > 0) {
        search.set('attributes', JSON.stringify(params.attributes));
      }
      const qs = search.toString();
      return serverRequest<{ data: any[]; facets: any; total: number; page: number; limit: number }>(
        `/storefront/products${qs ? `?${qs}` : ''}`,
      );
    },
    get: (slug: string) => serverRequest<any>(`/storefront/products/${slug}`),
    reviews: (slug: string) =>
      serverRequest<{ data: any[]; summary: { count: number; avg: number } }>(
        `/storefront/products/${slug}/reviews`,
      ),
  },
  categories: {
    list: () => serverRequest<any[]>('/storefront/categories'),
  }
};
