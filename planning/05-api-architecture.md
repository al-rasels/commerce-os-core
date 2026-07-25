# API Architecture

## Request Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           REQUEST FLOW                                  │
│                                                                         │
│  ┌──────────┐    ┌─────────────┐    ┌────────────────────────────┐     │
│  │  Client  │───▶│  NestJS     │───▶│  Global Guard Chain        │     │
│  │          │    │  Listener   │    │  AuthGuard → TenantGuard   │     │
│  └──────────┘    └─────────────┘    │  → PermissionGuard         │     │
│                                      └─────────────┬──────────────┘     │
│                                                    ▼                    │
│                                      ┌────────────────────────────┐     │
│                                      │  Global Interceptor Chain   │     │
│                                      │  LoggingInterceptor →      │     │
│                                      │  RequestIdInterceptor →    │     │
│                                      │  TenantInterceptor         │     │
│                                      └─────────────┬──────────────┘     │
│                                                    ▼                    │
│                                      ┌────────────────────────────┐     │
│                                      │  Controller (Module)       │     │
│                                      │  @Body @Param @Query       │     │
│                                      └─────────────┬──────────────┘     │
│                                                    ▼                    │
│                                      ┌────────────────────────────┐     │
│                                      │  ValidationPipe (DTO)      │     │
│                                      │  whitelist / transform     │     │
│                                      └─────────────┬──────────────┘     │
│                                                    ▼                    │
│                                      ┌────────────────────────────┐     │
│                                      │  Service (Business Logic)  │     │
│                                      └─────────────┬──────────────┘     │
│                                                    ▼                    │
│                                      ┌────────────────────────────┐     │
│                                      │  PrismaService / Repo     │     │
│                                      └─────────────┬──────────────┘     │
│                                                    ▼                    │
│  ┌──────────┐    ┌─────────────┐    ┌────────────────────────────┐     │
│  │  Client  │◀───│  Transform  │◀───│  ExceptionFilter (on       │     │
│  │          │    │  Interceptor│    │  error) / SerializeInterceptor│   │
│  └──────────┘    └─────────────┘    └────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Route Versioning

All API routes are prefixed with `/api/v1/`.

```
/api/v1/{module}/{resource}
/api/v1/auth/login
/api/v1/commerce/products
/api/v1/platform/tenants
```

Versioning is enforced at the NestJS global prefix level in `main.ts`:

```typescript
const app = await NestFactory.create(AppModule);
app.setGlobalPrefix("api/v1", {
  exclude: ["health", "api-docs"],
});
```

Future versions (`v2`) are accommodated by new module paths; no breaking changes are made to `v1` after GA.

---

## Standard Endpoint Patterns

### Conventions

| Aspect             | Convention    | Example                                            |
| ------------------ | ------------- | -------------------------------------------------- |
| Resource names     | Plural nouns  | `products`, `orders`, `tenants`                    |
| Path segments      | kebab-case    | `stock-reservations`, `feature-flags`              |
| Query params       | snake_case    | `?sort_by=created_at&order=desc`                   |
| Route params       | camelCase     | `:productId`, `:orderId`                           |
| Controller methods | RESTful verbs | `findAll`, `findOne`, `create`, `update`, `remove` |

### Standard CRUD Mappings

```
GET    /api/v1/{resources}          → findAll     (paginated list)
GET    /api/v1/{resources}/:id      → findOne     (single item)
POST   /api/v1/{resources}          → create      (new item)
PATCH  /api/v1/{resources}/:id      → update      (partial update)
DELETE /api/v1/{resources}/:id      → remove      (soft delete)

POST   /api/v1/{resources}/:id/restore  → restore  (undo soft delete)
POST   /api/v1/{resources}/bulk         → bulkCreate
PATCH  /api/v1/{resources}/bulk         → bulkUpdate
```

Non-CRUD actions use `POST` with a verb suffix:

```
POST /api/v1/checkout/:cartId/place
POST /api/v1/orders/:orderId/cancel
POST /api/v1/products/:productId/duplicate
```

---

## Response Envelope

Every response follows a unified envelope structure:

```typescript
// Success
{
  success: true,
  data: T,                    // Payload (object, array, or null)
  meta?: {
    page: number,
    limit: number,
    total: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
  },
}

// Error
{
  success: false,
  error: {
    code: string,             // Machine-readable (e.g., "VALIDATION_ERROR")
    message: string,          // Human-readable
    details?: any,            // Validation errors, field-level info
  },
}
```

The `TransformInterceptor` wraps all successful responses:

