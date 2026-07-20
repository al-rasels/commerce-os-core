import { api } from '@/lib/api';
import { ProductsClient } from './products-client';

export const revalidate = 60;

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    api.products.list().catch(() => []),
    api.categories.list().catch(() => []),
  ]);

  return <ProductsClient products={products} categories={categories} />;
}
