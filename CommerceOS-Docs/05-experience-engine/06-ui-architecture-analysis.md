# UI Architecture Analysis & Component Catalog: CommerceOS

This document provides a comprehensive analysis of the reusable UI components, layouts, patterns, utilities, and design-system primitives across the CommerceOS platform (both Storefront and Admin dashboard). It is designed to act as a foundational blueprint for maintaining scalability, consistency, accessibility, and code reuse.

---

## 1. Design System Foundations

These foundational tokens should be defined in `packages/design-tokens` and mapped to CSS variables to ensure the platform is configurable per tenant without hardcoded values.

### Colors
- **Semantic Tokens:** `primary`, `secondary`, `accent`, `surface`, `background`, `text-primary`, `text-secondary`, `text-inverse`
- **Feedback Tokens:** `success`, `warning`, `danger`, `info`
- **Action Tokens:** `border-default`, `border-focus`, `border-hover`, `ring-focus`
- **Guidelines:** Contrast ratio > 4.5:1. Never use raw hex values in components.

### Typography
- **Scales:** `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`
- **Font Families:** `font-heading`, `font-body`, `font-mono`
- **Weights:** `regular`, `medium`, `semibold`, `bold`

### Spacing
- **8-Point Scale:** `4`, `8`, `12`, `16`, `24`, `32`, `48`, `64`, `96`

### Radius & Shadows
- **Radius:** `none`, `sm`, `md`, `lg`, `full`
- **Shadows (Elevation):** `none`, `sm`, `md`, `lg`, `xl`, `inner`

### Breakpoints & Grid
- **Breakpoints:** `sm (640)`, `md (768)`, `lg (1024)`, `xl (1280)`, `2xl (1536)`
- **Grid:** 12-column responsive layout engine with configurable gaps.

### Motion & Animation
- **Durations:** `fast (150ms)`, `base (250ms)`, `slow (400ms)`
- **Easings:** `ease-in`, `ease-out`, `ease-in-out`
- **Accessibility:** Must respect `prefers-reduced-motion`

---

## 2. Reusable Component Catalog

> [!NOTE]
> Every component below is assumed to be keyboard-accessible, respect theme tokens, and support a `visible` prop (per base component contracts).

### Layout Components

**Flex**
- **Category:** Layout Components
- **Purpose:** Primitive for one-dimensional layouts.
- **Description:** A flexible container supporting direction, gap, alignment, and wrapping.
- **Reusability Score:** 10/10
- **Priority:** High | **Complexity:** Low
- **Required Props:** `children`
- **Optional Props:** `direction`, `align`, `justify`, `wrap`, `gap`
- **Variants:** None (strictly structural)
- **Responsive Behavior:** Override direction or gap per breakpoint.
- **Pages Where Used:** All pages

**Grid**
- **Category:** Layout Components
- **Purpose:** Primitive for two-dimensional layouts.
- **Description:** 12-column grid container.
- **Reusability Score:** 10/10
- **Priority:** High | **Complexity:** Low
- **Required Props:** `children`
- **Optional Props:** `columns`, `gap`, `rows`
- **Pages Where Used:** Product Grid, Dashboard layout, Form layouts.

**Container**
- **Category:** Layout Components
- **Purpose:** Constrain content width.
- **Optional Props:** `maxWidth` (sm, md, lg, xl, full), `padding`

### Navigation Components

**Header (`header.v1`)**
- **Category:** Navigation Components
- **Purpose:** Main site navigation.
- **Reusability Score:** 9/10
- **Priority:** High | **Complexity:** High
- **Required Props:** `variant`, `logoUrl`, `navItems`
- **Optional Props:** `showSearch`, `showCart`
- **Variants:** `minimal`, `mega-menu`, `sticky`, `transparent`
- **States:** Default, Scrolled (sticky)
- **Pages Where Used:** Storefront global

**Footer (`footer.v1`)**
- **Category:** Navigation Components
- **Purpose:** Site footer with links and newsletter.
- **Reusability Score:** 9/10
- **Priority:** High | **Complexity:** Medium
- **Required Props:** `columns`, `copyrightText`
- **Optional Props:** `socialLinks`
- **Pages Where Used:** Storefront global

**Sidebar (Admin)**
- **Category:** Navigation Components
- **Purpose:** Dashboard navigation for merchants.
- **Reusability Score:** 7/10
- **Variants:** Expanded, Collapsed, Mobile Drawer.
- **Pages Where Used:** Admin Dashboard

### Buttons & Inputs

