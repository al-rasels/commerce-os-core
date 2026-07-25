# Project Structure

## Root Structure

```
commerce-os-core/
├── .ai/                    # AI development context
│   └── testing/            # Test patterns and context
├── .agents/                # Agent skills and configuration
│   └── skills/             # Installed skills
├── .github/                # GitHub configuration
│   └── workflows/          # CI/CD pipeline definitions
├── .graphify/              # Graph visualization
├── .husky/                 # Git hooks
├── .tasks/                 # Task management
├── apps/
│   ├── admin/              # Admin panel (Vite + React 19)
│   ├── api/                # Backend API (NestJS)
│   └── storefront/         # Storefront (Next.js 16)
├── packages/
│   ├── components/         # Shared UI components
│   ├── design-tokens/      # Design system tokens
│   ├── shared-types/       # Shared TypeScript types
│   ├── ui-config/          # UI configuration
│   └── api-client/         # Unified API client (future)
├── planning/               # Architecture documentation
├── docker-compose.yml
├── package.json            # Monorepo root
├── turbo.json              # Turborepo configuration
├── tsconfig.json           # Shared TypeScript config
├── .env.example
├── .gitignore
├── commitlint.config.js
├── MASTER_TASKLIST.md
├── PROGRESS_REPORT.md
└── README.md
```

## API Structure

```
apps/api/src/
├── main.ts                          # Bootstrap entry point
├── app.module.ts                    # Root module
├── app.controller.ts                # Root controller (health check)
├── app.service.ts                   # Root service
│
├── common/
│   ├── decorators/
│   │   ├── current-user.decorator.ts
│   │   ├── public.decorator.ts
│   │   ├── permissions.decorator.ts
│   │   └── roles.decorator.ts
│   ├── dto/
│   │   ├── pagination.dto.ts
│   │   ├── api-response.dto.ts
│   │   └── id.dto.ts
│   ├── filters/
│   │   ├── prisma-client-exception.filter.ts
│   │   ├── http-exception.filter.ts
│   │   └── ws-exception.filter.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   ├── roles.guard.ts
│   │   ├── permissions.guard.ts
│   │   ├── tenant.guard.ts
│   │   └── throttle.guard.ts
│   ├── interceptors/
│   │   ├── exclude-sensitive.interceptor.ts
│   │   ├── request-id.interceptor.ts
│   │   ├── logging.interceptor.ts
│   │   ├── tenant.interceptor.ts
│   │   └── transform.interceptor.ts
│   ├── pipes/
│   │   ├── parse-uuid.pipe.ts
│   │   └── validation.pipe.ts
│   ├── interfaces/
│   │   ├── jwt-payload.interface.ts
│   │   ├── request-with-user.interface.ts
│   │   └── api-response.interface.ts
│   └── constants/
│       ├── permissions.constants.ts
│       └── roles.constants.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   │   ├── refresh.dto.ts
│   │   │   └── logout.dto.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── jwt-refresh.strategy.ts
│   │   └── guards/
│   │       └── local-auth.guard.ts
│   │
│   ├── platform/
│   │   ├── platform.module.ts
│   │   ├── tenants/
│   │   │   ├── tenants.controller.ts
│   │   │   ├── tenants.service.ts
│   │   │   └── dto/
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── dto/
│   │   ├── roles/
│   │   │   ├── roles.controller.ts
│   │   │   ├── roles.service.ts
│   │   │   └── dto/
│   │   └── permissions/
│   │       ├── permissions.controller.ts
│   │       └── permissions.service.ts
│   │
│   ├── commerce/
│   │   ├── commerce.module.ts
│   │   ├── products/
│   │   ├── categories/
│   │   ├── variants/
│   │   ├── carts/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── promotions/
│   │   ├── shipping/
│   │   └── tax/
│   │
│   ├── experience/
│   │   ├── experience.module.ts
│   │   ├── pages/
│   │   ├── themes/
│   │   └── templates/
│   │
│   └── communication/
│       ├── communication.module.ts
│       ├── notifications/
│       └── webhooks/
│
├── prisma/
│   ├── prisma.module.ts
│   ├── prisma.service.ts
│   ├── prisma.extensions.ts
│   └── schema.prisma
│
└── config/
    ├── app.config.ts
    ├── database.config.ts
    ├── auth.config.ts
    └── redis.config.ts
```

