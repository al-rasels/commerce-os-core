# Node Description Batch 31 of 51

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
- "components_sidebar_sidebarprops": "SidebarProps" | kind=code-symbol | source=packages/components/sidebar.tsx:L15 | neighbors=[sidebar.tsx]
- "components_sidebar_spec_items": "items" | kind=code-symbol | source=packages/components/sidebar.spec.tsx:L5 | neighbors=[sidebar.spec.tsx]
- "components_skeleton_skeletonprops": "SkeletonProps" | kind=code-symbol | source=packages/components/skeleton.tsx:L3 | neighbors=[skeleton.tsx]
- "components_switch_switch": "Switch()" | kind=code-symbol | source=packages/components/switch.tsx:L7 | neighbors=[switch.tsx]
- "components_table_table": "Table()" | kind=code-symbol | source=packages/components/table.tsx:L7 | neighbors=[table.tsx]
- "components_table_tablebody": "TableBody()" | kind=code-symbol | source=packages/components/table.tsx:L32 | neighbors=[table.tsx]
- "components_table_tablecaption": "TableCaption()" | kind=code-symbol | source=packages/components/table.tsx:L94 | neighbors=[table.tsx]
- "components_table_tablecell": "TableCell()" | kind=code-symbol | source=packages/components/table.tsx:L81 | neighbors=[table.tsx]
- "components_table_tablefooter": "TableFooter()" | kind=code-symbol | source=packages/components/table.tsx:L42 | neighbors=[table.tsx]
- "components_table_tablehead": "TableHead()" | kind=code-symbol | source=packages/components/table.tsx:L68 | neighbors=[table.tsx]
- "components_table_tableheader": "TableHeader()" | kind=code-symbol | source=packages/components/table.tsx:L22 | neighbors=[table.tsx]
- "components_table_tablerow": "TableRow()" | kind=code-symbol | source=packages/components/table.tsx:L55 | neighbors=[table.tsx]
- "components_tabs_spec_tabs": "tabs" | kind=code-symbol | source=packages/components/tabs.spec.tsx:L5 | neighbors=[tabs.spec.tsx]
- "components_tabs_tabsprops": "TabsProps" | kind=code-symbol | source=packages/components/tabs.tsx:L12 | neighbors=[tabs.tsx]
- "components_tenant_theme_provider_resolvedtheme": "ResolvedTheme" | kind=code-symbol | source=apps/storefront/src/components/tenant-theme-provider.tsx:L5 | neighbors=[tenant-theme-provider.tsx]
- "components_testimonials_stars": "Stars()" | kind=code-symbol | source=packages/components/testimonials.tsx:L8 | neighbors=[testimonials.tsx]
- "components_testimonials_testimonialsprops": "TestimonialsProps" | kind=code-symbol | source=packages/components/testimonials.tsx:L3 | neighbors=[testimonials.tsx]
- "components_textarea_textareaprops": "TextareaProps" | kind=code-symbol | source=packages/components/textarea.tsx:L4 | neighbors=[textarea.tsx]
- "components_timeline_timeline": "Timeline" | kind=code-symbol | source=packages/components/timeline.tsx:L24 | neighbors=[timeline.tsx]
- "components_timeline_timelinecontent": "TimelineContent" | kind=code-symbol | source=packages/components/timeline.tsx:L147 | neighbors=[timeline.tsx]
- "components_timeline_timelinecontentprops": "TimelineContentProps" | kind=code-symbol | source=packages/components/timeline.tsx:L144 | neighbors=[timeline.tsx]
- "components_timeline_timelinecontentvariants": "timelineContentVariants" | kind=code-symbol | source=packages/components/timeline.tsx:L132 | neighbors=[timeline.tsx]
- "components_timeline_timelinedot": "TimelineDot" | kind=code-symbol | source=packages/components/timeline.tsx:L89 | neighbors=[timeline.tsx]
- "components_timeline_timelinedotprops": "TimelineDotProps" | kind=code-symbol | source=packages/components/timeline.tsx:L76 | neighbors=[timeline.tsx]
- "components_timeline_timelinedotvariants": "timelineDotVariants" | kind=code-symbol | source=packages/components/timeline.tsx:L56 | neighbors=[timeline.tsx]
- "components_timeline_timelineheading": "TimelineHeading" | kind=code-symbol | source=packages/components/timeline.tsx:L173 | neighbors=[timeline.tsx]
- "components_timeline_timelineheadingprops": "TimelineHeadingProps" | kind=code-symbol | source=packages/components/timeline.tsx:L170 | neighbors=[timeline.tsx]
- "components_timeline_timelineheadingvariants": "timelineHeadingVariants" | kind=code-symbol | source=packages/components/timeline.tsx:L153 | neighbors=[timeline.tsx]
- "components_timeline_timelineitem": "TimelineItem" | kind=code-symbol | source=packages/components/timeline.tsx:L50 | neighbors=[timeline.tsx]
- "components_timeline_timelineitemprops": "TimelineItemProps" | kind=code-symbol | source=packages/components/timeline.tsx:L48 | neighbors=[timeline.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-030.json

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
