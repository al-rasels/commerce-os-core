# Feature 6.1 — Stripe Payments

## 1. Endpoints

| Method   | Path                                     | Auth                  | Description                                          |
| -------- | ---------------------------------------- | --------------------- | ---------------------------------------------------- |
| `POST`   | `/api/v1/payments/create-payment-intent` | Customer              | Create PaymentIntent for an order                    |
| `POST`   | `/api/v1/payments/confirm`               | Customer              | Confirm payment (client-side confirms via Stripe.js) |
| `POST`   | `/api/v1/webhooks/stripe`                | Public (sig verified) | Stripe event webhook                                 |
| `GET`    | `/api/v1/payments/:orderId/status`       | Customer              | Get payment status for order                         |
| `POST`   | `/api/v1/payments/:id/refund`            | Admin                 | Issue full/partial refund                            |
| `GET`    | `/api/v1/payments/methods`               | Customer              | List saved payment methods                           |
| `DELETE` | `/api/v1/payments/methods/:id`           | Customer              | Detach saved payment method                          |

---

## 2. Entities

### Payment

```
Payment {
  id:               UUID        (PK)
  tenant_id:        UUID        (FK → Tenant)
  order_id:         UUID        (FK → Order)
  stripe_pi_id:     string      (stripe PaymentIntent ID)
  stripe_customer_id: string?   (stripe Customer ID)
  amount_cents:     int
  currency:         string      (ISO 4217)
  status:           string      (requires_payment_method | processing | succeeded | failed | canceled | refunded)
  payment_method:   string?     (card | sepa_debit)
  idempotency_key:  string?     (unique)
  metadata_json:    Json?       (stripe metadata)
  refunded_cents:   int         @default(0)
  created_at:       DateTime
  updated_at:       DateTime
}
```

### PaymentMethod

```
PaymentMethod {
  id:               UUID        (PK)
  tenant_id:        UUID        (FK → Tenant)
  customer_id:      UUID        (FK → Customer)
  stripe_pm_id:     string      (stripe PaymentMethod ID)
  type:             string      (card | sepa_debit)
  is_default:       boolean     @default(false)
  details_json:     Json?       ({ brand, last4, expMonth, expYear } for card)
  created_at:       DateTime

  @@unique([tenant_id, stripe_pm_id])
}
```

**Prisma schema:**

```prisma
model Payment {
  id                  String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  tenant_id           String   @db.Uuid
  order_id            String   @db.Uuid
  stripe_pi_id        String   @unique
  stripe_customer_id  String?
  amount_cents        Int
  currency            String
  status              String   @default("requires_payment_method")
  payment_method      String?
  idempotency_key     String?  @unique
  metadata_json       Json?    @default("{}")
  refunded_cents      Int      @default(0)
  created_at          DateTime @default(now()) @db.Timestamptz(6)
  updated_at          DateTime @updatedAt @db.Timestamptz(6)
  tenant              Tenant   @relation(fields: [tenant_id], references: [id], onDelete: Cascade)

  @@index([tenant_id, order_id])
  @@map("payments")
}

model PaymentMethod {
  id             String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  tenant_id      String   @db.Uuid
  customer_id    String   @db.Uuid
  stripe_pm_id   String   @unique
  type           String
  is_default     Boolean  @default(false)
  details_json   Json?    @default("{}")
  created_at     DateTime @default(now()) @db.Timestamptz(6)
  tenant         Tenant   @relation(fields: [tenant_id], references: [id], onDelete: Cascade)

  @@index([tenant_id, customer_id])
  @@map("payment_methods")
}
```

---

## 3. PaymentIntent Flow

```
Checkout → Order created (status: pending)
  ↓
POST /payments/create-payment-intent
  → Create Stripe Customer (if first order)
  → stripe.paymentIntents.create({
      amount: order.total_cents,
      currency: order.currency,
      customer: stripeCustomerId,
      automatic_payment_methods: { enabled: true },
      metadata: { orderId, tenantId },
      idempotency_key,
    })
  → Store Payment record (status: requires_payment_method)
  → Return { clientSecret, paymentIntentId }
  ↓
Frontend: stripe.confirmCardPayment(clientSecret)
  ↓
Stripe sends webhook → payment_intent.succeeded / payment_intent.payment_failed
  → Update Payment.status
  → On succeeded: transition Order to confirmed
  → On failed: keep Order as pending, log failure
```

---

## 4. Webhook Handler

```typescript
// src/modules/payments/webhooks/stripe-webhook.controller.ts
@Controller("webhooks")
export class StripeWebhookController {
  constructor(private readonly stripeWebhookService: StripeWebhookService) {}

  @Post("stripe")
  @SkipAuth()
  async handleWebhook(@Req() req: Request): Promise<{ received: boolean }> {
    const sig = req.headers["stripe-signature"] as string;
    const rawBody = req.rawBody; // requires raw body parser

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (err) {
      throw new BadRequestException("Invalid signature");
    }

    await this.stripeWebhookService.handleEvent(event);
    return { received: true };
  }
}
```

