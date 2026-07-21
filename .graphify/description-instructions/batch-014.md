# Node Description Batch 15 of 37

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

- "dto_mfa_verify_dto": "mfa-verify.dto.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/dto/mfa-verify.dto.ts:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, MfaVerifyDto]
- "dto_register_dto": "register.dto.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/dto/register.dto.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, RegisterDto]
- "dto_update_category_dto": "update-category.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/update-category.dto.ts:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, UpdateCategoryDto]
- "dto_update_item_dto": "update-item.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/dto/update-item.dto.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, UpdateItemDto]
- "dto_update_product_dto": "update-product.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/update-product.dto.ts:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, UpdateProductDto]
- "dto_update_product_variant_dto": "update-product-variant.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/update-product-variant.dto.ts:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, UpdateProductVariantDto]
- "dto_update_promotion_dto": "update-promotion.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/dto/update-promotion.dto.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, UpdatePromotionDto]
- "dto_update_shipping_rule_dto": "update-shipping-rule.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/shipping/dto/update-shipping-rule.dto.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, UpdateShippingRuleDto]
- "dto_update_tax_rule_dto": "update-tax-rule.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/tax/dto/update-tax-rule.dto.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, UpdateTaxRuleDto]
- "dto_update_user_dto": "update-user.dto.ts" | kind=code-symbol | source=apps/api/src/modules/platform/users/dto/update-user.dto.ts:L1 | neighbors=[e3a8c77 feat: implement users CRUD back…, UpdateUserDto]
- "dto_update_user_status_dto": "update-user-status.dto.ts" | kind=code-symbol | source=apps/api/src/modules/platform/users/dto/update-user-status.dto.ts:L1 | neighbors=[e3a8c77 feat: implement users CRUD back…, UpdateUserStatusDto]
- "experience_experience_e2e_spec": "experience.e2e-spec.ts" | kind=code-symbol | source=apps/api/src/modules/experience/experience.e2e-spec.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, 6eb89d7 chore(tech-debt): resolve techn…]
- "experience_experience_module": "experience.module.ts" | kind=code-symbol | source=apps/api/src/modules/experience/experience.module.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, ExperienceModule]
- "guards_tenant_auth_guard_tenantauthguard_canactivate": ".canActivate()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/tenant-auth.guard.ts:L15 | neighbors=[TenantAuthGuard, .extractTokenFromHeader()]
- "guards_tenant_auth_guard_tenantauthguard_extracttokenfromheader": ".extractTokenFromHeader()" | kind=code-symbol | source=apps/api/src/modules/platform/auth/guards/tenant-auth.guard.ts:L40 | neighbors=[TenantAuthGuard, .canActivate()]
- "hooks_use_debounce_usedebounce": "useDebounce()" | kind=code-symbol | source=apps/storefront/src/hooks/use-debounce.ts:L3 | neighbors=[search-autocomplete.tsx, use-debounce.ts]
- "jetski_gemini_loader_loader_loadskillbodies": "loadSkillBodies()" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L77 | neighbors=[loader.mjs, buildModelMessages()]
- "lib_api_authrequestwithtoken": "authRequestWithToken()" | kind=code-symbol | source=apps/storefront/src/lib/api.ts:L35 | neighbors=[api.ts, authRequest()]
- "lib_api_request": "request()" | kind=code-symbol | source=apps/storefront/src/lib/api.ts:L11 | neighbors=[api.ts, ApiError]
- "lib_invoice_downloadinvoice": "downloadInvoice()" | kind=code-symbol | source=apps/admin/src/lib/invoice.ts:L108 | neighbors=[invoice.ts, generateInvoiceHtml()]
- "lib_invoice_generateinvoicehtml": "generateInvoiceHtml()" | kind=code-symbol | source=apps/admin/src/lib/invoice.ts:L5 | neighbors=[invoice.ts, downloadInvoice()]
- "lib_server_api_serverrequest": "serverRequest()" | kind=code-symbol | source=apps/storefront/src/lib/server-api.ts:L13 | neighbors=[server-api.ts, ApiError]
- "load_checkout": "checkout.js" | kind=code-symbol | source=tests/load/checkout.js:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, options]
- "order_order_item_repository": "order-item.repository.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order-item.repository.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, OrderItemRepository]
- "order_order_service_orderservice_get": ".get()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L22 | neighbors=[OrderService, .toDto()]
- "order_order_service_orderservice_updatestatus": ".updateStatus()" | kind=code-symbol | source=apps/api/src/modules/commerce/order/order.service.ts:L61 | neighbors=[OrderService, .toDto()]
- "page_editor_addsectionpanel_addsectionpanel": "AddSectionPanel()" | kind=code-symbol | source=apps/admin/src/components/page-editor/AddSectionPanel.tsx:L14 | neighbors=[AddSectionPanel.tsx, index.ts]
- "page_editor_propeditor_propeditor": "PropEditor()" | kind=code-symbol | source=apps/admin/src/components/page-editor/PropEditor.tsx:L19 | neighbors=[index.ts, PropEditor.tsx]
- "page_editor_sectioncard_sectioncard": "SectionCard()" | kind=code-symbol | source=apps/admin/src/components/page-editor/SectionCard.tsx:L21 | neighbors=[index.ts, SectionCard.tsx]
- "payments_payments_module": "payments.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.module.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, PaymentsModule]
- "payments_payments_service_paymentsservice_handlepaymentfailed": ".handlePaymentFailed()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.service.ts:L102 | neighbors=[PaymentsService, .handleWebhook()]
- "payments_payments_service_paymentsservice_handlepaymentsucceeded": ".handlePaymentSucceeded()" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.service.ts:L72 | neighbors=[PaymentsService, .handleWebhook()]
- "payments_payments_webhook_controller": "payments.webhook.controller.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/payments.webhook.controller.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, PaymentsWebhookController]
- "products_productformpage": "ProductFormPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/products/ProductFormPage.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, ProductFormPage()]
- "products_productlistpage": "ProductListPage.tsx" | kind=code-symbol | source=apps/admin/src/pages/products/ProductListPage.tsx:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, ProductListPage()]
- "products_products_client_productsclient": "ProductsClient()" | kind=code-symbol | source=apps/storefront/src/app/products/products-client.tsx:L9 | neighbors=[page.tsx, products-client.tsx]
- "promotions_promotions_module": "promotions.module.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.module.ts:L1 | neighbors=[3571d3a feat(storefront): overhaul UI/U…, PromotionsModule]
- "promotions_promotions_service_promotionsservice_getpromotion": ".getPromotion()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L21 | neighbors=[PromotionsService, .incrementUsage()]
- "promotions_promotions_service_promotionsservice_incrementusage": ".incrementUsage()" | kind=code-symbol | source=apps/api/src/modules/commerce/promotions/promotions.service.ts:L90 | neighbors=[PromotionsService, .getPromotion()]
- "redis_redis_module": "redis.module.ts" | kind=code-symbol | source=apps/api/src/modules/platform/redis/redis.module.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, RedisModule]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-014.json

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
