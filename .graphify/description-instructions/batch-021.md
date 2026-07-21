# Node Description Batch 22 of 37

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

- "components_richtexteditor_richtexteditorprops": "RichTextEditorProps" | kind=code-symbol | source=apps/admin/src/components/RichTextEditor.tsx:L5 | neighbors=[RichTextEditor.tsx]
- "components_search_bar_searchbarprops": "SearchBarProps" | kind=code-symbol | source=packages/components/search-bar.tsx:L7 | neighbors=[search-bar.tsx]
- "components_section_renderer_localregistry": "localRegistry" | kind=code-symbol | source=apps/storefront/src/components/section-renderer.tsx:L18 | neighbors=[section-renderer.tsx]
- "components_section_renderer_node": "Node" | kind=code-symbol | source=apps/storefront/src/components/section-renderer.tsx:L5 | neighbors=[section-renderer.tsx]
- "components_section_renderer_sectionrendererprops": "SectionRendererProps" | kind=code-symbol | source=apps/storefront/src/components/section-renderer.tsx:L12 | neighbors=[section-renderer.tsx]
- "components_section_schema_propschema": "PropSchema" | kind=code-symbol | source=packages/components/section-schema.ts:L3 | neighbors=[section-schema.ts]
- "components_section_schema_proptype": "PropType" | kind=code-symbol | source=packages/components/section-schema.ts:L1 | neighbors=[section-schema.ts]
- "components_section_schema_sectionschema": "SectionSchema" | kind=code-symbol | source=packages/components/section-schema.ts:L13 | neighbors=[section-schema.ts]
- "components_section_schema_sectionschemas": "sectionSchemas" | kind=code-symbol | source=packages/components/section-schema.ts:L20 | neighbors=[section-schema.ts]
- "components_select_selectprops": "SelectProps" | kind=code-symbol | source=packages/components/select.tsx:L12 | neighbors=[select.tsx]
- "components_sidebar_sidebarprops": "SidebarProps" | kind=code-symbol | source=packages/components/sidebar.tsx:L15 | neighbors=[sidebar.tsx]
- "components_sidebar_spec_items": "items" | kind=code-symbol | source=packages/components/sidebar.spec.tsx:L5 | neighbors=[sidebar.spec.tsx]
- "components_skeleton_skeletonprops": "SkeletonProps" | kind=code-symbol | source=packages/components/skeleton.tsx:L3 | neighbors=[skeleton.tsx]
- "components_tabs_spec_tabs": "tabs" | kind=code-symbol | source=packages/components/tabs.spec.tsx:L5 | neighbors=[tabs.spec.tsx]
- "components_tabs_tabsprops": "TabsProps" | kind=code-symbol | source=packages/components/tabs.tsx:L12 | neighbors=[tabs.tsx]
- "components_tenant_theme_provider_resolvedtheme": "ResolvedTheme" | kind=code-symbol | source=apps/storefront/src/components/tenant-theme-provider.tsx:L5 | neighbors=[tenant-theme-provider.tsx]
- "components_testimonials_stars": "Stars()" | kind=code-symbol | source=packages/components/testimonials.tsx:L8 | neighbors=[testimonials.tsx]
- "components_testimonials_testimonialsprops": "TestimonialsProps" | kind=code-symbol | source=packages/components/testimonials.tsx:L3 | neighbors=[testimonials.tsx]
- "components_textarea_textareaprops": "TextareaProps" | kind=code-symbol | source=packages/components/textarea.tsx:L4 | neighbors=[textarea.tsx]
- "components_toast_bordermap": "borderMap" | kind=code-symbol | source=packages/components/toast.tsx:L27 | neighbors=[toast.tsx]
- "components_toast_iconmap": "iconMap" | kind=code-symbol | source=packages/components/toast.tsx:L20 | neighbors=[toast.tsx]
- "components_toast_toastcontainerprops": "ToastContainerProps" | kind=code-symbol | source=packages/components/toast.tsx:L71 | neighbors=[toast.tsx]
- "components_toast_toastvariant": "ToastVariant" | kind=code-symbol | source=packages/components/toast.tsx:L7 | neighbors=[toast.tsx]
- "components_varianteditor_varianteditor": "VariantEditor()" | kind=code-symbol | source=apps/admin/src/components/VariantEditor.tsx:L64 | neighbors=[VariantEditor.tsx]
- "components_varianteditor_varianteditorprops": "VariantEditorProps" | kind=code-symbol | source=apps/admin/src/components/VariantEditor.tsx:L6 | neighbors=[VariantEditor.tsx]
- "components_varianteditor_variantform": "VariantForm()" | kind=code-symbol | source=apps/admin/src/components/VariantEditor.tsx:L38 | neighbors=[VariantEditor.tsx]
- "components_varianteditor_variantrow": "VariantRow()" | kind=code-symbol | source=apps/admin/src/components/VariantEditor.tsx:L10 | neighbors=[VariantEditor.tsx]
- "components_vitest_config": "vitest.config.ts" | kind=code-symbol | source=packages/components/vitest.config.ts:L1 | neighbors=[3d66d0f feat: implement payments module…]
- "components_vitest_d": "vitest.d.ts" | kind=code-symbol | source=packages/components/vitest.d.ts:L1 | neighbors=[3d66d0f feat: implement payments module…]
- "components_vitest_setup": "vitest.setup.ts" | kind=code-symbol | source=packages/components/vitest.setup.ts:L1 | neighbors=[3d66d0f feat: implement payments module…]
- "contexts_authcontext_authcontext": "AuthContext" | kind=code-symbol | source=apps/admin/src/contexts/AuthContext.tsx:L23 | neighbors=[AuthContext.tsx]
- "contexts_authcontext_authcontexttype": "AuthContextType" | kind=code-symbol | source=apps/admin/src/contexts/AuthContext.tsx:L14 | neighbors=[AuthContext.tsx]
- "contexts_authcontext_authprovider": "AuthProvider()" | kind=code-symbol | source=apps/admin/src/contexts/AuthContext.tsx:L28 | neighbors=[AuthContext.tsx]
- "contexts_authcontext_authuser": "AuthUser" | kind=code-symbol | source=apps/admin/src/contexts/AuthContext.tsx:L3 | neighbors=[AuthContext.tsx]
- "contexts_authcontext_mfastate": "MfaState" | kind=code-symbol | source=apps/admin/src/contexts/AuthContext.tsx:L8 | neighbors=[AuthContext.tsx]
- "contexts_authcontext_useauth": "useAuth()" | kind=code-symbol | source=apps/admin/src/contexts/AuthContext.tsx:L92 | neighbors=[AuthContext.tsx]
- "customer_customer_controller_customercontroller_constructor": ".constructor()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.controller.ts:L22 | neighbors=[CustomerController]
- "customer_customer_controller_customercontroller_create": ".create()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.controller.ts:L26 | neighbors=[CustomerController]
- "customer_customer_controller_customercontroller_get": ".get()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.controller.ts:L48 | neighbors=[CustomerController]
- "customer_customer_controller_customercontroller_list": ".list()" | kind=code-symbol | source=apps/api/src/modules/commerce/customer/customer.controller.ts:L35 | neighbors=[CustomerController]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-021.json

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
