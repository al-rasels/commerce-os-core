# Node Description Batch 2 of 51

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

- "repositories_tenant_scoped_repository": "tenant-scoped.repository.ts" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 3571d3a feat(storefront): overhaul UI/U…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, f1bfa47 feat: implement storefront orde…]
- "commit:repo:github.com/al-rasels/commerce-os-core@bb279ee5e21cbdd0d6613d62110ced32b5c1ae20": "bb279ee fix(ci): fix api tests and linting errors to stabilize pipeline" | kind=Commit | source=git | neighbors=[4029d6f fix(commerce): resolve architec…, eslint.config.mjs, auth.controller.spec.ts, auth.service.ts, feat/admin-ui-refactor, main]
- "components_dropdown_menu": "dropdown-menu.tsx" | kind=code-symbol | source=packages/components/dropdown-menu.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem()]
- "ui_button_button": "Button()" | kind=code-symbol | source=apps/storefront/src/components/ui/button.tsx:L43 | neighbors=[page.tsx, page.tsx, page.tsx, page.tsx, add-to-cart-button.tsx, page.tsx]
- "ui_carousel": "carousel.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, f1d1a16 feat: implement storefront foun…, utils.ts, cn(), button.tsx, Button()]
- "ui_dropdown_menu": "dropdown-menu.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), DropdownMenu(), DropdownMenuCheckboxItem()]
- "20260716164323_init_migration_tenants": "tenants" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L31 | neighbors=[migration.sql, audit_log, cart_items, carts, categories, customers]
- "account_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/page.tsx:L1 | neighbors=[AccountPage(), api.ts, api, button.tsx, Button(), card.tsx]
- "catalog_catalog_controller_catalogcontroller": "CatalogController" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L25 | neighbors=[catalog.controller.ts, .constructor(), .createCategory(), .createProduct(), .createVariant(), .deleteCategory()]
- "commit:repo:github.com/al-rasels/commerce-os-core@4ece70746a001f8a33506ceb33e4ea424e90c8ba": "4ece707 feat(admin): port UI components and refactor layout & dashboard" | kind=Commit | source=git | neighbors=[49b2dd1 chore: add graphify folder, auth.service.spec.ts, feat/admin-ui-refactor, page.tsx, 7d74efe feat(commerce): implement B2B, …, use-mobile.ts]
- "commit:repo:github.com/al-rasels/commerce-os-core@f1d1a16a3e09512fa67a0c218af262c98e8f2314": "f1d1a16 feat: implement storefront foundation with API integration, authenticat…" | kind=Commit | source=git | neighbors=[b121f53 some-things, home-client.tsx, feat/admin-ui-refactor, main, cart-drawer.tsx, page.tsx]
- "components_alert_dialog": "alert-dialog.tsx" | kind=code-symbol | source=packages/components/alert-dialog.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription()]
- "components_form_renderer": "form-renderer.tsx" | kind=code-symbol | source=packages/components/form-renderer.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, button.tsx, Button(), FieldType, FormField, FormRenderer()]
- "shared_types_index": "index.ts" | kind=code-symbol | source=packages/shared-types/index.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 7d74efe feat(commerce): implement B2B, …, Category, CategorySchema, ComponentMetadata, PlanTier]
- "api_client_api": "api" | kind=code-symbol | source=apps/admin/src/lib/api/client.ts:L96 | neighbors=[b2b.ts, catalog.ts, client.ts, customers.ts, dashboard.ts, experience.ts]
- "cart_cart_drawer": "cart-drawer.tsx" | kind=code-symbol | source=apps/storefront/src/components/cart/cart-drawer.tsx:L1 | neighbors=[Cart, CartDrawer(), CartItem, formatPrice(), api.ts, api]
- "commit:repo:github.com/al-rasels/commerce-os-core@4029d6f32c1fd45f3cf9bc4711c9b5582caed965": "4029d6f fix(commerce): resolve architecture and tenant isolation violations" | kind=Commit | source=git | neighbors=[auth.service.ts, feat/admin-ui-refactor, main, cart.service.ts, catalog.module.ts, catalog.service.ts]
- "components_button": "button.tsx" | kind=code-symbol | source=packages/components/button.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, efe67e9 fix(build): resolve component t…, alert-dialog.tsx, Button(), ButtonProps, buttonVariants]
- "components_dialog": "dialog.tsx" | kind=code-symbol | source=packages/components/dialog.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, command.tsx, button.tsx, Button(), Dialog(), DialogClose()]
- "ui_combobox": "combobox.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/combobox.tsx:L1 | neighbors=[4ece707 feat(admin): port UI components…, ComboboxChip(), ComboboxChips(), ComboboxChipsInput(), ComboboxClear(), ComboboxCollection()]
- "ui_sheet": "sheet.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L1 | neighbors=[cart-drawer.tsx, 3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), button.tsx]
- "auth_auth_service_authservice": "AuthService" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L27 | neighbors=[auth.service.ts, .changePassword(), .constructor(), .disableMfa(), .forgotPassword(), .generateTokens()]
- "components_chart": "chart.tsx" | kind=code-symbol | source=packages/components/chart.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent()]
- "components_sheet": "sheet.tsx" | kind=code-symbol | source=packages/components/sheet.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, index.ts, button.tsx, Button(), Sheet(), SheetClose()]
- "ui_dialog": "dialog.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/dialog.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), button.tsx, Button()]
- "auth_auth_controller_authcontroller": "AuthController" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L32 | neighbors=[auth.controller.ts, .changePassword(), .constructor(), .disableMfa(), .forgotPassword(), .invite()]
- "auth_auth_service": "auth.service.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L1 | neighbors=[{ authenticator }, AuthService, tenant-context.ts, TenantContext, 21888ff feat: implement commerce, catal…, 3d66d0f feat: implement payments module…]
- "builder_pagebuilder": "PageBuilder.tsx" | kind=code-symbol | source=apps/admin/src/pages/builder/PageBuilder.tsx:L1 | neighbors=[DataBindingPanel.tsx, DataBindingPanel(), PageBuilder(), PropertyPanel.tsx, PropertyPanel(), ResponsiveEditor.tsx]
- "components_product_card": "product-card.tsx" | kind=code-symbol | source=packages/components/product-card.tsx:L1 | neighbors=[home-client.tsx, 3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, e5d6c72 feat: implement end-to-end chec…, index.ts, formatPrice()]
- "components_toast": "toast.tsx" | kind=code-symbol | source=packages/components/toast.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, efe67e9 fix(build): resolve component t…, index.ts, registry.ts, Toaster(), ToastProps]
- "slug_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/products/[slug]/page.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, e5d6c72 feat: implement end-to-end chec…, json-ld.tsx, JsonLd()]
- "theme_engine_index": "index.ts" | kind=code-symbol | source=packages/theme-engine/index.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 3d66d0f feat: implement payments module…, efe67e9 fix(build): resolve component t…, detectConflicts(), MergeResult, resolveOverride()]
- "api_orders": "orders.ts" | kind=code-symbol | source=apps/admin/src/lib/api/orders.ts:L1 | neighbors=[dashboard.ts, index.ts, client.ts, api, canTransition(), ListOrdersParams]
- "components_section_renderer": "section-renderer.tsx" | kind=code-symbol | source=apps/storefront/src/components/section-renderer.tsx:L1 | neighbors=[page.tsx, 7d74efe feat(commerce): implement B2B, …, e5d6c72 feat: implement end-to-end chec…, index.ts, localRegistry, Node]
- "ui_input": "input.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/input.tsx:L1 | neighbors=[page.tsx, page.tsx, page.tsx, 3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, page.tsx]
- "users_users_service_usersservice": "UsersService" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.service.ts:L15 | neighbors=[users.service.ts, .constructor(), .create(), .findByEmail(), .findMany(), .findManyWithRole()]
- "api_catalog": "catalog.ts" | kind=code-symbol | source=apps/admin/src/lib/api/catalog.ts:L1 | neighbors=[catalogApi, Category, CategoryInput, Product, ProductInput, ProductVariant]
- "change_password_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/change-password/page.tsx:L1 | neighbors=[ChangePasswordForm(), ChangePasswordPage(), auth-guard.tsx, AuthGuard(), api.ts, api]
- "commit:repo:github.com/al-rasels/commerce-os-core@4ddc1b9c1b13e1d76b298422e1467e9f77737bbd": "4ddc1b9 fix(build): resolve type and import errors across admin and storefront" | kind=Commit | source=git | neighbors=[page.tsx, feat/admin-ui-refactor, main, 4a91873 chore: add .graphify directory …, useVariants.ts, promotions.tsx]
- "commit:repo:github.com/al-rasels/commerce-os-core@bdd391f7c8d57da6e09a47d3a9fc2da0b8c765df": "bdd391f feat(admin): fix ts errors in ProductBundleEditor" | kind=Commit | source=git | neighbors=[catalog.ts, dashboard.ts, feat/admin-ui-refactor, catalog.controller.ts, catalog.module.ts, catalog.service.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-001.json

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
