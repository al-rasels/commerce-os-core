import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { b2bApi, type CompanyProfileInput } from '@/lib/api/b2b';
import { toast } from 'sonner';

export function useCompanyProfiles() {
  return useQuery({
    queryKey: ['company-profiles'],
    queryFn: b2bApi.companyProfiles.list,
  });
}

export function useCreateCompanyProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CompanyProfileInput) => b2bApi.companyProfiles.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['company-profiles'] });
      toast.success('Company profile created');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateCompanyProfile(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<CompanyProfileInput>) => b2bApi.companyProfiles.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['company-profiles'] });
      toast.success('Company profile updated');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteCompanyProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => b2bApi.companyProfiles.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['company-profiles'] });
      toast.success('Company profile deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