```typescript
// src/modules/payments/webhooks/stripe-webhook.service.ts
const EVENT_MAP: Record<string, string> = {
  payment_intent.succeeded:         'succeeded',
  payment_intent.payment_failed:    'failed',
  payment_intent.canceled:          'canceled',
  charge.refunded:                  'refunded',
};

@Injectable()
export class StripeWebhookService {
  async handleEvent(event: Stripe.Event): Promise<void> {
    const pi = event.data.object as Stripe.PaymentIntent;
    const payment = await this.prisma.payment.findUnique({
      where: { stripe_pi_id: pi.id },
    });
    if (!payment) return; // idempotent — already processed

    const newStatus = EVENT_MAP[event.type];
    if (!newStatus) return; // unsupported event type

    await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: newStatus,
        refunded_cents: event.type === 'charge.refunded'
          ? (event.data.object as Stripe.Charge).amount_refunded
          : undefined,
      },
    });

    if (event.type === 'payment_intent.succeeded') {
      await this.orderService.transitionStatus(
        payment.order_id,
        'confirmed',
        'system',
      );
    }
  }
}
```

---

## 5. Refund

```typescript
async refund(
  ctx: TenantContext,
  paymentId: string,
  amountCents?: number,
): Promise<Payment> {
  const payment = await this.prisma.payment.findFirst({
    where: { id: paymentId, tenant_id: ctx.tenantId },
  });
  if (!payment) throw new NotFoundException('Payment not found');
  if (payment.status !== 'succeeded') throw new BadRequestException('Payment not succeeded');

  const refund = await stripe.refunds.create({
    payment_intent: payment.stripe_pi_id,
    amount: amountCents ?? undefined, // null = full refund
  });

  return this.prisma.payment.update({
    where: { id: payment.id },
    data: {
      refunded_cents: payment.refunded_cents + (amountCents ?? payment.amount_cents),
      status: refund.status === 'succeeded' ? 'refunded' : payment.status,
    },
  });
}
```

---

## 6. Receipt Generation

```typescript
// src/modules/payments/receipt/receipt.service.ts
async generateReceipt(orderId: string): Promise<string> {
  const order = await this.prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true, customer: true },
  });
  if (!order) throw new NotFoundException();

  // Render receipt HTML template
  const html = receiptTemplate({
    orderNumber: order.id.slice(0, 8).toUpperCase(),
    date: order.created_at.toLocaleDateString(),
    items: order.items,
    subtotal: order.subtotal_cents,
    tax: order.tax_cents,
    total: order.total_cents,
    customer: order.customer,
  });

  // Send via email or return as PDF
  if (process.env.RECEIPT_MODE === 'email') {
    await this.emailService.send({
      to: order.customer.email,
      subject: `Receipt for order #${order.id.slice(0, 8)}`,
      html,
    });
  }
  return html;
}
```

---

## 7. Idempotency

| Source               | Key                              | Scope                           |
| -------------------- | -------------------------------- | ------------------------------- |
| PaymentIntent create | `payment-{orderId}-{attempt}`    | Per-order, per-attempt          |
| Webhook events       | Stripe `Idempotency-Key` header  | Stripe guarantees once delivery |
| Refund               | `refund-{paymentId}-{timestamp}` | Prevents double refund          |

```typescript
async createPaymentIntent(orderId: string, idempotencyKey: string) {
  const existing = await this.prisma.payment.findUnique({
    where: { idempotency_key: idempotencyKey },
  });
  if (existing) return existing; // idempotent hit

  // ... create via Stripe API with idempotencyKey
}
```

---

## 8. Module Structure

```
src/
└── modules/
    └── payments/
        ├── payments.module.ts
        ├── payments.controller.ts
        ├── payments.service.ts
        ├── webhooks/
        │   ├── stripe-webhook.controller.ts
        │   └── stripe-webhook.service.ts
        ├── receipt/
        │   ├── receipt.service.ts
        │   └── templates/
        │       └── receipt.html.ts
        ├── dto/
        │   ├── create-payment-intent.dto.ts
        │   └── refund.dto.ts
        ├── interfaces/
        │   └── payment.interface.ts
        └── constants/
            └── stripe.constants.ts
```

---

## 9. Test Cases

| #   | Scenario                    | Steps                           | Expect                                            |
| --- | --------------------------- | ------------------------------- | ------------------------------------------------- |
| 1   | Create PaymentIntent        | POST with orderId               | Returns clientSecret; Payment record created      |
| 2   | Webhook — payment succeeded | Send `payment_intent.succeeded` | Status updated; Order → confirmed                 |
| 3   | Webhook — invalid signature | Send without proper sig         | 400 Invalid signature                             |
| 4   | Webhook — duplicate event   | Send same event twice           | Idempotent; no duplicate transition               |
| 5   | Full refund                 | Admin refunds succeeded payment | Payment status = refunded; refunded_cents set     |
| 6   | Partial refund              | Refund 50% of amount            | refunded_cents = amount/2; status stays succeeded |
| 7   | Idempotent create           | Same idempotency key twice      | Returns same Payment; no Stripe duplicate         |
| 8   | List payment methods        | Customer has 2 saved cards      | Returns both with masked details                  |
| 9   | Delete payment method       | Detach saved card               | Removed from list; Stripe detached                |
| 10  | Receipt generation          | After successful payment        | HTML receipt with line items and totals           |
