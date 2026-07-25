# Feature 6.2 — Advanced Commerce

## 1. Email Service

### Architecture

```
App → EmailService → Transport (Nodemailer / SendGrid / SES)
                        ↓
                  EmailLog (DB)
```

### Endpoints

| Method | Path                           | Auth  | Description           |
| ------ | ------------------------------ | ----- | --------------------- |
| `POST` | `/api/v1/emails/templates`     | Admin | Create email template |
| `PUT`  | `/api/v1/emails/templates/:id` | Admin | Update email template |
| `GET`  | `/api/v1/emails/templates`     | Admin | List templates        |
| `GET`  | `/api/v1/emails/logs`          | Admin | List sent emails      |

### Entity

```
EmailLog {
  id:         UUID    (PK)
  tenant_id:  UUID?   (FK → Tenant)
  to:         string
  subject:    string
  template:   string?
  status:     string  (sent | failed | queued)
  error:      string?
  sent_at:    DateTime
}
```

### Implementation

```typescript
// src/modules/email/email.service.ts
@Injectable()
export class EmailService {
  constructor(
    private readonly transporter: Transporter,
    private readonly prisma: PrismaService,
  ) {}

  async send(input: {
    to: string;
    subject: string;
    html: string;
    tenantId?: string;
    template?: string;
  }): Promise<void> {
    try {
      await this.transporter.sendMail({
        to: input.to,
        subject: input.subject,
        html: input.html,
      });
      await this.log(input, "sent");
    } catch (error) {
      await this.log(input, "failed", error.message);
      throw error;
    }
  }
}

// src/modules/email/email.module.ts
// Transporter provider (Nodemailer) based on env config
```

### Templates

```typescript
// src/modules/email/templates/order-confirmation.ts
export function orderConfirmation(order: Order, customer: Customer): string {
  return `
    <h1>Order Confirmed</h1>
    <p>Hi ${customer.first_name || customer.email},</p>
    <p>Your order #${order.id.slice(0, 8)} has been confirmed.</p>
    <table>
      <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
      ${order.items
        .map(
          (i) => `<tr>
        <td>${i.variant.product.name}</td>
        <td>${i.quantity}</td>
        <td>${i.unit_price_cents / 100}</td>
      </tr>`,
        )
        .join("")}
    </table>
    <p><strong>Total: ${order.total_cents / 100}</strong></p>
  `;
}
```

---

## 2. Meilisearch Integration

### Architecture

```
Prisma <-> MeilisearchSyncService <-> Meilisearch (external)
                 ↑
          Webhook / Cron
```

### Endpoints

| Method | Path                            | Auth   | Description          |
| ------ | ------------------------------- | ------ | -------------------- |
| `POST` | `/api/v1/search/sync`           | Admin  | Trigger full reindex |
| `GET`  | `/api/v1/search/products?q=...` | Public | Search products      |

### Index Configuration

```typescript
// src/modules/search/search.service.ts
const INDEX_NAME = "products";

const PRODUCT_ATTRIBUTES = [
  "id",
  "name",
  "description",
  "variantSku",
  "categoryName",
  "priceCents",
  "currency",
  "status",
  "tenantId",
];

@Injectable()
export class SearchService {
  async indexProduct(product: Product): Promise<void> {
    if (product.status !== "published") {
      await this.client.index(INDEX_NAME).deleteDocument(product.id);
      return;
    }

    const variants =
      product.variants?.filter((v) => v.price_cents != null) || [];
    const minPrice =
      variants.length > 0
        ? Math.min(...variants.map((v) => v.price_cents))
        : null;

    await this.client.index(INDEX_NAME).addDocuments([
      {
        id: product.id,
        name: product.name,
        description: product.description,
        variantSku: variants.map((v) => v.sku),
        categoryName: product.category?.name,
        priceCents: minPrice,
        currency: variants[0]?.currency,
        status: product.status,
        tenantId: product.tenant_id,
      },
    ]);
  }

  async search(
    tenantId: string,
    q: string,
    options?: {
      page?: number;
      hitsPerPage?: number;
      filters?: string[];
    },
  ) {
    return this.client.index(INDEX_NAME).search(q, {
      filter: [`tenantId = ${tenantId}`],
      ...options,
    });
  }
}
```

### Sync Triggers

