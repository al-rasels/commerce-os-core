# Node Description Batch 16 of 51

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

- "api_customers_customerinput": "CustomerInput" | kind=code-symbol | source=apps/admin/src/lib/api/customers.ts:L35 | neighbors=[customers.ts, index.ts]
- "api_customers_customerlistresponse": "CustomerListResponse" | kind=code-symbol | source=apps/admin/src/lib/api/customers.ts:L12 | neighbors=[customers.ts, index.ts]
- "api_customers_listcustomersparams": "ListCustomersParams" | kind=code-symbol | source=apps/admin/src/lib/api/customers.ts:L29 | neighbors=[customers.ts, index.ts]
- "api_dashboard_dashboardapi": "dashboardApi" | kind=code-symbol | source=apps/admin/src/lib/api/dashboard.ts:L14 | neighbors=[dashboard.ts, index.ts]
- "api_dashboard_dashboardstats": "DashboardStats" | kind=code-symbol | source=apps/admin/src/lib/api/dashboard.ts:L4 | neighbors=[dashboard.ts, index.ts]
- "api_eslint_config": "eslint.config.mjs" | kind=code-symbol | source=apps/api/eslint.config.mjs:L1 | neighbors=[028709f chore: scaffold monorepo with a…, bb279ee fix(ci): fix api tests and lint…]
- "api_experience_resolvedtheme": "ResolvedTheme" | kind=code-symbol | source=apps/admin/src/lib/api/experience.ts:L3 | neighbors=[experience.ts, index.ts]
- "api_experience_themeapi": "themeApi" | kind=code-symbol | source=apps/admin/src/lib/api/experience.ts:L10 | neighbors=[experience.ts, index.ts]
- "api_inventory_inventoryapi": "inventoryApi" | kind=code-symbol | source=apps/admin/src/lib/api/inventory.ts:L41 | neighbors=[index.ts, inventory.ts]
- "api_inventory_inventorylevel": "InventoryLevel" | kind=code-symbol | source=apps/admin/src/lib/api/inventory.ts:L23 | neighbors=[index.ts, inventory.ts]
- "api_inventory_inventorylevelinput": "InventoryLevelInput" | kind=code-symbol | source=apps/admin/src/lib/api/inventory.ts:L34 | neighbors=[index.ts, inventory.ts]
- "api_inventory_inventorylocation": "InventoryLocation" | kind=code-symbol | source=apps/admin/src/lib/api/inventory.ts:L3 | neighbors=[index.ts, inventory.ts]
- "api_inventory_inventorylocationinput": "InventoryLocationInput" | kind=code-symbol | source=apps/admin/src/lib/api/inventory.ts:L15 | neighbors=[index.ts, inventory.ts]
- "api_orders_cantransition": "canTransition()" | kind=code-symbol | source=apps/admin/src/lib/api/orders.ts:L49 | neighbors=[index.ts, orders.ts]
- "api_orders_listordersparams": "ListOrdersParams" | kind=code-symbol | source=apps/admin/src/lib/api/orders.ts:L32 | neighbors=[index.ts, orders.ts]
- "api_orders_order_valid_transitions": "ORDER_VALID_TRANSITIONS" | kind=code-symbol | source=apps/admin/src/lib/api/orders.ts:L41 | neighbors=[index.ts, orders.ts]
- "api_orders_orderapi": "orderApi" | kind=code-symbol | source=apps/admin/src/lib/api/orders.ts:L53 | neighbors=[index.ts, orders.ts]
- "api_orders_orderitem": "OrderItem" | kind=code-symbol | source=apps/admin/src/lib/api/orders.ts:L3 | neighbors=[index.ts, orders.ts]
- "api_orders_orderlistresponse": "OrderListResponse" | kind=code-symbol | source=apps/admin/src/lib/api/orders.ts:L25 | neighbors=[index.ts, orders.ts]
- "api_pages_pagelayout": "PageLayout" | kind=code-symbol | source=apps/admin/src/lib/api/pages.ts:L11 | neighbors=[index.ts, pages.ts]
- "api_pages_pagesapi": "pagesApi" | kind=code-symbol | source=apps/admin/src/lib/api/pages.ts:L17 | neighbors=[index.ts, pages.ts]
- "api_pages_pagesection": "PageSection" | kind=code-symbol | source=apps/admin/src/lib/api/pages.ts:L3 | neighbors=[index.ts, pages.ts]
- "api_promotions_promotion": "Promotion" | kind=code-symbol | source=apps/admin/src/lib/api/promotions.ts:L3 | neighbors=[index.ts, promotions.ts]
- "api_promotions_promotionsapi": "promotionsApi" | kind=code-symbol | source=apps/admin/src/lib/api/promotions.ts:L16 | neighbors=[index.ts, promotions.ts]
- "api_returns_returnrequest": "ReturnRequest" | kind=code-symbol | source=apps/admin/src/lib/api/returns.ts:L3 | neighbors=[index.ts, returns.ts]
- "api_returns_returnrequestinput": "ReturnRequestInput" | kind=code-symbol | source=apps/admin/src/lib/api/returns.ts:L15 | neighbors=[index.ts, returns.ts]
- "api_returns_returnsapi": "returnsApi" | kind=code-symbol | source=apps/admin/src/lib/api/returns.ts:L23 | neighbors=[index.ts, returns.ts]
- "api_shipping_shippingapi": "shippingApi" | kind=code-symbol | source=apps/admin/src/lib/api/shipping.ts:L12 | neighbors=[index.ts, shipping.ts]
- "api_shipping_shippingrule": "ShippingRule" | kind=code-symbol | source=apps/admin/src/lib/api/shipping.ts:L3 | neighbors=[index.ts, shipping.ts]
- "api_subscriptions_subscription": "Subscription" | kind=code-symbol | source=apps/admin/src/lib/api/subscriptions.ts:L3 | neighbors=[index.ts, subscriptions.ts]
- "api_subscriptions_subscriptioninput": "SubscriptionInput" | kind=code-symbol | source=apps/admin/src/lib/api/subscriptions.ts:L15 | neighbors=[index.ts, subscriptions.ts]
- "api_subscriptions_subscriptionsapi": "subscriptionsApi" | kind=code-symbol | source=apps/admin/src/lib/api/subscriptions.ts:L22 | neighbors=[index.ts, subscriptions.ts]
- "api_superadmin_superadminapi": "superAdminApi" | kind=code-symbol | source=apps/admin/src/lib/api/superAdmin.ts:L28 | neighbors=[index.ts, superAdmin.ts]
- "api_superadmin_tenant": "Tenant" | kind=code-symbol | source=apps/admin/src/lib/api/superAdmin.ts:L3 | neighbors=[index.ts, superAdmin.ts]
- "api_superadmin_tenantdetail": "TenantDetail" | kind=code-symbol | source=apps/admin/src/lib/api/superAdmin.ts:L20 | neighbors=[index.ts, superAdmin.ts]
- "api_superadmin_tenantlistresponse": "TenantListResponse" | kind=code-symbol | source=apps/admin/src/lib/api/superAdmin.ts:L13 | neighbors=[index.ts, superAdmin.ts]
- "api_tax_taxapi": "taxApi" | kind=code-symbol | source=apps/admin/src/lib/api/tax.ts:L13 | neighbors=[index.ts, tax.ts]
- "api_tax_taxrule": "TaxRule" | kind=code-symbol | source=apps/admin/src/lib/api/tax.ts:L3 | neighbors=[index.ts, tax.ts]
- "api_users_inviteuserinput": "InviteUserInput" | kind=code-symbol | source=apps/admin/src/lib/api/users.ts:L30 | neighbors=[index.ts, users.ts]
- "api_users_listusersparams": "ListUsersParams" | kind=code-symbol | source=apps/admin/src/lib/api/users.ts:L24 | neighbors=[index.ts, users.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-015.json

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
