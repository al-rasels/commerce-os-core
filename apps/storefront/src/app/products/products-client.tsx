"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/product-card";
import { SlidersHorizontal, ChevronRight, Check, LayoutGrid, List } from "lucide-react";

export function ProductsClient({ 
  products, 
  facets = {}, 
  categories, 
  initialCategory = null, 
  initialAttributes = {} 
}: { 
  products: any[], 
  facets?: Record<string, Record<string, number>>, 
  categories: any[],
  initialCategory?: string | null,
  initialAttributes?: Record<string, string>
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = initialCategory;
  const selectedAttributes = initialAttributes;

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const currentSort = searchParams.get("sort") || "featured";

  const updateFilters = (newCategory: string | null, newAttributes: Record<string, string>, newSort: string = currentSort) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newCategory) params.set("category", newCategory);
    else params.delete("category");

    if (Object.keys(newAttributes).length > 0) {
      params.set("attributes", JSON.stringify(newAttributes));
    } else {
      params.delete("attributes");
    }

    if (newSort && newSort !== 'featured') {
      params.set("sort", newSort);
    } else {
      params.delete("sort");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategoryClick = (slug: string | null) => {
    updateFilters(slug, selectedAttributes);
  };

  const handleAttributeToggle = (key: string, value: string) => {
    const nextAttr = { ...selectedAttributes };
    if (nextAttr[key] === value) {
      delete nextAttr[key];
    } else {
      nextAttr[key] = value;
    }
    updateFilters(activeCategory, nextAttr);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters(activeCategory, selectedAttributes, e.target.value);
  };

  const filteredProducts = [...products].sort((a, b) => {
    if (currentSort === 'price_asc') {
      return (a.variants?.[0]?.price_cents || 0) - (b.variants?.[0]?.price_cents || 0);
    } else if (currentSort === 'price_desc') {
      return (b.variants?.[0]?.price_cents || 0) - (a.variants?.[0]?.price_cents || 0);
    } else if (currentSort === 'newest') {
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    }
    return 0;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <div className="bg-muted/30 border-b border-border/50 py-12 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">All Products</h1>
            <p className="text-muted-foreground text-lg">
              Explore our complete collection of premium goods. Thoughtfully designed and meticulously crafted for your lifestyle.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-6 font-semibold text-lg pb-4 border-b border-border/50">
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Categories</h3>
                  <ul className="space-y-3">
                    <li>
                      <button
                        onClick={() => handleCategoryClick(null)}
                        className={`text-sm flex items-center justify-between w-full transition-colors ${activeCategory === null ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        All Categories
                        {activeCategory === null && <ChevronRight className="w-4 h-4" />}
                      </button>
                    </li>
                    {categories.map(cat => (
                      <li key={cat.id}>
                        <button
                          onClick={() => handleCategoryClick(cat.slug)}
                          className={`text-sm flex items-center justify-between w-full transition-colors ${activeCategory === cat.slug ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                          {cat.name}
                          {activeCategory === cat.slug && <ChevronRight className="w-4 h-4" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {Object.keys(facets).length > 0 && (
                  <div className="space-y-8 mt-8">
                    {Object.entries(facets).map(([facetKey, values]) => (
                      <div key={facetKey}>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">{facetKey}</h3>
                        <ul className="space-y-3">
                          {Object.entries(values).map(([val, count]) => {
                            const isSelected = selectedAttributes[facetKey] === val;
                            return (
                              <li key={val}>
                                <button
                                  onClick={() => handleAttributeToggle(facetKey, val)}
                                  className="flex items-center justify-between w-full text-sm group"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'border-border group-hover:border-primary'}`}>
                                      {isSelected && <Check className="w-3 h-3" />}
                                    </div>
                                    <span className={isSelected ? 'font-medium text-foreground' : 'text-muted-foreground group-hover:text-foreground'}>
                                      {val}
                                    </span>
                                  </div>
                                  <span className="text-xs text-muted-foreground/70 bg-muted px-2 py-0.5 rounded-full">
                                    {count}
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
              <span>Showing {filteredProducts.length} results</span>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex border border-border/50 rounded-md overflow-hidden">
                  <button 
                    onClick={() => setViewMode('grid')} 
                    className={`p-1.5 transition-colors ${viewMode === 'grid' ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50"}`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')} 
                    className={`p-1.5 border-l border-border/50 transition-colors ${viewMode === 'list' ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50"}`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <select 
                  value={currentSort} 
                  onChange={handleSortChange} 
                  className="bg-transparent border border-border/50 rounded-md py-1 px-3 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="featured">Featured</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-muted/20 rounded-2xl border border-dashed border-border/50">
                <p className="text-muted-foreground text-lg mb-4">No products found for this category or filter.</p>
                <button 
                  onClick={() => updateFilters(null, {})}
                  className="text-primary font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <motion.div 
                key={activeCategory || 'all'}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8" : "flex flex-col gap-6"}
              >
                {filteredProducts.map((product: any) => (
                  <motion.div key={product.id} variants={itemVariants} className={viewMode === 'grid' ? "h-full" : ""}>
                    <ProductCard product={product} variant={viewMode === 'grid' ? "default" : "compact"} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
