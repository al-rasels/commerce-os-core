# Health Checks (Feature 3.4)

## 1. Endpoints

| Endpoint          | Method | Purpose                                     | Response Cache |
| ----------------- | ------ | ------------------------------------------- | -------------- |
| `/health`         | GET    | Liveness — process alive                    | None           |
| `/ready`          | GET    | Readiness — all dependencies responsive     | None           |
| `/health/details` | GET    | Detailed per-check breakdown with latencies | 5s             |

### Route Registration

```typescript
// src/health/health.module.ts
@Module({
  controllers: [HealthController],
  providers: [
    DatabaseHealthIndicator,
    RedisHealthIndicator,
    MeiliSearchHealthIndicator,
    DiskHealthIndicator,
  ],
})
export class HealthModule {}
```

```typescript
// src/health/health.controller.ts
@Controller()
@SkipThrottle()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: DatabaseHealthIndicator,
    private redis: RedisHealthIndicator,
    private meili: MeiliSearchHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Get("health")
  @HttpCode(200)
  liveness(): { status: string; timestamp: string; uptime: number } {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  @Get("ready")
  readiness(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.db.pingCheck("database"),
      () => this.redis.pingCheck("redis"),
    ]);
  }

  @Get("health/details")
  details(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.db.pingCheck("database"),
      () => this.redis.pingCheck("redis"),
      () => this.meili.pingCheck("meilisearch"),
      () => this.disk.check("disk", { path: "/", thresholdPercent: 0.9 }),
    ]);
  }
}
```

---

## 2. Health Checks

| Check       | Indicator                                | Implementation                           | Timeout |
| ----------- | ---------------------------------------- | ---------------------------------------- | ------- |
| Database    | `DatabaseHealthIndicator`                | Prisma `$queryRawUnsafe('SELECT 1')`     | 5s      |
| Redis       | `RedisHealthIndicator`                   | `redisClient.ping()`                     | 3s      |
| Meilisearch | `MeiliSearchHealthIndicator`             | `health()` API call (only if configured) | 5s      |
| Disk space  | `@nestjs/terminus` `DiskHealthIndicator` | `check('disk', { path, threshold })`     | —       |

### Custom Indicators

```typescript
// src/health/indicators/database.health.ts
@Injectable()
export class DatabaseHealthIndicator implements HealthIndicatorFunction {
  constructor(private prisma: PrismaService) {}

  async pingCheck(key: string): Promise<HealthIndicatorResult> {
    const start = Date.now();
    try {
      await this.prisma.$queryRawUnsafe("SELECT 1");
      return { [key]: { status: "up", latency: Date.now() - start } };
    } catch (e) {
      return {
        [key]: {
          status: "down",
          latency: Date.now() - start,
          error: e.message,
        },
      };
    }
  }
}
```

```typescript
// src/health/indicators/redis.health.ts
@Injectable()
export class RedisHealthIndicator implements HealthIndicatorFunction {
  constructor(@Inject("REDIS_CLIENT") private redis: Redis) {}

  async pingCheck(key: string): Promise<HealthIndicatorResult> {
    const start = Date.now();
    try {
      await this.redis.ping();
      return { [key]: { status: "up", latency: Date.now() - start } };
    } catch (e) {
      return {
        [key]: {
          status: "down",
          latency: Date.now() - start,
          error: e.message,
        },
      };
    }
  }
}
```

---

## 3. Response Format

### Healthy (200)

```json
{
  "status": "ok",
  "timestamp": "2026-07-25T10:00:00.000Z",
  "uptime": 12345.67,
  "checks": [
    { "name": "database", "status": "up", "latency": 3 },
    { "name": "redis", "status": "up", "latency": 1 },
    { "name": "meilisearch", "status": "up", "latency": 4 },
    { "name": "disk", "status": "up", "latency": 0 }
  ]
}
```

### Degraded (200 — partial failure)

```json
{
  "status": "degraded",
  "timestamp": "2026-07-25T10:00:00.000Z",
  "uptime": 12345.67,
  "checks": [
    { "name": "database", "status": "up", "latency": 3 },
    { "name": "redis", "status": "down", "latency": 3001, "error": "ETIMEOUT" }
  ]
}
```

