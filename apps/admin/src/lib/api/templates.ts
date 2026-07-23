import { api } from './client';

export interface TemplateBase {
  id: string;
  name: string;
  description: string | null;
  version: string;
  layout_json: any;
}

export const templatesApi = {
  list: () => api.get<TemplateBase[]>('/api/v1/experience/templates'),
  get: (id: string) => api.get<TemplateBase>(`/api/v1/experience/templates/${id}`),
};
