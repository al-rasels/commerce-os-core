import { serverApi } from '@/lib/server-api';
import { ProductCard } from '@/components/product-card';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const categories = await serverApi.categories.list().catch(() => []);
  const category = categories.find((c: any) => c.slug === slug);
  const name = category?.name || slug.replace('-', ' ');
  
  return {
    title: `${name} | CommerceOS Storefront`,
    description: category?.description || `Explore our premium selection of ${name}.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [productsResponse, categories] = await Promise.all([
    serverApi.products.list({ category: slug }).catch(() => ({ data: [] })),
    serverApi.categories.list().catch(() => []),
  ]);
  const products = productsResponse.data || productsResponse;
  const category = categories.find((c: any) => c.slug === slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize">{category?.name || slug.replace('-', ' ')}</h1>
        <p className="text-muted-foreground mt-2">
          {products.length > 0
            ? `Showing ${products.length} product${products.length === 1 ? '' : 's'}`
            : `No products found in this category.`}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-muted/20 rounded-2xl border border-dashed border-border/50">
          <p className="text-muted-foreground text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
