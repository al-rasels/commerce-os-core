# Node Description Batch 8 of 51

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

- "auth_auth_controller_spec": "auth.controller.spec.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.controller.spec.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, 7d74efe feat(commerce): implement B2B, …, bb279ee fix(ci): fix api tests and lint…]
- "auth_auth_module": "auth.module.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.module.ts:L1 | neighbors=[AuthModule, 21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, efe67e9 fix(build): resolve component t…]
- "auth_auth_service_authservice_generatetokens": ".generateTokens()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/auth.service.ts:L310 | neighbors=[AuthService, .login(), .mfaVerify(), .refresh(), .register()]
- "b2b_b2b_controller": "b2b.controller.ts" | kind=code-symbol | source=apps/api/src/modules/business/b2b/b2b.controller.ts:L1 | neighbors=[B2bController, tenant-context.ts, TenantContext, 7d74efe feat(commerce): implement B2B, …, c506b3c feat(api): implement database r…]
- "b2b_b2b_service": "b2b.service.ts" | kind=code-symbol | source=apps/api/src/modules/business/b2b/b2b.service.ts:L1 | neighbors=[B2bService, tenant-context.ts, TenantContext, 7d74efe feat(commerce): implement B2B, …, c506b3c feat(api): implement database r…]
- "cart_cart_controller": "cart.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/cart.controller.ts:L1 | neighbors=[CartController, tenant-context.ts, TenantContext, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …]
- "categories_categorylistpage": "CategoryListPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/categories/CategoryListPage.tsx:L1 | neighbors=[buildTree(), CategoryListPage(), CategoryNode, SortableCategoryRow(), ac49c08 chore: batch commit — catalog C…]
- "checkout_checkout_module": "checkout.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/checkout.module.ts:L1 | neighbors=[CheckoutModule, 3d66d0f feat: implement payments module…, 65feb38 feat(api): Integrated Promotion…, d26bd04 feat(commerce): implement advan…, efe67e9 fix(build): resolve component t…]
- "commit:repo:github.com/al-rasels/commerce-os-core@d6163bc8b13f9aeaff47c22fa5795fb17e01f788": "d6163bc docs: update PROGRESS_REPORT.md and MASTER_TASKLIST.md to July 20 state" | kind=Commit | source=git | neighbors=[feat/admin-ui-refactor, main, 6ffba43 feat: add MFA auth flow, super …, tenant-admin.controller.ts, f1d1a16 feat: implement storefront foun…]
- "components_breadcrumbs_spec": "breadcrumbs.spec.tsx" | kind=code-symbol | source=packages/components/breadcrumbs.spec.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, breadcrumbs.tsx, Breadcrumbs(), Crumb, defaultItems]
- "components_checkbox": "checkbox.tsx" | kind=code-symbol | source=packages/components/checkbox.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, Checkbox(), utils.ts, cn(), index.ts]
- "components_collapsible": "collapsible.tsx" | kind=code-symbol | source=packages/components/collapsible.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, Collapsible(), CollapsibleContent(), CollapsibleTrigger(), index.ts]
- "components_label": "label.tsx" | kind=code-symbol | source=packages/components/label.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, index.ts, Label(), utils.ts, cn()]
- "components_separator": "separator.tsx" | kind=code-symbol | source=packages/components/separator.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, index.ts, Separator(), utils.ts, cn()]
- "components_sidebar_spec": "sidebar.spec.tsx" | kind=code-symbol | source=packages/components/sidebar.spec.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, sidebar.tsx, Sidebar(), SidebarItem, items]
- "components_switch": "switch.tsx" | kind=code-symbol | source=packages/components/switch.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, index.ts, Switch(), utils.ts, cn()]
- "components_tabs_spec": "tabs.spec.tsx" | kind=code-symbol | source=packages/components/tabs.spec.tsx:L1 | neighbors=[3d66d0f feat: implement payments module…, tabs.tsx, tabs, Tab, Tabs()]
- "components_varianteditor": "VariantEditor.tsx" | kind=code-symbol | source=apps/admin/src/components/VariantEditor.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, VariantEditor(), VariantEditorProps, VariantForm(), VariantRow()]
- "customer_customer_repository_spec": "customer.repository.spec.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.repository.spec.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, efe67e9 fix(build): resolve component t…, tenant-context.ts, TenantContext]
- "dto_order_response_dto": "order-response.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/order/dto/order-response.dto.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, f1bfa47 feat: implement storefront orde…, OrderItemDto, OrderResponseDto]
- "guards_tenant_auth_guard_tenantauthguard": "TenantAuthGuard" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/tenant-auth.guard.ts:L12 | neighbors=[tenant-auth.guard.ts, CanActivate, .canActivate(), .constructor(), .extractTokenFromHeader()]
- "hooks_useb2b": "useB2B.ts" | kind=code-symbol | source=apps/admin/src/hooks/useB2B.ts:L1 | neighbors=[bb61ae8 feat(commerce): wire up Admin U…, useCompanyProfiles(), useCreateCompanyProfile(), useDeleteCompanyProfile(), useUpdateCompanyProfile()]
- "hooks_useorders": "useOrders.ts" | kind=code-symbol | source=apps/admin/src/hooks/useOrders.ts:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, useOrder(), useOrders(), useUpdateOrderStatus()]
- "hooks_usereturns": "useReturns.ts" | kind=code-symbol | source=apps/admin/src/hooks/useReturns.ts:L1 | neighbors=[bb61ae8 feat(commerce): wire up Admin U…, useCreateReturn(), useDeleteReturn(), useReturns(), useUpdateReturn()]
- "hooks_usesubscriptions": "useSubscriptions.ts" | kind=code-symbol | source=apps/admin/src/hooks/useSubscriptions.ts:L1 | neighbors=[bb61ae8 feat(commerce): wire up Admin U…, useCreateSubscription(), useDeleteSubscription(), useSubscriptions(), useUpdateSubscription()]
- "inventory_inventory_controller": "inventory.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.controller.ts:L1 | neighbors=[7d74efe feat(commerce): implement B2B, …, c506b3c feat(api): implement database r…, InventoryController, tenant-context.ts, TenantContext]
- "jetski_gemini_loader_loader_buildmodelmessages": "buildModelMessages()" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L118 | neighbors=[loader.mjs, assertValidMaxSkills(), collectReferencedSkillIds(), loadSkillBodies(), resolveSkillsFromMessages()]
- "order_order_controller_ordercontroller": "OrderController" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.controller.ts:L21 | neighbors=[order.controller.ts, .constructor(), .get(), .list(), .updateStatus()]
- "order_order_repository_spec": "order.repository.spec.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.repository.spec.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, efe67e9 fix(build): resolve component t…, tenant-context.ts, TenantContext]
- "promotions_promotions_service": "promotions.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, 6ffba43 feat: add MFA auth flow, super …, PromotionsService, tenant-context.ts, TenantContext]
- "repositories_cart_item_repository": "cart-item.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/repositories/cart-item.repository.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 4029d6f fix(commerce): resolve architec…, CartItemRepository, tenant-context.ts, TenantContext]
- "repositories_cart_repository_spec": "cart.repository.spec.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/repositories/cart.repository.spec.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, efe67e9 fix(build): resolve component t…, tenant-context.ts, TenantContext]
- "repositories_page_layout_repository_spec": "page-layout.repository.spec.ts" | kind=code-symbol | source=apps/api/src/modules/experience/builder/repositories/page-layout.repository.spec.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, 7d74efe feat(commerce): implement B2B, …, bb61ae8 feat(commerce): wire up Admin U…]
- "repositories_tenant_scoped_repository_scope": "scope()" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.ts:L12 | neighbors=[tenant-scoped.repository.ts, aggregate(), count(), findMany(), groupBy()]
- "repositories_tenant_scoped_repository_spec": "tenant-scoped.repository.spec.ts" | kind=code-symbol | source=apps/api/src/common/repositories/tenant-scoped.repository.spec.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, TestRepo, tenant-context.ts, TenantContext]
- "repositories_theme_override_repository_spec": "theme-override.repository.spec.ts" | kind=code-symbol | source=apps/api/src/modules/experience/theme/repositories/theme-override.repository.spec.ts:L1 | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, 6ffba43 feat: add MFA auth flow, super …, efe67e9 fix(build): resolve component t…, tenant-context.ts, TenantContext]
- "returns_returns_controller": "returns.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/returns/returns.controller.ts:L1 | neighbors=[7d74efe feat(commerce): implement B2B, …, c506b3c feat(api): implement database r…, ReturnsController, tenant-context.ts, TenantContext]
- "returns_returns_service": "returns.service.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/returns/returns.service.ts:L1 | neighbors=[7d74efe feat(commerce): implement B2B, …, c506b3c feat(api): implement database r…, ReturnsService, tenant-context.ts, TenantContext]
- "scripts_api_validator": "api_validator.py" | kind=code-symbol | source=.agents/skills/api-patterns/scripts/api_validator.py:L1 | neighbors=[21888ff feat: implement commerce, catal…, check_api_code(), check_openapi_spec(), find_api_files(), main()]
- "settings_pagelayouteditor": "PageLayoutEditor.tsx" | kind=code-symbol | source=apps/admin/src/pages/settings/PageLayoutEditor.tsx:L1 | neighbors=[0361288 feat(admin): Scaffolded Phase 2…, 7d74efe feat(commerce): implement B2B, …, ac49c08 chore: batch commit — catalog C…, createDefaultSection(), PageLayoutEditorPage()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-007.json

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
