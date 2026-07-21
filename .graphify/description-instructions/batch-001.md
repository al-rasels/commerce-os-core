# Node Description Batch 2 of 8

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
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "theme_theme_controller_themecontroller": "ThemeController" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.controller.ts:L9 | neighbors=[theme.controller.ts, .constructor(), .getTheme(), .updateOverride()] | lang=en
- "theme_theme_service": "theme.service.ts" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.service.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, index.ts, resolveOverride(), ThemeService] | lang=en
- "theme_theme_service_themeservice": "ThemeService" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.service.ts:L8 | neighbors=[theme.service.ts, .constructor(), .getResolvedTheme(), .updateOverride()] | lang=en
- "auth_auth_controller_authcontroller": "AuthController" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L5 | neighbors=[auth.controller.ts, .constructor(), .login()] | lang=en
- "auth_auth_service_authservice": "AuthService" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L8 | neighbors=[auth.service.ts, .constructor(), .login()] | lang=en
- "builder_builder_controller": "builder.controller.ts" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.controller.ts:L1 | neighbors=[BuilderController, TenantContext, 21888ff feat: implement commerce, catal…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@39bac8e1aa8ff382bccf8de537230e7af6e9d136": "39bac8e docs: initialize architecture, data contracts, and project documentatio…" | kind=Commit | source=git | neighbors=[21888ff feat: implement commerce, catal…, main, 8edc82c docs: initialize core architect…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@8c8bb73c781df0b5c493de636341d14ba2b0fd2e": "8c8bb73 docs: add UI component creation epic and architecture analysis document…" | kind=Commit | source=git | neighbors=[main, c160e7d add agent configuration and cod…, 8edc82c docs: initialize core architect…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@8edc82ce07af07520560980aef5fe84913c0ecd3": "8edc82c docs: initialize core architectural, entity contract, and experience en…" | kind=Commit | source=git | neighbors=[39bac8e docs: initialize architecture, …, main, 8c8bb73 docs: add UI component creation…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@b6a408835974e7bb71f06fe095f291264451d065": "b6a4088 docs: add initial implementation roadmap, component data contracts, pro…" | kind=Commit | source=git | neighbors=[main, 24a34d0 docs: initialize enterprise pla…, c2b0240 chore: initialize project docum…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@c160e7dc51311a70f4b4edda6a3e255344275842": "c160e7d add agent configuration and coding convention documentation" | kind=Commit | source=git | neighbors=[8c8bb73 docs: add UI component creation…, main, c2b0240 chore: initialize project docum…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@c2b0240558914e3794c0d851e8f6c88f6e2052b0": "c2b0240 chore: initialize project documentation and agent configuration files" | kind=Commit | source=git | neighbors=[c160e7d add agent configuration and cod…, main, b6a4088 docs: add initial implementatio…] | lang=en
- "commit:repo:github.com/al-rasels/commerce-os-core@c6b41a4ae01e1072f63af1ee782316962506a011": "c6b41a4 docs: upload -docs" | kind=Commit | source=git | neighbors=[main, 028709f chore: scaffold monorepo with a…, e425b0f docs: upload -docs] | lang=pt
- "components_index": "index.ts" | kind=code-symbol | source=packages/components/index.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, registry.ts, utils.ts] | lang=en
- "components_registry": "registry.ts" | kind=code-symbol | source=packages/components/registry.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, index.ts, componentRegistry] | lang=en
- "components_utils": "utils.ts" | kind=code-symbol | source=packages/components/utils.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, index.ts, cn()] | lang=en
- "jetski_gemini_loader_loader_assertvalidmaxskills": "assertValidMaxSkills()" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L39 | neighbors=[loader.mjs, buildModelMessages(), resolveSkillsFromMessages()] | lang=en
- "jetski_gemini_loader_loader_collectreferencedskillids": "collectReferencedSkillIds()" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L24 | neighbors=[loader.mjs, buildModelMessages(), resolveSkillsFromMessages()] | lang=en
- "platform_platform_module_platformmodule": "PlatformModule" | kind=code-symbol | source=apps/api/src/modules/platform/platform.module.ts:L6 | neighbors=[platform.module.ts, NestModule, .configure()] | lang=en
- "prisma_seed": "seed.ts" | kind=code-symbol | source=apps/api/prisma/seed.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, main(), prisma] | lang=en
- "repositories_category_repository_categoryrepository": "CategoryRepository" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/category.repository.ts:L7 | neighbors=[category.repository.ts, .constructor(), TenantScopedRepository] | lang=en
- "repositories_product_repository_productrepository": "ProductRepository" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/product.repository.ts:L7 | neighbors=[product.repository.ts, .constructor(), TenantScopedRepository] | lang=en
- "repositories_tenant_scoped_repository_update": "update()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L38 | neighbors=[tenant-scoped.repository.ts, softDelete(), findUnique()] | lang=en
- "repositories_theme_override_repository_themetenantoverriderepository": "ThemeTenantOverrideRepository" | kind=code-symbol | source=apps/api/src/modules/experience/theme/repositories/theme-override.repository.ts:L7 | neighbors=[theme-override.repository.ts, TenantScopedRepository, .constructor()] | lang=en
- "scripts_api_validator_check_api_code": "check_api_code()" | kind=code-symbol | source=.agents/skills/api-patterns/scripts/api_validator.py:L94 | neighbors=[api_validator.py, main(), Check API code for common issues.] | lang=en
- "scripts_api_validator_check_openapi_spec": "check_openapi_spec()" | kind=code-symbol | source=.agents/skills/api-patterns/scripts/api_validator.py:L37 | neighbors=[api_validator.py, main(), Check OpenAPI/Swagger specification.] | lang=en
- "scripts_api_validator_find_api_files": "find_api_files()" | kind=code-symbol | source=.agents/skills/api-patterns/scripts/api_validator.py:L18 | neighbors=[api_validator.py, main(), Find API-related files.] | lang=en
- "scripts_lighthouse_audit": "lighthouse_audit.py" | kind=code-symbol | source=.agents/skills/performance-profiling/scripts/lighthouse_audit.py:L1 | neighbors=[21888ff feat: implement commerce, catal…, get_summary(), run_lighthouse()] | lang=en
- "scripts_lighthouse_audit_get_summary": "get_summary()" | kind=code-symbol | source=.agents/skills/performance-profiling/scripts/lighthouse_audit.py:L60 | neighbors=[lighthouse_audit.py, Generate summary based on scores., run_lighthouse()] | lang=en
- "scripts_lighthouse_audit_run_lighthouse": "run_lighthouse()" | kind=code-symbol | source=.agents/skills/performance-profiling/scripts/lighthouse_audit.py:L16 | neighbors=[lighthouse_audit.py, Run Lighthouse audit on URL., get_summary()] | lang=en
- "scripts_schema_validator_find_schema_files": "find_schema_files()" | kind=code-symbol | source=.agents/skills/database-design/scripts/schema_validator.py:L29 | neighbors=[schema_validator.py, main(), Find database schema files.] | lang=en
- "scripts_schema_validator_main": "main()" | kind=code-symbol | source=.agents/skills/database-design/scripts/schema_validator.py:L94 | neighbors=[schema_validator.py, find_schema_files(), validate_prisma_schema()] | lang=en
- "scripts_schema_validator_validate_prisma_schema": "validate_prisma_schema()" | kind=code-symbol | source=.agents/skills/database-design/scripts/schema_validator.py:L47 | neighbors=[schema_validator.py, main(), Validate Prisma schema file.] | lang=en
- "scripts_ts_diagnostic_check_monorepo": "check_monorepo()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L111 | neighbors=[ts_diagnostic.py, main(), Check for monorepo configuration.] | lang=en
- "scripts_ts_diagnostic_check_tooling": "check_tooling()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L74 | neighbors=[ts_diagnostic.py, main(), Detect TypeScript tooling ecosystem.] | lang=en
- "scripts_ts_diagnostic_check_tsconfig": "check_tsconfig()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L32 | neighbors=[ts_diagnostic.py, main(), Analyze tsconfig.json settings.] | lang=en
- "src_app": "App.tsx" | kind=code-symbol | source=apps/admin/src/App.tsx:L1 | neighbors=[028709f chore: scaffold monorepo with a…, App(), main.ts] | lang=en
- "src_app_controller_appcontroller": "AppController" | kind=code-symbol | source=apps/api/src/app.controller.ts:L5 | neighbors=[app.controller.ts, .constructor(), .getHello()] | lang=en
- "src_app_module": "app.module.ts" | kind=code-symbol | source=apps/api/src/app.module.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 21888ff feat: implement commerce, catal…, AppModule] | lang=en
- "src_main": "main.ts" | kind=code-symbol | source=apps/api/src/main.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, App.tsx, bootstrap()] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-001.json

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
