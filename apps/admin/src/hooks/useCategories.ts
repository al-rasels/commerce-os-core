import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { catalogApi, type CategoryInput } from '@/lib/api/catalog';
import { toast } from 'sonner';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: catalogApi.categories.list,
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryInput) => catalogApi.categories.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateCategory(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<CategoryInput>) => catalogApi.categories.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category updated');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => catalogApi.categories.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
