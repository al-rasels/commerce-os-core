# Node Description Batch 11 of 51

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

- "scripts_schema_validator": "schema_validator.py" | kind=code-symbol | source=.agents/skills/database-design/scripts/schema_validator.py:L1 | neighbors=[21888ff feat: implement commerce, catal…, find_schema_files(), main(), validate_prisma_schema()]
- "scripts_ts_diagnostic_check_any_usage": "check_any_usage()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L145 | neighbors=[ts_diagnostic.py, run_cmd(), main(), Check for any type usage.]
- "scripts_ts_diagnostic_check_performance": "check_performance()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L172 | neighbors=[ts_diagnostic.py, run_cmd(), main(), Check type checking performance.]
- "scripts_ts_diagnostic_check_type_assertions": "check_type_assertions()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L160 | neighbors=[ts_diagnostic.py, run_cmd(), main(), Check for type assertions.]
- "scripts_ts_diagnostic_check_type_errors": "check_type_errors()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L132 | neighbors=[ts_diagnostic.py, run_cmd(), main(), Run quick type check.]
- "scripts_ts_diagnostic_check_versions": "check_versions()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L21 | neighbors=[ts_diagnostic.py, run_cmd(), main(), Check TypeScript and Node versions.]
- "search_search_service_searchservice_gettenantindexname": ".getTenantIndexName()" | kind=code-symbol | source=apps/api/src/modules/commerce/search/search.service.ts:L21 | neighbors=[SearchService, .deleteDocument(), .indexDocuments(), .search()]
- "search_search_sync_worker": "search-sync.worker.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/search/search-sync.worker.ts:L1 | neighbors=[16cea38 feat(api): Implemented Meilisea…, index.ts, SearchSyncJobPayload, SearchSyncWorker]
- "search_search_sync_worker_searchsyncworker": "SearchSyncWorker" | kind=code-symbol | source=apps/api/src/modules/commerce/search/search-sync.worker.ts:L15 | neighbors=[search-sync.worker.ts, .constructor(), .process(), WorkerHost]
- "src_app_controller_appcontroller": "AppController" | kind=code-symbol | source=apps/api/src/app.controller.ts:L5 | neighbors=[app.controller.ts, .constructor(), .getHello(), .whoami()]
- "src_middleware": "middleware.ts" | kind=code-symbol | source=apps/storefront/src/middleware.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, f1d1a16 feat: implement storefront foun…, config, middleware()]
- "storefront_storefront_module": "storefront.module.ts" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront.module.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, f1bfa47 feat: implement storefront orde…, StorefrontModule]
- "systematic_debugging_condition_based_waiting_example": "condition-based-waiting-example.ts" | kind=code-symbol | source=.agents/skills/systematic-debugging/condition-based-waiting-example.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, waitForEvent(), waitForEventCount(), waitForEventMatch()]
- "tenant_tenant_service_tenantservice": "TenantService" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant.service.ts:L8 | neighbors=[tenant.service.ts, .constructor(), .invalidateCache(), .resolveTenant()]
- "theme_engine_index_resolveoverride": "resolveOverride()" | kind=code-symbol | source=packages/theme-engine/index.ts:L22 | neighbors=[index.ts, detectConflicts(), index.spec.ts, theme.service.ts]
- "theme_theme_controller_themecontroller": "ThemeController" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.controller.ts:L9 | neighbors=[theme.controller.ts, .constructor(), .getTheme(), .updateOverride()]
- "theme_theme_service_themeservice": "ThemeService" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.service.ts:L8 | neighbors=[theme.service.ts, .constructor(), .getResolvedTheme(), .updateOverride()]
- "ui_collapsible": "collapsible.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/collapsible.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Collapsible(), CollapsibleContent(), CollapsibleTrigger()]
- "users_users_module": "users.module.ts" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.module.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, e3a8c77 feat: implement users CRUD back…, efe67e9 fix(build): resolve component t…, UsersModule]
- "20260716164323_init_migration_audit_log": "audit_log" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L251 | neighbors=[migration.sql, tenants, users]
- "20260716164323_init_migration_roles": "roles" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L52 | neighbors=[migration.sql, tenants, users]
- "20260716164323_init_migration_template_tenant_override": "template_tenant_override" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L218 | neighbors=[migration.sql, template_base, tenants]
- "20260716164323_init_migration_theme_tenant_override": "theme_tenant_override" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L199 | neighbors=[migration.sql, tenants, theme_base]
- "admin_admin_controller": "admin.controller.ts" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.controller.ts:L1 | neighbors=[AdminController, 3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …]
- "admin_admin_service": "admin.service.ts" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.service.ts:L1 | neighbors=[AdminService, 3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …]
- "admin_vite_config": "vite.config.ts" | kind=code-symbol | source=apps/admin/vite.config.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…]
- "api_client_request": "request()" | kind=code-symbol | source=apps/admin/src/lib/api/client.ts:L15 | neighbors=[client.ts, ApiError, getToken()]
- "api_customers_customer": "Customer" | kind=code-symbol | source=apps/admin/src/lib/api/customers.ts:L3 | neighbors=[customers.ts, CustomerDetail, index.ts]
- "api_customers_customerdetail": "CustomerDetail" | kind=code-symbol | source=apps/admin/src/lib/api/customers.ts:L19 | neighbors=[customers.ts, Customer, index.ts]
- "api_fix_hasfeature": "fix-hasfeature.js" | kind=code-symbol | source=apps/api/fix-hasfeature.js:L1 | neighbors=[files, fs, efe67e9 fix(build): resolve component t…]
- "api_fix_hasfeature2": "fix-hasfeature2.js" | kind=code-symbol | source=apps/api/fix-hasfeature2.js:L1 | neighbors=[files, fs, efe67e9 fix(build): resolve component t…]
- "api_fix_imports": "fix-imports.js" | kind=code-symbol | source=apps/api/fix-imports.js:L1 | neighbors=[files, fs, efe67e9 fix(build): resolve component t…]
- "api_fix_theme": "fix-theme.js" | kind=code-symbol | source=apps/api/fix-theme.js:L1 | neighbors=[files, fs, efe67e9 fix(build): resolve component t…]
- "api_users_user": "User" | kind=code-symbol | source=apps/admin/src/lib/api/users.ts:L3 | neighbors=[index.ts, users.ts, UserDetail]
- "api_users_userdetail": "UserDetail" | kind=code-symbol | source=apps/admin/src/lib/api/users.ts:L20 | neighbors=[index.ts, users.ts, User]
- "audit_log_audit_log_controller_auditlogcontroller": "AuditLogController" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.controller.ts:L10 | neighbors=[audit-log.controller.ts, .constructor(), .list()]
- "audit_log_audit_log_repository_auditlogrepository": "AuditLogRepository" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.repository.ts:L7 | neighbors=[audit-log.repository.ts, .constructor(), TenantScopedRepository]
- "b2b_b2b_module": "b2b.module.ts" | kind=code-symbol | source=apps/api/src/modules/business/b2b/b2b.module.ts:L1 | neighbors=[B2bModule, 7d74efe feat(commerce): implement B2B, …, c506b3c feat(api): implement database r…]
- "b2b_companyprofileslistpage": "CompanyProfilesListPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/b2b/CompanyProfilesListPage.tsx:L1 | neighbors=[CompanyProfilesListPage(), 7d74efe feat(commerce): implement B2B, …, bb61ae8 feat(commerce): wire up Admin U…]
- "builder_builder_module": "builder.module.ts" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.module.ts:L1 | neighbors=[BuilderModule, 21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…]

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
