# Node Description Batch 13 of 37

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

- "api_shipping_shippingapi": "shippingApi" | kind=code-symbol | source=apps/admin/src/lib/api/shipping.ts:L12 | neighbors=[index.ts, shipping.ts]
- "api_shipping_shippingrule": "ShippingRule" | kind=code-symbol | source=apps/admin/src/lib/api/shipping.ts:L3 | neighbors=[index.ts, shipping.ts]
- "api_superadmin_superadminapi": "superAdminApi" | kind=code-symbol | source=apps/admin/src/lib/api/superAdmin.ts:L28 | neighbors=[index.ts, superAdmin.ts]
- "api_superadmin_tenant": "Tenant" | kind=code-symbol | source=apps/admin/src/lib/api/superAdmin.ts:L3 | neighbors=[index.ts, superAdmin.ts]
- "api_superadmin_tenantdetail": "TenantDetail" | kind=code-symbol | source=apps/admin/src/lib/api/superAdmin.ts:L20 | neighbors=[index.ts, superAdmin.ts]
- "api_superadmin_tenantlistresponse": "TenantListResponse" | kind=code-symbol | source=apps/admin/src/lib/api/superAdmin.ts:L13 | neighbors=[index.ts, superAdmin.ts]
- "api_tax_taxapi": "taxApi" | kind=code-symbol | source=apps/admin/src/lib/api/tax.ts:L13 | neighbors=[index.ts, tax.ts]
- "api_tax_taxrule": "TaxRule" | kind=code-symbol | source=apps/admin/src/lib/api/tax.ts:L3 | neighbors=[index.ts, tax.ts]
- "api_users_inviteuserinput": "InviteUserInput" | kind=code-symbol | source=apps/admin/src/lib/api/users.ts:L30 | neighbors=[index.ts, users.ts]
- "api_users_listusersparams": "ListUsersParams" | kind=code-symbol | source=apps/admin/src/lib/api/users.ts:L24 | neighbors=[index.ts, users.ts]
- "api_users_updateuserinput": "UpdateUserInput" | kind=code-symbol | source=apps/admin/src/lib/api/users.ts:L35 | neighbors=[index.ts, users.ts]
- "api_users_updateuserstatusinput": "UpdateUserStatusInput" | kind=code-symbol | source=apps/admin/src/lib/api/users.ts:L41 | neighbors=[index.ts, users.ts]
- "api_users_userapi": "userApi" | kind=code-symbol | source=apps/admin/src/lib/api/users.ts:L45 | neighbors=[index.ts, users.ts]
- "api_users_userlistresponse": "UserListResponse" | kind=code-symbol | source=apps/admin/src/lib/api/users.ts:L13 | neighbors=[index.ts, users.ts]
- "audit_log_audit_log_module": "audit-log.module.ts" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.module.ts:L1 | neighbors=[AuditLogModule, 3d66d0f feat: implement payments module…]
- "audit_log_audit_log_repository": "audit-log.repository.ts" | kind=code-symbol | source=apps/api/src/modules/platform/audit-log/audit-log.repository.ts:L1 | neighbors=[AuditLogRepository, 3d66d0f feat: implement payments module…]
- "auth_auth_service_authservice_login": ".login()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L57 | neighbors=[AuthService, .generateTokens()]
- "auth_auth_service_authservice_mfaverify": ".mfaVerify()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L92 | neighbors=[AuthService, .generateTokens()]
- "auth_auth_service_authservice_refresh": ".refresh()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L244 | neighbors=[AuthService, .generateTokens()]
- "auth_auth_service_authservice_register": ".register()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L32 | neighbors=[AuthService, .generateTokens()]
- "cache_tenant_cache_service_tenantcacheservice_del": ".del()" | kind=code-symbol | source=apps/api/src/common/cache/tenant-cache.service.ts:L42 | neighbors=[TenantCacheService, .generateKey()]
- "cache_tenant_cache_service_tenantcacheservice_get": ".get()" | kind=code-symbol | source=apps/api/src/common/cache/tenant-cache.service.ts:L20 | neighbors=[TenantCacheService, .generateKey()]
- "cache_tenant_cache_service_tenantcacheservice_set": ".set()" | kind=code-symbol | source=apps/api/src/common/cache/tenant-cache.service.ts:L30 | neighbors=[TenantCacheService, .generateKey()]
- "cart_cart_drawer_formatprice": "formatPrice()" | kind=code-symbol | source=apps/storefront/src/components/cart/cart-drawer.tsx:L21 | neighbors=[cart-drawer.tsx, CartDrawer()]
- "cart_cart_module": "cart.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.module.ts:L1 | neighbors=[CartModule, 3d66d0f feat: implement payments module…]
- "cart_cart_service_cartservice_additem": ".addItem()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L51 | neighbors=[CartService, .create()]
- "cart_cart_service_cartservice_create": ".create()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L26 | neighbors=[CartService, .addItem()]
- "cart_cart_service_cartservice_removeitem": ".removeItem()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L115 | neighbors=[CartService, .updateItem()]
- "cart_cart_service_cartservice_updateitem": ".updateItem()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L84 | neighbors=[CartService, .removeItem()]
- "checkout_checkout_module": "checkout.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.module.ts:L1 | neighbors=[CheckoutModule, 3d66d0f feat: implement payments module…]
- "commit:repo:github.com/al-rasels/commerce-os-core@4a91873404bd4be9cc50866ad56e211c7be01ebd": "4a91873 chore: add .graphify directory to git" | kind=Commit | source=git | neighbors=[main, 4ddc1b9 fix(build): resolve type and im…]
- "commit:repo:github.com/al-rasels/commerce-os-core@e425b0fe05c57b1d70b777d9bf2ad1286a3a0a59": "e425b0f docs: upload -docs" | kind=Commit | source=git | neighbors=[main, c6b41a4 docs: upload -docs]
- "components_add_to_cart_button_addtocartbutton": "AddToCartButton()" | kind=code-symbol | source=apps/storefront/src/components/add-to-cart-button.tsx:L8 | neighbors=[add-to-cart-button.tsx, product-client.tsx]
- "components_auth_guard_authguard": "AuthGuard()" | kind=code-symbol | source=apps/storefront/src/components/auth-guard.tsx:L6 | neighbors=[page.tsx, auth-guard.tsx]
- "components_banner_banner": "Banner()" | kind=code-symbol | source=packages/components/banner.tsx:L10 | neighbors=[banner.tsx, registry.ts]
- "components_breadcrumbs_crumb": "Crumb" | kind=code-symbol | source=packages/components/breadcrumbs.tsx:L5 | neighbors=[breadcrumbs.tsx, breadcrumbs.spec.tsx]
- "components_cart_badge_cartbadge": "CartBadge()" | kind=code-symbol | source=apps/storefront/src/components/cart-badge.tsx:L8 | neighbors=[layout.tsx, cart-badge.tsx]
- "components_cart_drawer_cartdrawer": "CartDrawer()" | kind=code-symbol | source=packages/components/cart-drawer.tsx:L11 | neighbors=[cart-drawer.tsx, registry.ts]
- "components_checkout_summary_checkoutsummary": "CheckoutSummary()" | kind=code-symbol | source=packages/components/checkout-summary.tsx:L7 | neighbors=[checkout-summary.tsx, registry.ts]
- "components_data_table_datatable": "DataTable()" | kind=code-symbol | source=packages/components/data-table.tsx:L26 | neighbors=[data-table.tsx, registry.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-012.json

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
