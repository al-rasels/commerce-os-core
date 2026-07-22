# Phase 2 — Storefront Depth

## Goal
Expand the Phase 1 MVP into a robust, high-performance storefront platform. This phase adds a visual Drag-and-Drop Page Builder, background processing queues, full-text search, and promotions.

## Core Tasks

### Epic 1: Advanced Experience Engine (Page Builder)
- [ ] Research `dnd-kit` vs `react-beautiful-dnd` for the nested recursive component tree structure.
- [ ] Implement `apps/admin/src/pages/builder/PageBuilder.tsx` drag-and-drop canvas.
- [ ] Implement `PropertyPanel.tsx` with dynamic schema-driven form generation based on `PropSchema`.
- [ ] Implement Data Binding Panel UI to allow merchants to map `{ "$bind": "product.title" }`.
- [ ] Implement Responsive Breakpoint Editor UI for per-breakpoint styling overrides.
- [ ] Implement Real-Time Preview Staging (evaluate against staging tenant context, bypass production cache).
- [ ] Add 30+ new UI components to the `@commerceos/components` library.

### Epic 2: Infrastructure & Performance
- [ ] Setup Redis-backed BullMQ queue workers in `apps/api/src/modules/platform/queue`.
- [ ] Define job interfaces with mandatory `tenantId` field to maintain isolation.
- [ ] Implement Search Engine (Meilisearch or Elasticsearch) module in `apps/api/src/modules/commerce/search`.
- [ ] Create sync workers to index Products, Categories, and Pages upon creation/update.
- [ ] Setup Storefront Image Optimization (`next/image` with custom CDN loader).

### Epic 3: Expanded Commerce Features
- [ ] Design Prisma schema for `Promotion` and `Coupon` (must be tenant-scoped).
- [ ] Implement Promotions module REST API (`create`, `update`, `validate`).
- [ ] Hook Promotions engine into the Checkout State machine.
- [ ] Implement Multiple Themes support in `packages/theme-engine` (foundation for template marketplace).

## Exit Criteria
- A merchant can use the visual Drag-and-Drop editor to build a fully custom nested layout.
- Products can be searched via a dedicated search index (not just basic Postgres ILIKE).
- Heavy tasks (like mass-emailing customers or bulk-importing products) run asynchronously in a queue without blocking the API.
- All code strictly adheres to `07-agent-guide/01-agent-guide.md` and Tenant Isolation rules.
