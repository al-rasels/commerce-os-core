# Node Description Batch 19 of 51

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

- "components_toast_toastcontainer": "ToastContainer()" | kind=code-symbol | source=packages/components/toast.tsx:L77 | neighbors=[registry.ts, toast.tsx]
- "components_toast_toastdata": "ToastData" | kind=code-symbol | source=packages/components/toast.tsx:L9 | neighbors=[toast.tsx, ToastProps]
- "components_toast_toaster": "Toaster()" | kind=code-symbol | source=packages/components/toast.tsx:L8 | neighbors=[registry.ts, toast.tsx]
- "components_toast_toastprops": "ToastProps" | kind=code-symbol | source=packages/components/toast.tsx:L6 | neighbors=[toast.tsx, ToastData]
- "customer_customer_service_customerservice_remove": ".remove()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.service.ts:L68 | neighbors=[CustomerService, .get()]
- "customer_customer_service_customerservice_update": ".update()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.service.ts:L59 | neighbors=[CustomerService, .get()]
- "decorators_current_user_decorator": "current-user.decorator.ts" | kind=code-symbol | source=apps/api/src/common/decorators/current-user.decorator.ts:L1 | neighbors=[e3a8c77 feat: implement users CRUD back…, CurrentUser]
- "draft_route": "route.ts" | kind=code-symbol | source=apps/storefront/src/app/api/draft/route.ts:L1 | neighbors=[efe67e9 fix(build): resolve component t…, GET()]
- "dto_add_item_dto": "add-item.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/dto/add-item.dto.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, AddItemDto]
- "dto_checkout_dto": "checkout.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/dto/checkout.dto.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, CheckoutDto]
- "dto_create_cart_dto": "create-cart.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/dto/create-cart.dto.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, CreateCartDto]
- "dto_create_category_dto": "create-category.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/create-category.dto.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, CreateCategoryDto]
- "dto_create_customer_dto": "create-customer.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/dto/create-customer.dto.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, CreateCustomerDto]
- "dto_create_payment_intent_dto": "create-payment-intent.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/dto/create-payment-intent.dto.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, CreatePaymentIntentDto]
- "dto_invite_dto": "invite.dto.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/dto/invite.dto.ts:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, InviteDto]
- "dto_login_dto": "login.dto.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/dto/login.dto.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, LoginDto]
- "dto_mfa_disable_dto": "mfa-disable.dto.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/dto/mfa-disable.dto.ts:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, MfaDisableDto]
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
- "hooks_use_mobile": "use-mobile.ts" | kind=code-symbol | source=apps/admin/src/hooks/use-mobile.ts:L1 | neighbors=[4ece707 feat(admin): port UI components…, useIsMobile()]
- "inventory_inventory_worker": "inventory.worker.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/inventory/inventory.worker.ts:L1 | neighbors=[d26bd04 feat(commerce): implement advan…, InventoryWorker]
- "jetski_gemini_loader_loader_loadskillbodies": "loadSkillBodies()" | kind=code-symbol | source=.agents/skills/docs/integrations/jetski-gemini-loader/loader.mjs:L77 | neighbors=[loader.mjs, buildModelMessages()]
- "lib_api_authrequestwithtoken": "authRequestWithToken()" | kind=code-symbol | source=apps/storefront/src/lib/api.ts:L35 | neighbors=[api.ts, authRequest()]
- "lib_api_request": "request()" | kind=code-symbol | source=apps/storefront/src/lib/api.ts:L11 | neighbors=[api.ts, ApiError]
- "lib_image_loader": "image-loader.ts" | kind=code-symbol | source=apps/storefront/src/lib/image-loader.ts:L1 | neighbors=[efe67e9 fix(build): resolve component t…, customImageLoader()]
- "lib_invoice_downloadinvoice": "downloadInvoice()" | kind=code-symbol | source=apps/admin/src/lib/invoice.ts:L108 | neighbors=[invoice.ts, generateInvoiceHtml()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-018.json

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
