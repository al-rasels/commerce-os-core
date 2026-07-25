# Domain Model

## Bounded Contexts

```
┌─────────────────────────────────────────────────────────────────┐
│                     Commerce OS Domain                            │
│                                                                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │    Platform      │  │    Commerce     │  │   Experience    │  │
│  │                  │  │                  │  │                 │  │
│  │ • Tenant         │  │ • Product        │  │ • Page          │  │
│  │ • User           │  │ • Variant        │  │ • Template      │  │
│  │ • Role           │  │ • Category       │  │ • Theme         │  │
│  │ • Permission     │  │ • Cart           │  │ • Widget        │  │
│  │ • FeatureFlag    │  │ • Order          │  │                 │  │
│  │ • AuditLog       │  │ • Checkout       │  │                 │  │
│  │                  │  │ • Customer       │  │                 │  │
│  │                  │  │ • Payment        │  │                 │  │
│  │                  │  │ • Shipping       │  │                 │  │
│  │                  │  │ • Tax            │  │                 │  │
│  │                  │  │ • Promo          │  │                 │  │
│  │                  │  │ • Inventory      │  │                 │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core Domain: Commerce

### Product Aggregate

```
Product {
  id: UUID
  tenantId: TenantId
  name: string
  slug: string (unique per tenant)
  status: ProductStatus (draft | published | archived)
  description?: string
  categoryId?: CategoryId
  metafields: Json
  createdAt: DateTime
  updatedAt: DateTime
  deletedAt?: DateTime

  // Child entities
  variants: ProductVariant[]

  // Invariants
  - Must have at least one variant if status = published
  - Slug must be unique within tenant
  - Cannot delete if active orders reference product
}

ProductVariant {
  id: UUID
  tenantId: TenantId
  productId: ProductId
  sku: string (unique per tenant)
  priceCents: PositiveInt
  currency: CurrencyCode
  stockAvailable: NonNegativeInt
  stockReserved: NonNegativeInt
  attributes: Json (size, color, etc.)

  // Invariants
  - priceCents > 0
  - stockReserved <= stockAvailable
  - SKU unique within tenant
  - Must belong to a product
}
```

### Cart Aggregate

```
Cart {
  id: UUID
  tenantId: TenantId
  customerId?: CustomerId
  sessionId?: string
  status: CartStatus (open | checked_out | abandoned)
  createdAt: DateTime

  // Child entities
  items: CartItem[]

  // Invariants
  - Must have either customerId or sessionId
  - Cannot add items if status != open
  - Items auto-expire after 30 days
}

CartItem {
  id: UUID
  cartId: CartId
  variantId: VariantId
  quantity: PositiveInt
  unitPriceCents: PositiveInt (snapshot at add time)

  // Invariants
  - quantity <= variant.stockAvailable
  - quantity <= 99 (sanity limit)
}
```

### Order Aggregate

```
Order {
  id: UUID
  tenantId: TenantId
  customerId: CustomerId
  status: OrderStatus
  subtotalCents: NonNegativeInt
  taxCents: NonNegativeInt
  shippingCents: NonNegativeInt
  totalCents: NonNegativeInt
  currency: CurrencyCode
  channel: OrderChannel (online | admin | api)
  metafields: Json
  createdAt: DateTime
  idempotencyKey?: string (unique)

  // Child entities
  items: OrderItem[]
  stockReservations: StockReservation[]

  // Invariants
  - totalCents = subtotalCents + taxCents + shippingCents
  - Status transitions: pending → confirmed → shipped → delivered
  -                    pending → cancelled
  -                    confirmed → cancelled (with refund)
  - Cannot modify after status = shipped
  - idempotencyKey prevents duplicate orders
}

OrderItem {
  id: UUID
  orderId: OrderId
  variantId: VariantId
  quantity: PositiveInt
  unitPriceCents: PositiveInt

  // Invariants
  - unitPriceCents must match variant price at order time
}

OrderStatus: pending | confirmed | shipped | delivered | cancelled
```

---

## Platform Domain

### Tenant Aggregate

```
Tenant {
  id: UUID
  name: string
  planId: string
  status: TenantStatus (active | suspended | trial)
  createdAt: DateTime

  // Sub-entities
  users: User[]
  domains: TenantDomain[]
  roles: Role[]
  featureFlags: FeatureFlag[]

  // Invariants
  - Must have at least one active admin user
  - Must have at least one domain
  - Cannot delete if active orders exist
}
```

### User Entity

```
User {
  id: UUID
  tenantId: TenantId
  email: string (unique per tenant)
  passwordHash: string (hidden)
  roleId: RoleId
  mfaEnabled: boolean
  mfaSecret?: string (hidden)
  status: UserStatus (active | suspended | invited)
  createdAt: DateTime

  // Invariants
  - Email unique within tenant
  - Cannot delete last admin of tenant
  - MFA cannot be disabled if enforced by tenant plan
}
```

### Role & Permission

```
Role {
  id: UUID
  tenantId: TenantId
  name: string
  permissions: Permission[]

  // Invariants
  - Cannot delete if users assigned
  - Cannot remove own admin role
}

Permission {
  resource: Resource (product | order | customer | ...)
  action: Action (create | read | update | delete | manage)
}

Resource = product | order | customer | category | variant
         | promotion | shipping | tax | user | role
         | tenant | settings | audit_log

Action = create | read | update | delete | manage (all actions)
```

---

## Experience Domain

### Page

```
PageLayout {
  tenantId: TenantId
  pageKey: string (home | product | cart | checkout | ...)
  sections: Json
  publishedAt?: DateTime
}
```

### Theme

```
ThemeBase {
  id: UUID
  version: string
  tokens: Json (design tokens)
}

ThemeTenantOverride {
  tenantId: TenantId
  themeBaseId: ThemeBaseId
  overrides: Json
  updatedAt: DateTime
}
```

---

## Domain Events (Future)

```
ProductCreated    { productId, tenantId, timestamp }
ProductUpdated    { productId, tenantId, changedFields, timestamp }
ProductDeleted    { productId, tenantId, timestamp }
OrderCreated      { orderId, tenantId, total, currency, timestamp }
OrderStatusChanged { orderId, tenantId, from, to, timestamp }
PaymentProcessed  { orderId, paymentId, amount, status, timestamp }
StockLow          { variantId, sku, stockAvailable, threshold, timestamp }
CustomerCreated   { customerId, email, timestamp }
```

---

## Ubiquitous Language

| Term        | Definition                                           |
| ----------- | ---------------------------------------------------- |
| Tenant      | An organization using Commerce OS (a merchant)       |
| Product     | A sellable item defined by the merchant              |
| Variant     | A specific version of a product (size, color)        |
| SKU         | Stock Keeping Unit — unique identifier for a variant |
| Cart        | A temporary collection of items before checkout      |
| Order       | A confirmed purchase by a customer                   |
| Customer    | A buyer who purchases from a tenant's store          |
| Channel     | The source of an order (online store, admin, API)    |
| Reservation | Temporary hold on inventory for a cart or order      |
| Metafields  | Custom JSON data attached to an entity               |
