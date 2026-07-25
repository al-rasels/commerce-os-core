# Product CRUD — Feature 1.1

## 1. Endpoints

| Method   | Path                             | Auth        | Permission       |
| -------- | -------------------------------- | ----------- | ---------------- |
| `POST`   | `/api/v1/products`               | JWT         | `catalog.write`  |
| `GET`    | `/api/v1/products`               | JWT         | `catalog.read`   |
| `GET`    | `/api/v1/products/:id`           | JWT         | `catalog.read`   |
| `PUT`    | `/api/v1/products/:id`           | JWT         | `catalog.write`  |
| `DELETE` | `/api/v1/products/:id`           | JWT         | `catalog.write`  |
| `POST`   | `/api/v1/products/:id/restore`   | JWT         | `catalog.write`  |
| `GET`    | `/api/v1/products/admin/deleted` | JWT (admin) | `catalog.manage` |

---

## 2. Product Fields

| Field            | Type                        | Required | Default             |
| ---------------- | --------------------------- | -------- | ------------------- |
| `id`             | `UUID`                      | auto     | —                   |
| `name`           | `string`                    | yes      | —                   |
| `slug`           | `string`                    | auto     | generated from name |
| `description`    | `string`                    | no       | `null`              |
| `price`          | `number` (cents)            | yes      | —                   |
| `compareAtPrice` | `number`                    | no       | `null`              |
| `costPrice`      | `number`                    | no       | `null`              |
| `sku`            | `string`                    | yes      | unique per tenant   |
| `barcode`        | `string`                    | no       | `null`              |
| `weight`         | `number` (grams)            | no       | `null`              |
| `dimensions`     | `Json`                      | no       | `null`              |
| `status`         | `draft │ active │ archived` | no       | `draft`             |
| `images`         | `Json[]`                    | no       | `[]`                |
| `categoryId`     | `UUID`                      | no       | `null`              |
| `tags`           | `string[]`                  | no       | `[]`                |
| `deletedAt`      | `DateTime?`                 | auto     | `null`              |
| `tenantId`       | `UUID`                      | auto     | from JWT            |
| `metafields`     | `Json`                      | no       | `{}`                |

---

## 3. Soft Delete

```
DELETE /:id  →  SET deleted_at = now()
GET /        →  WHERE deleted_at IS NULL
GET /admin/deleted  →  WHERE deleted_at IS NOT NULL
POST /:id/restore   →  SET deleted_at = NULL
```

---

## 4. Slug Generation

```
slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
If slug exists → append -1, -2, ... until unique
DB constraint: @@unique([tenant_id, slug])
```

---

## 5. Search & Filtering (query params on `GET /`)

| Param        | Type     | Behaviour                        |
| ------------ | -------- | -------------------------------- |
| `search`     | `string` | ILIKE on name + description      |
| `tags`       | `string` | Postgres `hasSome` array overlap |
| `minPrice`   | `number` | `price_cents >=`                 |
| `maxPrice`   | `number` | `price_cents <=`                 |
| `status`     | `enum`   | Exact match                      |
| `categoryId` | `UUID`   | Exact match                      |
| `page`       | `number` | Default 1                        |
| `limit`      | `number` | Default 20, max 100              |
| `sort`       | `string` | `field:direction`                |

---

## 6. Validation

| DTO                  | Rules                                                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `CreateProductDto`   | `name`: `@IsNotEmpty`, `@Length(1,255)`; `price`: `@IsNumber`, `@Min(1)`; `sku`: `@IsNotEmpty`, unique per tenant; others optional |
| `UpdateProductDto`   | All optional + nullable for field clearing                                                                                         |
| `ProductFilterDto`   | All optional; `tags` comma-separated → array via `@Transform`                                                                      |
| `ProductResponseDto` | `@Exclude` `deletedAt`, `tenantId`, `metafields`                                                                                   |

---

## 7. ProductService

