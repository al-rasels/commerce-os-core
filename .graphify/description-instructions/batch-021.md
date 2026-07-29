# Node Description Batch 22 of 51

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

- "ui_sidebar_sidebarmenubuttonvariants": "sidebarMenuButtonVariants" | kind=code-symbol | source=apps/admin/src/components/ui/sidebar.tsx:L452 | neighbors=[sidebar.tsx, SidebarMenuButton()]
- "ui_sidebar_sidebarrail": "SidebarRail()" | kind=code-symbol | source=apps/admin/src/components/ui/sidebar.tsx:L264 | neighbors=[sidebar.tsx, useSidebar()]
- "ui_sidebar_sidebartrigger": "SidebarTrigger()" | kind=code-symbol | source=apps/admin/src/components/ui/sidebar.tsx:L242 | neighbors=[sidebar.tsx, useSidebar()]
- "ui_tabs_tabslist": "TabsList()" | kind=code-symbol | source=apps/admin/src/components/ui/tabs.tsx:L39 | neighbors=[tabs.tsx, tabsListVariants]
- "ui_tabs_tabslistvariants": "tabsListVariants" | kind=code-symbol | source=apps/admin/src/components/ui/tabs.tsx:L24 | neighbors=[tabs.tsx, TabsList()]
- "users_role_repository": "role.repository.ts" | kind=code-symbol | source=apps/api/src/modules/platform/users/role.repository.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, RoleRepository]
- "users_users_service_usersservice_findbyemail": ".findByEmail()" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.service.ts:L127 | neighbors=[UsersService, .findMany()]
- "users_users_service_usersservice_findmanywithrole": ".findManyWithRole()" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.service.ts:L119 | neighbors=[UsersService, .list()]
- "users_users_service_usersservice_findrolebyname": ".findRoleByName()" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.service.ts:L134 | neighbors=[UsersService, .findMany()]
- "users_users_service_usersservice_finduniquewithrolefull": ".findUniqueWithRoleFull()" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.service.ts:L115 | neighbors=[UsersService, .getById()]
- "users_users_service_usersservice_getbyid": ".getById()" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.service.ts:L67 | neighbors=[UsersService, .findUniqueWithRoleFull()]
- "users_users_service_usersservice_list": ".list()" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.service.ts:L21 | neighbors=[UsersService, .findManyWithRole()]
- "users_users_service_usersservice_update": ".update()" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.service.ts:L75 | neighbors=[UsersService, .updateUser()]
- "users_users_service_usersservice_updatestatus": ".updateStatus()" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.service.ts:L98 | neighbors=[UsersService, .updateUser()]
- "20260716164323_init_migration_countries": "countries" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L2 | neighbors=[migration.sql]
- "20260716164323_init_migration_currencies": "currencies" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L11 | neighbors=[migration.sql]
- "20260716164323_init_migration_plans": "plans" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L21 | neighbors=[migration.sql]
- "20260717055219_add_description_sort_order_migration": "migration.sql" | kind=code-symbol | source=apps/api/prisma/migrations/20260717055219_add_description_sort_order/migration.sql:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…]
- "account_page_accountpage": "AccountPage()" | kind=code-symbol | source=apps/storefront/src/app/account/page.tsx:L13 | neighbors=[page.tsx]
- "admin_admin_controller_admincontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.controller.ts:L19 | neighbors=[AdminController]
- "admin_admin_controller_admincontroller_gettenant": ".getTenant()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.controller.ts:L27 | neighbors=[AdminController]
- "admin_admin_controller_admincontroller_listtenants": ".listTenants()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.controller.ts:L22 | neighbors=[AdminController]
- "admin_admin_controller_admincontroller_provisiontenant": ".provisionTenant()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.controller.ts:L32 | neighbors=[AdminController]
- "admin_admin_controller_admincontroller_suspendtenant": ".suspendTenant()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.controller.ts:L52 | neighbors=[AdminController]
- "admin_admin_controller_admincontroller_toggleflag": ".toggleFlag()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.controller.ts:L44 | neighbors=[AdminController]
- "admin_admin_controller_admincontroller_updateplan": ".updatePlan()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.controller.ts:L39 | neighbors=[AdminController]
- "admin_admin_module_adminmodule": "AdminModule" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.module.ts:L13 | neighbors=[admin.module.ts]
- "admin_admin_service_adminservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.service.ts:L14 | neighbors=[AdminService]
- "admin_admin_service_adminservice_gettenant": ".getTenant()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.service.ts:L29 | neighbors=[AdminService]
- "admin_admin_service_adminservice_listtenants": ".listTenants()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.service.ts:L16 | neighbors=[AdminService]
- "admin_admin_service_adminservice_provisiontenant": ".provisionTenant()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.service.ts:L46 | neighbors=[AdminService]
- "admin_admin_service_adminservice_suspendtenant": ".suspendTenant()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.service.ts:L137 | neighbors=[AdminService]
- "admin_admin_service_adminservice_togglefeatureflag": ".toggleFeatureFlag()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.service.ts:L105 | neighbors=[AdminService]
- "admin_admin_service_adminservice_updatetenantplan": ".updateTenantPlan()" | kind=code-symbol | source=apps/api/src/modules/platform/admin/admin.service.ts:L92 | neighbors=[AdminService]
- "api_client_apierror_constructor": ".constructor()" | kind=code-symbol | source=apps/admin/src/lib/api/client.ts:L4 | neighbors=[ApiError]
- "api_fix_hasfeature_files": "files" | kind=code-symbol | source=apps/api/fix-hasfeature.js:L2 | neighbors=[fix-hasfeature.js]
- "api_fix_hasfeature_fs": "fs" | kind=code-symbol | source=apps/api/fix-hasfeature.js:L1 | neighbors=[fix-hasfeature.js]
- "api_fix_hasfeature2_files": "files" | kind=code-symbol | source=apps/api/fix-hasfeature2.js:L2 | neighbors=[fix-hasfeature2.js]
- "api_fix_hasfeature2_fs": "fs" | kind=code-symbol | source=apps/api/fix-hasfeature2.js:L1 | neighbors=[fix-hasfeature2.js]
- "api_fix_imports_files": "files" | kind=code-symbol | source=apps/api/fix-imports.js:L2 | neighbors=[fix-imports.js]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-021.json

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
