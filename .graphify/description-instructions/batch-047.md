# Node Description Batch 48 of 51

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
- "ui_dialog_dialogtitle": "DialogTitle()" | kind=code-symbol | source=apps/storefront/src/components/ui/dialog.tsx:L120 | neighbors=[dialog.tsx]
- "ui_dialog_dialogtrigger": "DialogTrigger()" | kind=code-symbol | source=apps/storefront/src/components/ui/dialog.tsx:L14 | neighbors=[dialog.tsx]
- "ui_dropdown_menu_dropdownmenu": "DropdownMenu()" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L9 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenucheckboxitem": "DropdownMenuCheckboxItem()" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L148 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenucontent": "DropdownMenuContent()" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L21 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenugroup": "DropdownMenuGroup()" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L52 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuitem": "DropdownMenuItem()" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L76 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenulabel": "DropdownMenuLabel()" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L56 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuportal": "DropdownMenuPortal()" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L13 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuradiogroup": "DropdownMenuRadioGroup()" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L182 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuradioitem": "DropdownMenuRadioItem()" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L191 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuseparator": "DropdownMenuSeparator()" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L223 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenushortcut": "DropdownMenuShortcut()" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L236 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenusub": "DropdownMenuSub()" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L99 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenusubcontent": "DropdownMenuSubContent()" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L127 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenusubtrigger": "DropdownMenuSubTrigger()" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L103 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenutrigger": "DropdownMenuTrigger()" | kind=code-symbol | source=apps/storefront/src/components/ui/dropdown-menu.tsx:L17 | neighbors=[dropdown-menu.tsx]
- "ui_input_group_inputgroup": "InputGroup()" | kind=code-symbol | source=apps/admin/src/components/ui/input-group.tsx:L11 | neighbors=[input-group.tsx]
- "ui_input_group_inputgroupinput": "InputGroupInput()" | kind=code-symbol | source=apps/admin/src/components/ui/input-group.tsx:L119 | neighbors=[input-group.tsx]
- "ui_input_group_inputgrouptext": "InputGroupText()" | kind=code-symbol | source=apps/admin/src/components/ui/input-group.tsx:L107 | neighbors=[input-group.tsx]
- "ui_input_group_inputgrouptextarea": "InputGroupTextarea()" | kind=code-symbol | source=apps/admin/src/components/ui/input-group.tsx:L135 | neighbors=[input-group.tsx]
- "ui_pagination_pagination": "Pagination()" | kind=code-symbol | source=apps/admin/src/components/ui/pagination.tsx:L8 | neighbors=[pagination.tsx]
- "ui_pagination_paginationcontent": "PaginationContent()" | kind=code-symbol | source=apps/admin/src/components/ui/pagination.tsx:L20 | neighbors=[pagination.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-047.json

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
