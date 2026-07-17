# Session 05a — Admin UI: Catalog Management

## Status: NEXT

## Dependencies
- [x] Session 5 — Catalog CRUD API (completed — backend exists in `apps/api`)

## Objective
Build the admin UI pages for product and category management — list, create, edit, and organize products, variants, and categories.

## Deliverables
- [ ] Product list page with pagination, search, and status filters
- [ ] Product create/edit form with all fields (name, description, slug, status)
- [ ] Variant editor sub-form (SKU, price, stock, attributes)
- [ ] Media upload widget (placeholder or Cloudflare R2 integration)
- [ ] Rich-text description editor (Tiptap or similar)
- [ ] Category tree with drag-to-reorder
- [ ] Category create/edit form

## Acceptance Criteria
- [ ] Admin can list, search, and paginate products
- [ ] Admin can create a product with variants in one flow
- [ ] Category tree renders correctly and reorder works
- [ ] Product isolation per tenant: tenant A sees only their products
- [ ] All forms validate and show clear error messages

## Files to Touch
- `apps/admin/src/pages/products/` — list, create, edit pages
- `apps/admin/src/pages/categories/` — tree, create, edit pages
- `apps/admin/src/components/products/` — ProductForm, VariantEditor, MediaUpload
- `apps/admin/src/components/categories/` — CategoryTree, CategoryForm
- `apps/admin/src/lib/api/catalog.ts` — API client functions

## Notes
- Backend CRUD endpoints exist at `/api/products` and `/api/categories`
- Media upload can use a local file input placeholder for Phase 1
- Use shadcn/ui form components for consistency with existing admin scaffold
