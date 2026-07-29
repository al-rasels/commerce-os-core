import { api } from './client';

export interface Product {
  id: string;
  name: string;
  slug: string;
  product_type: 'physical' | 'digital' | 'bundle';
  status: 'draft' | 'active' | 'archived';
  category_id: string | null;
  description: string | null;
  metafields_json: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface ProductInput {
  name: string;
  slug: string;
  product_type?: 'physical' | 'digital' | 'bundle';
  status?: 'draft' | 'active' | 'archived';
  category_id?: string | null;
  description?: string | null;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  name: string;
  option_label: string | null;
  price: number | null;
  compare_at_price: number | null;
  stock: number;
  created_at: string;
  updated_at: string;
}

export interface ProductVariantInput {
  sku: string;
  name: string;
  option_label?: string;
  price?: number;
  compare_at_price?: number;
  stock?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryInput {
  name: string;
  slug: string;
  parent_id?: string | null;
  sort_order?: number;
}

export const catalogApi = {
  products: {
    list: () => api.get<Product[]>('/api/v1/commerce/catalog/products'),
    get: (id: string) => api.get<Product>(`/api/v1/commerce/catalog/products/${id}`),
    create: (data: ProductInput) => api.post<Product>('/api/v1/commerce/catalog/products', data),
    update: (id: string, data: Partial<ProductInput>) =>
      api.patch<Product>(`/api/v1/commerce/catalog/products/${id}`, data),
    delete: (id: string) => api.delete<void>(`/api/v1/commerce/catalog/products/${id}`),
  },
  categories: {
    list: () => api.get<Category[]>('/api/v1/commerce/catalog/categories'),
    get: (id: string) => api.get<Category>(`/api/v1/commerce/catalog/categories/${id}`),
    create: (data: CategoryInput) => api.post<Category>('/api/v1/commerce/catalog/categories', data),
    update: (id: string, data: Partial<CategoryInput>) =>
      api.patch<Category>(`/api/v1/commerce/catalog/categories/${id}`, data),
    delete: (id: string) => api.delete<void>(`/api/v1/commerce/catalog/categories/${id}`),
  },
  variants: {
    list: (productId: string) =>
      api.get<ProductVariant[]>(`/api/v1/commerce/catalog/products/${productId}/variants`),
    create: (productId: string, data: ProductVariantInput) =>
      api.post<ProductVariant>(`/api/v1/commerce/catalog/products/${productId}/variants`, data),
    update: (id: string, data: Partial<ProductVariantInput>) =>
      api.patch<ProductVariant>(`/api/v1/commerce/catalog/variants/${id}`, data),
    delete: (id: string) => api.delete<void>(`/api/v1/commerce/catalog/variants/${id}`),
  },
  bundles: {
    list: (variantId: string) =>
      api.get<any[]>(`/api/v1/commerce/catalog/variants/${variantId}/bundle`),
    set: (variantId: string, items: { child_variant_id: string; quantity: number }[]) =>
      api.post<void>(`/api/v1/commerce/catalog/variants/${variantId}/bundle`, { items }),
  }
};
