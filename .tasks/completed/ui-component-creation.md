# Epic — UI Component Creation

## Status: BACKLOG

## Dependencies
- [ ] Base Repository Setup (completed)

## Objective
Build all foundational design system tokens, UI layout primitives, atomic components, and domain-specific e-commerce components to complete the Phase 1 Component Library.

## Deliverables
- [ ] Define tokens in `packages/design-tokens` (Colors, Typography, Spacing, Radius, Shadows)
- [ ] Implement `ThemeProvider` and `cn()` utility
- [ ] Build Layout Primitives (Flex, Grid, Container)
- [ ] Build Atoms (Button, TextInput, Toast, EmptyState)
- [ ] Build E-Commerce Components (ProductCard, ProductGrid, LineItem, CartDrawer, CheckoutSummary)
- [ ] Build Navigation (Header, Footer, Sidebar, StorefrontLayout, DashboardLayout)
- [ ] Build Marketing Sections (Hero, RichText)
- [ ] Build Advanced Components (Modal, DataTable, Form Renderer)
- [ ] Register all in `packages/components/registry.ts`

## Acceptance Criteria
- [ ] All components follow strict token usage (no hardcoded hex/px).
- [ ] All components are keyboard accessible and have visible focus states.
- [ ] `registry.ts` resolves all documented Phase 1 components.
- [ ] Unit tests (prop -> render) written for all components.
- [ ] Automated accessibility checks (axe-core) pass for all components.

## Files to Touch
- `packages/design-tokens/src/*`
- `packages/components/src/primitives/*`
- `packages/components/src/commerce/*`
- `packages/components/src/marketing/*`
- `packages/components/registry.ts`

## Notes
Extracted from UI Architecture Analysis. This is a massive epic and should likely be broken down into individual sessions as we pull them into the `next/` folder.
