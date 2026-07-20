import { api } from '@/lib/api';
import { HomeClient } from './home-client';

export const revalidate = 60; // SSR with 60s cache

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    api.products.list().catch(() => []),
    api.categories.list().catch(() => []),
  ]);

  return <HomeClient products={products} categories={categories} />;
}