```typescript
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
        meta: data instanceof PaginatedResult ? data.meta : undefined,
      })),
    );
  }
}
```

---

## Standardized Pagination

### Query Parameters

| Param    | Type            | Default      | Description                              |
| -------- | --------------- | ------------ | ---------------------------------------- |
| `page`   | number          | 1            | Current page (1-indexed)                 |
| `limit`  | number          | 20           | Items per page (max 100)                 |
| `sort`   | string          | `created_at` | Field to sort by                         |
| `order`  | `asc` \| `desc` | `desc`       | Sort direction                           |
| `search` | string          | —            | Full-text search term                    |
| `filter` | JSON string     | —            | Field filters (`{"status":"published"}`) |

### Pagination DTO

```typescript
export class PaginationQueryDto {
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  page?: number = 1;

  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  sort?: string = "created_at";

  @IsOptional()
  @IsEnum(["asc", "desc"])
  order?: "asc" | "desc" = "desc";

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsObject()
  filter?: Record<string, any>;
}
```

### Paginated Result

```typescript
export class PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };

  constructor(data: T[], total: number, query: PaginationQueryDto) {
    this.data = data;
    this.meta = {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
      hasNextPage: query.page * query.limit < total,
      hasPreviousPage: query.page > 1,
    };
  }
}
```

### Query Builder Pattern

```typescript
async findAll(query: PaginationQueryDto): Promise<PaginatedResult<Product>> {
  const where: Prisma.ProductWhereInput = {
    tenantId: this.currentTenantId,
    ...(query.search && {
      OR: [
        { name: { contains: query.search, mode: 'insensitive' } },
        { slug: { contains: query.search, mode: 'insensitive' } },
      ],
    }),
    ...(query.filter && { ...query.filter }),
  };

  const [data, total] = await this.prisma.$transaction([
    this.prisma.product.findMany({
      where,
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      orderBy: { [query.sort]: query.order },
      include: { variants: true },
    }),
    this.prisma.product.count({ where }),
  ]);

  return new PaginatedResult(data, total, query);
}
```

---

## Error Response Format

### Error Codes

| Code                   | HTTP Status | Description                  |
| ---------------------- | ----------- | ---------------------------- |
| `VALIDATION_ERROR`     | 422         | DTO validation failed        |
| `UNAUTHORIZED`         | 401         | Missing or invalid JWT       |
| `FORBIDDEN`            | 403         | Insufficient permissions     |
| `NOT_FOUND`            | 404         | Resource not found           |
| `CONFLICT`             | 409         | Duplicate or state conflict  |
| `TENANT_MISMATCH`      | 403         | Cross-tenant access detected |
| `RATE_LIMITED`         | 429         | Too many requests            |
| `INTERNAL_ERROR`       | 500         | Unhandled server error       |
| `DEPENDENCY_FAILURE`   | 502         | External service error       |
| `IDEMPOTENCY_CONFLICT` | 409         | Duplicate idempotent request |

### Exception Filter

```typescript
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let code = "INTERNAL_ERROR";
    let message = "An unexpected error occurred";
    let details: any = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exResponse = exception.getResponse();

      if (exception instanceof BadRequestException) {
        code = "VALIDATION_ERROR";
        message = "Validation failed";
        details = (exResponse as any).message;
      } else if (exception instanceof UnauthorizedException) {
        code = "UNAUTHORIZED";
      } else if (exception instanceof ForbiddenException) {
        code = "FORBIDDEN";
      } else if (exception instanceof NotFoundException) {
        code = "NOT_FOUND";
      } else if (exception instanceof ConflictException) {
        code = "CONFLICT";
      }
    }

    response.status(status).json({
      success: false,
      error: { code, message, details },
    });
  }
}
```

---

## Controller Structure

Each domain module contains one controller per aggregate root:

```typescript
@Controller("commerce/products")
@UseGuards(JwtAuthGuard, TenantGuard, PermissionGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Permissions("product:read")
  async findAll(
    @Query() query: PaginationQueryDto,
    @CurrentTenant() tenant: TenantContext,
  ): Promise<PaginatedResult<ProductResponseDto>> {
    return this.productsService.findAll(tenant.id, query);
  }

  @Get(":id")
  @Permissions("product:read")
  async findOne(
    @Param("id", ParseUuidPipe) id: string,
    @CurrentTenant() tenant: TenantContext,
  ): Promise<ProductResponseDto> {
    return this.productsService.findOne(tenant.id, id);
  }

  @Post()
  @Permissions("product:create")
  async create(
    @Body() dto: CreateProductDto,
    @CurrentTenant() tenant: TenantContext,
  ): Promise<ProductResponseDto> {
    return this.productsService.create(tenant.id, dto);
  }

  @Patch(":id")
  @Permissions("product:update")
  async update(
    @Param("id", ParseUuidPipe) id: string,
    @Body() dto: UpdateProductDto,
    @CurrentTenant() tenant: TenantContext,
  ): Promise<ProductResponseDto> {
    return this.productsService.update(tenant.id, id, dto);
  }

  @Delete(":id")
  @Permissions("product:delete")
  async remove(
    @Param("id", ParseUuidPipe) id: string,
    @CurrentTenant() tenant: TenantContext,
  ): Promise<void> {
    return this.productsService.remove(tenant.id, id);
  }
}
```

