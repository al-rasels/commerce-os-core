# Node Description Batch 7 of 37

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

- "ui_separator": "separator.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/separator.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), Separator()]
- "ui_skeleton": "skeleton.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/skeleton.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), Skeleton()]
- "ui_switch": "switch.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/switch.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), Switch()]
- "ui_textarea": "textarea.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/textarea.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), Textarea()]
- "users_users_controller": "users.controller.ts" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.controller.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, e3a8c77 feat: implement users CRUD back…, tenant-context.ts, TenantContext, UsersController]
- "users_users_service": "users.service.ts" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.service.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, e3a8c77 feat: implement users CRUD back…, tenant-context.ts, TenantContext, UsersService]
- "20260716164323_init_migration_cart_items": "cart_items" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L149 | neighbors=[migration.sql, carts, product_variants, tenants]
- "20260716164323_init_migration_carts": "carts" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L137 | neighbors=[migration.sql, cart_items, customers, tenants]
- "20260716164323_init_migration_customers": "customers" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L125 | neighbors=[migration.sql, carts, tenants, orders]
- "20260716164323_init_migration_order_items": "order_items" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L178 | neighbors=[migration.sql, orders, product_variants, tenants]
- "20260716164323_init_migration_products": "products" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L83 | neighbors=[migration.sql, product_variants, categories, tenants]
- "20260716164323_init_migration_stock_reservations": "stock_reservations" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L228 | neighbors=[migration.sql, orders, product_variants, tenants]
- "20260716164323_init_migration_users": "users" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L61 | neighbors=[migration.sql, audit_log, roles, tenants]
- "api_client_apierror": "ApiError" | kind=code-symbol | source=apps/admin/src/lib/api/client.ts:L1 | neighbors=[client.ts, .constructor(), request(), index.ts]
- "api_orders_order": "Order" | kind=code-symbol | source=apps/admin/src/lib/api/orders.ts:L11 | neighbors=[dashboard.ts, index.ts, orders.ts, invoice.ts]
- "audit_log_audit_log_controller": "audit-log.controller.ts" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.controller.ts:L1 | neighbors=[AuditLogController, tenant-context.ts, TenantContext, 3d66d0f feat: implement payments module…]
- "audit_log_audit_log_service": "audit-log.service.ts" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.service.ts:L1 | neighbors=[AuditLogService, tenant-context.ts, TenantContext, 3d66d0f feat: implement payments module…]
- "audit_log_audit_log_service_auditlogservice": "AuditLogService" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.service.ts:L6 | neighbors=[audit-log.service.ts, .constructor(), .list(), .log()]
- "auth_auth_module": "auth.module.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.module.ts:L1 | neighbors=[AuthModule, 21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …]
- "cache_tenant_cache_service_tenantcacheservice_generatekey": ".generateKey()" | kind=code-symbol | source=apps/api/src/common/cache/tenant-cache.service.ts:L9 | neighbors=[TenantCacheService, .del(), .get(), .set()]
- "checkout_checkout_controller": "checkout.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.controller.ts:L1 | neighbors=[CheckoutController, tenant-context.ts, TenantContext, 3d66d0f feat: implement payments module…]
- "commit:repo:github.com/al-rasels/commerce-os-core@d6163bc8b13f9aeaff47c22fa5795fb17e01f788": "d6163bc docs: update PROGRESS_REPORT.md and MASTER_TASKLIST.md to July 20 state" | kind=Commit | source=git | neighbors=[main, 6ffba43 feat: add MFA auth flow, super …, tenant-admin.controller.ts, f1d1a16 feat: implement storefront foun…]
- "components_pagination_pagination": "Pagination()" | kind=code-symbol | source=packages/components/pagination.tsx:L25 | neighbors=[pagination.tsx, getPageNumbers(), pagination.spec.tsx, registry.ts]
- "components_tenant_theme_provider": "tenant-theme-provider.tsx" | kind=code-symbol | source=apps/storefront/src/components/tenant-theme-provider.tsx:L1 | neighbors=[layout.tsx, e5d6c72 feat: implement end-to-end chec…, ResolvedTheme, TenantThemeProvider()]
- "customer_customer_repository": "customer.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.repository.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, e3a8c77 feat: implement users CRUD back…, CustomerRepository]
- "customer_customer_repository_customerrepository": "CustomerRepository" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.repository.ts:L7 | neighbors=[customer.repository.ts, .constructor(), .findByIdWithOrders(), TenantScopedRepository]
- "customers_customerdetailpage": "CustomerDetailPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/customers/CustomerDetailPage.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, e3a8c77 feat: implement users CRUD back…, CustomerDetailPage(), statusVariant]
- "dashboard_dashboard_module": "dashboard.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/dashboard/dashboard.module.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, 92e2c6a feat: add checkout tenant isola…, ac49c08 chore: batch commit — catalog C…, DashboardModule]
- "decorators_tenant_context_decorator": "tenant-context.decorator.ts" | kind=code-symbol | source=apps/api/src/common/decorators/tenant-context.decorator.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, GetTenantContext, tenant-context.ts, TenantContext]
- "design_tokens_index": "index.ts" | kind=code-symbol | source=packages/design-tokens/index.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, tokens]
- "dto_create_product_dto": "create-product.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/create-product.dto.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, CreateProductDto]
- "guards_permission_guard_permissionguard": "PermissionGuard" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/permission.guard.ts:L6 | neighbors=[permission.guard.ts, CanActivate, .canActivate(), .constructor()]
- "hooks_usetheme": "useTheme.ts" | kind=code-symbol | source=apps/admin/src/hooks/useTheme.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, useSaveThemeOverride(), useTheme()]
- "jetski_gemini_loader_loader_resolveskillsfrommessages": "resolveSkillsFromMessages()" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L59 | neighbors=[loader.mjs, buildModelMessages(), assertValidMaxSkills(), collectReferencedSkillIds()]
- "lib_api_apierror": "ApiError" | kind=code-symbol | source=apps/storefront/src/lib/api.ts:L3 | neighbors=[api.ts, .constructor(), authRequest(), request()]
- "lib_server_api_serverapi": "serverApi" | kind=code-symbol | source=apps/storefront/src/lib/server-api.ts:L33 | neighbors=[layout.tsx, page.tsx, server-api.ts, page.tsx]
- "middlewares_host_resolver_middleware_hostresolvermiddleware": "HostResolverMiddleware" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/host-resolver.middleware.ts:L6 | neighbors=[host-resolver.middleware.ts, .constructor(), .use(), NestMiddleware]
- "middlewares_tenant_context_middleware_tenantcontextmiddleware": "TenantContextMiddleware" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/tenant-context.middleware.ts:L9 | neighbors=[tenant-context.middleware.ts, NestMiddleware, .use(), .constructor()]
- "page_editor_propeditor": "PropEditor.tsx" | kind=code-symbol | source=apps/admin/src/components/page-editor/PropEditor.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, index.ts, PropEditor(), PropEditorProps]
- "page_editor_sectioncard": "SectionCard.tsx" | kind=code-symbol | source=apps/admin/src/components/page-editor/SectionCard.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, index.ts, SectionCard(), SectionCardProps]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-006.json

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
