# Business / ERP Engine

## 1. Scope Note

Entirely **deferred to Phase 3+** per roadmap — documented here so module boundaries are decided now, preventing Commerce Engine from absorbing ERP concerns prematurely.

## 2. Modules (future)

```
Warehouse management   (locations, transfers, stock audits)
Procurement/Purchasing (suppliers, purchase orders)
Accounting             (expenses, basic ledger, invoicing sync)
POS                    (in-person sales channel, syncs to same order pipeline as online)
CRM/Marketing          (campaigns, segments — P2 partial, full CRM P3)
Reporting              (operational reports beyond basic Commerce analytics)
```

## 3. Boundary Rule

Business/ERP consumes Commerce events (`order.created`, `inventory.low_stock`) — it never writes back into Commerce tables. A purchase order that needs to update stock does so through the Inventory module's public interface, not a direct table write. This keeps Commerce Engine safely extractable to its own service later without ERP coupling breaking.

## 4. POS Special Case

POS is a second sales channel, not a separate order system — POS orders flow through the same `orders` table/checkout event pipeline as online orders, tagged `channel: pos`. This avoids building two divergent order lifecycles.

## 5. Why Deferred

ERP breadth (warehouses, accounting, procurement) is where scope inflates fastest (Doc 3's Volume 11 alone rivals a full ERP product). Building this before Commerce Engine + Experience Engine are proven in production risks the platform never shipping an MVP. Roadmap gates ERP work behind Phase 3.
