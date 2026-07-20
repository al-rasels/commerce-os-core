'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SearchForm({ query }: { query: string }) {
  const router = useRouter();

  return (
    <form
      className="flex gap-2 mb-12 max-w-xl mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const q = fd.get('q') as string;
        router.push(`/search?q=${encodeURIComponent(q)}`);
      }}
    >
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
  );
}
