# Session 05b — Admin UI: Customer Management

## Status: BACKLOG

## Dependencies
- [x] Customer CRUD API (completed in `apps/api`)

## Objective
Build admin pages for viewing and managing customers — list, detail, order history.

## Deliverables
- [ ] Customer list page with search and filters
- [ ] Customer detail view with contact info and order history
- [ ] Customer create/edit form

## Acceptance Criteria
- [ ] Admin can search customers by name/email
- [ ] Customer detail shows all orders placed by that customer
- [ ] Tenant isolation: tenant A sees only their customers

## Files to Touch
- `apps/admin/src/pages/customers/`
- `apps/admin/src/lib/api/customers.ts`
