import { Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || '';

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Search</h1>
      
      <form className="flex gap-2 mb-12" action="/search" method="GET">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            name="q" 
            defaultValue={query}
            placeholder="Search products..." 
            className="pl-10 h-12 text-lg"
          />
        </div>
        <Button type="submit" size="lg">Search</Button>
      </form>

      {query && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Results for &quot;{query}&quot;</h2>
          <Suspense fallback={<div>Searching...</div>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-muted-foreground">Search results...</div>
            </div>
          </Suspense>
        </div>
      )}
    </div>
  );
}
