# Phase 4 — Storefront Complete

## 4.1 Error Boundaries

Wrap each page section (header, product grid, cart, checkout, footer) in a React error boundary. Catch render errors, show section-level fallback UI, and report to Sentry.

**Implementation:**

```tsx
// components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component<
  { fallback?: ReactNode; section: string; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    Sentry.captureException(error, {
      tags: { section: this.props.section },
      extra: info,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <ErrorFallback
            section={this.props.section}
            onRetry={() => this.setState({ hasError: false })}
          />
        )
      );
    }
    return this.props.children;
  }
}
```

**Key files:**

| File                           | Purpose                                      |
| ------------------------------ | -------------------------------------------- |
| `components/ErrorBoundary.tsx` | Reusable boundary component                  |
| `components/ErrorFallback.tsx` | Section fallback UI with retry button        |
| `app/layout.tsx`               | Top-level error boundary wrapping entire app |
| `app/products/page.tsx`        | Per-section boundary around product grid     |
| `app/cart/page.tsx`            | Per-section boundary around cart             |
| `app/checkout/page.tsx`        | Per-section boundary around checkout         |

**Acceptance:**

- Component crash in one section does not break other sections
- Fallback shows "Something went wrong" + retry button
- Error event with section tag appears in Sentry dashboard
- `Sentry.init({ environment: process.env.NEXT_PUBLIC_VERCEL_ENV })` in root layout

---

## 4.2 Loading Skeletons

Shimmer-animated skeleton components matching real page dimensions. Configurable via props. Integrated with React Suspense for data-fetching boundaries.

```tsx
// components/Skeleton.tsx
export function Skeleton({
  className,
  variant = "rect",
  width,
  height,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200 rounded",
        variant === "circle" && "rounded-full",
        className,
      )}
      style={{ width, height }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-2 p-4">
      <Skeleton width="100%" height={200} />
      <Skeleton width="75%" height={20} />
      <Skeleton width="50%" height={20} />
      <Skeleton width="30%" height={24} />
    </div>
  );
}
```

**Key files:**

| File                                            | Purpose                                      |
| ----------------------------------------------- | -------------------------------------------- |
| `components/ui/Skeleton.tsx`                    | Base skeleton primitive (rect, circle, text) |
| `components/skeletons/ProductCardSkeleton.tsx`  | Product grid placeholder                     |
| `components/skeletons/CartItemSkeleton.tsx`     | Cart page placeholder                        |
| `components/skeletons/CheckoutSkeleton.tsx`     | Checkout form placeholder                    |
| `components/skeletons/OrderSummarySkeleton.tsx` | Order summary sidebar placeholder            |

**Acceptance:**

- Skeletons render immediately on page navigation (no flash of empty)
- Shimmer animation uses `@keyframes` or Tailwind `animate-pulse`
- All data-fetching Suspense boundaries have matching skeletons
- Skeleton dimensions match real component aspect ratios

---

## 4.3 Optimistic Cart

Instant UI update on add/remove/update with background sync. Rollback on API failure. Uses `@tanstack/react-query` `useMutation` with `onMutate` for optimistic update and `onError` for rollback.

```tsx
// hooks/useCart.ts
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: AddItemInput) => cartApi.addItem(item),
    onMutate: async (item) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previous = queryClient.getQueryData(["cart"]);
      queryClient.setQueryData(["cart"], (old: Cart) => ({
        ...old,
        items: [
          ...old.items,
          {
            ...item,
            id: `temp-${nanoid()}`,
            priceCents: item.priceCents,
            status: "pending",
          },
        ],
      }));
      return { previous };
    },
    onError: (_err, _item, context) => {
      queryClient.setQueryData(["cart"], context?.previous);
      toast.error("Failed to add item. Your cart is unchanged.");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
}
```

**Key files:**

| File                          | Purpose                                                                     |
| ----------------------------- | --------------------------------------------------------------------------- |
| `hooks/useCart.ts`            | `useQuery` for cart fetch + `useMutation` for mutations                     |
| `lib/api/cart.ts`             | API client functions (addItem, removeItem, updateQuantity)                  |
| `components/CartProvider.tsx` | React context wrapping cart state (optional, may use query client directly) |

**Acceptance:**

- Cart item appears immediately on add (no spinner)
- Cart count badge updates instantly in header
- Remove item disappears instantly
- Failure reverts UI to previous state + toast error
- Stale-while-revalidate: stale cart shown on page load while refetching
- `staleTime: 30_000, gcTime: 5 * 60 * 1000` in query config

---

## 4.4 SEO

