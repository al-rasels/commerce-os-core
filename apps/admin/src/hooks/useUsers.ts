import { useQuery, useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi, type InviteUserInput, type UpdateUserInput, type UpdateUserStatusInput, type UserListResponse } from '@/lib/api/users';
import { toast } from 'sonner';

export function useUsers(params?: { search?: string; page?: number; limit?: number }) {
  return useSuspenseQuery<UserListResponse>({
    queryKey: ['users', params],
    queryFn: () => userApi.list(params),
  });
}

export function useUser(id: string | undefined) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userApi.get(id!),
    enabled: !!id,
  });
}

export function useInviteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: InviteUserInput) => userApi.invite(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      toast.success('User invited');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateUser(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserInput) => userApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateUserStatus(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserStatusInput) => userApi.updateStatus(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      toast.success('User status updated');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