| Trigger                         | Action                                      |
| ------------------------------- | ------------------------------------------- |
| Product created/updated/deleted | `searchService.indexProduct(product)`       |
| Variant price/sku changed       | `searchService.indexProduct(parentProduct)` |
| Category name changed           | Reindex all products in category            |
| Admin triggers full sync        | Batch reindex all published products        |

### API

```typescript
// src/modules/search/search.controller.ts
@Controller("search")
export class SearchController {
  @Get("products")
  @UsePipes(new ValidationPipe({ transform: true }))
  async searchProducts(
    @Query() query: SearchProductDto,
    @TenantContext() ctx: TenantContext,
  ) {
    return this.searchService.search(ctx.tenantId, query.q, {
      page: query.page,
      hitsPerPage: query.limit,
    });
  }

  @Post("sync")
  @Roles("admin")
  async triggerSync(@TenantContext() ctx: TenantContext) {
    await this.searchService.fullReindex(ctx.tenantId);
    return { message: "Reindex started" };
  }
}
```

---

## 3. BullMQ Background Jobs

### Queue Configuration

```typescript
// src/modules/queue/queue.module.ts
import Bull from "bullmq";
import { REDIS_CONFIG } from "../redis/redis.config";

export const QUEUES = {
  EMAIL: "email",
  SEARCH: "search",
  ORDER: "order",
  STOCK: "stock",
  AUDIT: "audit",
  WEBHOOK: "webhook",
} as const;

export const queueProvider = {
  provide: "BULL_QUEUE",
  useFactory: () => {
    const connection = { host: REDIS_CONFIG.host, port: REDIS_CONFIG.port };
    return {
      email: new Bull.Queue(QUEUES.EMAIL, { connection }),
      search: new Bull.Queue(QUEUES.SEARCH, { connection }),
      order: new Bull.Queue(QUEUES.ORDER, { connection }),
      stock: new Bull.Queue(QUEUES.STOCK, { connection }),
      audit: new Bull.Queue(QUEUES.AUDIT, { connection }),
      webhook: new Bull.Queue(QUEUES.WEBHOOK, { connection }),
    };
  },
};
```

### Jobs

| Queue     | Job                            | Data                          | Retry                   |
| --------- | ------------------------------ | ----------------------------- | ----------------------- |
| `email`   | `send-order-confirmation`      | `{ orderId }`                 | 3×, exponential backoff |
| `email`   | `send-shipment-notification`   | `{ orderId, trackingNumber }` | 3×                      |
| `search`  | `index-product`                | `{ productId }`               | 2×                      |
| `search`  | `full-reindex`                 | `{ tenantId }`                | 1×                      |
| `stock`   | `release-expired-reservations` | `{}`                          | 2×                      |
| `stock`   | `reserve-stock`                | `{ orderId, items[] }`        | 3×                      |
| `order`   | `process-checkout`             | `{ cartId }`                  | 3×                      |
| `webhook` | `deliver`                      | `{ url, payload }`            | 5×                      |

### Worker

```typescript
// src/modules/queue/workers/stock.worker.ts
const worker = new Bull.Worker(
  QUEUES.STOCK,
  async (job) => {
    switch (job.name) {
      case "release-expired-reservations": {
        const count = await prisma.stockReservation.deleteMany({
          where: { expires_at: { lt: new Date() } },
        });
        logger.log(`Released ${count} expired reservations`);
        break;
      }
      case "reserve-stock": {
        const { orderId, items } = job.data;
        for (const item of items) {
          const variant = await prisma.productVariant.findUnique({
            where: { id: item.variantId },
          });
          if (
            variant.stock_available - variant.stock_reserved <
            item.quantity
          ) {
            throw new Error(`Insufficient stock for variant ${item.variantId}`);
          }
          await prisma.productVariant.update({
            where: { id: item.variantId },
            data: { stock_reserved: { increment: item.quantity } },
          });
          await prisma.stockReservation.create({
            data: {
              tenant_id: order.tenant_id,
              variant_id: item.variantId,
              order_id: orderId,
              quantity: item.quantity,
              expires_at: new Date(Date.now() + 15 * 60 * 1000), // 15 min
            },
          });
        }
        break;
      }
    }
  },
  { connection: { host: REDIS_CONFIG.host, port: REDIS_CONFIG.port } },
);
```

---

## 4. File Uploads

### Endpoints

