# Feature 1.5 — Order Lifecycle

## Endpoints

| Method | Path                        | Auth  | Description                                 |
| ------ | --------------------------- | ----- | ------------------------------------------- |
| `GET`  | `/api/v1/orders`            | User  | List own orders (admin: list tenant orders) |
| `GET`  | `/api/v1/orders/:id`        | User  | Get order detail with items + addresses     |
| `PUT`  | `/api/v1/orders/:id/status` | Admin | Transition order status                     |

**Query params** (list): `page`, `limit`, `status`, `sort`, `order`, `search`

**Request body** (status transition):

```json
{
  "status": "confirmed",
  "reason": "string (required for cancellation)"
}
```

---

## State Machine

```
                  ┌───────────────────────────────────────┐
                  │                                       │
                  ▼                                       │
   ┌─────────┐       ┌───────────┐       ┌────────────┐  │
   │ PENDING │──────▶│ CONFIRMED │──────▶│ PROCESSING │  │
   └────┬────┘       └─────┬─────┘       └──────┬─────┘  │
        │                  │                     │        │
        │ (user)           │ (admin)             │        │
        ▼                  ▼                     ▼        │
   ┌─────────┐       ┌───────────┐       ┌────────────┐  │
   │CANCELLED│       │ CANCELLED │       │  SHIPPED   │  │
   └─────────┘       └───────────┘       └──────┬─────┘  │
        ▲                                       │        │
        │                                       ▼        │
        │                                ┌────────────┐  │
        │                                │ DELIVERED  │──┘
        │                                └──────┬─────┘
        │                                       │
        │                              (after delivered only)
        │                                       │
        │                                       ▼
        │                                ┌────────────┐
        └────────────────────────────────│ REFUNDED   │
                                         └────────────┘
```

---

## Status Transition Rules

| From         | To           | Role         | Conditions                              | Notification     |
| ------------ | ------------ | ------------ | --------------------------------------- | ---------------- |
| `pending`    | `confirmed`  | System       | Payment captured; stock decremented     | order.confirmed  |
| `pending`    | `cancelled`  | User         | Order not yet paid; no reason required  | order.cancelled  |
| `confirmed`  | `processing` | Admin        | —                                       | order.processing |
| `confirmed`  | `cancelled`  | Admin        | Reason **required**; full refund issued | order.cancelled  |
| `processing` | `shipped`    | Admin        | Tracking number required                | order.shipped    |
| `shipped`    | `delivered`  | System/Admin | —                                       | order.delivered  |
| `delivered`  | `refunded`   | Admin        | Reason required; full refund            | order.refunded   |

**Invalid transitions** (return 422):

- `pending` → `shipped` (skip states)
- `cancelled` → any
- `refunded` → any
- `shipped` → `cancelled` (must deliver first)
- `processing` → `confirmed` (no backward moves)

---

## Entities

### Order

```
Order {
  id:               UUID          (PK)
  orderNumber:      string        (unique, auto-generated: ORD-{8 chars})
  status:           OrderStatus   (default: pending)
  subtotal:         Decimal       (sum of item line totals)
  shippingTotal:    Decimal       (calculated by shipping module)
  taxTotal:         Decimal       (calculated by tax module)
  discountTotal:    Decimal       (applied promotions)
  grandTotal:       Decimal       (subtotal + shipping + tax - discount)
  currency:         string        (ISO 4217, default USD)
  notes:            string?
  userId:           UUID          (FK → User)
  tenantId:         UUID          (FK → Tenant)
  idempotencyKey:   string?       (unique, from checkout)

  // Children
  items:            OrderItem[]
  shippingAddress:  OrderAddress? (type = shipping)
  billingAddress:   OrderAddress? (type = billing)
  events:           OrderEvent[]

  // Timestamps
  createdAt:        DateTime
  updatedAt:        DateTime
}
```

### OrderItem

```
OrderItem {
  id:         UUID         (PK)
  orderId:    UUID         (FK → Order)
  productId:  UUID         (FK → Product, preserved for reference)
  name:       string       (snapshot at order time)
  sku:        string       (snapshot at order time)
  quantity:   int          (positive)
  unitPrice:  Decimal      (snapshot at order time)
  lineTotal:  Decimal      (quantity × unitPrice)
}
```

### OrderAddress (value object)

```
OrderAddress {
  id:           UUID       (PK)
  orderId:      UUID       (FK → Order)
  type:         string     (shipping | billing)
  fullName:     string
  line1:        string
  line2:        string?
  city:         string
  state:        string
  postalCode:   string
  country:      string     (ISO 3166-1 alpha-2)
  phone:        string?
}
```

### OrderEvent (audit trail)

