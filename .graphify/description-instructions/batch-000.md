# Node Description Batch 1 of 8

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

- "references_utility_types": "utility-types.ts" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, Arguments, AssertEqual, assertNever(), AsyncFunction, AtLeast]
- "commit:repo:github.com/al-rasels/commerce-os-core@21888ffb23779b07f32963183c44ce6370a86d5d": "21888ff feat: implement commerce, catalog, and experience modules while expandi…" | kind=Commit | source=git | neighbors=[028709f chore: scaffold monorepo with a…, auth.controller.ts, auth.module.ts, auth.service.ts, main, builder.controller.ts]
- "commit:repo:github.com/al-rasels/commerce-os-core@028709f854a3575703e15665786345cd1245396c": "028709f chore: scaffold monorepo with apps, shared packages, and agent-driven d…" | kind=Commit | source=git | neighbors=[vite.config.ts, eslint.config.mjs, layout.tsx, page.tsx, main, 21888ff feat: implement commerce, catal…]
- "shared_types_index": "index.ts" | kind=code-symbol | source=packages/shared-types/index.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, Category, CategorySchema, Product, ProductSchema, ProductVariant]
- "branch:repo:github.com/al-rasels/commerce-os-core#main": "main" | kind=Branch | source=git | neighbors=[028709f chore: scaffold monorepo with a…, 21888ff feat: implement commerce, catal…, 24a34d0 docs: initialize enterprise pla…, 39bac8e docs: initialize architecture, …, 8c8bb73 docs: add UI component creation…, 8edc82c docs: initialize core architect…]
- "scripts_ts_diagnostic": "ts_diagnostic.py" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L1 | neighbors=[21888ff feat: implement commerce, catal…, check_any_usage(), check_monorepo(), check_performance(), check_tooling(), check_tsconfig()]
- "repositories_tenant_scoped_repository": "tenant-scoped.repository.ts" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, constructor(), create(), findMany(), findUnique(), scope()]
- "tenant_tenant_context_tenantcontext": "TenantContext" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-context.ts:L1 | neighbors=[auth.service.ts, builder.controller.ts, catalog.controller.ts, tenant-context.decorator.ts, tenant-context.middleware.ts, tenant-scoped.repository.ts]
- "scripts_ts_diagnostic_main": "main()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L184 | neighbors=[ts_diagnostic.py, check_any_usage(), check_monorepo(), check_performance(), check_tooling(), check_tsconfig()]
- "jetski_gemini_loader_loader": "loader.mjs" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L1 | neighbors=[21888ff feat: implement commerce, catal…, assertValidMaxSkills(), buildModelMessages(), collectReferencedSkillIds(), loadSkillBodies(), loadSkillIndex()]
- "scripts_ts_diagnostic_run_cmd": "run_cmd()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L13 | neighbors=[ts_diagnostic.py, check_any_usage(), check_performance(), check_type_assertions(), check_type_errors(), check_versions()]
- "tenant_tenant_context": "tenant-context.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-context.ts:L1 | neighbors=[auth.service.ts, catalog.controller.ts, 21888ff feat: implement commerce, catal…, tenant-context.decorator.ts, tenant-context.middleware.ts, tenant-scoped.repository.ts]
- "catalog_catalog_controller_catalogcontroller": "CatalogController" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L12 | neighbors=[catalog.controller.ts, .constructor(), .createCategory(), .createProduct(), .listCategories(), .listProducts()]
- "catalog_catalog_service_catalogservice": "CatalogService" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L9 | neighbors=[catalog.service.ts, .constructor(), .createCategory(), .createProduct(), .listCategories(), .listProducts()]
- "theme_engine_index": "index.ts" | kind=code-symbol | source=packages/theme-engine/index.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, detectConflicts(), MergeResult, resolveOverride(), index.spec.ts, theme.service.ts]
- "app_layout": "layout.tsx" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L1 | neighbors=[geistMono, geistSans, metadata, RootLayout(), 028709f chore: scaffold monorepo with a…]
- "guards_tenant_auth_guard_tenantauthguard": "TenantAuthGuard" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/tenant-auth.guard.ts:L12 | neighbors=[tenant-auth.guard.ts, CanActivate, .canActivate(), .constructor(), .extractTokenFromHeader()]
- "jetski_gemini_loader_loader_buildmodelmessages": "buildModelMessages()" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L118 | neighbors=[loader.mjs, assertValidMaxSkills(), collectReferencedSkillIds(), loadSkillBodies(), resolveSkillsFromMessages()]
- "scripts_api_validator": "api_validator.py" | kind=code-symbol | source=.agents/skills/api-patterns/scripts/api_validator.py:L1 | neighbors=[21888ff feat: implement commerce, catal…, check_api_code(), check_openapi_spec(), find_api_files(), main()]
- "auth_auth_service": "auth.service.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L1 | neighbors=[AuthService, tenant-context.ts, TenantContext, 21888ff feat: implement commerce, catal…]
- "builder_builder_controller_buildercontroller": "BuilderController" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.controller.ts:L9 | neighbors=[builder.controller.ts, .constructor(), .getPageLayout(), .updatePageLayout()]
- "builder_builder_service_builderservice": "BuilderService" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.service.ts:L6 | neighbors=[builder.service.ts, .constructor(), .getPageLayout(), .updatePageLayout()]
- "catalog_catalog_controller": "catalog.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L1 | neighbors=[CatalogController, tenant-context.ts, TenantContext, 21888ff feat: implement commerce, catal…]
- "decorators_tenant_context_decorator": "tenant-context.decorator.ts" | kind=code-symbol | source=apps/api/src/common/decorators/tenant-context.decorator.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, GetTenantContext, tenant-context.ts, TenantContext]
- "guards_permission_guard_permissionguard": "PermissionGuard" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/permission.guard.ts:L6 | neighbors=[permission.guard.ts, CanActivate, .canActivate(), .constructor()]
- "jetski_gemini_loader_loader_resolveskillsfrommessages": "resolveSkillsFromMessages()" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L59 | neighbors=[loader.mjs, buildModelMessages(), assertValidMaxSkills(), collectReferencedSkillIds()]
- "middlewares_host_resolver_middleware_hostresolvermiddleware": "HostResolverMiddleware" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/host-resolver.middleware.ts:L6 | neighbors=[host-resolver.middleware.ts, .constructor(), .use(), NestMiddleware]
- "middlewares_tenant_context_middleware": "tenant-context.middleware.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/tenant-context.middleware.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, TenantContextMiddleware, tenant-context.ts, TenantContext]
- "middlewares_tenant_context_middleware_tenantcontextmiddleware": "TenantContextMiddleware" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/middlewares/tenant-context.middleware.ts:L7 | neighbors=[tenant-context.middleware.ts, NestMiddleware, .constructor(), .use()]
- "prisma_prisma_service_prismaservice": "PrismaService" | kind=code-symbol | source=apps/api/src/prisma/prisma.service.ts:L5 | neighbors=[prisma.service.ts, OnModuleInit, PrismaClient, .onModuleInit()]
- "repositories_page_layout_repository_pagelayoutrepository": "PageLayoutRepository" | kind=code-symbol | source=apps/api/src/modules/experience/builder/repositories/page-layout.repository.ts:L7 | neighbors=[page-layout.repository.ts, .constructor(), .findByPageKey(), TenantScopedRepository]
- "scripts_api_validator_main": "main()" | kind=code-symbol | source=.agents/skills/api-patterns/scripts/api_validator.py:L162 | neighbors=[api_validator.py, check_api_code(), check_openapi_spec(), find_api_files()]
- "scripts_schema_validator": "schema_validator.py" | kind=code-symbol | source=.agents/skills/database-design/scripts/schema_validator.py:L1 | neighbors=[21888ff feat: implement commerce, catal…, find_schema_files(), main(), validate_prisma_schema()]
- "scripts_ts_diagnostic_check_any_usage": "check_any_usage()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L145 | neighbors=[ts_diagnostic.py, run_cmd(), main(), Check for any type usage.]
- "scripts_ts_diagnostic_check_performance": "check_performance()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L172 | neighbors=[ts_diagnostic.py, run_cmd(), main(), Check type checking performance.]
- "scripts_ts_diagnostic_check_type_assertions": "check_type_assertions()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L160 | neighbors=[ts_diagnostic.py, run_cmd(), main(), Check for type assertions.]
- "scripts_ts_diagnostic_check_type_errors": "check_type_errors()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L132 | neighbors=[ts_diagnostic.py, run_cmd(), main(), Run quick type check.]
- "scripts_ts_diagnostic_check_versions": "check_versions()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L21 | neighbors=[ts_diagnostic.py, run_cmd(), main(), Check TypeScript and Node versions.]
- "systematic_debugging_condition_based_waiting_example": "condition-based-waiting-example.ts" | kind=code-symbol | source=.agents/skills/systematic-debugging/condition-based-waiting-example.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, waitForEvent(), waitForEventCount(), waitForEventMatch()]
- "theme_engine_index_resolveoverride": "resolveOverride()" | kind=code-symbol | source=packages/theme-engine/index.ts:L8 | neighbors=[index.ts, detectConflicts(), index.spec.ts, theme.service.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-000.json

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
