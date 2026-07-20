"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ArrowRight, Truck, ShieldCheck, Zap } from "lucide-react";

export function HomeClient({ products, categories }: { products: any[], categories: any[] }) {
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
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl flex flex-col items-center"
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 uppercase tracking-wider inline-block">
              Welcome to the future of retail
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 leading-tight">
              Premium Commerce, <br className="hidden md:block" /> Elevated Experience.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl font-medium leading-relaxed">
              Discover our curated collection of high-end products designed for the modern lifestyle. Quality meets aesthetic perfection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="group relative inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center rounded-full bg-secondary px-8 py-3.5 text-base font-semibold text-secondary-foreground transition-all hover:bg-secondary/80 hover:scale-105 active:scale-95"
              >
                Browse Categories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-border/50 bg-muted/20 w-full py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-border/50">
            <div className="flex flex-col items-center justify-center p-4">
              <Truck className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground">Free Global Shipping</h3>
              <p className="text-sm text-muted-foreground mt-1">On orders over $150</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <ShieldCheck className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground">Secure Payments</h3>
              <p className="text-sm text-muted-foreground mt-1">100% protected transactions</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <Zap className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground mt-1">Same day dispatch available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      {categories.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Shop by Category</h2>
                <p className="text-muted-foreground">Find exactly what you&apos;re looking for.</p>
              </div>
              <Link href="/categories" className="text-primary font-medium hover:underline flex items-center mt-4 md:mt-0">
                View all categories <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.slice(0, 4).map((cat: any, i) => (
                <Link key={cat.id} href={`/categories/${cat.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                    className="relative aspect-square rounded-2xl overflow-hidden group bg-muted cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity group-hover:opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center z-0 bg-secondary/50" />
                    <div className="absolute bottom-6 left-6 z-20">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-x-2 transition-transform">{cat.name}</h3>
                      <p className="text-white/80 text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-2">
                        Shop now <ArrowRight className="ml-1 w-3 h-3" />
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-24 bg-muted/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Trending Now</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most popular products this week. Carefully selected for you.
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 bg-background rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground text-lg">No products available at the moment.</p>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {products.slice(0, 8).map((product: any) => (
                <motion.div key={product.id} variants={itemVariants} className="h-full">
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {products.length > 0 && (
            <div className="mt-16 text-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary text-primary px-8 py-3 font-semibold transition-all hover:bg-primary hover:text-primary-foreground"
              >
                View Complete Catalog
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
