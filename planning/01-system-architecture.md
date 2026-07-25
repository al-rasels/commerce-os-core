# System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Clients                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────────┐   │
│  │ Storefront│  │  Admin   │  │   API    │  │  External Services│   │
│  │(Next.js) │  │ (Vite+   │  │ (curl/   │  │ (Stripe, Ship-    │   │
│  │          │  │ React)   │  │ Postman) │  │  ping, etc.)      │   │
│  └─────┬────┘  └────┬─────┘  └────┬─────┘  └─────────┬─────────┘   │
└────────┼────────────┼─────────────┼───────────────────┼─────────────┘
         │            │             │                   │
         ▼            ▼             ▼                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         API Gateway / CDN                            │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                     API (NestJS)                             │    │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐   │    │
│  │  │ Auth Guard │  │ Rate Limit │  │  Global Interceptors │   │    │
│  │  └────────────┘  └────────────┘  └──────────────────────┘   │    │
│  │                                                               │    │
│  │  ┌───────────────────────────────────────────────────────┐   │    │
│  │  │                   Modules                              │   │    │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │   │    │
│  │  │  │ Platform │  │ Commerce │  │ Experience       │   │   │    │
│  │  │  │ Tenants  │  │ Products │  │ Pages            │   │   │    │
│  │  │  │ Users    │  │ Carts    │  │ Themes           │   │   │    │
│  │  │  │ Roles    │  │ Orders   │  │ Templates        │   │   │    │
│  │  │  │ Perms    │  │ Checkout │  │                  │   │   │    │
│  │  │  └──────────┘  │ Payments │  └──────────────────┘   │   │    │
│  │  │                └──────────┘                           │   │    │
│  │  └───────────────────────────────────────────────────────┘   │    │
│  │                                                               │    │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐   │    │
│  │  │  Prisma    │  │   Redis    │  │  BullMQ (Queue)      │   │    │
│  │  └──────┬─────┘  └─────┬──────┘  └──────────────────────┘   │    │
│  └─────────┼───────────────┼────────────────────────────────────┘    │
└────────────┼───────────────┼─────────────────────────────────────────┘
             │               │
             ▼               ▼
┌────────────────────┐  ┌────────────────────┐
│    PostgreSQL      │  │       Redis        │
│  ┌──────────────┐  │  │  ┌──────────────┐  │
│  │  Main DB     │  │  │  │ Cache        │  │
│  │  (Read/Write) │  │  │  │ Sessions     │  │
│  └──────────────┘  │  │  │ Queue broker  │  │
│                    │  │  └──────────────┘  │
│  ┌──────────────┐  │  └────────────────────┘
│  │  Read Replica│  │
│  │  (CQRS)      │  │
│  └──────────────┘  │
└────────────────────┘
```

## Architecture Decisions

### Why NestJS over alternatives

| Factor                            | NestJS          | Fastify | Express                       |
| --------------------------------- | --------------- | ------- | ----------------------------- |
| DI / IoC                          | Built-in        | Manual  | Manual                        |
| Guards / Interceptors / Filters   | Native          | Plugin  | Middleware                    |
| Modular monolith -> Microservices | Gradual         | Manual  | Manual                        |
| OpenAPI auto-gen                  | @nestjs/swagger | Plugin  | Manual                        |
| Testing                           | Integrated      | Manual  | Manual                        |
| Enterprise community              | Large           | Growing | Very large (but unstructured) |

### Why Modular Monolith

- Current scale does not justify microservices overhead (network latency, distributed transactions, eventual consistency)
- NestJS modules map 1:1 to future microservices
- Domain boundaries enforced at module level, not deployment level
- Extraction path: extract module → wrap in API → deploy independently

### Why Prisma over alternatives

| Factor        | Prisma          | TypeORM | Drizzle    |
| ------------- | --------------- | ------- | ---------- |
| Type safety   | Generated types | Partial | Full       |
| Migrations    | auto-generated  | Manual  | Manual     |
| Multi-tenant  | Middleware      | Filters | Middleware |
| JSON fields   | Strong          | Weak    | Strong     |
| Hidden fields | @hidden         | Partial | Manual     |

---

## Cross-Cutting Concerns

### Error Handling Chain

```
Request
  → ValidationPipe (DTO validation)
    → AuthGuard (JWT verification)
      → ThrottlerGuard (rate limit)
        → TenantGuard (scope check)
          → PermissionGuard (RBAC)
            → Controller
              → Service (business logic)
                → PrismaService (database)
                  → Exception filters
                    → Response interceptor
```

### Data Flow Pattern

```
Controller (validate input)
  → Service (business logic, transactions)
    → Repository/Prisma (data access)
      ← Domain models
    ← Service result
  ← DTO response
← Serialized API response
```

### Event Flow Pattern (Future)

```
Service
  → Emit event (OrderCreated)
    → BullMQ queue
      → Handler (SendEmail, UpdateInventory)
        → Acknowledge
```

---

## System Qualities

| Quality         | Approach                                                        |
| --------------- | --------------------------------------------------------------- |
| Availability    | Multiple instances behind load balancer; health checks          |
| Scalability     | Stateless API; horizontal scale via container orchestration     |
| Performance     | Redis cache; read replicas; eager loading optimizations         |
| Security        | Helmet, CORS, CSRF, JWT, rate limiting, audit logging           |
| Maintainability | Modular monolith; strict module boundaries; comprehensive tests |
| Observability   | Structured logging (Pino); request IDs; Sentry; OpenTelemetry   |
| Testability     | DI for mocking; clean separation of concerns                    |
| Deployability   | Docker; CI/CD; zero-downtime migrations                         |
