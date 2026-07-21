# Node Description Batch 12 of 37

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "users_userdetailpage": "UserDetailPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/users/UserDetailPage.tsx:L1 | neighbors=[e3a8c77 feat: implement users CRUD back…, statusVariant, UserDetailPage()]
- "users_userinvitepage": "UserInvitePage.tsx" | kind=code-symbol | source=apps/admin/src/pages/users/UserInvitePage.tsx:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, e3a8c77 feat: implement users CRUD back…, UserInvitePage()]
- "users_userlistpage": "UserListPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/users/UserListPage.tsx:L1 | neighbors=[e3a8c77 feat: implement users CRUD back…, statusVariant, UserListPage()]
- "users_users_module": "users.module.ts" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.module.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, e3a8c77 feat: implement users CRUD back…, UsersModule]
- "users_users_repository_spec": "users.repository.spec.ts" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.repository.spec.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, TenantContext]
- "users_users_service_usersservice_findmany": ".findMany()" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.service.ts:L123 | neighbors=[UsersService, .findByEmail(), .findRoleByName()]
- "users_users_service_usersservice_updateuser": ".updateUser()" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.service.ts:L141 | neighbors=[UsersService, .update(), .updateStatus()]
- "20260716164323_init_migration_feature_flags": "feature_flags" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L73 | neighbors=[migration.sql, tenants]
- "20260716164323_init_migration_page_layouts": "page_layouts" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L241 | neighbors=[migration.sql, tenants]
- "20260716164323_init_migration_template_base": "template_base" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L209 | neighbors=[migration.sql, template_tenant_override]
- "20260716164323_init_migration_tenant_domains": "tenant_domains" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L42 | neighbors=[migration.sql, tenants]
- "20260716164323_init_migration_theme_base": "theme_base" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L190 | neighbors=[migration.sql, theme_tenant_override]
- "admin_admin_module": "admin.module.ts" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.module.ts:L1 | neighbors=[AdminModule, 3571d3a feat(storefront): overhaul UI/U…]
- "api_catalog_catalogapi": "catalogApi" | kind=code-symbol | source=apps/admin/src/lib/api/catalog.ts:L62 | neighbors=[catalog.ts, index.ts]
- "api_catalog_category": "Category" | kind=code-symbol | source=apps/admin/src/lib/api/catalog.ts:L45 | neighbors=[catalog.ts, index.ts]
- "api_catalog_categoryinput": "CategoryInput" | kind=code-symbol | source=apps/admin/src/lib/api/catalog.ts:L55 | neighbors=[catalog.ts, index.ts]
- "api_catalog_product": "Product" | kind=code-symbol | source=apps/admin/src/lib/api/catalog.ts:L3 | neighbors=[catalog.ts, index.ts]
- "api_catalog_productinput": "ProductInput" | kind=code-symbol | source=apps/admin/src/lib/api/catalog.ts:L15 | neighbors=[catalog.ts, index.ts]
- "api_catalog_productvariant": "ProductVariant" | kind=code-symbol | source=apps/admin/src/lib/api/catalog.ts:L23 | neighbors=[catalog.ts, index.ts]
- "api_catalog_productvariantinput": "ProductVariantInput" | kind=code-symbol | source=apps/admin/src/lib/api/catalog.ts:L36 | neighbors=[catalog.ts, index.ts]
- "api_client_gettoken": "getToken()" | kind=code-symbol | source=apps/admin/src/lib/api/client.ts:L11 | neighbors=[client.ts, request()]
- "api_customers_customerapi": "customerApi" | kind=code-symbol | source=apps/admin/src/lib/api/customers.ts:L41 | neighbors=[customers.ts, index.ts]
- "api_customers_customerinput": "CustomerInput" | kind=code-symbol | source=apps/admin/src/lib/api/customers.ts:L35 | neighbors=[customers.ts, index.ts]
- "api_customers_customerlistresponse": "CustomerListResponse" | kind=code-symbol | source=apps/admin/src/lib/api/customers.ts:L12 | neighbors=[customers.ts, index.ts]
- "api_customers_listcustomersparams": "ListCustomersParams" | kind=code-symbol | source=apps/admin/src/lib/api/customers.ts:L29 | neighbors=[customers.ts, index.ts]
- "api_dashboard_dashboardapi": "dashboardApi" | kind=code-symbol | source=apps/admin/src/lib/api/dashboard.ts:L13 | neighbors=[dashboard.ts, index.ts]
- "api_dashboard_dashboardstats": "DashboardStats" | kind=code-symbol | source=apps/admin/src/lib/api/dashboard.ts:L4 | neighbors=[dashboard.ts, index.ts]
- "api_experience_resolvedtheme": "ResolvedTheme" | kind=code-symbol | source=apps/admin/src/lib/api/experience.ts:L3 | neighbors=[experience.ts, index.ts]
- "api_experience_themeapi": "themeApi" | kind=code-symbol | source=apps/admin/src/lib/api/experience.ts:L10 | neighbors=[experience.ts, index.ts]
- "api_orders_cantransition": "canTransition()" | kind=code-symbol | source=apps/admin/src/lib/api/orders.ts:L49 | neighbors=[index.ts, orders.ts]
- "api_orders_listordersparams": "ListOrdersParams" | kind=code-symbol | source=apps/admin/src/lib/api/orders.ts:L32 | neighbors=[index.ts, orders.ts]
- "api_orders_order_valid_transitions": "ORDER_VALID_TRANSITIONS" | kind=code-symbol | source=apps/admin/src/lib/api/orders.ts:L41 | neighbors=[index.ts, orders.ts]
- "api_orders_orderapi": "orderApi" | kind=code-symbol | source=apps/admin/src/lib/api/orders.ts:L53 | neighbors=[index.ts, orders.ts]
- "api_orders_orderitem": "OrderItem" | kind=code-symbol | source=apps/admin/src/lib/api/orders.ts:L3 | neighbors=[index.ts, orders.ts]
- "api_orders_orderlistresponse": "OrderListResponse" | kind=code-symbol | source=apps/admin/src/lib/api/orders.ts:L25 | neighbors=[index.ts, orders.ts]
- "api_pages_pagelayout": "PageLayout" | kind=code-symbol | source=apps/admin/src/lib/api/pages.ts:L10 | neighbors=[index.ts, pages.ts]
- "api_pages_pagesapi": "pagesApi" | kind=code-symbol | source=apps/admin/src/lib/api/pages.ts:L16 | neighbors=[index.ts, pages.ts]
- "api_pages_pagesection": "PageSection" | kind=code-symbol | source=apps/admin/src/lib/api/pages.ts:L3 | neighbors=[index.ts, pages.ts]
- "api_promotions_promotion": "Promotion" | kind=code-symbol | source=apps/admin/src/lib/api/promotions.ts:L3 | neighbors=[index.ts, promotions.ts]
- "api_promotions_promotionsapi": "promotionsApi" | kind=code-symbol | source=apps/admin/src/lib/api/promotions.ts:L16 | neighbors=[index.ts, promotions.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-011.json

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
