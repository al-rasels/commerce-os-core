# Commerce Engine

## 1. Modules (Phase 1 & Phase 2 Enterprise Scope)

```text
Catalog        [P1] physical, digital, bundle products, categories, variants
Inventory      [P1] basic stock, [P2] multi-location (warehouses/stores), order routing
Cart/Checkout  [P1] B2C cart, checkout session, payment providers
B2B Wholesale  [P2] price lists, company profiles, draft orders, Net-30 payment terms
Subscriptions  [P2] recurring billing native engine, interval schedules
Orders         [P1] order lifecycle, invoices
Returns/RMAs   [P2] return requests, condition grading, restocking
Shipping       [P1] basic rate rules, [P2] carrier integrations & multi-origin
Tax            [P1] rule-based, region-configurable
Promotions     [P1] coupons, discounts, [P2] campaigns
Loyalty/Rewards[P3] point systems, store credit
```

## 2. Checkout Lifecycle (B2C & B2B)

### Standard B2C Flow
```text
Cart → Address → Shipping method → Payment → Review → Place Order
  → Order created (event) → Inventory reserved → Payment captured
  → Invoice generated → Confirmation email
  → Fulfillment
```

### B2B Wholesale Flow (Phase 2)
```text
Draft Order → Approval Workflow → Invoice Issued (Net 30/60 Terms)
  → Inventory Reserved (on draft approval) → Order created
  → Payment Captured (asynchronously against invoice)
```

Checkout is **platform-fixed logic** (customization layer doc) — merchants configure payment providers/shipping rules/tax settings, they never alter the checkout flow itself.

## 3. Inventory Consistency & Multi-Location

Stock reservation occurs on **order placement** (not on cart-add). 
In Phase 2, this expands to **Multi-Location Routing**: Orders are dynamically routed to the `inventory_location` closest to the customer with available `inventory_levels`. 

**Exact implementation (mandatory, no alternate approach):** `.agent/skills/03-stock-reservation-algorithm.md` — atomic conditional UPDATE, not read-then-write.

## 4. Pricing (Multi-Currency & B2B)

Base price + tenant-configured tax rules + active promotions resolved at checkout time, not cached.
- **B2B Price Lists:** Overrides base price for specific `customer_id` via their `company_profile`.
- **Multi-Currency:** If tenant configures multiple currencies, variants use explicit price books or real-time conversion matrices.

## 5. Subscriptions Lifecycle (Phase 2)

Native recurring billing engine (eliminating the need for third-party apps like Recharge).
```text
Subscription Created (from checkout) → Interval triggers (daily/weekly/monthly)
  → Stripe vault token charged → New Child Order generated → Fulfillment
```
Failed charges automatically shift the subscription to `past_due` and trigger Dunning emails.

## 6. Payment & Shipping Providers

Abstracted behind a provider interface (`PaymentProvider.charge()`, `ShippingProvider.getRates()`) so adding Stripe/PayPal/carrier X is a new adapter. Provider credentials are tenant-owned, encrypted.

## 7. Boundary with Business/ERP Engine

Commerce Engine owns transactional order data, subscriptions, and initial RMAs. Business/ERP Engine (warehouses, procurement, accounting) consumes order events but does not own or mutate order records — one-way dependency.
