# Distributed Tracing (Feature 3.5)

## 1. Correlation ID

| Property          | Value                                                            |
| ----------------- | ---------------------------------------------------------------- |
| Format            | UUID v4                                                          |
| Header (inbound)  | `X-Request-ID`                                                   |
| Header (outbound) | `X-Request-ID` + `X-Request-Duration-Ms`                         |
| Assignment        | Use client-provided value if present; generate new one if absent |

```
Request flow:
  Client → x-request-id: a1b2... (optional)
         ↓
  Middleware generates UUID v4 if header missing
         ↓
  Attached to req, CLS store, response header
         ↓
  Propagated to BullMQ, HTTP calls, DB comments
```

---

## 2. NestJS Middleware

```typescript
// src/tracing/correlation-id.middleware.ts
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(private readonly cls: ClsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const id = (req.headers["x-request-id"] as string) || uuidv4();
    req["correlationId"] = id;
    this.cls.set("correlationId", id);
    req["startTime"] = Date.now();

    res.setHeader("X-Request-ID", id);

    res.on("finish", () => {
      const duration = Date.now() - req["startTime"];
      res.setHeader("X-Request-Duration-Ms", duration);
    });

    next();
  }
}
```

---

## 3. CLS Setup

```typescript
// src/tracing/cls.module.ts
import { ClsModule } from "nestjs-cls";

@Module({
  imports: [
    ClsModule.forRoot({
      middleware: { mount: true },
      global: true,
    }),
  ],
})
export class TracingModule {}
```

```typescript
// src/tracing/cls.service.ts
@Injectable()
export class CorrelationService {
  constructor(private readonly cls: ClsService) {}

  get(): string {
    return this.cls.get("correlationId");
  }
}
```

Usage anywhere via DI:

```typescript
@Injectable()
export class OrdersService {
  constructor(private readonly correlation: CorrelationService) {}

  async findOne(id: string) {
    const cid = this.correlation.get();
    // cid → "a1b2c3d4-..."
  }
}
```

---

## 4. Logger Integration

```typescript
// src/tracing/pino-logger.ts
import { Logger } from "nestjs-pino";

export function pinoLoggerConfig() {
  return {
    pinoHttp: {
      quietReqLogger: true,
      genReqId: () => uuidv4(),
      mixin: () => {
        // Injected by CLS middleware before logger is used
        const correlationId =
          ClsServiceManager.getClsService()?.get("correlationId");
        return { correlationId };
      },
      transport: {
        target: "pino-pretty",
        options: { colorize: true, singleLine: true },
      },
      serializers: {
        req: (req) => ({
          method: req.method,
          url: req.url,
          correlationId: req.raw?.correlationId,
        }),
      },
    },
  };
}
```

| Field               | Always present | Example          |
| ------------------- | -------------- | ---------------- |
| `correlationId`     | Yes            | `"a1b2c3d4-..."` |
| `req.correlationId` | Yes            | Same UUID        |
| `responseTime`      | Yes            | `42` (ms)        |

Every log entry includes `correlationId`, enabling trace-to-log correlation in Grafana/Loki.

---

## 5. Propagation

### BullMQ

```typescript
// src/tracing/bull-propagator.ts
@Injectable()
export class CorrelationJobProcessor {
  constructor(private readonly correlation: CorrelationService) {}

  configure(queue: Queue) {
    queue.defaultJobOptions = {
      ...queue.defaultJobOptions,
      headers: { "x-request-id": this.correlation.get() },
    };
  }
}
```

```typescript
// Worker side reads it back
@Processor("orders")
export class OrdersProcessor {
  @Process()
  async process(job: Job) {
    const cid = job.headers?.["x-request-id"] || uuidv4();
    ClsServiceManager.getClsService()?.set("correlationId", cid);
    // ... processing
  }
}
```

### Axios Interceptor

```typescript
// src/tracing/axios-interceptor.ts
@Injectable()
export class CorrelationAxiosInterceptor implements NestInterceptor {
  constructor(private readonly correlation: CorrelationService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        // Applied globally via axios request interceptor
        axios.interceptors.request.use((config) => {
          config.headers.set("X-Request-ID", this.correlation.get());
          return config;
        });
      }),
    );
  }
}
```

### DB Query Comments

```sql
/* correlationId=a1b2c3d4-... */ SELECT * FROM "orders" WHERE "id" = $1
```

```typescript
// prisma middleware
prisma.$use(async (params, next) => {
  const cid = this.correlation.get();
  if (cid) {
    params.__internalParams = {
      ...params.__internalParams,
      queryComment: `correlationId=${cid}`,
    };
  }
  return next(params);
});
```

---

## 6. Response Headers

| Header                  | Example                                | Always sent |
| ----------------------- | -------------------------------------- | ----------- |
| `X-Request-ID`          | `a1b2c3d4-1234-5678-9abc-def012345678` | Yes         |
| `X-Request-Duration-Ms` | `42`                                   | Yes         |

```typescript
// Response shape
HTTP/1.1 200 OK
X-Request-ID: a1b2c3d4-1234-5678-9abc-def012345678
X-Request-Duration-Ms: 42
Content-Type: application/json
```

---

## 7. OpenTelemetry Integration

