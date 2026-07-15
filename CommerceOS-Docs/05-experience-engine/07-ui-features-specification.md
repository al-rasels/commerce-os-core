# UI Features Specification

This document serves as the master map of all Phase 1 User Interface features, outlining the concrete screens, components, and user flows across both the Storefront and the Admin Dashboard. It translates the abstract component library into actionable feature descriptions.

---

## 1. Storefront UI (Next.js App Router)

The Storefront is highly dynamic. Its layout is completely driven by the `page_layouts` JSON configuration returned by the Experience Engine.

### 1.1 Global Elements
- **Header (`header.v1`)**: 
  - Displays the tenant's Logo.
  - Renders Navigation Links (capable of nested dropdowns for Mega-Menu styles).
  - Utility actions: Global Search Trigger, User Account Link, Cart Drawer Trigger (with item count badge).
  - *Variants:* Minimal, Mega-Menu, Sticky.
- **Footer (`footer.v1`)**:
  - Configurable link columns.
  - Social media icon row.
  - Newsletter signup form (`newsletter.v1`).
- **Cart Drawer (`cart-drawer.v1`)**:
  - Slides in from the right edge.
  - Lists current `CartItem`s with quantity increment/decrement/remove controls.
  - Displays dynamic Subtotal.
  - Contains a high-contrast "Proceed to Checkout" CTA.
- **Toast Notifications**:
  - Ephemeral popups for "Item added to cart", "Error processing request", etc.

### 1.2 Homepage (`/`)
*Driven entirely by the `page_layouts` key: `homepage`.*
- **Hero Section (`hero.v1`)**: Full-bleed background image with a primary Headline, Subheadline, and primary CTA button.
- **Featured Categories**: A grid of visually distinctive cards linking to Category PLPs.
- **Featured Products (`product-grid.v1`)**: A responsive grid (2/3/4 columns) displaying `ProductCard` instances mapped to a specific `sourceId` (e.g., a "New Arrivals" collection).
- **Social Proof**: `testimonials.v1` showcasing customer reviews in a carousel format.

### 1.3 Product Listing Page (PLP) (`/categories/[slug]`)
- **Category Header**: Displays the category name and description (`banner.v1`).
- **Filter & Sort Sidebar**:
  - *Sort:* Price Low-High, Price High-Low, Newest.
  - *Filter:* By Price Range, By available variant attributes (e.g., Size, Color).
- **Product Grid (`product-grid.v1`)**:
  - Displays `product-card.v1` instances.
  - Implements infinite scroll or numerical pagination based on tenant config.

### 1.4 Product Detail Page (PDP) (`/products/[sku]`)
- **Product Gallery (`gallery.v1`)**: 
  - Image carousel or masonry layout of product images.
- **Product Info Area**:
  - Title, Price (dynamic based on selected variant).
  - **Variant Selector**: Chips/Dropdowns to select attributes (Size: M, Color: Blue).
  - **Stock Indicator**: Dynamic text showing "In Stock", "Out of Stock", or "Only X Left" (driven by `stock_available`).
  - **Add to Cart CTA**: Disables automatically if `stock_available === 0`.
- **Rich Description (`rich-text.v1`)**: Renders sanitized HTML output from the Admin WYSIWYG editor.

### 1.5 Checkout Flow (`/checkout`)
A focused, distraction-free layout (Header and Footer are simplified or hidden).
- **Step 1: Contact & Address**: Email collection (or login prompt) and Shipping/Billing address forms.
- **Step 2: Shipping Method**: Selection of available shipping tiers.
- **Step 3: Payment**: Tokenized credit card input (Stripe Elements integration).
- **Order Summary Sidebar (`checkout-summary.v1`)**: Persists across all steps. Shows Line Items, Subtotal, calculated Tax, calculated Shipping, and Grand Total. Promo code input.
- **Success Page**: Order confirmation number and email receipt notice.

---

## 2. Admin Dashboard UI (React + Vite SPA)

The Merchant Admin Dashboard is a secured Single Page Application. It uses a standard sidebar-navigation layout.

### 2.1 Global Elements
- **Sidebar**: Collapsible vertical navigation grouped by Engine (Commerce, Experience, Settings).
- **Topbar**: Displays the active Tenant context (Tenant Switcher for Super Admins) and User Profile.
- **Global Search**: Command palette (Ctrl+K / Cmd+K) to quick-jump to specific Orders or Products by ID.

### 2.2 Dashboard / Overview
- **Metrics Cards**: Topline stats (Today's Sales, Orders to Fulfill).
- **Recent Activity**: A slimline table showing the last 5 incoming orders.

### 2.3 Catalog Management
- **Product List (DataTable)**:
  - Supports bulk selection, filtering by Status (`draft`, `active`, `archived`), and sorting.
- **Product Detail / Editor**:
  - **General Info**: Title, Slug generation, Category assignment.
  - **Media Uploader**: Drag-and-drop zone for product images.
  - **Description Editor**: Tiptap-based WYSIWYG editor.
  - **Variants Matrix**: A complex interactive table allowing merchants to generate variants based on attributes, set individual `price_cents`, and manage `stock_available`.

### 2.4 Order Management
- **Order List (DataTable)**:
  - Filtering by `status` (pending, paid, fulfilled).
- **Order Details Page**:
  - **Status Timeline**: Visual indicator of the order's progression.
  - **Customer Info**: Shipping address, billing address, contact details.
  - **Line Items**: Table of purchased variants and quantities.
  - **Financial Summary**: Subtotal, Tax, Shipping, Total.
  - **Actions**: "Fulfill Order" (triggers tracking number input), "Cancel/Refund Order" (opens confirmation modal).

### 2.5 Experience Builder (Page Builder)
- **Visual Editor Mode**:
  - **Left Panel (Available Components)**: List of registered components from `componentRegistry`.
  - **Middle Panel (Canvas)**: A visual representation of the page layout (e.g., `homepage`). Merchants can drag-and-drop sections to reorder them.
  - **Right Panel (Inspector)**: Edits the JSON props for the actively selected component (e.g., changing the text of a `hero.v1` component).
- **Theme Editor**:
  - Form inputs mapped directly to the `packages/design-tokens` schema.
  - Allows merchants to pick Brand Colors (Primary, Secondary) and Typography scales, outputting the `theme_tenant_override` JSON.

### 2.6 Platform Settings
- **Users & Roles**: Invite new staff, assign roles (`store_staff`, `store_owner`).
- **Billing & Plans**: View current plan limit, upgrade paths (integrated with Stripe Billing).
- **Feature Flags (Super Admin Only)**: Toggle dot-notated flags to gracefully rollout new features to specific tenants.
