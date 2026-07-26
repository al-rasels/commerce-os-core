# CommerceOS — Comprehensive UI/UX Audit Report

**Audit Date:** 2026-07-26
**Scope:** Storefront (Next.js 16), Admin Dashboard (React 19 + Vite 8), Shared Packages

---

## Executive Summary

The application suffers from a **fractured visual identity** — the storefront and admin dashboard look like two completely different products. The storefront uses shadcn defaults (neutral grayscale) while the admin uses a custom dark theme with glassmorphism. Neither fully leverages the existing `@commerceos/design-tokens` package. The UI is functional but lacks the polish, micro-interactions, and cohesive design language expected of a premium enterprise SaaS product.

**Overall design maturity score: 4/10** — Functional but inconsistent, lacks personality, accessibility gaps, no cohesive design system.

---

## P0 — Critical Issues (Must Fix)

### P0.1 — Admin Dashboard uses `order.total_cents` instead of `order.total`
- **File:** `apps/admin/src/pages/DashboardPage.tsx` line 133
- **Issue:** The OrderService DTO transforms `total_cents` to `total`. The dashboard references `order.total_cents` which returns `undefined` at runtime.
- **Fix:** Change to `order.total`

### P0.2 — Storefront uses shadcn defaults, not the design system tokens
- **Files:** `apps/storefront/src/app/globals.css`
- **Issue:** CSS variables are shadcn defaults in oklch format. The `@commerceos/design-tokens` package is completely unused at the app level.
- **Fix:** Generate CSS variables from the design-tokens package.

### P0.3 — No mobile navigation in storefront header
- **File:** `apps/storefront/src/app/layout.tsx`
- **Issue:** The header hides nav links on mobile (`hidden md:flex`) with no hamburger menu fallback. Mobile users have no navigation.

### P0.4 — Admin and storefront use completely different visual languages
- **Issue:** Storefront = light-mode grayscale. Admin = dark-mode glassmorphism. No brand continuity.
- **Fix:** Create a unified design system foundation that both apps inherit.

### P0.5 — Demo/mock data on admin dashboard chart
- **File:** `apps/admin/src/pages/DashboardPage.tsx` lines 46-54
- **Issue:** Revenue chart uses hardcoded mock data instead of API data.

---

## P1 — High Priority Improvements

### P1.1 — Color System Overhaul
- Current colors are flat grayscale with no brand personality
- No accent color usage in storefront
- Admin uses different HSL values than storefront's oklch
- **Fix:** Define a premium color palette with proper light/dark semantic mapping

### P1.2 — Typography System
- Storefront: Geist (Vercel font)
- Admin: Inter  
- Design tokens specify: Inter
- **Fix:** Unify on one font family, define proper hierarchy

### P1.3 — Shadow & Elevation System
- Storefront uses minimal shadows
- Admin uses glassmorphism that doesn't translate to light mode
- **Fix:** Define a consistent elevation system (card shadows, dropdown shadows, modal overlays)

### P1.4 — Spacing System
- Storefront uses Tailwind defaults inconsistently
- Some pages use `px-6`, others use `px-4`
- **Fix:** Standardize page padding, card padding, section spacing

### P1.5 — Empty States
- Product listing, cart, orders, search all lack proper empty states
- Some have basic text messages, others just show nothing
- **Fix:** Design consistent empty state component with icons, messaging, CTAs

### P1.6 — Loading States
- Some pages have skeleton loaders, most don't
- Inconsistent loading patterns
- **Fix:** Add proper loading.tsx files to all page segments

### P1.7 — Error Boundaries
- No error.tsx files exist in storefront
- No error boundaries around components
- **Fix:** Add error boundaries at every route segment

---

## P2 — Medium Priority Improvements

### P2.1 — Micro-interactions & Animations
- framer-motion installed but barely used
- No hover/active state transitions on cards
- No page transition animations
- **Fix:** Add subtle micro-interactions throughout

### P2.2 — Search Autocomplete UX
- Missing keyboard navigation (arrow keys, ESC, enter)
- Missing aria attributes (combobox, listbox, option)
- No search result highlighting
- **Fix:** Full keyboard + a11y overhaul

### P2.3 — Product Card States
- No hover state beyond basic opacity
- No "out of stock" visual indicator
- No quick-add interaction
- **Fix:** Rich hover states with product actions

### P2.4 — Form Design
- Admin uses raw FormData (no react-hook-form/Zod despite packages being installed)
- No inline validation
- No success/error animations
- **Fix:** Upgrade to react-hook-form with Zod validation + animated feedback

### P2.5 — Button Component
- No loading spinner variant
- No icon-only variant
- Inconsistent sizing across apps
- **Fix:** Comprehensive button variant system

### P2.6 — Responsive Admin Layout
- Sidebar collapses awkwardly on smaller screens
- Tables don't horizontally scroll properly
- **Fix:** Responsive admin layout with collapsible sidebar + scrollable tables

---

## P3 — Polish & Enhancement

### P3.1 — Focus Ring System
- Inconsistent focus indicators across interactive elements
- **Fix:** Consistent focus ring design system

### P3.2 — Toast/Notification System
- sonner is installed but barely used
- No success animations on mutations
- **Fix:** Consistent notification patterns

### P3.3 — Page Transitions
- No route transition animations
- **Fix:** Add page transition wrappers

### P3.4 — Skeleton Loading System
- Inconsistent skeleton shapes and colors
- **Fix:** Design system skeleton patterns

### P3.5 — Dark Mode Consistency
- Storefront dark mode variables are basic
- Admin is dark-only
- **Fix:** Full dark mode design across both apps

### P3.6 — SEO & Meta Tags
- Basic title/description only
- No OG images, no Twitter cards, no structured data beyond product pages
- **Fix:** Comprehensive SEO component

---

## Implementation Roadmap

```
Sprint 1 (Current): P0 fixes — Dashboard data bug, mobile nav, design token foundation
Sprint 2:          P1 — Color system, typography, shadows, spacing, empty/loading states
Sprint 3:          P2 — Animations, search UX, product cards, forms, buttons, responsive
Sprint 4:          P3 — Focus rings, toasts, skeletons, dark mode, SEO, page transitions
```