### Unhealthy (503 — critical failure)

```json
{
  "status": "error",
  "timestamp": "2026-07-25T10:00:00.000Z",
  "uptime": 12345.67,
  "checks": [
    {
      "name": "database",
      "status": "down",
      "latency": 5002,
      "error": "Connection refused"
    },
    { "name": "redis", "status": "down", "latency": 3001, "error": "ETIMEOUT" }
  ]
}
```

---

## 4. Liveness vs Readiness

| Aspect                | `/health` (Liveness)       | `/ready` (Readiness)          |
| --------------------- | -------------------------- | ----------------------------- |
| Checks                | None — returns immediately | DB + Redis                    |
| Response time         | < 1ms                      | Depends on downstream         |
| K8s probe type        | `livenessProbe`            | `readinessProbe`              |
| K8s action on failure | Restart pod                | Remove from Service endpoints |
| Use case              | Process hung / deadlocked  | DB unavailable / Redis down   |

```
Pod lifecycle:
  StartupProbe passes → ReadinessProbe passes → Service routes traffic
                                           ↓
                              LivenessProbe keeps checking
                              (restart if process stuck)
```

---

## 5. Graceful Shutdown

```typescript
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks(); // Enables SIGTERM/SIGINT handlers

  const server = app.getHttpAdapter().getInstance();

  // Mark unhealthy before draining
  process.on("SIGTERM", async () => {
    console.log("SIGTERM received — marking unhealthy");
    app.get(HealthController).setShuttingDown(true);

    // Wait for existing requests to finish (max 30s)
    await new Promise((resolve) => setTimeout(resolve, 30_000));
    await app.close();
    process.exit(0);
  });

  await app.listen(3000);
}
```

```typescript
// src/health/health.controller.ts — shutdown state
private shuttingDown = false;

setShuttingDown(v: boolean) { this.shuttingDown = v; }

@Get('ready')
readiness(): Promise<HealthCheckResult> {
  if (this.shuttingDown) {
    throw new ServiceUnavailableException({
      status: 'error',
      message: 'Shutting down — draining connections',
    });
  }
  return this.health.check([...]);
}

@Get('health')
liveness() {
  if (this.shuttingDown) {
    throw new ServiceUnavailableException({ status: 'error', message: 'shutting_down' });
  }
  return { status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime() };
}
```

---

## 6. Docker HEALTHCHECK

```dockerfile
# Dockerfile
FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --retries=2 --start-period=30s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health \
    || exit 1
```

| Parameter        | Value | Rationale                                      |
| ---------------- | ----- | ---------------------------------------------- |
| `--interval`     | 15s   | Quick detection without excessive load         |
| `--timeout`      | 5s    | Health endpoint responds in < 1s normally      |
| `--retries`      | 2     | Allow transient blips before marking unhealthy |
| `--start-period` | 30s   | NestJS boot + DB connection grace window       |

---

## 7. K8s Probes

```yaml
# k8s/deployment.yaml
spec:
  template:
    spec:
      containers:
        - name: api
          image: commerceos/api:latest
          ports:
            - containerPort: 3000
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 15
            timeoutSeconds: 5
            failureThreshold: 3
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 2
          startupProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 2
            failureThreshold: 15
```

| Probe            | Path      | Period | Failure Threshold | Effect on Failure                                 |
| ---------------- | --------- | ------ | ----------------- | ------------------------------------------------- |
| `startupProbe`   | `/health` | 2s     | 15 (30s total)    | Delays liveness/readiness checks until app boots  |
| `livenessProbe`  | `/health` | 15s    | 3 (45s total)     | `kubectl delete pod` — K8s restarts the container |
| `readinessProbe` | `/ready`  | 5s     | 2 (10s total)     | Removes pod from Service endpoints                |

---

## 8. Logging

```typescript
// src/health/health.controller.ts
private readonly logger = new Logger('HealthController');

@Get('ready')
async readiness(): Promise<HealthCheckResult> {
  try {
    return await this.health.check([...]);
  } catch (result) {
    // result is HealthCheckResult with error details
    for (const [name, check] of Object.entries(result.details)) {
      if (check.status !== 'up') {
        this.logger.warn(`Health check failed: ${name} — ${check.error}`);
      }
    }
    throw result;
  }
}
```