```
OrderEvent {
  id:           UUID       (PK)
  orderId:      UUID       (FK → Order)
  fromStatus:   string?
  toStatus:     string
  actorId:      UUID       (FK → User, null for system transitions)
  actorType:    string     (user | system | admin)
  reason:       string?
  metadata:     Json?      (e.g. {"refundAmount": 59.99, "trackingNumber": "1Z..."})
  createdAt:    DateTime
}
```

### OrderStatus enum

```typescript
enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
}
```

---

## State Machine Implementation

```typescript
const TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
  [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED],
  [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [OrderStatus.REFUNDED],
  [OrderStatus.CANCELLED]: [],
  [OrderStatus.REFUNDED]: [],
};

function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  return TRANSITIONS[from]?.includes(to) ?? false;
}
```

## Audit Trail Recording

```typescript
async function recordEvent(
  prisma: PrismaService,
  orderId: string,
  fromStatus: OrderStatus | null,
  toStatus: OrderStatus,
  actorId: string | null,
  actorType: "user" | "system" | "admin",
  reason?: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  await prisma.orderEvent.create({
    data: {
      orderId,
      fromStatus,
      toStatus,
      actorId,
      actorType,
      reason,
      metadata: metadata ?? {},
    },
  });
}
```

## Controller

```typescript
@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async list(@AuthUser() user: UserSession, @Query() query: ListOrdersDto) {
    return this.orderService.list(user, query);
  }

  @Get(":id")
  async getById(@AuthUser() user: UserSession, @Param("id") id: string) {
    return this.orderService.getById(user, id);
  }

  @Put(":id/status")
  async transitionStatus(
    @AuthUser() user: UserSession,
    @Param("id") id: string,
    @Body() dto: TransitionStatusDto,
  ) {
    return this.orderService.transitionStatus(user, id, dto);
  }
}
```

---

## Cancellation Policy

| Order State  | Cancellable By | Refund             | Time Window               |
| ------------ | -------------- | ------------------ | ------------------------- |
| `pending`    | User           | None (not paid)    | Anytime                   |
| `confirmed`  | User           | Full               | Within 1h of confirmation |
| `confirmed`  | Admin          | Full               | Anytime                   |
| `processing` | Admin          | Full               | Anytime                   |
| `shipped`    | Admin          | Partial            | Anytime                   |
| `delivered`  | Admin          | Full (as refunded) | Anytime                   |

**Rules:**

- User-initiated cancellation blocked after `processing`.
- Partial refund = grandTotal − (return shipping + restocking fee).
- `refunded` is a separate status (not a form of `cancelled`).
- Reason is **always** required for admin-initiated cancellations.

---

## Webhook Triggers

| Event              | Payload                                               |
| ------------------ | ----------------------------------------------------- |
| `order.confirmed`  | `{ orderId, orderNumber, grandTotal, customerEmail }` |
| `order.processing` | `{ orderId, orderNumber }`                            |
| `order.shipped`    | `{ orderId, orderNumber, trackingNumber }`            |
| `order.delivered`  | `{ orderId, orderNumber }`                            |
| `order.cancelled`  | `{ orderId, orderNumber, reason, refundAmount? }`     |
| `order.refunded`   | `{ orderId, orderNumber, refundAmount, reason }`      |

```typescript
async function emitWebhook(order: Order, event: OrderEvent): Promise<void> {
  const eventName = `order.${event.toStatus}`;
  await this.eventEmitter.emit(eventName, {
    orderId: order.id,
    orderNumber: order.orderNumber,
    grandTotal: order.grandTotal,
    reason: event.reason,
    metadata: event.metadata,
  });
}
```

---

## Test Cases

| #   | Scenario                     | Steps                                                                  | Expect                                                    |
| --- | ---------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------- |
| 1   | Full lifecycle               | pending → confirmed → processing → shipped → delivered                 | Status flows correctly; audit trail has 5 events          |
| 2   | User cancels before payment  | Create order; cancel as user                                           | Status = cancelled; no refund needed                      |
| 3   | Admin cancels confirmed      | Confirm order; cancel as admin with reason                             | Status = cancelled; full refund; reason recorded          |
| 4   | Invalid transition           | Try pending → shipped                                                  | Returns 422; no event created                             |
| 5   | Refund after delivered       | Complete delivery; refund as admin                                     | Status = refunded; event with metadata.refundAmount       |
| 6   | Audit trail recorded         | Any status transition                                                  | OrderEvent row created with fromStatus, toStatus, actorId |
| 7   | Webhook emitted              | Each status change                                                     | EventEmitter called with correct event name               |
| 8   | Cancel blocked post-shipping | Try cancel on shipped order                                            | Returns 422 (must deliver first)                          |
| 9   | Cancelled → any blocked      | Try transition from cancelled                                          | Returns 422                                               |
| 10  | List filtered by status      | Create 3 orders with different statuses; list with `?status=confirmed` | Returns only confirmed orders                             |