Per-page metadata via `next/head`, JSON-LD structured data, auto-generated sitemap, and robots.txt.

```tsx
// components/SEOHead.tsx
export function ProductSEOHead({ product }: { product: ProductDetail }) {
  return (
    <>
      <title>{product.seoTitle ?? product.name} | Store</title>
      <meta
        name="description"
        content={product.seoDescription ?? product.description}
      />
      <meta property="og:title" content={product.name} />
      <meta property="og:description" content={product.description} />
      <meta property="og:image" content={product.images[0]?.url} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.images.map((i) => i.url),
            sku: product.sku,
            offers: {
              "@type": "Offer",
              price: product.price / 100,
              priceCurrency: "USD",
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />
    </>
  );
}
```

**Key files:**

| File                     | Purpose                                                       |
| ------------------------ | ------------------------------------------------------------- |
| `components/SEOHead.tsx` | Reusable per-page metadata injection                          |
| `lib/seo/json-ld.ts`     | JSON-LD builders (Product, Organization, BreadcrumbList, FAQ) |
| `app/sitemap.ts`         | Dynamic sitemap.xml generation                                |
| `public/robots.txt`      | Crawler directives                                            |
| `app/layout.tsx`         | Organization + BreadcrumbList JSON-LD in root layout          |

**Acceptance:**

- Every page has unique `<title>` and `<meta name="description">`
- Product page renders Product JSON-LD
- Root layout renders Organization JSON-LD
- Category/breadcrumb pages render BreadcrumbList JSON-LD
- `/sitemap.xml` returns valid XML with all product + category URLs
- `robots.txt` allows all crawlers, points to sitemap

---

## 4.5 Analytics

PostHog for product analytics. Page views, custom events, GDPR consent controls.

```tsx
// lib/analytics.ts
import { posthog } from "posthog-js";

export function initAnalytics() {
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
      persistence: "localStorage+cookie",
      loaded: (ph) => {
        if (process.env.NODE_ENV !== "production") ph.opt_out_capturing();
      },
    });
  }
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  posthog.capture(name, properties);
}

// Usage in components
trackEvent("add_to_cart", {
  product_id: product.id,
  variant_id: variant?.id,
  price_cents: price,
  currency: "USD",
});
trackEvent("purchase", {
  order_id: order.id,
  total_cents: order.totalCents,
  currency: "USD",
});
trackEvent("login", { method: "email" });
```

**Key files:**

| File                             | Purpose                                                 |
| -------------------------------- | ------------------------------------------------------- |
| `lib/analytics.ts`               | PostHog init + event helpers                            |
| `components/PostHogProvider.tsx` | Client-side PostHog provider (wraps app)                |
| `hooks/usePageView.ts`           | `usePathname` listener for automatic page view tracking |
| `components/GDPRBanner.tsx`      | Consent banner, sets `posthog.opt_in_capturing()`       |

**Acceptance:**

- Page view event fires on every route change
- `add_to_cart` event fires on add to cart with product_id, variant_id, price_cents
- `purchase` event fires on order confirmation with order_id, total_cents
- `login` event fires on authentication
- GDPR banner shown on first visit; opt-in before PostHog loads cookies
- Events visible in PostHog dashboard under configured project

---

## 4.6 Accessibility

WCAG 2.2 AA compliance: keyboard navigation, focus management, skip links, ARIA labels, color contrast, screen reader announcements.

```tsx
// components/SkipLink.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black"
    >
      Skip to main content
    </a>
  );
}

// components/LiveRegion.tsx — announces form errors to screen readers
export function LiveRegion({
  message,
  type = "polite",
}: {
  message: string;
  type?: "polite" | "assertive";
}) {
  return (
    <div role="status" aria-live={type} aria-atomic="true" className="sr-only">
      {message}
    </div>
  );
}
```

**Key files:**

| File                        | Purpose                                        |
| --------------------------- | ---------------------------------------------- |
| `components/SkipLink.tsx`   | Skip-to-content link (first focusable element) |
| `components/LiveRegion.tsx` | Screen reader announcements for errors/updates |
| `lib/a11y/focus-trap.ts`    | Focus trap utility for modals/drawers          |
| `lib/a11y/announce.ts`      | Imperative `aria-live` region push function    |

**Checklist:**

