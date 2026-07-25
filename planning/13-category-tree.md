# Feature 1.2 — Category Tree

## 1. Endpoints

| Method   | Path                              | Description               |
| -------- | --------------------------------- | ------------------------- |
| `POST`   | `/api/v1/categories`              | Create category           |
| `GET`    | `/api/v1/categories`              | List flat categories      |
| `GET`    | `/api/v1/categories/tree`         | Return nested tree        |
| `GET`    | `/api/v1/categories/:id`          | Get single category       |
| `PUT`    | `/api/v1/categories/:id`          | Update category           |
| `DELETE` | `/api/v1/categories/:id`          | Delete category           |
| `GET`    | `/api/v1/categories/:id/products` | List products in category |

### Tenant Scoping

All endpoints are tenant-scoped via `TenantGuard`. The `tenantId` is injected from the JWT or header; every query includes `WHERE tenantId = ?`.

---

## 2. Data Model

### Prisma Schema

```prisma
model Category {
  id          String     @id @default(cuid())
  name        String
  slug        String
  description String?
  sortOrder   Int        @default(0)
  parentId    String?
  parent      Category?  @relation("CategoryTree", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryTree")
  products    Product[]
  tenantId    String
  tenant      Tenant     @relation(fields: [tenantId], references: [id])
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@unique([tenantId, slug, parentId])
  @@index([tenantId, parentId])
}
```

### `@@unique([tenantId, slug, parentId])`

Slug uniqueness is scoped to `(tenantId, parentId)` — two siblings cannot share a slug, but categories in different branches can.

---

## 3. Tree Representation — Adjacency List

| Model              | Pros                                   | Cons                                       | Best for                                      |
| ------------------ | -------------------------------------- | ------------------------------------------ | --------------------------------------------- |
| **Adjacency list** | Simple schema, single table, easy CRUD | Multi-level fetch requires recursive query | Moderate depth (< 10 levels), frequent writes |
| Nested set         | Single query for full tree             | Expensive writes, complex rebalancing      | Static trees, read-heavy                      |
| Closure table      | Fast reads, easy moves                 | Extra table, write overhead                | Deep hierarchies with frequent moves          |

**Chosen: Adjacency list + recursive CTE.** Categories typically have 2–4 levels; the query cost is negligible. Schema stays simple (no extra tables, no lft/rgt maintenance).

### Recursive Tree Query (PostgreSQL)

```sql
WITH RECURSIVE cat_tree AS (
  -- Anchor: roots
  SELECT id, name, slug, description, sort_order, parent_id, tenant_id, 0 AS depth, ARRAY[id] AS path
  FROM "Category"
  WHERE parent_id IS NULL AND tenant_id = $1

  UNION ALL

  -- Recurse: children
  SELECT c.id, c.name, c.slug, c.description, c.sort_order, c.parent_id, c.tenant_id,
         ct.depth + 1, ct.path || c.id
  FROM "Category" c
  INNER JOIN cat_tree ct ON c.parent_id = ct.id
  WHERE c.tenant_id = $1
)
SELECT * FROM cat_tree
ORDER BY path, sort_order;
```

### Prisma Raw Query (NestJS)

```typescript
async function getTree(tenantId: string): Promise<CategoryTreeNode[]> {
  const rows: CategoryRaw[] = await prisma.$queryRawUnsafe(
    `
    WITH RECURSIVE cat_tree AS (
      SELECT id, name, slug, description, sort_order, parent_id, tenant_id, 0 AS depth
      FROM "Category" WHERE parent_id IS NULL AND tenant_id = $1
      UNION ALL
      SELECT c.id, c.name, c.slug, c.description, c.sort_order, c.parent_id, c.tenant_id,
             ct.depth + 1
      FROM "Category" c INNER JOIN cat_tree ct ON c.parent_id = ct.id
      WHERE c.tenant_id = $1
    )
    SELECT * FROM cat_tree ORDER BY sort_order
  `,
    tenantId,
  );

  return buildTree(rows as CategoryFlat[]);
}
```

