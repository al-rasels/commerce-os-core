import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { themeApi } from '@/lib/api/experience';
import { toast } from 'sonner';

export function useTheme() {
  return useSuspenseQuery({
    queryKey: ['theme'],
    queryFn: themeApi.get,
  });
}

export function useSaveThemeOverride() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ themeBaseId, overridesJson }: { themeBaseId: string; overridesJson: Record<string, unknown> }) =>
      themeApi.updateOverride(themeBaseId, overridesJson),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['theme'] });
      toast.success('Theme saved');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
