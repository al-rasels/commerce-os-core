import { serverApi } from '@/lib/server-api';
import { SectionRenderer } from '@/components/section-renderer';

export const revalidate = 60; // SSR with 60s cache

export default async function HomePage() {
  const [page, productsResponse, categoriesResponse] = await Promise.all([
    serverApi.experience.getPage('homepage').catch(() => null),
    serverApi.products.list().catch(() => ({ data: [] })),
    serverApi.categories.list().catch(() => ({ data: [] })),
  ]);

  if (!page || !page.data) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground text-lg">Homepage layout not found or not published.</p>
      </div>
    );
  }

  const products = productsResponse?.data || [];
  const categories = categoriesResponse?.data || [];

  return <SectionRenderer nodes={page.data.sections || page.data.sections_json} dataContext={{ products, categories }} />;
}
