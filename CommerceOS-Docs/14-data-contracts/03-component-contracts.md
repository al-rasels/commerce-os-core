# Phase 1 Component Contracts (SOURCE OF TRUTH)

Every component in the Phase 1 set (`05-experience-engine/02-component-library.md` §3), with its exact prop shape. Do not add props not listed here without updating this file first — a component with an undocumented prop is exactly the kind of drift this file exists to prevent.

## Shared Base Props (every component accepts these implicitly via the registry wrapper — do not redeclare per component)

```ts
interface BaseComponentProps {
  id: string;              // section instance id, injected by the renderer, not set by component author
  visible?: boolean;        // default true
}
```

## hero.v1

```ts
interface HeroProps {
  variant: 'modern' | 'luxury' | 'minimal' | 'editorial';
  heading: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: string;   // URL
  alignment?: 'left' | 'center' | 'right';  // default 'center'
}
```

## header.v1

```ts
interface HeaderProps {
  variant: 'minimal' | 'mega-menu' | 'sticky' | 'transparent';
  logoUrl: string;
  navItems: { label: string; href: string; children?: { label: string; href: string }[] }[];
  showSearch?: boolean;       // default true
  showCart?: boolean;         // default true
}
```

## footer.v1

```ts
interface FooterProps {
  columns: { title: string; links: { label: string; href: string }[] }[];
  socialLinks?: { platform: 'instagram' | 'facebook' | 'twitter' | 'tiktok'; href: string }[];
  copyrightText: string;
}
```

## product-card.v1

```ts
interface ProductCardProps {
  productId: string;
  name: string;
  priceCents: number;
  currency: string;
  imageUrl: string;
  variant?: 'default' | 'compact';
}
```

## product-grid.v1

```ts
interface ProductGridProps {
  source: 'featured' | 'category' | 'collection' | 'manual';
  sourceId?: string;          // required if source = 'category' | 'collection'
  productIds?: string[];      // required if source = 'manual'
  columns?: 2 | 3 | 4;         // default 4
  limit?: number;              // default 12
}
```

## cart-drawer.v1

```ts
interface CartDrawerProps {
  // no configurable props in Phase 1 — reads live cart state via useCartStore()
}
```

## checkout-summary.v1

```ts
interface CheckoutSummaryProps {
  showPromoCodeInput?: boolean;  // default true
}
```

## testimonials.v1

```ts
interface TestimonialsProps {
  variant: 'grid' | 'carousel';
  items: { quote: string; authorName: string; authorImage?: string; rating?: 1|2|3|4|5 }[];
}
```

## newsletter.v1

```ts
interface NewsletterProps {
  heading: string;
  subheading?: string;
  placeholderText?: string;   // default 'Enter your email'
}
```

## faq.v1

```ts
interface FaqProps {
  items: { question: string; answer: string }[];
}
```

## rich-text.v1

```ts
interface RichTextProps {
  content: string; // sanitized HTML from Tiptap output — never raw unsanitized user HTML
}
```

## gallery.v1

```ts
interface GalleryProps {
  variant: 'grid' | 'masonry' | 'carousel';
  images: { url: string; alt: string }[];
}
```

## banner.v1

```ts
interface BannerProps {
  imageUrl: string;
  heading?: string;
  ctaLabel?: string;
  ctaHref?: string;
}
```

## Component Registry Map (exact — used by the renderer to resolve `component` string in page JSON)

```ts
export type ComponentRegistryEntry = {
  component: any;
  minPlan?: 'starter' | 'pro' | 'enterprise'; // Monetization metadata
};

export const componentRegistry = {
  'hero.v1': { component: Hero },
  'header.v1': { component: Header },
  'footer.v1': { component: Footer },
  'product-card.v1': { component: ProductCard },
  'product-grid.v1': { component: ProductGrid },
  'cart-drawer.v1': { component: CartDrawer },
  'checkout-summary.v1': { component: CheckoutSummary },
  'testimonials.v1': { component: Testimonials },
  'newsletter.v1': { component: Newsletter },
  'faq.v1': { component: Faq },
  'rich-text.v1': { component: RichText },
  'gallery.v1': { component: Gallery, minPlan: 'pro' }, // Example premium component
  'banner.v1': { component: Banner },
} as const satisfies Record<string, ComponentRegistryEntry>;

export type ComponentRegistryKey = keyof typeof componentRegistry;
```

If a page JSON references a `component` key not in this map, the renderer must fail closed for that section only (skip + log), per `05-experience-engine/05-page-builder.md` §5 — never throw and break the whole page.
