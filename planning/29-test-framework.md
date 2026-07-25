# Test Framework (Feature 3.7)

## 1. Jest Configuration

```typescript
// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  rootDir: ".",
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: ".*\\.spec\\.ts$",
  transform: { "^.+\\.(t|j)s$": ["ts-jest", { tsconfig: "tsconfig.json" }] },
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/**/*.service.ts",
    "src/**/*.controller.ts",
    "src/**/*.resolver.ts",
    "!src/main.ts",
    "!src/**/*.module.ts",
    "!src/**/*.d.ts",
  ],
  coverageThreshold: {
    global: { branches: 70, functions: 70, lines: 70, statements: 70 },
    "src/**/*.service.ts": {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    "src/**/*.controller.ts": {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterSetup: ["<rootDir>/test/setup.ts"],
  globalTeardown: "<rootDir>/test/teardown.ts",
};

export default config;
```

```typescript
// test/global-setup.ts — spins up Testcontainers before all suites
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { RedisContainer } from "@testcontainers/redis";

export default async () => {
  const pg = await new PostgreSqlContainer("postgis/postgis:16-3.4")
    .withDatabase("commerce_os_test")
    .withUsername("test")
    .withPassword("test")
    .start();

  const redis = await new RedisContainer("redis:7-alpine").start();

  process.env.DATABASE_URL = pg.getConnectionUri();
  process.env.REDIS_URL = `redis://${redis.getHost()}:${redis.getPort()}`;
  process.env.TESTCONTAINERS = "true";

  (global as any).__TESTCONTAINERS__ = { pg, redis };
};
```

```typescript
// test/global-teardown.ts
export default async () => {
  const { pg, redis } = (global as any).__TESTCONTAINERS__ || {};
  await pg?.stop();
  await redis?.stop();
};
```

---

## 2. Folder Structure

```
src/
  modules/
    auth/
      auth.service.spec.ts        # Unit tests
      auth.controller.spec.ts
    product/
      product.service.spec.ts
      product.controller.spec.ts
    order/
      order.service.spec.ts
test/
  setup.ts                        # Global beforeAll
  teardown.ts                     # Global afterAll
  helpers/
    create-test-user.ts
    create-test-product.ts
    authenticate-request.ts
  factories/
    user.factory.ts
    product.factory.ts
    order.factory.ts
  app.e2e-spec.ts                 # E2E smoke test
jest.config.ts
```

---

## 3. Unit Tests (Mocked Prisma)

```typescript
// src/modules/auth/auth.service.spec.ts
import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { PrismaService } from "../../prisma/prisma.service";

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe("AuthService", () => {
  let service: AuthService;
  let prisma: typeof mockPrisma;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get(AuthService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => jest.clearAllMocks());

  it("creates a user with hashed password", async () => {
    const dto = { email: "test@example.com", password: "plaintext" };
    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockPrisma.user.create.mockResolvedValue({
      id: "1",
      email: "test@example.com",
      password_hash: expect.any(String),
    });

    const result = await service.register(dto);
    expect(result.email).toBe(dto.email);
    expect(mockPrisma.user.create).toHaveBeenCalledTimes(1);
  });

  it("throws on duplicate email", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: "1", email: dto.email });
    await expect(service.register(dto)).rejects.toThrow("Email already exists");
  });
});
```

| Pattern                            | Purpose                                            |
| ---------------------------------- | -------------------------------------------------- |
| `mockPrisma = { user: { … } }`     | Mock at model level, one fn per Prisma method used |
| `Test.createTestingModule`         | Full NestJS DI with overridden providers           |
| `afterEach(clearAllMocks)`         | Clean slate per test, no leak between cases        |
| `expect().toHaveBeenCalledTimes()` | Assert correct Prisma calls were made              |

---

## 4. Integration Tests (Testcontainers)

```typescript
// test/app.e2e-spec.ts
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";

