# Node Description Batch 1 of 51

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
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "commit:repo:github.com/al-rasels/commerce-os-core@ac49c08799df2b703aaae37d1e2dcd7f6176e0d9": "ac49c08 chore: batch commit — catalog CRUD, admin UI, auth gaps, storefront car…" | kind=Commit | source=git | neighbors=[3d66d0f feat: implement payments module…, migration.sql, vite.config.ts, catalog.ts, client.ts, customers.ts]
- "commit:repo:github.com/al-rasels/commerce-os-core@6ffba4357dee4c75c72a02e038fb4975a7db5b4f": "6ffba43 feat: add MFA auth flow, super admin tenant management, forgot/reset pa…" | kind=Commit | source=git | neighbors=[page.tsx, admin.controller.ts, admin.service.ts, index.ts, promotions.ts, shipping.ts]
- "commit:repo:github.com/al-rasels/commerce-os-core@3d66d0f1865f1e7fc65ca88b33dc1d88ed3a6442": "3d66d0f feat: implement payments module, checkout flow, auth, tenant resolution…" | kind=Commit | source=git | neighbors=[migration.sql, vite.config.ts, audit-log.controller.ts, audit-log.module.ts, audit-log.repository.ts, audit-log.service.ts]
- "commit:repo:github.com/al-rasels/commerce-os-core@efe67e9d50a8fbac2ed7c29af3f69284a974d85d": "efe67e9 fix(build): resolve component typings and next 15 draftMode async error" | kind=Commit | source=git | neighbors=[d0fde76 docs: Added full project task s…, fix-hasfeature.js, fix-hasfeature2.js, fix-imports.js, fix-theme.js, home-client.tsx]
- "api_index": "index.ts" | kind=code-symbol | source=apps/admin/src/lib/api/index.ts:L1 | neighbors=[b2b.ts, b2bApi, CompanyProfile, CompanyProfileInput, catalog.ts, catalogApi]
- "components_index": "index.ts" | kind=code-symbol | source=packages/components/index.ts:L1 | neighbors=[layout.tsx, 028709f chore: scaffold monorepo with a…, 3d66d0f feat: implement payments module…, 6ffba43 feat: add MFA auth flow, super …, ac49c08 chore: batch commit — catalog C…, e5d6c72 feat: implement end-to-end chec…]
- "components_registry": "registry.ts" | kind=code-symbol | source=packages/components/registry.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, 3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…, efe67e9 fix(build): resolve component t…, index.ts, banner.tsx]
- "tenant_tenant_context": "tenant-context.ts" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-context.ts:L1 | neighbors=[audit-log.controller.ts, audit-log.service.ts, auth.controller.ts, auth.service.ts, auth.service.spec.ts, b2b.controller.ts]
- "tenant_tenant_context_tenantcontext": "TenantContext" | kind=code-symbol | source=apps/api/src/modules/platform/tenant/tenant-context.ts:L1 | neighbors=[audit-log.controller.ts, audit-log.service.ts, auth.controller.ts, auth.service.ts, auth.service.spec.ts, b2b.controller.ts]
- "commit:repo:github.com/al-rasels/commerce-os-core@3571d3a10585758e3f4325a08c70c95f1796cac5": "3571d3a feat(storefront): overhaul UI/UX for all core routes (M7, M8)" | kind=Commit | source=git | neighbors=[page.tsx, admin.controller.ts, admin.module.ts, admin.service.ts, home-client.tsx, layout.tsx]
- "components_utils": "utils.ts" | kind=code-symbol | source=packages/components/utils.ts:L1 | neighbors=[028709f chore: scaffold monorepo with a…, alert.tsx, alert-dialog.tsx, avatar.tsx, badge.tsx, banner.tsx]
- "components_utils_cn": "cn()" | kind=code-symbol | source=packages/components/utils.ts:L4 | neighbors=[alert.tsx, alert-dialog.tsx, avatar.tsx, badge.tsx, banner.tsx, breadcrumb.tsx]
- "references_utility_types": "utility-types.ts" | kind=code-symbol | source=.agents/skills/typescript-expert/references/utility-types.ts:L1 | neighbors=[21888ff feat: implement commerce, catal…, Arguments, AssertEqual, assertNever(), AsyncFunction, AtLeast]
- "commit:repo:github.com/al-rasels/commerce-os-core@21888ffb23779b07f32963183c44ce6370a86d5d": "21888ff feat: implement commerce, catalog, and experience modules while expandi…" | kind=Commit | source=git | neighbors=[028709f chore: scaffold monorepo with a…, auth.controller.ts, auth.module.ts, auth.service.ts, feat/admin-ui-refactor, main]
- "branch:repo:github.com/al-rasels/commerce-os-core#feat/admin-ui-refactor": "feat/admin-ui-refactor" | kind=Branch | source=git | neighbors=[028709f chore: scaffold monorepo with a…, 0361288 feat(admin): Scaffolded Phase 2…, 05b237f feat(admin): Implemented Page B…, 16cea38 feat(api): Implemented Meilisea…, 20e2f86 fix(storefront): resolve import…, 21888ff feat: implement commerce, catal…]
- "commit:repo:github.com/al-rasels/commerce-os-core@7d74efe396e95f39b8ad61eaada09b3f8e6eb452": "7d74efe feat(commerce): implement B2B, Subscriptions, Returns UI and Backend Sc…" | kind=Commit | source=git | neighbors=[4ece707 feat(admin): port UI components…, catalog.ts, pages.ts, auth.controller.spec.ts, auth.service.ts, auth.service.spec.ts]
- "commit:repo:github.com/al-rasels/commerce-os-core@6eb89d7d3697f105f52053849212b47f1aa316f8": "6eb89d7 chore(tech-debt): resolve technical debt, fix typings, enforce strict t…" | kind=Commit | source=git | neighbors=[auth.controller.ts, auth.controller.spec.ts, auth.module.ts, auth.service.ts, auth.service.spec.ts, feat/admin-ui-refactor]
- "branch:repo:github.com/al-rasels/commerce-os-core#main": "main" | kind=Branch | source=git | neighbors=[028709f chore: scaffold monorepo with a…, 21888ff feat: implement commerce, catal…, 24a34d0 docs: initialize enterprise pla…, 3571d3a feat(storefront): overhaul UI/U…, 39bac8e docs: initialize architecture, …, 3d66d0f feat: implement payments module…]
- "lib_api": "api.ts" | kind=code-symbol | source=apps/storefront/src/lib/api.ts:L1 | neighbors=[page.tsx, page.tsx, cart-drawer.tsx, page.tsx, page.tsx, page.tsx]
- "commit:repo:github.com/al-rasels/commerce-os-core@e3a8c77a0e8702387103364fc8773c8e59cb25a8": "e3a8c77 feat: implement users CRUD backend module and admin UI" | kind=Commit | source=git | neighbors=[ac49c08 chore: batch commit — catalog C…, users.ts, auth.controller.ts, auth.service.ts, feat/admin-ui-refactor, main]
- "commit:repo:github.com/al-rasels/commerce-os-core@e5d6c724c32e3c305599ceda1b8b63aaf35c4ec4": "e5d6c72 feat: implement end-to-end checkout flow including UI components, API r…" | kind=Commit | source=git | neighbors=[92e2c6a feat: add checkout tenant isola…, layout.tsx, page.tsx, feat/admin-ui-refactor, main, page.tsx]
- "ui_sidebar": "sidebar.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/sidebar.tsx:L1 | neighbors=[4ece707 feat(admin): port UI components…, Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter()]
- "components_combobox": "combobox.tsx" | kind=code-symbol | source=packages/components/combobox.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, button.tsx, Button(), ComboboxChip(), ComboboxChips(), ComboboxChipsInput()]
- "commit:repo:github.com/al-rasels/commerce-os-core@028709f854a3575703e15665786345cd1245396c": "028709f chore: scaffold monorepo with apps, shared packages, and agent-driven d…" | kind=Commit | source=git | neighbors=[vite.config.ts, eslint.config.mjs, layout.tsx, page.tsx, feat/admin-ui-refactor, main]
- "ui_button": "button.tsx" | kind=code-symbol | source=apps/storefront/src/components/ui/button.tsx:L1 | neighbors=[page.tsx, page.tsx, page.tsx, page.tsx, 3d66d0f feat: implement payments module…, ac49c08 chore: batch commit — catalog C…]
- "20260716164323_init_migration": "migration.sql" | kind=code-symbol | source=apps/api/prisma/migrations/20260716164323_init/migration.sql:L1 | neighbors=[audit_log, cart_items, carts, categories, countries, currencies]
- "app_layout": "layout.tsx" | kind=code-symbol | source=apps/storefront/src/app/layout.tsx:L1 | neighbors=[footerColumns, geistMono, geistSans, metadata, RootLayout(), cart-badge.tsx]
- "components_timeline": "timeline.tsx" | kind=code-symbol | source=packages/components/timeline.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, index.ts, Timeline, TimelineContent, TimelineContentProps, timelineContentVariants]
- "catalog_catalog_service_catalogservice": "CatalogService" | kind=code-symbol | source=apps/api/src/modules/commerce/catalog/catalog.service.ts:L20 | neighbors=[catalog.service.ts, .confirmReservation(), .constructor(), .createCategory(), .createProduct(), .createVariant()]
- "components_command": "command.tsx" | kind=code-symbol | source=packages/components/command.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput()]
- "api_client": "client.ts" | kind=code-symbol | source=apps/admin/src/lib/api/client.ts:L1 | neighbors=[b2b.ts, catalog.ts, api, ApiError, getToken(), request()]
- "commit:repo:github.com/al-rasels/commerce-os-core@bb61ae850fbf9cb9b711e06efbbf4849ae5b057d": "bb61ae8 feat(commerce): wire up Admin UI to new Enterprise APIs (Wave 2)" | kind=Commit | source=git | neighbors=[7d74efe feat(commerce): implement B2B, …, b2b.ts, index.ts, inventory.ts, returns.ts, subscriptions.ts]
- "commit:repo:github.com/al-rasels/commerce-os-core@c506b3c71416e248e8b5d61fe33002c79d425569": "c506b3c feat(api): implement database repositories for enterprise modules (Wave…" | kind=Commit | source=git | neighbors=[20e2f86 fix(storefront): resolve import…, b2b.controller.ts, b2b.module.ts, b2b.service.ts, feat/admin-ui-refactor, bdd391f feat(admin): fix ts errors in P…]
- "lib_utils": "utils.ts" | kind=code-symbol | source=apps/storefront/src/lib/utils.ts:L1 | neighbors=[3d66d0f feat: implement payments module…, cn(), accordion.tsx, badge.tsx, button.tsx, card.tsx]
- "ui_timeline": "timeline.tsx" | kind=code-symbol | source=apps/admin/src/components/ui/timeline.tsx:L1 | neighbors=[4ece707 feat(admin): port UI components…, Timeline, TimelineContent, TimelineContentProps, timelineContentVariants, TimelineDot]
- "checkout_page": "page.tsx" | kind=code-symbol | source=apps/storefront/src/app/checkout/page.tsx:L1 | neighbors=[CheckoutPage(), PaymentForm(), stripePromise, api.ts, api, store.ts]
- "commit:repo:github.com/al-rasels/commerce-os-core@f1bfa474161dc672eb25d655e4296b1f2cf8a8d2": "f1bfa47 feat: implement storefront order retrieval, status management, and admi…" | kind=Commit | source=git | neighbors=[6eb89d7 chore(tech-debt): resolve techn…, orders.ts, feat/admin-ui-refactor, main, cart-drawer.tsx, page.tsx]
- "components_input_group": "input-group.tsx" | kind=code-symbol | source=packages/components/input-group.tsx:L1 | neighbors=[efe67e9 fix(build): resolve component t…, combobox.tsx, command.tsx, index.ts, button.tsx, Button()]
- "lib_api_api": "api" | kind=code-symbol | source=apps/storefront/src/lib/api.ts:L46 | neighbors=[page.tsx, page.tsx, cart-drawer.tsx, page.tsx, page.tsx, page.tsx]
- "lib_utils_cn": "cn()" | kind=code-symbol | source=apps/storefront/src/lib/utils.ts:L4 | neighbors=[utils.ts, accordion.tsx, badge.tsx, button.tsx, card.tsx, carousel.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: D:\Rasel Mahmud Shanto\commerce-os-core\.graphify\description-instructions\batch-000.json

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
