import { serverApi } from '@/lib/server-api';
import { ProductCard } from '@/components/product-card';
import { SearchForm } from './search-form';
import { EmptyState } from '@/components/empty-state';
import Link from 'next/link';
import { SearchX } from 'lucide-react';

export const revalidate = 60;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || '';
  const response = query
    ? await serverApi.products.list({ q: query }).catch(() => ({ data: [], facets: {} }))
    : { data: [], facets: {} };
  const products = response.data;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center tracking-tight">Search</h1>

      <SearchForm query={query} />

      {query && (
        <div className="space-y-6 mt-8">
          <h2 className="text-xl font-semibold tracking-tight">
            {products.length > 0
              ? `${products.length} result${products.length === 1 ? '' : 's'} for "${query}"`
              : `No results for "${query}"`}
          </h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<SearchX className="size-full p-2.5" />}
              title="No results found"
              description={`We couldn't find anything for "${query}". Try a different search term or browse categories.`}
              size="lg"
              action={
                <Link
                  href="/products"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
                >
                  Browse All Products
                </Link>
              }
            />
          )}
        </div>
      )}

      {!query && (
        <EmptyState
          icon={<SearchX className="size-full p-2.5" />}
          title="Search our store"
          description="Enter a search term above to find products."
          size="sm"
          className="mt-12"
        />
      )}
    </div>
  );
}
