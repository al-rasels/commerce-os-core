# Feature 6.3 — Promotions, Shipping & Tax Expansion

## 1. Promotions Engine

### Endpoints

| Method   | Path                          | Auth     | Description                       |
| -------- | ----------------------------- | -------- | --------------------------------- |
| `POST`   | `/api/v1/promotions`          | Admin    | Create promotion                  |
| `PUT`    | `/api/v1/promotions/:id`      | Admin    | Update promotion                  |
| `DELETE` | `/api/v1/promotions/:id`      | Admin    | Delete promotion                  |
| `GET`    | `/api/v1/promotions`          | Admin    | List promotions                   |
| `GET`    | `/api/v1/promotions/:id`      | Admin    | Get promotion by id               |
| `POST`   | `/api/v1/promotions/validate` | Customer | Validate code and return discount |

### Expanded Schema

```prisma
model Promotion {
  id              String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  tenant_id       String   @db.Uuid
  code            String
  type            String   // percentage | fixed_amount | free_shipping | buy_x_get_y
  value           Float    // percentage (10 = 10%) or amount in cents
  min_order_cents Int?     @map("min_order_cents")
  max_discount_cents Int?  @map("max_discount_cents")
  usage_limit     Int?     @map("usage_limit")
  used_count      Int      @default(0) @map("used_count")
  usage_per_customer Int?  @default(1) @map("usage_per_customer")
  applies_to      String?  // all | category | product | customer_group
  applies_ids     String[]? // UUIDs of products/categories
  starts_at       DateTime? @db.Timestamptz(6) @map("starts_at")
  expires_at      DateTime? @db.Timestamptz(6) @map("expires_at")
  is_active       Boolean  @default(true)
  created_at      DateTime @default(now()) @db.Timestamptz(6) @map("created_at")
  updated_at      DateTime @updatedAt @db.Timestamptz(6) @map("updated_at")
  tenant          Tenant   @relation(fields: [tenant_id], references: [id], onDelete: Cascade)

  @@index([tenant_id, code])
  @@map("promotions")
}
```

### Validation

```typescript
// src/modules/promotions/promotions.service.ts
async validate(
  ctx: TenantContext,
  code: string,
  cart: Cart & { items: CartItem[] },
): Promise<{ valid: boolean; discount?: DiscountResult; error?: string }> {
  const promo = await this.prisma.promotion.findFirst({
    where: { tenant_id: ctx.tenantId, code, is_active: true },
  });
  if (!promo) return { valid: false, error: 'Invalid code' };

  // Expiry check
  if (promo.expires_at && promo.expires_at < new Date()) {
    return { valid: false, error: 'Promotion expired' };
  }
  if (promo.starts_at && promo.starts_at > new Date()) {
    return { valid: false, error: 'Promotion not yet active' };
  }

  // Usage limit
  if (promo.usage_limit && promo.used_count >= promo.usage_limit) {
    return { valid: false, error: 'Promotion usage limit reached' };
  }

  // Min order
  if (promo.min_order_cents && cart.items.length > 0) {
    const subtotal = cart.items.reduce(
      (sum, i) => sum + i.variant.price_cents * i.quantity, 0,
    );
    if (subtotal < promo.min_order_cents) {
      return {
        valid: false,
        error: `Minimum order of ${promo.min_order_cents / 100} required`,
      };
    }
  }

  // Calculate discount
  const discount = this.calculateDiscount(promo, cart);
  return { valid: true, discount };
}

private calculateDiscount(
  promo: Promotion,
  cart: Cart & { items: CartItem[] },
): DiscountResult {
  const eligibleItems = this.getEligibleItems(promo, cart.items);
  const subtotal = eligibleItems.reduce(
    (sum, i) => sum + i.variant.price_cents * i.quantity, 0,
  );

  let amount = 0;
  switch (promo.type) {
    case 'percentage':
      amount = Math.round(subtotal * (promo.value / 100));
      if (promo.max_discount_cents) {
        amount = Math.min(amount, promo.max_discount_cents);
      }
      break;
    case 'fixed_amount':
      amount = promo.value; // already in cents
      break;
    case 'free_shipping':
      return { type: 'free_shipping', amount: 0 };
  }

  return { type: 'discount', amount };
}
```

---

## 2. Shipping Engine

### Endpoints

| Method   | Path                         | Auth     | Description              |
| -------- | ---------------------------- | -------- | ------------------------ |
| `POST`   | `/api/v1/shipping-rules`     | Admin    | Create rule              |
| `PUT`    | `/api/v1/shipping-rules/:id` | Admin    | Update rule              |
| `DELETE` | `/api/v1/shipping-rules/:id` | Admin    | Delete rule              |
| `GET`    | `/api/v1/shipping-rules`     | Admin    | List rules               |
| `POST`   | `/api/v1/shipping/rates`     | Customer | Calculate rates for cart |

