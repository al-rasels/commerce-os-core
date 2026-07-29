# Node Description Batch 6 of 51

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

- "components_floating_header": "floating-header.tsx" | kind=code-symbol | source=apps/storefront/src/components/floating-header.tsx:L1 | neighbors=[layout.tsx, efe67e9 fix(build): resolve component t…, cart-badge.tsx, CartBadge(), FloatingHeader(), search-autocomplete.tsx]
- "components_header": "header.tsx" | kind=code-symbol | source=packages/components/header.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, Header(), HeaderProps, utils.ts, cn(), index.ts]
- "components_newsletter": "newsletter.tsx" | kind=code-symbol | source=packages/components/newsletter.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, Newsletter(), NewsletterProps, utils.ts, cn()]
- "components_rich_text": "rich-text.tsx" | kind=code-symbol | source=packages/components/rich-text.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, index.ts, registry.ts, RichText(), RichTextProps, utils.ts]
- "components_skeleton": "skeleton.tsx" | kind=code-symbol | source=packages/components/skeleton.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, index.ts, registry.ts, Skeleton(), SkeletonProps, utils.ts]
- "customer_customer_controller_customercontroller": "CustomerController" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.controller.ts:L21 | neighbors=[customer.controller.ts, .constructor(), .create(), .get(), .list(), .remove()]
- "customer_customer_service": "customer.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.service.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 4029d6f fix(commerce): resolve architec…, 6ffba43 feat: add MFA auth flow, super …, e3a8c77 feat: implement users CRUD back…, CustomerService, tenant-context.ts]
- "hooks_useinventory": "useInventory.ts" | kind=code-symbol | source=apps/admin/src/hooks/useInventory.ts:L1 | neighbors=[bb61ae8 feat(commerce): wire up Admin U…, useCreateLocation(), useDeleteLocation(), useInventoryLevels(), useLocations(), useUpdateInventoryLevel()]
- "hooks_useproducts": "useProducts.ts" | kind=code-symbol | source=apps/admin/src/hooks/useProducts.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, useCreateProduct(), useDeleteProduct(), useProduct(), useProducts()]
- "hooks_useusers": "useUsers.ts" | kind=code-symbol | source=apps/admin/src/hooks/useUsers.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, e3a8c77 feat: implement users CRUD back…, useInviteUser(), useUpdateUser(), useUpdateUserStatus(), useUser()]
- "hooks_usevariants": "useVariants.ts" | kind=code-symbol | source=apps/admin/src/hooks/useVariants.ts:L1 | neighbors=[4ddc1b9 fix(build): resolve type and im…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, useCreateVariant(), useDeleteVariant(), useUpdateVariant()]
- "jetski_gemini_loader_loader": "loader.mjs" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L1 | neighbors=[21888ff feat: implement commerce, catal…, assertValidMaxSkills(), buildModelMessages(), collectReferencedSkillIds(), loadSkillBodies(), loadSkillIndex()]
- "lib_invoice": "invoice.ts" | kind=code-symbol | source=apps/admin/src/lib/invoice.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, orders.ts, Order, downloadInvoice()]
- "order_order_repository": "order.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.repository.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, f1bfa47 feat: implement storefront orde…, OrderRepository, tenant-context.ts]
- "page_editor_index": "index.ts" | kind=code-symbol | source=apps/admin/src/components/page-editor/index.ts:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, AddSectionPanel.tsx, AddSectionPanel(), PropEditor.tsx, PropEditor(), SectionCard.tsx]
- "payments_payments_service_paymentsservice": "PaymentsService" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.service.ts:L13 | neighbors=[payments.service.ts, .constructor(), .createPaymentIntent(), .handlePaymentFailed(), .handlePaymentSucceeded(), .handleWebhook()]
- "platform_platform_module": "platform.module.ts" | kind=code-symbol | source=apps/api/src/modules/platform/platform.module.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 3571d3a feat(storefront): overhaul UI/U…, 3d66d0f feat: implement payments module…, 67df34f feat(api): Setup BullMQ backgro…, 6ffba43 feat: add MFA auth flow, super …, e3a8c77 feat: implement users CRUD back…]
- "prisma_prisma_service": "prisma.service.ts" | kind=code-symbol | source=apps/api/src/prisma/prisma.service.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6ffba43 feat: add MFA auth flow, super …, PrismaService, storefront-cart.controller.ts, storefront-checkout.controller.ts, storefront.controller.ts]
- "repositories_catalog_repository_spec": "catalog.repository.spec.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/repositories/catalog.repository.spec.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, 7d74efe feat(commerce): implement B2B, …, bb61ae8 feat(commerce): wire up Admin U…, tenant-context.ts]
- "repositories_page_layout_repository": "page-layout.repository.ts" | kind=code-symbol | source=apps/api/src/modules/experience/builder/repositories/page-layout.repository.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 3d66d0f feat: implement payments module…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, PageLayoutRepository, tenant-context.ts]
- "returns_returns_controller_returnscontroller": "ReturnsController" | kind=code-symbol | source=apps/api/src/modules/commerce/returns/returns.controller.ts:L9 | neighbors=[returns.controller.ts, .approveReturnRequest(), .constructor(), .createReturnRequest(), .getReturns(), .processRefund()]
- "returns_returns_service_returnsservice": "ReturnsService" | kind=code-symbol | source=apps/api/src/modules/commerce/returns/returns.service.ts:L9 | neighbors=[returns.service.ts, .approveReturnRequest(), .constructor(), .createReturnRequest(), .getReturns(), .processRefund()]
- "scripts_ts_diagnostic_run_cmd": "run_cmd()" | kind=code-symbol | source=.agents/skills/typescript-expert/scripts/ts_diagnostic.py:L13 | neighbors=[ts_diagnostic.py, check_any_usage(), check_performance(), check_type_assertions(), check_type_errors(), check_versions()]
- "search_search_form": "search-form.tsx" | kind=code-symbol | source=apps/storefront/src/app/search/search-form.tsx:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, page.tsx, SearchForm(), button.tsx, Button(), input.tsx]
- "search_search_service_searchservice": "SearchService" | kind=code-symbol | source=apps/api/src/modules/commerce/search/search.service.ts:L5 | neighbors=[search.service.ts, OnModuleInit, .deleteDocument(), .getTenantIndexName(), .indexDocuments(), .onModuleInit()]
- "shipping_shipping_controller_shippingcontroller": "ShippingController" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/shipping.controller.ts:L22 | neighbors=[shipping.controller.ts, .constructor(), .create(), .get(), .list(), .remove()]
- "src_app_module": "app.module.ts" | kind=code-symbol | source=apps/api/src/app.module.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 21888ff feat: implement commerce, catal…, 3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, 7d74efe feat(commerce): implement B2B, …, bb279ee fix(ci): fix api tests and lint…]
- "storefront_storefront_cart_controller": "storefront-cart.controller.ts" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-cart.controller.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, prisma.service.ts, StorefrontCartController, tenant-context.ts]
- "storefront_storefront_checkout_controller": "storefront-checkout.controller.ts" | kind=code-symbol | source=apps/api/src/modules/storefront/storefront-checkout.controller.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, prisma.service.ts, StorefrontCheckoutController, tenant-context.ts]
- "tax_tax_controller_taxcontroller": "TaxController" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/tax.controller.ts:L22 | neighbors=[tax.controller.ts, .constructor(), .create(), .get(), .list(), .remove()]
- "tenant_tenant_admin_controller": "tenant-admin.controller.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-admin.controller.ts:L1 | neighbors=[4ece707 feat(admin): port UI components…, 6ffba43 feat: add MFA auth flow, super …, b121f53 some-things, d6163bc docs: update PROGRESS_REPORT.md…, TenantAdminController, tenant-context.ts]
- "ui_accordion": "accordion.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/accordion.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, utils.ts, cn(), Accordion(), AccordionContent(), AccordionItem()]
- "ui_avatar": "avatar.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/avatar.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount()]
- "ui_popover": "popover.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/popover.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, Popover(), PopoverContent(), PopoverDescription(), PopoverHeader(), PopoverTitle()]
- "users_users_repository_usersrepository": "UsersRepository" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.repository.ts:L8 | neighbors=[users.repository.ts, TenantScopedRepository, .constructor(), .findManyWithRole(), .findUniqueWithRole(), .findUniqueWithRoleFull()]
- "users_users_service": "users.service.ts" | kind=code-symbol | source=apps/api/src/modules/platform/users/users.service.ts:L1 | neighbors=[4029d6f fix(commerce): resolve architec…, 6ffba43 feat: add MFA auth flow, super …, bb279ee fix(ci): fix api tests and lint…, e3a8c77 feat: implement users CRUD back…, tenant-context.ts, TenantContext]
- "20260716164323_init_migration_product_variants": "product_variants" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L99 | neighbors=[migration.sql, cart_items, order_items, products, tenants, stock_reservations]
- "api_experience": "experience.ts" | kind=code-symbol | source=apps/admin/src/lib/api/experience.ts:L1 | neighbors=[client.ts, api, ResolvedTheme, themeApi, index.ts, ac49c08 chore: batch commit — catalog C…]
- "api_promotions": "promotions.ts" | kind=code-symbol | source=apps/admin/src/lib/api/promotions.ts:L1 | neighbors=[index.ts, client.ts, api, Promotion, promotionsApi, 6ffba43 feat: add MFA auth flow, super …]
- "api_shipping": "shipping.ts" | kind=code-symbol | source=apps/admin/src/lib/api/shipping.ts:L1 | neighbors=[index.ts, client.ts, api, shippingApi, ShippingRule, 6ffba43 feat: add MFA auth flow, super …]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-005.json

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
