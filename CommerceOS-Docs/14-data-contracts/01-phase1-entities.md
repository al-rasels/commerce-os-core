# Master Entity Contracts (Phase 1 MVP & Phase 2 Enterprise Parity)

Any field, table, or relation not listed here does not exist yet. If a task needs one, add it here first, in the same session, then implement — never implement a field only in code without recording it here.

## tenants
```
id            UUID PK
name          TEXT NOT NULL
plan_id       TEXT NOT NULL DEFAULT 'trial'
status        TEXT NOT NULL DEFAULT 'active'   -- 'active' | 'suspended' | 'offboarding'
created_at    TIMESTAMPTZ
```

## tenant_domains
```
id            UUID PK
tenant_id     UUID FK -> tenants.id
domain        TEXT UNIQUE NOT NULL
is_primary    BOOLEAN DEFAULT true
```

## users
```
id             UUID PK
tenant_id      UUID FK -> tenants.id, NULLABLE  -- NULL = platform-level
email          TEXT NOT NULL
password_hash  TEXT NOT NULL
role_id        UUID FK -> roles.id
status         TEXT NOT NULL DEFAULT 'active'   -- 'active' | 'pending' | 'suspended'
mfa_secret     TEXT NULLABLE
mfa_enabled    BOOLEAN DEFAULT false
created_at     TIMESTAMPTZ
UNIQUE(tenant_id, email)
```

## roles
```
id            UUID PK
tenant_id     UUID FK -> tenants.id, NULLABLE
name          TEXT NOT NULL   -- 'super_admin' | 'store_owner' | 'store_staff' | 'customer'
```

## feature_flags
```
id            UUID PK
tenant_id     UUID FK -> tenants.id
flag_key      TEXT NOT NULL   -- dot-namespaced, e.g. 'inventory.advanced'
enabled       BOOLEAN NOT NULL DEFAULT false
UNIQUE(tenant_id, flag_key)
```

## products
```
id            UUID PK
tenant_id     UUID FK -> tenants.id
name          TEXT NOT NULL
slug          TEXT NOT NULL
product_type  TEXT NOT NULL DEFAULT 'physical' -- 'physical' | 'digital' | 'bundle'
status        TEXT NOT NULL DEFAULT 'draft'   -- 'draft' | 'active' | 'archived'
category_id   UUID FK -> categories.id, NULLABLE
description   TEXT                         -- rich text description (HTML from editor)
created_at    TIMESTAMPTZ
updated_at    TIMESTAMPTZ
deleted_at    TIMESTAMPTZ NULLABLE
metafields_json JSONB DEFAULT '{}'      -- for third-party app extensibility
UNIQUE(tenant_id, slug)
```

## product_variants
```
id                 UUID PK
tenant_id          UUID FK -> tenants.id
product_id         UUID FK -> products.id
sku                TEXT NOT NULL
price_cents        INT NOT NULL       -- always store money as integer cents
currency           TEXT NOT NULL      -- ISO 4217
stock_available    INT NOT NULL DEFAULT 0
stock_reserved     INT NOT NULL DEFAULT 0
attributes_json    JSONB              -- e.g. {"size":"M","color":"blue"}
UNIQUE(tenant_id, sku)
```

## product_bundle_items (Phase 1)
```
id                 UUID PK
tenant_id          UUID FK -> tenants.id
parent_variant_id  UUID FK -> product_variants.id
child_variant_id   UUID FK -> product_variants.id
quantity           INT NOT NULL DEFAULT 1
UNIQUE(parent_variant_id, child_variant_id)
```

## categories
```
id            UUID PK
tenant_id     UUID FK -> tenants.id
name          TEXT NOT NULL
slug          TEXT NOT NULL
parent_id     UUID FK -> categories.id, NULLABLE
sort_order    INT NOT NULL DEFAULT 0        -- for drag-to-reorder in admin
UNIQUE(tenant_id, slug)
```

