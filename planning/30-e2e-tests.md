# Feature 3.8 — E2E Tests (Playwright)

## 1. Setup

| Package    | Path              | Tech                          |
| ---------- | ----------------- | ----------------------------- |
| Storefront | `apps/storefront` | Next.js 16, React 19          |
| Admin      | `apps/admin`      | Vite + React 19, React Router |
| API        | `apps/api`        | NestJS                        |
| E2E        | `apps/e2e`        | Playwright 1.52+              |

**Directory structure:**

```
apps/e2e/
├── playwright.config.ts
├── fixtures/
│   ├── auth.ts              ← test fixtures (authenticated page objects)
│   └── products.ts          ← seed helpers
├── specs/
│   ├── critical-path.spec.ts
│   ├── auth.spec.ts
│   ├── cart.spec.ts
│   ├── products.spec.ts
│   ├── orders.spec.ts
│   ├── responsive.spec.ts
│   └── accessibility.spec.ts
├── helpers/
│   ├── api.ts               ← direct API calls for seed/teardown
│   └── seed.ts              ← factory functions
├── global-setup.ts          ← global auth setup
└── axe-config.ts            ← WCAG 2.2 AA ruleset
```

### Playwright Config

```typescript
// apps/e2e/playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./specs",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 1,
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["junit", { outputFile: "junit.xml" }],
  ],
  use: {
    baseURL: process.env.STOREFRONT_URL ?? "http://localhost:3001",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",
  },
  projects: [
    {
      name: "setup",
      testMatch: /global-setup\.ts/,
      teardown: "cleanup",
    },
    {
      name: "storefront",
      dependencies: ["setup"],
      use: { baseURL: "http://localhost:3001" },
    },
    {
      name: "admin",
      dependencies: ["setup"],
      use: { baseURL: "http://localhost:3002" },
    },
    {
      name: "cleanup",
      testMatch: /global-teardown\.ts/,
    },
  ],
  webServer: [
    { command: "npm run dev --workspace=apps/api", port: 4000 },
    { command: "npm run dev --workspace=apps/storefront", port: 3001 },
    { command: "npm run dev --workspace=apps/admin", port: 3002 },
  ],
});
```

### Global Auth Setup

```typescript
// apps/e2e/global-setup.ts
import { test as setup, expect } from "@playwright/test";
import { seedTestData, createApiClient } from "./helpers/seed";

setup("seed database and authenticate", async ({ request }) => {
  const api = createApiClient(request);

  // Seed products, categories, admin user
  await seedTestData(api);

  // Store admin session token
  const res = await api.post("/api/v1/auth/login", {
    data: { email: "admin@test.com", password: "Password123!" },
  });
  const { accessToken } = await res.json();

  process.env.ADMIN_TOKEN = accessToken;
  process.env.SEED_CATEGORY_ID = "cat-electronics";
  process.env.SEED_PRODUCT_ID = "prod-wireless-headphones";
});
```

### Auth Fixture

```typescript
// apps/e2e/fixtures/auth.ts
import { test as base, Page } from "@playwright/test";

export type AuthFixtures = {
  storefrontPage: Page;
  adminPage: Page;
};

export const test = base.extend<AuthFixtures>({
  storefrontPage: async ({ browser }, use) => {
    const ctx = await browser.newContext({ storageState: undefined });
    const page = await ctx.newPage();
    await page.goto("/register");
    await page.fill("[name=email]", `user-${Date.now()}@test.com`);
    await page.fill("[name=password]", "Password123!");
    await page.fill("[name=confirmPassword]", "Password123!");
    await page.click("button[type=submit]");
    await page.waitForURL("/");
    await use(page);
    await ctx.close();
  },

  adminPage: async ({ browser }, use) => {
    const ctx = await browser.newContext({ storageState: undefined });
    const page = await ctx.newPage();
    await page.goto("http://localhost:3002/login");
    await page.fill("[name=email]", "admin@test.com");
    await page.fill("[name=password]", "Password123!");
    await page.click("button[type=submit]");
    await page.waitForURL("http://localhost:3002/dashboard");
    await use(page);
    await ctx.close();
  },
});

export { expect } from "@playwright/test";
```

