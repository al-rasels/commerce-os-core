# Node Description Batch 24 of 51

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

- "auth_auth_service_authservice_invite": ".invite()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L232 | neighbors=[AuthService]
- "auth_auth_service_authservice_logout": ".logout()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L297 | neighbors=[AuthService]
- "auth_auth_service_authservice_me": ".me()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L289 | neighbors=[AuthService]
- "auth_auth_service_authservice_resetpassword": ".resetPassword()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L189 | neighbors=[AuthService]
- "auth_auth_service_authservice_setupmfa": ".setupMfa()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L131 | neighbors=[AuthService]
- "auth_auth_service_authservice_verifyandenablemfa": ".verifyAndEnableMfa()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L142 | neighbors=[AuthService]
- "b2b_b2b_controller_b2bcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/business/b2b/b2b.controller.ts:L10 | neighbors=[B2bController]
- "b2b_b2b_controller_b2bcontroller_getcompanies": ".getCompanies()" | kind=code-symbol | source=apps/api/src/modules/business/b2b/b2b.controller.ts:L13 | neighbors=[B2bController]
- "b2b_b2b_controller_b2bcontroller_getpricelists": ".getPriceLists()" | kind=code-symbol | source=apps/api/src/modules/business/b2b/b2b.controller.ts:L18 | neighbors=[B2bController]
- "b2b_b2b_module_b2bmodule": "B2bModule" | kind=code-symbol | source=apps/api/src/modules/business/b2b/b2b.module.ts:L13 | neighbors=[b2b.module.ts]
- "b2b_b2b_service_b2bservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/business/b2b/b2b.service.ts:L8 | neighbors=[B2bService]
- "b2b_b2b_service_b2bservice_getcompanies": ".getCompanies()" | kind=code-symbol | source=apps/api/src/modules/business/b2b/b2b.service.ts:L13 | neighbors=[B2bService]
- "b2b_b2b_service_b2bservice_getpricelists": ".getPriceLists()" | kind=code-symbol | source=apps/api/src/modules/business/b2b/b2b.service.ts:L19 | neighbors=[B2bService]
- "b2b_companyprofileslistpage_companyprofileslistpage": "CompanyProfilesListPage()" | kind=code-symbol | source=apps/admin/src/pages/b2b/CompanyProfilesListPage.tsx:L5 | neighbors=[CompanyProfilesListPage.tsx]
- "b2b_draftorderspage_draftorderspage": "DraftOrdersPage()" | kind=code-symbol | source=apps/admin/src/pages/b2b/DraftOrdersPage.tsx:L53 | neighbors=[DraftOrdersPage.tsx]
- "b2b_draftorderspage_draftorderstable": "DraftOrdersTable()" | kind=code-symbol | source=apps/admin/src/pages/b2b/DraftOrdersPage.tsx:L8 | neighbors=[DraftOrdersPage.tsx]
- "b2b_page_b2bportalpage": "B2BPortalPage()" | kind=code-symbol | source=apps/storefront/src/app/(auth)/b2b/page.tsx:L8 | neighbors=[page.tsx]
- "b2b_pricelistspage_pricelistspage": "PriceListsPage()" | kind=code-symbol | source=apps/admin/src/pages/b2b/PriceListsPage.tsx:L4 | neighbors=[PriceListsPage.tsx]
- "builder_builder_controller_buildercontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.controller.ts:L19 | neighbors=[BuilderController]
- "builder_builder_controller_buildercontroller_getpagelayout": ".getPageLayout()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.controller.ts:L23 | neighbors=[BuilderController]
- "builder_builder_controller_buildercontroller_publishpagelayout": ".publishPageLayout()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.controller.ts:L51 | neighbors=[BuilderController]
- "builder_builder_controller_buildercontroller_unpublishpagelayout": ".unpublishPageLayout()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.controller.ts:L61 | neighbors=[BuilderController]
- "builder_builder_controller_buildercontroller_updatepagelayout": ".updatePageLayout()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.controller.ts:L34 | neighbors=[BuilderController]
- "builder_builder_module_buildermodule": "BuilderModule" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.module.ts:L13 | neighbors=[builder.module.ts]
- "builder_builder_service_builderservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.service.ts:L12 | neighbors=[BuilderService]
- "builder_builder_service_builderservice_getpagelayout": ".getPageLayout()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.service.ts:L14 | neighbors=[BuilderService]
- "builder_builder_service_builderservice_publishpagelayout": ".publishPageLayout()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.service.ts:L105 | neighbors=[BuilderService]
- "builder_builder_service_builderservice_unpublishpagelayout": ".unpublishPageLayout()" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.service.ts:L136 | neighbors=[BuilderService]
- "builder_pagebuilder_pagebuilder": "PageBuilder()" | kind=code-symbol | source=apps/admin/src/pages/builder/PageBuilder.tsx:L16 | neighbors=[PageBuilder.tsx]
- "builder_propertypanel_propertypanelprops": "PropertyPanelProps" | kind=code-symbol | source=apps/admin/src/pages/builder/PropertyPanel.tsx:L5 | neighbors=[PropertyPanel.tsx]
- "cache_tenant_cache_service_tenantcacheservice_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/common/cache/tenant-cache.service.ts:L7 | neighbors=[TenantCacheService]
- "cart_cart_controller_cartcontroller_additem": ".addItem()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L42 | neighbors=[CartController]
- "cart_cart_controller_cartcontroller_clearcart": ".clearCart()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L73 | neighbors=[CartController]
- "cart_cart_controller_cartcontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L23 | neighbors=[CartController]
- "cart_cart_controller_cartcontroller_create": ".create()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L27 | neighbors=[CartController]
- "cart_cart_controller_cartcontroller_get": ".get()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L36 | neighbors=[CartController]
- "cart_cart_controller_cartcontroller_removeitem": ".removeItem()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L63 | neighbors=[CartController]
- "cart_cart_controller_cartcontroller_updateitem": ".updateItem()" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L52 | neighbors=[CartController]
- "cart_cart_drawer_cart": "Cart" | kind=code-symbol | source=apps/storefront/src/components/cart/cart-drawer.tsx:L17 | neighbors=[cart-drawer.tsx]
- "cart_cart_drawer_cartitem": "CartItem" | kind=code-symbol | source=apps/storefront/src/components/cart/cart-drawer.tsx:L11 | neighbors=[cart-drawer.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-023.json

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
