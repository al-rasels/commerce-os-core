# Docker Compose (Feature 3.1)

## Services Overview

| Service       | Image / Build                    | Port | Dependencies                        | Phase       |
| ------------- | -------------------------------- | ---- | ----------------------------------- | ----------- |
| `postgres`    | `postgis/postgres:16`            | 5432 | —                                   | P1          |
| `redis`       | `redis:7-alpine`                 | 6379 | —                                   | P1          |
| `api`         | `./docker/api/Dockerfile`        | 4000 | postgres (healthy), redis (healthy) | P1          |
| `storefront`  | `./docker/storefront/Dockerfile` | 3000 | api                                 | P2          |
| `admin`       | `./docker/admin/Dockerfile`      | 3001 | api                                 | P2          |
| `meilisearch` | `getmeili/meilisearch:v1.12`     | 7700 | —                                   | P3 (opt-in) |

## Networking

```
┌────────────────────────────────────────────────────────────────────────┐
│                        commerce-net (bridge)                            │
│                                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ postgres │  │  redis   │  │   api    │  │storefront│  │  admin   │ │
│  │ :5432    │  │ :6379    │  │ :4000    │  │ :3000    │  │ :3001    │ │
│  └──────────┘  └──────────┘  └────┬─────┘  └──────────┘  └──────────┘ │
│                                    │                                    │
│  ┌─────────────────────────────────┴──────────────────────────────┐    │
│  │                   Internal: backend only                        │    │
│  │  postgres, redis ←→ api only (storefront/admin → api via HTTP) │    │
│  └────────────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────────┘
```

## Volumes

| Volume             | Mount                      | Purpose                                    |
| ------------------ | -------------------------- | ------------------------------------------ |
| `postgres_data`    | `/var/lib/postgresql/data` | DB persistence                             |
| `redis_data`       | `/data`                    | AOF persistence                            |
| `api_node_modules` | `/app/node_modules`        | Named volume to avoid bind-mount conflicts |

## Full docker-compose.yml

```yaml
version: "3.9"

name: commerce-os

x-common: &restart-policy
  restart: unless-stopped

x-api-env: &api-env
  NODE_ENV: ${NODE_ENV:-development}
  DATABASE_URL: ${DATABASE_URL:-postgresql://commerce:commerce_pass@postgres:5432/commerce_os}
  REDIS_HOST: ${REDIS_HOST:-redis}
  REDIS_PORT: ${REDIS_PORT:-6379}
  REDIS_PASSWORD: ${REDIS_PASSWORD:-}
  JWT_SECRET: ${JWT_SECRET}
  JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
  CORS_ORIGINS: ${CORS_ORIGINS:-http://localhost:3000,http://localhost:3001}
  PORT: 4000

services:
  postgres:
    <<: *restart-policy
    image: postgis/postgres:16
    container_name: commerce-postgres
    ports:
      - "${POSTGRES_PORT:-5432}:5432"
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-commerce}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-commerce_pass}
      POSTGRES_DB: ${POSTGRES_DB:-commerce_os}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docker/postgres/init:/docker-entrypoint-initdb.d
    healthcheck:
      test:
        [
          "CMD-SHELL",
          "pg_isready -U ${POSTGRES_USER:-commerce} -d ${POSTGRES_DB:-commerce_os}",
        ]
      interval: 5s
      timeout: 5s
      retries: 5
      start_period: 10s
    networks:
      - commerce-net

  redis:
    <<: *restart-policy
    image: redis:7-alpine
    container_name: commerce-redis
    ports:
      - "${REDIS_PORT:-6379}:6379"
    command: >
      redis-server
      --appendonly yes
      --requirepass ${REDIS_PASSWORD:-}
      --save 60 1
      --save 300 10
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
      start_period: 5s
    networks:
      - commerce-net

  api:
    <<: *restart-policy
    build:
      context: .
      dockerfile: docker/api/Dockerfile${NODE_ENV:-dev}
    container_name: commerce-api
    ports:
      - "${API_PORT:-4000}:4000"
    environment:
      <<: *api-env
    volumes:
      - ${API_VOLUME_SRC:-.}/apps/api:/app/apps/api
      - ${API_VOLUME_SRC:-.}/packages:/app/packages
      - api_node_modules:/app/node_modules
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - commerce-net

  storefront:
    <<: *restart-policy
    build:
      context: .
      dockerfile: docker/storefront/Dockerfile${NODE_ENV:-dev}
    container_name: commerce-storefront
    ports:
      - "${STOREFRONT_PORT:-3000}:3000"
    environment:
      NODE_ENV: ${NODE_ENV:-development}
      NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL:-http://localhost:4000/api/v1}
      NEXT_PUBLIC_STOREFRONT_URL: ${NEXT_PUBLIC_STOREFRONT_URL:-http://localhost:3000}
    volumes:
      - ${STOREFRONT_VOLUME_SRC:-.}/apps/storefront:/app/apps/storefront
      - ${STOREFRONT_VOLUME_SRC:-.}/packages:/app/packages
    depends_on:
      - api
    networks:
      - commerce-net

  admin:
    <<: *restart-policy
    build:
      context: .
      dockerfile: docker/admin/Dockerfile${NODE_ENV:-dev}
    container_name: commerce-admin
    ports:
      - "${ADMIN_PORT:-3001}:3001"
    environment:
      NODE_ENV: ${NODE_ENV:-development}
      VITE_API_URL: ${VITE_API_URL:-http://localhost:4000/api/v1}
    volumes:
      - ${ADMIN_VOLUME_SRC:-.}/apps/admin:/app/apps/admin
      - ${ADMIN_VOLUME_SRC:-.}/packages:/app/packages
    depends_on:
      - api
    networks:
      - commerce-net

  meilisearch:
    <<: *restart-policy
    image: getmeili/meilisearch:v1.12
    container_name: commerce-meilisearch
    ports:
      - "${MEILISEARCH_PORT:-7700}:7700"
    environment:
      MEILI_MASTER_KEY: ${MEILISEARCH_MASTER_KEY:-}
      MEILI_ENV: ${NODE_ENV:-development}
    volumes:
      - meilisearch_data:/meili_data
    profiles:
      - search
    networks:
      - commerce-net

volumes:
  postgres_data:
  redis_data:
  api_node_modules:
  meilisearch_data:

networks:
  commerce-net:
    driver: bridge
```