```typescript
@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(ctx: TenantContext, dto: CreateProductDto) {
    const slug = await this.resolveSlug(ctx, dto.name);
    if (
      await this.prisma.product.findFirst({
        where: { tenant_id: ctx.tenantId, sku: dto.sku, deleted_at: null },
      })
    )
      throw new ConflictException("SKU already exists");
    return this.prisma.product.create({
      data: {
        tenant_id: ctx.tenantId,
        name: dto.name,
        slug,
        sku: dto.sku,
        price_cents: Math.round(dto.price),
        description: dto.description,
        status: dto.status ?? "draft",
        category_id: dto.categoryId,
        tags: dto.tags ?? [],
        images_json: dto.images ?? [],
        barcode: dto.barcode,
        weight_grams: dto.weight,
        dimensions_json: dto.dimensions,
        compare_at_price_cents: dto.compareAtPrice
          ? Math.round(dto.compareAtPrice)
          : null,
        cost_price_cents: dto.costPrice ? Math.round(dto.costPrice) : null,
      },
    });
  }

  async findAll(ctx: TenantContext, filter: ProductFilterDto) {
    const where: any = { tenant_id: ctx.tenantId, deleted_at: null };
    if (filter.search)
      where.OR = [
        { name: { contains: filter.search, mode: "insensitive" } },
        { description: { contains: filter.search, mode: "insensitive" } },
      ];
    if (filter.tags?.length) where.tags = { hasSome: filter.tags };
    if (filter.status) where.status = filter.status;
    if (filter.categoryId) where.category_id = filter.categoryId;
    if (filter.minPrice) where.price_cents = { gte: filter.minPrice };
    if (filter.maxPrice)
      where.price_cents = { ...where.price_cents, lte: filter.maxPrice };
    const page = filter.page ?? 1,
      limit = Math.min(filter.limit ?? 20, 100);
    const [sortField, sortDir] = (filter.sort ?? "createdAt:desc").split(":");
    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortField]: sortDir ?? "desc" },
      }),
      this.prisma.product.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(ctx: TenantContext, id: string) {
    const p = await this.prisma.product.findFirst({
      where: { id, tenant_id: ctx.tenantId },
    });
    if (!p) throw new NotFoundException();
    return p;
  }

  async update(ctx: TenantContext, id: string, dto: UpdateProductDto) {
    await this.findOne(ctx, id);
    if (dto.sku) {
      if (
        await this.prisma.product.findFirst({
          where: {
            tenant_id: ctx.tenantId,
            sku: dto.sku,
            id: { not: id },
            deleted_at: null,
          },
        })
      )
        throw new ConflictException("SKU already exists");
    }
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async softDelete(ctx: TenantContext, id: string) {
    await this.findOne(ctx, id);
    await this.prisma.product.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return { success: true };
  }

  async restore(ctx: TenantContext, id: string) {
    const p = await this.prisma.product.findFirst({
      where: { id, tenant_id: ctx.tenantId, deleted_at: { not: null } },
    });
    if (!p) throw new NotFoundException();
    return this.prisma.product.update({
      where: { id },
      data: { deleted_at: null },
    });
  }

  async findDeleted(ctx: TenantContext, filter: ProductFilterDto) {
    const where = { tenant_id: ctx.tenantId, deleted_at: { not: null } };
    const page = filter.page ?? 1,
      limit = Math.min(filter.limit ?? 20, 100);
    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { deleted_at: "desc" },
      }),
      this.prisma.product.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  private async resolveSlug(ctx: TenantContext, name: string): Promise<string> {
    const base = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const existing = await this.prisma.product.findMany({
      where: {
        tenant_id: ctx.tenantId,
        slug: { startsWith: base },
        deleted_at: null,
      },
      select: { slug: true },
    });
    const slugs = new Set(existing.map((p) => p.slug));
    if (!slugs.has(base)) return base;
    let i = 1;
    while (slugs.has(`${base}-${i}`)) i++;
    return `${base}-${i}`;
  }
}
```

---

## 8. ProductController

```typescript
@Controller("v1/products")
@UseGuards(TenantAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @RequirePermissions("catalog.write")
  async create(
    @GetTenantContext() ctx: TenantContext,
    @Body() dto: CreateProductDto,
  ) {
    return this.productService.create(ctx, dto);
  }

  @Get()
  @RequirePermissions("catalog.read")
  async findAll(
    @GetTenantContext() ctx: TenantContext,
    @Query() filter: ProductFilterDto,
  ) {
    return this.productService.findAll(ctx, filter);
  }

  @Get(":id")
  @RequirePermissions("catalog.read")
  async findOne(
    @GetTenantContext() ctx: TenantContext,
    @Param("id") id: string,
  ) {
    return this.productService.findOne(ctx, id);
  }

  @Put(":id")
  @RequirePermissions("catalog.write")
  async update(
    @GetTenantContext() ctx: TenantContext,
    @Param("id") id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.update(ctx, id, dto);
  }

  @Delete(":id")
  @RequirePermissions("catalog.write")
  async remove(
    @GetTenantContext() ctx: TenantContext,
    @Param("id") id: string,
  ) {
    return this.productService.softDelete(ctx, id);
  }

  @Post(":id/restore")
  @RequirePermissions("catalog.write")
  async restore(
    @GetTenantContext() ctx: TenantContext,
    @Param("id") id: string,
  ) {
    return this.productService.restore(ctx, id);
  }

  @Get("admin/deleted")
  @RequirePermissions("catalog.manage")
  async findDeleted(
    @GetTenantContext() ctx: TenantContext,
    @Query() filter: ProductFilterDto,
  ) {
    return this.productService.findDeleted(ctx, filter);
  }
}
```

