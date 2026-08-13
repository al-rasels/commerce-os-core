import { Suspense } from 'react';
import { api } from '@/lib/api';
import { ProductsClient } from './products-client';

export const revalidate = 60;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; attributes?: string; brand?: string; minPrice?: string; maxPrice?: string; page?: string }>;
}) {
  const { category, attributes, brand, minPrice, maxPrice, page } = await searchParams;
  let parsedAttributes = undefined;
  if (attributes) {
    try { parsedAttributes = JSON.parse(attributes); } catch {}
  }

  const toNum = (value: string | undefined) => {
    if (value === undefined || value === '') return undefined;
    const n = Number(value);
    return Number.isNaN(n) ? undefined : n;
  };

  const currentPage = Math.max(parseInt(page || '', 10) || 1, 1);
  const limit = 24;

  const [productsResponse, categories] = await Promise.all([
    api.products.list({
      category,
      attributes: parsedAttributes,
      brand,
      minPrice: toNum(minPrice),
      maxPrice: toNum(maxPrice),
      page: currentPage,
      limit,
    }).catch(() => ({ data: [], facets: {}, total: 0, page: 1, limit })),
    api.categories.list().catch(() => []),
  ]);

  return (
    <Suspense fallback={null}>
      <ProductsClient
        products={productsResponse.data}
        facets={productsResponse.facets}
        categories={categories}
        initialCategory={category || null}
        initialAttributes={parsedAttributes || {}}
        total={productsResponse.total}
        page={productsResponse.page}
        limit={productsResponse.limit}
      />
    </Suspense>
  );
}
