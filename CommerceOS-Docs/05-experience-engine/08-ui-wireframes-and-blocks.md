# UI Wireframes & Blueprint (Atomic Design)

This document provides a highly granular, Atomic Design-based structural blueprint for the CommerceOS UI. It defines exactly how basic UI Elements (Atoms) combine to form Blocks (Molecules), which assemble into Sections (Organisms), which finally render as complete Pages (Templates).

---

## 1. Storefront Blueprints

### 1.1 Elements (Atoms)
The indivisible primitives of the storefront.

- **PrimaryCTA:** Solid background color (primary theme token), contrasting text. Hover state: slightly darkened background. Disabled: Opacity 50%, unclickable.
- **SecondaryCTA:** Outline border (primary theme token), transparent background, primary text. Hover state: Light background fill.
- **TextInput:** Bordered rectangle (radius `sm`). Focus state: `ring-focus` border highlight. Error state: Red border, red helper text.
- **SelectDropdown:** Chevron icon on the right, triggers native or styled select options.
- **Typography:** `H1`, `H2`, `H3`, `H4`, `BodyText`, `SmallText`. Controlled entirely by `packages/design-tokens`.
- **ImageFrame:** `aspect-ratio` locked container (e.g., 1:1 for products, 16:9 for hero) with `object-fit: cover` and lazy-loading `img` tags.
- **PriceTag:** Displays formatted currency (e.g., `$49.99`). Optional strikethrough for "compare at" pricing.
- **Badge:** Small colored pill (e.g., "Sale", "New", "Out of Stock").
- **Divider:** Subtle 1px horizontal or vertical line (uses `border-default`).
- **Spinner:** Loading indicator (SVG circle with dasharray animation).

### 1.2 Blocks (Molecules)
Combinations of elements built for reuse.

- **ProductCardBlock:**
  - `ImageFrame` (Top, aspect-square).
  - `Badge` (Absolute top-left, optional).
  - `H4` (Product Title).
  - `PriceTag` (Current price).
  - `SecondaryCTA` ("Add to Cart" or "Select Options").
- **SearchBarBlock:**
  - `TextInput` (No right border radius).
  - `PrimaryCTA` (Search Icon, no left border radius).
- **NavigationLinkBlock:**
  - `BodyText` (Link label).
  - Chevron Icon (Optional, indicates dropdown).
- **CartItemBlock:**
  - `ImageFrame` (Thumbnail size).
  - `BodyText` (Title & Variant).
  - `PriceTag`.
  - QuantityStepper ([-] [Number] [+]).
  - RemoveIcon (Trash can or "X").

### 1.3 Sections (Organisms)
Self-contained UI zones.

- **HeaderSection (`header.v1`):**
  - Left: Brand Logo.
  - Center: Array of `NavigationLinkBlock`.
  - Right: `SearchBarBlock` (collapsible), UserIcon, CartIcon (with numeric Badge).
- **HeroSection (`hero.v1`):**
  - Background: Full-width `ImageFrame` (or CSS background).
  - Overlay: Dark gradient for text readability.
  - Content (Centered or Left-Aligned): `H1` + `BodyText` + `PrimaryCTA`.
- **ProductGridSection (`product-grid.v1`):**
  - Top: `H2` (Section Title, e.g., "Trending Now").
  - Grid Container: Responsive layout (1 col mobile, 2 tablet, 4 desktop).
  - Content: Array of `ProductCardBlock`s.
- **FooterSection (`footer.v1`):**
  - Columns (1-4): Stacks of `NavigationLinkBlock`.
  - Newsletter Column: `H4` + `BodyText` + Email `TextInput` + Subscribe `PrimaryCTA`.
  - Bottom: `Divider` + Copyright `SmallText`.

### 1.4 Pages (Templates)
The final layout configurations.

**Homepage (`page_layouts: homepage`)**
1. `HeaderSection`
2. `HeroSection`
3. `ProductGridSection` (Source: Featured Collection)
4. `ProductGridSection` (Source: New Arrivals)
5. `FooterSection`

**Product Detail Page (PDP)**
1. `HeaderSection`
2. Main Content Grid (2 columns on desktop):
   - Left Column: `GallerySection` (Main `ImageFrame` + thumbnail array).
   - Right Column: `ProductInfoSection`:
     - `H1` (Title).
     - `PriceTag`.
     - `Badge` (Stock status).
     - `Divider`.
     - `VariantSelectorBlock` (Size/Color swatches).
     - `PrimaryCTA` (Add to Cart - disabled if out of stock).
     - `RichTextSection` (Product Description).
3. `ProductGridSection` (Source: Related Products).
4. `FooterSection`

---

## 2. Admin Dashboard Blueprints

### 2.1 Elements (Atoms)
- **SidebarLink:** Icon + Text. Active state: light grey background + blue left border.
- **StatusPill:** Small rounded badge. Colors map to states (Green = Active/Paid, Grey = Draft, Yellow = Pending, Red = Cancelled).
- **IconButton:** Bare SVG icon (Edit, Trash, Copy) with a subtle hover circle.
- **Checkbox/Toggle:** Switch input for booleans (e.g., "Is Published?").
- **TabItem:** Text label with an underline when active.

