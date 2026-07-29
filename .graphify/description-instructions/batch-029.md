# Node Description Batch 30 of 51

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

- "components_productbundleeditor_productbundleeditor": "ProductBundleEditor()" | kind=code-symbol | source=apps/admin/src/components/ProductBundleEditor.tsx:L20 | neighbors=[ProductBundleEditor.tsx]
- "components_productbundleeditor_productbundleeditorprops": "ProductBundleEditorProps" | kind=code-symbol | source=apps/admin/src/components/ProductBundleEditor.tsx:L16 | neighbors=[ProductBundleEditor.tsx]
- "components_productbundleeditor_productvariantselector": "ProductVariantSelector()" | kind=code-symbol | source=apps/admin/src/components/ProductBundleEditor.tsx:L176 | neighbors=[ProductBundleEditor.tsx]
- "components_productbundleeditor_variantsearchdialog": "VariantSearchDialog()" | kind=code-symbol | source=apps/admin/src/components/ProductBundleEditor.tsx:L137 | neighbors=[ProductBundleEditor.tsx]
- "components_progress_progress": "Progress()" | kind=code-symbol | source=packages/components/progress.tsx:L5 | neighbors=[progress.tsx]
- "components_progress_progressindicator": "ProgressIndicator()" | kind=code-symbol | source=packages/components/progress.tsx:L39 | neighbors=[progress.tsx]
- "components_progress_progresslabel": "ProgressLabel()" | kind=code-symbol | source=packages/components/progress.tsx:L52 | neighbors=[progress.tsx]
- "components_progress_progresstrack": "ProgressTrack()" | kind=code-symbol | source=packages/components/progress.tsx:L26 | neighbors=[progress.tsx]
- "components_progress_progressvalue": "ProgressValue()" | kind=code-symbol | source=packages/components/progress.tsx:L62 | neighbors=[progress.tsx]
- "components_radio_group_radiogroup": "RadioGroup()" | kind=code-symbol | source=packages/components/radio-group.tsx:L6 | neighbors=[radio-group.tsx]
- "components_radio_group_radiogroupitem": "RadioGroupItem()" | kind=code-symbol | source=packages/components/radio-group.tsx:L16 | neighbors=[radio-group.tsx]
- "components_registry_componentregistry": "componentRegistry" | kind=code-symbol | source=packages/components/registry.ts:L2 | neighbors=[registry.ts]
- "components_registry_componentregistryentry": "ComponentRegistryEntry" | kind=code-symbol | source=packages/components/registry.ts:L31 | neighbors=[registry.ts]
- "components_registry_componentregistrykey": "ComponentRegistryKey" | kind=code-symbol | source=packages/components/registry.ts:L67 | neighbors=[registry.ts]
- "components_rich_text_richtextprops": "RichTextProps" | kind=code-symbol | source=packages/components/rich-text.tsx:L3 | neighbors=[rich-text.tsx]
- "components_richtexteditor_richtexteditor": "RichTextEditor()" | kind=code-symbol | source=apps/admin/src/components/RichTextEditor.tsx:L11 | neighbors=[RichTextEditor.tsx]
- "components_richtexteditor_richtexteditorprops": "RichTextEditorProps" | kind=code-symbol | source=apps/admin/src/components/RichTextEditor.tsx:L5 | neighbors=[RichTextEditor.tsx]
- "components_scroll_area_scrollarea": "ScrollArea()" | kind=code-symbol | source=packages/components/scroll-area.tsx:L5 | neighbors=[scroll-area.tsx]
- "components_scroll_area_scrollbar": "ScrollBar()" | kind=code-symbol | source=packages/components/scroll-area.tsx:L28 | neighbors=[scroll-area.tsx]
- "components_search_bar_searchbarprops": "SearchBarProps" | kind=code-symbol | source=packages/components/search-bar.tsx:L7 | neighbors=[search-bar.tsx]
- "components_section_renderer_localregistry": "localRegistry" | kind=code-symbol | source=apps/storefront/src/components/section-renderer.tsx:L24 | neighbors=[section-renderer.tsx]
- "components_section_renderer_node": "Node" | kind=code-symbol | source=apps/storefront/src/components/section-renderer.tsx:L10 | neighbors=[section-renderer.tsx]
- "components_section_renderer_sectionrendererprops": "SectionRendererProps" | kind=code-symbol | source=apps/storefront/src/components/section-renderer.tsx:L18 | neighbors=[section-renderer.tsx]
- "components_section_renderer_visibilityrule": "VisibilityRule" | kind=code-symbol | source=apps/storefront/src/components/section-renderer.tsx:L5 | neighbors=[section-renderer.tsx]
- "components_section_schema_propschema": "PropSchema" | kind=code-symbol | source=packages/components/section-schema.ts:L3 | neighbors=[section-schema.ts]
- "components_section_schema_proptype": "PropType" | kind=code-symbol | source=packages/components/section-schema.ts:L1 | neighbors=[section-schema.ts]
- "components_section_schema_sectionschema": "SectionSchema" | kind=code-symbol | source=packages/components/section-schema.ts:L13 | neighbors=[section-schema.ts]
- "components_section_schema_sectionschemas": "sectionSchemas" | kind=code-symbol | source=packages/components/section-schema.ts:L20 | neighbors=[section-schema.ts]
- "components_select_selectprops": "SelectProps" | kind=code-symbol | source=packages/components/select.tsx:L12 | neighbors=[select.tsx]
- "components_separator_separator": "Separator()" | kind=code-symbol | source=packages/components/separator.tsx:L7 | neighbors=[separator.tsx]
- "components_sheet_sheet": "Sheet()" | kind=code-symbol | source=packages/components/sheet.tsx:L8 | neighbors=[sheet.tsx]
- "components_sheet_sheetclose": "SheetClose()" | kind=code-symbol | source=packages/components/sheet.tsx:L16 | neighbors=[sheet.tsx]
- "components_sheet_sheetcontent": "SheetContent()" | kind=code-symbol | source=packages/components/sheet.tsx:L37 | neighbors=[sheet.tsx]
- "components_sheet_sheetdescription": "SheetDescription()" | kind=code-symbol | source=packages/components/sheet.tsx:L114 | neighbors=[sheet.tsx]
- "components_sheet_sheetfooter": "SheetFooter()" | kind=code-symbol | source=packages/components/sheet.tsx:L91 | neighbors=[sheet.tsx]
- "components_sheet_sheetheader": "SheetHeader()" | kind=code-symbol | source=packages/components/sheet.tsx:L81 | neighbors=[sheet.tsx]
- "components_sheet_sheetoverlay": "SheetOverlay()" | kind=code-symbol | source=packages/components/sheet.tsx:L24 | neighbors=[sheet.tsx]
- "components_sheet_sheetportal": "SheetPortal()" | kind=code-symbol | source=packages/components/sheet.tsx:L20 | neighbors=[sheet.tsx]
- "components_sheet_sheettitle": "SheetTitle()" | kind=code-symbol | source=packages/components/sheet.tsx:L101 | neighbors=[sheet.tsx]
- "components_sheet_sheettrigger": "SheetTrigger()" | kind=code-symbol | source=packages/components/sheet.tsx:L12 | neighbors=[sheet.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-029.json

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
