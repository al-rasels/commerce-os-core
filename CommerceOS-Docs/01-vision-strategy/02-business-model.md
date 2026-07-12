# Business Model

## Revenue Streams

1. **Subscription tiers** (Starter / Growth / Enterprise) — gated by feature flags, not code forks
2. **Transaction fees** on payment processing (optional, tier-dependent)
3. **Marketplace commission** — templates, plugins, apps (Phase 4+)
4. **White-label / Enterprise licensing** — dedicated infra tier for large tenants

## Plan → Feature Flag Mapping (mechanism)

Every tenant has a `plan_id`. Plans map to a set of `feature_flags` stored per-tenant (not per-plan globally, so overrides/promos are possible):

```
tenant.plan_id → default_flags(plan) → tenant.flag_overrides → effective_flags
```

Effective flags are resolved once per request in the Tenant Context middleware and cached (`tenantId:flags`). Every module checks `context.hasFeature('inventory.advanced')` — never a raw plan string comparison. This keeps plan logic out of business modules entirely.

## Tenant Lifecycle

```
Signup → Provisioning → Trial → Active (paid) → 
  ├── Upgrade/Downgrade (flag recompute)
  ├── Suspended (payment failure — read-only storefront)
  └── Offboarded (data export → soft delete → hard delete after retention window)
```

## Billing Boundary

Billing/subscriptions live entirely in the **Platform Engine**. No Commerce or Business module ever reads billing state directly — they only read resolved feature flags. This prevents billing logic leaking into commerce code paths.

## Competitive Positioning Summary

CommerceOS competes on **design system depth + native ERP**, not on marketplace breadth (that comes later). Phase 1 should not attempt to match Shopify's app ecosystem — it should win on merchants who need more storefront control and more back-office depth than Shopify natively offers.
