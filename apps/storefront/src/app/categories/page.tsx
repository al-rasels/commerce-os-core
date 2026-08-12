import Link from 'next/link';
import { Folder } from 'lucide-react';
import { serverApi } from '@/lib/server-api';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories | CommerceOS Storefront',
  description: 'Explore products by category.',
};

export const revalidate = 60;

export default async function CategoriesIndexPage() {
  const categories = await serverApi.categories.list().catch(() => []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight">Product Categories</h1>
        <p className="text-muted-foreground mt-3 text-lg">
          Browse our curated collections by category to find exactly what you need.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col justify-between p-6 bg-card rounded-2xl border border-border/50 hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Folder className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{cat.name}</h3>
                  {cat._count?.products !== undefined && (
                    <span className="text-xs text-muted-foreground">{cat._count.products} products</span>
                  )}
                </div>
              </div>
              {cat.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{cat.description}</p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-muted/20 rounded-2xl border border-dashed border-border/50 max-w-xl mx-auto">
          <Folder className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-lg">No categories available at the moment.</p>
        </div>
      )}
    </div>
  );
}
