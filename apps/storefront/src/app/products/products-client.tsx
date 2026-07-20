"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/product-card";
import { SlidersHorizontal, ChevronRight } from "lucide-react";

export function ProductsClient({ products, categories }: { products: any[], categories: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = activeCategory 
    ? products.filter(p => p.category?.slug === activeCategory)
    : products;

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
                        onClick={() => setActiveCategory(null)}
                        className={`text-sm flex items-center justify-between w-full transition-colors ${activeCategory === null ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        All Categories
                        {activeCategory === null && <ChevronRight className="w-4 h-4" />}
                      </button>
                    </li>
                    {categories.map(cat => (
                      <li key={cat.id}>
                        <button
                          onClick={() => setActiveCategory(cat.slug)}
                          className={`text-sm flex items-center justify-between w-full transition-colors ${activeCategory === cat.slug ? 'font-semibold text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                          {cat.name}
                          {activeCategory === cat.slug && <ChevronRight className="w-4 h-4" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Price Range</h3>
                  <ul className="space-y-3">
                    {['Under $50', '$50 - $100', '$100 - $200', 'Over $200'].map(range => (
                      <li key={range}>
                        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-left">
                          {range}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
              <span>Showing {filteredProducts.length} results</span>
              <select className="bg-transparent border border-border/50 rounded-md py-1 px-3 text-sm focus:outline-none focus:border-primary">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-muted/20 rounded-2xl border border-dashed border-border/50">
                <p className="text-muted-foreground text-lg mb-4">No products found for this category.</p>
                <button 
                  onClick={() => setActiveCategory(null)}
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
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
              >
                {filteredProducts.map((product: any) => (
                  <motion.div key={product.id} variants={itemVariants} className="h-full">
                    <ProductCard product={product} />
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
