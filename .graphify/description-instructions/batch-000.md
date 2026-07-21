# Node Description Batch 1 of 37

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

- "commit:repo:github.com/al-rasels/commerce-os-core@ac49c08799df2b703aaae37d1e2dcd7f6176e0d9": "ac49c08 chore: batch commit — catalog CRUD, admin UI, auth gaps, storefront car…" | kind=Commit | source=git | neighbors=[3d66d0f feat: implement payments module…, migration.sql, vite.config.ts, catalog.ts, client.ts, customers.ts]
- "commit:repo:github.com/al-rasels/commerce-os-core@6ffba4357dee4c75c72a02e038fb4975a7db5b4f": "6ffba43 feat: add MFA auth flow, super admin tenant management, forgot/reset pa…" | kind=Commit | source=git | neighbors=[page.tsx, admin.controller.ts, admin.service.ts, index.ts, promotions.ts, shipping.ts]
- "commit:repo:github.com/al-rasels/commerce-os-core@3d66d0f1865f1e7fc65ca88b33dc1d88ed3a6442": "3d66d0f feat: implement payments module, checkout flow, auth, tenant resolution…" | kind=Commit | source=git | neighbors=[migration.sql, vite.config.ts, audit-log.controller.ts, audit-log.module.ts, audit-log.repository.ts, audit-log.service.ts]
- "components_registry": "registry.ts" | kind=code-symbol | source=packages/components/registry.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, index.ts, banner.tsx, Banner()]
- "commit:repo:github.com/al-rasels/commerce-os-core@3571d3a10585758e3f4325a08c70c95f1796cac5": "3571d3a feat(storefront): overhaul UI/UX for all core routes (M7, M8)" | kind=Commit | source=git | neighbors=[page.tsx, admin.controller.ts, admin.module.ts, admin.service.ts, home-client.tsx, layout.tsx]
- "api_index": "index.ts" | kind=code-symbol | source=apps/admin/src/lib/api/index.ts:L1 | neighbors=[catalog.ts, catalogApi, Category, CategoryInput, Product, ProductInput]
- "tenant_tenant_context_tenantcontext": "TenantContext" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-context.ts:L1 | neighbors=[audit-log.controller.ts, audit-log.service.ts, auth.controller.ts, auth.service.ts, auth.service.spec.ts, builder.controller.ts]
- "tenant_tenant_context": "tenant-context.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-context.ts:L1 | neighbors=[audit-log.controller.ts, audit-log.service.ts, auth.controller.ts, auth.service.ts, auth.service.spec.ts, builder.controller.ts]
- "references_utility_types": "utility-types.ts" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, Arguments, AssertEqual, assertNever(), AsyncFunction, AtLeast]
- "commit:repo:github.com/al-rasels/commerce-os-core@21888ffb23779b07f32963183c44ce6370a86d5d": "21888ff feat: implement commerce, catalog, and experience modules while expandi…" | kind=Commit | source=git | neighbors=[028709f chore: scaffold monorepo with a…, auth.controller.ts, auth.module.ts, auth.service.ts, main, builder.controller.ts]
- "components_index": "index.ts" | kind=code-symbol | source=packages/components/index.ts:L1 | neighbors=[layout.tsx, 028709f chore: scaffold monorepo with a…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, e5d6c72 feat: implement end-to-end chec…]
- "commit:repo:github.com/al-rasels/commerce-os-core@6eb89d7d3697f105f52053849212b47f1aa316f8": "6eb89d7 chore(tech-debt): resolve technical debt, fix typings, enforce strict t…" | kind=Commit | source=git | neighbors=[auth.controller.ts, auth.controller.spec.ts, auth.module.ts, auth.service.ts, auth.service.spec.ts, main]
- "components_utils": "utils.ts" | kind=code-symbol | source=packages/components/utils.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, banner.tsx, breadcrumbs.tsx, button.tsx, cart-drawer.tsx, checkout-summary.tsx]
- "components_utils_cn": "cn()" | kind=code-symbol | source=packages/components/utils.ts:L4 | neighbors=[banner.tsx, breadcrumbs.tsx, button.tsx, cart-drawer.tsx, checkout-summary.tsx, data-table.tsx]
- "branch:repo:github.com/al-rasels/commerce-os-core#main": "main" | kind=Branch | source=git | neighbors=[028709f chore: scaffold monorepo with a…, 21888ff feat: implement commerce, catal…, 24a34d0 docs: initialize enterprise pla…, 3571d3a feat(storefront): overhaul UI/U…, 39bac8e docs: initialize architecture, …, 3d66d0f feat: implement payments module…]
- "commit:repo:github.com/al-rasels/commerce-os-core@e3a8c77a0e8702387103364fc8773c8e59cb25a8": "e3a8c77 feat: implement users CRUD backend module and admin UI" | kind=Commit | source=git | neighbors=[ac49c08 chore: batch commit — catalog C…, users.ts, auth.controller.ts, auth.service.ts, main, 6eb89d7 chore(tech-debt): resolve techn…]
- "commit:repo:github.com/al-rasels/commerce-os-core@e5d6c724c32e3c305599ceda1b8b63aaf35c4ec4": "e5d6c72 feat: implement end-to-end checkout flow including UI components, API r…" | kind=Commit | source=git | neighbors=[92e2c6a feat: add checkout tenant isola…, layout.tsx, page.tsx, main, page.tsx, 4ddc1b9 fix(build): resolve type and im…]
- "lib_api": "api.ts" | kind=code-symbol | source=apps/storefront/src/lib/api.ts:L1 | neighbors=[page.tsx, cart-drawer.tsx, page.tsx, page.tsx, page.tsx, 6ffba43 feat: add MFA auth flow, super …]
- "20260716164323_init_migration": "migration.sql" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L1 | neighbors=[audit_log, cart_items, carts, categories, countries, currencies]
- "commit:repo:github.com/al-rasels/commerce-os-core@028709f854a3575703e15665786345cd1245396c": "028709f chore: scaffold monorepo with apps, shared packages, and agent-driven d…" | kind=Commit | source=git | neighbors=[vite.config.ts, eslint.config.mjs, layout.tsx, page.tsx, main, 21888ff feat: implement commerce, catal…]
- "app_layout": "layout.tsx" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L1 | neighbors=[footerColumns, geistMono, geistSans, metadata, RootLayout(), cart-badge.tsx]
- "lib_utils": "utils.ts" | kind=code-symbol | source=apps/storefront/src/lib/utils.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, cn(), accordion.tsx, badge.tsx, button.tsx, card.tsx]
- "lib_utils_cn": "cn()" | kind=code-symbol | source=apps/storefront/src/lib/utils.ts:L4 | neighbors=[utils.ts, accordion.tsx, badge.tsx, button.tsx, card.tsx, carousel.tsx]
- "repositories_tenant_scoped_repository": "tenant-scoped.repository.ts" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 3571d3a feat(storefront): overhaul UI/U…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, f1bfa47 feat: implement storefront orde…]
- "ui_button": "button.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/button.tsx:L1 | neighbors=[page.tsx, page.tsx, page.tsx, 3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, add-to-cart-button.tsx]
- "catalog_catalog_service_catalogservice": "CatalogService" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L19 | neighbors=[catalog.service.ts, .constructor(), .createCategory(), .createProduct(), .createVariant(), .deleteCategory()]
- "commit:repo:github.com/al-rasels/commerce-os-core@f1bfa474161dc672eb25d655e4296b1f2cf8a8d2": "f1bfa47 feat: implement storefront order retrieval, status management, and admi…" | kind=Commit | source=git | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, orders.ts, main, cart-drawer.tsx, page.tsx, 3571d3a feat(storefront): overhaul UI/U…]
- "ui_carousel": "carousel.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, f1d1a16 feat: implement storefront foun…, utils.ts, cn(), button.tsx, Button()]
- "ui_dropdown_menu": "dropdown-menu.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), DropdownMenu(), DropdownMenuCheckboxItem()]
- "20260716164323_init_migration_tenants": "tenants" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L31 | neighbors=[migration.sql, audit_log, cart_items, carts, categories, customers]
- "components_form_renderer": "form-renderer.tsx" | kind=code-symbol | source=packages/components/form-renderer.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, button.tsx, Button(), FieldType, FormField, FormRenderer()]
- "account_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/page.tsx:L1 | neighbors=[AccountPage(), api.ts, api, button.tsx, Button(), card.tsx]
- "api_client": "client.ts" | kind=code-symbol | source=apps/admin/src/lib/api/client.ts:L1 | neighbors=[catalog.ts, api, ApiError, getToken(), request(), customers.ts]
- "commit:repo:github.com/al-rasels/commerce-os-core@f1d1a16a3e09512fa67a0c218af262c98e8f2314": "f1d1a16 feat: implement storefront foundation with API integration, authenticat…" | kind=Commit | source=git | neighbors=[b121f53 some-things, home-client.tsx, main, cart-drawer.tsx, page.tsx, page.tsx]
- "lib_api_api": "api" | kind=code-symbol | source=apps/storefront/src/lib/api.ts:L46 | neighbors=[page.tsx, cart-drawer.tsx, page.tsx, page.tsx, page.tsx, add-to-cart-button.tsx]
- "ui_sheet": "sheet.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L1 | neighbors=[cart-drawer.tsx, 3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), button.tsx]
- "auth_auth_service_authservice": "AuthService" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L25 | neighbors=[auth.service.ts, .changePassword(), .constructor(), .disableMfa(), .forgotPassword(), .generateTokens()]
- "cart_cart_drawer": "cart-drawer.tsx" | kind=code-symbol | source=apps/storefront/src/components/cart/cart-drawer.tsx:L1 | neighbors=[Cart, CartDrawer(), CartItem, formatPrice(), api.ts, api]
- "catalog_catalog_controller_catalogcontroller": "CatalogController" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L25 | neighbors=[catalog.controller.ts, .constructor(), .createCategory(), .createProduct(), .createVariant(), .deleteCategory()]
- "checkout_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/checkout/page.tsx:L1 | neighbors=[CheckoutPage(), api.ts, api, store.ts, useCartStore, button.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-000.json

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
