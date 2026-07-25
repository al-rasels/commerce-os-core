# OpenAPI / Swagger Documentation (Feature 3.3)

## 1. Swagger Setup

```typescript
// main.ts
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

const config = new DocumentBuilder()
  .setTitle("Commerce OS API")
  .setVersion("1.0")
  .setDescription("Multi-tenant commerce platform API")
  .addBearerAuth(
    { type: "http", scheme: "bearer", bearerFormat: "JWT", in: "header" },
    "access-token",
  )
  .addGlobalParameters({
    name: "x-csrf-token",
    in: "header",
    required: false,
    description: "CSRF protection token (required for state-changing requests)",
  })
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup("api/docs", app, document, {
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
  },
});
```

| Step                   | Purpose                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| `createDocument()`     | Generate OpenAPI 3.0 spec from all controllers, DTOs, decorators |
| `setup()`              | Mount SwaggerUI at `/api/docs` (excluded from global prefix)     |
| `persistAuthorization` | Keep Bearer token filled across page reloads                     |

---

## 2. Configuration

| Property      | Value                                         |
| ------------- | --------------------------------------------- |
| Title         | `Commerce OS API`                             |
| Version       | `1.0`                                         |
| Description   | `Multi-tenant commerce platform API`          |
| Auth scheme   | Bearer JWT (RS256), scheme key `access-token` |
| Global params | `x-csrf-token` header (optional, documented)  |

---

## 3. Controller Decorators

```typescript
@Controller('commerce/products')
@ApiTags('Products')
export class ProductsController {
  @Get()
  @ApiOperation({ summary: 'List products', description: 'Paginated product list with filters' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 20 })
  @ApiQuery({ name: 'sort', type: String, required: false, example: 'created_at' })
  @ApiQuery({ name: 'order', enum: ['asc', 'desc'], required: false })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiPaginatedResponse(ProductResponseDto)
  @ApiErrorResponses([401, 403, 429])
  async findAll(@Query() query: PaginationQueryDto) { ... }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProductResponseDto })
  @ApiErrorResponses([401, 403, 404])
  async findOne(@Param('id') id: string) { ... }

  @Post()
  @ApiOperation({ summary: 'Create product' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: ProductResponseDto })
  @ApiErrorResponses([400, 401, 403, 409])
  async create(@Body() dto: CreateProductDto) { ... }
}
```

| Decorator                                 | Purpose                                   |
| ----------------------------------------- | ----------------------------------------- |
| `@ApiTags('Products')`                    | Group endpoints under "Products" section  |
| `@ApiOperation({ summary, description })` | Human-readable endpoint docs              |
| `@ApiResponse({ status, type })`          | Declare response shapes                   |
| `@ApiBearerAuth()`                        | Mark endpoint as requiring Bearer token   |
| `@ApiQuery()`                             | Document pagination / filter query params |

---

## 4. DTO Annotations

```typescript
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({
    description: "Product display name",
    example: "Classic T-Shirt",
    maxLength: 255,
  })
  name: string;

  @ApiProperty({
    description: "URL-friendly identifier",
    example: "classic-t-shirt",
    maxLength: 255,
  })
  slug: string;

  @ApiPropertyOptional({
    description: "Product description (markdown)",
    example: "A comfortable cotton t-shirt...",
    maxLength: 5000,
  })
  description?: string;

  @ApiPropertyOptional({
    description: "Category UUID",
    example: "a1b2c3d4-...",
    format: "uuid",
  })
  categoryId?: string;

  @ApiProperty({ description: "Initial variants", type: [CreateVariantDto] })
  variants: CreateVariantDto[];
}

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: "Product display name",
    example: "Classic T-Shirt V2",
  })
  name?: string;

  @ApiPropertyOptional({
    description: "URL-friendly identifier",
    example: "classic-t-shirt-v2",
  })
  slug?: string;

  @ApiPropertyOptional({
    description: "Product description (markdown)",
    nullable: true,
  })
  description?: string | null;

  @ApiPropertyOptional({
    description: "Category UUID or null to uncategorize",
    nullable: true,
    format: "uuid",
  })
  categoryId?: string | null;
}

export class ProductResponseDto {
  @ApiProperty({
    description: "Product UUID",
    example: "a1b2c3d4-...",
    format: "uuid",
  })
  id: string;

  @ApiProperty({ description: "Product name", example: "Classic T-Shirt" })
  name: string;

  @ApiProperty({ description: "URL slug", example: "classic-t-shirt" })
  slug: string;

  @ApiPropertyOptional({
    description: "Product description",
    example: "A comfortable cotton t-shirt",
  })
  description?: string;

  @ApiProperty({
    description: "ISO creation timestamp",
    example: "2026-07-25T12:00:00Z",
    format: "date-time",
  })
  createdAt: Date;

  @ApiProperty({
    description: "ISO last-updated timestamp",
    example: "2026-07-25T12:00:00Z",
    format: "date-time",
  })
  updatedAt: Date;
}
```

| Prop                     | Usage                                    |
| ------------------------ | ---------------------------------------- |
| `@ApiProperty()`         | Required field with full metadata        |
| `@ApiPropertyOptional()` | Optional field (required: false implied) |
| `description`            | What the field is for                    |
| `example`                | Realistic sample value for SwaggerUI     |
| `format`                 | `uuid`, `date-time`, `email`, `uri`      |
| `nullable`               | Allow explicit null                      |

