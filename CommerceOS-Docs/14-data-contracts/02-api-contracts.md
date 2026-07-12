# Phase 1 API Contracts (SOURCE OF TRUTH)

Route shape convention: `/api/v1/{module}/{resource}`. Tenant resolved from Host header, never a path param (see `.agent/rules/03-naming-conventions.md`). All authenticated routes require `Authorization: Bearer {jwt}`.

## Platform Module

```
POST   /api/v1/platform/auth/login              { email, password } -> { accessToken, refreshToken }
POST   /api/v1/platform/auth/refresh             { refreshToken } -> { accessToken, refreshToken }
POST   /api/v1/platform/auth/logout              -> 204
GET    /api/v1/platform/me                       -> { id, email, role, tenantId }

POST   /api/v1/platform/tenants                  [super_admin only] { name, planId, domain } -> Tenant
GET    /api/v1/platform/tenants/:id              [super_admin only] -> Tenant
PATCH  /api/v1/platform/tenants/:id/status       [super_admin only] { status } -> Tenant

GET    /api/v1/platform/feature-flags            -> { flagKey: boolean }[]
PATCH  /api/v1/platform/feature-flags/:flagKey   [super_admin only] { enabled } -> FeatureFlag
```

## Commerce Module — Catalog

```
GET    /api/v1/catalog/products                  ?status=&categoryId=&page=&limit= -> { items: Product[], total }
GET    /api/v1/catalog/products/:id               -> Product
POST   /api/v1/catalog/products                   [store_owner|store_staff] CreateProductDto -> Product
PATCH  /api/v1/catalog/products/:id                [store_owner|store_staff] UpdateProductDto -> Product
DELETE /api/v1/catalog/products/:id                [store_owner] -> 204 (soft delete)

GET    /api/v1/catalog/categories                  -> Category[]
POST   /api/v1/catalog/categories                  [store_owner] CreateCategoryDto -> Category
```

### CreateProductDto
```ts
{
  name: string;              // required, 1-200 chars
  slug: string;               // required, unique per tenant, kebab-case
  categoryId?: string;
  variants: {
    sku: string;
    priceCents: number;      // required, positive integer
    currency: string;         // required, ISO 4217
    stockAvailable: number;   // required, >= 0
    attributes?: Record<string, string>;
  }[];                        // at least 1 required
}
```

## Commerce Module — Cart & Checkout

```
POST   /api/v1/commerce/carts                     -> Cart (creates empty cart, session or customer bound)
POST   /api/v1/commerce/carts/:id/items            { variantId, quantity } -> Cart
PATCH  /api/v1/commerce/carts/:id/items/:itemId    { quantity } -> Cart
DELETE /api/v1/commerce/carts/:id/items/:itemId    -> Cart

POST   /api/v1/commerce/checkout/start             { cartId } -> { checkoutSessionId, expiresAt }
POST   /api/v1/commerce/checkout/:sessionId/address        { shippingAddress, billingAddress } -> CheckoutSession
POST   /api/v1/commerce/checkout/:sessionId/shipping-method { methodId } -> CheckoutSession
POST   /api/v1/commerce/checkout/:sessionId/payment         { paymentMethodToken } -> CheckoutSession
POST   /api/v1/commerce/checkout/:sessionId/place-order      -> Order
```

See `14-data-contracts/04-checkout-state-machine.md` for the exact allowed state transitions this endpoint sequence maps to.

## Commerce Module — Orders

```
GET    /api/v1/commerce/orders                    ?status=&page=&limit= -> { items: Order[], total }
GET    /api/v1/commerce/orders/:id                 -> Order
```

## Experience Module — Theme

```
GET    /api/v1/experience/theme                   -> ResolvedTheme  (merged base+override, cached)
PATCH  /api/v1/experience/theme/overrides          [store_owner] Partial<ThemeOverrides> -> ResolvedTheme
```

## Experience Module — Pages

```
GET    /api/v1/experience/pages/:pageKey            -> PageLayout (draft, admin only) 
GET    /api/v1/experience/pages/:pageKey/published   -> PageLayout (public, storefront reads this)
PUT    /api/v1/experience/pages/:pageKey             [store_owner] { sections: Section[] } -> PageLayout (draft save)
POST   /api/v1/experience/pages/:pageKey/publish     [store_owner] -> PageLayout (atomic publish)
```

## Standard Response Envelope

```ts
// success
{ data: T }
// list
{ data: T[], meta: { total: number, page: number, limit: number } }
// error
{ error: { code: string, message: string, details?: unknown } }
```

## Standard Error Codes (use these, don't invent new ones without adding here)

```
UNAUTHORIZED          401 — missing/invalid token
FORBIDDEN              403 — valid token, wrong tenant OR insufficient permission
NOT_FOUND               404 — resource doesn't exist or belongs to another tenant (never leak the distinction)
VALIDATION_ERROR        400 — DTO validation failed, details includes field errors
CONFLICT                409 — e.g. duplicate SKU, stock insufficient
RATE_LIMITED             429
INTERNAL_ERROR           500 — never expose stack traces or raw DB errors to the client
```

## Pagination Convention (all list endpoints)

Query params: `page` (default 1), `limit` (default 20, max 100). Response `meta.total` is the full count before pagination.
