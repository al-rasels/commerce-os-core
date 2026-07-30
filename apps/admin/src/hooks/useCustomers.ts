import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerApi, type CustomerInput, type CustomerListResponse } from '@/lib/api/customers';
import { toast } from 'sonner';

export function useCustomers(params?: { search?: string; page?: number; limit?: number }) {
  return useQuery<CustomerListResponse>({
    queryKey: ['customers', params],
    queryFn: () => customerApi.list(params),
  });
}

export function useCustomer(id: string | undefined) {
  return useQuery({
    queryKey: ['customers', id],
    queryFn: () => customerApi.get(id!),
    enabled: !!id,
  });
}

export function useCreateCustomer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CustomerInput) => customerApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['customers'] });
      toast.success('Customer created');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateCustomer(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<CustomerInput>) => customerApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['customers'] });
      toast.success('Customer updated');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteCustomer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => customerApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['customers'] });
      toast.success('Customer deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
