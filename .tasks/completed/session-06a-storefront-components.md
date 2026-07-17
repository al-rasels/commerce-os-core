# Session 06a — Storefront Components Library

## Status: BACKLOG

## Dependencies
- [x] `packages/design-tokens` created
- [x] `packages/components` scaffold exists

## Objective
Build ~20 shared UI components consuming design tokens only — verify that swapping a token value visibly changes every component.

## Deliverables
- [ ] Header (logo, nav links, cart icon, mobile hamburger)
- [ ] Footer (links, copyright, newsletter signup)
- [ ] Hero (4 variants: default, split, centered, video)
- [ ] ProductCard (image, title, price, add-to-cart)
- [ ] ProductGrid (responsive grid of ProductCards)
- [ ] CartDrawer (slide-over with line items, totals, checkout CTA)
- [ ] CheckoutSummary (order summary sidebar)
- [ ] Testimonials (carousel or grid)
- [ ] Newsletter (email input + submit)
- [ ] FAQ (accordion)
- [ ] RichText (rendered HTML content)
- [ ] Gallery (image grid/lightbox)
- [ ] Banner (announcement bar)
- [ ] Modal (generic overlay)
- [ ] DataTable (sortable, filterable table for admin)
- [ ] Form Renderer (schema-driven form)
- [ ] EmptyState (icon + message + CTA)
- [ ] Toast (notification toast)
- [ ] Skeleton (loading placeholders)
- [ ] Button, Input, Select, Textarea atoms

## Acceptance Criteria
- [ ] All components render in isolation
- [ ] Swapping a token value visibly changes every component without code edits
- [ ] a11y checks pass (keyboard nav, focus states, aria labels)
- [ ] Components are tree-shakeable

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
