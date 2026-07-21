# Node Description Batch 4 of 8

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

- "theme_engine_index_detectconflicts": "detectConflicts()" | kind=code-symbol | source=packages/theme-engine/index.ts:L24 | neighbors=[index.ts, resolveOverride()]
- "theme_theme_module": "theme.module.ts" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.module.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, ThemeModule]
- "admin_vite_config": "vite.config.ts" | kind=code-symbol | source=apps/admin/vite.config.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…]
- "api_eslint_config": "eslint.config.mjs" | kind=code-symbol | source=apps/api/eslint.config.mjs:L1 | neighbors=[028709f chore: scaffold monorepo with a…]
- "app_layout_geistmono": "geistMono" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L10 | neighbors=[layout.tsx]
- "app_layout_geistsans": "geistSans" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L5 | neighbors=[layout.tsx]
- "app_layout_metadata": "metadata" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L15 | neighbors=[layout.tsx]
- "app_layout_rootlayout": "RootLayout()" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L20 | neighbors=[layout.tsx]
- "app_page_home": "Home()" | kind=code-symbol | source=apps/storefront/src/app/page.tsx:L3 | neighbors=[page.tsx]
- "auth_auth_controller_authcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L6 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_login": ".login()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L9 | neighbors=[AuthController]
- "auth_auth_module_authmodule": "AuthModule" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.module.ts:L18 | neighbors=[auth.module.ts]
- "auth_auth_service_authservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L9 | neighbors=[AuthService]
- "auth_auth_service_authservice_login": ".login()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L14 | neighbors=[AuthService]
- "builder_builder_controller_buildercontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.controller.ts:L10 | neighbors=[BuilderController]
- "builder_builder_controller_buildercontroller_getpagelayout": ".getPageLayout()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.controller.ts:L14 | neighbors=[BuilderController]
- "builder_builder_controller_buildercontroller_updatepagelayout": ".updatePageLayout()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.controller.ts:L24 | neighbors=[BuilderController]
- "builder_builder_module_buildermodule": "BuilderModule" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.module.ts:L13 | neighbors=[builder.module.ts]
- "builder_builder_service_builderservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.service.ts:L7 | neighbors=[BuilderService]
- "builder_builder_service_builderservice_getpagelayout": ".getPageLayout()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.service.ts:L9 | neighbors=[BuilderService]
- "builder_builder_service_builderservice_updatepagelayout": ".updatePageLayout()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.service.ts:L17 | neighbors=[BuilderService]
- "catalog_catalog_controller_catalogcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L13 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_createcategory": ".createCategory()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L32 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_createproduct": ".createProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L17 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_listcategories": ".listCategories()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L41 | neighbors=[CatalogController]
- "catalog_catalog_controller_catalogcontroller_listproducts": ".listProducts()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L26 | neighbors=[CatalogController]
- "catalog_catalog_e2e_spec": "catalog.e2e-spec.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.e2e-spec.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…]
- "catalog_catalog_module_catalogmodule": "CatalogModule" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.module.ts:L14 | neighbors=[catalog.module.ts]
- "catalog_catalog_service_catalogservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L10 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_createcategory": ".createCategory()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L27 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_createproduct": ".createProduct()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L15 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_listcategories": ".listCategories()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L35 | neighbors=[CatalogService]
- "catalog_catalog_service_catalogservice_listproducts": ".listProducts()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L23 | neighbors=[CatalogService]
- "commerce_commerce_module_commercemodule": "CommerceModule" | kind=code-symbol | source=apps/api/src/modules/commerce/commerce.module.ts:L9 | neighbors=[commerce.module.ts]
- "components_registry_componentregistry": "componentRegistry" | kind=code-symbol | source=packages/components/registry.ts:L2 | neighbors=[registry.ts]
- "components_utils_cn": "cn()" | kind=code-symbol | source=packages/components/utils.ts:L4 | neighbors=[utils.ts]
- "decorators_permissions_decorator_requirepermissions": "RequirePermissions()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/decorators/permissions.decorator.ts:L4 | neighbors=[permissions.decorator.ts]
- "decorators_tenant_context_decorator_gettenantcontext": "GetTenantContext" | kind=code-symbol | source=apps/api/src/common/decorators/tenant-context.decorator.ts:L4 | neighbors=[tenant-context.decorator.ts]
- "design_tokens_index_tokens": "tokens" | kind=code-symbol | source=packages/design-tokens/index.ts:L2 | neighbors=[index.ts]
- "dto_create_category_dto_createcategorydto": "CreateCategoryDto" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/create-category.dto.ts:L3 | neighbors=[create-category.dto.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-003.json

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
