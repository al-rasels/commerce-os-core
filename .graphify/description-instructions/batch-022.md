# Node Description Batch 23 of 51

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

- "admin_admin_service_adminservice_suspendtenant": ".suspendTenant()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.service.ts:L137 | neighbors=[AdminService]
- "admin_admin_service_adminservice_togglefeatureflag": ".toggleFeatureFlag()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.service.ts:L105 | neighbors=[AdminService]
- "admin_admin_service_adminservice_updatetenantplan": ".updateTenantPlan()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.service.ts:L92 | neighbors=[AdminService]
- "api_client_apierror_constructor": ".constructor()" | kind=code-symbol | source=apps/admin/src/lib/api/client.ts:L4 | neighbors=[ApiError]
- "api_client_failedqueue": "failedQueue" | kind=code-symbol | source=apps/admin/src/lib/api/client.ts:L16 | neighbors=[client.ts]
- "api_fix_hasfeature_files": "files" | kind=code-symbol | source=apps/api/fix-hasfeature.js:L2 | neighbors=[fix-hasfeature.js]
- "api_fix_hasfeature_fs": "fs" | kind=code-symbol | source=apps/api/fix-hasfeature.js:L1 | neighbors=[fix-hasfeature.js]
- "api_fix_hasfeature2_files": "files" | kind=code-symbol | source=apps/api/fix-hasfeature2.js:L2 | neighbors=[fix-hasfeature2.js]
- "api_fix_hasfeature2_fs": "fs" | kind=code-symbol | source=apps/api/fix-hasfeature2.js:L1 | neighbors=[fix-hasfeature2.js]
- "api_fix_imports_files": "files" | kind=code-symbol | source=apps/api/fix-imports.js:L2 | neighbors=[fix-imports.js]
- "api_fix_imports_fs": "fs" | kind=code-symbol | source=apps/api/fix-imports.js:L1 | neighbors=[fix-imports.js]
- "api_fix_theme_files": "files" | kind=code-symbol | source=apps/api/fix-theme.js:L2 | neighbors=[fix-theme.js]
- "api_fix_theme_fs": "fs" | kind=code-symbol | source=apps/api/fix-theme.js:L1 | neighbors=[fix-theme.js]
- "api_superadmin_provisiontenantinput": "ProvisionTenantInput" | kind=code-symbol | source=apps/admin/src/lib/api/superAdmin.ts:L22 | neighbors=[superAdmin.ts]
- "app_home_client_homeclient": "HomeClient()" | kind=code-symbol | source=apps/storefront/src/app/home-client.tsx:L8 | neighbors=[home-client.tsx]
- "app_layout_footercolumns": "footerColumns" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L28 | neighbors=[layout.tsx]
- "app_layout_geistmono": "geistMono" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L18 | neighbors=[layout.tsx]
- "app_layout_geistsans": "geistSans" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L13 | neighbors=[layout.tsx]
- "app_layout_metadata": "metadata" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L23 | neighbors=[layout.tsx]
- "app_layout_rootlayout": "RootLayout()" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L54 | neighbors=[layout.tsx]
- "app_page_home": "Home()" | kind=code-symbol | source=apps/storefront/src/app/page.tsx:L3 | neighbors=[page.tsx]
- "app_page_homepage": "HomePage()" | kind=code-symbol | source=apps/storefront/src/app/page.tsx:L7 | neighbors=[page.tsx]
- "audit_log_audit_log_controller_auditlogcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.controller.ts:L11 | neighbors=[AuditLogController]
- "audit_log_audit_log_controller_auditlogcontroller_list": ".list()" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.controller.ts:L15 | neighbors=[AuditLogController]
- "audit_log_audit_log_module_auditlogmodule": "AuditLogModule" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.module.ts:L11 | neighbors=[audit-log.module.ts]
- "audit_log_audit_log_repository_auditlogrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.repository.ts:L8 | neighbors=[AuditLogRepository]
- "audit_log_audit_log_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[AuditLogRepository]
- "audit_log_audit_log_service_auditlogservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.service.ts:L7 | neighbors=[AuditLogService]
- "audit_log_audit_log_service_auditlogservice_list": ".list()" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.service.ts:L26 | neighbors=[AuditLogService]
- "audit_log_audit_log_service_auditlogservice_log": ".log()" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.service.ts:L9 | neighbors=[AuditLogService]
- "auth_auth_controller_authcontroller_changepassword": ".changePassword()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L129 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L33 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_disablemfa": ".disableMfa()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L100 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_forgotpassword": ".forgotPassword()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L110 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_invite": ".invite()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L141 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_login": ".login()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L45 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_logout": ".logout()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L184 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_me": ".me()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L174 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_mfaverify": ".mfaVerify()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L68 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_refresh": ".refresh()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L147 | neighbors=[AuthController]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-022.json

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