| Log Level      | When                                  | Example                                           |
| -------------- | ------------------------------------- | ------------------------------------------------- |
| `WARN`         | Single check failure (non-critical)   | `Health check failed: redis — ETIMEOUT`           |
| `ERROR`        | Multiple checks fail or process state | `Critical health degradation: 3 of 4 checks down` |
| `INFO` (never) | Health check success                  | Suppressed — would flood logs every 15s           |

### Alert Fatigue Prevention

| Rule                                  | Implementation                                                             |
| ------------------------------------- | -------------------------------------------------------------------------- |
| Checks use `WARN`, not `ERROR`        | Prevents pager from every transient blip                                   |
| K8s retries absorb transient failures | `failureThreshold: 3` on liveness, `2` on readiness                        |
| Startup grace period                  | No probes run for first 30s                                                |
| Degraded != Down                      | `/ready` returns 200 with `status: "degraded"` if non-critical check fails |

---

## 9. Test Cases

```typescript
// test/health.e2e-spec.ts
describe("Health (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [HealthModule],
    })
      .overrideProvider(DatabaseHealthIndicator)
      .useValue(mockDb)
      .overrideProvider(RedisHealthIndicator)
      .useValue(mockRedis)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it("GET /health returns 200 with process info", async () => {
    const res = await request(app.getHttpServer()).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.uptime).toBeGreaterThan(0);
    expect(res.body.timestamp).toBeDefined();
  });

  it("GET /ready returns 200 when all dependencies are up", async () => {
    mockDb.pingCheck.mockResolvedValue({ database: { status: "up" } });
    mockRedis.pingCheck.mockResolvedValue({ redis: { status: "up" } });

    const res = await request(app.getHttpServer()).get("/ready");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("GET /ready returns 503 when database is down", async () => {
    mockDb.pingCheck.mockRejectedValue(
      new HealthCheckError("DB down", {
        database: { status: "down", error: "Connection refused" },
      }),
    );
    mockRedis.pingCheck.mockResolvedValue({ redis: { status: "up" } });

    const res = await request(app.getHttpServer()).get("/ready");
    expect(res.status).toBe(503);
    expect(res.body.status).toBe("error");
  });

  it("GET /ready returns degraded when only Redis is down", async () => {
    mockDb.pingCheck.mockResolvedValue({ database: { status: "up" } });
    mockRedis.pingCheck.mockRejectedValue(
      new HealthCheckError("Redis down", {
        redis: { status: "down", error: "ETIMEOUT" },
      }),
    );

    const res = await request(app.getHttpServer()).get("/ready");
    expect(res.status).toBe(503); // Terminus throws on any failure
  });

  it("GET /ready returns 503 during graceful shutdown", async () => {
    app.get(HealthController).setShuttingDown(true);
    const res = await request(app.getHttpServer()).get("/ready");
    expect(res.status).toBe(503);
    expect(res.body.message).toContain("Shutting down");
    app.get(HealthController).setShuttingDown(false);
  });
});
```

---

## 10. Edge Cases & Mitigations

| Edge Case                                      | Mitigation                                                                      |
| ---------------------------------------------- | ------------------------------------------------------------------------------- |
| Prisma connection pool exhausted               | `$queryRawUnsafe` uses a pooled connection; timeout after 5s prevents cascading |
| Redis connection timeout                       | 3s timeout — short enough to not hang `/ready`; non-critical /health unaffected |
| Meilisearch not configured                     | `MeiliSearchHealthIndicator` returns `{ status: 'skipped' }` if env missing     |
| Disk check on read-only filesystem             | `DiskHealthIndicator` reads `statvfs` — safe read-only operation                |
| Pod during shutdown                            | `shuttingDown` flag returns 503 on both `/health` and `/ready`                  |
| Rapid repeated polling (e.g. K8s 15s interval) | No side effects; checks are read-only; responses cached by K8s, not app         |
| SIGTERM before server starts                   | Graceful shutdown handler checks if `app` is initialized before closing         |