**Button**
- **Category:** Buttons
- **Purpose:** Trigger actions.
- **Reusability Score:** 10/10
- **Priority:** High | **Complexity:** Medium
- **Optional Props:** `variant`, `size`, `isLoading`, `leftIcon`, `rightIcon`, `disabled`
- **Variants:** `primary`, `secondary`, `outline`, `ghost`, `danger`
- **States:** Default, hover, active, disabled, loading, focused (visible ring)

**TextInput**
- **Category:** Inputs
- **Purpose:** Capture text data.
- **Reusability Score:** 10/10
- **Priority:** High | **Complexity:** Medium
- **Optional Props:** `label`, `error`, `helpText`, `placeholder`, `type`
- **States:** Default, focused, disabled, error, filled.

### E-Commerce Components

**ProductCard (`product-card.v1`)**
- **Category:** E-commerce
- **Purpose:** Display a single product snippet.
- **Reusability Score:** 9/10
- **Priority:** High | **Complexity:** Medium
- **Required Props:** `productId`, `name`, `priceCents`, `currency`, `imageUrl`
- **Optional Props:** `variant` ('default' | 'compact')
- **Events:** `onClick`, `onAddToCart`
- **Pages Where Used:** PLP, Homepage, Related Products.

**ProductGrid (`product-grid.v1`)**
- **Category:** E-commerce
- **Purpose:** Display a list/grid of products.
- **Reusability Score:** 9/10
- **Priority:** High | **Complexity:** Medium
- **Required Props:** `source`
- **Optional Props:** `sourceId`, `productIds`, `columns`, `limit`
- **Pages Where Used:** Category pages, Homepage.

**CartDrawer (`cart-drawer.v1`)**
- **Category:** E-commerce / Drawers
- **Purpose:** Slide-out cart overview.
- **Reusability Score:** 8/10
- **Priority:** High | **Complexity:** High
- **Dependencies:** `useCartStore`
- **States:** Empty, Loading, Populated.
- **Pages Where Used:** Storefront global (triggered via Header).

**CheckoutSummary (`checkout-summary.v1`)**
- **Category:** E-commerce
- **Purpose:** Order totals, shipping, and tax calculation display.
- **Reusability Score:** 7/10
- **Optional Props:** `showPromoCodeInput`
- **Pages Where Used:** Checkout, Cart Drawer.

### Content & Marketing

**Hero (`hero.v1`)**
- **Category:** Sections
- **Purpose:** Primary page banner.
- **Reusability Score:** 8/10
- **Required Props:** `variant`, `heading`
- **Variants:** `modern`, `luxury`, `minimal`, `editorial`
- **Pages Where Used:** Homepage, Landing Pages.

**RichText (`rich-text.v1`)**
- **Category:** Content
- **Purpose:** Render sanitized CMS HTML.
- **Reusability Score:** 9/10
- **Required Props:** `content`
- **Pages Where Used:** Blog, Product Details, Custom Pages.

### Feedback & Overlays

**Modal / Dialog**
- **Category:** Dialogs
- **Purpose:** Highly focused interactive overlays.
- **Reusability Score:** 10/10
- **States:** Open, closed, animating.
- **Accessibility:** Trap focus, ESC to close, `aria-modal="true"`.
- **Pages Where Used:** Quick view, confirm actions (Admin).

**Toast**
- **Category:** Feedback
- **Purpose:** Ephemeral success/error messages.
- **Reusability Score:** 10/10
- **Variants:** `success`, `error`, `info`, `warning`

### Data Display (Admin)

**DataTable**
- **Category:** Tables
- **Purpose:** Complex list view with sorting/filtering.
- **Reusability Score:** 8/10
- **Priority:** High (Admin) | **Complexity:** High
- **Dependencies:** TanStack Table (or similar)
- **Features:** Pagination, row selection, bulk actions.
- **Pages Where Used:** Orders list, Products list, Customers list.

---

## 3. UI Assessment & Recommendations

### 1. Detect Duplicated UI
- **Risk:** Product display logic is often duplicated between `CartDrawer`, `CheckoutSummary`, and `OrderHistory`.
- **Fix:** Extract a pure `LineItem` component that renders an image, title, variant, price, and optional quantity controls.

### 2. Detect Inconsistent UI
- **Risk:** Admin and Storefront might accidentally use different primitives (e.g., standard HTML `<button>` vs. `Button` component).
- **Fix:** All base UI elements (Atoms) must be exported from `packages/components` and used universally.

