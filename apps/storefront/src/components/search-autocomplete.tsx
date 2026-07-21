"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { api } from "@/lib/api";

export function SearchAutocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const res = await api.products.list({ q: debouncedQuery });
        setResults(res.data || []);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-sm hidden md:block">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-muted/50 border border-border/50 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary transition-colors"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </div>
      </form>

      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-background border border-border/50 rounded-xl shadow-lg overflow-hidden z-50">
          {isLoading ? (
            <div className="p-4 text-sm text-muted-foreground text-center">Searching...</div>
          ) : results.length > 0 ? (
            <div className="flex flex-col">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
                >
                  <div className="w-10 h-10 rounded bg-muted overflow-hidden shrink-0">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-20">🖼</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{product.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {product.variants?.[0]?.currency || 'USD'} {(product.variants?.[0]?.price_cents / 100 || 0).toFixed(2)}
                    </div>
                  </div>
                </Link>
              ))}
              <button 
                onClick={handleSubmit}
                className="p-3 text-sm font-medium text-primary text-center hover:bg-muted/50 transition-colors bg-primary/5"
              >
                View all results for "{query}"
              </button>
            </div>
          ) : (
            <div className="p-4 text-sm text-muted-foreground text-center">No products found</div>
          )}
        </div>
      )}
    </div>
  );
}
