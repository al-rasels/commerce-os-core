# Node Description Batch 29 of 37

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

- "references_utility_types_some": "Some" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L58 | neighbors=[utility-types.ts]
- "references_utility_types_split": "Split" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L208 | neighbors=[utility-types.ts]
- "references_utility_types_timestamp": "Timestamp" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L25 | neighbors=[utility-types.ts]
- "references_utility_types_tuple": "Tuple" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L151 | neighbors=[utility-types.ts]
- "references_utility_types_tupleof": "_TupleOf" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L157 | neighbors=[utility-types.ts]
- "references_utility_types_unionlast": "UnionLast" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L241 | neighbors=[utility-types.ts]
- "references_utility_types_uniontointersection": "UnionToIntersection" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L250 | neighbors=[utility-types.ts]
- "references_utility_types_uniontotuple": "UnionToTuple" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L259 | neighbors=[utility-types.ts]
- "references_utility_types_userid": "UserId" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L22 | neighbors=[utility-types.ts]
- "references_utility_types_uuid": "UUID" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L24 | neighbors=[utility-types.ts]
- "register_page_registerpage": "RegisterPage()" | kind=code-symbol | source=apps/storefront/src/app/account/register/page.tsx:L11 | neighbors=[page.tsx]
- "repositories_cart_item_repository_cartitemrepository_clearbycartid": ".clearByCartId()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/repositories/cart-item.repository.ts:L13 | neighbors=[CartItemRepository]
- "repositories_cart_item_repository_cartitemrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/repositories/cart-item.repository.ts:L9 | neighbors=[CartItemRepository]
- "repositories_cart_item_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[CartItemRepository]
- "repositories_cart_repository_cartrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/repositories/cart.repository.ts:L8 | neighbors=[CartRepository]
- "repositories_cart_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[CartRepository]
- "repositories_category_repository_categoryrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/category.repository.ts:L8 | neighbors=[CategoryRepository]
- "repositories_category_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[CategoryRepository]
- "repositories_page_layout_repository_pagelayoutrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/repositories/page-layout.repository.ts:L9 | neighbors=[PageLayoutRepository]
- "repositories_page_layout_repository_pagelayoutrepository_findbypagekey": ".findByPageKey()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/repositories/page-layout.repository.ts:L14 | neighbors=[PageLayoutRepository]
- "repositories_page_layout_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[PageLayoutRepository]
- "repositories_product_repository_productrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/product.repository.ts:L8 | neighbors=[ProductRepository]
- "repositories_product_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[ProductRepository]
- "repositories_product_variant_repository_productvariantrepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/product-variant.repository.ts:L9 | neighbors=[ProductVariantRepository]
- "repositories_product_variant_repository_productvariantrepository_incrementreservedstock": ".incrementReservedStock()" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/product-variant.repository.ts:L13 | neighbors=[ProductVariantRepository]
- "repositories_product_variant_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[ProductVariantRepository]
- "repositories_tenant_scoped_repository_constructor": "constructor()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L7 | neighbors=[tenant-scoped.repository.ts]
- "repositories_tenant_scoped_repository_create": "create()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L59 | neighbors=[tenant-scoped.repository.ts]
- "repositories_tenant_scoped_repository_delete": "delete()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L82 | neighbors=[tenant-scoped.repository.ts]
- "repositories_tenant_scoped_repository_spec_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[TestRepo]
- "repositories_tenant_scoped_repository_spec_testrepo_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.spec.ts:L5 | neighbors=[TestRepo]
- "repositories_tenant_scoped_repository_updatebytenant": "updateByTenant()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L92 | neighbors=[tenant-scoped.repository.ts]
- "repositories_theme_override_repository_tenantscopedrepository": "TenantScopedRepository" | kind=code-symbol | neighbors=[ThemeTenantOverrideRepository]
- "repositories_theme_override_repository_themetenantoverriderepository_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/experience/theme/repositories/theme-override.repository.ts:L8 | neighbors=[ThemeTenantOverrideRepository]
- "reset_password_page_resetpasswordform": "ResetPasswordForm()" | kind=code-symbol | source=apps/storefront/src/app/account/reset-password/page.tsx:L12 | neighbors=[page.tsx]
- "reset_password_page_resetpasswordpage": "ResetPasswordPage()" | kind=code-symbol | source=apps/storefront/src/app/account/reset-password/page.tsx:L125 | neighbors=[page.tsx]
- "scripts_api_validator_rationale_19": "Find API-related files." | kind=entity | source=.agents/skills/api-patterns/scripts/api_validator.py:L19 | neighbors=[find_api_files()]
- "scripts_api_validator_rationale_38": "Check OpenAPI/Swagger specification." | kind=entity | source=.agents/skills/api-patterns/scripts/api_validator.py:L38 | neighbors=[check_openapi_spec()]
- "scripts_api_validator_rationale_95": "Check API code for common issues." | kind=entity | source=.agents/skills/api-patterns/scripts/api_validator.py:L95 | neighbors=[check_api_code()]
- "scripts_lighthouse_audit_rationale_17": "Run Lighthouse audit on URL." | kind=entity | source=.agents/skills/performance-profiling/scripts/lighthouse_audit.py:L17 | neighbors=[run_lighthouse()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-028.json

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