### Expanded Schema

```prisma
model ShippingRule {
  id              String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  tenant_id       String   @db.Uuid
  name            String
  type            String   // flat_rate | free | tiered | weight_based | pickup
  base_rate_cents Int?     @map("base_rate_cents")
  free_above_cents Int?    @map("free_above_cents")
  zones           Json?    @default("[]") // [{ region, rate_cents }]
  weight_rates    Json?    @default("[]") // [{ max_grams, rate_cents }]
  tier_rates      Json?    @default("[]") // [{ min_cents, max_cents?, rate_cents }]
  estimated_days  String?  // "3-5 business days"
  is_active       Boolean  @default(true)
  sort_order      Int      @default(0)
  created_at      DateTime @default(now()) @db.Timestamptz(6) @map("created_at")
  updated_at      DateTime @updatedAt @db.Timestamptz(6) @map("updated_at")
  tenant          Tenant   @relation(fields: [tenant_id], references: [id], onDelete: Cascade)

  @@index([tenant_id])
  @@map("shipping_rules")
}
```

### Rate Calculation

```typescript
// src/modules/shipping/shipping.service.ts
async calculateRates(
  ctx: TenantContext,
  input: {
    cartSubtotalCents: number;
    weightGrams?: number;
    destinationRegion?: string;
  },
): Promise<ShippingRate[]> {
  const rules = await this.prisma.shippingRule.findMany({
    where: { tenant_id: ctx.tenantId, is_active: true },
    orderBy: { sort_order: 'asc' },
  });

  return rules.map(rule => {
    switch (rule.type) {
      case 'free':
        return { ruleId: rule.id, name: rule.name, amountCents: 0, estimatedDays: rule.estimated_days };

      case 'flat_rate':
        return { ruleId: rule.id, name: rule.name, amountCents: rule.base_rate_cents ?? 0, estimatedDays: rule.estimated_days };

      case 'tiered': {
        const tiers = (rule.tier_rates as Array<{ min_cents: number; max_cents?: number; rate_cents: number }>) || [];
        const tier = tiers.find(t =>
          input.cartSubtotalCents >= t.min_cents &&
          (!t.max_cents || input.cartSubtotalCents <= t.max_cents)
        );
        return { ruleId: rule.id, name: rule.name, amountCents: tier?.rate_cents ?? rule.base_rate_cents ?? 0, estimatedDays: rule.estimated_days };
      }

      case 'weight_based': {
        const weightTiers = (rule.weight_rates as Array<{ max_grams: number; rate_cents: number }>) || [];
        const wt = weightTiers.find(t => (input.weightGrams ?? 0) <= t.max_grams);
        return { ruleId: rule.id, name: rule.name, amountCents: wt?.rate_cents ?? rule.base_rate_cents ?? 0, estimatedDays: rule.estimated_days };
      }

      default:
        return { ruleId: rule.id, name: rule.name, amountCents: 0, estimatedDays: rule.estimated_days };
    }
  });
}
```

---

## 3. Tax Engine

### Endpoints

| Method   | Path                    | Auth     | Description            |
| -------- | ----------------------- | -------- | ---------------------- |
| `POST`   | `/api/v1/tax-rules`     | Admin    | Create tax rule        |
| `PUT`    | `/api/v1/tax-rules/:id` | Admin    | Update tax rule        |
| `DELETE` | `/api/v1/tax-rules/:id` | Admin    | Delete tax rule        |
| `GET`    | `/api/v1/tax-rules`     | Admin    | List rules             |
| `POST`   | `/api/v1/tax/calculate` | Customer | Calculate tax for cart |

### Expanded Schema

```prisma
model TaxRule {
  id              String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  tenant_id       String   @db.Uuid
  name            String
  type            String   // percentage | fixed | compound
  rate            Float    // e.g. 20.0 = 20%
  region          String?  // e.g. "US-CA", "EU", "GB"
  applies_to      String?  // all | shipping | digital | physical
  is_active       Boolean  @default(true)
  priority        Int      @default(0)
  created_at      DateTime @default(now()) @db.Timestamptz(6) @map("created_at")
  updated_at      DateTime @updatedAt @db.Timestamptz(6) @map("updated_at")
  tenant          Tenant   @relation(fields: [tenant_id], references: [id], onDelete: Cascade)

  @@index([tenant_id])
  @@map("tax_rules")
}
```

### Calculation

