# Session 6 — Design Tokens + Components (Parallel Track)

## Status: BACKLOG

## Dependencies
- None (can run alongside Sessions 2–5)

## Objective
Build ~20 shared UI components consuming design tokens only — no hardcoded values. Verify that swapping a token value visibly changes every component.

## Key Deliverables
- `packages/design-tokens`: spacing, typography, color, radius, shadow, motion tokens
- `packages/components`: ~20 components (Header, Footer, Hero, ProductCard, ProductGrid, CartDrawer, CheckoutSummary, Testimonials, Newsletter, FAQ, RichText, Gallery, Banner, etc.)
- Storybook or test-render page for visual verification
- Each component: prop schema, a11y check (axe-core), one snapshot test per variant
