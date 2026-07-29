# Epic — UI Component Creation

## Status: BACKLOG

## Dependencies

- [x] Base Repository Setup (completed)

## Objective

Build all foundational design system tokens, UI layout primitives, atomic components, and domain-specific e-commerce components to complete the Phase 1 Component Library.

## Deliverables

- [x] Define tokens in `packages/design-tokens` (Colors, Typography, Spacing, Radius, Shadows)
- [x] Implement `ThemeProvider` and `cn()` utility
- [x] Build Layout Primitives (Flex, Grid, Container)
- [x] Build Atoms (Button, TextInput, Toast, EmptyState)
- [x] Build E-Commerce Components (ProductCard, ProductGrid, LineItem, CartDrawer, CheckoutSummary)
- [x] Build Navigation (Header, Footer, Sidebar, StorefrontLayout, DashboardLayout)
- [x] Build Marketing Sections (Hero, RichText)
- [x] Build Advanced Components (Modal, DataTable, Form Renderer)
- [x] Register all in `packages/components/registry.ts`

## Acceptance Criteria

- [x] All components follow strict token usage (no hardcoded hex/px).
- [x] All components are keyboard accessible and have visible focus states.
- [x] `registry.ts` resolves all documented Phase 1 components.
- [x] Unit tests (prop -> render) written for all components.
- [x] Automated accessibility checks (axe-core) pass for all components.

## Files to Touch

- `packages/design-tokens/src/*`
- `packages/components/src/primitives/*`
- `packages/components/src/commerce/*`
- `packages/components/src/marketing/*`
- `packages/components/registry.ts`

## Notes

Extracted from UI Architecture Analysis. This is a massive epic and should likely be broken down into individual sessions as we pull them into the `next/` folder.
