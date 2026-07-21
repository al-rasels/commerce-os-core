# Node Description Batch 7 of 8

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

- "repositories_product_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[ProductRepository]
- "repositories_tenant_scoped_repository_constructor": "constructor()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L7 | neighbors=[tenant-scoped.repository.ts]
- "repositories_tenant_scoped_repository_create": "create()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L32 | neighbors=[tenant-scoped.repository.ts]
- "repositories_theme_override_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[ThemeTenantOverrideRepository]
- "repositories_theme_override_repository_themetenantoverriderepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/experience/theme/repositories/theme-override.repository.ts:L8 | neighbors=[ThemeTenantOverrideRepository]
- "scripts_api_validator_rationale_19": "Find API-related files." | kind=entity | source=.agents/skills/api-patterns/scripts/api_validator.py:L19 | neighbors=[find_api_files()]
- "scripts_api_validator_rationale_38": "Check OpenAPI/Swagger specification." | kind=entity | source=.agents/skills/api-patterns/scripts/api_validator.py:L38 | neighbors=[check_openapi_spec()]
- "scripts_api_validator_rationale_95": "Check API code for common issues." | kind=entity | source=.agents/skills/api-patterns/scripts/api_validator.py:L95 | neighbors=[check_api_code()]
- "scripts_lighthouse_audit_rationale_17": "Run Lighthouse audit on URL." | kind=entity | source=.agents/skills/performance-profiling/scripts/lighthouse_audit.py:L17 | neighbors=[run_lighthouse()]
- "scripts_lighthouse_audit_rationale_61": "Generate summary based on scores." | kind=entity | source=.agents/skills/performance-profiling/scripts/lighthouse_audit.py:L61 | neighbors=[get_summary()]
- "scripts_schema_validator_rationale_30": "Find database schema files." | kind=entity | source=.agents/skills/database-design/scripts/schema_validator.py:L30 | neighbors=[find_schema_files()]
- "scripts_schema_validator_rationale_48": "Validate Prisma schema file." | kind=entity | source=.agents/skills/database-design/scripts/schema_validator.py:L48 | neighbors=[validate_prisma_schema()]
- "scripts_ts_diagnostic_rationale_112": "Check for monorepo configuration." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L112 | neighbors=[check_monorepo()]
- "scripts_ts_diagnostic_rationale_133": "Run quick type check." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L133 | neighbors=[check_type_errors()]
- "scripts_ts_diagnostic_rationale_14": "Run shell command and return output." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L14 | neighbors=[run_cmd()]
- "scripts_ts_diagnostic_rationale_146": "Check for any type usage." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L146 | neighbors=[check_any_usage()]
- "scripts_ts_diagnostic_rationale_161": "Check for type assertions." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L161 | neighbors=[check_type_assertions()]
- "scripts_ts_diagnostic_rationale_173": "Check type checking performance." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L173 | neighbors=[check_performance()]
- "scripts_ts_diagnostic_rationale_22": "Check TypeScript and Node versions." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L22 | neighbors=[check_versions()]
- "scripts_ts_diagnostic_rationale_33": "Analyze tsconfig.json settings." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L33 | neighbors=[check_tsconfig()]
- "scripts_ts_diagnostic_rationale_75": "Detect TypeScript tooling ecosystem." | kind=entity | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L75 | neighbors=[check_tooling()]
- "shared_types_index_category": "Category" | kind=code-symbol | source=packages/shared-types/index.ts:L74 | neighbors=[index.ts]
- "shared_types_index_categoryschema": "CategorySchema" | kind=code-symbol | source=packages/shared-types/index.ts:L67 | neighbors=[index.ts]
- "shared_types_index_product": "Product" | kind=code-symbol | source=packages/shared-types/index.ts:L51 | neighbors=[index.ts]
- "shared_types_index_productschema": "ProductSchema" | kind=code-symbol | source=packages/shared-types/index.ts:L40 | neighbors=[index.ts]
- "shared_types_index_productvariant": "ProductVariant" | kind=code-symbol | source=packages/shared-types/index.ts:L64 | neighbors=[index.ts]
- "shared_types_index_productvariantschema": "ProductVariantSchema" | kind=code-symbol | source=packages/shared-types/index.ts:L53 | neighbors=[index.ts]
- "shared_types_index_role": "Role" | kind=code-symbol | source=packages/shared-types/index.ts:L27 | neighbors=[index.ts]
- "shared_types_index_roleschema": "RoleSchema" | kind=code-symbol | source=packages/shared-types/index.ts:L22 | neighbors=[index.ts]
- "shared_types_index_tenant": "Tenant" | kind=code-symbol | source=packages/shared-types/index.ts:L11 | neighbors=[index.ts]
- "shared_types_index_tenantdomain": "TenantDomain" | kind=code-symbol | source=packages/shared-types/index.ts:L19 | neighbors=[index.ts]
- "shared_types_index_tenantdomainschema": "TenantDomainSchema" | kind=code-symbol | source=packages/shared-types/index.ts:L13 | neighbors=[index.ts]
- "shared_types_index_tenantschema": "TenantSchema" | kind=code-symbol | source=packages/shared-types/index.ts:L4 | neighbors=[index.ts]
- "shared_types_index_user": "User" | kind=code-symbol | source=packages/shared-types/index.ts:L37 | neighbors=[index.ts]
- "shared_types_index_userschema": "UserSchema" | kind=code-symbol | source=packages/shared-types/index.ts:L29 | neighbors=[index.ts]
- "src_app_app": "App()" | kind=code-symbol | source=apps/admin/src/App.tsx:L7 | neighbors=[App.tsx]
- "src_app_controller_appcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/app.controller.ts:L6 | neighbors=[AppController]
- "src_app_controller_appcontroller_gethello": ".getHello()" | kind=code-symbol | source=apps/api/src/app.controller.ts:L9 | neighbors=[AppController]
- "src_app_controller_spec": "app.controller.spec.ts" | kind=code-symbol | source=apps/api/src/app.controller.spec.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…]
- "src_app_module_appmodule": "AppModule" | kind=code-symbol | source=apps/api/src/app.module.ts:L14 | neighbors=[app.module.ts]

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
