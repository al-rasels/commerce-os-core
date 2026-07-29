# Node Description Batch 15 of 51

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

- "shipping_shipping_rule_repository": "shipping-rule.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping-rule.repository.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, e5d6c72 feat: implement end-to-end chec…, ShippingRuleRepository]
- "shipping_shipping_rule_repository_shippingrulerepository": "ShippingRuleRepository" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping-rule.repository.ts:L6 | neighbors=[shipping-rule.repository.ts, .constructor(), TenantScopedRepository]
- "slug_loading": "loading.tsx" | kind=code-symbol | source=apps/storefront/src/app/products/[slug]/loading.tsx:L1 | neighbors=[e5d6c72 feat: implement end-to-end chec…, index.ts, Loading()]
- "src_app_controller": "app.controller.ts" | kind=code-symbol | source=apps/api/src/app.controller.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 3d66d0f feat: implement payments module…, AppController]
- "storefront_eslint_config": "eslint.config.mjs" | kind=code-symbol | source=apps/storefront/eslint.config.mjs:L1 | neighbors=[028709f chore: scaffold monorepo with a…, f1d1a16 feat: implement storefront foun…, eslintConfig]
- "storefront_next_config": "next.config.ts" | kind=code-symbol | source=apps/storefront/next.config.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, efe67e9 fix(build): resolve component t…, nextConfig]
- "subscriptions_subscriptions_controller_subscriptionscontroller": "SubscriptionsController" | kind=code-symbol | source=apps/api/src/modules/business/subscriptions/subscriptions.controller.ts:L9 | neighbors=[subscriptions.controller.ts, .constructor(), .getSubscriptions()]
- "subscriptions_subscriptions_module": "subscriptions.module.ts" | kind=code-symbol | source=apps/api/src/modules/business/subscriptions/subscriptions.module.ts:L1 | neighbors=[7d74efe feat(commerce): implement B2B, …, c506b3c feat(api): implement database r…, SubscriptionsModule]
- "subscriptions_subscriptions_service_subscriptionsservice": "SubscriptionsService" | kind=code-symbol | source=apps/api/src/modules/business/subscriptions/subscriptions.service.ts:L6 | neighbors=[subscriptions.service.ts, .constructor(), .getSubscriptions()]
- "subscriptions_subscriptionslistpage": "SubscriptionsListPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/subscriptions/SubscriptionsListPage.tsx:L1 | neighbors=[7d74efe feat(commerce): implement B2B, …, bb61ae8 feat(commerce): wire up Admin U…, SubscriptionsListPage()]
- "super_admin_tenantdetailpage": "TenantDetailPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/super-admin/TenantDetailPage.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 4ddc1b9 fix(build): resolve type and im…, TenantDetailPage()]
- "super_admin_tenantspage": "TenantsPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/super-admin/TenantsPage.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 4ddc1b9 fix(build): resolve type and im…, TenantsPage()]
- "tax_tax_rule_repository": "tax-rule.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax-rule.repository.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, e5d6c72 feat: implement end-to-end chec…, TaxRuleRepository]
- "tax_tax_rule_repository_taxrulerepository": "TaxRuleRepository" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax-rule.repository.ts:L6 | neighbors=[tax-rule.repository.ts, .constructor(), TenantScopedRepository]
- "test_tenant_isolation_e2e_spec": "tenant-isolation.e2e-spec.ts" | kind=code-symbol | source=apps/api/test/tenant-isolation.e2e-spec.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, efe67e9 fix(build): resolve component t…]
- "theme_engine_index_spec": "index.spec.ts" | kind=code-symbol | source=packages/theme-engine/index.spec.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, index.ts, resolveOverride()]
- "theme_theme_module": "theme.module.ts" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.module.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…, ThemeModule]
- "themes_bold": "bold.ts" | kind=code-symbol | source=packages/theme-engine/themes/bold.ts:L1 | neighbors=[efe67e9 fix(build): resolve component t…, index.ts, boldTheme]
- "themes_minimal": "minimal.ts" | kind=code-symbol | source=packages/theme-engine/themes/minimal.ts:L1 | neighbors=[efe67e9 fix(build): resolve component t…, index.ts, minimalTheme]
- "ui_chart_usechart": "useChart()" | kind=code-symbol | source=apps/admin/src/components/ui/chart.tsx:L31 | neighbors=[chart.tsx, ChartLegendContent(), ChartTooltipContent()]
- "ui_sidebar_sidebarmenubutton": "SidebarMenuButton()" | kind=code-symbol | source=apps/admin/src/components/ui/sidebar.tsx:L474 | neighbors=[sidebar.tsx, sidebarMenuButtonVariants, useSidebar()]
- "users_role_repository_rolerepository": "RoleRepository" | kind=code-symbol | source=apps/api/src/modules/platform/users/role.repository.ts:L7 | neighbors=[role.repository.ts, .constructor(), TenantScopedRepository]
- "users_userdetailpage": "UserDetailPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/users/UserDetailPage.tsx:L1 | neighbors=[e3a8c77 feat: implement users CRUD back…, statusVariant, UserDetailPage()]
- "users_userinvitepage": "UserInvitePage.tsx" | kind=code-symbol | source=apps/admin/src/pages/users/UserInvitePage.tsx:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, e3a8c77 feat: implement users CRUD back…, UserInvitePage()]
- "users_userlistpage": "UserListPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/users/UserListPage.tsx:L1 | neighbors=[e3a8c77 feat: implement users CRUD back…, statusVariant, UserListPage()]
- "users_users_service_usersservice_findmany": ".findMany()" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.service.ts:L123 | neighbors=[UsersService, .findByEmail(), .findRoleByName()]
- "users_users_service_usersservice_updateuser": ".updateUser()" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.service.ts:L143 | neighbors=[UsersService, .update(), .updateStatus()]
- "20260716164323_init_migration_feature_flags": "feature_flags" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L73 | neighbors=[migration.sql, tenants]
- "20260716164323_init_migration_page_layouts": "page_layouts" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L241 | neighbors=[migration.sql, tenants]
- "20260716164323_init_migration_template_base": "template_base" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L209 | neighbors=[migration.sql, template_tenant_override]
- "20260716164323_init_migration_tenant_domains": "tenant_domains" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L42 | neighbors=[migration.sql, tenants]
- "20260716164323_init_migration_theme_base": "theme_base" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L190 | neighbors=[migration.sql, theme_tenant_override]
- "admin_admin_module": "admin.module.ts" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.module.ts:L1 | neighbors=[AdminModule, 3571d3a feat(storefront): overhaul UI/U…]
- "api_b2b_b2bapi": "b2bApi" | kind=code-symbol | source=apps/admin/src/lib/api/b2b.ts:L25 | neighbors=[b2b.ts, index.ts]
- "api_b2b_companyprofile": "CompanyProfile" | kind=code-symbol | source=apps/admin/src/lib/api/b2b.ts:L3 | neighbors=[b2b.ts, index.ts]
- "api_b2b_companyprofileinput": "CompanyProfileInput" | kind=code-symbol | source=apps/admin/src/lib/api/b2b.ts:L16 | neighbors=[b2b.ts, index.ts]
- "api_catalog_catalogapi": "catalogApi" | kind=code-symbol | source=apps/admin/src/lib/api/catalog.ts:L64 | neighbors=[catalog.ts, index.ts]
- "api_catalog_category": "Category" | kind=code-symbol | source=apps/admin/src/lib/api/catalog.ts:L47 | neighbors=[catalog.ts, index.ts]
- "api_catalog_categoryinput": "CategoryInput" | kind=code-symbol | source=apps/admin/src/lib/api/catalog.ts:L57 | neighbors=[catalog.ts, index.ts]
- "api_catalog_product": "Product" | kind=code-symbol | source=apps/admin/src/lib/api/catalog.ts:L3 | neighbors=[catalog.ts, index.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-014.json

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
