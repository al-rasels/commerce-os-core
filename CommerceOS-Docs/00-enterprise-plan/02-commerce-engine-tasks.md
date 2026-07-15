# Module 2 — Commerce Engine (Catalog, Cart, Checkout, Orders, Payments, Tax, Shipping)

Covers Phase 1 Milestones M4, M9 (`10-roadmap/02-phase1-mvp-spec.md` §3).
Requirement IDs: `REQ-COMM-001..034`.

Reference docs: `06-commerce-business-engines/01-commerce-engine.md`, `14-data-contracts/01-phase1-entities.md`, `14-data-contracts/02-api-contracts.md`, `14-data-contracts/04-checkout-state-machine.md`, `.agent/skills/stock-reservation-algorithm`.

All endpoints in this module MUST go through `TenantScopedRepository` (Module 1, T-PLAT-M2-016) — no direct Prisma client calls in controllers/services.

---

## Milestone M4 — Catalog CRUD (Admin)

**Depends on:** M2 (auth/RBAC), M3 (DB schema)

| ID | Task | Depends On | Est | Cx | Library / Package | Reviewer |
|---|---|---|---|---|---|---|
| T-COMM-M4-001 | Scaffold `apps/api/src/modules/commerce/catalog/` + module registration | M3-004 | 15m | XS | `@nestjs/common` | BE |
| T-COMM-M4-002 | DTOs: create/update Product (name, slug, status, category_id, metafields_json) with validators | 001 | 30m | S | `class-validator`, `class-transformer` | BE |
| T-COMM-M4-003 | Product service: create/update/archive (soft-delete via `deleted_at`) | 002, T-PLAT-M2-016 | 60m | M | `prisma` | BE |
| T-COMM-M4-004 | Product controller: `POST/GET/PATCH/DELETE /admin/products` | 003 | 45m | S | `@nestjs/common` | BE |
| T-COMM-M4-005 | Slug uniqueness enforcement per tenant (`UNIQUE(tenant_id, slug)`) with friendly conflict error | 003 | 20m | XS | `prisma` error codes | BE |
| T-COMM-M4-006 | DTOs + service + controller: Category CRUD (with `parent_id` nesting) | 001 | 60m | M | `class-validator`, `prisma` | BE |
| T-COMM-M4-007 | DTOs + service + controller: Product Variant CRUD (sku, price_cents, currency, attributes_json) | 003 | 60m | M | `class-validator`, `prisma` | BE |
| T-COMM-M4-008 | Enforce money-as-integer-cents convention at DTO layer (reject float price inputs) | 007 | 20m | XS | `class-validator` custom decorator | BE |
| T-COMM-M4-009 | Single-location stock field: `stock_available`/`stock_reserved` update endpoints | 007 | 30m | S | `prisma` | BE |
| T-COMM-M4-010 | Swagger/OpenAPI decorators on all catalog endpoints | 004, 006, 007 | 30m | S | `@nestjs/swagger` | BE |
| T-COMM-M4-011 | Image upload endpoint for product media (multipart) | 003 | 45m | S | `multer`, `@nestjs/platform-express` | BE |
| T-COMM-M4-012 | Object storage integration: push uploaded images to S3-compatible bucket | 011 | 45m | S | `@aws-sdk/client-s3` | BE |
| T-COMM-M4-013 | Server-side image optimization pass (resize/format) before storage | 012 | 30m | S | `sharp` | BE |
| T-COMM-M4-014 | Admin UI: Product list view (table, search, status filter) | T-PLAT-M2-018 (auth) | 60m | M | `@tanstack/react-table`, `@tanstack/react-query` | FE |
| T-COMM-M4-015 | Admin UI: Product create/edit form | 014 | 60m | M | `react-hook-form` + `zod` | FE |
| T-COMM-M4-016 | Admin UI: Category tree management view | 014 | 45m | S | `@radix-ui/*` | FE |
| T-COMM-M4-017 | Admin UI: Variant editor (attributes, price, stock) nested in product form | 015 | 60m | M | `react-hook-form` | FE |
| T-COMM-M4-018 | Admin UI: Media/image upload widget with preview | 011, 015 | 45m | S | `multer` (backend), native file input | FE |
| T-COMM-M4-019 | Admin UI: Rich-text product description editor | 015 | 45m | S | `tiptap` | FE |
| T-COMM-M4-020 | Shared Zod schemas for Product/Category/Variant in `packages/shared-types` (single source, admin+storefront) | 002, 006, 007 | 45m | S | `zod` | ARCH |
| T-COMM-M4-021 | Toast feedback for catalog CRUD actions (save/error) | 015 | 15m | XS | `sonner` | FE |
| T-COMM-M4-022 | Unit tests: Product/Category/Variant services (CRUD + slug/sku uniqueness) | 003, 006, 007 | 60m | M | `jest`, `@nestjs/testing` | QA |
| T-COMM-M4-023 | Integration test: tenant A cannot read/modify tenant B's products via catalog API | T-PLAT-M2-019 | 45m | M | `jest`, `supertest` | QA |
| T-COMM-M4-024 | Component test: Product list + form render/interaction | 014, 015 | 45m | S | `@testing-library/react` | QA |
| T-COMM-M4-025 | a11y test pass on catalog admin screens | 014-019 | 30m | S | `jest-axe` | QA |
| T-COMM-M4-026 | API docs: catalog endpoints published via generated Swagger spec | 010 | 20m | XS | `@nestjs/swagger` | ARCH |
| T-COMM-M4-027 | Rate limiting on catalog write endpoints | 004 | 20m | XS | `@nestjs/throttler` | SEC |
| T-COMM-M4-028 | Audit log entries for product/category/variant mutations | 003, 006, 007 | 30m | S | audit table (Module 1) | SEC |
| T-COMM-M4-029 | Sanitize `tiptap` rich-text output server-side before persisting `products.description` (prevent stored XSS rendered later on storefront) — **was missing, added on gap-analysis pass** | 019 | 30m | S | `sanitize-html` | SEC |

