# Node Description Batch 17 of 51

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
- "auth_auth_service_authservice_login": ".login()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L64 | neighbors=[AuthService, .generateTokens()]
- "auth_auth_service_authservice_mfaverify": ".mfaVerify()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L100 | neighbors=[AuthService, .generateTokens()]
- "auth_auth_service_authservice_refresh": ".refresh()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L261 | neighbors=[AuthService, .generateTokens()]
- "auth_auth_service_authservice_register": ".register()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L35 | neighbors=[AuthService, .generateTokens()]
- "b2b_pricelistspage": "PriceListsPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/b2b/PriceListsPage.tsx:L1 | neighbors=[PriceListsPage(), 7d74efe feat(commerce): implement B2B, …]
- "builder_builder_service_builderservice_updatepagelayout": ".updatePageLayout()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.service.ts:L59 | neighbors=[BuilderService, .validatePlanRequirements()]
- "builder_builder_service_builderservice_validateplanrequirements": ".validatePlanRequirements()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.service.ts:L29 | neighbors=[BuilderService, .updatePageLayout()]
- "builder_databindingpanel_databindingpanel": "DataBindingPanel()" | kind=code-symbol | source=apps/admin/src/pages/builder/DataBindingPanel.tsx:L5 | neighbors=[DataBindingPanel.tsx, PageBuilder.tsx]
- "builder_propertypanel_propertypanel": "PropertyPanel()" | kind=code-symbol | source=apps/admin/src/pages/builder/PropertyPanel.tsx:L10 | neighbors=[PageBuilder.tsx, PropertyPanel.tsx]
- "builder_responsiveeditor_responsiveeditor": "ResponsiveEditor()" | kind=code-symbol | source=apps/admin/src/pages/builder/ResponsiveEditor.tsx:L3 | neighbors=[PageBuilder.tsx, ResponsiveEditor.tsx]
- "cache_tenant_cache_service_tenantcacheservice_del": ".del()" | kind=code-symbol | source=apps/api/src/common/cache/tenant-cache.service.ts:L42 | neighbors=[TenantCacheService, .generateKey()]
- "cache_tenant_cache_service_tenantcacheservice_get": ".get()" | kind=code-symbol | source=apps/api/src/common/cache/tenant-cache.service.ts:L20 | neighbors=[TenantCacheService, .generateKey()]
- "cache_tenant_cache_service_tenantcacheservice_set": ".set()" | kind=code-symbol | source=apps/api/src/common/cache/tenant-cache.service.ts:L30 | neighbors=[TenantCacheService, .generateKey()]
- "cart_cart_drawer_formatprice": "formatPrice()" | kind=code-symbol | source=apps/storefront/src/components/cart/cart-drawer.tsx:L22 | neighbors=[cart-drawer.tsx, CartDrawer()]
- "cart_cart_service_cartservice_additem": ".addItem()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L51 | neighbors=[CartService, .create()]
- "cart_cart_service_cartservice_create": ".create()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L26 | neighbors=[CartService, .addItem()]
- "cart_cart_service_cartservice_removeitem": ".removeItem()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L115 | neighbors=[CartService, .updateItem()]
- "cart_cart_service_cartservice_updateitem": ".updateItem()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L84 | neighbors=[CartService, .removeItem()]
- "commit:repo:github.com/al-rasels/commerce-os-core@f33b196674d29e1b915283de2882b504b0dc78f6": "f33b196 feat(docs): add Phase 6 professional features specification to roadmap" | kind=Commit | source=git | neighbors=[d26bd04 feat(commerce): implement advan…, feat/admin-ui-refactor]
- "components_add_to_cart_button_addtocartbutton": "AddToCartButton()" | kind=code-symbol | source=apps/storefront/src/components/add-to-cart-button.tsx:L8 | neighbors=[add-to-cart-button.tsx, product-client.tsx]
- "components_alert_alert": "Alert()" | kind=code-symbol | source=packages/components/alert.tsx:L22 | neighbors=[alert.tsx, alertVariants]
- "components_alert_alertvariants": "alertVariants" | kind=code-symbol | source=packages/components/alert.tsx:L6 | neighbors=[alert.tsx, Alert()]
- "components_auth_guard_authguard": "AuthGuard()" | kind=code-symbol | source=apps/storefront/src/components/auth-guard.tsx:L6 | neighbors=[page.tsx, auth-guard.tsx]
- "components_badge_badge": "Badge()" | kind=code-symbol | source=packages/components/badge.tsx:L30 | neighbors=[badge.tsx, badgeVariants]
- "components_badge_badgevariants": "badgeVariants" | kind=code-symbol | source=packages/components/badge.tsx:L7 | neighbors=[badge.tsx, Badge()]
- "components_banner_banner": "Banner()" | kind=code-symbol | source=packages/components/banner.tsx:L10 | neighbors=[banner.tsx, registry.ts]
- "components_breadcrumbs_crumb": "Crumb" | kind=code-symbol | source=packages/components/breadcrumbs.tsx:L5 | neighbors=[breadcrumbs.tsx, breadcrumbs.spec.tsx]
- "components_buildernode_buildernode": "BuilderNode()" | kind=code-symbol | source=apps/admin/src/pages/builder/components/BuilderNode.tsx:L17 | neighbors=[PageBuilder.tsx, BuilderNode.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-016.json

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