| Check          | Implementation                                                                  |
| -------------- | ------------------------------------------------------------------------------- |
| Skip link      | `SkipLink` at top of every page, target `#main-content`                         |
| Keyboard nav   | All interactive elements reachable via Tab                                      |
| Focus ring     | Visible `:focus-visible` outline on all interactive elements                    |
| Focus trap     | Modal/drawer traps focus, closes on Escape                                      |
| ARIA labels    | `aria-label` on icon buttons, `aria-describedby` on inputs                      |
| Color contrast | All text meets 4.5:1 (AA) ratio; tool checks with `@axe-core/react`             |
| Form errors    | `aria-invalid` on fields, `aria-describedby` linking to error message           |
| Screen reader  | Cart count has `aria-live="polite"`, dynamic updates announced via `LiveRegion` |

**Dev dependencies:** `@axe-core/react`, `eslint-plugin-jsx-a11y`

**Acceptance:**

- Tab navigates all controls in logical order
- Focus ring visible on keyboard navigation only (not on click)
- Skip link is first focusable element, jumps to main content
- All `<button>` without visible text have `aria-label`
- No WCAG 2.2 AA violations in axe DevTools report
- Cart toast / dynamic content announced by screen reader

---

## 4.7 PWA

Service worker with `next-pwa` (or manual Workbox config), `manifest.json`, offline fallback, install prompt.

**Config (`next.config.ts`):**

```typescript
import withPWA from "next-pwa";

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    { urlPattern: /\/api\/products/, handler: "StaleWhileRevalidate" },
    { urlPattern: /\/api\/categories/, handler: "StaleWhileRevalidate" },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 },
      },
    },
    {
      urlPattern: /\/_next\/static\//,
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets",
        expiration: { maxEntries: 100, maxAgeSeconds: 365 * 24 * 60 * 60 },
      },
    },
  ],
});
```

**Key files:**

| File                           | Purpose                                          |
| ------------------------------ | ------------------------------------------------ |
| `public/manifest.json`         | App name, icons, theme_color, display, start_url |
| `public/sw.js`                 | Generated by next-pwa (or manual Workbox)        |
| `components/InstallPrompt.tsx` | BeforeInstallPrompt event listener + CTA button  |
| `app/offline/page.tsx`         | Offline fallback page                            |
| `public/icons/`                | 48, 72, 96, 144, 192, 512px PNG icons            |

**Acceptance:**

- Lighthouse PWA badge passes (installable, service worker registered, HTTPS)
- `manifest.json` serves valid JSON with all required fields
- App can be installed via browser prompt on supported browsers (Chrome, Edge, Samsung)
- Offline navigation shows "You're offline" page with cached assets (logo, styles)
- API routes use StaleWhileRevalidate for product/category data
- Static assets (JS, CSS, images) cached on first load

---

## 4.8 i18n

next-intl for internationalization: locale detection, switcher, message files, RTL support.

**Project structure:**

```
messages/
├── en.json
├── es.json
├── fr.json
├── ar.json      # RTL
└── he.json      # RTL
```

**Config (`next.config.ts`):**

```typescript
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
export default withNextIntl({/* next config */});
```

**Middleware (`middleware.ts`):**

```typescript
import createMiddleware from "next-intl/middleware";
export default createMiddleware({
  locales: ["en", "es", "fr", "ar", "he"],
  defaultLocale: "en",
  localeDetection: true,
  localePrefix: "always",
});
export const config = { matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"] };
```

**Key files:**

| File                            | Purpose                                       |
| ------------------------------- | --------------------------------------------- |
| `middleware.ts`                 | Locale detection + redirect                   |
| `i18n/request.ts`               | Async message loader for `next-intl`          |
| `i18n/routing.ts`               | `routing` config shared across app            |
| `components/LocaleSwitcher.tsx` | Dropdown to switch locale, persists to cookie |
| `messages/en.json`              | English translations                          |
| `messages/ar.json`              | Arabic translations (RTL)                     |
| `app/[locale]/layout.tsx`       | `dir={rtl}` on `<html>` for Arabic/Hebrew     |

**Message file format:**

```json
{
  "cart": {
    "title": "Shopping Cart",
    "empty": "Your cart is empty",
    "checkout": "Proceed to Checkout",
    "total": "Total"
  },
  "product": {
    "addToCart": "Add to Cart",
    "outOfStock": "Out of Stock",
    "price": "Price"
  }
}
```

**Acceptance:**

- URL pattern: `/en/products`, `/ar/منتج/123`
- Locale auto-detected from `Accept-Language` header
- `LocaleSwitcher` changes language without page reload
- Arabic/Hebrew layout renders RTL (`direction: rtl`, `text-align: right`)
- All static text uses `useTranslations()` hook
- Date/number formatting uses `next-intl` `DateTimeFormat`, `NumberFormat`
- `not-found.tsx` renders translated 404 per locale
- Missing key fallback shows key name in dev, empty string in prod