## customers (Expanded for B2B)
```
id            UUID PK
tenant_id     UUID FK -> tenants.id
email         TEXT NOT NULL
first_name    TEXT
last_name     TEXT
company_id    UUID FK -> company_profiles.id, NULLABLE -- For B2B
price_list_id UUID FK -> price_lists.id, NULLABLE      -- B2B custom pricing
created_at    TIMESTAMPTZ
UNIQUE(tenant_id, email)
```

## company_profiles (Phase 2 - B2B Wholesale)
```
id            UUID PK
tenant_id     UUID FK -> tenants.id
name          TEXT NOT NULL
tax_id        TEXT NULLABLE
payment_terms TEXT NOT NULL DEFAULT 'due_on_receipt' -- 'net_15', 'net_30', 'net_60'
credit_limit_cents INT NULLABLE
```

## price_lists (Phase 2 - B2B Wholesale)
```
id            UUID PK
tenant_id     UUID FK -> tenants.id
name          TEXT NOT NULL
currency      TEXT NOT NULL
rules_json    JSONB NOT NULL -- Discounts applied to specific categories/variants
```

## carts
```
id             UUID PK
tenant_id      UUID FK -> tenants.id
customer_id    UUID FK -> customers.id, NULLABLE   -- NULL = guest/session cart
session_id     TEXT NULLABLE                        -- for guest carts
status         TEXT NOT NULL DEFAULT 'open'         -- 'open' | 'converted' | 'abandoned'
created_at     TIMESTAMPTZ
```

## cart_items
```
id            UUID PK
tenant_id     UUID FK -> tenants.id
cart_id       UUID FK -> carts.id
variant_id    UUID FK -> product_variants.id
quantity      INT NOT NULL
```

## orders
```
id                UUID PK
tenant_id         UUID FK -> tenants.id
customer_id       UUID FK -> customers.id
status            TEXT NOT NULL DEFAULT 'pending'  -- 'pending'|'paid'|'fulfilled'|'cancelled'|'refunded'|'partially_refunded'
subtotal_cents    INT NOT NULL
tax_cents         INT NOT NULL
shipping_cents    INT NOT NULL
total_cents       INT NOT NULL
currency          TEXT NOT NULL
channel           TEXT NOT NULL DEFAULT 'online'   -- 'online' | 'pos' | 'draft_b2b'
created_at        TIMESTAMPTZ
metafields_json   JSONB DEFAULT '{}'
```

## order_items
```
id               UUID PK
tenant_id        UUID FK -> tenants.id
order_id         UUID FK -> orders.id
variant_id       UUID FK -> product_variants.id
quantity         INT NOT NULL
unit_price_cents INT NOT NULL
```

## subscriptions (Phase 2 - Recurring Revenue natively built into Core)
```
id                UUID PK
tenant_id         UUID FK -> tenants.id
customer_id       UUID FK -> customers.id
order_id          UUID FK -> orders.id -- Original order
status            TEXT NOT NULL DEFAULT 'active' -- 'active'|'paused'|'cancelled'|'past_due'
interval          TEXT NOT NULL -- 'daily'|'weekly'|'monthly'|'yearly'
interval_count    INT NOT NULL DEFAULT 1
next_billing_at   TIMESTAMPTZ NOT NULL
```

## return_requests (Phase 2 - RMA Native)
```
id                UUID PK
tenant_id         UUID FK -> tenants.id
order_id          UUID FK -> orders.id
status            TEXT NOT NULL DEFAULT 'pending' -- 'pending'|'approved'|'rejected'|'received'|'refunded'
reason            TEXT NOT NULL
created_at        TIMESTAMPTZ
```

## inventory_locations (Phase 2 - Multi-Location)
```
id            UUID PK
tenant_id     UUID FK -> tenants.id
name          TEXT NOT NULL
is_default    BOOLEAN DEFAULT false
address_json  JSONB NOT NULL
```

