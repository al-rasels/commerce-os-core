# Commerce Engine

## 1. Modules (Phase 1 scope marked)

```
Catalog        [P1] products, categories, brands, attributes, variants
Inventory      [P1] stock levels, basic multi-location (full warehouse mgmt → Business/ERP, Phase 3)
Cart/Checkout  [P1] cart, checkout session, payment provider integration
Orders         [P1] order lifecycle, invoices
Returns/Refunds[P2]
Shipping       [P1] basic rate rules; carrier integrations [P2]
Tax            [P1] rule-based, region-configurable
Promotions     [P2] coupons, discounts, campaigns
Loyalty/Wishlist [P3]
```

## 2. Checkout Lifecycle

```
Cart → Address → Shipping method → Payment → Review → Place Order
  → Order created (event) → Inventory reserved → Payment captured
  → Invoice generated → Confirmation email (notification module)
  → Fulfillment (manual in P1, integrated in P2+)
```

Checkout is **platform-fixed logic** (customization layer doc) — merchants configure payment providers/shipping rules/tax settings, they never alter the checkout flow itself.

## 3. Inventory Consistency

Stock reservation on order placement (not on cart-add) to avoid holding stock hostage from abandoned carts. Reservation TTL + release job for unpaid orders. Oversell prevention via row-level lock or optimistic concurrency check at the `product_variant.stock` decrement — required, not optional, given shared-infra concurrency.

## 4. Pricing

Base price + tenant-configured tax rules + active promotions resolved at checkout time, not cached — pricing must always reflect current rules, unlike theme/template rendering which is cache-friendly.

## 5. Payment & Shipping Providers

Abstracted behind a provider interface (`PaymentProvider.charge()`, `ShippingProvider.getRates()`) so adding Stripe/PayPal/carrier X is a new adapter, not a core checkout change. Provider credentials are tenant-owned, encrypted (security doc §5).

## 6. Boundary with Business/ERP Engine

Commerce Engine owns transactional order data. Business/ERP Engine (warehouses, procurement, accounting) consumes order events but does not own or mutate order records — one-way dependency, enforced by the module-boundary rule in system architecture doc.