---

## 5. Paginated Response Schema

```typescript
// shared/decorators/api-paginated-response.decorator.ts
export function ApiPaginatedResponse<T extends Type<any>>(model: T) {
  return applyDecorators(
    ApiExtraModels(PaginatedResponseDto, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDto) },
          {
            properties: {
              data: {
                type: "array",
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
}

export class PaginatedResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({
    properties: {
      page: { type: "number", example: 1 },
      limit: { type: "number", example: 20 },
      total: { type: "number", example: 150 },
      totalPages: { type: "number", example: 8 },
      hasNextPage: { type: "boolean", example: true },
      hasPreviousPage: { type: "boolean", example: false },
    },
  })
  meta: PaginationMetaDto;
}
```

Swagger auto-generates `data: ProductResponseDto[]` under the pagination envelope using `allOf` composition.

---

## 6. Auth Flow in Swagger

```
SwaggerUI → Authorize button (top-right)
  → Value: "eyJhbGciOiJSUzI1NiI9..."
  → Scheme: Bearer (from addBearerAuth())
  → persistAuthorization: true → survives page refresh
```

The Authorize button is added by `.addBearerAuth()`. All endpoints decorated with `@ApiBearerAuth()` show a lock icon and pass the token in `Authorization: Bearer <token>`.

---

## 7. CSRF Header Documentation

Documented as a global parameter so all requests show it in SwaggerUI:

```typescript
.addGlobalParameters({
  name: 'x-csrf-token',
  in: 'header',
  required: false,
  description: 'CSRF protection token. Required for POST/PATCH/DELETE.',
  schema: { type: 'string', example: 'csrf_abc123...' },
})
```

---

## 8. Standard Error Response Schema

```typescript
export class ApiErrorResponseDto {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({
    properties: {
      code: { type: "string", example: "VALIDATION_ERROR" },
      message: { type: "string", example: "Validation failed" },
      details: {
        type: "object",
        nullable: true,
        example: { name: ["name must be a string"] },
      },
    },
  })
  error: ApiErrorDetailDto;
}
```

| Status | Code               | When                             |
| ------ | ------------------ | -------------------------------- |
| 400    | `VALIDATION_ERROR` | DTO validation failure           |
| 401    | `UNAUTHORIZED`     | Missing / invalid / expired JWT  |
| 403    | `FORBIDDEN`        | Insufficient role / permissions  |
| 404    | `NOT_FOUND`        | Resource UUID does not exist     |
| 409    | `CONFLICT`         | Duplicate slug, version conflict |
| 429    | `RATE_LIMITED`     | Too many requests                |
| 500    | `INTERNAL_ERROR`   | Unhandled server exception       |

---

## 9. API Groups (Tags)

| @ApiTags()   | Endpoints                | Module        |
| ------------ | ------------------------ | ------------- |
| `Auth`       | `/auth/*`                | auth          |
| `Tenants`    | `/platform/tenants/*`    | platform      |
| `Users`      | `/platform/users/*`      | platform      |
| `Roles`      | `/platform/roles/*`      | platform      |
| `Products`   | `/commerce/products/*`   | commerce      |
| `Categories` | `/commerce/categories/*` | commerce      |
| `Orders`     | `/commerce/orders/*`     | commerce      |
| `Carts`      | `/commerce/carts/*`      | commerce      |
| `Checkout`   | `/commerce/checkout/*`   | commerce      |
| `Shipping`   | `/commerce/shipping/*`   | commerce      |
| `Promotions` | `/commerce/promotions/*` | commerce      |
| `Webhooks`   | `/webhooks/*`            | communication |
| `Files`      | `/files/*`               | file          |

---

## 10. Custom Decorators

```typescript
// shared/decorators/api-error-responses.decorator.ts
export function ApiErrorResponses(statuses: number[]) {
  const decorators = statuses.map(status => {
    const responses = {
      400: ApiResponse({ status: 400, description: 'Validation error', type: ApiErrorResponseDto }),
      401: ApiResponse({ status: 401, description: 'Missing or invalid token', type: ApiErrorResponseDto }),
      403: ApiResponse({ status: 403, description: 'Insufficient permissions', type: ApiErrorResponseDto }),
      404: ApiResponse({ status: 404, description: 'Resource not found', type: ApiErrorResponseDto }),
      409: ApiResponse({ status: 409, description: 'Conflict (duplicate / version)', type: ApiErrorResponseDto }),
      429: ApiResponse({ status: 429, description: 'Rate limited', type: ApiErrorResponseDto }),
      500: ApiResponse({ status: 500, description: 'Internal server error', type: ApiErrorResponseDto }),
    };
    return responses[status];
  });
  return applyDecorators(...decorators);
}

// Usage
@Get(':id')
@ApiBearerAuth()
@ApiOperation({ summary: 'Get product by ID' })
@ApiResponse({ status: 200, type: ProductResponseDto })
@ApiErrorResponses([401, 403, 404])
async findOne(@Param('id') id: string) { ... }
```

Shared decorators eliminate repetitive `@ApiResponse({ status, ... })` lines across every controller, making docs consistent and reducing boilerplate by ~60 %.
