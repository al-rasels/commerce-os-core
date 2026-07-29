# Node Description Batch 28 of 51

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

- "components_chart_chartcontext": "ChartContext" | kind=code-symbol | source=packages/components/chart.tsx:L29 | neighbors=[chart.tsx]
- "components_chart_chartcontextprops": "ChartContextProps" | kind=code-symbol | source=packages/components/chart.tsx:L25 | neighbors=[chart.tsx]
- "components_chart_chartstyle": "ChartStyle()" | kind=code-symbol | source=packages/components/chart.tsx:L79 | neighbors=[chart.tsx]
- "components_chart_getpayloadconfigfrompayload": "getPayloadConfigFromPayload()" | kind=code-symbol | source=packages/components/chart.tsx:L285 | neighbors=[chart.tsx]
- "components_chart_initial_dimension": "INITIAL_DIMENSION" | kind=code-symbol | source=packages/components/chart.tsx:L13 | neighbors=[chart.tsx]
- "components_chart_themes": "THEMES" | kind=code-symbol | source=packages/components/chart.tsx:L11 | neighbors=[chart.tsx]
- "components_chart_tooltipnametype": "TooltipNameType" | kind=code-symbol | source=packages/components/chart.tsx:L15 | neighbors=[chart.tsx]
- "components_checkbox_checkbox": "Checkbox()" | kind=code-symbol | source=packages/components/checkbox.tsx:L8 | neighbors=[checkbox.tsx]
- "components_checkout_summary_checkoutsummaryprops": "CheckoutSummaryProps" | kind=code-symbol | source=packages/components/checkout-summary.tsx:L3 | neighbors=[checkout-summary.tsx]
- "components_collapsible_collapsible": "Collapsible()" | kind=code-symbol | source=packages/components/collapsible.tsx:L5 | neighbors=[collapsible.tsx]
- "components_collapsible_collapsiblecontent": "CollapsibleContent()" | kind=code-symbol | source=packages/components/collapsible.tsx:L15 | neighbors=[collapsible.tsx]
- "components_collapsible_collapsibletrigger": "CollapsibleTrigger()" | kind=code-symbol | source=packages/components/collapsible.tsx:L9 | neighbors=[collapsible.tsx]
- "components_combobox_comboboxchip": "ComboboxChip()" | kind=code-symbol | source=packages/components/combobox.tsx:L201 | neighbors=[combobox.tsx]
- "components_combobox_comboboxchips": "ComboboxChips()" | kind=code-symbol | source=packages/components/combobox.tsx:L185 | neighbors=[combobox.tsx]
- "components_combobox_comboboxchipsinput": "ComboboxChipsInput()" | kind=code-symbol | source=packages/components/combobox.tsx:L232 | neighbors=[combobox.tsx]
- "components_combobox_comboboxclear": "ComboboxClear()" | kind=code-symbol | source=packages/components/combobox.tsx:L32 | neighbors=[combobox.tsx]
- "components_combobox_comboboxcollection": "ComboboxCollection()" | kind=code-symbol | source=packages/components/combobox.tsx:L158 | neighbors=[combobox.tsx]
- "components_combobox_comboboxcontent": "ComboboxContent()" | kind=code-symbol | source=packages/components/combobox.tsx:L77 | neighbors=[combobox.tsx]
- "components_combobox_comboboxempty": "ComboboxEmpty()" | kind=code-symbol | source=packages/components/combobox.tsx:L162 | neighbors=[combobox.tsx]
- "components_combobox_comboboxgroup": "ComboboxGroup()" | kind=code-symbol | source=packages/components/combobox.tsx:L144 | neighbors=[combobox.tsx]
- "components_combobox_comboboxinput": "ComboboxInput()" | kind=code-symbol | source=packages/components/combobox.tsx:L45 | neighbors=[combobox.tsx]
- "components_combobox_comboboxitem": "ComboboxItem()" | kind=code-symbol | source=packages/components/combobox.tsx:L124 | neighbors=[combobox.tsx]
- "components_combobox_comboboxlabel": "ComboboxLabel()" | kind=code-symbol | source=packages/components/combobox.tsx:L148 | neighbors=[combobox.tsx]
- "components_combobox_comboboxlist": "ComboboxList()" | kind=code-symbol | source=packages/components/combobox.tsx:L111 | neighbors=[combobox.tsx]
- "components_combobox_comboboxseparator": "ComboboxSeparator()" | kind=code-symbol | source=packages/components/combobox.tsx:L175 | neighbors=[combobox.tsx]
- "components_combobox_comboboxtrigger": "ComboboxTrigger()" | kind=code-symbol | source=packages/components/combobox.tsx:L19 | neighbors=[combobox.tsx]
- "components_combobox_comboboxvalue": "ComboboxValue()" | kind=code-symbol | source=packages/components/combobox.tsx:L15 | neighbors=[combobox.tsx]
- "components_combobox_usecomboboxanchor": "useComboboxAnchor()" | kind=code-symbol | source=packages/components/combobox.tsx:L242 | neighbors=[combobox.tsx]
- "components_command_command": "Command()" | kind=code-symbol | source=packages/components/command.tsx:L18 | neighbors=[command.tsx]
- "components_command_commanddialog": "CommandDialog()" | kind=code-symbol | source=packages/components/command.tsx:L34 | neighbors=[command.tsx]
- "components_command_commandempty": "CommandEmpty()" | kind=code-symbol | source=packages/components/command.tsx:L106 | neighbors=[command.tsx]
- "components_command_commandgroup": "CommandGroup()" | kind=code-symbol | source=packages/components/command.tsx:L119 | neighbors=[command.tsx]
- "components_command_commandinput": "CommandInput()" | kind=code-symbol | source=packages/components/command.tsx:L67 | neighbors=[command.tsx]
- "components_command_commanditem": "CommandItem()" | kind=code-symbol | source=packages/components/command.tsx:L148 | neighbors=[command.tsx]
- "components_command_commandlist": "CommandList()" | kind=code-symbol | source=packages/components/command.tsx:L90 | neighbors=[command.tsx]
- "components_command_commandseparator": "CommandSeparator()" | kind=code-symbol | source=packages/components/command.tsx:L135 | neighbors=[command.tsx]
- "components_command_commandshortcut": "CommandShortcut()" | kind=code-symbol | source=packages/components/command.tsx:L168 | neighbors=[command.tsx]
- "components_data_table_column": "Column" | kind=code-symbol | source=packages/components/data-table.tsx:L7 | neighbors=[data-table.tsx]
- "components_data_table_datatableprops": "DataTableProps" | kind=code-symbol | source=packages/components/data-table.tsx:L15 | neighbors=[data-table.tsx]
- "components_dialog_dialogclose": "DialogClose()" | kind=code-symbol | source=packages/components/dialog.tsx:L22 | neighbors=[dialog.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-027.json

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
