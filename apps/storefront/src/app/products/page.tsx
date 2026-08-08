import { api } from '@/lib/api';
import { ProductsClient } from './products-client';

export const revalidate = 60;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; attributes?: string; page?: string }>;
}) {
  const { category, attributes, page } = await searchParams;
  let parsedAttributes = undefined;
  if (attributes) {
    try { parsedAttributes = JSON.parse(attributes); } catch (e) {}
  }

  const currentPage = Math.max(parseInt(page || '', 10) || 1, 1);
  const limit = 24;

  const [productsResponse, categories] = await Promise.all([
    api.products.list({ category, attributes: parsedAttributes, page: currentPage, limit }).catch(() => ({ data: [], facets: {}, total: 0, page: 1, limit })),
    api.categories.list().catch(() => []),
  ]);

  return <ProductsClient
    products={productsResponse.data}
    facets={productsResponse.facets}
    categories={categories}
    initialCategory={category || null}
    initialAttributes={parsedAttributes || {}}
    total={productsResponse.total}
    page={productsResponse.page}
    limit={productsResponse.limit}
  />;
}