## Storefront Structure

```
apps/storefront/src/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page
│   ├── not-found.tsx                 # 404 page
│   ├── error.tsx                     # Error boundary
│   ├── loading.tsx                   # Loading skeleton
│   ├── (shop)/
│   │   ├── layout.tsx               # Shop layout
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── categories/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── cart/
│   │       └── page.tsx
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── checkout/
│   │   ├── page.tsx
│   │   └── confirmation/
│   │       └── [orderId]/
│   │           └── page.tsx
│   └── account/
│       ├── page.tsx
│       ├── orders/
│       │   └── page.tsx
│       └── addresses/
│           └── page.tsx
├── components/
│   ├── ui/                           # Basic UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Spinner.tsx
│   │   └── Skeleton.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── Sidebar.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductDetail.tsx
│   │   └── ProductForm.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── CartIcon.tsx
│   ├── checkout/
│   │   ├── CheckoutForm.tsx
│   │   └── OrderSummary.tsx
│   └── auth/
│       ├── LoginForm.tsx
│       └── RegisterForm.tsx
├── lib/
│   ├── api-client.ts                 # API fetch wrapper
│   ├── constants.ts
│   ├── utils.ts
│   └── seo.ts
├── hooks/
│   ├── useCart.ts
│   ├── useProducts.ts
│   ├── useAuth.ts
│   └── useDebounce.ts
├── stores/
│   ├── cart-store.ts                 # Zustand
│   └── auth-store.ts
└── styles/
    └── globals.css
```

## Admin Structure

```
apps/admin/src/
├── App.tsx                           # Root component
├── main.tsx                          # Entry point
├── router.tsx                        # Route definitions
├── pages/
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── Products/
│   │   ├── ProductList.tsx
│   │   ├── ProductForm.tsx
│   │   └── ProductDetail.tsx
│   ├── Orders/
│   │   ├── OrderList.tsx
│   │   └── OrderDetail.tsx
│   ├── Customers/
│   │   └── CustomerList.tsx
│   ├── Categories/
│   │   └── CategoryList.tsx
│   ├── Promotions/
│   │   └── PromotionList.tsx
│   ├── Settings/
│   │   ├── General.tsx
│   │   ├── Shipping.tsx
│   │   ├── Tax.tsx
│   │   └── Team.tsx
│   └── AuditLog.tsx
├── components/
│   ├── ui/                           # Design system components
│   ├── layout/
│   │   ├── AdminLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   └── tables/
│       ├── DataTable.tsx             # TanStack Table wrapper
│       └── TableActions.tsx
├── lib/
│   ├── api-client.ts
│   └── utils.ts
├── hooks/
│   └── use-debounce.ts
└── stores/
    └── auth-store.ts
```

## Packages Structure

```
packages/
├── shared-types/src/
│   ├── index.ts
│   ├── product.types.ts
│   ├── order.types.ts
│   ├── cart.types.ts
│   ├── customer.types.ts
│   ├── tenant.types.ts
│   ├── user.types.ts
│   ├── role.types.ts
│   └── api.types.ts
│
├── design-tokens/src/
│   ├── index.ts
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── tokens.css
│
├── components/src/
│   ├── index.ts
│   ├── Button/
│   ├── Input/
│   ├── Card/
│   ├── Badge/
│   ├── Modal/
│   └── Spinner/
│
├── ui-config/
│   ├── index.ts
│   └── config.ts
│
└── api-client/src/
    ├── index.ts
    ├── client.ts
    ├── auth.ts
    ├── products.ts
    ├── orders.ts
    └── carts.ts
```