### Module Registration

```typescript
@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [ProductsController, CategoriesController, VariantsController],
  providers: [ProductsService, CategoriesService, VariantsService],
  exports: [ProductsService],
})
export class CommerceModule {}
```

---

## DTO / Validation

```typescript
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  slug: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsObject()
  metafields?: Record<string, any>;

  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  @ArrayMinSize(1)
  variants: CreateVariantDto[];
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  slug?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string | null;

  @IsOptional()
  @IsObject()
  metafields?: Record<string, any>;
}
```

### Global Validation Pipe

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // Strip unknown properties
    forbidNonWhitelisted: true, // Throw on unknown properties
    transform: true, // Auto-transform types (string → number)
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
);
```

---

## Guard Hierarchy

Guards execute in declared order. The chain is defined globally and overridable per controller:

```typescript
// Global registration (main.ts)
app.useGlobalGuards(
  new JwtAuthGuard(reflector), // 1. Verify JWT, populate req.user
  new TenantGuard(reflector), // 2. Extract tenant from JWT, populate req.tenant
  new PermissionGuard(reflector), // 3. Check @Permissions decorator
);
```

| Order | Guard             | Responsibility         | Pass Condition                                  |
| ----- | ----------------- | ---------------------- | ----------------------------------------------- |
| 1     | `JwtAuthGuard`    | Verify access token    | Valid JWT in `Authorization: Bearer` header     |
| 2     | `TenantGuard`     | Scope user to tenant   | User's tenant ID matches route context          |
| 3     | `PermissionGuard` | Check RBAC permissions | User's role includes required `resource:action` |

The `@Public()` decorator bypasses `JwtAuthGuard`:

```typescript
@Public()
@Post('register')
async register(@Body() dto: RegisterDto) { ... }
```

The `@Permissions()` decorator feeds `PermissionGuard`:

```typescript
@Permissions('order:read')
@Get(':id')
async findOne(@Param('id') id: string) { ... }
```

---

## Interceptor Stack

Interceptors execute in registration order (outer → inner on request, inner → outer on response):

```typescript
app.useGlobalInterceptors(
  new LoggingInterceptor(), // 1. Log request/response
  new RequestIdInterceptor(), // 2. Attach X-Request-Id
  new TenantInterceptor(), // 3. Resolve tenant context
  new SerializeInterceptor(), // 4. Strip @Exclude() fields
  new TransformInterceptor(), // 5. Wrap in { success, data, meta }
);
```

| Order | Interceptor            | Request Action                 | Response Action                                   |
| ----- | ---------------------- | ------------------------------ | ------------------------------------------------- |
| 1     | `LoggingInterceptor`   | Log method, URL, timestamp     | Log status, duration                              |
| 2     | `RequestIdInterceptor` | Generate/inject `X-Request-Id` | Set response header                               |
| 3     | `TenantInterceptor`    | Resolve tenant to context      | —                                                 |
| 4     | `SerializeInterceptor` | —                              | Strip `@Exclude()` fields via `class-transformer` |
| 5     | `TransformInterceptor` | —                              | Wrap in standard envelope                         |

---

## Exception Filters

```typescript
// Global registration order
app.useGlobalFilters(
  new PrismaClientExceptionFilter(), // Prisma errors → standard codes
  new AllExceptionsFilter(), // Catch-all → standard format
);
```

| Filter                        | Handles                                | Mapping                                           |
| ----------------------------- | -------------------------------------- | ------------------------------------------------- |
| `PrismaClientExceptionFilter` | `Prisma.PrismaClientKnownRequestError` | P2002 → `CONFLICT`, P2025 → `NOT_FOUND`           |
| `AllExceptionsFilter`         | All other exceptions                   | `HttpException` subclasses → standard error codes |

---

## API Module Listing

| Module        | Prefix           | Controllers                                                                                                                                                                                    | Phase |
| ------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| Auth          | `/auth`          | `AuthController`                                                                                                                                                                               | P1    |
| Platform      | `/platform`      | `TenantsController`, `UsersController`, `RolesController`, `PermissionsController`                                                                                                             | P1    |
| Commerce      | `/commerce`      | `ProductsController`, `CategoriesController`, `VariantsController`, `CartsController`, `CheckoutController`, `OrdersController`, `PromotionsController`, `ShippingController`, `TaxController` | P1    |
| Experience    | `/experience`    | `PagesController`, `ThemesController`, `TemplatesController`, `WidgetsController`                                                                                                              | P2    |
| Communication | `/communication` | `NotificationsController`, `WebhooksController`, `TemplatesController`                                                                                                                         | P2    |
| File          | `/files`         | `UploadsController`, `AssetsController`                                                                                                                                                        | P2    |
| Webhook       | `/webhooks`      | `InboundWebhooksController`                                                                                                                                                                    | P2    |
| Admin         | `/admin`         | `DashboardController`, `AuditLogsController`, `SettingsController`                                                                                                                             | P3    |

---

## File Upload Pattern

Two strategies supported:

### 1. Direct Upload (Small Files, < 10 MB)

```
POST /api/v1/files/upload
Content-Type: multipart/form-data

