import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionsApi, type SubscriptionInput } from '@/lib/api/subscriptions';
import { toast } from 'sonner';

export function useSubscriptions() {
  return useQuery({
    queryKey: ['subscriptions'],
    queryFn: subscriptionsApi.subscriptions.list,
  });
}

export function useCreateSubscription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: SubscriptionInput) => subscriptionsApi.subscriptions.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['subscriptions'] });
      toast.success('Subscription created');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateSubscription(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<SubscriptionInput>) => subscriptionsApi.subscriptions.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['subscriptions'] });
      toast.success('Subscription updated');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteSubscription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => subscriptionsApi.subscriptions.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['subscriptions'] });
      toast.success('Subscription deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
