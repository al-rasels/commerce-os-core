import { api } from './client';
import type { BuilderNode, PageLayoutDTO } from '@commerceos/shared-types';

export type PageSection = BuilderNode;
export type PageLayout = PageLayoutDTO;

export const pagesApi = {
  list: () => api.get<PageLayoutDTO[]>('/api/v1/experience/builder/pages'),

  get: (key: string) =>
    api.get<PageLayoutDTO>(`/api/v1/experience/builder/pages/${key}?draft=true`),

  save: (key: string, nodes: BuilderNode[]) =>
    api.put<PageLayoutDTO>(`/api/v1/experience/builder/pages/${key}`, {
      nodes,
    }),

  publish: (key: string) =>
    api.post<PageLayoutDTO>(`/api/v1/experience/builder/pages/${key}/publish`),

  unpublish: (key: string) =>
    api.post<PageLayoutDTO>(`/api/v1/experience/builder/pages/${key}/unpublish`),
};
