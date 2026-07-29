# Session 11 — Storefront: Core Pages

## Status: BACKLOG

## Dependencies

- [x] Session 06a — Storefront Components (for ProductCard, ProductGrid, Header, Footer)
- [x] Session 08a — Page Layout Editor (for rendered sections)

## Objective

Build the storefront core pages — product listing, product detail, category navigation, search, and user account pages.

## Deliverables

- [x] Multi-tenant routing (resolve tenant from hostname at edge)
- [x] Homepage rendering from page layouts (fetch sections_json + component registry)
- [x] Product listing page with grid, filtering, sorting, pagination
- [x] Product detail page with variant selector, add-to-cart, gallery
- [x] Category navigation (sidebar or top nav)
- [x] Search page (basic keyword search)
- [x] User account pages (login, register, order history, profile)
- [x] SEO metadata (page titles, OG tags, JSON-LD structured data)
- [x] Responsive design for all pages

## Acceptance Criteria

- [x] Homepage renders from the published page layout
- [x] Product listing filters and paginates correctly
- [x] Product detail shows correct variant pricing
- [x] Add-to-cart adds item to cart (visible in drawer)
- [x] Search returns relevant products
- [x] All pages work on mobile, tablet, desktop
- [x] OG tags render correctly in social previews

## Files to Touch

- `apps/storefront/src/middleware.ts` — tenant resolution
- `apps/storefront/src/app/page.tsx` — homepage with section renderer
- `apps/storefront/src/app/products/` — listing and detail pages
- `apps/storefront/src/app/search/` — search page
- `apps/storefront/src/app/account/` — user account pages
- `apps/storefront/src/app/categories/[slug]/` — category pages
- `apps/storefront/src/components/` — page-specific components

## Notes

- Tenant resolution middleware looks up `hostname` against tenant domains
- Storefront uses Next.js App Router with RSC where possible
- SEO metadata should be server-rendered for crawlers