### 2.2 Blocks (Molecules)
- **MetricCardBlock:**
  - `SmallText` (Label, e.g., "Total Revenue").
  - `H3` (Value, e.g., "$12,450").
  - TrendIndicator (e.g., "+5% this week" in green).
- **DataTableRowBlock:**
  - Array of cells. Checkbox (Selection), Thumbnail (optional), Text cells, `StatusPill`, `IconButton`s (Actions).
- **FormFieldBlock:**
  - `SmallText` (Label).
  - `TextInput` or `SelectDropdown` or `Toggle`.
  - `SmallText` (Help text/Error text, red if invalid).

### 2.3 Sections (Organisms)
- **AdminSidebarSection:**
  - Top: Tenant Logo / Switcher.
  - Middle: Grouped lists of `SidebarLink` (Commerce: Orders, Products; Experience: Pages, Themes).
  - Bottom: Settings `SidebarLink`, User Profile thumbnail.
- **AdminTopbarSection:**
  - Left: Mobile hamburger menu toggle (hidden on desktop).
  - Center: Global Search `SearchBarBlock`.
  - Right: Notifications Bell, Help Link.
- **DataTableSection:**
  - Top Bar: Search input (filter current view), `PrimaryCTA` (e.g., "Create Product").
  - Filter Bar: Array of `SelectDropdown`s (e.g., Status, Category).
  - Table: Header Row + N `DataTableRowBlock`s.
  - Bottom Bar: Pagination controls (Prev, Next, Page X of Y).

### 2.4 Pages (Templates)

**Product Editor Page (`/admin/products/[id]`)**
1. Layout Wrapper: `AdminSidebarSection` (Left) + Content Area (Right).
2. Content Header: Back Button + `H2` (Product Title) + Save `PrimaryCTA`.
3. Two-Column Grid:
   - **Main Column (70%):**
     - `GeneralInfoCard`: `FormFieldBlock` (Title), `FormFieldBlock` (Description WYSIWYG).
     - `MediaCard`: Drag & Drop upload zone + grid of uploaded `ImageFrame`s.
     - `VariantsCard`: A nested `DataTableSection` for generating and pricing variant combinations (Size/Color).
   - **Side Column (30%):**
     - `StatusCard`: `Toggle` (Draft vs Active).
     - `OrganizationCard`: `SelectDropdown` (Category), `TextInput` (Tags).

**Page Builder (Experience Editor)**
1. Layout Wrapper: `AdminTopbarSection` only (Sidebar collapsed).
2. Three-Panel Layout:
   - **Left Panel (Components):** List of Draggable Items (`hero.v1`, `product-grid.v1`).
   - **Middle Panel (Canvas):** Iframe rendering the storefront layout for live preview.
   - **Right Panel (Inspector):** Dynamically generated `FormFieldBlock`s based on the selected component's prop schema (e.g., Text inputs for Hero Headline).

---

## 3. Elite UX & Performance Patterns (Top-Notch Design Standard)

To ensure the application feels like a premium, elite-tier product, all UI implementations must adhere to the following strict UX and performance patterns.

### 3.1 Fully Responsive & Fluidity
- **Fluid Layouts:** Utilize CSS Grid, Flexbox, and CSS `clamp()` functions to ensure typography and spacing scale smoothly between breakpoints without abrupt snapping.
- **Mobile-First Touch Targets:** All interactive elements (`PrimaryCTA`, `IconButton`, `NavigationLinkBlock`) must have a minimum touch area of 44x44px on mobile devices.
- **Responsive Media:** All `ImageFrame` instances must use `next/image` with `sizes` attributes mapped accurately to the viewport to serve the most optimized WebP payload.

### 3.2 Fluency & "Fastest Speedy" Interactions
- **Micro-Animations:** Every interactive element must feature a subtle micro-animation on hover, focus, and active states. Examples: 
  - `PrimaryCTA`: `transform scale-95` on click, `brightness-110` on hover.
  - Transitions must use the design system's `ease-out` token at `150ms`.
- **Optimistic UI:** UI states must update instantly on interaction without waiting for network response. (e.g., when clicking "Add to Cart", the Cart drawer count increments instantly. If the server responds with an error, the UI rolls back and displays a `Toast`).
- **Skeleton Loaders > Spinners:** Prefer layout-aware skeleton pulses over generic `Spinner` atoms during initial page loads to reduce perceived layout shift.
- **View Transitions:** Utilize the View Transitions API (or Framer Motion) for seamless layout changes between Pages (e.g., smoothly animating the `ImageFrame` from the Product Grid to the PDP).

### 3.3 Intent-Driven Prefetching (Zero-Latency Navigation)
- **Hover Prefetching:** Any `NavigationLinkBlock` or `ProductCardBlock` link MUST trigger a data and component prefetch immediately on `onMouseEnter`.
  - Next.js: Ensure `<Link prefetch={true}>` is utilized for critical paths.
  - Data: Use React Query's `queryClient.prefetchQuery()` to fetch PDP data the moment a user's cursor hovers over a product card, making the subsequent click appear instantaneous.
- **View-Port Prefetching:** For highly likely next steps (e.g., the "Proceed to Checkout" button), preload the Next.js bundle chunk as soon as the element intersects the viewport using `IntersectionObserver`.
