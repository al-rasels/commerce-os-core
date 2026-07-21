# Node Description Batch 11 of 37

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

- "promotions_promotion_repository_promotionrepository": "PromotionRepository" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotion.repository.ts:L6 | neighbors=[promotion.repository.ts, .constructor(), TenantScopedRepository]
- "redis_redis_service": "redis.service.ts" | kind=code-symbol | source=apps/api/src/modules/platform/redis/redis.service.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, RedisService]
- "repositories_cart_repository_cartrepository": "CartRepository" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/repositories/cart.repository.ts:L7 | neighbors=[cart.repository.ts, .constructor(), TenantScopedRepository]
- "repositories_cart_repository_spec": "cart.repository.spec.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/repositories/cart.repository.spec.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, TenantContext]
- "repositories_category_repository_categoryrepository": "CategoryRepository" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/category.repository.ts:L7 | neighbors=[category.repository.ts, .constructor(), TenantScopedRepository]
- "repositories_page_layout_repository_spec": "page-layout.repository.spec.ts" | kind=code-symbol | source=apps/api/src/modules/experience/builder/repositories/page-layout.repository.spec.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …]
- "repositories_product_repository_productrepository": "ProductRepository" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/product.repository.ts:L7 | neighbors=[product.repository.ts, .constructor(), TenantScopedRepository]
- "repositories_tenant_scoped_repository_spec_testrepo": "TestRepo" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.spec.ts:L4 | neighbors=[tenant-scoped.repository.spec.ts, TenantScopedRepository, .constructor()]
- "repositories_tenant_scoped_repository_update": "update()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L65 | neighbors=[tenant-scoped.repository.ts, softDelete(), findUnique()]
- "repositories_theme_override_repository": "theme-override.repository.ts" | kind=code-symbol | source=apps/api/src/modules/experience/theme/repositories/theme-override.repository.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 3d66d0f feat: implement payments module…, ThemeTenantOverrideRepository]
- "repositories_theme_override_repository_spec": "theme-override.repository.spec.ts" | kind=code-symbol | source=apps/api/src/modules/experience/theme/repositories/theme-override.repository.spec.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, TenantContext]
- "repositories_theme_override_repository_themetenantoverriderepository": "ThemeTenantOverrideRepository" | kind=code-symbol | source=apps/api/src/modules/experience/theme/repositories/theme-override.repository.ts:L7 | neighbors=[theme-override.repository.ts, TenantScopedRepository, .constructor()]
- "scripts_api_validator_check_api_code": "check_api_code()" | kind=code-symbol | source=.agents/skills/api-patterns/scripts/api_validator.py:L94 | neighbors=[api_validator.py, main(), Check API code for common issues.]
- "scripts_api_validator_check_openapi_spec": "check_openapi_spec()" | kind=code-symbol | source=.agents/skills/api-patterns/scripts/api_validator.py:L37 | neighbors=[api_validator.py, main(), Check OpenAPI/Swagger specification.]
- "scripts_api_validator_find_api_files": "find_api_files()" | kind=code-symbol | source=.agents/skills/api-patterns/scripts/api_validator.py:L18 | neighbors=[api_validator.py, main(), Find API-related files.]
- "scripts_lighthouse_audit": "lighthouse_audit.py" | kind=code-symbol | source=.agents/skills/performance-profiling/scripts/lighthouse_audit.py:L1 | neighbors=[21888ff feat: implement commerce, catal…, get_summary(), run_lighthouse()]
- "scripts_lighthouse_audit_get_summary": "get_summary()" | kind=code-symbol | source=.agents/skills/performance-profiling/scripts/lighthouse_audit.py:L60 | neighbors=[lighthouse_audit.py, Generate summary based on scores., run_lighthouse()]
- "scripts_lighthouse_audit_run_lighthouse": "run_lighthouse()" | kind=code-symbol | source=.agents/skills/performance-profiling/scripts/lighthouse_audit.py:L16 | neighbors=[lighthouse_audit.py, Run Lighthouse audit on URL., get_summary()]
- "scripts_schema_validator_find_schema_files": "find_schema_files()" | kind=code-symbol | source=.agents/skills/database-design/scripts/schema_validator.py:L29 | neighbors=[schema_validator.py, main(), Find database schema files.]
- "scripts_schema_validator_main": "main()" | kind=code-symbol | source=.agents/skills/database-design/scripts/schema_validator.py:L94 | neighbors=[schema_validator.py, find_schema_files(), validate_prisma_schema()]
- "scripts_schema_validator_validate_prisma_schema": "validate_prisma_schema()" | kind=code-symbol | source=.agents/skills/database-design/scripts/schema_validator.py:L47 | neighbors=[schema_validator.py, main(), Validate Prisma schema file.]
- "scripts_ts_diagnostic_check_monorepo": "check_monorepo()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L111 | neighbors=[ts_diagnostic.py, main(), Check for monorepo configuration.]
- "scripts_ts_diagnostic_check_tooling": "check_tooling()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L74 | neighbors=[ts_diagnostic.py, main(), Detect TypeScript tooling ecosystem.]
- "scripts_ts_diagnostic_check_tsconfig": "check_tsconfig()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L32 | neighbors=[ts_diagnostic.py, main(), Analyze tsconfig.json settings.]
- "settings_pagelayouteditor": "PageLayoutEditor.tsx" | kind=code-symbol | source=apps/admin/src/pages/settings/PageLayoutEditor.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, createDefaultSection(), PageLayoutEditorPage()]
- "settings_pagelayoutlist": "PageLayoutList.tsx" | kind=code-symbol | source=apps/admin/src/pages/settings/PageLayoutList.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, knownPages, PageLayoutListPage()]
- "settings_shipping": "shipping.tsx" | kind=code-symbol | source=apps/admin/src/pages/settings/shipping.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 4ddc1b9 fix(build): resolve type and im…, ShippingSettingsPage()]
- "settings_tax": "tax.tsx" | kind=code-symbol | source=apps/admin/src/pages/settings/tax.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 4ddc1b9 fix(build): resolve type and im…, TaxSettingsPage()]
- "shipping_shipping_rule_repository": "shipping-rule.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping-rule.repository.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, e5d6c72 feat: implement end-to-end chec…, ShippingRuleRepository]
- "shipping_shipping_rule_repository_shippingrulerepository": "ShippingRuleRepository" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping-rule.repository.ts:L6 | neighbors=[shipping-rule.repository.ts, .constructor(), TenantScopedRepository]
- "slug_loading": "loading.tsx" | kind=code-symbol | source=apps/storefront/src/app/products/[slug]/loading.tsx:L1 | neighbors=[e5d6c72 feat: implement end-to-end chec…, index.ts, Loading()]
- "src_app_controller": "app.controller.ts" | kind=code-symbol | source=apps/api/src/app.controller.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 3d66d0f feat: implement payments module…, AppController]
- "storefront_eslint_config": "eslint.config.mjs" | kind=code-symbol | source=apps/storefront/eslint.config.mjs:L1 | neighbors=[028709f chore: scaffold monorepo with a…, f1d1a16 feat: implement storefront foun…, eslintConfig]
- "super_admin_tenantdetailpage": "TenantDetailPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/super-admin/TenantDetailPage.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 4ddc1b9 fix(build): resolve type and im…, TenantDetailPage()]
- "super_admin_tenantspage": "TenantsPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/super-admin/TenantsPage.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 4ddc1b9 fix(build): resolve type and im…, TenantsPage()]
- "tax_tax_rule_repository": "tax-rule.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax-rule.repository.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, e5d6c72 feat: implement end-to-end chec…, TaxRuleRepository]
- "tax_tax_rule_repository_taxrulerepository": "TaxRuleRepository" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax-rule.repository.ts:L6 | neighbors=[tax-rule.repository.ts, .constructor(), TenantScopedRepository]
- "theme_engine_index_spec": "index.spec.ts" | kind=code-symbol | source=packages/theme-engine/index.spec.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, index.ts, resolveOverride()]
- "theme_theme_module": "theme.module.ts" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.module.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…, ThemeModule]
- "users_role_repository_rolerepository": "RoleRepository" | kind=code-symbol | source=apps/api/src/modules/platform/users/role.repository.ts:L7 | neighbors=[role.repository.ts, .constructor(), TenantScopedRepository]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-010.json

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