{
  "file": (binary),
  "folder": "products",
  "visibility": "public" | "private"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "url": "https://r2.example.com/products/abc.jpg",
    "key": "products/abc.jpg",
    "size": 204800,
    "mimeType": "image/jpeg"
  }
}
```

### 2. Presigned URL (Large Files, > 10 MB)

```
POST /api/v1/files/presign
{
  "filename": "catalog-export.csv",
  "contentType": "text/csv",
  "size": 52428800
}
```

Response:

```json
{
  "success": true,
  "data": {
    "uploadUrl": "https://r2.example.com/...?Signature=...",
    "publicUrl": "https://r2.example.com/uploads/catalog-export.csv",
    "key": "uploads/catalog-export.csv"
  }
}
```

Controller pattern:

```typescript
@Post('upload')
@UseInterceptors(FileInterceptor('file'))
async upload(
  @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
        new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp|pdf|csv)$/ }),
      ],
    }),
  )
  file: Express.Multer.File,
  @Body('folder') folder: string,
) {
  return this.filesService.upload(file, folder);
}
```

---

## Webhook Pattern

### Outbound Webhooks (Events → External)

Events are published to a BullMQ queue and delivered by a webhook worker:

```typescript
// Event types
type WebhookEvent =
  | "order.created"
  | "order.updated"
  | "order.cancelled"
  | "product.created"
  | "product.updated"
  | "product.deleted"
  | "customer.created"
  | "stock.low"
  | "payment.completed"
  | "shipment.tracking";
```

Delivery envelope:

```json
{
  "id": "evt_uuid",
  "type": "order.created",
  "createdAt": "2026-07-25T12:00:00Z",
  "tenantId": "tenant_uuid",
  "data": { ... }
}
```

Signature verification header:

```
X-Webhook-Signature: t=1721808000,v1=base64_hmac_sha256(payload, secret)
```

Retry policy:

| Attempt | Delay             |
| ------- | ----------------- |
| 1       | 0s (instant)      |
| 2       | 30s               |
| 3       | 5m                |
| 4       | 30m               |
| 5       | 2h                |
| 6       | 6h                |
| Final   | Dead letter queue |

### Inbound Webhooks (External → Commerce OS)

```
POST /api/v1/webhooks/stripe
POST /api/v1/webhooks/shipstation
POST /api/v1/webhooks/sendgrid
```

Each handler verifies the platform-specific signature:

```typescript
@Controller("webhooks")
export class InboundWebhooksController {
  constructor(private readonly stripeWebhookService: StripeWebhookService) {}

  @Post("stripe")
  @Public() // No JWT — verified by signature
  @Header("stripe-signature")
  async handleStripe(
    @Req() req: Request,
    @Headers("stripe-signature") signature: string,
  ) {
    const event = this.stripeWebhookService.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
    return this.stripeWebhookService.process(event);
  }
}
```

### Webhook Module Configuration

```typescript
// Webhook registration per tenant
interface WebhookSubscription {
  id: string;
  tenantId: string;
  url: string; // HTTPS only
  events: WebhookEvent[]; // Subscribed event types
  secret: string; // HMAC signing secret
  retryCount: number; // Max retries (default: 6)
  timeoutMs: number; // Request timeout (default: 10000)
  isActive: boolean;
}
```