describe("App (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    // Clean all tables before each test
    const tablenames = await prisma.$queryRawUnsafe<{ tablename: string }[]>(
      `SELECT tablename FROM pg_tables WHERE schemaname='public'`,
    );
    for (const { tablename } of tablenames) {
      if (tablename !== "_prisma_migrations") {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tablename}" CASCADE`);
      }
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it("GET /health returns 200", async () => {
    const res = await request(app.getHttpServer()).get("/health");
    expect(res.status).toBe(200);
  });

  it("creates a user via AuthService (real DB)", async () => {
    const auth = app.get(AuthService);
    const user = await auth.register({
      email: "e2e@test.com",
      password: "Test123!",
    });
    expect(user.id).toBeDefined();

    const found = await prisma.user.findUnique({
      where: { email: "e2e@test.com" },
    });
    expect(found).not.toBeNull();
  });
});
```

| Requirement | Implementation                                                  |
| ----------- | --------------------------------------------------------------- |
| Postgres    | `@testcontainers/postgresql` — ephemeral container per test run |
| Redis       | `@testcontainers/redis` — ephemeral container per test run      |
| Schema      | Prisma `migrate deploy` in `global-setup.ts`                    |
| Isolation   | `TRUNCATE … CASCADE` before each test                           |
| Speed       | Containers reuse across suites (stop only in global teardown)   |

---

## 5. Test Factories

```typescript
// test/factories/user.factory.ts
import { faker } from "@faker-js/faker";
import * as bcrypt from "bcrypt";

export interface CreateUserInput {
  email?: string;
  password?: string;
  tenantId?: string;
  role?: "ADMIN" | "MANAGER" | "VIEWER";
}

export async function createTestUser(
  prisma: PrismaService,
  overrides: CreateUserInput = {},
) {
  const password_hash = await bcrypt.hash(overrides.password ?? "Test123!", 10);
  return prisma.user.create({
    data: {
      email: overrides.email ?? faker.internet.email(),
      password_hash,
      tenantId: overrides.tenantId ?? "default-tenant",
      role: overrides.role ?? "VIEWER",
    },
  });
}
```

```typescript
// test/factories/product.factory.ts
export function productData(
  overrides: Partial<ProductInput> = {},
): ProductInput {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    sku: faker.string.alphanumeric(8).toUpperCase(),
    categoryId: overrides.categoryId ?? faker.string.uuid(),
    ...overrides,
  };
}
```

| Factory               | Fields                          | Override Pattern                     |
| --------------------- | ------------------------------- | ------------------------------------ |
| `createTestUser()`    | email, password, tenantId, role | Partial merge with sensible defaults |
| `productData()`       | name, description, price, sku   | Returns plain object (not persisted) |
| `createTestProduct()` | Same + categoryId               | Persists via Prisma, returns entity  |
| `createTestOrder()`   | userId, items, status           | Creates user, product, then order    |

---

## 6. Coverage Targets

| Layer                           | Target              | Enforced                              |
| ------------------------------- | ------------------- | ------------------------------------- |
| Services (`*.service.ts`)       | 90%+                | `coverageThreshold` in jest.config.ts |
| Controllers (`*.controller.ts`) | 80%+                | `coverageThreshold` in jest.config.ts |
| Global                          | 70%+                | `coverageThreshold` in jest.config.ts |
| E2E                             | Smoke coverage only | Manual review; no threshold           |

### Excluded from Coverage

| Pattern             | Reason                         |
| ------------------- | ------------------------------ |
| `*.module.ts`       | Boilerplate declarations only  |
| `main.ts`           | Bootstrap logic tested via E2E |
| `*.d.ts`            | Type declarations              |
| `prisma/` generated | Auto-generated by Prisma CLI   |

---

## 7. CI Integration

```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgis/postgis:16-3.4
        env:
          {
            POSTGRES_DB: commerce_os_test,
            POSTGRES_USER: test,
            POSTGRES_PASSWORD: test,
          }
        ports: ["5432:5432"]
      redis:
        image: redis:7-alpine
        ports: ["6379:6379"]

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "22" }
      - run: npm ci
      - run: npx prisma migrate deploy
        env:
          {
            DATABASE_URL: postgresql://test:test@localhost:5432/commerce_os_test,
          }
      - run: npm test -- --coverage
        env:
          {
            DATABASE_URL: postgresql://test:test@localhost:5432/commerce_os_test,
          }
