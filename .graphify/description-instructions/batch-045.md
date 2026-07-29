# Node Description Batch 46 of 51

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

- "ui_breadcrumb_breadcrumb": "Breadcrumb()" | kind=code-symbol | source=apps/admin/src/components/ui/breadcrumb.tsx:L5 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumbellipsis": "BreadcrumbEllipsis()" | kind=code-symbol | source=apps/admin/src/components/ui/breadcrumb.tsx:L56 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumbitem": "BreadcrumbItem()" | kind=code-symbol | source=apps/admin/src/components/ui/breadcrumb.tsx:L19 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumblink": "BreadcrumbLink()" | kind=code-symbol | source=apps/admin/src/components/ui/breadcrumb.tsx:L23 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumblist": "BreadcrumbList()" | kind=code-symbol | source=apps/admin/src/components/ui/breadcrumb.tsx:L9 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumbpage": "BreadcrumbPage()" | kind=code-symbol | source=apps/admin/src/components/ui/breadcrumb.tsx:L29 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumbseparator": "BreadcrumbSeparator()" | kind=code-symbol | source=apps/admin/src/components/ui/breadcrumb.tsx:L42 | neighbors=[breadcrumb.tsx]
- "ui_button_buttonprops": "ButtonProps" | kind=code-symbol | source=apps/admin/src/components/ui/button.tsx:L43 | neighbors=[button.tsx]
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
- "ui_chart_chartconfig": "ChartConfig" | kind=code-symbol | source=apps/admin/src/components/ui/chart.tsx:L17 | neighbors=[chart.tsx]
- "ui_chart_chartcontainer": "ChartContainer()" | kind=code-symbol | source=apps/admin/src/components/ui/chart.tsx:L41 | neighbors=[chart.tsx]
- "ui_chart_chartcontext": "ChartContext" | kind=code-symbol | source=apps/admin/src/components/ui/chart.tsx:L29 | neighbors=[chart.tsx]
- "ui_chart_chartcontextprops": "ChartContextProps" | kind=code-symbol | source=apps/admin/src/components/ui/chart.tsx:L25 | neighbors=[chart.tsx]
- "ui_chart_chartstyle": "ChartStyle()" | kind=code-symbol | source=apps/admin/src/components/ui/chart.tsx:L79 | neighbors=[chart.tsx]
- "ui_chart_getpayloadconfigfrompayload": "getPayloadConfigFromPayload()" | kind=code-symbol | source=apps/admin/src/components/ui/chart.tsx:L285 | neighbors=[chart.tsx]
- "ui_chart_initial_dimension": "INITIAL_DIMENSION" | kind=code-symbol | source=apps/admin/src/components/ui/chart.tsx:L13 | neighbors=[chart.tsx]
- "ui_chart_themes": "THEMES" | kind=code-symbol | source=apps/admin/src/components/ui/chart.tsx:L11 | neighbors=[chart.tsx]
- "ui_chart_tooltipnametype": "TooltipNameType" | kind=code-symbol | source=apps/admin/src/components/ui/chart.tsx:L15 | neighbors=[chart.tsx]
- "ui_checkbox_checkbox": "Checkbox()" | kind=code-symbol | source=apps/storefront/src/components/ui/checkbox.tsx:L8 | neighbors=[checkbox.tsx]
- "ui_collapsible_collapsible": "Collapsible()" | kind=code-symbol | source=apps/admin/src/components/ui/collapsible.tsx:L5 | neighbors=[collapsible.tsx]
- "ui_collapsible_collapsiblecontent": "CollapsibleContent()" | kind=code-symbol | source=apps/admin/src/components/ui/collapsible.tsx:L15 | neighbors=[collapsible.tsx]
- "ui_collapsible_collapsibletrigger": "CollapsibleTrigger()" | kind=code-symbol | source=apps/admin/src/components/ui/collapsible.tsx:L9 | neighbors=[collapsible.tsx]
- "ui_combobox_comboboxchip": "ComboboxChip()" | kind=code-symbol | source=apps/admin/src/components/ui/combobox.tsx:L201 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxchips": "ComboboxChips()" | kind=code-symbol | source=apps/admin/src/components/ui/combobox.tsx:L185 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxchipsinput": "ComboboxChipsInput()" | kind=code-symbol | source=apps/admin/src/components/ui/combobox.tsx:L232 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxclear": "ComboboxClear()" | kind=code-symbol | source=apps/admin/src/components/ui/combobox.tsx:L32 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxcollection": "ComboboxCollection()" | kind=code-symbol | source=apps/admin/src/components/ui/combobox.tsx:L158 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxcontent": "ComboboxContent()" | kind=code-symbol | source=apps/admin/src/components/ui/combobox.tsx:L77 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxempty": "ComboboxEmpty()" | kind=code-symbol | source=apps/admin/src/components/ui/combobox.tsx:L162 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxgroup": "ComboboxGroup()" | kind=code-symbol | source=apps/admin/src/components/ui/combobox.tsx:L144 | neighbors=[combobox.tsx]
- "ui_combobox_comboboxinput": "ComboboxInput()" | kind=code-symbol | source=apps/admin/src/components/ui/combobox.tsx:L45 | neighbors=[combobox.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-045.json

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
