import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { themeApi } from '@/lib/api/experience';
import { defaultTokens } from '@commerceos/design-tokens';
import { toast } from 'sonner';

export function useTheme() {
  return useQuery({
    queryKey: ['theme'],
    queryFn: themeApi.get,
    staleTime: 60_000,
    retry: 0,
    placeholderData: () => ({ id: '', version: 'local', tokens: defaultTokens as unknown as Record<string, unknown>, conflicts: [] }),
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