---

## 2. Critical Path

```typescript
// apps/e2e/specs/critical-path.spec.ts
import { test, expect } from "../fixtures/auth";

test("guest browses → registers → adds to cart → checkout → confirmation", async ({
  page,
}) => {
  await page.goto("/products");
  await page.click("text=Wireless Headphones");
  await page.click("text=Add to Cart");
  await expect(page.locator("[data-testid=cart-count]")).toHaveText("1");

  await page.click("text=Sign In");
  await page.click("text=Create account");
  const email = `cp-${Date.now()}@test.com`;
  await page.fill("[name=email]", email);
  await page.fill("[name=password]", "Password123!");
  await page.fill("[name=confirmPassword]", "Password123!");
  await page.click("button[type=submit]");

  await page.goto("/cart");
  await page.click("text=Proceed to Checkout");
  await page.fill("[name=shippingAddress.line1]", "123 Main St");
  await page.fill("[name=shippingAddress.city]", "New York");
  await page.fill("[name=shippingAddress.postalCode]", "10001");
  await page.click("text=Place Order");

  await expect(page.locator("[data-testid=order-confirmation]")).toBeVisible();
  await expect(page.locator("[data-testid=order-number]")).not.toBeEmpty();
});
```

---

## 3. Admin Paths

```typescript
// apps/e2e/specs/admin.spec.ts
import { test, expect } from "../fixtures/auth";

test("admin creates product, views orders, processes order", async ({
  adminPage,
}) => {
  await adminPage.goto("/products/new");
  await adminPage.fill("[name=name]", "E2E Test Product");
  await adminPage.fill("[name=description]", "Created by Playwright");
  await adminPage.fill("[name=price]", "49.99");
  await adminPage.selectOption(
    "[name=categoryId]",
    process.env.SEED_CATEGORY_ID!,
  );
  await adminPage.click("text=Save");
  await expect(adminPage.locator("text=Product created")).toBeVisible();

  await adminPage.goto("/orders");
  await expect(adminPage.locator("table")).toBeVisible();

  await adminPage.click("table tr:first-child >> text=View");
  await adminPage.selectOption("[name=status]", "shipped");
  await adminPage.click("text=Update Status");
  await expect(adminPage.locator("text=Order updated")).toBeVisible();
});
```

---

## 4. Auth Flows

| Test                            | Assertion                                    |
| ------------------------------- | -------------------------------------------- |
| Register with valid data        | Redirect to `/`, token in localStorage       |
| Register with existing email    | 409 error message displayed                  |
| Register with weak password     | Validation error shown                       |
| Login with valid credentials    | Redirect to `/`, token stored                |
| Login with wrong password       | 401 error message                            |
| Protected route redirect        | Unauthenticated → redirected to `/login`     |
| Token refresh on expiry         | Silent refresh, subsequent API call succeeds |
| Logout                          | Token cleared, redirect to `/`               |
| Session persistence across tabs | Both tabs retain auth state                  |

```
Auth Flow (Protected Route)
┌──────────────┐
│  Request /   │
│  dashboard   │
│  ┌─────────┐ │
│  │Token?   ├─├──→ Present → validate expiry
│  │         │ │        ↓ valid → render page
│  │         │ │        ↓ expired → POST /auth/refresh
│  │         │ │            ↓ 200 → update token, render page
│  │         │ │            ↓ 401 → redirect /login
│  └─────────┘ │
│  Absent      │
│  → redirect  │
│    /login    │
└──────────────┘
```

---

## 5. Cart Flows

