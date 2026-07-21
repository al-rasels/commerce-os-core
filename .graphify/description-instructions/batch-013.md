# Node Description Batch 14 of 37

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

- "components_empty_state_emptystate": "EmptyState()" | kind=code-symbol | source=packages/components/empty-state.tsx:L13 | neighbors=[empty-state.tsx, registry.ts]
- "components_faq_faq": "Faq()" | kind=code-symbol | source=packages/components/faq.tsx:L11 | neighbors=[faq.tsx, registry.ts]
- "components_footer_footer": "Footer()" | kind=code-symbol | source=packages/components/footer.tsx:L16 | neighbors=[footer.tsx, registry.ts]
- "components_form_renderer_formrenderer": "FormRenderer()" | kind=code-symbol | source=packages/components/form-renderer.tsx:L29 | neighbors=[form-renderer.tsx, registry.ts]
- "components_gallery_gallery": "Gallery()" | kind=code-symbol | source=packages/components/gallery.tsx:L14 | neighbors=[gallery.tsx, registry.ts]
- "components_header_header": "Header()" | kind=code-symbol | source=packages/components/header.tsx:L15 | neighbors=[header.tsx, registry.ts]
- "components_hero_hero": "Hero()" | kind=code-symbol | source=packages/components/hero.tsx:L26 | neighbors=[hero.tsx, registry.ts]
- "components_json_ld_jsonld": "JsonLd()" | kind=code-symbol | source=apps/storefront/src/components/json-ld.tsx:L1 | neighbors=[json-ld.tsx, page.tsx]
- "components_newsletter_newsletter": "Newsletter()" | kind=code-symbol | source=packages/components/newsletter.tsx:L9 | neighbors=[newsletter.tsx, registry.ts]
- "components_pagination_getpagenumbers": "getPageNumbers()" | kind=code-symbol | source=packages/components/pagination.tsx:L13 | neighbors=[pagination.tsx, Pagination()]
- "components_product_card_formatprice": "formatPrice()" | kind=code-symbol | source=packages/components/product-card.tsx:L13 | neighbors=[product-card.tsx, ProductCard()]
- "components_product_card_productcardprops": "ProductCardProps" | kind=code-symbol | source=packages/components/product-card.tsx:L3 | neighbors=[product-card.tsx, product-grid.tsx]
- "components_product_grid_productgrid": "ProductGrid()" | kind=code-symbol | source=packages/components/product-grid.tsx:L29 | neighbors=[product-grid.tsx, registry.ts]
- "components_rich_text_richtext": "RichText()" | kind=code-symbol | source=packages/components/rich-text.tsx:L7 | neighbors=[registry.ts, rich-text.tsx]
- "components_search_autocomplete_searchautocomplete": "SearchAutocomplete()" | kind=code-symbol | source=apps/storefront/src/components/search-autocomplete.tsx:L10 | neighbors=[layout.tsx, search-autocomplete.tsx]
- "components_section_renderer_resolvebind": "resolveBind()" | kind=code-symbol | source=apps/storefront/src/components/section-renderer.tsx:L23 | neighbors=[section-renderer.tsx, resolveProps()]
- "components_section_renderer_resolveprops": "resolveProps()" | kind=code-symbol | source=apps/storefront/src/components/section-renderer.tsx:L27 | neighbors=[section-renderer.tsx, resolveBind()]
- "components_select_selectoption": "SelectOption" | kind=code-symbol | source=packages/components/select.tsx:L7 | neighbors=[form-renderer.tsx, select.tsx]
- "components_sidebar_sidebaritem": "SidebarItem" | kind=code-symbol | source=packages/components/sidebar.tsx:L7 | neighbors=[sidebar.tsx, sidebar.spec.tsx]
- "components_skeleton_skeleton": "Skeleton()" | kind=code-symbol | source=packages/components/skeleton.tsx:L8 | neighbors=[registry.ts, skeleton.tsx]
- "components_tabs_tab": "Tab" | kind=code-symbol | source=packages/components/tabs.tsx:L6 | neighbors=[tabs.tsx, tabs.spec.tsx]
- "components_tenant_theme_provider_tenantthemeprovider": "TenantThemeProvider()" | kind=code-symbol | source=apps/storefront/src/components/tenant-theme-provider.tsx:L11 | neighbors=[layout.tsx, tenant-theme-provider.tsx]
- "components_testimonials_testimonials": "Testimonials()" | kind=code-symbol | source=packages/components/testimonials.tsx:L25 | neighbors=[registry.ts, testimonials.tsx]
- "components_theme_provider_themeprovider": "ThemeProvider()" | kind=code-symbol | source=apps/storefront/src/components/theme-provider.tsx:L7 | neighbors=[layout.tsx, theme-provider.tsx]
- "components_toast_toast": "Toast()" | kind=code-symbol | source=packages/components/toast.tsx:L34 | neighbors=[registry.ts, toast.tsx]
- "components_toast_toastcontainer": "ToastContainer()" | kind=code-symbol | source=packages/components/toast.tsx:L77 | neighbors=[registry.ts, toast.tsx]
- "components_toast_toastdata": "ToastData" | kind=code-symbol | source=packages/components/toast.tsx:L9 | neighbors=[toast.tsx, ToastProps]
- "components_toast_toastprops": "ToastProps" | kind=code-symbol | source=packages/components/toast.tsx:L16 | neighbors=[toast.tsx, ToastData]
- "customer_customer_service_customerservice_remove": ".remove()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.service.ts:L68 | neighbors=[CustomerService, .get()]
- "customer_customer_service_customerservice_update": ".update()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.service.ts:L59 | neighbors=[CustomerService, .get()]
- "decorators_current_user_decorator": "current-user.decorator.ts" | kind=code-symbol | source=apps/api/src/common/decorators/current-user.decorator.ts:L1 | neighbors=[e3a8c77 feat: implement users CRUD back…, CurrentUser]
- "dto_add_item_dto": "add-item.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/dto/add-item.dto.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, AddItemDto]
- "dto_checkout_dto": "checkout.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/checkout/dto/checkout.dto.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, CheckoutDto]
- "dto_create_cart_dto": "create-cart.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/cart/dto/create-cart.dto.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, CreateCartDto]
- "dto_create_category_dto": "create-category.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/dto/create-category.dto.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, CreateCategoryDto]
- "dto_create_customer_dto": "create-customer.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/dto/create-customer.dto.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, CreateCustomerDto]
- "dto_create_payment_intent_dto": "create-payment-intent.dto.ts" | kind=code-symbol | source=apps/api/src/modules/commerce/payments/dto/create-payment-intent.dto.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, CreatePaymentIntentDto]
- "dto_invite_dto": "invite.dto.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/dto/invite.dto.ts:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, InviteDto]
- "dto_login_dto": "login.dto.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/dto/login.dto.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, LoginDto]
- "dto_mfa_disable_dto": "mfa-disable.dto.ts" | kind=code-symbol | source=apps/api/src/modules/platform/auth/dto/mfa-disable.dto.ts:L1 | neighbors=[ac49c08 chore: batch commit — catalog C…, MfaDisableDto]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-013.json

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
