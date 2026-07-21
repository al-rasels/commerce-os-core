# Node Description Batch 4 of 37

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

- "storefront_storefront_controller": "storefront.controller.ts" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront.controller.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, e5d6c72 feat: implement end-to-end chec…, prisma.service.ts, StorefrontController]
- "tax_tax_service_taxservice": "TaxService" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.service.ts:L8 | neighbors=[tax.service.ts, .calculateTax(), .constructor(), .createRule(), .deleteRule(), .getRule()]
- "theme_engine_index": "index.ts" | kind=code-symbol | source=packages/theme-engine/index.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 3d66d0f feat: implement payments module…, detectConflicts(), MergeResult, resolveOverride(), TenantTokenOverride]
- "ui_tooltip": "tooltip.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/tooltip.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, utils.ts, cn(), Tooltip(), TooltipContent()]
- "api_pages": "pages.ts" | kind=code-symbol | source=apps/admin/src/lib/api/pages.ts:L1 | neighbors=[index.ts, client.ts, api, PageLayout, pagesApi, PageSection]
- "builder_builder_service": "builder.service.ts" | kind=code-symbol | source=apps/api/src/modules/experience/builder/builder.service.ts:L1 | neighbors=[BuilderService, tenant-context.ts, TenantContext, 21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …]
- "catalog_catalog_controller": "catalog.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.controller.ts:L1 | neighbors=[CatalogController, tenant-context.ts, TenantContext, 21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …]
- "catalog_catalog_service": "catalog.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L1 | neighbors=[CatalogService, tenant-context.ts, TenantContext, 21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …]
- "commit:repo:github.com/al-rasels/commerce-os-core@92e2c6a579f2cdab9fa5a0aafae715ea23cc0412": "92e2c6a feat: add checkout tenant isolation e2e tests and fix module exports" | kind=Commit | source=git | neighbors=[7bea885 feat: implement full-stack auth…, main, catalog.module.ts, e5d6c72 feat: implement end-to-end chec…, customer.module.ts, dashboard.module.ts]
- "commit:repo:github.com/al-rasels/commerce-os-core@b121f53853c5d0d5da0cf81dafeb9090620a8c5f": "b121f53 some-things" | kind=Commit | source=git | neighbors=[3571d3a feat(storefront): overhaul UI/U…, main, f1d1a16 feat: implement storefront foun…, page.tsx, page.tsx, page.tsx]
- "components_banner": "banner.tsx" | kind=code-symbol | source=packages/components/banner.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, Banner(), BannerProps, utils.ts, cn(), index.ts]
- "components_cart_drawer": "cart-drawer.tsx" | kind=code-symbol | source=packages/components/cart-drawer.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, CartDrawer(), CartDrawerProps, utils.ts, cn(), index.ts]
- "components_checkout_summary": "checkout-summary.tsx" | kind=code-symbol | source=packages/components/checkout-summary.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, CheckoutSummary(), CheckoutSummaryProps, utils.ts, cn(), index.ts]
- "components_empty_state": "empty-state.tsx" | kind=code-symbol | source=packages/components/empty-state.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, EmptyState(), EmptyStateProps, utils.ts, cn(), index.ts]
- "components_faq": "faq.tsx" | kind=code-symbol | source=packages/components/faq.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, Faq(), FaqProps, utils.ts, cn(), index.ts]
- "components_header": "header.tsx" | kind=code-symbol | source=packages/components/header.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, Header(), HeaderProps, utils.ts, cn(), index.ts]
- "components_newsletter": "newsletter.tsx" | kind=code-symbol | source=packages/components/newsletter.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, Newsletter(), NewsletterProps, utils.ts, cn()]
- "components_rich_text": "rich-text.tsx" | kind=code-symbol | source=packages/components/rich-text.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, registry.ts, RichText(), RichTextProps, utils.ts]
- "components_search_autocomplete": "search-autocomplete.tsx" | kind=code-symbol | source=apps/storefront/src/components/search-autocomplete.tsx:L1 | neighbors=[layout.tsx, e5d6c72 feat: implement end-to-end chec…, SearchAutocomplete(), use-debounce.ts, useDebounce(), api.ts]
- "components_skeleton": "skeleton.tsx" | kind=code-symbol | source=packages/components/skeleton.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, index.ts, registry.ts, Skeleton(), SkeletonProps, utils.ts]
- "customer_customer_controller_customercontroller": "CustomerController" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.controller.ts:L21 | neighbors=[customer.controller.ts, .constructor(), .create(), .get(), .list(), .remove()]
- "hooks_useproducts": "useProducts.ts" | kind=code-symbol | source=apps/admin/src/hooks/useProducts.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, useCreateProduct(), useDeleteProduct(), useProduct(), useProducts()]
- "hooks_useusers": "useUsers.ts" | kind=code-symbol | source=apps/admin/src/hooks/useUsers.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, e3a8c77 feat: implement users CRUD back…, useInviteUser(), useUpdateUser(), useUpdateUserStatus(), useUser()]
- "hooks_usevariants": "useVariants.ts" | kind=code-symbol | source=apps/admin/src/hooks/useVariants.ts:L1 | neighbors=[4ddc1b9 fix(build): resolve type and im…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, useCreateVariant(), useDeleteVariant(), useUpdateVariant()]
- "jetski_gemini_loader_loader": "loader.mjs" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L1 | neighbors=[21888ff feat: implement commerce, catal…, assertValidMaxSkills(), buildModelMessages(), collectReferencedSkillIds(), loadSkillBodies(), loadSkillIndex()]
- "layouts_adminlayout": "AdminLayout.tsx" | kind=code-symbol | source=apps/admin/src/layouts/AdminLayout.tsx:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, e3a8c77 feat: implement users CRUD back…, AdminLayout(), navItems, Sidebar()]
- "lib_invoice": "invoice.ts" | kind=code-symbol | source=apps/admin/src/lib/invoice.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, orders.ts, Order, downloadInvoice()]
- "lib_server_api": "server-api.ts" | kind=code-symbol | source=apps/storefront/src/lib/server-api.ts:L1 | neighbors=[layout.tsx, page.tsx, e5d6c72 feat: implement end-to-end chec…, ApiError, serverApi, serverRequest()]
- "order_order_repository": "order.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.repository.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, f1bfa47 feat: implement storefront orde…, OrderRepository, tenant-context.ts]
- "orders_ordertimeline": "OrderTimeline.tsx" | kind=code-symbol | source=apps/admin/src/components/orders/OrderTimeline.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, f1bfa47 feat: implement storefront orde…, CONFIRMATION_LABELS, DESTRUCTIVE_ACTIONS, OrderTimeline(), OrderTimelineProps]
- "page_editor_index": "index.ts" | kind=code-symbol | source=apps/admin/src/components/page-editor/index.ts:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, AddSectionPanel.tsx, AddSectionPanel(), PropEditor.tsx, PropEditor(), SectionCard.tsx]
- "prisma_prisma_service": "prisma.service.ts" | kind=code-symbol | source=apps/api/src/prisma/prisma.service.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6ffba43 feat: add MFA auth flow, super …, PrismaService, storefront-cart.controller.ts, storefront-checkout.controller.ts, storefront.controller.ts]
- "products_products_client": "products-client.tsx" | kind=code-symbol | source=apps/storefront/src/app/products/products-client.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, e5d6c72 feat: implement end-to-end chec…, f1d1a16 feat: implement storefront foun…, page.tsx, product-card.tsx, ProductCard()]
- "promotions_promotions_controller_promotionscontroller": "PromotionsController" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.controller.ts:L22 | neighbors=[promotions.controller.ts, .constructor(), .create(), .get(), .list(), .remove()]
- "repositories_page_layout_repository": "page-layout.repository.ts" | kind=code-symbol | source=apps/api/src/modules/experience/builder/repositories/page-layout.repository.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 3d66d0f feat: implement payments module…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, PageLayoutRepository, tenant-context.ts]
- "scripts_ts_diagnostic_run_cmd": "run_cmd()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L13 | neighbors=[ts_diagnostic.py, check_any_usage(), check_performance(), check_type_assertions(), check_type_errors(), check_versions()]
- "search_search_form": "search-form.tsx" | kind=code-symbol | source=apps/storefront/src/app/search/search-form.tsx:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, page.tsx, SearchForm(), button.tsx, Button(), input.tsx]
- "shipping_shipping_controller_shippingcontroller": "ShippingController" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.controller.ts:L22 | neighbors=[shipping.controller.ts, .constructor(), .create(), .get(), .list(), .remove()]
- "slug_product_client": "product-client.tsx" | kind=code-symbol | source=apps/storefront/src/app/products/[slug]/product-client.tsx:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, e5d6c72 feat: implement end-to-end chec…, f1d1a16 feat: implement storefront foun…, section-renderer.tsx, add-to-cart-button.tsx, AddToCartButton()]
- "src_app": "App.tsx" | kind=code-symbol | source=apps/admin/src/App.tsx:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, e3a8c77 feat: implement users CRUD back…, App(), ProtectedRoute()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-003.json

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