## Postgres Init Script

`docker/postgres/init/01-extensions.sql`:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
```

## Dev vs Prod Dockerfiles

### Dockerfile.dev (all services)

| Feature    | Dev                                        | Prod                                                        |
| ---------- | ------------------------------------------ | ----------------------------------------------------------- |
| Base image | `node:22-alpine`                           | `node:22-alpine` (builder) → `node:22-alpine-slim` (runner) |
| Install    | `npm install` (all deps)                   | `npm ci --omit=dev`                                         |
| Build      | TypeScript watch mode                      | `npm run build`                                             |
| Run        | `nest start --watch` / `next dev` / `vite` | `node dist/main` / `next start` / nginx static              |
| Hot reload | Yes                                        | No                                                          |
| User       | `root`                                     | `node` (non-root)                                           |

### Prod Multi-Stage Pattern (api)

```dockerfile
# Stage 1 — Install + Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --scope=@commerce/api

# Stage 2 — Production
FROM node:22-alpine-slim AS runner
WORKDIR /app
RUN addgroup -S commerce && adduser -S commerce -G commerce
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
USER commerce
EXPOSE 4000
CMD ["node", "dist/apps/api/main.js"]
```

## Environment Variables

| Variable                 | Default         | Required | Description            |
| ------------------------ | --------------- | -------- | ---------------------- |
| `NODE_ENV`               | `development`   | No       | Runtime mode           |
| `API_PORT`               | `4000`          | No       | API host port          |
| `STOREFRONT_PORT`        | `3000`          | No       | Storefront host port   |
| `ADMIN_PORT`             | `3001`          | No       | Admin host port        |
| `POSTGRES_PORT`          | `5432`          | No       | Postgres host port     |
| `REDIS_PORT`             | `6379`          | No       | Redis host port        |
| `POSTGRES_USER`          | `commerce`      | No       | DB user                |
| `POSTGRES_PASSWORD`      | `commerce_pass` | No       | DB password            |
| `POSTGRES_DB`            | `commerce_os`   | No       | DB name                |
| `DATABASE_URL`           | computed        | No       | Full connection string |
| `REDIS_PASSWORD`         | —               | No       | Redis AOF password     |
| `JWT_SECRET`             | —               | **Yes**  | Access token secret    |
| `JWT_REFRESH_SECRET`     | —               | **Yes**  | Refresh token secret   |
| `MEILISEARCH_MASTER_KEY` | —               | No       | Meilisearch API key    |

## Health Check Dependencies

```
postgres (healthy) ─┐
                    ├──→ api (healthy) ──→ storefront
redis (healthy)   ──┘                  └──→ admin
```

- `api` uses `depends_on` with `condition: service_healthy` for both `postgres` and `redis`
- `storefront` and `admin` use simple `depends_on` (no health condition) — they only connect via HTTP

## .env File Template

```env
NODE_ENV=development

# Ports
API_PORT=4000
STOREFRONT_PORT=3000
ADMIN_PORT=3001

# Database
POSTGRES_USER=commerce
POSTGRES_PASSWORD=commerce_pass
POSTGRES_DB=commerce_os
DATABASE_URL=postgresql://commerce:commerce_pass@localhost:5432/commerce_os

# Redis
REDIS_PASSWORD=
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=change-me-to-a-random-64-char-string
JWT_REFRESH_SECRET=change-me-to-another-random-64-char-string

# Meilisearch (opt-in)
MEILISEARCH_MASTER_KEY=change-me
```

## Usage

```bash
# Start all core services (dev)
docker compose up -d

# Start with search profile
docker compose --profile search up -d

# Rebuild API after Dockerfile changes
docker compose build api

# Production mode
NODE_ENV=production docker compose up -d

# View logs
docker compose logs -f api
```
