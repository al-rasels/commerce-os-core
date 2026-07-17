import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { catalogApi, type ProductVariantInput } from '@/lib/api/catalog';
import { toast } from 'sonner';

export function useVariants(productId: string | undefined) {
  return useQuery({
    queryKey: ['products', productId, 'variants'],
    queryFn: () => catalogApi.variants.list(productId!),
    enabled: !!productId,
  });
}

export function useCreateVariant(productId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductVariantInput) => catalogApi.variants.create(productId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products', productId, 'variants'] });
      toast.success('Variant created');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateVariant(productId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProductVariantInput> }) =>
      catalogApi.variants.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products', productId, 'variants'] });
      toast.success('Variant updated');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteVariant(productId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => catalogApi.variants.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products', productId, 'variants'] });
      toast.success('Variant deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
