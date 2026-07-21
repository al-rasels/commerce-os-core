# Node Description Batch 30 of 37

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
- "search_page_searchpage": "SearchPage()" | kind=code-symbol | source=apps/storefront/src/app/search/page.tsx:L7 | neighbors=[page.tsx]
- "settings_pagelayouteditor_createdefaultsection": "createDefaultSection()" | kind=code-symbol | source=apps/admin/src/pages/settings/PageLayoutEditor.tsx:L40 | neighbors=[PageLayoutEditor.tsx]
- "settings_pagelayouteditor_pagelayouteditorpage": "PageLayoutEditorPage()" | kind=code-symbol | source=apps/admin/src/pages/settings/PageLayoutEditor.tsx:L58 | neighbors=[PageLayoutEditor.tsx]
- "settings_pagelayoutlist_knownpages": "knownPages" | kind=code-symbol | source=apps/admin/src/pages/settings/PageLayoutList.tsx:L20 | neighbors=[PageLayoutList.tsx]
- "settings_pagelayoutlist_pagelayoutlistpage": "PageLayoutListPage()" | kind=code-symbol | source=apps/admin/src/pages/settings/PageLayoutList.tsx:L29 | neighbors=[PageLayoutList.tsx]
- "settings_shipping_shippingsettingspage": "ShippingSettingsPage()" | kind=code-symbol | source=apps/admin/src/pages/settings/shipping.tsx:L8 | neighbors=[shipping.tsx]
- "settings_tax_taxsettingspage": "TaxSettingsPage()" | kind=code-symbol | source=apps/admin/src/pages/settings/tax.tsx:L8 | neighbors=[tax.tsx]
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
- "shipping_shipping_controller_shippingcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.controller.ts:L23 | neighbors=[ShippingController]
- "shipping_shipping_controller_shippingcontroller_create": ".create()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.controller.ts:L39 | neighbors=[ShippingController]
- "shipping_shipping_controller_shippingcontroller_get": ".get()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.controller.ts:L33 | neighbors=[ShippingController]
- "shipping_shipping_controller_shippingcontroller_list": ".list()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.controller.ts:L27 | neighbors=[ShippingController]
- "shipping_shipping_controller_shippingcontroller_remove": ".remove()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.controller.ts:L58 | neighbors=[ShippingController]
- "shipping_shipping_controller_shippingcontroller_update": ".update()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.controller.ts:L48 | neighbors=[ShippingController]
- "shipping_shipping_module_shippingmodule": "ShippingModule" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.module.ts:L14 | neighbors=[shipping.module.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-029.json

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
