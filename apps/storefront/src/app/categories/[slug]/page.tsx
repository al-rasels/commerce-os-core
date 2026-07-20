import { Suspense } from 'react';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize">{resolvedParams.slug.replace('-', ' ')}</h1>
        <p className="text-muted-foreground mt-2">Explore our collection of {resolvedParams.slug.replace('-', ' ')} products.</p>
      </div>
      
      <main>
        <Suspense fallback={<div>Loading category products...</div>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-muted-foreground">Products for category...</div>
          </div>
        </Suspense>
      </main>
    </div>
  );
}
