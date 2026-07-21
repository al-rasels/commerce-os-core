# Node Description Batch 21 of 37

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

- "checkout_page_checkoutpage": "CheckoutPage()" | kind=code-symbol | source=apps/storefront/src/app/checkout/page.tsx:L14 | neighbors=[page.tsx]
- "commerce_commerce_module_commercemodule": "CommerceModule" | kind=code-symbol | source=apps/api/src/modules/commerce/commerce.module.ts:L29 | neighbors=[commerce.module.ts]
- "commitlint_config": "commitlint.config.js" | kind=code-symbol | source=commitlint.config.js:L1 | neighbors=[6ffba43 feat: add MFA auth flow, super …]
- "components_banner_bannerprops": "BannerProps" | kind=code-symbol | source=packages/components/banner.tsx:L3 | neighbors=[banner.tsx]
- "components_breadcrumbs_breadcrumbsprops": "BreadcrumbsProps" | kind=code-symbol | source=packages/components/breadcrumbs.tsx:L10 | neighbors=[breadcrumbs.tsx]
- "components_breadcrumbs_spec_defaultitems": "defaultItems" | kind=code-symbol | source=packages/components/breadcrumbs.spec.tsx:L4 | neighbors=[breadcrumbs.spec.tsx]
- "components_button_buttonprops": "ButtonProps" | kind=code-symbol | source=packages/components/button.tsx:L4 | neighbors=[button.tsx]
- "components_button_sizestyles": "sizeStyles" | kind=code-symbol | source=packages/components/button.tsx:L18 | neighbors=[button.tsx]
- "components_button_variantstyles": "variantStyles" | kind=code-symbol | source=packages/components/button.tsx:L10 | neighbors=[button.tsx]
- "components_cart_drawer_cartdrawerprops": "CartDrawerProps" | kind=code-symbol | source=packages/components/cart-drawer.tsx:L7 | neighbors=[cart-drawer.tsx]
- "components_checkout_summary_checkoutsummaryprops": "CheckoutSummaryProps" | kind=code-symbol | source=packages/components/checkout-summary.tsx:L3 | neighbors=[checkout-summary.tsx]
- "components_data_table_column": "Column" | kind=code-symbol | source=packages/components/data-table.tsx:L7 | neighbors=[data-table.tsx]
- "components_data_table_datatableprops": "DataTableProps" | kind=code-symbol | source=packages/components/data-table.tsx:L15 | neighbors=[data-table.tsx]
- "components_empty_state_emptystateprops": "EmptyStateProps" | kind=code-symbol | source=packages/components/empty-state.tsx:L5 | neighbors=[empty-state.tsx]
- "components_faq_faqprops": "FaqProps" | kind=code-symbol | source=packages/components/faq.tsx:L7 | neighbors=[faq.tsx]
- "components_footer_footerprops": "FooterProps" | kind=code-symbol | source=packages/components/footer.tsx:L3 | neighbors=[footer.tsx]
- "components_footer_socialiconlabels": "socialIconLabels" | kind=code-symbol | source=packages/components/footer.tsx:L9 | neighbors=[footer.tsx]
- "components_form_renderer_fieldtype": "FieldType" | kind=code-symbol | source=packages/components/form-renderer.tsx:L10 | neighbors=[form-renderer.tsx]
- "components_form_renderer_formfield": "FormField" | kind=code-symbol | source=packages/components/form-renderer.tsx:L12 | neighbors=[form-renderer.tsx]
- "components_form_renderer_formrendererprops": "FormRendererProps" | kind=code-symbol | source=packages/components/form-renderer.tsx:L22 | neighbors=[form-renderer.tsx]
- "components_gallery_galleryprops": "GalleryProps" | kind=code-symbol | source=packages/components/gallery.tsx:L3 | neighbors=[gallery.tsx]
- "components_gallery_variantstyles": "variantStyles" | kind=code-symbol | source=packages/components/gallery.tsx:L8 | neighbors=[gallery.tsx]
- "components_header_headerprops": "HeaderProps" | kind=code-symbol | source=packages/components/header.tsx:L7 | neighbors=[header.tsx]
- "components_hero_alignmentstyles": "alignmentStyles" | kind=code-symbol | source=packages/components/hero.tsx:L20 | neighbors=[hero.tsx]
- "components_hero_heroprops": "HeroProps" | kind=code-symbol | source=packages/components/hero.tsx:L3 | neighbors=[hero.tsx]
- "components_hero_variantstyles": "variantStyles" | kind=code-symbol | source=packages/components/hero.tsx:L13 | neighbors=[hero.tsx]
- "components_input_inputprops": "InputProps" | kind=code-symbol | source=packages/components/input.tsx:L4 | neighbors=[input.tsx]
- "components_mediauploadwidget_mediauploadwidget": "MediaUploadWidget()" | kind=code-symbol | source=apps/admin/src/components/MediaUploadWidget.tsx:L9 | neighbors=[MediaUploadWidget.tsx]
- "components_mediauploadwidget_mediauploadwidgetprops": "MediaUploadWidgetProps" | kind=code-symbol | source=apps/admin/src/components/MediaUploadWidget.tsx:L4 | neighbors=[MediaUploadWidget.tsx]
- "components_modal_modalprops": "ModalProps" | kind=code-symbol | source=packages/components/modal.tsx:L7 | neighbors=[modal.tsx]
- "components_newsletter_newsletterprops": "NewsletterProps" | kind=code-symbol | source=packages/components/newsletter.tsx:L3 | neighbors=[newsletter.tsx]
- "components_pagination_paginationprops": "PaginationProps" | kind=code-symbol | source=packages/components/pagination.tsx:L6 | neighbors=[pagination.tsx]
- "components_product_grid_columnmap": "columnMap" | kind=code-symbol | source=packages/components/product-grid.tsx:L12 | neighbors=[product-grid.tsx]
- "components_product_grid_demoproducts": "demoProducts" | kind=code-symbol | source=packages/components/product-grid.tsx:L18 | neighbors=[product-grid.tsx]
- "components_product_grid_productgridprops": "ProductGridProps" | kind=code-symbol | source=packages/components/product-grid.tsx:L4 | neighbors=[product-grid.tsx]
- "components_registry_componentregistry": "componentRegistry" | kind=code-symbol | source=packages/components/registry.ts:L2 | neighbors=[registry.ts]
- "components_registry_componentregistryentry": "ComponentRegistryEntry" | kind=code-symbol | source=packages/components/registry.ts:L31 | neighbors=[registry.ts]
- "components_registry_componentregistrykey": "ComponentRegistryKey" | kind=code-symbol | source=packages/components/registry.ts:L68 | neighbors=[registry.ts]
- "components_rich_text_richtextprops": "RichTextProps" | kind=code-symbol | source=packages/components/rich-text.tsx:L3 | neighbors=[rich-text.tsx]
- "components_richtexteditor_richtexteditor": "RichTextEditor()" | kind=code-symbol | source=apps/admin/src/components/RichTextEditor.tsx:L11 | neighbors=[RichTextEditor.tsx]

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