**Milestone AC:** Store Owner/Staff can create a full product (with variants, category, images, description) end to end through the admin UI; tenant isolation verified.

---

## Milestone M9 — Cart / Checkout / Payment / Order Lifecycle

**Depends on:** M4 (catalog exists to add to cart)

| ID | Task | Depends On | Est | Cx | Library / Package | Reviewer |
|---|---|---|---|---|---|---|
| T-COMM-M9-001 | Scaffold `apps/api/src/modules/commerce/{cart,checkout,orders,payments,tax,shipping}/` | M4-001 | 20m | XS | `@nestjs/common` | BE |
| T-COMM-M9-002 | Cart service: create/get cart (guest via `session_id`, or `customer_id`) | 001 | 45m | S | `prisma` | BE |
| T-COMM-M9-003 | Cart item service: add/update/remove item, quantity validation against `stock_available` | 002 | 60m | M | `prisma` | BE |
| T-COMM-M9-004 | Stock reservation implementation per `.agent/skills/stock-reservation-algorithm` spec | 003 | 90m | L | `prisma` transactions | ARCH |
| T-COMM-M9-005 | Reservation expiry job: release stale reservations back to `stock_available` | 004 | 60m | M | `bullmq`, `@nestjs/bullmq` | BE |
| T-COMM-M9-006 | Cart controller: `GET/POST/PATCH/DELETE /cart` + `/cart/items` | 002, 003 | 45m | S | `@nestjs/common` | BE |
| T-COMM-M9-007 | Checkout state machine implementation per `14-data-contracts/04-checkout-state-machine.md` | 006 | 90m | L | custom (typed state machine) | ARCH |
| T-COMM-M9-008 | Basic tax-rule engine (flat/regional rate per tenant config, Phase 1 scope only) | 007 | 60m | M | custom | BE |
| T-COMM-M9-009 | Basic shipping-rate rule engine (flat/weight-tier, Phase 1 scope only) | 007 | 60m | M | custom | BE |
| T-COMM-M9-010 | Order totals calculation (subtotal/tax/shipping/total, all integer cents) | 008, 009 | 45m | S | custom | BE |
| T-COMM-M9-011 | Stripe payment integration: create PaymentIntent at checkout | 007 | 60m | M | `stripe` | BE |
| T-COMM-M9-012 | Stripe webhook handler: payment succeeded/failed → transition checkout state machine | 011 | 60m | M | `stripe` webhooks | BE |
| T-COMM-M9-012a | Verify Stripe webhook signature against `STRIPE_WEBHOOK_SECRET` before processing any event (reject unsigned/forged requests) — **was missing, added on gap-analysis pass** | 012 | 20m | XS | `stripe.webhooks.constructEvent` | SEC |
| T-COMM-M9-002a | Guest checkout: create/find `customers` row from checkout-form email before order creation (orders.customer_id is a required FK, guest carts have none) — **was missing, added on gap-analysis pass** | T-COMM-M9-002, T-COMM-M9-021 | 30m | S | `prisma` | BE |
| T-COMM-M9-013 | Order creation on successful payment (orders + order_items rows, decrement stock_reserved) | 012, 010 | 60m | M | `prisma` transactions | BE |
| T-COMM-M9-014 | Order lifecycle transitions: pending → paid → fulfilled → cancelled/refunded | 013 | 60m | M | custom state machine | BE |
| T-COMM-M9-015 | Invoice generation on order paid (PDF or structured record, Phase 1: structured record) | 013 | 45m | S | custom | BE |
| T-COMM-M9-016 | Idempotency handling on payment webhook (avoid duplicate order creation on retry) | 012 | 45m | S | `ioredis` idempotency keys | SEC |
| T-COMM-M9-017 | Encrypt/never-store raw payment credentials (rely on Stripe tokens only) | 011 | 20m | XS | `stripe` (PCI scope reduction) | SEC |
| T-COMM-M9-018 | Order controller: `GET /orders`, `GET /orders/:id` (customer + admin scoped) | 014 | 30m | S | `@nestjs/common` | BE |
| T-COMM-M9-019 | Admin order list/detail endpoints with status filter | 018 | 30m | S | `@nestjs/common` | BE |
| T-COMM-M9-020 | Storefront: Cart UI (drawer/page) — add/update/remove items | 006 | 60m | M | `zustand`, `@tanstack/react-query` | FE |
| T-COMM-M9-021 | Storefront: Checkout form (address, contact, shipping selection) | 007, 009 | 90m | L | `react-hook-form` + `zod` | FE |
| T-COMM-M9-022 | Storefront: Payment step (Stripe Elements/Checkout embed) | 011 | 60m | M | `stripe` (client SDK) | FE |
| T-COMM-M9-023 | Storefront: Order confirmation page | 013 | 30m | S | Next.js | FE |
| T-COMM-M9-024 | Admin UI: Order list view (status, customer, total) | 019 | 45m | S | `@tanstack/react-table` | FE |
| T-COMM-M9-025 | Admin UI: Order detail view (items, status transitions, timeline) | 024 | 45m | S | `@tanstack/react-query` | FE |
| T-COMM-M9-026 | Email notifications: order confirmation, payment receipt | 013 | 45m | S | `resend` + `react-email` | BE |
| T-COMM-M9-027 | Unit tests: cart/stock-reservation/checkout-state-machine/order-totals logic | 004, 007, 010 | 90m | L | `jest` | QA |
| T-COMM-M9-028 | Integration test: full checkout happy path (cart → payment → order) against test Stripe keys | 013, 022 | 60m | M | `jest`, `supertest`, `stripe` test mode | QA |
| T-COMM-M9-029 | Concurrency test: two customers checking out last unit of stock — only one succeeds | 004 | 60m | M | `jest` (concurrent test harness) | QA |
| T-COMM-M9-030 | Load test: checkout path P95 latency target (<300ms, per vision doc §5) under simulated shared-tenant load | 028 | 60m | M | `k6` | QA (Perf) |
| T-COMM-M9-031 | Isolation test: tenant A's cart/order never visible to tenant B via any Commerce endpoint | 006, 018 | 45m | M | `jest`, `supertest` | QA |
| T-COMM-M9-032 | Rate limiting on checkout/payment endpoints (abuse/card-testing prevention) | 011 | 20m | XS | `@nestjs/throttler` | SEC |
| T-COMM-M9-032a | Test: forged/unsigned Stripe webhook payload is rejected before touching order state | T-COMM-M9-012a | 30m | S | `jest`, `supertest` | QA |
| T-COMM-M9-033 | E2E: guest checkout full flow via Playwright (browse → cart → checkout → confirmation) | 020-023, 028 | 60m | M | `playwright` | QA |

**Milestone AC:** a real merchant can take a real order end to end through Stripe; checkout P95 < 300ms under shared-tenant simulated load; stock never oversold under concurrent checkout.
