import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { returnsApi, type ReturnRequestInput } from '@/lib/api/returns';
import { toast } from 'sonner';

export function useReturns() {
  return useQuery({
    queryKey: ['returns'],
    queryFn: returnsApi.returns.list,
  });
}

export function useCreateReturn() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ReturnRequestInput) => returnsApi.returns.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['returns'] });
      toast.success('Return request created');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateReturn(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<ReturnRequestInput>) => returnsApi.returns.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['returns'] });
      toast.success('Return request updated');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteReturn() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => returnsApi.returns.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['returns'] });
      toast.success('Return request deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
