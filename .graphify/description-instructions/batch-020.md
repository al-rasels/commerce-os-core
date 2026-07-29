# Node Description Batch 21 of 51

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

- "src_app_service_appservice": "AppService" | kind=code-symbol | source=apps/api/src/app.service.ts:L4 | neighbors=[app.service.ts, .getHello()]
- "storefront_postcss_config": "postcss.config.mjs" | kind=code-symbol | source=apps/storefront/postcss.config.mjs:L1 | neighbors=[028709f chore: scaffold monorepo with a…, config]
- "storefront_storefront_checkout_controller_storefrontcheckoutcontroller": "StorefrontCheckoutController" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-checkout.controller.ts:L15 | neighbors=[storefront-checkout.controller.ts, .checkout()]
- "storefront_storefront_order_controller_storefrontordercontroller": "StorefrontOrderController" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-order.controller.ts:L6 | neighbors=[storefront-order.controller.ts, .getOrder()]
- "tax_tax_module": "tax.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.module.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, TaxModule]
- "tenant_tenant_admin_controller_tenantadmincontroller_adddomain": ".addDomain()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-admin.controller.ts:L121 | neighbors=[TenantAdminController, .create()]
- "tenant_tenant_admin_controller_tenantadmincontroller_create": ".create()" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-admin.controller.ts:L88 | neighbors=[TenantAdminController, .addDomain()]
- "tenant_tenant_module": "tenant.module.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant.module.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, TenantModule]
- "tenant_tenant_service_spec": "tenant.service.spec.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant.service.spec.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …]
- "test_checkout_tenant_isolation_e2e_spec": "checkout-tenant-isolation.e2e-spec.ts" | kind=code-symbol | source=apps/api/test/checkout-tenant-isolation.e2e-spec.ts:L1 | neighbors=[92e2c6a feat: add checkout tenant isola…, bb279ee fix(ci): fix api tests and lint…]
- "test_setup": "setup.ts" | kind=code-symbol | source=apps/api/test/setup.ts:L1 | neighbors=[4ece707 feat(admin): port UI components…, bb279ee fix(ci): fix api tests and lint…]
- "theme_engine_index_detectconflicts": "detectConflicts()" | kind=code-symbol | source=packages/theme-engine/index.ts:L37 | neighbors=[index.ts, resolveOverride()]
- "themes_bold_boldtheme": "boldTheme" | kind=code-symbol | source=packages/theme-engine/themes/bold.ts:L4 | neighbors=[index.ts, bold.ts]
- "themes_minimal_minimaltheme": "minimalTheme" | kind=code-symbol | source=packages/theme-engine/themes/minimal.ts:L4 | neighbors=[index.ts, minimal.ts]
- "ui_alert_alert": "Alert()" | kind=code-symbol | source=apps/admin/src/components/ui/alert.tsx:L22 | neighbors=[alert.tsx, alertVariants]
- "ui_alert_alertvariants": "alertVariants" | kind=code-symbol | source=apps/admin/src/components/ui/alert.tsx:L6 | neighbors=[alert.tsx, Alert()]
- "ui_badge_badge": "Badge()" | kind=code-symbol | source=apps/storefront/src/components/ui/badge.tsx:L30 | neighbors=[badge.tsx, badgeVariants]
- "ui_badge_badgevariants": "badgeVariants" | kind=code-symbol | source=apps/storefront/src/components/ui/badge.tsx:L7 | neighbors=[badge.tsx, Badge()]
- "ui_button_buttonvariants": "buttonVariants" | kind=code-symbol | source=apps/storefront/src/components/ui/button.tsx:L6 | neighbors=[button.tsx, Button()]
- "ui_card_card": "Card()" | kind=code-symbol | source=apps/storefront/src/components/ui/card.tsx:L5 | neighbors=[page.tsx, card.tsx]
- "ui_card_cardcontent": "CardContent()" | kind=code-symbol | source=apps/storefront/src/components/ui/card.tsx:L72 | neighbors=[page.tsx, card.tsx]
- "ui_card_carddescription": "CardDescription()" | kind=code-symbol | source=apps/storefront/src/components/ui/card.tsx:L49 | neighbors=[page.tsx, card.tsx]
- "ui_card_cardheader": "CardHeader()" | kind=code-symbol | source=apps/storefront/src/components/ui/card.tsx:L23 | neighbors=[page.tsx, card.tsx]
- "ui_card_cardtitle": "CardTitle()" | kind=code-symbol | source=apps/storefront/src/components/ui/card.tsx:L36 | neighbors=[page.tsx, card.tsx]
- "ui_carousel_carouselcontent": "CarouselContent()" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L135 | neighbors=[carousel.tsx, useCarousel()]
- "ui_carousel_carouselitem": "CarouselItem()" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L156 | neighbors=[carousel.tsx, useCarousel()]
- "ui_carousel_carouselnext": "CarouselNext()" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L204 | neighbors=[carousel.tsx, useCarousel()]
- "ui_carousel_carouselprevious": "CarouselPrevious()" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L174 | neighbors=[carousel.tsx, useCarousel()]
- "ui_chart_chartlegendcontent": "ChartLegendContent()" | kind=code-symbol | source=apps/admin/src/components/ui/chart.tsx:L238 | neighbors=[chart.tsx, useChart()]
- "ui_chart_charttooltipcontent": "ChartTooltipContent()" | kind=code-symbol | source=apps/admin/src/components/ui/chart.tsx:L111 | neighbors=[chart.tsx, useChart()]
- "ui_config_index": "index.js" | kind=code-symbol | source=packages/ui-config/index.js:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 3d66d0f feat: implement payments module…]
- "ui_input_group_inputgroupaddon": "InputGroupAddon()" | kind=code-symbol | source=apps/admin/src/components/ui/input-group.tsx:L46 | neighbors=[input-group.tsx, inputGroupAddonVariants]
- "ui_input_group_inputgroupaddonvariants": "inputGroupAddonVariants" | kind=code-symbol | source=apps/admin/src/components/ui/input-group.tsx:L25 | neighbors=[input-group.tsx, InputGroupAddon()]
- "ui_input_group_inputgroupbutton": "InputGroupButton()" | kind=code-symbol | source=apps/admin/src/components/ui/input-group.tsx:L86 | neighbors=[input-group.tsx, inputGroupButtonVariants]
- "ui_input_group_inputgroupbuttonvariants": "inputGroupButtonVariants" | kind=code-symbol | source=apps/admin/src/components/ui/input-group.tsx:L68 | neighbors=[input-group.tsx, InputGroupButton()]
- "ui_sheet_sheet": "Sheet()" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L10 | neighbors=[cart-drawer.tsx, sheet.tsx]
- "ui_sheet_sheetcontent": "SheetContent()" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L39 | neighbors=[cart-drawer.tsx, sheet.tsx]
- "ui_sheet_sheetheader": "SheetHeader()" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L83 | neighbors=[cart-drawer.tsx, sheet.tsx]
- "ui_sheet_sheettitle": "SheetTitle()" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L103 | neighbors=[cart-drawer.tsx, sheet.tsx]
- "ui_sidebar_sidebar": "Sidebar()" | kind=code-symbol | source=apps/admin/src/components/ui/sidebar.tsx:L142 | neighbors=[sidebar.tsx, useSidebar()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-020.json

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
