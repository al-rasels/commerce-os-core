import { useQuery, useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi, type ListOrdersParams } from '@/lib/api/orders';
import { toast } from 'sonner';

export function useOrders(params?: ListOrdersParams) {
  return useSuspenseQuery({
    queryKey: ['orders', params],
    queryFn: () => orderApi.list(params),
  });
}

export function useOrder(id: string | undefined) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => orderApi.get(id!),
    enabled: !!id,
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      orderApi.updateStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order status updated');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
