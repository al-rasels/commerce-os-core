# Rule 03 — Naming Conventions (STRICT — no deviation)

Consistency here is what lets an agent (or a new engineer) predict a name correctly instead of guessing. Deviating from these, even when the deviation "reads better," creates drift that compounds.

## Database

| Item | Convention | Example |
|---|---|---|
| Table names | snake_case, plural | `product_variants`, `order_items` |
| Column names | snake_case | `tenant_id`, `created_at`, `deleted_at` |
| Primary key | always `id`, UUID | `id UUID PRIMARY KEY DEFAULT gen_random_uuid()` |
| Foreign key | `{singular_table}_id` | `tenant_id`, `product_id`, `role_id` |
| Timestamps | `created_at`, `updated_at`, `deleted_at` (nullable, soft delete) | always `TIMESTAMPTZ` |
| Boolean columns | `is_` or `has_` prefix | `is_primary`, `has_variants` |
| Junction tables | `{a}_{b}` alphabetical | `product_categories` |

## Backend Code (NestJS)

| Item | Convention | Example |
|---|---|---|
| Entity class | PascalCase, singular | `ProductVariant` |
| Repository class | `{Entity}Repository` | `ProductVariantRepository` |
| Service class | `{Domain}Service` | `CatalogService`, `CheckoutService` |
| Controller class | `{Domain}Controller` | `CatalogController` |
| DTO class | `{Action}{Entity}Dto` | `CreateProductDto`, `UpdateOrderStatusDto` |
| Module folder | kebab-case, matches domain | `modules/commerce/catalog/` |
| Event class | `{Entity}{PastTenseAction}Event` | `OrderCreatedEvent`, `ThemeUpdatedEvent` |
| Guard/Interceptor | `{Purpose}Guard` / `{Purpose}Interceptor` | `TenantAuthGuard`, `AuditLogInterceptor` |

## Frontend Code (React/Next.js)

| Item | Convention | Example |
|---|---|---|
| Component file | PascalCase, matches export | `ProductCard.tsx` exports `ProductCard` |
| Component registry ID | `{kebab-name}.v{n}` | `hero.v1`, `product-grid.v2` |
| Hook | `use{Purpose}` | `useTenantTheme`, `useCartStore` |
| Zustand store | `use{Domain}Store` | `useCartStore` |
| Prop types | `{Component}Props` | `HeroProps` |

## Cache Keys

```
{tenantId}:{module}:{key}[:{subkey}]
```
Examples: `45:products:featured`, `45:theme:resolved`, `45:page:homepage:published`

## Feature Flags

```
{domain}.{capability}
```
Examples: `inventory.advanced`, `builder.dragdrop`, `marketing.campaigns`

## API Routes

```
/api/v1/{module}/{resource}[/{id}][/{sub-resource}]
```
Examples: `/api/v1/catalog/products`, `/api/v1/commerce/orders/:id/refund`

Tenant is NEVER in the URL path (it's resolved from the Host header, not a route param) — `/api/v1/catalog/products` is correct; `/api/v1/tenants/:tenantId/products` is wrong and a signal something bypassed the TenantContext resolution.

## Environment Variables

```
{APP}_{CONCERN}
```
Examples: `API_DATABASE_URL`, `API_REDIS_URL`, `STOREFRONT_CDN_URL`

## Git Branches

```
{type}/{short-description}
```
Types: `feat/`, `fix/`, `chore/`, `refactor/`. Example: `feat/theme-override-merge`

## Commit Messages

Conventional Commits format: `{type}({scope}): {description}`. Example: `feat(commerce): add stock reservation on checkout`