```

| CI Rule                 | Behaviour                                                            |
| ----------------------- | -------------------------------------------------------------------- |
| PR blocked              | If `npm test` fails or coverage below threshold                      |
| Merge gate              | Only green CI can merge to `main`                                    |
| Local run               | Same command; uses Testcontainers if CI env not detected             |
| Testcontainers fallback | `global-setup.ts` starts containers when `DATABASE_URL` not provided |

---

## 8. Test Watch (Dev)

| Command                                        | Use Case                                                  |
| ---------------------------------------------- | --------------------------------------------------------- |
| `npm run test:watch`                           | `jest --watch` — re-runs changed tests on file save       |
| `npm run test:watch -- --testPathPattern auth` | Filter to auth module only                                |
| `npm run test:debug`                           | `node --inspect-brk` + Jest for Chrome DevTools debugging |
| `npm run test:e2e`                             | `jest --config ./test/jest-e2e.json` — full E2E suite     |

```json
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  }
}
```

---

## 9. Mocking Strategy

| Scope    | Dependency            | Unit                      | Integration                                  |
| -------- | --------------------- | ------------------------- | -------------------------------------------- |
| Database | PrismaService         | `jest.fn()` mock object   | Real Prisma + real Postgres (Testcontainers) |
| Cache    | Redis                 | `ioredis-mock`            | Real Redis (Testcontainers)                  |
| Queue    | Bull/BullMQ           | `BullMQ` mock queue       | Skipped in unit; real Redis in integration   |
| HTTP     | `HttpService` (Axios) | `jest.fn()` mock          | Real HTTP in E2E, mocked at unit             |
| Search   | Meilisearch           | `jest.fn()` stub          | Real Meilisearch (Testcontainers)            |
| Email    | MailerService         | `jest.fn()` (assert sent) | Mailpit in E2E                               |

```typescript
// test/mocks/prisma.mock.ts — singleton mock factory
export const mockPrisma = {
  user: { findUnique: jest.fn(), create: jest.fn(), update: jest.fn() },
  product: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  },
  order: { findMany: jest.fn(), create: jest.fn(), update: jest.fn() },
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  $transaction: jest.fn((fn) => fn(mockPrisma)),
};
```

---

## 10. Test Helpers

```typescript
// test/helpers/create-test-user.ts
export async function createTestUser(
  prisma: PrismaService,
  overrides?: Partial<UserInput>,
) {
  const data = {
    email: faker.internet.email(),
    password: "Test123!",
    tenantId: "test-tenant",
    ...overrides,
  };
  const password_hash = await bcrypt.hash(data.password, 10);
  return prisma.user.create({ data: { ...data, password_hash } });
}
```

```typescript
// test/helpers/authenticate-request.ts
import { sign } from "jsonwebtoken";

export function authenticateRequest(
  app: INestApplication,
  user: { id: string; role: string; tenantId: string },
) {
  const token = sign(
    { sub: user.id, role: user.role, tenantId: user.tenantId },
    process.env.JWT_SECRET!,
  );
  return request(app.getHttpServer()).set("Authorization", `Bearer ${token}`);
}
```

```typescript
// test/helpers/create-test-product.ts
export async function createTestProduct(
  prisma: PrismaService,
  overrides?: Partial<ProductInput>,
) {
  const cat =
    (await prisma.category.findFirst()) ??
    (await prisma.category.create({
      data: { name: "Test Cat", slug: "test-cat" },
    }));
  return prisma.product.create({
    data: {
      name: faker.commerce.productName(),
      price: 29.99,
      sku: `SKU-${faker.string.alphanumeric(6)}`,
      categoryId: cat.id,
      ...overrides,
    },
  });
}
```

| Helper                                        | Returns          | Use Case                               |
| --------------------------------------------- | ---------------- | -------------------------------------- |
| `createTestUser(prisma, overrides?)`          | `User` entity    | Seed a user before auth/order tests    |
| `createTestProduct(prisma, overrides?)`       | `Product` entity | Seed a product before cart/order tests |
| `createTestOrder(prisma, userId, overrides?)` | `Order` entity   | Seed an order for lifecycle tests      |
| `authenticateRequest(app, user)`              | SuperTest chain  | Generate JWT + attach to request       |
| `truncateTables(prisma)`                      | `Promise<void>`  | Clean DB between integration tests     |

---

## 11. Edge Cases & Mitigations

| Edge Case                               | Mitigation                                                           |
| --------------------------------------- | -------------------------------------------------------------------- |
| Parallel test execution (Jest workers)  | Each worker gets isolated Prisma client; `TRUNCATE` before each test |
| Testcontainers port conflict            | Containers use random host ports via `.start()`                      |
| Slow global setup (container pull)      | Run as `globalSetup` before all files; reuse for entire suite        |
| Prisma client matching container schema | `migrate deploy` in `global-setup.ts` after container is ready       |
| Flaky async tests                       | `jest.retryTimes(2)` flaky test detector in CI only                  |
| Secrets in test output                  | `REJECT_DANGEROUS_PATTERNS` prevents password_hash exposure          |
