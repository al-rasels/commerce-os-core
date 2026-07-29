# Node Description Batch 42 of 51

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

- "settings_tax_taxsettingspage": "TaxSettingsPage()" | kind=code-symbol | source=apps/admin/src/pages/settings/tax.tsx:L8 | neighbors=[tax.tsx]
- "shared_types_index_category": "Category" | kind=code-symbol | source=packages/shared-types/index.ts:L76 | neighbors=[index.ts]
- "shared_types_index_categoryschema": "CategorySchema" | kind=code-symbol | source=packages/shared-types/index.ts:L69 | neighbors=[index.ts]
- "shared_types_index_componentmetadata": "ComponentMetadata" | kind=code-symbol | source=packages/shared-types/index.ts:L81 | neighbors=[index.ts]
- "shared_types_index_plantier": "PlanTier" | kind=code-symbol | source=packages/shared-types/index.ts:L79 | neighbors=[index.ts]
- "shared_types_index_product": "Product" | kind=code-symbol | source=packages/shared-types/index.ts:L53 | neighbors=[index.ts]
- "shared_types_index_productschema": "ProductSchema" | kind=code-symbol | source=packages/shared-types/index.ts:L40 | neighbors=[index.ts]
- "shared_types_index_productvariant": "ProductVariant" | kind=code-symbol | source=packages/shared-types/index.ts:L66 | neighbors=[index.ts]
- "shared_types_index_productvariantschema": "ProductVariantSchema" | kind=code-symbol | source=packages/shared-types/index.ts:L55 | neighbors=[index.ts]
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
- "shipping_shipping_rule_repository_shippingrulerepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping-rule.repository.ts:L7 | neighbors=[ShippingRuleRepository]
- "shipping_shipping_rule_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[ShippingRuleRepository]
- "shipping_shipping_service_shippingservice_calculateshippingoptions": ".calculateShippingOptions()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L42 | neighbors=[ShippingService]
- "shipping_shipping_service_shippingservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L9 | neighbors=[ShippingService]
- "shipping_shipping_service_shippingservice_createrule": ".createRule()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L25 | neighbors=[ShippingService]
- "shipping_shipping_service_shippingservice_deleterule": ".deleteRule()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L37 | neighbors=[ShippingService]
- "shipping_shipping_service_shippingservice_getrule": ".getRule()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L17 | neighbors=[ShippingService]
- "shipping_shipping_service_shippingservice_listrules": ".listRules()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L11 | neighbors=[ShippingService]
- "shipping_shipping_service_shippingservice_updaterule": ".updateRule()" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.service.ts:L29 | neighbors=[ShippingService]
- "slug_loading_loading": "Loading()" | kind=code-symbol | source=apps/storefront/src/app/products/[slug]/loading.tsx:L3 | neighbors=[loading.tsx]
- "slug_page_categorypage": "CategoryPage()" | kind=code-symbol | source=apps/storefront/src/app/categories/[slug]/page.tsx:L19 | neighbors=[page.tsx]
- "slug_page_generatemetadata": "generateMetadata()" | kind=code-symbol | source=apps/storefront/src/app/products/[slug]/page.tsx:L10 | neighbors=[page.tsx]
- "slug_page_productpage": "ProductPage()" | kind=code-symbol | source=apps/storefront/src/app/products/[slug]/page.tsx:L25 | neighbors=[page.tsx]
- "src_app_app": "App()" | kind=code-symbol | source=apps/admin/src/App.tsx:L39 | neighbors=[App.tsx]
- "src_app_controller_appcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/app.controller.ts:L6 | neighbors=[AppController]
- "src_app_controller_appcontroller_gethello": ".getHello()" | kind=code-symbol | source=apps/api/src/app.controller.ts:L9 | neighbors=[AppController]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-041.json

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