```typescript
// src/modules/tax/tax.service.ts
async calculate(ctx: TenantContext, input: {
  subtotalCents: number;
  shippingCents: number;
  region?: string;
  items: Array<{ type: string; priceCents: number }>;
}): Promise<{ taxCents: number; breakdown: TaxBreakdownItem[] }> {
  const rules = await this.prisma.taxRule.findMany({
    where: { tenant_id: ctx.tenantId, is_active: true },
    orderBy: { priority: 'asc' },
  });

  const breakdown: TaxBreakdownItem[] = [];
  let totalTax = 0;

  for (const rule of rules) {
    if (rule.region && input.region !== rule.region) continue;

    let taxableAmount = 0;

    if (rule.applies_to === 'shipping') {
      taxableAmount = input.shippingCents;
    } else if (rule.applies_to === 'digital') {
      taxableAmount = input.items
        .filter(i => i.type === 'digital')
        .reduce((s, i) => s + i.priceCents, 0);
    } else if (rule.applies_to === 'physical') {
      taxableAmount = input.items
        .filter(i => i.type === 'physical')
        .reduce((s, i) => s + i.priceCents, 0);
    } else {
      taxableAmount = input.subtotalCents;
    }

    if (taxableAmount <= 0) continue;

    const taxAmount = Math.round(taxableAmount * (rule.rate / 100));

    if (rule.type === 'compound') {
      // Compound tax: tax on top of previous tax
      totalTax = taxAmount;
    } else {
      totalTax += taxAmount;
    }

    breakdown.push({ ruleId: rule.id, name: rule.name, rate: rule.rate, taxableAmount, taxAmount });
  }

  return { taxCents: totalTax, breakdown };
}
```

---

## 4. Pipeline Integration

```
Cart → Validate promotions → Calculate subtotal
  ↓
Calculate shipping rates → Apply selected shipping → shippingCents
  ↓
Calculate tax → taxCents
  ↓
Apply promotion discount → discountCents
  ↓
Order summary: subtotal + shipping + tax - discount
```

```typescript
async checkoutPreview(cartId: string, tenantId: string) {
  const cart = await this.prisma.cart.findUnique({
    where: { id: cartId },
    include: { items: { include: { variant: { include: { product: true } } } } },
  });

  const subtotal = cart.items.reduce(
    (s, i) => s + i.variant.price_cents * i.quantity, 0,
  );

  // Apply promotion if attached to cart
  // Calculate shipping
  // Calculate tax
  // Return full summary
}
```

---

## 5. Module Structure

```
src/
└── modules/
    ├── promotions/
    │   ├── promotions.module.ts
    │   ├── promotions.controller.ts
    │   ├── promotions.service.ts
    │   └── dto/
    │       ├── create-promotion.dto.ts
    │       └── validate-promotion.dto.ts
    ├── shipping/
    │   ├── shipping.module.ts
    │   ├── shipping.controller.ts
    │   ├── shipping.service.ts
    │   └── dto/
    │       └── calculate-shipping.dto.ts
    └── tax/
        ├── tax.module.ts
        ├── tax.controller.ts
        ├── tax.service.ts
        └── dto/
            └── calculate-tax.dto.ts
```

---

## 6. Test Cases

| #   | Scenario                 | Steps                                                  | Expect                                     |
| --- | ------------------------ | ------------------------------------------------------ | ------------------------------------------ |
| 1   | Percentage promo — valid | Cart total $100, promo 10%                             | Discount $10                               |
| 2   | Fixed amount promo       | Cart total $50, promo $5                               | Discount $5                                |
| 3   | Expired promo            | Use code past expiry                                   | Invalid: expired                           |
| 4   | Usage limit reached      | 100/100 uses                                           | Invalid: limit reached                     |
| 5   | Min order not met        | $30 cart, $50 minimum                                  | Invalid: min order                         |
| 6   | Free shipping promo      | Promo applied                                          | Shipping = $0                              |
| 7   | Flat rate shipping       | Rule active, no tiers                                  | Returns flat rate                          |
| 8   | Tiered shipping          | Cart $200 > $150 tier threshold                        | Returns tier rate                          |
| 9   | Weight-based shipping    | 500g package                                           | Returns correct weight tier                |
| 10  | Free shipping threshold  | Cart $150 > $100 free                                  | Rate = $0                                  |
| 11  | Tax — percentage         | Region = US-CA, rate 8%                                | Tax = subtotal × 0.08                      |
| 12  | Tax — compound           | Priority 1 = 5%, priority 2 = 20% of (subtotal + tax1) | Compound calculation                       |
| 13  | Tax — shipping included  | Tax applies to shipping                                | Shipping amount taxed                      |
| 14  | Checkout preview         | Cart with items                                        | Full breakdown with promo + shipping + tax |
