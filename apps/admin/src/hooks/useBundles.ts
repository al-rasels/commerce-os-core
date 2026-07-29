import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { catalogApi } from '@/lib/api/catalog';
import { toast } from 'sonner';

export function useBundleItems(variantId: string | undefined) {
  return useQuery({
    queryKey: ['variants', variantId, 'bundle'],
    queryFn: () => catalogApi.bundles.list(variantId!),
    enabled: !!variantId,
  });
}

export function useSetBundleItems(variantId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (items: { child_variant_id: string; quantity: number }[]) =>
      catalogApi.bundles.set(variantId!, items),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['variants', variantId, 'bundle'] });
      toast.success('Bundle items saved');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
