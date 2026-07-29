# Node Description Batch 49 of 51

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

- "ui_pagination_paginationellipsis": "PaginationEllipsis()" | kind=code-symbol | source=apps/admin/src/components/ui/pagination.tsx:L73 | neighbors=[pagination.tsx]
- "ui_pagination_paginationitem": "PaginationItem()" | kind=code-symbol | source=apps/admin/src/components/ui/pagination.tsx:L24 | neighbors=[pagination.tsx]
- "ui_pagination_paginationlink": "PaginationLink()" | kind=code-symbol | source=apps/admin/src/components/ui/pagination.tsx:L33 | neighbors=[pagination.tsx]
- "ui_pagination_paginationlinkprops": "PaginationLinkProps" | kind=code-symbol | source=apps/admin/src/components/ui/pagination.tsx:L28 | neighbors=[pagination.tsx]
- "ui_pagination_paginationnext": "PaginationNext()" | kind=code-symbol | source=apps/admin/src/components/ui/pagination.tsx:L60 | neighbors=[pagination.tsx]
- "ui_pagination_paginationprevious": "PaginationPrevious()" | kind=code-symbol | source=apps/admin/src/components/ui/pagination.tsx:L47 | neighbors=[pagination.tsx]
- "ui_popover_popover": "Popover()" | kind=code-symbol | source=apps/admin/src/components/ui/popover.tsx:L6 | neighbors=[popover.tsx]
- "ui_popover_popovercontent": "PopoverContent()" | kind=code-symbol | source=apps/admin/src/components/ui/popover.tsx:L14 | neighbors=[popover.tsx]
- "ui_popover_popoverdescription": "PopoverDescription()" | kind=code-symbol | source=apps/admin/src/components/ui/popover.tsx:L68 | neighbors=[popover.tsx]
- "ui_popover_popoverheader": "PopoverHeader()" | kind=code-symbol | source=apps/admin/src/components/ui/popover.tsx:L48 | neighbors=[popover.tsx]
- "ui_popover_popovertitle": "PopoverTitle()" | kind=code-symbol | source=apps/admin/src/components/ui/popover.tsx:L58 | neighbors=[popover.tsx]
- "ui_popover_popovertrigger": "PopoverTrigger()" | kind=code-symbol | source=apps/admin/src/components/ui/popover.tsx:L10 | neighbors=[popover.tsx]
- "ui_progress_progress": "Progress()" | kind=code-symbol | source=apps/admin/src/components/ui/progress.tsx:L5 | neighbors=[progress.tsx]
- "ui_progress_progressindicator": "ProgressIndicator()" | kind=code-symbol | source=apps/admin/src/components/ui/progress.tsx:L39 | neighbors=[progress.tsx]
- "ui_progress_progresslabel": "ProgressLabel()" | kind=code-symbol | source=apps/admin/src/components/ui/progress.tsx:L52 | neighbors=[progress.tsx]
- "ui_progress_progresstrack": "ProgressTrack()" | kind=code-symbol | source=apps/admin/src/components/ui/progress.tsx:L26 | neighbors=[progress.tsx]
- "ui_progress_progressvalue": "ProgressValue()" | kind=code-symbol | source=apps/admin/src/components/ui/progress.tsx:L62 | neighbors=[progress.tsx]
- "ui_radio_group_radiogroup": "RadioGroup()" | kind=code-symbol | source=apps/storefront/src/components/ui/radio-group.tsx:L8 | neighbors=[radio-group.tsx]
- "ui_radio_group_radiogroupitem": "RadioGroupItem()" | kind=code-symbol | source=apps/storefront/src/components/ui/radio-group.tsx:L18 | neighbors=[radio-group.tsx]
- "ui_scroll_area_scrollarea": "ScrollArea()" | kind=code-symbol | source=apps/storefront/src/components/ui/scroll-area.tsx:L8 | neighbors=[scroll-area.tsx]
- "ui_scroll_area_scrollbar": "ScrollBar()" | kind=code-symbol | source=apps/storefront/src/components/ui/scroll-area.tsx:L31 | neighbors=[scroll-area.tsx]
- "ui_select_selectcontent": "SelectContent()" | kind=code-symbol | source=apps/storefront/src/components/ui/select.tsx:L59 | neighbors=[select.tsx]
- "ui_select_selectgroup": "SelectGroup()" | kind=code-symbol | source=apps/storefront/src/components/ui/select.tsx:L11 | neighbors=[select.tsx]
- "ui_select_selectitem": "SelectItem()" | kind=code-symbol | source=apps/storefront/src/components/ui/select.tsx:L111 | neighbors=[select.tsx]
- "ui_select_selectlabel": "SelectLabel()" | kind=code-symbol | source=apps/storefront/src/components/ui/select.tsx:L98 | neighbors=[select.tsx]
- "ui_select_selectscrolldownbutton": "SelectScrollDownButton()" | kind=code-symbol | source=apps/storefront/src/components/ui/select.tsx:L171 | neighbors=[select.tsx]
- "ui_select_selectscrollupbutton": "SelectScrollUpButton()" | kind=code-symbol | source=apps/storefront/src/components/ui/select.tsx:L152 | neighbors=[select.tsx]
- "ui_select_selectseparator": "SelectSeparator()" | kind=code-symbol | source=apps/storefront/src/components/ui/select.tsx:L139 | neighbors=[select.tsx]
- "ui_select_selecttrigger": "SelectTrigger()" | kind=code-symbol | source=apps/storefront/src/components/ui/select.tsx:L31 | neighbors=[select.tsx]
- "ui_select_selectvalue": "SelectValue()" | kind=code-symbol | source=apps/storefront/src/components/ui/select.tsx:L21 | neighbors=[select.tsx]
- "ui_separator_separator": "Separator()" | kind=code-symbol | source=apps/storefront/src/components/ui/separator.tsx:L7 | neighbors=[separator.tsx]
- "ui_sheet_sheetclose": "SheetClose()" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L18 | neighbors=[sheet.tsx]
- "ui_sheet_sheetdescription": "SheetDescription()" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L116 | neighbors=[sheet.tsx]
- "ui_sheet_sheetfooter": "SheetFooter()" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L93 | neighbors=[sheet.tsx]
- "ui_sheet_sheetoverlay": "SheetOverlay()" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L26 | neighbors=[sheet.tsx]
- "ui_sheet_sheetportal": "SheetPortal()" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L22 | neighbors=[sheet.tsx]
- "ui_sheet_sheettrigger": "SheetTrigger()" | kind=code-symbol | source=apps/storefront/src/components/ui/sheet.tsx:L14 | neighbors=[sheet.tsx]
- "ui_sidebar_sidebarcontent": "SidebarContent()" | kind=code-symbol | source=apps/admin/src/components/ui/sidebar.tsx:L346 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarcontext": "SidebarContext" | kind=code-symbol | source=apps/admin/src/components/ui/sidebar.tsx:L37 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarcontextprops": "SidebarContextProps" | kind=code-symbol | source=apps/admin/src/components/ui/sidebar.tsx:L27 | neighbors=[sidebar.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-048.json

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
