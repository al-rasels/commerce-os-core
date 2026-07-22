import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryApi, type InventoryLocationInput, type InventoryLevelInput } from '@/lib/api/inventory';
import { toast } from 'sonner';

export function useLocations() {
  return useQuery({
    queryKey: ['inventory-locations'],
    queryFn: inventoryApi.locations.list,
  });
}

export function useCreateLocation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: InventoryLocationInput) => inventoryApi.locations.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['inventory-locations'] });
      toast.success('Location created');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateLocation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<InventoryLocationInput>) => inventoryApi.locations.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['inventory-locations'] });
      toast.success('Location updated');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteLocation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inventoryApi.locations.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['inventory-locations'] });
      toast.success('Location deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useInventoryLevels(locationId: string) {
  return useQuery({
    queryKey: ['inventory-levels', locationId],
    queryFn: () => inventoryApi.levels.getByLocation(locationId),
    enabled: !!locationId,
  });
}

export function useUpdateInventoryLevel(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<InventoryLevelInput>) => inventoryApi.levels.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['inventory-levels'] });
      toast.success('Inventory level updated');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
