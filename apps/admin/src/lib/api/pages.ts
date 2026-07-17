import { api } from './client';

export interface PageSection {
  id: string;
  component: string;
  visible: boolean;
  props: Record<string, unknown>;
}

export interface PageLayout {
  page_key: string;
  sections_json: PageSection[];
  published_at: string | null;
}

export const pagesApi = {
  get: (key: string) => api.get<PageLayout>(`/api/v1/experience/builder/pages/${key}`),

  save: (key: string, sectionsJson: PageSection[], publish: boolean = false) =>
    api.put<PageLayout>(`/api/v1/experience/builder/pages/${key}`, { sectionsJson, publish }),

  publish: (key: string) =>
    api.post<PageLayout>(`/api/v1/experience/builder/pages/${key}/publish`),

  unpublish: (key: string) =>
    api.post<PageLayout>(`/api/v1/experience/builder/pages/${key}/unpublish`),
};
