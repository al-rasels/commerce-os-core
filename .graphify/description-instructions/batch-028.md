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

- "components_dialog_dialogfooter": "DialogFooter()" | kind=code-symbol | source=packages/components/dialog.tsx:L93 | neighbors=[dialog.tsx]
- "components_dialog_dialogoverlay": "DialogOverlay()" | kind=code-symbol | source=packages/components/dialog.tsx:L26 | neighbors=[dialog.tsx]
- "components_dialog_dialogportal": "DialogPortal()" | kind=code-symbol | source=packages/components/dialog.tsx:L18 | neighbors=[dialog.tsx]
- "components_dialog_dialogtrigger": "DialogTrigger()" | kind=code-symbol | source=packages/components/dialog.tsx:L14 | neighbors=[dialog.tsx]
- "components_dropdown_menu_dropdownmenu": "DropdownMenu()" | kind=code-symbol | source=packages/components/dropdown-menu.tsx:L7 | neighbors=[dropdown-menu.tsx]
- "components_dropdown_menu_dropdownmenucheckboxitem": "DropdownMenuCheckboxItem()" | kind=code-symbol | source=packages/components/dropdown-menu.tsx:L146 | neighbors=[dropdown-menu.tsx]
- "components_dropdown_menu_dropdownmenucontent": "DropdownMenuContent()" | kind=code-symbol | source=packages/components/dropdown-menu.tsx:L19 | neighbors=[dropdown-menu.tsx]
- "components_dropdown_menu_dropdownmenugroup": "DropdownMenuGroup()" | kind=code-symbol | source=packages/components/dropdown-menu.tsx:L50 | neighbors=[dropdown-menu.tsx]
- "components_dropdown_menu_dropdownmenuitem": "DropdownMenuItem()" | kind=code-symbol | source=packages/components/dropdown-menu.tsx:L74 | neighbors=[dropdown-menu.tsx]
- "components_dropdown_menu_dropdownmenulabel": "DropdownMenuLabel()" | kind=code-symbol | source=packages/components/dropdown-menu.tsx:L54 | neighbors=[dropdown-menu.tsx]
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