---

## 4. Response Format

### Flat DTO

```typescript
class CategoryDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  parentId: string | null;
  tenantId: string;
}
```

### Tree DTO

```typescript
class CategoryTreeNodeDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  children: CategoryTreeNodeDto[];
}
```

### Tree Response — `GET /api/v1/categories/tree`

```json
{
  "data": [
    {
      "id": "cat_1",
      "name": "Electronics",
      "slug": "electronics",
      "sortOrder": 0,
      "children": [
        {
          "id": "cat_2",
          "name": "Laptops",
          "slug": "laptops",
          "sortOrder": 0,
          "children": []
        },
        {
          "id": "cat_3",
          "name": "Phones",
          "slug": "phones",
          "sortOrder": 1,
          "children": [
            {
              "id": "cat_4",
              "name": "Smartphones",
              "slug": "smartphones",
              "sortOrder": 0,
              "children": []
            }
          ]
        }
      ]
    }
  ]
}
```

### Flat List — `GET /api/v1/categories`

```json
{
  "data": [
    {
      "id": "cat_1",
      "name": "Electronics",
      "slug": "electronics",
      "parentId": null,
      "sortOrder": 0
    },
    {
      "id": "cat_2",
      "name": "Laptops",
      "slug": "laptops",
      "parentId": "cat_1",
      "sortOrder": 0
    },
    {
      "id": "cat_3",
      "name": "Phones",
      "slug": "phones",
      "parentId": "cat_1",
      "sortOrder": 1
    },
    {
      "id": "cat_4",
      "name": "Smartphones",
      "slug": "smartphones",
      "parentId": "cat_3",
      "sortOrder": 0
    }
  ]
}
```

---

## 5. Tree Builder Function

```typescript
function buildTree(flat: CategoryFlat[]): CategoryTreeNodeDto[] {
  const map = new Map<string, CategoryTreeNodeDto>();
  const roots: CategoryTreeNodeDto[] = [];

  for (const item of flat) {
    map.set(item.id, { ...item, children: [] });
  }

  for (const item of flat) {
    const node = map.get(item.id)!;
    if (item.parentId && map.has(item.parentId)) {
      map.get(item.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  // Sort children within each parent
  for (const node of map.values()) {
    node.children.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  return roots.sort((a, b) => a.sortOrder - b.sortOrder);
}
```

---

## 6. Sort Order

| Rule        | Description                                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| Default     | `sortOrder = 0`                                                                                                |
| Ordering    | Categories returned ascending by `sortOrder`, grouped within same parent                                       |
| API sorting | Flat list: `ORDER BY parent_id NULLS FIRST, sort_order ASC`. Tree: sorted at each nesting level in the builder |

---

## 7. Product Assignment

```prisma
model Product {
  categoryId  String?
  category    Category? @relation(fields: [categoryId], references: [id])
}
```

```typescript
// GET /api/v1/categories/:id/products
@Get(':id/products')
async getProducts(
  @Param('id') id: string,
  @Query() query: PaginationDto,
) {
  const category = await this.categoryService.findById(id);
  return this.productService.findByCategory(category.id, query);
}
```

---

## 8. Validation

### Circular Reference Check (on Update)

```typescript
async validateNoCircularRef(id: string, newParentId: string): Promise<void> {
  if (id === newParentId) {
    throw new BadRequestException('Category cannot be its own parent');
  }

  // Walk up the tree from newParentId — if we reach id, it's a loop
  let current = newParentId;
  while (current) {
    const parent = await this.categoryRepo.findById(current);
    if (!parent?.parentId) break;
    if (parent.parentId === id) {
      throw new BadRequestException('Circular reference detected');
    }
    current = parent.parentId;
  }
}
```

### Deletion Guard

| Scenario     | Force = false                    | Force = true                                          |
| ------------ | -------------------------------- | ----------------------------------------------------- |
| Has children | `Blocked` — `400 CHILDREN_EXIST` | Blocked                                               |
| Has products | `Blocked` — `400 PRODUCTS_EXIST` | Deletes + unlinks products (sets `categoryId = null`) |
| Empty        | Deleted                          | Deleted                                               |