## inventory_levels (Phase 2 - Replaces simple stock_available)
```
id            UUID PK
tenant_id     UUID FK -> tenants.id
location_id   UUID FK -> inventory_locations.id
variant_id    UUID FK -> product_variants.id
stock_available INT NOT NULL DEFAULT 0
UNIQUE(location_id, variant_id)
```

## stock_reservations
See `.agent/skills/03-stock-reservation-algorithm.md` §1 for exact schema. (Phase 2: Will add `location_id` FK).

## theme_base
```
id            UUID PK
version       TEXT NOT NULL
tokens_json   JSONB NOT NULL
```
No `tenant_id` — platform-owned, `@Global()`.

## theme_tenant_override
```
tenant_id       UUID PK, FK -> tenants.id
theme_base_id   UUID FK -> theme_base.id
overrides_json  JSONB NOT NULL DEFAULT '{}'
updated_at      TIMESTAMPTZ
```

## template_base / template_tenant_override
Same shape as theme_base/theme_tenant_override, substitute `layout_json` for `tokens_json`/`overrides_json` content (see `05-experience-engine/04-template-engine.md` §5).

## page_layouts
```
tenant_id       UUID, FK -> tenants.id
page_key        TEXT NOT NULL       -- 'homepage' | 'category' | 'product' | 'checkout'
sections_json   JSONB NOT NULL      -- { sections: [{ id, component, variant, props, visible, rules }] }
published_at    TIMESTAMPTZ NULLABLE
PRIMARY KEY (tenant_id, page_key)
```

## audit_log
```
id            UUID PK
tenant_id     UUID FK -> tenants.id, NULLABLE  -- NULL for platform-level actions
actor_id      UUID FK -> users.id
action        TEXT NOT NULL
entity        TEXT NOT NULL
entity_id     UUID
diff_json     JSONB
created_at    TIMESTAMPTZ
```

## shipping_rules
```
id            UUID PK
tenant_id     UUID FK -> tenants.id
name          TEXT NOT NULL
type          TEXT NOT NULL   -- 'flat_rate' | 'weight_tier' | 'carrier_calculated'
config        JSONB NOT NULL
is_active     BOOLEAN NOT NULL DEFAULT true
created_at    TIMESTAMPTZ
updated_at    TIMESTAMPTZ
```

## tax_rules
```
id            UUID PK
tenant_id     UUID FK -> tenants.id
name          TEXT NOT NULL
type          TEXT NOT NULL   -- 'flat' | 'region'
rate          FLOAT NOT NULL  -- Percentage (e.g. 10.5 for 10.5%)
region        TEXT NULLABLE   -- e.g. 'US-CA', 'UK'
is_active     BOOLEAN NOT NULL DEFAULT true
created_at    TIMESTAMPTZ
updated_at    TIMESTAMPTZ
```

## promotions
```
id            UUID PK
tenant_id     UUID FK -> tenants.id
code          TEXT UNIQUE NOT NULL
type          TEXT NOT NULL   -- 'percentage' | 'fixed_amount' | 'bogo' | 'free_shipping'
value         FLOAT NOT NULL
min_order     FLOAT NULLABLE
max_uses      INT NULLABLE
uses          INT NOT NULL DEFAULT 0
expires_at    TIMESTAMPTZ NULLABLE
is_active     BOOLEAN NOT NULL DEFAULT true
created_at    TIMESTAMPTZ
updated_at    TIMESTAMPTZ
UNIQUE(tenant_id, code)
```

## Global/Reference Tables (no tenant_id — `@Global()`)

```
countries (id, code, name)
currencies (id, code, symbol, decimal_places)
plans (id, name, default_flags_json, price_cents)
```

## Field Type Conventions (apply to every table above)

- IDs: UUID, never auto-increment int
- Money: always `_cents` suffix, always INT, never FLOAT/DECIMAL for currency math in application code
- Timestamps: always TIMESTAMPTZ, always UTC
- Enums stored as TEXT with an explicit allowed-value comment, not a Postgres native ENUM (easier migration/extension in Phase 1)
