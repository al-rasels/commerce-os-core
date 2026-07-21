import { api } from '@/lib/api';
import { ProductCard } from '@/components/product-card';
import { SearchForm } from './search-form';

export const revalidate = 60;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || '';
  const response = query
    ? await api.products.list({ q: query }).catch(() => ({ data: [], facets: {} }))
    : { data: [], facets: {} };
  const products = response.data;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Search</h1>

      <SearchForm query={query} />

      {query && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">
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
            <div className="text-center py-24 bg-muted/20 rounded-2xl border border-dashed border-border/50">
              <p className="text-muted-foreground text-lg mb-2">Try a different search term.</p>
              <p className="text-muted-foreground text-sm">Check your spelling or browse categories.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
