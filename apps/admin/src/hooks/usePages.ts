import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pagesApi, type PageSection } from '@/lib/api/pages';
import { toast } from 'sonner';

export function usePageLayoutsList() {
  return useQuery({
    queryKey: ['page-layouts-list'],
    queryFn: () => pagesApi.list(),
    staleTime: 30_000,
  });
}

export function usePageLayout(pageKey: string) {
  return useQuery({
    queryKey: ['page-layout', pageKey],
    queryFn: () => pagesApi.get(pageKey),
    enabled: !!pageKey,
    staleTime: 60_000,
  });
}

export function useSavePageLayout(pageKey: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ nodes, publish }: { nodes: PageSection[]; publish?: boolean }) => {
      if (publish) {
        return pagesApi.save(pageKey, nodes).then(() => pagesApi.publish(pageKey));
      }
      return pagesApi.save(pageKey, nodes);
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['page-layout', pageKey] });
      qc.invalidateQueries({ queryKey: ['page-layouts-list'] });
      if (variables.publish) {
        toast.success('Page layout published');
      } else {
        toast.success('Draft saved');
      }
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUnpublishPageLayout(pageKey: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => pagesApi.unpublish(pageKey),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['page-layout', pageKey] });
      qc.invalidateQueries({ queryKey: ['page-layouts-list'] });
      toast.success('Page layout unpublished');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