| Test                    | Steps                                    | Assertion                        |
| ----------------------- | ---------------------------------------- | -------------------------------- |
| Add item (guest)        | Browse → click "Add to Cart"             | Badge shows 1, API returns 201   |
| Update quantity         | Cart → change qty to 3                   | Total updates, API returns 200   |
| Remove item             | Cart → click remove                      | Item gone, badge shows 0         |
| Guest merge after login | Add item as guest → register → open cart | Guest items present in user cart |
| Empty cart              | Cart with 0 items                        | "Your cart is empty" message     |
| Add unavailable product | Request out-of-stock variant             | Toast "Insufficient stock"       |
| Max quantity cap        | Set qty to 150                           | Clamped to 99                    |

---

## 6. Product Flows

| Test                     | Steps                             | Assertion                                     |
| ------------------------ | --------------------------------- | --------------------------------------------- |
| Browse categories        | Visit `/products`, click category | Filtered results load                         |
| Search products          | Type "headphones" in search bar   | Results match query                           |
| View product detail      | Click product card                | Name, price, description, add-to-cart visible |
| Pagination               | Load page with 20+ products       | Page 2 loads next batch                       |
| Empty search             | Type `zzzzznotfound`              | "No products found"                           |
| Category with no results | Filter empty category             | Empty state shown                             |

---

## 7. Order Flows

| Test                | Steps                          | Assertion                            |
| ------------------- | ------------------------------ | ------------------------------------ |
| Place order         | Cart → checkout → submit       | Confirmation page with order number  |
| View order history  | Profile → My Orders            | List of past orders sorted by date   |
| Cancel order        | Order detail → Cancel          | Status = `cancelled`, stock restored |
| Admin status change | Admin → Orders → Update status | Status updated, storefront reflects  |
| Order detail access | Non-owner tries to view        | 403 Forbidden                        |

---

## 8. Responsive Testing

| Viewport | Width      | Devices         |
| -------- | ---------- | --------------- |
| Mobile   | 375 × 812  | iPhone 14 Pro   |
| Tablet   | 768 × 1024 | iPad (portrait) |
| Desktop  | 1280 × 800 | Laptop          |

```typescript
// apps/e2e/specs/responsive.spec.ts
import { test, expect } from "@playwright/test";
const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
];

for (const vp of VIEWPORTS) {
  test(`product grid renders at ${vp.name} (${vp.width}px)`, async ({
    browser,
  }) => {
    const ctx = await browser.newContext({ viewport: vp });
    const page = await ctx.newPage();
    await page.goto("/products");

    await expect(page.locator("[data-testid=product-grid]")).toBeVisible();

    // Mobile: hamburger menu visible, sidebar hidden
    if (vp.width < 768) {
      await expect(page.locator("[data-testid=mobile-menu-btn]")).toBeVisible();
      await expect(page.locator("[data-testid=sidebar]")).toBeHidden();
    } else {
      await expect(page.locator("[data-testid=sidebar]")).toBeVisible();
    }

    await ctx.close();
  });
}
```

| Breakpoint | Layout Changes                                                        |
| ---------- | --------------------------------------------------------------------- |
| < 768px    | Single column grid, hamburger nav, hidden sidebar, stacked filter bar |
| 768–1024px | 2-column grid, visible sidebar, collapsed top nav                     |
| > 1024px   | 3–4 column grid, full top nav + sidebar, multi-row filter panel       |

---

## 9. Accessibility Checks

