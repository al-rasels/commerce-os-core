import { serverApi } from '@/lib/server-api';
import { ProductCard } from '@/components/product-card';

export const metadata = { title: 'Featured Products | CommerceOS' };

export default async function FeaturedPage() {
  const products = await serverApi.products.list().then(r => r.data || []).catch(() => []);

  return (
    <div className="container mx-auto px-6 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Featured Products</h1>
      <p className="text-muted-foreground mb-8 text-lg">Our curated selection of premium products.</p>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p: any) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <p className="text-muted-foreground">No featured products at this time.</p>
      )}
    </div>
  );
}
