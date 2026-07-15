# Frontend Next.js Routing Design

This document maps out the specific file-based routing architecture for the customer-facing Storefront application (`apps/storefront`), built with Next.js App Router (React Server Components).

---

## 1. Directory Structure (App Router)

The Storefront uses a clean, domain-agnostic route structure. Because tenant resolution happens at the middleware layer, we do **not** use dynamic `/[tenantId]/` path segments. Every tenant shares the exact same Next.js route tree, with dynamic data injected based on the requested hostname.

```
apps/storefront/src/
├── middleware.ts                   # Edge Tenant Resolver
└── app/
    ├── layout.tsx                  # Root Layout (Theme & Context Providers)
    ├── page.tsx                    # Homepage
    ├── not-found.tsx               # 404 (Tenant Not Found / Product Not Found)
    ├── error.tsx                   # React Error Boundary
    │
    ├── (catalog)/                  # Route Group (omitted from URL)
    │   ├── categories/[slug]/
    │   │   └── page.tsx            # Category Listing Page
    │   └── products/[sku]/
    │       └── page.tsx            # Product Detail Page (PDP)
    │
    ├── (checkout)/                 # Route Group
    │   ├── cart/
    │   │   └── page.tsx            # Cart Review
    │   └── checkout/
    │       ├── layout.tsx          # Minimal Checkout Layout (No Header/Footer)
    │       └── page.tsx            # Multi-step Checkout Flow
    │
    └── api/                        # Next.js Route Handlers (BFF pattern)
        └── auth/
            └── [...nextauth]/route.ts # NextAuth/Custom Session Handler
```

---

## 2. Middleware Tenant Resolution (`middleware.ts`)

Next.js Middleware runs at the edge before any request hits the React Server Components.

### The Flow:
1. **Extract Hostname:** The middleware reads the `Host` header (e.g., `shop.tenantA.com`).
2. **Lookup:** (Optional/Edge Cache) Looks up the `tenant_id` associated with that domain. If using a pure Backend-for-Frontend (BFF) model, the Next.js middleware simply forwards the `Host` header to the NestJS API, which resolves it.
3. **Inject Header:** Next.js injects a custom `x-tenant-id` header into the incoming request.
4. **Pass to Server Components:** RSCs read this header to know which tenant context they are operating in.

---

## 3. Server-Side Data Fetching Strategy (Parallel Fetching)

React Server Components allow us to fetch data directly from the NestJS Backend API securely, without exposing tokens to the browser.

### Root Layout (`app/layout.tsx`)
The Root Layout is responsible for fetching the visual identity of the tenant.
- **Fetches:** `GET /api/v1/experience/theme`
- **Action:** Injects the resulting CSS custom properties into a `<style>` block in the `<head>`.
- **Action:** Wraps the `children` in necessary React Context Providers (e.g., Zustand Cart Store hydrator).

### Page Layouts (e.g., `app/page.tsx`)
Pages fetch their specific Layout JSON and Commerce data concurrently using `Promise.all()`.

```tsx
// apps/storefront/src/app/page.tsx
export default async function HomePage() {
  const headersList = headers();
  const host = headersList.get('host'); // API uses this to resolve tenant

  // Parallel Fetch: Page Layout & Featured Products
  const [pageLayout, featuredProducts] = await Promise.all([
    fetchFromAPI(`/api/v1/experience/pages/homepage/published`, { headers: { host } }),
    fetchFromAPI(`/api/v1/catalog/products?featured=true`, { headers: { host } })
  ]);

  // Bind the generic JSON layout blocks to the Component Registry
  return (
    <PageRenderer 
      layout={pageLayout.sections} 
      context={{ products: featuredProducts.items }} 
    />
  );
}
```

---

## 4. Admin Dashboard Routing (React Router)

*Note: The Admin application (`apps/admin`) is a React Single Page Application (SPA) built with Vite, independent of Next.js.*

```
apps/admin/src/
├── main.tsx
└── pages/
    ├── Login.tsx
    ├── Dashboard.tsx
    ├── Catalog/
    │   ├── ProductList.tsx
    │   └── ProductEdit.tsx
    ├── Orders/
    │   ├── OrderList.tsx
    │   └── OrderDetail.tsx
    └── Storefront/
        ├── ThemeEditor.tsx
        └── PageBuilder.tsx
```
Admin routing uses React Router v6 `createBrowserRouter`. All routes (except Login) are wrapped in an `<AuthGuard>` that ensures a valid JWT is present in `localStorage`/`sessionStorage` before mounting the component.
