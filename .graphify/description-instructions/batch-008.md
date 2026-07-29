# Node Description Batch 9 of 51

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "shipping_shipping_controller": "shipping.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.controller.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, ShippingController, tenant-context.ts, TenantContext]
- "shipping_shipping_service": "shipping.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, ShippingService, tenant-context.ts, TenantContext]
- "slug_product_page_client": "product-page-client.tsx" | kind=code-symbol | source=apps/storefront/src/app/products/[slug]/product-page-client.tsx:L1 | neighbors=[e5d6c72 feat: implement end-to-end chec…, page.tsx, section-renderer.tsx, SectionRenderer(), ProductPageClient()]
- "subscriptions_subscriptions_controller": "subscriptions.controller.ts" | kind=code-symbol | source=apps/api/src/modules/business/subscriptions/subscriptions.controller.ts:L1 | neighbors=[7d74efe feat(commerce): implement B2B, …, c506b3c feat(api): implement database r…, SubscriptionsController, tenant-context.ts, TenantContext]
- "subscriptions_subscriptions_service": "subscriptions.service.ts" | kind=code-symbol | source=apps/api/src/modules/business/subscriptions/subscriptions.service.ts:L1 | neighbors=[7d74efe feat(commerce): implement B2B, …, c506b3c feat(api): implement database r…, SubscriptionsService, tenant-context.ts, TenantContext]
- "super_admin_provisiontenantdialog": "ProvisionTenantDialog.tsx" | kind=code-symbol | source=apps/admin/src/pages/super-admin/ProvisionTenantDialog.tsx:L1 | neighbors=[4ddc1b9 fix(build): resolve type and im…, 6ffba43 feat: add MFA auth flow, super …, PLANS, Props, ProvisionTenantDialog()]
- "tax_tax_controller": "tax.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.controller.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, TaxController, tenant-context.ts, TenantContext]
- "tenant_tenant_service": "tenant.service.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant.service.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, tenant-context.ts, TenantContext, TenantService]
- "theme_theme_controller": "theme.controller.ts" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.controller.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…, tenant-context.ts, TenantContext, ThemeController]
- "ui_carousel_usecarousel": "useCarousel()" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L35 | neighbors=[carousel.tsx, CarouselContent(), CarouselItem(), CarouselNext(), CarouselPrevious()]
- "ui_checkbox": "checkbox.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/checkbox.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), Checkbox()]
- "ui_data_table": "data-table.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/data-table.tsx:L1 | neighbors=[4ddc1b9 fix(build): resolve type and im…, 6ffba43 feat: add MFA auth flow, super …, DataTable(), DataTableProps, TanStackColumn]
- "ui_separator": "separator.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/separator.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), Separator()]
- "ui_sidebar_usesidebar": "useSidebar()" | kind=code-symbol | source=apps/admin/src/components/ui/sidebar.tsx:L39 | neighbors=[sidebar.tsx, Sidebar(), SidebarMenuButton(), SidebarRail(), SidebarTrigger()]
- "ui_skeleton": "skeleton.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/skeleton.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), Skeleton()]
- "ui_switch": "switch.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/switch.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), Switch()]
- "ui_textarea": "textarea.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/textarea.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), Textarea()]
- "users_users_controller": "users.controller.ts" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.controller.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, e3a8c77 feat: implement users CRUD back…, tenant-context.ts, TenantContext, UsersController]
- "users_users_repository_spec": "users.repository.spec.ts" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.repository.spec.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, efe67e9 fix(build): resolve component t…, tenant-context.ts, TenantContext]
- "20260716164323_init_migration_cart_items": "cart_items" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L149 | neighbors=[migration.sql, carts, product_variants, tenants]
- "20260716164323_init_migration_carts": "carts" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L137 | neighbors=[migration.sql, cart_items, customers, tenants]
- "20260716164323_init_migration_customers": "customers" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L125 | neighbors=[migration.sql, carts, tenants, orders]
- "20260716164323_init_migration_order_items": "order_items" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L178 | neighbors=[migration.sql, orders, product_variants, tenants]
- "20260716164323_init_migration_products": "products" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L83 | neighbors=[migration.sql, product_variants, categories, tenants]
- "20260716164323_init_migration_stock_reservations": "stock_reservations" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L228 | neighbors=[migration.sql, orders, product_variants, tenants]
- "20260716164323_init_migration_users": "users" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L61 | neighbors=[migration.sql, audit_log, roles, tenants]
- "api_client_apierror": "ApiError" | kind=code-symbol | source=apps/admin/src/lib/api/client.ts:L1 | neighbors=[client.ts, .constructor(), request(), index.ts]
- "api_client_request": "request()" | kind=code-symbol | source=apps/admin/src/lib/api/client.ts:L29 | neighbors=[client.ts, ApiError, getToken(), processQueue()]
- "api_orders_order": "Order" | kind=code-symbol | source=apps/admin/src/lib/api/orders.ts:L11 | neighbors=[dashboard.ts, index.ts, orders.ts, invoice.ts]
- "audit_log_audit_log_controller": "audit-log.controller.ts" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.controller.ts:L1 | neighbors=[AuditLogController, tenant-context.ts, TenantContext, 3d66d0f feat: implement payments module…]
- "audit_log_audit_log_service": "audit-log.service.ts" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.service.ts:L1 | neighbors=[AuditLogService, tenant-context.ts, TenantContext, 3d66d0f feat: implement payments module…]
- "audit_log_audit_log_service_auditlogservice": "AuditLogService" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.service.ts:L6 | neighbors=[audit-log.service.ts, .constructor(), .list(), .log()]
- "b2b_b2b_controller_b2bcontroller": "B2bController" | kind=code-symbol | source=apps/api/src/modules/business/b2b/b2b.controller.ts:L9 | neighbors=[b2b.controller.ts, .constructor(), .getCompanies(), .getPriceLists()]
- "b2b_b2b_service_b2bservice": "B2bService" | kind=code-symbol | source=apps/api/src/modules/business/b2b/b2b.service.ts:L7 | neighbors=[b2b.service.ts, .constructor(), .getCompanies(), .getPriceLists()]
- "b2b_draftorderspage": "DraftOrdersPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/b2b/DraftOrdersPage.tsx:L1 | neighbors=[DraftOrdersPage(), DraftOrdersTable(), 7d74efe feat(commerce): implement B2B, …, bb61ae8 feat(commerce): wire up Admin U…]
- "cache_tenant_cache_service_tenantcacheservice_generatekey": ".generateKey()" | kind=code-symbol | source=apps/api/src/common/cache/tenant-cache.service.ts:L9 | neighbors=[TenantCacheService, .del(), .get(), .set()]
- "checkout_checkout_controller": "checkout.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.controller.ts:L1 | neighbors=[CheckoutController, tenant-context.ts, TenantContext, 3d66d0f feat: implement payments module…]
- "commit:repo:github.com/al-rasels/commerce-os-core@24a34d045a14d261a746ac5d5928be948832036d": "24a34d0 docs: initialize enterprise plan, system design documentation, and API …" | kind=Commit | source=git | neighbors=[feat/admin-ui-refactor, main, 57631e5 docs: add UI specifications, ag…, b6a4088 docs: add initial implementatio…]
- "commit:repo:github.com/al-rasels/commerce-os-core@39bac8e1aa8ff382bccf8de537230e7af6e9d136": "39bac8e docs: initialize architecture, data contracts, and project documentatio…" | kind=Commit | source=git | neighbors=[21888ff feat: implement commerce, catal…, feat/admin-ui-refactor, main, 8edc82c docs: initialize core architect…]
- "commit:repo:github.com/al-rasels/commerce-os-core@49b2dd18fbce0da28e025e428953bc048c8267e4": "49b2dd1 chore: add graphify folder" | kind=Commit | source=git | neighbors=[feat/admin-ui-refactor, main, 4ece707 feat(admin): port UI components…, bb279ee fix(ci): fix api tests and lint…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-008.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
