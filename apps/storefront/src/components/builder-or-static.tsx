import React from 'react';
import { draftMode } from 'next/headers';
import { serverApi } from '@/lib/server-api';
import { SectionRenderer } from '@/components/section-renderer';

/**
 * Builds either the tenant's published page-builder layout for `pageKey`, or —
 * when nothing is published — the static `children` (the hand-written page).
 *
 * This "un-shadows" admin page-builder edits for content pages that previously
 * had hardcoded Next.js routes (e.g. /faq, /contact, /shipping): once an admin
 * publishes a layout for that key, it takes precedence over the static page.
 * Pages composing this component should also export `revalidate = 60` so
 * publish changes propagate via ISR.
 */
export async function BuilderOrStatic({
  pageKey,
  children,
}: {
  pageKey: string;
  children: React.ReactNode;
}) {
  const draft = await draftMode();
  const page = await serverApi.experience
    .getPage(pageKey, draft.isEnabled)
    .catch(() => null);

  if (page && Array.isArray(page.nodes) && page.nodes.length > 0) {
    return <SectionRenderer nodes={page.nodes} dataContext={{}} />;
  }
  return <>{children}</>;
}