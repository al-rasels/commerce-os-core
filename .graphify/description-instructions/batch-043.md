# Node Description Batch 44 of 51

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

- "storefront_next_config_nextconfig": "nextConfig" | kind=code-symbol | source=apps/storefront/next.config.ts:L3 | neighbors=[next.config.ts]
- "storefront_postcss_config_config": "config" | kind=code-symbol | source=apps/storefront/postcss.config.mjs:L1 | neighbors=[postcss.config.mjs]
- "storefront_storefront_cart_controller_storefrontcartcontroller_additem": ".addItem()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-cart.controller.ts:L54 | neighbors=[StorefrontCartController]
- "storefront_storefront_cart_controller_storefrontcartcontroller_createcart": ".createCart()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-cart.controller.ts:L21 | neighbors=[StorefrontCartController]
- "storefront_storefront_cart_controller_storefrontcartcontroller_getcart": ".getCart()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-cart.controller.ts:L38 | neighbors=[StorefrontCartController]
- "storefront_storefront_cart_controller_storefrontcartcontroller_removeitem": ".removeItem()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-cart.controller.ts:L120 | neighbors=[StorefrontCartController]
- "storefront_storefront_cart_controller_storefrontcartcontroller_updateitem": ".updateItem()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-cart.controller.ts:L97 | neighbors=[StorefrontCartController]
- "storefront_storefront_checkout_controller_storefrontcheckoutcontroller_checkout": ".checkout()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-checkout.controller.ts:L18 | neighbors=[StorefrontCheckoutController]
- "storefront_storefront_controller_storefrontcontroller_getorder": ".getOrder()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront.controller.ts:L128 | neighbors=[StorefrontController]
- "storefront_storefront_controller_storefrontcontroller_getproduct": ".getProduct()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront.controller.ts:L74 | neighbors=[StorefrontController]
- "storefront_storefront_controller_storefrontcontroller_listcategories": ".listCategories()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront.controller.ts:L94 | neighbors=[StorefrontController]
- "storefront_storefront_controller_storefrontcontroller_listordersbyemail": ".listOrdersByEmail()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront.controller.ts:L105 | neighbors=[StorefrontController]
- "storefront_storefront_controller_storefrontcontroller_listproducts": ".listProducts()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront.controller.ts:L8 | neighbors=[StorefrontController]
- "storefront_storefront_module_storefrontmodule": "StorefrontModule" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront.module.ts:L19 | neighbors=[storefront.module.ts]
- "storefront_storefront_order_controller_storefrontordercontroller_getorder": ".getOrder()" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-order.controller.ts:L8 | neighbors=[StorefrontOrderController]
- "subscriptions_page_subscriptionspage": "SubscriptionsPage()" | kind=code-symbol | source=apps/storefront/src/app/account/subscriptions/page.tsx:L8 | neighbors=[page.tsx]
- "subscriptions_subscriptions_controller_subscriptionscontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/business/subscriptions/subscriptions.controller.ts:L10 | neighbors=[SubscriptionsController]
- "subscriptions_subscriptions_controller_subscriptionscontroller_getsubscriptions": ".getSubscriptions()" | kind=code-symbol | source=apps/api/src/modules/business/subscriptions/subscriptions.controller.ts:L13 | neighbors=[SubscriptionsController]
- "subscriptions_subscriptions_module_subscriptionsmodule": "SubscriptionsModule" | kind=code-symbol | source=apps/api/src/modules/business/subscriptions/subscriptions.module.ts:L12 | neighbors=[subscriptions.module.ts]
- "subscriptions_subscriptions_service_subscriptionsservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/business/subscriptions/subscriptions.service.ts:L7 | neighbors=[SubscriptionsService]
- "subscriptions_subscriptions_service_subscriptionsservice_getsubscriptions": ".getSubscriptions()" | kind=code-symbol | source=apps/api/src/modules/business/subscriptions/subscriptions.service.ts:L9 | neighbors=[SubscriptionsService]
- "subscriptions_subscriptionslistpage_subscriptionslistpage": "SubscriptionsListPage()" | kind=code-symbol | source=apps/admin/src/pages/subscriptions/SubscriptionsListPage.tsx:L6 | neighbors=[SubscriptionsListPage.tsx]
- "success_page_checkoutsuccesspage": "CheckoutSuccessPage()" | kind=code-symbol | source=apps/storefront/src/app/checkout/success/page.tsx:L94 | neighbors=[page.tsx]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-043.json

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
