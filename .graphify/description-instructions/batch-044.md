# Node Description Batch 45 of 51

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

- "tax_tax_rule_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[TaxRuleRepository]
- "tax_tax_service_taxservice_calculatetax": ".calculateTax()" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.service.ts:L36 | neighbors=[TaxService]
- "tax_tax_service_taxservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.service.ts:L9 | neighbors=[TaxService]
- "tax_tax_service_taxservice_createrule": ".createRule()" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.service.ts:L23 | neighbors=[TaxService]
- "tax_tax_service_taxservice_deleterule": ".deleteRule()" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.service.ts:L31 | neighbors=[TaxService]
- "tax_tax_service_taxservice_getrule": ".getRule()" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.service.ts:L17 | neighbors=[TaxService]
- "tax_tax_service_taxservice_listrules": ".listRules()" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.service.ts:L11 | neighbors=[TaxService]
- "tax_tax_service_taxservice_updaterule": ".updateRule()" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.service.ts:L27 | neighbors=[TaxService]
- "tenant_tenant_admin_controller_tenantadmincontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-admin.controller.ts:L25 | neighbors=[TenantAdminController]
- "tenant_tenant_admin_controller_tenantadmincontroller_getbyid": ".getById()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-admin.controller.ts:L67 | neighbors=[TenantAdminController]
- "tenant_tenant_admin_controller_tenantadmincontroller_getflags": ".getFlags()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-admin.controller.ts:L142 | neighbors=[TenantAdminController]
- "tenant_tenant_admin_controller_tenantadmincontroller_list": ".list()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-admin.controller.ts:L28 | neighbors=[TenantAdminController]
- "tenant_tenant_admin_controller_tenantadmincontroller_removedomain": ".removeDomain()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-admin.controller.ts:L136 | neighbors=[TenantAdminController]
- "tenant_tenant_admin_controller_tenantadmincontroller_toggleflag": ".toggleFlag()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-admin.controller.ts:L148 | neighbors=[TenantAdminController]
- "tenant_tenant_admin_controller_tenantadmincontroller_update": ".update()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-admin.controller.ts:L105 | neighbors=[TenantAdminController]
- "tenant_tenant_context_tenantcontext_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-context.ts:L12 | neighbors=[TenantContext]
- "tenant_tenant_context_tenantcontext_hasfeature": ".hasFeature()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-context.ts:L16 | neighbors=[TenantContext]
- "tenant_tenant_module_tenantmodule": "TenantModule" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant.module.ts:L14 | neighbors=[tenant.module.ts]
- "tenant_tenant_service_tenantservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant.service.ts:L9 | neighbors=[TenantService]
- "tenant_tenant_service_tenantservice_invalidatecache": ".invalidateCache()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant.service.ts:L62 | neighbors=[TenantService]
- "tenant_tenant_service_tenantservice_resolvetenant": ".resolveTenant()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant.service.ts:L14 | neighbors=[TenantService]
- "test_app_e2e_spec": "app.e2e-spec.ts" | kind=code-symbol | source=apps/api/test/app.e2e-spec.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…]
- "theme_engine_index_mergeresult": "MergeResult" | kind=code-symbol | source=packages/theme-engine/index.ts:L7 | neighbors=[index.ts]
- "theme_engine_index_tenanttokenoverride": "TenantTokenOverride" | kind=code-symbol | source=packages/theme-engine/index.ts:L12 | neighbors=[index.ts]
- "theme_engine_index_themebaseid": "ThemeBaseId" | kind=code-symbol | source=packages/theme-engine/index.ts:L20 | neighbors=[index.ts]
- "theme_engine_index_themeregistry": "ThemeRegistry" | kind=code-symbol | source=packages/theme-engine/index.ts:L14 | neighbors=[index.ts]
- "theme_theme_controller_themecontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.controller.ts:L10 | neighbors=[ThemeController]
- "theme_theme_controller_themecontroller_gettheme": ".getTheme()" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.controller.ts:L14 | neighbors=[ThemeController]
- "theme_theme_controller_themecontroller_updateoverride": ".updateOverride()" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.controller.ts:L21 | neighbors=[ThemeController]
- "theme_theme_module_thememodule": "ThemeModule" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.module.ts:L13 | neighbors=[theme.module.ts]
- "theme_theme_service_themeservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.service.ts:L9 | neighbors=[ThemeService]
- "theme_theme_service_themeservice_getresolvedtheme": ".getResolvedTheme()" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.service.ts:L14 | neighbors=[ThemeService]
- "theme_theme_service_themeservice_updateoverride": ".updateOverride()" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.service.ts:L45 | neighbors=[ThemeService]
- "theme_themeeditorpage_colormode": "ColorMode" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L35 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_colorssection": "ColorsSection()" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L287 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_deepmergedesigntokens": "deepMergeDesignTokens()" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L423 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_flattenedsection": "FlattenedSection()" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L356 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_loadingskeleton": "LoadingSkeleton()" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L399 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_previewcard": "PreviewCard()" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L128 | neighbors=[ThemeEditorPage.tsx]
- "theme_themeeditorpage_sectioncard": "SectionCard()" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L94 | neighbors=[ThemeEditorPage.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-044.json

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