```typescript
@Delete(':id')
async delete(@Param('id') id: string, @Query('force') force?: boolean) {
  const childCount = await this.categoryRepo.countChildren(id);
  if (childCount > 0) {
    throw new BadRequestException(CATEGORY_HAS_CHILDREN);
  }

  const productCount = await this.productRepo.countByCategory(id);
  if (productCount > 0 && !force) {
    throw new BadRequestException(CATEGORY_HAS_PRODUCTS);
  }

  if (productCount > 0 && force) {
    await this.productRepo.unlinkCategory(id);
  }

  await this.categoryRepo.delete(id);
}
```

---

## 9. Slug Generation

```typescript
async function generateSlug(
  name: string,
  tenantId: string,
  parentId: string | null,
): Promise<string> {
  let slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const existing = await prisma.category.findMany({
    where: { tenantId, parentId, slug: { startsWith: slug } },
    select: { slug: true },
  });

  if (!existing.find((c) => c.slug === slug)) return slug;

  // Collision — append incrementing suffix
  let counter = 1;
  while (existing.find((c) => c.slug === `${slug}-${counter}`)) {
    counter++;
  }
  return `${slug}-${counter}`;
}
```

Slug is regenerated on `name` change. Manual slug override allowed via explicit `slug` field in `UpdateCategoryDto`.

---

## 10. Test Cases

```typescript
it("creates a root category", async () => {
  const res = await request(app)
    .post("/api/v1/categories")
    .send({ name: "Electronics" })
    .set("Authorization", bearerToken);

  expect(res.status).toBe(201);
  expect(res.body.data.name).toBe("Electronics");
  expect(res.body.data.parentId).toBeNull();
});

it("creates a child category", async () => {
  const root = await createCategory("Clothing");
  const res = await request(app)
    .post("/api/v1/categories")
    .send({ name: "Shirts", parentId: root.id })
    .set("Authorization", bearerToken);

  expect(res.status).toBe(201);
  expect(res.body.data.parentId).toBe(root.id);
});

it("returns nested tree", async () => {
  // Setup: Home → (Living, Kitchen)
  const home = await createCategory("Home");
  await createCategory("Living", home.id);
  await createCategory("Kitchen", home.id);

  const res = await request(app)
    .get("/api/v1/categories/tree")
    .set("Authorization", bearerToken);

  expect(res.body.data).toHaveLength(1);
  expect(res.body.data[0].children).toHaveLength(2);
});

it("blocks circular reference on update", async () => {
  const a = await createCategory("A");
  const b = await createCategory("B", a.id);

  const res = await request(app)
    .put(`/api/v1/categories/${a.id}`)
    .send({ parentId: b.id })
    .set("Authorization", bearerToken);

  expect(res.status).toBe(400);
  expect(res.body.error.code).toBe("CIRCULAR_REFERENCE");
});

it("deletes category with force flag when products exist", async () => {
  const cat = await createCategory("Clearance");
  await assignProductToCategory(cat.id);

  // Without force
  const blocked = await request(app)
    .delete(`/api/v1/categories/${cat.id}`)
    .set("Authorization", bearerToken);
  expect(blocked.status).toBe(400);

  // With force
  const ok = await request(app)
    .delete(`/api/v1/categories/${cat.id}?force=true`)
    .set("Authorization", bearerToken);
  expect(ok.status).toBe(200);
});
```

---

## 11. Edge Cases

| Edge Case                        | Behaviour                                      |
| -------------------------------- | ---------------------------------------------- |
| Orphan parentId                  | `400` — `PARENT_NOT_FOUND`                     |
| Duplicate slug at same level     | Auto-suffixed (`electronics-1`)                |
| Move category to itself          | Blocked by circular check                      |
| Deeply nested tree (> 10 levels) | Recursive CTE handles it; no hard limit        |
| Race condition on delete         | Wrap in Prisma transaction with `$transaction` |
