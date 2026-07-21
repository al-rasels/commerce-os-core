# Node Description Batch 32 of 37

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

- "success_page_successcontent": "SuccessContent()" | kind=code-symbol | source=apps/storefront/src/app/checkout/success/page.tsx:L9 | neighbors=[page.tsx]
- "super_admin_provisiontenantdialog_plans": "PLANS" | kind=code-symbol | source=apps/admin/src/pages/super-admin/ProvisionTenantDialog.tsx:L21 | neighbors=[ProvisionTenantDialog.tsx]
- "super_admin_provisiontenantdialog_props": "Props" | kind=code-symbol | source=apps/admin/src/pages/super-admin/ProvisionTenantDialog.tsx:L23 | neighbors=[ProvisionTenantDialog.tsx]
- "super_admin_provisiontenantdialog_provisiontenantdialog": "ProvisionTenantDialog()" | kind=code-symbol | source=apps/admin/src/pages/super-admin/ProvisionTenantDialog.tsx:L27 | neighbors=[ProvisionTenantDialog.tsx]
- "super_admin_tenantdetailpage_tenantdetailpage": "TenantDetailPage()" | kind=code-symbol | source=apps/admin/src/pages/super-admin/TenantDetailPage.tsx:L8 | neighbors=[TenantDetailPage.tsx]
- "super_admin_tenantspage_tenantspage": "TenantsPage()" | kind=code-symbol | source=apps/admin/src/pages/super-admin/TenantsPage.tsx:L8 | neighbors=[TenantsPage.tsx]
- "systematic_debugging_condition_based_waiting_example_waitforevent": "waitForEvent()" | kind=code-symbol | source=.agents/skills/systematic-debugging/condition-based-waiting-example.ts:L20 | neighbors=[condition-based-waiting-example.ts]
- "systematic_debugging_condition_based_waiting_example_waitforeventcount": "waitForEventCount()" | kind=code-symbol | source=.agents/skills/systematic-debugging/condition-based-waiting-example.ts:L60 | neighbors=[condition-based-waiting-example.ts]
- "systematic_debugging_condition_based_waiting_example_waitforeventmatch": "waitForEventMatch()" | kind=code-symbol | source=.agents/skills/systematic-debugging/condition-based-waiting-example.ts:L111 | neighbors=[condition-based-waiting-example.ts]
- "tax_tax_controller_taxcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.controller.ts:L23 | neighbors=[TaxController]
- "tax_tax_controller_taxcontroller_create": ".create()" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.controller.ts:L39 | neighbors=[TaxController]
- "tax_tax_controller_taxcontroller_get": ".get()" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.controller.ts:L33 | neighbors=[TaxController]
- "tax_tax_controller_taxcontroller_list": ".list()" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.controller.ts:L27 | neighbors=[TaxController]
- "tax_tax_controller_taxcontroller_remove": ".remove()" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.controller.ts:L58 | neighbors=[TaxController]
- "tax_tax_controller_taxcontroller_update": ".update()" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.controller.ts:L48 | neighbors=[TaxController]
- "tax_tax_module_taxmodule": "TaxModule" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.module.ts:L14 | neighbors=[tax.module.ts]
- "tax_tax_rule_repository_taxrulerepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax-rule.repository.ts:L7 | neighbors=[TaxRuleRepository]
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
- "test_checkout_tenant_isolation_e2e_spec": "checkout-tenant-isolation.e2e-spec.ts" | kind=code-symbol | source=apps/api/test/checkout-tenant-isolation.e2e-spec.ts:L1 | neighbors=[92e2c6a feat: add checkout tenant isola…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-031.json

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
