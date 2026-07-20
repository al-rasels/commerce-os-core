"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Check, ShieldCheck, Truck, ChevronDown, ChevronUp } from "lucide-react";

export function ProductClient({ product, currency, price, inStock, defaultVariant }: any) {
  const [activeImage, setActiveImage] = useState(product.images?.[0] || "");
  const [accordionState, setAccordionState] = useState<Record<string, boolean>>({
    details: true,
    shipping: false,
  });

  const toggleAccordion = (section: string) => {
    setAccordionState(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Breadcrumb / Top Bar */}
      <div className="border-b border-border/50 py-4 mb-8">
        <div className="container mx-auto px-6">
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          
          {/* Left Column - Sticky Gallery */}
          <div className="flex flex-col gap-4 relative">
            <div className="sticky top-24">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-[4/5] md:aspect-square w-full rounded-2xl overflow-hidden bg-muted relative mb-4"
              >
                {activeImage ? (
                  <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">🖼</div>
                )}
              </motion.div>
              
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                  {product.images.map((img: string, idx: number) => (
                    <button 
                      key={idx} 
                      onClick={() => setActiveImage(img)}
                      className={`relative aspect-square w-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {product.category && (
                <div className="text-sm font-semibold tracking-wider uppercase text-primary mb-3">
                  {product.category.name}
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-bold">
                  {currency} {price}
                </span>
                {inStock ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-medium">
                    <Check className="w-4 h-4" /> In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-sm font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="prose prose-sm dark:prose-invert text-muted-foreground mb-10 leading-relaxed">
                {product.description || 'No description available for this product.'}
              </div>

              {/* Add to Cart Section */}
              <div className="pb-8 border-b border-border/50 mb-8">
                <div className="flex flex-col gap-4">
                  {defaultVariant && (
                    <AddToCartButton
                      variantId={defaultVariant.id}
                      disabled={!inStock}
                      label={inStock ? 'Add to Cart — ' + currency + ' ' + price : 'Out of Stock'}
                    />
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Truck className="w-5 h-5 text-primary" />
                      <span>Free shipping over $150</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      <span>2-Year Warranty</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordions */}
              <div className="flex flex-col divide-y divide-border/50">
                <div className="py-4">
                  <button 
                    onClick={() => toggleAccordion('details')}
                    className="flex w-full items-center justify-between text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    Product Details
                    {accordionState.details ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {accordionState.details && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="pt-4 text-sm text-muted-foreground leading-relaxed"
                    >
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Premium materials and craftsmanship</li>
                        <li>Designed for everyday durability</li>
                        <li>Imported high-quality components</li>
                        <li>SKU: {defaultVariant?.sku || 'N/A'}</li>
                      </ul>
                    </motion.div>
                  )}
                </div>

                <div className="py-4">
                  <button 
                    onClick={() => toggleAccordion('shipping')}
                    className="flex w-full items-center justify-between text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    Shipping & Returns
                    {accordionState.shipping ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {accordionState.shipping && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="pt-4 text-sm text-muted-foreground leading-relaxed"
                    >
                      <p className="mb-2">We offer free standard shipping on all orders over $150. Expedited shipping is available at checkout.</p>
                      <p>If you&apos;re not completely satisfied with your purchase, returns are accepted within 30 days of delivery in original condition.</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
