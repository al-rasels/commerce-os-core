# Session 11 — Storefront: Core Pages

## Status: BACKLOG

## Dependencies
- [ ] Session 06a — Storefront Components (for ProductCard, ProductGrid, Header, Footer)
- [ ] Session 08a — Page Layout Editor (for rendered sections)

## Objective
Build the storefront core pages — product listing, product detail, category navigation, search, and user account pages.

## Deliverables
- [ ] Multi-tenant routing (resolve tenant from hostname at edge)
- [ ] Homepage rendering from page layouts (fetch sections_json + component registry)
- [ ] Product listing page with grid, filtering, sorting, pagination
- [ ] Product detail page with variant selector, add-to-cart, gallery
- [ ] Category navigation (sidebar or top nav)
- [ ] Search page (basic keyword search)
- [ ] User account pages (login, register, order history, profile)
- [ ] SEO metadata (page titles, OG tags, JSON-LD structured data)
- [ ] Responsive design for all pages

## Acceptance Criteria
- [ ] Homepage renders from the published page layout
- [ ] Product listing filters and paginates correctly
- [ ] Product detail shows correct variant pricing
- [ ] Add-to-cart adds item to cart (visible in drawer)
- [ ] Search returns relevant products
- [ ] All pages work on mobile, tablet, desktop
- [ ] OG tags render correctly in social previews

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
