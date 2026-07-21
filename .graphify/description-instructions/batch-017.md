# Node Description Batch 18 of 37

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

- "api_client_apierror_constructor": ".constructor()" | kind=code-symbol | source=apps/admin/src/lib/api/client.ts:L4 | neighbors=[ApiError]
- "api_eslint_config": "eslint.config.mjs" | kind=code-symbol | source=apps/api/eslint.config.mjs:L1 | neighbors=[028709f chore: scaffold monorepo with a…]
- "api_superadmin_provisiontenantinput": "ProvisionTenantInput" | kind=code-symbol | source=apps/admin/src/lib/api/superAdmin.ts:L22 | neighbors=[superAdmin.ts]
- "app_home_client_homeclient": "HomeClient()" | kind=code-symbol | source=apps/storefront/src/app/home-client.tsx:L8 | neighbors=[home-client.tsx]
- "app_layout_footercolumns": "footerColumns" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L28 | neighbors=[layout.tsx]
- "app_layout_geistmono": "geistMono" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L18 | neighbors=[layout.tsx]
- "app_layout_geistsans": "geistSans" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L13 | neighbors=[layout.tsx]
- "app_layout_metadata": "metadata" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L23 | neighbors=[layout.tsx]
- "app_layout_rootlayout": "RootLayout()" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L54 | neighbors=[layout.tsx]
- "app_page_home": "Home()" | kind=code-symbol | source=apps/storefront/src/app/page.tsx:L3 | neighbors=[page.tsx]
- "app_page_homepage": "HomePage()" | kind=code-symbol | source=apps/storefront/src/app/page.tsx:L6 | neighbors=[page.tsx]
- "audit_log_audit_log_controller_auditlogcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.controller.ts:L11 | neighbors=[AuditLogController]
- "audit_log_audit_log_controller_auditlogcontroller_list": ".list()" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.controller.ts:L15 | neighbors=[AuditLogController]
- "audit_log_audit_log_module_auditlogmodule": "AuditLogModule" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.module.ts:L11 | neighbors=[audit-log.module.ts]
- "audit_log_audit_log_repository_auditlogrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.repository.ts:L8 | neighbors=[AuditLogRepository]
- "audit_log_audit_log_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[AuditLogRepository]
- "audit_log_audit_log_service_auditlogservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.service.ts:L7 | neighbors=[AuditLogService]
- "audit_log_audit_log_service_auditlogservice_list": ".list()" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.service.ts:L26 | neighbors=[AuditLogService]
- "audit_log_audit_log_service_auditlogservice_log": ".log()" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.service.ts:L9 | neighbors=[AuditLogService]
- "auth_auth_controller_authcontroller_changepassword": ".changePassword()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L108 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L29 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_disablemfa": ".disableMfa()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L79 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_forgotpassword": ".forgotPassword()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L89 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_invite": ".invite()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L120 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_login": ".login()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L41 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_logout": ".logout()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L145 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_me": ".me()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L135 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_mfaverify": ".mfaVerify()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L47 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_refresh": ".refresh()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L126 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_register": ".register()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L32 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_resetpassword": ".resetPassword()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L98 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_setupmfa": ".setupMfa()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L58 | neighbors=[AuthController]
- "auth_auth_controller_authcontroller_verifyandenablemfa": ".verifyAndEnableMfa()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L68 | neighbors=[AuthController]
- "auth_auth_module_authmodule": "AuthModule" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.module.ts:L21 | neighbors=[auth.module.ts]
- "auth_auth_service_authenticator": "{ authenticator }" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L10 | neighbors=[auth.service.ts]
- "auth_auth_service_authservice_changepassword": ".changePassword()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L203 | neighbors=[AuthService]
- "auth_auth_service_authservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L26 | neighbors=[AuthService]
- "auth_auth_service_authservice_disablemfa": ".disableMfa()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L149 | neighbors=[AuthService]
- "auth_auth_service_authservice_forgotpassword": ".forgotPassword()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L163 | neighbors=[AuthService]
- "auth_auth_service_authservice_invite": ".invite()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L221 | neighbors=[AuthService]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-017.json

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
