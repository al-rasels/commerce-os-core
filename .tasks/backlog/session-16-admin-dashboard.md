# Session 16 — Admin Dashboard

## Status: BACKLOG

## Dependencies
- [x] All commerce backend modules exist (orders, customers, products)

## Objective
Build the admin dashboard with key metrics, charts, and recent activity for store operators.

## Deliverables
- [ ] Dashboard page with metric cards:
  - [ ] Total revenue (today, this week, this month)
  - [ ] Order count (pending, processing, completed)
  - [ ] New customers
  - [ ] Low-stock products warning
- [ ] Revenue chart (line/bar, filterable by period)
- [ ] Recent orders list (last 10, quick status update)
- [ ] Top-selling products list
- [ ] Quick action buttons (new product, view orders)

## Acceptance Criteria
- [ ] Dashboard loads with real data from API
- [ ] Revenue chart renders correctly for selected period
- [ ] Low-stock warning appears when stock < threshold
- [ ] Metrics are tenant-scoped
- [ ] Dashboard is performant (<1s load time)

## Files to Touch
- `apps/admin/src/pages/dashboard.tsx` — dashboard page
- `apps/admin/src/components/dashboard/` — MetricCard, RevenueChart, RecentOrders, TopProducts
- `apps/api/src/modules/commerce/dashboard/` — dashboard aggregation endpoints (new)

## Notes
- Use Recharts or similar for charts
- API endpoints aggregate data (revenue from orders, counts from customers/products)
- For Phase 1, keep it simple — no real-time updates or WebSocket
