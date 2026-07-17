# Phase 1 Entity Contracts (SOURCE OF TRUTH — do not invent fields)

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
tenant_id      UUID FK -> tenants.id, NULLABLE  -- NULL = platform-level (super admin/support)
email          TEXT NOT NULL
password_hash  TEXT NOT NULL
role_id        UUID FK -> roles.id
created_at     TIMESTAMPTZ
UNIQUE(tenant_id, email)
```

## roles
```
id            UUID PK
tenant_id     UUID FK -> tenants.id, NULLABLE  -- NULL = platform-level role
name          TEXT NOT NULL   -- 'super_admin' | 'store_owner' | 'store_staff' | 'customer' (Phase 1 set)
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
price_cents        INT NOT NULL       -- always store money as integer cents, never float
currency           TEXT NOT NULL      -- ISO 4217
stock_available    INT NOT NULL DEFAULT 0
stock_reserved     INT NOT NULL DEFAULT 0
attributes_json    JSONB              -- e.g. {"size":"M","color":"blue"}
UNIQUE(tenant_id, sku)
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

## customers
```
id            UUID PK
tenant_id     UUID FK -> tenants.id
email         TEXT NOT NULL
first_name    TEXT
last_name     TEXT
created_at    TIMESTAMPTZ
UNIQUE(tenant_id, email)
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
status            TEXT NOT NULL DEFAULT 'pending'  -- 'pending'|'paid'|'fulfilled'|'cancelled'|'refunded'
subtotal_cents    INT NOT NULL
tax_cents         INT NOT NULL
shipping_cents    INT NOT NULL
total_cents       INT NOT NULL
currency          TEXT NOT NULL
channel           TEXT NOT NULL DEFAULT 'online'   -- 'online' | 'pos' (Phase 3+)
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

## stock_reservations
See `.agent/skills/03-stock-reservation-algorithm.md` §1 for exact schema.

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
sections_json   JSONB NOT NULL      -- { sections: [{ id, component, variant, props, visible }] }
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