```typescript
// apps/e2e/specs/accessibility.spec.ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const WCAG_RULES = [
  "color-contrast",
  "label",
  "button-name",
  "link-name",
  "heading-order",
  "aria-valid-attr",
  "landmark-one-main",
  "page-has-heading-one",
];

test("storefront homepage has no WCAG 2.2 AA violations", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
    .disableRules(["scrollable-region-focusable"])
    .analyze();

  expect(results.violations).toEqual([]);
});

test("checkout form passes accessibility scan", async ({ page }) => {
  await page.goto("/cart");
  // Seed a cart item first via API
  // ...
  await page.click("text=Proceed to Checkout");

  const results = await new AxeBuilder({ page })
    .include("[data-testid=checkout-form]")
    .withTags(["wcag2aa", "wcag22aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

| Page            | Tags                            | Excluded Rules                                    |
| --------------- | ------------------------------- | ------------------------------------------------- |
| Homepage        | `wcag2a`, `wcag2aa`, `wcag22aa` | `scrollable-region-focusable`                     |
| Product list    | `wcag2aa`, `wcag22aa`           | —                                                 |
| Product detail  | `wcag2aa`                       | `color-contrast` (deferred to design token audit) |
| Cart            | `wcag2aa`, `wcag22aa`           | —                                                 |
| Checkout        | `wcag2aa`, `wcag22aa`           | —                                                 |
| Admin dashboard | `wcag2aa`                       | `page-has-heading-one`                            |

---

## 10. CI Integration

```yaml
# .github/workflows/e2e.yml (appended to ci-cd.yml)
e2e:
  needs: [lint, typecheck, test, build]
  if: github.ref == 'refs/heads/main' || github.event_name == 'pull_request'
  runs-on: ubuntu-latest
  services:
    postgres:
      image: postgres:17-alpine
      env:
        POSTGRES_USER: commerce
        POSTGRES_PASSWORD: commerce
        POSTGRES_DB: commerce_test
      ports:
        - 5432:5432
      options: >-
        --health-cmd pg_isready
        --health-interval 10s
        --health-timeout 5s
        --health-retries 5
    redis:
      image: redis:7-alpine
      ports:
        - 6379:6379
      options: >-
        --health-cmd "redis-cli ping"
        --health-interval 10s
        --health-timeout 5s
        --health-retries 5
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: npm
    - run: npm ci
    - run: npx playwright install --with-deps chromium
    - run: npx prisma generate --schema=apps/api/prisma/schema.prisma
    - run: npx prisma migrate deploy --schema=apps/api/prisma/schema.prisma
      env:
        DATABASE_URL: postgresql://commerce:commerce@localhost:5432/commerce_test
    - run: npm run test:e2e
      env:
        DATABASE_URL: postgresql://commerce:commerce@localhost:5432/commerce_test
        REDIS_HOST: localhost
        REDIS_PORT: 6379
        JWT_SECRET: test-secret
        STOREFRONT_URL: http://localhost:3001
        ADMIN_URL: http://localhost:3002
        API_URL: http://localhost:4000
    - uses: actions/upload-artifact@v4
      if: failure()
      with:
        name: playwright-report
        path: apps/e2e/playwright-report/
```

| CI Concern     | Configuration                                              |
| -------------- | ---------------------------------------------------------- |
| Browser binary | `npx playwright install --with-deps chromium`              |
| Web servers    | `webServer` in config (auto-started by Playwright)         |
| Reporting      | HTML report + JUnit XML (for GitHub annotations)           |
| Retries        | 1 retry in CI, 0 locally                                   |
| Artifacts      | Trace, screenshot, video on failure → uploaded as artifact |
| Parallelism    | 2 workers in CI, 1 locally                                 |
| Timeout        | Per-test: 60s, expect: 15s                                 |

## 11. Scripts

```jsonc
// apps/e2e/package.json (additional scripts)
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:report": "playwright show-report",
  },
}
```

## 12. Edge Cases & Mitigations

| Edge Case                         | Mitigation                                                        |
| --------------------------------- | ----------------------------------------------------------------- |
| Flaky test due to async rendering | `waitForLoadState('networkidle')` + `toHaveText` retry            |
| Test isolation leak               | `fullyParallel: false`, unique email per test (`Date.now()`)      |
| Seed data collision               | `global-setup` runs once; cleanup in `global-teardown`            |
| Mobile responsiveness flake       | Fixed viewport in context, no emulation                           |
| Axe violation noise               | Exclude non-actionable rules per page                             |
| Token expiry during test suite    | `global-setup` generates fresh tokens; refresh handled in fixture |
| Web server not ready              | `webServer` block with `reuseExistingServer: false` in CI         |
| CI headless mode failure          | `video: 'on-first-retry'` — watch replay                          |
