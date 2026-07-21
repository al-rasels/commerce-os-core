import { api } from '@/lib/api';
import { ProductsClient } from './products-client';

export const revalidate = 60;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; attributes?: string }>;
}) {
  const { category, attributes } = await searchParams;
  let parsedAttributes = undefined;
  if (attributes) {
    try { parsedAttributes = JSON.parse(attributes); } catch (e) {}
  }

  const [productsResponse, categories] = await Promise.all([
    api.products.list({ category, attributes: parsedAttributes }).catch(() => ({ data: [], facets: {} })),
    api.categories.list().catch(() => []),
  ]);

  return <ProductsClient 
    products={productsResponse.data} 
    facets={productsResponse.facets} 
    categories={categories} 
    initialCategory={category || null}
    initialAttributes={parsedAttributes || {}}
  />;
}