| Method   | Path                  | Auth  | Description                      |
| -------- | --------------------- | ----- | -------------------------------- |
| `POST`   | `/api/v1/uploads`     | Admin | Upload file (returns signed URL) |
| `GET`    | `/api/v1/uploads/:id` | Admin | Get file metadata                |
| `DELETE` | `/api/v1/uploads/:id` | Admin | Delete file                      |

### Entity

```
Upload {
  id:            UUID   (PK)
  tenant_id:     UUID   (FK → Tenant)
  original_name: string
  mime_type:     string
  size_bytes:    int
  storage_key:   string  (S3 key or local path)
  bucket:        string
  created_at:    DateTime
}
```

### Flow

```
Admin uploads file
  ↓
POST /uploads (multipart)
  → Multer middleware parses file
  → UploadService.upload(file, ctx)
    → Generate storageKey = `uploads/${tenantId}/${uuid}-${sanitizedFilename}`
    → S3.putObject(Bucket: bucket, Key: storageKey, Body: buffer)
    → Store Upload record
    → Return { id, url: signedUrl(storageKey) }
```

**NestJS module:**

```typescript
// src/modules/uploads/uploads.module.ts
MulterModule.register({ limits: { fileSize: 10 * 1024 * 1024 } }),

// src/modules/uploads/uploads.service.ts
async upload(file: Express.Multer.File, ctx: TenantContext): Promise<Upload> {
  const key = `uploads/${ctx.tenantId}/${uuid()}-${file.originalname}`;
  await this.s3.send(new PutObjectCommand({
    Bucket: this.config.get('UPLOAD_BUCKET'),
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  }));

  return this.prisma.upload.create({
    data: {
      tenant_id: ctx.tenantId,
      original_name: file.originalname,
      mime_type: file.mimetype,
      size_bytes: file.size,
      storage_key: key,
      bucket: this.config.get('UPLOAD_BUCKET'),
    },
  });
}

getSignedUrl(storageKey: string): string {
  const command = new GetObjectCommand({
    Bucket: this.config.get('UPLOAD_BUCKET'),
    Key: storageKey,
  });
  return getSignedUrl(this.s3, command, { expiresIn: 3600 });
}
```

---

## 5. Module Structure

```
src/
└── modules/
    ├── email/
    │   ├── email.module.ts
    │   ├── email.service.ts
    │   ├── templates/
    │   │   ├── order-confirmation.ts
    │   │   ├── shipment-notification.ts
    │   │   └── password-reset.ts
    │   └── email-log.controller.ts
    ├── search/
    │   ├── search.module.ts
    │   ├── search.service.ts
    │   ├── search.controller.ts
    │   └── sync/
    │       └── search-sync.listener.ts
    ├── queue/
    │   ├── queue.module.ts
    │   ├── queues/
    │   │   ├── email.queue.ts
    │   │   ├── search.queue.ts
    │   │   └── stock.queue.ts
    │   └── workers/
    │       ├── email.worker.ts
    │       ├── search.worker.ts
    │       └── stock.worker.ts
    └── uploads/
        ├── uploads.module.ts
        ├── uploads.controller.ts
        ├── uploads.service.ts
        └── dto/
            └── upload.dto.ts
```

---

## 6. Test Cases

| #   | Scenario                              | Steps                      | Expect                                       |
| --- | ------------------------------------- | -------------------------- | -------------------------------------------- |
| 1   | Send order confirmation email         | Checkout → order confirmed | Email queued; EmailLog created               |
| 2   | Email — delivery failure              | Invalid recipient          | EmailLog status = failed; retry scheduled    |
| 3   | Meilisearch — index product on create | Create published product   | Searchable within 1s                         |
| 4   | Meilisearch — search by name          | Query "blue shirt"         | Returns matching products                    |
| 5   | Meilisearch — tenant isolation        | Tenant A searches          | No Tenant B results                          |
| 6   | Full reindex                          | Admin triggers sync        | All published products reindexed             |
| 7   | BullMQ — reserve stock                | Order placed               | Stock reserved; Reservation record created   |
| 8   | BullMQ — release expired reservations | Cron runs hourly           | Expired reservations deleted; stock released |
| 9   | BullMQ — retry on failure             | Worker throws              | Job retried 3× with backoff                  |
| 10  | Upload file                           | Upload image (2MB)         | S3 object created; Upload record stored      |
| 11  | Upload — oversized file               | Upload 15MB file           | 413 Payload Too Large                        |
| 12  | Signed URL                            | Get file URL               | Temporary URL that expires in 1h             |
