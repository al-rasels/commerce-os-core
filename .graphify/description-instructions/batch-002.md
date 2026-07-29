# Node Description Batch 3 of 51

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

- "layouts_adminlayout": "AdminLayout.tsx" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L1 | neighbors=[4ece707 feat(admin): port UI components…, 6ffba43 feat: add MFA auth flow, super …, 7d74efe feat(commerce): implement B2B, …, ac49c08 chore: batch commit — catalog C…, e3a8c77 feat: implement users CRUD back…, efe67e9 fix(build): resolve component t…]
- "theme_themeeditorpage": "ThemeEditorPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/theme/ThemeEditorPage.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, ColorMode, ColorsSection(), deepMergeDesignTokens(), FlattenedSection(), LoadingSkeleton()]
- "ui_alert_dialog": "alert-dialog.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/alert-dialog.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription()]
- "ui_chart": "chart.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/chart.tsx:L1 | neighbors=[4ece707 feat(admin): port UI components…, ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent()]
- "ui_label": "label.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/label.tsx:L1 | neighbors=[page.tsx, page.tsx, page.tsx, 3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, page.tsx]
- "ui_select": "select.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/select.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), SelectContent(), SelectGroup()]
- "api_users": "users.ts" | kind=code-symbol | source=apps/admin/src/lib/api/users.ts:L1 | neighbors=[index.ts, client.ts, api, InviteUserInput, ListUsersParams, UpdateUserInput]
- "app_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/page.tsx:L1 | neighbors=[HomePage(), section-renderer.tsx, SectionRenderer(), server-api.ts, serverApi, 028709f chore: scaffold monorepo with a…]
- "components_product_grid": "product-grid.tsx" | kind=code-symbol | source=packages/components/product-grid.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, product-card.tsx, ProductCard(), ProductCardProps, columnMap]
- "components_table": "table.tsx" | kind=code-symbol | source=packages/components/table.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, index.ts, Table(), TableBody(), TableCaption(), TableCell()]
- "login_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/login/page.tsx:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, b121f53 some-things, f1d1a16 feat: implement storefront foun…, api.ts, api, LoginPage()]
- "ui_card": "card.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/card.tsx:L1 | neighbors=[page.tsx, 3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), Card()]
- "catalog_catalog_service": "catalog.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L1 | neighbors=[CatalogService, tenant-context.ts, TenantContext, 21888ff feat: implement commerce, catal…, 4029d6f fix(commerce): resolve architec…, 6eb89d7 chore(tech-debt): resolve techn…]
- "checkout_checkout_service": "checkout.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.service.ts:L1 | neighbors=[CheckoutService, tenant-context.ts, TenantContext, 3571d3a feat(storefront): overhaul UI/U…, 3d66d0f feat: implement payments module…, 4029d6f fix(commerce): resolve architec…]
- "components_breadcrumb": "breadcrumb.tsx" | kind=code-symbol | source=packages/components/breadcrumb.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList()]
- "components_card": "card.tsx" | kind=code-symbol | source=packages/components/card.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, Card(), CardAction(), CardContent(), CardDescription(), CardFooter()]
- "mfa_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/mfa/page.tsx:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, api.ts, api, MfaForm(), MfaPage(), button.tsx]
- "pages_dashboardpage": "DashboardPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/DashboardPage.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 4ece707 feat(admin): port UI components…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, bdd391f feat(admin): fix ts errors in P…, efe67e9 fix(build): resolve component t…]
- "register_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/register/page.tsx:L1 | neighbors=[b121f53 some-things, f1d1a16 feat: implement storefront foun…, api.ts, api, RegisterPage(), button.tsx]
- "reset_password_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/reset-password/page.tsx:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, api.ts, api, ResetPasswordForm(), ResetPasswordPage(), button.tsx]
- "scripts_ts_diagnostic": "ts_diagnostic.py" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L1 | neighbors=[21888ff feat: implement commerce, catal…, check_any_usage(), check_monorepo(), check_performance(), check_tooling(), check_tsconfig()]
- "search_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/search/page.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, e5d6c72 feat: implement end-to-end chec…, f1d1a16 feat: implement storefront foun…, product-card.tsx, ProductCard()]
- "theme_theme_service": "theme.service.ts" | kind=code-symbol | source=apps/api/src/modules/experience/theme/theme.service.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 3d66d0f feat: implement payments module…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, efe67e9 fix(build): resolve component t…]
- "api_customers": "customers.ts" | kind=code-symbol | source=apps/admin/src/lib/api/customers.ts:L1 | neighbors=[client.ts, api, Customer, customerApi, CustomerDetail, CustomerInput]
- "cart_cart_service_cartservice": "CartService" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.service.ts:L17 | neighbors=[cart.service.ts, .addItem(), .clearCart(), .constructor(), .convert(), .create()]
- "components_avatar": "avatar.tsx" | kind=code-symbol | source=packages/components/avatar.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount()]
- "components_input": "input.tsx" | kind=code-symbol | source=packages/components/input.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, efe67e9 fix(build): resolve component t…, form-renderer.tsx, index.ts, Input(), utils.ts]
- "components_popover": "popover.tsx" | kind=code-symbol | source=packages/components/popover.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, index.ts, Popover(), PopoverContent(), PopoverDescription(), PopoverHeader()]
- "components_search_autocomplete": "search-autocomplete.tsx" | kind=code-symbol | source=apps/storefront/src/components/search-autocomplete.tsx:L1 | neighbors=[layout.tsx, bb279ee fix(ci): fix api tests and lint…, e5d6c72 feat: implement end-to-end chec…, efe67e9 fix(build): resolve component t…, floating-header.tsx, SearchAutocomplete()]
- "components_textarea": "textarea.tsx" | kind=code-symbol | source=packages/components/textarea.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, efe67e9 fix(build): resolve component t…, form-renderer.tsx, index.ts, input-group.tsx, registry.ts]
- "forgot_password_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/account/forgot-password/page.tsx:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ForgotPasswordPage(), api.ts, api, button.tsx, Button()]
- "tenant_tenant_admin_controller_tenantadmincontroller": "TenantAdminController" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-admin.controller.ts:L24 | neighbors=[tenant-admin.controller.ts, .addDomain(), .constructor(), .create(), .getById(), .getFlags()]
- "ui_command": "command.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/command.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput()]
- "ui_input_input": "Input()" | kind=code-symbol | source=apps/storefront/src/components/ui/input.tsx:L6 | neighbors=[page.tsx, page.tsx, page.tsx, page.tsx, page.tsx, page.tsx]
- "api_dashboard": "dashboard.ts" | kind=code-symbol | source=apps/admin/src/lib/api/dashboard.ts:L1 | neighbors=[client.ts, api, dashboardApi, DashboardStats, orders.ts, Order]
- "api_inventory": "inventory.ts" | kind=code-symbol | source=apps/admin/src/lib/api/inventory.ts:L1 | neighbors=[index.ts, client.ts, api, inventoryApi, InventoryLevel, InventoryLevelInput]
- "api_superadmin": "superAdmin.ts" | kind=code-symbol | source=apps/admin/src/lib/api/superAdmin.ts:L1 | neighbors=[index.ts, client.ts, api, ProvisionTenantInput, superAdminApi, Tenant]
- "auth_auth_controller": "auth.controller.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.ts:L1 | neighbors=[AuthController, tenant-context.ts, TenantContext, 21888ff feat: implement commerce, catal…, 3d66d0f feat: implement payments module…, 6eb89d7 chore(tech-debt): resolve techn…]
- "builder_builder_controller": "builder.controller.ts" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.controller.ts:L1 | neighbors=[BuilderController, tenant-context.ts, TenantContext, 21888ff feat: implement commerce, catal…, 3571d3a feat(storefront): overhaul UI/U…, 6eb89d7 chore(tech-debt): resolve techn…]
- "builder_builder_service": "builder.service.ts" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.service.ts:L1 | neighbors=[BuilderService, tenant-context.ts, TenantContext, 21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-002.json

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
