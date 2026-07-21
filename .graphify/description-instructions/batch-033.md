# Node Description Batch 34 of 37

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

- "ui_avatar_avatar": "Avatar()" | kind=code-symbol | source=apps/admin/src/components/ui/avatar.tsx:L6 | neighbors=[avatar.tsx]
- "ui_avatar_avatarbadge": "AvatarBadge()" | kind=code-symbol | source=apps/admin/src/components/ui/avatar.tsx:L55 | neighbors=[avatar.tsx]
- "ui_avatar_avatarfallback": "AvatarFallback()" | kind=code-symbol | source=apps/admin/src/components/ui/avatar.tsx:L39 | neighbors=[avatar.tsx]
- "ui_avatar_avatargroup": "AvatarGroup()" | kind=code-symbol | source=apps/admin/src/components/ui/avatar.tsx:L71 | neighbors=[avatar.tsx]
- "ui_avatar_avatargroupcount": "AvatarGroupCount()" | kind=code-symbol | source=apps/admin/src/components/ui/avatar.tsx:L84 | neighbors=[avatar.tsx]
- "ui_avatar_avatarimage": "AvatarImage()" | kind=code-symbol | source=apps/admin/src/components/ui/avatar.tsx:L26 | neighbors=[avatar.tsx]
- "ui_card_cardaction": "CardAction()" | kind=code-symbol | source=apps/storefront/src/components/ui/card.tsx:L59 | neighbors=[card.tsx]
- "ui_card_cardfooter": "CardFooter()" | kind=code-symbol | source=apps/storefront/src/components/ui/card.tsx:L82 | neighbors=[card.tsx]
- "ui_carousel_carousel": "Carousel()" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L45 | neighbors=[carousel.tsx]
- "ui_carousel_carouselapi": "CarouselApi" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L12 | neighbors=[carousel.tsx]
- "ui_carousel_carouselcontext": "CarouselContext" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L33 | neighbors=[carousel.tsx]
- "ui_carousel_carouselcontextprops": "CarouselContextProps" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L24 | neighbors=[carousel.tsx]
- "ui_carousel_carouseloptions": "CarouselOptions" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L14 | neighbors=[carousel.tsx]
- "ui_carousel_carouselplugin": "CarouselPlugin" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L15 | neighbors=[carousel.tsx]
- "ui_carousel_carouselprops": "CarouselProps" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L17 | neighbors=[carousel.tsx]
- "ui_carousel_usecarouselparameters": "UseCarouselParameters" | kind=code-symbol | source=apps/storefront/src/components/ui/carousel.tsx:L13 | neighbors=[carousel.tsx]
- "ui_checkbox_checkbox": "Checkbox()" | kind=code-symbol | source=apps/storefront/src/components/ui/checkbox.tsx:L8 | neighbors=[checkbox.tsx]
- "ui_collapsible_collapsible": "Collapsible()" | kind=code-symbol | source=apps/admin/src/components/ui/collapsible.tsx:L5 | neighbors=[collapsible.tsx]
- "ui_collapsible_collapsiblecontent": "CollapsibleContent()" | kind=code-symbol | source=apps/admin/src/components/ui/collapsible.tsx:L15 | neighbors=[collapsible.tsx]
- "ui_collapsible_collapsibletrigger": "CollapsibleTrigger()" | kind=code-symbol | source=apps/admin/src/components/ui/collapsible.tsx:L9 | neighbors=[collapsible.tsx]
- "ui_command_command": "Command()" | kind=code-symbol | source=apps/admin/src/components/ui/command.tsx:L18 | neighbors=[command.tsx]
- "ui_command_commanddialog": "CommandDialog()" | kind=code-symbol | source=apps/admin/src/components/ui/command.tsx:L34 | neighbors=[command.tsx]
- "ui_command_commandempty": "CommandEmpty()" | kind=code-symbol | source=apps/admin/src/components/ui/command.tsx:L106 | neighbors=[command.tsx]
- "ui_command_commandgroup": "CommandGroup()" | kind=code-symbol | source=apps/admin/src/components/ui/command.tsx:L119 | neighbors=[command.tsx]
- "ui_command_commandinput": "CommandInput()" | kind=code-symbol | source=apps/admin/src/components/ui/command.tsx:L67 | neighbors=[command.tsx]
- "ui_command_commanditem": "CommandItem()" | kind=code-symbol | source=apps/admin/src/components/ui/command.tsx:L148 | neighbors=[command.tsx]
- "ui_command_commandlist": "CommandList()" | kind=code-symbol | source=apps/admin/src/components/ui/command.tsx:L90 | neighbors=[command.tsx]
- "ui_command_commandseparator": "CommandSeparator()" | kind=code-symbol | source=apps/admin/src/components/ui/command.tsx:L135 | neighbors=[command.tsx]
- "ui_command_commandshortcut": "CommandShortcut()" | kind=code-symbol | source=apps/admin/src/components/ui/command.tsx:L168 | neighbors=[command.tsx]
- "ui_data_table_datatable": "DataTable()" | kind=code-symbol | source=apps/admin/src/components/ui/data-table.tsx:L15 | neighbors=[data-table.tsx]
- "ui_data_table_datatableprops": "DataTableProps" | kind=code-symbol | source=apps/admin/src/components/ui/data-table.tsx:L10 | neighbors=[data-table.tsx]
- "ui_data_table_tanstackcolumn": "TanStackColumn" | kind=code-symbol | source=apps/admin/src/components/ui/data-table.tsx:L4 | neighbors=[data-table.tsx]
- "ui_dialog_dialog": "Dialog()" | kind=code-symbol | source=apps/storefront/src/components/ui/dialog.tsx:L10 | neighbors=[dialog.tsx]
- "ui_dialog_dialogclose": "DialogClose()" | kind=code-symbol | source=apps/storefront/src/components/ui/dialog.tsx:L22 | neighbors=[dialog.tsx]
- "ui_dialog_dialogcontent": "DialogContent()" | kind=code-symbol | source=apps/storefront/src/components/ui/dialog.tsx:L42 | neighbors=[dialog.tsx]
- "ui_dialog_dialogdescription": "DialogDescription()" | kind=code-symbol | source=apps/storefront/src/components/ui/dialog.tsx:L133 | neighbors=[dialog.tsx]
- "ui_dialog_dialogfooter": "DialogFooter()" | kind=code-symbol | source=apps/storefront/src/components/ui/dialog.tsx:L93 | neighbors=[dialog.tsx]
- "ui_dialog_dialogheader": "DialogHeader()" | kind=code-symbol | source=apps/storefront/src/components/ui/dialog.tsx:L83 | neighbors=[dialog.tsx]
- "ui_dialog_dialogoverlay": "DialogOverlay()" | kind=code-symbol | source=apps/storefront/src/components/ui/dialog.tsx:L26 | neighbors=[dialog.tsx]
- "ui_dialog_dialogportal": "DialogPortal()" | kind=code-symbol | source=apps/storefront/src/components/ui/dialog.tsx:L18 | neighbors=[dialog.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-033.json

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