### 3. Missing Reusable Abstractions
- **Form Builder:** Admin needs a dynamic form renderer based on JSON schema to avoid rewriting entity CRUD forms.
- **Empty States:** A generic `EmptyState` component (Icon, Heading, Subheading, CTA) is missing and often hardcoded per view.

### 4. Component Consolidation
- Instead of `TopHeader`, `StickyHeader`, and `MegaMenuHeader`, use a single `Header` component with a `variant` prop.
- Combine `CategoryGrid` and `CollectionGrid` into a unified `ResourceGrid` or enhance `ProductGrid`.

### 5. Design-System Improvements
- Enforce strict Token Linting (e.g., via Stylelint or ESLint) to flag any hardcoded `px` or `#hex` values in TSX/CSS files.
- Ensure the Theme Engine (`packages/theme-engine`) supports robust CSS variable generation for runtime swapping.

### 6. Shared Hooks
- `useTenant()`: Fetch current tenant context.
- `useCart()`: Wrap Zustand store for reactivity.
- `useMediaQuery()`: Responsive JS checks matching token breakpoints.
- `useClickOutside()`: For dropdowns and modals.

### 7. Shared Utilities
- `cn()`: Standardized class merging (clsx + tailwind-merge) for dynamic styling.
- `formatCurrency(cents, currency)`: Strictly typed formatting.

### 8. Shared Layouts
- `DashboardLayout`: Sidebar + Topbar + Main Content area.
- `StorefrontLayout`: Header + Main + Footer.

### 9. Shared Providers
- `ThemeProvider`: Injects CSS variables to the root element.
- `ToastProvider`: Manages the ephemeral notification stack.
- `CartProvider`: Initializes the cart state.

### 10. Shared Animations
- Define `animate-fade-in`, `animate-slide-up`, `animate-drawer-in` as Tailwind plugins driven by design system motion tokens.

---

## 4. Architecture Implementation Plan

### Recommended Folder Structure
```
packages/
  components/
    src/
      primitives/       # Atoms (Button, Input, Flex, Text)
      commerce/         # Molecules/Organisms (ProductCard, CartDrawer)
      marketing/        # Sections (Hero, Newsletter)
      admin/            # Admin specific (DataTable, Sidebar)
      layouts/          # Templates (StorefrontLayout)
      registry.ts       # Central export mapping for Page Builder
  design-tokens/
    src/
      colors.ts
      spacing.ts
      typography.ts
```

### Atomic Design Classification
- **Atoms:** Button, Input, Icon, Typography, Badge, Spinner.
- **Molecules:** SearchBar, ProductCard, FormField, Pagination.
- **Organisms:** Header, Footer, Hero, ProductGrid, DataTable, CartDrawer.
- **Templates:** StorefrontLayout, AdminLayout, CheckoutLayout.
- **Pages:** Handled by Next.js Catch-All routing (Storefront) or React Router (Admin).

### RSC vs. Client Components (Next.js Storefront)
- **Server Components (Default):**
  - Layouts, Header (visuals), Footer, Hero, ProductGrid (fetching), RichText.
  - *Reasoning:* SEO, bundle size reduction, direct DB/API access.
- **Client Components (`'use client'`):**
  - Button, CartDrawer, CheckoutSummary, Carousel, SearchBar, Modals.
  - *Reasoning:* Need access to React state, context, and DOM events.

### Implementation Priority & Effort

| Component Group | Priority | Effort | First to Build? | Configurable? |
|-----------------|----------|--------|-----------------|---------------|
| **Primitives (Flex, Grid, Button, Text)** | 1 - Highest | Low | **YES** (Foundation) | Highly |
| **Theme Engine & Providers** | 1 - Highest | Medium | **YES** | Theme-driven |
| **Header & Footer** | 2 - High | Medium | No | Variant-driven |
| **ProductCard & ProductGrid** | 2 - High | Medium | No | Variant-driven |
| **CartDrawer & Checkout** | 3 - Medium | High | No | Data-driven |
| **Marketing Blocks (Hero, Testimonials)** | 4 - Low | Low | No | Content-driven |
| **Admin DataTable & Forms** | 4 - Low | High | No | Schema-driven |

### Summary
To maximize code reuse, the fundamental step is strictly enforcing the **Design System > Theme > Component** inheritance chain. All UI must be assembled from `packages/components/src/primitives` and exposed to the Page Builder via the `registry.ts`. Duplicate patterns (like cart items vs order history items) must be extracted into standard generic components during Phase 1 to prevent tech debt in Phase 2.
