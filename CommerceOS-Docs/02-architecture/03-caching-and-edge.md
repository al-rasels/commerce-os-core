# Caching & Edge Performance Strategy

Speed is the primary competitive advantage for modern storefronts. CommerceOS utilizes a strict Edge computing and caching strategy to guarantee sub-100ms Time-To-First-Byte (TTFB) globally.

## 1. Incremental Static Regeneration (ISR)

Storefront product pages and category pages are **never** rendered on every request.
- The Next.js storefront uses ISR.
- When a visitor requests a product page, the Edge CDN serves a cached HTML snapshot.
- If the snapshot is older than the `revalidate` window (e.g., 60 seconds), the CDN serves the stale content but triggers a background regeneration of the page.
- This pattern ensures the store is always blazingly fast, even during massive traffic spikes (flash sales).

## 2. Stale-While-Revalidate (SWR) for Dynamic State

Certain data cannot be statically generated: Cart state, Checkout flow, and exact real-time Inventory stock.
- This data is fetched client-side.
- We use the `stale-while-revalidate` (SWR) pattern via React Query or SWR hooks.
- The user instantly sees their cached cart state from `localStorage` while a background request validates the stock with the Commerce API.

## 3. CDN & Media Strategy

- All product images and brand assets uploaded by tenants are stored in an S3-compatible Object Storage bucket.
- These assets are served exclusively through an Image Optimization CDN (e.g., Cloudflare Images or Next.js Image Optimization API).
- URLs for assets are tenant-prefixed (`cdn.commerceos.com/tenant-{id}/assets/logo.png`) to ensure strict isolation.

## 4. API Rate Limiting

To protect the core database cluster from DoS attacks and runaway App Webhooks:
- The API Gateway implements strict Rate Limiting via Redis.
- Limits are scoped by `tenant_id` and `client_ip` (for unauthenticated storefront traffic) or `app_id` (for third-party apps).
