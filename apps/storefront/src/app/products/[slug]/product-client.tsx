"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Check, ShieldCheck, Truck, ChevronDown, ChevronUp, X, ZoomIn } from "lucide-react";

export function ProductClient({ product, currency }: any) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setActiveImageIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setActiveImageIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const [accordionState, setAccordionState] = useState<Record<string, boolean>>({
    details: true,
    shipping: false,
  });

  const toggleAccordion = (section: string) => {
    setAccordionState(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const optionsMap = useMemo(() => {
    const map: Record<string, Set<string>> = {};
    product.variants?.forEach((v: any) => {
      if (v.attributes_json) {
        Object.entries(v.attributes_json).forEach(([key, value]) => {
          if (!map[key]) map[key] = new Set();
          map[key].add(value as string);
        });
      }
    });
    return map;
  }, [product.variants]);

  const { selectedVariant, selectedOptions, handleOptionSelect } = product;

  const displayPrice = selectedVariant ? (selectedVariant.price_cents / 100).toFixed(2) : (product.variants?.[0]?.price_cents / 100 || 0).toFixed(2);
  const stockAvailable = selectedVariant ? (selectedVariant.stock_available - selectedVariant.stock_reserved) : 0;
  const displayInStock = stockAvailable > 0;
  const isLowStock = stockAvailable > 0 && stockAvailable <= 5;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const [showStickyCart, setShowStickyCart] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowStickyCart(latest > 600);
  });

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
              {/* Main Image Carousel */}
              <div className="overflow-hidden rounded-2xl bg-muted mb-4 relative group cursor-zoom-in" ref={emblaMainRef} onClick={() => setLightboxOpen(true)}>
                <div className="flex touch-pan-y">
                  {product.images && product.images.length > 0 ? (
                    product.images.map((img: string, idx: number) => (
                      <div className="flex-[0_0_100%] min-w-0" key={idx}>
                        <div className="aspect-[4/5] md:aspect-square w-full relative">
                          <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex-[0_0_100%] min-w-0">
                      <div className="aspect-[4/5] md:aspect-square w-full flex items-center justify-center text-6xl opacity-20">🖼</div>
                    </div>
                  )}
                </div>
                <div className="absolute top-4 right-4 bg-background/50 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-5 h-5 text-foreground" />
                </div>
              </div>
              
              {/* Thumbnails Carousel */}
              {product.images && product.images.length > 1 && (
                <div className="overflow-hidden" ref={emblaThumbsRef}>
                  <div className="flex gap-4 touch-pan-y">
                    {product.images.map((img: string, idx: number) => (
                      <button 
                        key={idx} 
                        onClick={() => onThumbClick(idx)}
                        className={`flex-[0_0_5rem] min-w-0 relative aspect-square shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      >
                        <Image src={img} alt={`${product.name} thumbnail ${idx}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
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
                  {currency} {displayPrice}
                </span>
                {displayInStock ? (
                  <div className="flex flex-col gap-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-medium">
                      <Check className="w-4 h-4" /> In Stock
                    </span>
                    {isLowStock && (
                      <span className="text-xs font-semibold text-orange-500 animate-pulse ml-1 mt-1">
                        Only {stockAvailable} left in stock — order soon!
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-sm font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="prose prose-sm dark:prose-invert text-muted-foreground mb-10 leading-relaxed">
                {product.description || 'No description available for this product.'}
              </div>

              {/* Variant Selector */}
              {Object.entries(optionsMap).length > 0 && (
                <div className="mb-8 space-y-6">
                  {Object.entries(optionsMap).map(([key, set]) => (
                    <div key={key}>
                      <h3 className="text-sm font-semibold mb-3">{key}</h3>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(set).map(value => (
                          <button
                            key={value}
                            onClick={() => handleOptionSelect(key, value)}
                            className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${selectedOptions[key] === value ? 'border-primary bg-primary/5 text-primary' : 'border-border/50 text-muted-foreground hover:border-foreground'}`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add to Cart Section */}
              <div className="pb-8 border-b border-border/50 mb-8">
                <div className="flex flex-col gap-4">
                  {selectedVariant && (
                    <AddToCartButton
                      variantId={selectedVariant.id}
                      disabled={!displayInStock}
                      label={displayInStock ? 'Add to Cart — ' + currency + ' ' + displayPrice : 'Out of Stock'}
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
                        <li>SKU: {selectedVariant?.sku || 'N/A'}</li>
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
      
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl"
          >
            <button 
              className="absolute top-6 right-6 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors z-[101]"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full max-w-5xl px-4 flex flex-col items-center gap-6">
              <div className="relative w-full max-h-[75vh] h-full flex items-center justify-center">
                <Image 
                  src={product.images[activeImageIndex] || ""} 
                  alt={`${product.name} fullscreen`} 
                  fill
                  className="object-contain rounded-lg shadow-2xl" 
                />
              </div>
              <div className="flex gap-4 overflow-x-auto p-4 max-w-full no-scrollbar">
                {product.images.map((img: string, idx: number) => (
                  <button 
                    key={idx} 
                    onClick={() => {
                      onThumbClick(idx);
                      setActiveImageIndex(idx);
                    }}
                    className={`shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-primary ring-2 ring-primary/50 ring-offset-2 ring-offset-background' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Add-to-Cart Bar */}
      <AnimatePresence>
        {showStickyCart && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-t border-border/50 p-4 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] supports-[backdrop-filter]:bg-background/60"
          >
            <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between gap-4">
              <div className="hidden md:flex items-center gap-4 flex-1">
                {product.images?.[0] && (
                  <div className="relative w-12 h-12 shrink-0">
                    <Image src={product.images[0]} alt="" fill className="rounded object-cover" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{currency} {displayPrice}</p>
                </div>
              </div>
              <div className="flex-1 md:flex-none w-full md:w-auto max-w-md ml-auto">
                {selectedVariant && (
                  <AddToCartButton
                    variantId={selectedVariant.id}
                    disabled={!displayInStock}
                    label={displayInStock ? `Add to Cart — ${currency} ${displayPrice}` : 'Out of Stock'}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