---

## 9. DTOs

### CreateProductDto

```typescript
export class CreateProductDto {
  @IsString() @IsNotEmpty() @Length(1, 255) name: string;
  @IsNumber() @Min(1) @Type(() => Number) price: number;
  @IsString() @IsNotEmpty() sku: string;
  @IsOptional() @IsEnum(ProductStatus) status?: ProductStatus;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsNumber() @Min(0) @Type(() => Number) compareAtPrice?: number;
  @IsOptional() @IsNumber() @Min(0) @Type(() => Number) costPrice?: number;
  @IsOptional() @IsString() barcode?: string;
  @IsOptional() @IsNumber() @Min(0) @Type(() => Number) weight?: number;
  @IsOptional()
  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensions?: DimensionsDto;
  @IsOptional() @IsUUID() categoryId?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[];
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[];
}
```

### ProductFilterDto

```typescript
export class ProductFilterDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) =>
    typeof value === "string" ? value.split(",") : value,
  )
  tags?: string[];
  @IsOptional() @IsNumber() @Min(0) @Type(() => Number) minPrice?: number;
  @IsOptional() @IsNumber() @Min(0) @Type(() => Number) maxPrice?: number;
  @IsOptional() @IsEnum(ProductStatus) status?: ProductStatus;
  @IsOptional() @IsUUID() categoryId?: string;
  @IsOptional() @Type(() => Number) @Min(1) page?: number;
  @IsOptional() @Type(() => Number) @Min(1) limit?: number;
  @IsOptional() @IsString() sort?: string;
}
```

---

## 10. Test Cases

```typescript
describe("Product CRUD (e2e)", () => {
  let app, authToken, adminToken, productId: string;

  it("POST / — creates a product", async () => {
    const res = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "Blue T-Shirt", price: 2999, sku: "BLU-TS-001" });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Blue T-Shirt");
    expect(res.body.status).toBe("draft");
    productId = res.body.id;
  });

  it("POST / — rejects duplicate SKU", async () => {
    const res = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "Red T-Shirt", price: 2999, sku: "BLU-TS-001" });
    expect(res.status).toBe(409);
  });

  it("GET / — lists products with pagination", async () => {
    const res = await request(app)
      .get("/api/v1/products?page=1&limit=10")
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.items).toBeInstanceOf(Array);
  });

  it("GET /:id — returns a product", async () => {
    const res = await request(app)
      .get(`/api/v1/products/${productId}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(productId);
  });

  it("PUT /:id — updates a product", async () => {
    const res = await request(app)
      .put(`/api/v1/products/${productId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "Blue T-Shirt V2", price: 3499 });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Blue T-Shirt V2");
  });

  it("DELETE /:id — soft deletes a product", async () => {
    const res = await request(app)
      .delete(`/api/v1/products/${productId}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("GET / — excludes deleted products from list", async () => {
    const res = await request(app)
      .get("/api/v1/products")
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.body.items.map((i) => i.id)).not.toContain(productId);
  });

  it("POST /:id/restore — restores a deleted product", async () => {
    const res = await request(app)
      .post(`/api/v1/products/${productId}/restore`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.deletedAt).toBeNull();
  });

  it("GET /?status=active — filters by status", async () => {
    await request(app)
      .put(`/api/v1/products/${productId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ status: "active" });
    const res = await request(app)
      .get("/api/v1/products?status=active")
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.body.items.every((i) => i.status === "active")).toBe(true);
  });

  it("GET /?search=blue — searches by name", async () => {
    const res = await request(app)
      .get("/api/v1/products?search=blue")
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.body.items.length).toBeGreaterThanOrEqual(1);
  });

  it("GET /admin/deleted — admin can list deleted products", async () => {
    await request(app)
      .delete(`/api/v1/products/${productId}`)
      .set("Authorization", `Bearer ${authToken}`);
    const res = await request(app)
      .get("/api/v1/products/admin/deleted")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.body.items.every((i) => i.deletedAt !== null)).toBe(true);
  });
});
```

---

## 11. Edge Cases

| Case                | Mitigation                                     |
| ------------------- | ---------------------------------------------- |
| Slug collision      | Auto-increment suffix + DB unique constraint   |
| SKU collision       | Pre-check in service; 409 Conflict             |
| Invalid price       | `@Min(1)` rejects zero/negative                |
| Huge limit          | Capped at 100 in service                       |
| Tags as CSV string  | `@Transform` splits on comma                   |
| Product not found   | `NotFoundException` before any mutation        |
| Restore non-deleted | Separate query checks `deleted_at IS NOT NULL` |
