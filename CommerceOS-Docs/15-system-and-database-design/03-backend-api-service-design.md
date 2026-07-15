# Backend API & Service Design

This document maps the API contracts from `14-data-contracts/02-api-contracts.md` into concrete NestJS architectural components. It enforces the strict module boundary rules: Services encapsulate all business logic, Controllers only handle HTTP translation, and Repositories are strictly tenant-scoped.

---

## 1. Request Context & Middleware

Before any controller executes, the request passes through the middleware and guard layer to construct the `TenantContext`.

### 1.1 `TenantContextMiddleware`
- **Responsibility:** Parses the `Host` header, queries `TenantDomainsRepository`, and constructs the `TenantContext` object.
- **Action:** Injects the context into the Express `Request` object.
- **Fail State:** If the domain does not map to an active tenant, immediately returns `404 Not Found` (fail-closed).

### 1.2 `TenantAuthGuard`
- **Responsibility:** Validates the Bearer JWT.
- **Validation:** Ensures `jwt.tenantId === req.tenantContext.id`. If a token was minted for Tenant A but used on Tenant B's domain, it throws `403 Forbidden`.

---

## 2. Platform Module (`apps/api/src/modules/platform`)

Handles root-level system concepts: Tenants, Users, Roles, and Authentication.

### 2.1 Authentication
**`AuthController`**
- `POST /api/v1/platform/auth/login` → `@Body() dto: LoginDto`
- `POST /api/v1/platform/auth/refresh` → `@Body() dto: RefreshTokenDto`
- `GET /api/v1/platform/me` → `@Req() req: RequestWithContext`

**`AuthService`**
- `login(credentials: LoginDto, tenantId: string): Promise<TokenPair>`
  - Uses `argon2.verify()` against `UserRepository`.
- `validateToken(token: string): Promise<JwtPayload>`

### 2.2 Tenants & Feature Flags
**`TenantController`**
- `GET /api/v1/platform/tenants/:id` (Super Admin Only)
- `GET /api/v1/platform/feature-flags`

**`TenantService`**
- `getTenantById(id: string): Promise<Tenant>`
  - Uses standard `PrismaService` (Tenants are the root level, so `TenantScopedRepository` does not apply to the `tenants` table itself).
- `getEffectiveFlags(tenantId: string): Promise<Record<string, boolean>>`

---

## 3. Commerce Module (`apps/api/src/modules/commerce`)

Handles all core merchant and customer workflows.

### 3.1 Catalog
**`CatalogController`**
- `GET /api/v1/catalog/products` → `@Query() query: ProductFilterDto`
- `POST /api/v1/catalog/products` → `@Body() dto: CreateProductDto`

**`CatalogService`**
- **Dependencies:** `ProductsRepository`, `ProductVariantsRepository`, `CategoriesRepository` (all extending `TenantScopedRepository`).
- `createProduct(ctx: TenantContext, dto: CreateProductDto): Promise<Product>`
  - Executes creation within a database transaction to ensure Variants are created atomically with the Product.
- `listProducts(ctx: TenantContext, filter: ProductFilterDto): Promise<Paginated<Product>>`

### 3.2 Cart
**`CartController`**
- `POST /api/v1/commerce/carts`
- `POST /api/v1/commerce/carts/:id/items` → `@Body() dto: AddToCartDto`

**`CartService`**
- **Dependencies:** `CartsRepository`, `CartItemsRepository`, and injected `CatalogService` (to validate Variant IDs and stock).
- `createCart(ctx: TenantContext, customerId?: string): Promise<Cart>`
- `addItem(ctx: TenantContext, cartId: string, dto: AddToCartDto): Promise<Cart>`
  - Calls `CatalogService.getVariant(dto.variantId)` to ensure it exists before adding.

### 3.3 Checkout
**`CheckoutController`**
- `POST /api/v1/commerce/checkout/start` → `@Body() dto: StartCheckoutDto`
- `POST /api/v1/commerce/checkout/:sessionId/place-order`

**`CheckoutService` (State Machine Engine)**
- **Dependencies:** `CartService`, `OrdersRepository`, `EventBus`.
- `startCheckout(ctx: TenantContext, cartId: string): Promise<CheckoutSession>`
- `placeOrder(ctx: TenantContext, sessionId: string): Promise<Order>`
  - Atomic transaction: Creates Order, marks Cart as `converted`, publishes `OrderCreatedEvent` to the EventBus (triggering async inventory reservation).

---

## 4. Experience Module (`apps/api/src/modules/experience`)

Handles storefront rendering requirements.

### 4.1 Theme & Layout
**`ThemeController`**
- `GET /api/v1/experience/theme`
- `PATCH /api/v1/experience/theme/overrides` → `@Body() dto: Partial<ThemeOverrides>`

**`ThemeService`**
- **Dependencies:** `ThemeBaseRepository`, `ThemeTenantOverrideRepository`.
- `getResolvedTheme(ctx: TenantContext): Promise<ResolvedTheme>`
  - Fetches the active `ThemeBase` and the tenant's `ThemeTenantOverride`.
  - Uses `@commerceos/theme-engine`'s `resolveOverride()` to perform the deep merge.
  - Caches the result in Redis (`tenant:{id}:theme:resolved`).

**`PageLayoutController`**
- `GET /api/v1/experience/pages/:pageKey/published`

**`PageLayoutService`**
- `getPublishedLayout(ctx: TenantContext, pageKey: string): Promise<PageLayout>`
  - Caches heavily in Redis.

---

## 5. Dependency Injection Boundaries (Strict Rule)

The Golden Rule of the Monolithic boundaries:
- A Service **MAY** inject its own Module's Repositories.
- A Service **MAY NOT** inject another Module's Repositories.
- A Service **MAY** inject another Module's Service.

**Example: Order Creation Needs Stock Validation**
```ts
// VALID (Commerce/Orders injecting Commerce/Inventory public service)
@Injectable()
export class CheckoutService {
  constructor(
    private readonly ordersRepo: OrdersRepository,
    private readonly inventoryService: InventoryService // OK!
  ) {}
}

// INVALID (Direct Repository Cross-Pollination)
@Injectable()
export class CheckoutService {
  constructor(
    private readonly inventoryRepo: InventoryRepository // VIOLATION!
  ) {}
}
```
