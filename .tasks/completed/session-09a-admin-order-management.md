# Session 09a — Admin UI: Order Management

## Status: NEXT

## Dependencies

- [x] Session 9 — Cart/Checkout/Orders API (completed — backend in `apps/api`)

## Objective

Build the admin UI pages for order management — list orders, view details, and manage status transitions (fulfill, cancel, refund).

## Deliverables

- [x] Order list page with filters (status, date range, customer)
- [x] Order detail view with line items, customer info, payment status
- [x] Status transition buttons (fulfill, mark shipped, cancel, refund)
- [x] Order timeline/activity log
- [x] Invoice download (basic HTML/PDF placeholder)

## Acceptance Criteria

- [x] Admin can view all orders for their tenant
- [x] Status transitions follow the state machine (no invalid transitions)
- [x] Fulfilling an order updates stock quantities
- [x] Canceling an order releases stock reservations
- [x] Order isolation: tenant A sees only their orders

## Files to Touch

- `apps/admin/src/pages/orders/` — list, detail pages
- `apps/admin/src/components/orders/` — OrderTable, OrderDetail, StatusBadge, Timeline
- `apps/admin/src/lib/api/orders.ts` — API client functions
- `apps/admin/src/lib/api/payments.ts` — refund API client

## Notes

- Order endpoints exist at `/api/orders`
- Payment endpoints exist at `/api/payments`
- Consider adding a confirmation dialog for destructive actions (cancel, refund)
