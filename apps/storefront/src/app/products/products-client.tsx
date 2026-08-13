"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ProductCard } from "@/components/product-card";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

type PricePreset = { key: string; label: string; min?: number; max?: number };

const PRICE_PRESETS: PricePreset[] = [
  { key: "under-50", label: "Under $50", max: 5000 },
  { key: "50-150", label: "$50 – $150", min: 5000, max: 15000 },
  { key: "150-300", label: "$150 – $300", min: 15000, max: 30000 },
  { key: "300-plus", label: "$300+", min: 30000 },
];

const parseNum = (value: string | null | undefined): number | null => {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
};

const dollars = (cents: number | null | undefined): string => {
  if (cents === null || cents === undefined) return "";
  return Math.round(cents / 100).toLocaleString("en-US");
};

function FilterSection({
  title,
  defaultOpen = true,
  forceOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  forceOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen || forceOpen);

  useEffect(() => {
    if (forceOpen) setOpen(true);
  }, [forceOpen]);

  const isOpen = open || forceOpen;

  return (
    <div className="border-b border-border/50 pb-6">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
          {title}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "" : "-rotate-90"}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type FilterPanelProps = {
  categories: any[];
  activeCategory: string | null;
  onCategoryClick: (slug: string | null) => void;
  facets: Record<string, Record<string, number>>;
  selectedAttributes: Record<string, string>;
  onAttributeToggle: (key: string, value: string) => void;
  brandOptions: string[];
  currentBrand: string | null;
  onBrand: (value: string | null) => void;
  brandQuery: string;
  onBrandQuery: (value: string) => void;
  priceDraft: { min: string; max: string };
  onPriceDraft: (draft: { min: string; max: string }) => void;
  onApplyPrice: () => void;
  onPricePreset: (preset: PricePreset) => void;
  activePresetKey: string | null;
  onClearAll: () => void;
  activeFilterCount: number;
};

function FilterPanel({
  categories,
  activeCategory,
  onCategoryClick,
  facets,
  selectedAttributes,
  onAttributeToggle,
  brandOptions,
  currentBrand,
  onBrand,
  brandQuery,
  onBrandQuery,
  priceDraft,
  onPriceDraft,
  onApplyPrice,
  onPricePreset,
  activePresetKey,
  onClearAll,
  activeFilterCount,
}: FilterPanelProps) {
  const dynamicFacets = Object.entries(facets).filter(([key]) => key !== "Brand");
  const filteredBrands = brandOptions.filter((b) =>
    b.toLowerCase().includes(brandQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <FilterSection title="Categories" forceOpen={activeCategory !== null}>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => onCategoryClick(null)}
              className={`text-sm flex items-center justify-between w-full transition-colors ${activeCategory === null ? "font-semibold text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              All Categories
              {activeCategory === null && <ChevronRight className="w-4 h-4" />}
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onCategoryClick(cat.slug)}
                className={`text-sm flex items-center justify-between w-full transition-colors ${activeCategory === cat.slug ? "font-semibold text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {cat.name}
                {activeCategory === cat.slug && <ChevronRight className="w-4 h-4" />}
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Price">
        <div className="flex flex-wrap gap-2 mb-4">
          {PRICE_PRESETS.map((preset) => (
            <button
              key={preset.key}
              onClick={() => onPricePreset(preset)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${activePresetKey === preset.key ? "bg-primary border-primary text-primary-foreground" : "border-border/50 text-muted-foreground hover:border-primary hover:text-foreground"}`}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center border border-border/50 rounded-md focus-within:border-primary transition-colors">
            <span className="pl-3 text-sm text-muted-foreground">$</span>
            <input
              type="number"
              min={0}
              inputMode="numeric"
              placeholder="Min"
              value={priceDraft.min}
              onChange={(e) => onPriceDraft({ ...priceDraft, min: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") onApplyPrice();
              }}
              className="w-full bg-transparent px-2 py-2 text-sm focus:outline-none"
            />
          </div>
          <span className="text-muted-foreground">–</span>
          <div className="flex-1 flex items-center border border-border/50 rounded-md focus-within:border-primary transition-colors">
            <span className="pl-3 text-sm text-muted-foreground">$</span>
            <input
              type="number"
              min={0}
              inputMode="numeric"
              placeholder="Max"
              value={priceDraft.max}
              onChange={(e) => onPriceDraft({ ...priceDraft, max: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") onApplyPrice();
              }}
              className="w-full bg-transparent px-2 py-2 text-sm focus:outline-none"
            />
          </div>
          <button
            onClick={onApplyPrice}
            disabled={!priceDraft.min && !priceDraft.max}
            className="px-3 py-2 text-sm rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none transition-opacity"
          >
            Apply
          </button>
        </div>
      </FilterSection>

      <FilterSection title="Brand" forceOpen={currentBrand !== null}>
        {brandOptions.length > 1 && (
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={brandQuery}
              onChange={(e) => onBrandQuery(e.target.value)}
              placeholder="Search brands"
              className="w-full pl-9 pr-3 py-2 text-sm bg-muted/50 border border-border/50 rounded-md focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        )}
        <ul className="max-h-56 overflow-y-auto space-y-1 pr-1">
          {filteredBrands.map((b) => (
            <li key={b}>
              <button
                onClick={() => onBrand(currentBrand === b ? null : b)}
                className={`flex items-center justify-between w-full px-2 py-1.5 rounded-md text-sm transition-colors ${currentBrand === b ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}
              >
                <span>{b}</span>
                {currentBrand === b && <Check className="w-4 h-4" />}
              </button>
            </li>
          ))}
          {filteredBrands.length === 0 && (
            <li className="text-sm text-muted-foreground px-2 py-1.5">No brands match</li>
          )}
        </ul>
      </FilterSection>

      {dynamicFacets.map(([facetKey, values]) => (
        <FilterSection key={facetKey} title={facetKey} forceOpen={!!selectedAttributes[facetKey]}>
          <ul className="space-y-3">
            {Object.entries(values).map(([val, count]) => {
              const isSelected = selectedAttributes[facetKey] === val;
              return (
                <li key={val}>
                  <button
                    onClick={() => onAttributeToggle(facetKey, val)}
                    className="flex items-center justify-between w-full text-sm group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${isSelected ? "bg-primary border-primary text-primary-foreground" : "border-border group-hover:border-primary"}`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <span className={isSelected ? "font-medium text-foreground" : "text-muted-foreground group-hover:text-foreground"}>
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
        </FilterSection>
      ))}

      {activeFilterCount > 0 && (
        <button
          onClick={onClearAll}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-sm rounded-md border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
        >
          <X className="w-4 h-4" />
          Clear all filters ({activeFilterCount})
        </button>
      )}
    </div>
  );
}

export function ProductsClient({
  products,
  facets = {},
  categories,
  total = 0,
  page = 1,
  limit = 24,
}: {
  products: any[];
  facets?: Record<string, Record<string, number>>;
  categories: any[];
  initialCategory?: string | null;
  initialAttributes?: Record<string, string>;
  total?: number;
  page?: number;
  limit?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [brandQuery, setBrandQuery] = useState("");
  const [priceDraft, setPriceDraft] = useState({
    min: searchParams.get("min_price") ?? "",
    max: searchParams.get("max_price") ?? "",
  });

  const activeCategory = searchParams.get("category");
  const currentSort = searchParams.get("sort") || "featured";
  const currentBrand = searchParams.get("brand");
  const currentMin = parseNum(searchParams.get("min_price"));
  const currentMax = parseNum(searchParams.get("max_price"));

  const selectedAttributes = useMemo<Record<string, string>>(() => {
    const raw = searchParams.get("attributes");
    if (!raw) return {};
    try {
      const parsed = JSON.parse(raw) as Record<string, string>;
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }, [searchParams]);

  const closeFilters = () => setMobileFiltersOpen(false);

  useEffect(() => {
    if (mobileFiltersOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [mobileFiltersOpen]);

  useEffect(() => {
    setPriceDraft({
      min: searchParams.get("min_price") ?? "",
      max: searchParams.get("max_price") ?? "",
    });
  }, [searchParams]);

  const pushParams = (updater: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    updater(params);
    params.delete("page");
    closeFilters();
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategory = (slug: string | null) => {
    pushParams((params) => {
      if (slug) params.set("category", slug);
      else params.delete("category");
    });
  };

  const handleBrand = (value: string | null) => {
    setBrandQuery("");
    pushParams((params) => {
      if (value) params.set("brand", value);
      else params.delete("brand");
    });
  };

  const handleAttributeToggle = (key: string, value: string) => {
    const next = { ...selectedAttributes };
    if (next[key] === value) delete next[key];
    else next[key] = value;
    pushParams((params) => {
      if (Object.keys(next).length > 0) params.set("attributes", JSON.stringify(next));
      else params.delete("attributes");
    });
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const sort = e.target.value;
    if (sort && sort !== "featured") params.set("sort", sort);
    else params.delete("sort");
    router.push(`${pathname}?${params.toString()}`);
  };

  const applyPriceRange = (min: number | null, max: number | null) => {
    pushParams((params) => {
      if (min !== null && min > 0) params.set("min_price", String(min));
      else params.delete("min_price");
      if (max !== null && max > 0) params.set("max_price", String(max));
      else params.delete("max_price");
    });
  };

  const applyPrice = () => {
    const min = parseNum(priceDraft.min);
    const max = parseNum(priceDraft.max);
    if (min === null && max === null) return;
    applyPriceRange(min, max);
  };

  const handlePricePreset = (preset: PricePreset) => {
    setPriceDraft({
      min: preset.min ? String(preset.min) : "",
      max: preset.max ? String(preset.max) : "",
    });
    applyPriceRange(preset.min ?? null, preset.max ?? null);
  };

  const removePrice = () => {
    setPriceDraft({ min: "", max: "" });
    pushParams((params) => {
      params.delete("min_price");
      params.delete("max_price");
    });
  };

  const clearAll = () => {
    setBrandQuery("");
    setPriceDraft({ min: "", max: "" });
    closeFilters();
    router.push(pathname);
  };

  const totalPages = Math.max(Math.ceil(total / limit), 1);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    if (newPage > 1) params.set("page", String(newPage));
    else params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const filteredProducts = [...products].sort((a, b) => {
    if (currentSort === "price_asc") {
      return (a.variants?.[0]?.price_cents || 0) - (b.variants?.[0]?.price_cents || 0);
    } else if (currentSort === "price_desc") {
      return (b.variants?.[0]?.price_cents || 0) - (a.variants?.[0]?.price_cents || 0);
    } else if (currentSort === "newest") {
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    }
    return 0;
  });

  const activePreset = useMemo(
    () => PRICE_PRESETS.find((p) => (p.min ?? null) === currentMin && (p.max ?? null) === currentMax) ?? null,
    [currentMin, currentMax],
  );

  const brandOptions = useMemo(() => {
    const counts = facets.Brand ?? {};
    return Object.keys(counts).sort();
  }, [facets]);

  const activeFilterCount =
    (activeCategory ? 1 : 0) +
    Object.keys(selectedAttributes).length +
    (currentBrand ? 1 : 0) +
    (currentMin !== null || currentMax !== null ? 1 : 0);

  const priceChipLabel = () => {
    if (activePreset) return activePreset.label;
    if (currentMin !== null && currentMax !== null) return `$${dollars(currentMin)} – $${dollars(currentMax)}`;
    if (currentMin !== null) return `$${dollars(currentMin)}+`;
    if (currentMax !== null) return `Under $${dollars(currentMax)}`;
    return "";
  };

  const chips: { key: string; label: string; onRemove: () => void }[] = [];
  if (activeCategory) {
    const cat = categories.find((c) => c.slug === activeCategory);
    chips.push({
      key: "category",
      label: cat ? cat.name : activeCategory,
      onRemove: () => handleCategory(null),
    });
  }
  Object.entries(selectedAttributes).forEach(([k, v]) => {
    chips.push({ key: `attr-${k}-${v}`, label: `${k}: ${v}`, onRemove: () => handleAttributeToggle(k, v) });
  });
  if (currentBrand) {
    chips.push({ key: "brand", label: currentBrand, onRemove: () => handleBrand(null) });
  }
  if (currentMin !== null || currentMax !== null) {
    chips.push({ key: "price", label: priceChipLabel(), onRemove: removePrice });
  }

  const filterKey = [
    activeCategory ?? "",
    JSON.stringify(selectedAttributes),
    currentBrand ?? "",
    currentMin ?? "",
    currentMax ?? "",
  ].join("|");

  const resultStart = total > 0 ? (page - 1) * limit + (products.length > 0 ? 1 : 0) : 0;
  const resultEnd = total > 0 ? Math.min((page - 1) * limit + products.length, total) : 0;
  const resultText = total > 0 ? `Showing ${resultStart}–${resultEnd} of ${total} products` : "No products";

  const pageItems = (): (number | "…")[] => {
    const items: (number | "…")[] = [];
    const total = totalPages;
    const current = page;
    if (total <= 7) {
      for (let i = 1; i <= total; i++) items.push(i);
      return items;
    }
    items.push(1);
    if (current > 3) items.push("…");
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) items.push(i);
    if (current < total - 2) items.push("…");
    items.push(total);
    return items;
  };

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

  const filterPanelProps: FilterPanelProps = {
    categories,
    activeCategory,
    onCategoryClick: handleCategory,
    facets,
    selectedAttributes,
    onAttributeToggle: handleAttributeToggle,
    brandOptions,
    currentBrand,
    onBrand: handleBrand,
    brandQuery,
    onBrandQuery: setBrandQuery,
    priceDraft,
    onPriceDraft: setPriceDraft,
    onApplyPrice: applyPrice,
    onPricePreset: handlePricePreset,
    activePresetKey: activePreset?.key ?? null,
    onClearAll: clearAll,
    activeFilterCount,
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
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 -mr-2">
              <div className="flex items-center gap-2 mb-6 font-semibold text-lg pb-4 border-b border-border/50">
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="ml-auto text-xs font-medium bg-primary/10 text-primary rounded-full px-2 py-0.5">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <FilterPanel {...filterPanelProps} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Sticky toolbar */}
            <div className="sticky top-24 z-30 -mx-6 px-6 bg-background/90 backdrop-blur-sm border-b border-border/50">
              <div className="flex flex-wrap items-center gap-3 py-4">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 py-2 px-3 text-sm font-medium rounded-md border border-border/50 text-foreground hover:border-primary transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="text-xs font-medium bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <span className="hidden md:block text-sm text-muted-foreground">{resultText}</span>

                {chips.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 order-last md:order-none w-full md:w-auto">
                    {chips.map((chip) => (
                      <span
                        key={chip.key}
                        className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 text-xs rounded-full bg-muted border border-border/50"
                      >
                        {chip.label}
                        <button
                          onClick={chip.onRemove}
                          className="p-0.5 rounded-full hover:bg-border/60 transition-colors"
                          aria-label={`Remove ${chip.label} filter`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="ml-auto flex items-center gap-4">
                  <div className="hidden sm:flex border border-border/50 rounded-md overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 transition-colors ${viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50"}`}
                      aria-label="Grid view"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 border-l border-border/50 transition-colors ${viewMode === "list" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50"}`}
                      aria-label="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  <select
                    value={currentSort}
                    onChange={handleSortChange}
                    className="bg-transparent border border-border/50 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="featured">Featured</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 mt-8 bg-muted/20 rounded-2xl border border-dashed border-border/50">
                <p className="text-muted-foreground text-lg mb-4">No products found for this category or filter.</p>
                <button onClick={clearAll} className="text-primary font-medium hover:underline">
                  Clear filters
                </button>
              </div>
            ) : (
              <motion.div
                key={filterKey}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mt-8" : "flex flex-col gap-6 mt-8"}
              >
                {filteredProducts.map((product: any) => (
                  <motion.div key={product.id} variants={itemVariants} className={viewMode === "grid" ? "h-full" : ""}>
                    <ProductCard product={product} variant={viewMode === "grid" ? "default" : "compact"} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {totalPages > 1 && total > 0 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                  className="p-2 text-sm rounded-lg border border-border/50 hover:border-primary disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {pageItems().map((item, idx) =>
                  item === "…" ? (
                    <span key={`e-${idx}`} className="px-2 text-sm text-muted-foreground">
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => handlePageChange(item)}
                      className={`w-9 h-9 text-sm rounded-lg border transition-colors ${item === page ? "bg-primary border-primary text-primary-foreground" : "border-border/50 text-muted-foreground hover:border-primary hover:text-foreground"}`}
                      aria-label={`Page ${item}`}
                    >
                      {item}
                    </button>
                  ),
                )}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages}
                  className="p-2 text-sm rounded-lg border border-border/50 hover:border-primary disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFilters}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-[70] w-80 max-w-[85vw] bg-background shadow-2xl overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm flex items-center justify-between px-6 py-4 border-b border-border/50">
                <div className="flex items-center gap-2 font-semibold text-lg">
                  <SlidersHorizontal className="w-5 h-5" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-2 py-0.5">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={closeFilters}
                  className="p-2 rounded-full hover:bg-muted/70 transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 py-6">
                <FilterPanel {...filterPanelProps} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
