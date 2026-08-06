import { serverApi } from '@/lib/server-api';
import { SectionRenderer } from '@/components/section-renderer';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { PAGE_KEY_CATALOG } from '@commerceos/shared-types';

/**
 * Catch-all route for builder-driven content pages (e.g. /about, /summer-sale).
 * Next.js resolves more specific routes (static pages, /products/[slug], etc.)
 * before this catch-all, so it only serves slugs with no dedicated route.
 *
 * Resolves the path to a page key, fetches the tenant's published layout, and
 * renders it through the same SectionRenderer used by the homepage. Unknown or
 * unpublished paths return a real 404 via notFound().
 */
export default async function BuilderPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const key = Array.isArray(slug) ? slug.join('/') : '';
  if (!key) return notFound();

  const draft = await draftMode();
  const page = await serverApi.experience
    .getPage(key, draft.isEnabled)
    .catch(() => null);

  if (!page || !Array.isArray(page.nodes)) {
    return notFound();
  }

  const catalogEntry = PAGE_KEY_CATALOG.find((p) => p.key === key);

  return (
    <div>
      {catalogEntry ? (
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">{catalogEntry.label}</h1>
        </div>
      ) : null}
      <SectionRenderer nodes={page.nodes} dataContext={{}} />
    </div>
  );
}
