import { api } from './client';
import type { BuilderNode, PageLayoutDTO } from '@commerceos/shared-types';

export interface PageSection {
  id: string;
  component: string;
  visible: boolean;
  rules?: { if: string; action: 'show' | 'hide' }[];
  props: Record<string, unknown>;
  options?: Record<string, unknown>;
  children?: PageSection[];
}

export type PageLayout = PageLayoutDTO;

export const pagesApi = {
  list: () => api.get<PageLayoutDTO[]>('/api/v1/experience/builder/pages'),

  get: (key: string) =>
    api.get<PageLayoutDTO>(`/api/v1/experience/builder/pages/${key}?draft=true`),

  save: (key: string, nodes: BuilderNode[] | PageSection[], publish: boolean = false) =>
    api.put<PageLayoutDTO>(`/api/v1/experience/builder/pages/${key}`, {
      nodes,
      sectionsJson: nodes,
      publish,
    }),

  publish: (key: string) =>
    api.post<PageLayoutDTO>(`/api/v1/experience/builder/pages/${key}/publish`),

  unpublish: (key: string) =>
    api.post<PageLayoutDTO>(`/api/v1/experience/builder/pages/${key}/unpublish`),
};
