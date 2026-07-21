# Node Description Batch 2 of 37

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

- "ui_button_button": "Button()" | kind=code-symbol | source=apps/storefront/src/components/ui/button.tsx:L43 | neighbors=[page.tsx, page.tsx, page.tsx, add-to-cart-button.tsx, page.tsx, page.tsx]
- "ui_dialog": "dialog.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/dialog.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), button.tsx, Button()]
- "auth_auth_controller_authcontroller": "AuthController" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L28 | neighbors=[auth.controller.ts, .changePassword(), .constructor(), .disableMfa(), .forgotPassword(), .invite()]
- "components_product_card": "product-card.tsx" | kind=code-symbol | source=packages/components/product-card.tsx:L1 | neighbors=[home-client.tsx, 3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, e5d6c72 feat: implement end-to-end chec…, index.ts, formatPrice()]
- "shared_types_index": "index.ts" | kind=code-symbol | source=packages/shared-types/index.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, Category, CategorySchema, Product, ProductSchema, ProductVariant]
- "slug_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/products/[slug]/page.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, e5d6c72 feat: implement end-to-end chec…, json-ld.tsx, JsonLd()]
- "api_orders": "orders.ts" | kind=code-symbol | source=apps/admin/src/lib/api/orders.ts:L1 | neighbors=[dashboard.ts, index.ts, client.ts, api, canTransition(), ListOrdersParams]
- "ui_input": "input.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/input.tsx:L1 | neighbors=[page.tsx, page.tsx, page.tsx, 3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, page.tsx]
- "users_users_service_usersservice": "UsersService" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.service.ts:L15 | neighbors=[users.service.ts, .constructor(), .create(), .findByEmail(), .findMany(), .findManyWithRole()]
- "api_client_api": "api" | kind=code-symbol | source=apps/admin/src/lib/api/client.ts:L44 | neighbors=[catalog.ts, client.ts, customers.ts, dashboard.ts, experience.ts, index.ts]
- "change_password_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/change-password/page.tsx:L1 | neighbors=[ChangePasswordForm(), ChangePasswordPage(), auth-guard.tsx, AuthGuard(), api.ts, api]
- "components_toast": "toast.tsx" | kind=code-symbol | source=packages/components/toast.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, index.ts, registry.ts, borderMap, iconMap, Toast()]
- "theme_themeeditorpage": "ThemeEditorPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, ColorMode, ColorsSection(), deepMergeDesignTokens(), FlattenedSection(), LoadingSkeleton()]
- "ui_alert_dialog": "alert-dialog.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/alert-dialog.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription()]
- "ui_label": "label.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/label.tsx:L1 | neighbors=[page.tsx, page.tsx, page.tsx, 3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, page.tsx]
- "ui_select": "select.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/select.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), SelectContent(), SelectGroup()]
- "api_users": "users.ts" | kind=code-symbol | source=apps/admin/src/lib/api/users.ts:L1 | neighbors=[index.ts, client.ts, api, InviteUserInput, ListUsersParams, UpdateUserInput]
- "commit:repo:github.com/al-rasels/commerce-os-core@4ddc1b9c1b13e1d76b298422e1467e9f77737bbd": "4ddc1b9 fix(build): resolve type and import errors across admin and storefront" | kind=Commit | source=git | neighbors=[page.tsx, main, 4a91873 chore: add .graphify directory …, useVariants.ts, promotions.tsx, shipping.tsx]
- "components_product_grid": "product-grid.tsx" | kind=code-symbol | source=packages/components/product-grid.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, product-card.tsx, ProductCard(), ProductCardProps, columnMap]
- "components_section_renderer": "section-renderer.tsx" | kind=code-symbol | source=apps/storefront/src/components/section-renderer.tsx:L1 | neighbors=[page.tsx, e5d6c72 feat: implement end-to-end chec…, index.ts, localRegistry, Node, resolveBind()]
- "login_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/login/page.tsx:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, b121f53 some-things, f1d1a16 feat: implement storefront foun…, api.ts, api, LoginPage()]
- "ui_card": "card.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/card.tsx:L1 | neighbors=[page.tsx, 3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), Card()]
- "api_catalog": "catalog.ts" | kind=code-symbol | source=apps/admin/src/lib/api/catalog.ts:L1 | neighbors=[catalogApi, Category, CategoryInput, Product, ProductInput, ProductVariant]
- "app_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/page.tsx:L1 | neighbors=[HomePage(), section-renderer.tsx, SectionRenderer(), server-api.ts, serverApi, 028709f chore: scaffold monorepo with a…]
- "mfa_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/mfa/page.tsx:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, api.ts, api, MfaForm(), MfaPage(), button.tsx]
- "register_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/register/page.tsx:L1 | neighbors=[b121f53 some-things, f1d1a16 feat: implement storefront foun…, api.ts, api, RegisterPage(), button.tsx]
- "reset_password_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/reset-password/page.tsx:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, api.ts, api, ResetPasswordForm(), ResetPasswordPage(), button.tsx]
- "scripts_ts_diagnostic": "ts_diagnostic.py" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L1 | neighbors=[21888ff feat: implement commerce, catal…, check_any_usage(), check_monorepo(), check_performance(), check_tooling(), check_tsconfig()]
- "search_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/search/page.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, e5d6c72 feat: implement end-to-end chec…, f1d1a16 feat: implement storefront foun…, product-card.tsx, ProductCard()]
- "api_customers": "customers.ts" | kind=code-symbol | source=apps/admin/src/lib/api/customers.ts:L1 | neighbors=[client.ts, api, Customer, customerApi, CustomerDetail, CustomerInput]
- "auth_auth_service": "auth.service.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L1 | neighbors=[{ authenticator }, AuthService, tenant-context.ts, TenantContext, 21888ff feat: implement commerce, catal…, 3d66d0f feat: implement payments module…]
- "cart_cart_service_cartservice": "CartService" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L17 | neighbors=[cart.service.ts, .addItem(), .clearCart(), .constructor(), .convert(), .create()]
- "components_button": "button.tsx" | kind=code-symbol | source=packages/components/button.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Button(), ButtonProps, sizeStyles, variantStyles, utils.ts]
- "forgot_password_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/forgot-password/page.tsx:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ForgotPasswordPage(), api.ts, api, button.tsx, Button()]
- "tenant_tenant_admin_controller_tenantadmincontroller": "TenantAdminController" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-admin.controller.ts:L24 | neighbors=[tenant-admin.controller.ts, .addDomain(), .constructor(), .create(), .getById(), .getFlags()]
- "theme_theme_service": "theme.service.ts" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.service.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 3d66d0f feat: implement payments module…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, tenant-context.ts]
- "ui_command": "command.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/command.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput()]
- "ui_input_input": "Input()" | kind=code-symbol | source=apps/storefront/src/components/ui/input.tsx:L6 | neighbors=[page.tsx, page.tsx, page.tsx, page.tsx, page.tsx, page.tsx]
- "api_superadmin": "superAdmin.ts" | kind=code-symbol | source=apps/admin/src/lib/api/superAdmin.ts:L1 | neighbors=[index.ts, client.ts, api, ProvisionTenantInput, superAdminApi, Tenant]
- "auth_auth_controller": "auth.controller.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L1 | neighbors=[AuthController, tenant-context.ts, TenantContext, 21888ff feat: implement commerce, catal…, 3d66d0f feat: implement payments module…, 6eb89d7 chore(tech-debt): resolve techn…]

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
