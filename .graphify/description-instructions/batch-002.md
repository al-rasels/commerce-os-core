# Node Description Batch 3 of 8

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

- "theme_engine_index_spec": "index.spec.ts" | kind=code-symbol | source=packages/theme-engine/index.spec.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, index.ts, resolveOverride()]
- "theme_theme_controller": "theme.controller.ts" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.controller.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, TenantContext, ThemeController]
- "app_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/page.tsx:L1 | neighbors=[Home(), 028709f chore: scaffold monorepo with a…]
- "auth_auth_controller": "auth.controller.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L1 | neighbors=[AuthController, 21888ff feat: implement commerce, catal…]
- "auth_auth_module": "auth.module.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.module.ts:L1 | neighbors=[AuthModule, 21888ff feat: implement commerce, catal…]
- "builder_builder_module": "builder.module.ts" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.module.ts:L1 | neighbors=[BuilderModule, 21888ff feat: implement commerce, catal…]
- "builder_builder_service": "builder.service.ts" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.service.ts:L1 | neighbors=[BuilderService, 21888ff feat: implement commerce, catal…]
- "catalog_catalog_module": "catalog.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.module.ts:L1 | neighbors=[CatalogModule, 21888ff feat: implement commerce, catal…]
- "catalog_catalog_service": "catalog.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L1 | neighbors=[CatalogService, 21888ff feat: implement commerce, catal…]
- "commerce_commerce_module": "commerce.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/commerce.module.ts:L1 | neighbors=[CommerceModule, 21888ff feat: implement commerce, catal…]
- "commit:repo:github.com/al-rasels/commerce-os-core@24a34d045a14d261a746ac5d5928be948832036d": "24a34d0 docs: initialize enterprise plan, system design documentation, and API …" | kind=Commit | source=git | neighbors=[main, b6a4088 docs: add initial implementatio…]
- "commit:repo:github.com/al-rasels/commerce-os-core@e425b0fe05c57b1d70b777d9bf2ad1286a3a0a59": "e425b0f docs: upload -docs" | kind=Commit | source=git | neighbors=[main, c6b41a4 docs: upload -docs]
- "decorators_permissions_decorator": "permissions.decorator.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/decorators/permissions.decorator.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, RequirePermissions()]
- "design_tokens_index": "index.ts" | kind=code-symbol | source=packages/design-tokens/index.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, tokens]
- "dto_create_category_dto": "create-category.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/create-category.dto.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, CreateCategoryDto]
- "dto_create_product_dto": "create-product.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/create-product.dto.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, CreateProductDto]
- "experience_experience_module": "experience.module.ts" | kind=code-symbol | source=apps/api/src/modules/experience/experience.module.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, ExperienceModule]
- "guards_permission_guard": "permission.guard.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/permission.guard.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, PermissionGuard]
- "guards_tenant_auth_guard": "tenant-auth.guard.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/tenant-auth.guard.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, TenantAuthGuard]
- "guards_tenant_auth_guard_tenantauthguard_canactivate": ".canActivate()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/tenant-auth.guard.ts:L15 | neighbors=[TenantAuthGuard, .extractTokenFromHeader()]
- "guards_tenant_auth_guard_tenantauthguard_extracttokenfromheader": ".extractTokenFromHeader()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/tenant-auth.guard.ts:L40 | neighbors=[TenantAuthGuard, .canActivate()]
- "jetski_gemini_loader_loader_loadskillbodies": "loadSkillBodies()" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L77 | neighbors=[loader.mjs, buildModelMessages()]
- "middlewares_host_resolver_middleware": "host-resolver.middleware.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/host-resolver.middleware.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, HostResolverMiddleware]
- "platform_platform_module": "platform.module.ts" | kind=code-symbol | source=apps/api/src/modules/platform/platform.module.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, PlatformModule]
- "prisma_prisma_module": "prisma.module.ts" | kind=code-symbol | source=apps/api/src/prisma/prisma.module.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, PrismaModule]
- "prisma_prisma_service": "prisma.service.ts" | kind=code-symbol | source=apps/api/src/prisma/prisma.service.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, PrismaService]
- "repositories_category_repository": "category.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/category.repository.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, CategoryRepository]
- "repositories_page_layout_repository": "page-layout.repository.ts" | kind=code-symbol | source=apps/api/src/modules/experience/builder/repositories/page-layout.repository.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, PageLayoutRepository]
- "repositories_product_repository": "product.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/product.repository.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, ProductRepository]
- "repositories_tenant_scoped_repository_findmany": "findMany()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L16 | neighbors=[tenant-scoped.repository.ts, scope()]
- "repositories_tenant_scoped_repository_findunique": "findUnique()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L24 | neighbors=[tenant-scoped.repository.ts, update()]
- "repositories_tenant_scoped_repository_scope": "scope()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L12 | neighbors=[tenant-scoped.repository.ts, findMany()]
- "repositories_tenant_scoped_repository_softdelete": "softDelete()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L51 | neighbors=[tenant-scoped.repository.ts, update()]
- "repositories_theme_override_repository": "theme-override.repository.ts" | kind=code-symbol | source=apps/api/src/modules/experience/theme/repositories/theme-override.repository.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, ThemeTenantOverrideRepository]
- "src_app_controller": "app.controller.ts" | kind=code-symbol | source=apps/api/src/app.controller.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, AppController]
- "src_app_service": "app.service.ts" | kind=code-symbol | source=apps/api/src/app.service.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, AppService]
- "src_app_service_appservice": "AppService" | kind=code-symbol | source=apps/api/src/app.service.ts:L4 | neighbors=[app.service.ts, .getHello()]
- "storefront_eslint_config": "eslint.config.mjs" | kind=code-symbol | source=apps/storefront/eslint.config.mjs:L1 | neighbors=[028709f chore: scaffold monorepo with a…, eslintConfig]
- "storefront_next_config": "next.config.ts" | kind=code-symbol | source=apps/storefront/next.config.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, nextConfig]
- "storefront_postcss_config": "postcss.config.mjs" | kind=code-symbol | source=apps/storefront/postcss.config.mjs:L1 | neighbors=[028709f chore: scaffold monorepo with a…, config]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-002.json

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
