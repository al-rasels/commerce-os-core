# Session 06a — Storefront Components Library

## Status: BACKLOG

## Dependencies

- [x] `packages/design-tokens` created
- [x] `packages/components` scaffold exists

## Objective

Build ~20 shared UI components consuming design tokens only — verify that swapping a token value visibly changes every component.

## Deliverables

- [x] Header (logo, nav links, cart icon, mobile hamburger)
- [x] Footer (links, copyright, newsletter signup)
- [x] Hero (4 variants: default, split, centered, video)
- [x] ProductCard (image, title, price, add-to-cart)
- [x] ProductGrid (responsive grid of ProductCards)
- [x] CartDrawer (slide-over with line items, totals, checkout CTA)
- [x] CheckoutSummary (order summary sidebar)
- [x] Testimonials (carousel or grid)
- [x] Newsletter (email input + submit)
- [x] FAQ (accordion)
- [x] RichText (rendered HTML content)
- [x] Gallery (image grid/lightbox)
- [x] Banner (announcement bar)
- [x] Modal (generic overlay)
- [x] DataTable (sortable, filterable table for admin)
- [x] Form Renderer (schema-driven form)
- [x] EmptyState (icon + message + CTA)
- [x] Toast (notification toast)
- [x] Skeleton (loading placeholders)
- [x] Button, Input, Select, Textarea atoms

## Acceptance Criteria

- [x] All components render in isolation
- [x] Swapping a token value visibly changes every component without code edits
- [x] a11y checks pass (keyboard nav, focus states, aria labels)
- [x] Components are tree-shakeable

## Files to Touch

- `packages/components/src/primitives/` — atoms (Button, Input, etc.)
- `packages/components/src/commerce/` — ProductCard, CartDrawer, etc.
- `packages/components/src/marketing/` — Hero, Testimonials, FAQ, etc.
- `packages/components/src/layout/` — Header, Footer, Grid, Container
- `packages/components/registry.ts` — register all components

## Notes

- Use `cn()` utility for className merging
- Every component accepts `className` prop for customization
- Test render page can live in `apps/storefront/src/app/_dev/components.tsx`
