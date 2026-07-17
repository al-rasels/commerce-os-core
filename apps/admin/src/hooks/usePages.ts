import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pagesApi, type PageSection } from '@/lib/api/pages';
import { toast } from 'sonner';

export function usePageLayout(pageKey: string) {
  return useQuery({
    queryKey: ['page-layout', pageKey],
    queryFn: () => pagesApi.get(pageKey),
  });
}

export function useSavePageLayout(pageKey: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ sections, publish }: { sections: PageSection[]; publish?: boolean }) =>
      pagesApi.save(pageKey, sections, publish),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['page-layout', pageKey] });
      if (variables.publish) {
        toast.success('Page layout published');
      } else {
        toast.success('Draft saved');
      }
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function usePublishPageLayout(pageKey: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => pagesApi.publish(pageKey),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['page-layout', pageKey] });
      toast.success('Page layout published');
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
      toast.success('Page layout unpublished');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
