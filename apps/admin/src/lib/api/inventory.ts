import { api } from './client';

export interface InventoryLocation {
  id: string;
  tenant_id: string;
  name: string;
  address_line1: string | null;
  city: string | null;
  country: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InventoryLocationInput {
  name: string;
  address_line1?: string | null;
  city?: string | null;
  country?: string | null;
  is_active?: boolean;
}

export interface InventoryLevel {
  id: string;
  tenant_id: string;
  location_id: string;
  variant_id: string;
  stock_on_hand: number;
  stock_reserved: number;
  created_at: string;
  updated_at: string;
}

export interface InventoryLevelInput {
  location_id: string;
  variant_id: string;
  stock_on_hand?: number;
  stock_reserved?: number;
}

export const inventoryApi = {
  locations: {
    list: () => api.get<InventoryLocation[]>('/api/v1/commerce/inventory/locations'),
    get: (id: string) => api.get<InventoryLocation>(`/api/v1/commerce/inventory/locations/${id}`),
    create: (data: InventoryLocationInput) => api.post<InventoryLocation>('/api/v1/commerce/inventory/locations', data),
    update: (id: string, data: Partial<InventoryLocationInput>) =>
      api.patch<InventoryLocation>(`/api/v1/commerce/inventory/locations/${id}`, data),
    delete: (id: string) => api.delete<void>(`/api/v1/commerce/inventory/locations/${id}`),
  },
  levels: {
    list: () => api.get<InventoryLevel[]>('/api/v1/commerce/inventory/levels'),
    getByLocation: (locationId: string) => api.get<InventoryLevel[]>(`/api/v1/commerce/inventory/locations/${locationId}/levels`),
    update: (id: string, data: Partial<InventoryLevelInput>) =>
      api.patch<InventoryLevel>(`/api/v1/commerce/inventory/levels/${id}`, data),
  }
};
