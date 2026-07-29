# Node Description Batch 29 of 51

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

- "components_dropdown_menu_dropdownmenuportal": "DropdownMenuPortal()" | kind=code-symbol | source=packages/components/dropdown-menu.tsx:L11 | neighbors=[dropdown-menu.tsx]
- "components_dropdown_menu_dropdownmenuradiogroup": "DropdownMenuRadioGroup()" | kind=code-symbol | source=packages/components/dropdown-menu.tsx:L180 | neighbors=[dropdown-menu.tsx]
- "components_dropdown_menu_dropdownmenuradioitem": "DropdownMenuRadioItem()" | kind=code-symbol | source=packages/components/dropdown-menu.tsx:L189 | neighbors=[dropdown-menu.tsx]
- "components_dropdown_menu_dropdownmenuseparator": "DropdownMenuSeparator()" | kind=code-symbol | source=packages/components/dropdown-menu.tsx:L221 | neighbors=[dropdown-menu.tsx]
- "components_dropdown_menu_dropdownmenushortcut": "DropdownMenuShortcut()" | kind=code-symbol | source=packages/components/dropdown-menu.tsx:L234 | neighbors=[dropdown-menu.tsx]
- "components_dropdown_menu_dropdownmenusub": "DropdownMenuSub()" | kind=code-symbol | source=packages/components/dropdown-menu.tsx:L97 | neighbors=[dropdown-menu.tsx]
- "components_dropdown_menu_dropdownmenusubcontent": "DropdownMenuSubContent()" | kind=code-symbol | source=packages/components/dropdown-menu.tsx:L125 | neighbors=[dropdown-menu.tsx]
- "components_dropdown_menu_dropdownmenusubtrigger": "DropdownMenuSubTrigger()" | kind=code-symbol | source=packages/components/dropdown-menu.tsx:L101 | neighbors=[dropdown-menu.tsx]
- "components_dropdown_menu_dropdownmenutrigger": "DropdownMenuTrigger()" | kind=code-symbol | source=packages/components/dropdown-menu.tsx:L15 | neighbors=[dropdown-menu.tsx]
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
- "components_input_group_inputgrouptext": "InputGroupText()" | kind=code-symbol | source=packages/components/input-group.tsx:L107 | neighbors=[input-group.tsx]
- "components_input_group_inputgrouptextarea": "InputGroupTextarea()" | kind=code-symbol | source=packages/components/input-group.tsx:L135 | neighbors=[input-group.tsx]
- "components_input_inputprops": "InputProps" | kind=code-symbol | source=packages/components/input.tsx:L4 | neighbors=[input.tsx]
- "components_label_label": "Label()" | kind=code-symbol | source=packages/components/label.tsx:L5 | neighbors=[label.tsx]
- "components_mediauploadwidget_mediauploadwidget": "MediaUploadWidget()" | kind=code-symbol | source=apps/admin/src/components/MediaUploadWidget.tsx:L9 | neighbors=[MediaUploadWidget.tsx]
- "components_mediauploadwidget_mediauploadwidgetprops": "MediaUploadWidgetProps" | kind=code-symbol | source=apps/admin/src/components/MediaUploadWidget.tsx:L4 | neighbors=[MediaUploadWidget.tsx]
- "components_modal_modalprops": "ModalProps" | kind=code-symbol | source=packages/components/modal.tsx:L8 | neighbors=[modal.tsx]
- "components_newsletter_newsletterprops": "NewsletterProps" | kind=code-symbol | source=packages/components/newsletter.tsx:L3 | neighbors=[newsletter.tsx]
- "components_pagination_paginationprops": "PaginationProps" | kind=code-symbol | source=packages/components/pagination.tsx:L6 | neighbors=[pagination.tsx]
- "components_popover_popover": "Popover()" | kind=code-symbol | source=packages/components/popover.tsx:L6 | neighbors=[popover.tsx]
- "components_popover_popovercontent": "PopoverContent()" | kind=code-symbol | source=packages/components/popover.tsx:L14 | neighbors=[popover.tsx]
- "components_popover_popoverdescription": "PopoverDescription()" | kind=code-symbol | source=packages/components/popover.tsx:L68 | neighbors=[popover.tsx]
- "components_popover_popoverheader": "PopoverHeader()" | kind=code-symbol | source=packages/components/popover.tsx:L48 | neighbors=[popover.tsx]
- "components_popover_popovertitle": "PopoverTitle()" | kind=code-symbol | source=packages/components/popover.tsx:L58 | neighbors=[popover.tsx]
- "components_popover_popovertrigger": "PopoverTrigger()" | kind=code-symbol | source=packages/components/popover.tsx:L10 | neighbors=[popover.tsx]
- "components_product_grid_columnmap": "columnMap" | kind=code-symbol | source=packages/components/product-grid.tsx:L12 | neighbors=[product-grid.tsx]
- "components_product_grid_demoproducts": "demoProducts" | kind=code-symbol | source=packages/components/product-grid.tsx:L18 | neighbors=[product-grid.tsx]
- "components_product_grid_productgridprops": "ProductGridProps" | kind=code-symbol | source=packages/components/product-grid.tsx:L4 | neighbors=[product-grid.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-028.json

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