```typescript
// src/tracing/opentelemetry.ts (optional — gated behind OTEL_ENABLED)
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

export function initTelemetry() {
  if (process.env.OTEL_ENABLED !== "true") return;

  const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter({
      url: process.env.OTEL_EXPORTER_URL || "http://localhost:4318/v1/traces",
    }),
    instrumentations: [getNodeAutoInstrumentations()],
  });

  sdk.start();
  process.on("SIGTERM", () => sdk.shutdown());
}
```

| Env Variable        | Default                           | Target                 |
| ------------------- | --------------------------------- | ---------------------- |
| `OTEL_ENABLED`      | `false`                           | Jaeger / Grafana Tempo |
| `OTEL_EXPORTER_URL` | `http://localhost:4318/v1/traces` | OTLP HTTP endpoint     |

---

## 8. Span Creation

```typescript
// src/tracing/tracing.service.ts
@Injectable()
export class TracingService {
  private readonly tracer = trace.getTracer("commerce-os");

  startSpan(name: string, attributes?: Record<string, any>): Span {
    const span = this.tracer.startSpan(name, { attributes });
    const cid = this.correlation.get();
    if (cid) span.setAttribute("correlationId", cid);
    return span;
  }

  async trace<T>(
    name: string,
    fn: (span: Span) => Promise<T>,
    ctx?: Record<string, any>,
  ): Promise<T> {
    const span = this.startSpan(name, ctx);
    try {
      return await fn(span);
    } catch (e) {
      span.recordException(e);
      span.setStatus({ code: SpanStatusCode.ERROR });
      throw e;
    } finally {
      span.end();
    }
  }
}
```

| Span                    | Trigger              | Parent              |
| ----------------------- | -------------------- | ------------------- |
| `HTTP {method} {route}` | Every request (auto) | —                   |
| `checkout.process`      | Checkout submission  | HTTP POST /checkout |
| `payment.authorize`     | Payment gateway call | checkout.process    |
| `order.create`          | DB order creation    | checkout.process    |

```typescript
// Usage in checkout
async checkout(dto: CheckoutDto) {
  return this.tracing.trace('checkout.process', async (span) => {
    span.setAttribute('cartId', dto.cartId);
    const payment = await this.paymentService.authorize(dto);
    return this.orderService.create(dto, payment);
  });
}
```

---

## 9. Error Tracking

```typescript
// src/tracing/sentry-filter.ts
@Catch()
export class SentryFilter implements ExceptionFilter {
  constructor(private readonly correlation: CorrelationService) {}

  catch(exception: any, host: ArgumentsHost) {
    const cid = this.correlation.get();
    Sentry.setTag("correlation_id", cid);
    Sentry.captureException(exception, {
      tags: { correlation_id: cid },
    });

    // Fall through to global exception filter for response
    throw exception;
  }
}
```

```
Sentry event:
  tags:
    correlation_id: "a1b2c3d4-..."
  extra:
    request_id: "a1b2c3d4-..."
    request_duration_ms: 42
```

---

## 10. Test Cases

```typescript
// test/tracing.e2e-spec.ts
describe("Tracing (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TracingModule,
        ClsModule.forRoot({ middleware: { mount: true }, global: true }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  it("generates UUID v4 when X-Request-ID is absent", async () => {
    const res = await request(app.getHttpServer()).get("/health");
    expect(res.status).toBe(200);
    expect(res.headers["x-request-id"]).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it("propagates client-provided X-Request-ID", async () => {
    const res = await request(app.getHttpServer())
      .get("/health")
      .set("X-Request-ID", "client-id-123");
    expect(res.headers["x-request-id"]).toBe("client-id-123");
  });

  it("returns X-Request-Duration-Ms header", async () => {
    const res = await request(app.getHttpServer()).get("/health");
    expect(res.headers["x-request-duration-ms"]).toBeDefined();
    expect(Number(res.headers["x-request-duration-ms"])).toBeGreaterThan(0);
  });

  it("includes correlationId in pino log entries", async () => {
    const spy = jest.spyOn(logger, "info");
    await request(app.getHttpServer()).get("/health");
    const log = spy.mock.calls[0][0];
    expect(log.correlationId).toBeDefined();
    expect(log.correlationId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it("accesses correlationId via CorrelationService", async () => {
    const res = await request(app.getHttpServer()).get("/health");
    const cid = res.headers["x-request-id"];
    // Service used within controller returns matching CID
    expect(app.get(CorrelationService).get()).toBe(cid);
  });
});
```

---

## 11. Edge Cases & Mitigations

| Edge Case                               | Mitigation                                                                            |
| --------------------------------------- | ------------------------------------------------------------------------------------- |
| Client sends invalid UUID               | Used as-is (opaque string), no validation — never reject a request over header format |
| CLS not yet initialized (bootstrap)     | Logger mixin returns `undefined` correlationId; logs still emit                       |
| Downstream service timeout              | OpenTelemetry span records error + duration; no cascade failure                       |
| BullMQ job created outside HTTP context | Worker generates new UUID v4 on the consumer side                                     |
| `nestjs-cls` not configured             | Guards check `ClsServiceManager.getClsService()` for null before accessing store      |
| Tracing backend (Jaeger/Tempo) down     | OTLP exporter retries with backoff; application never blocks on telemetry             |
| Forward proxy strips `X-Request-ID`     | App treats absence the same as client omission — generates a fresh UUID               |
