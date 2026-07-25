# Feature 3.2 — CI/CD Pipeline

## 1. Problem

No automated pipeline exists. Every push requires manual build, test, and deploy steps. There is no quality gating, no container registry, and no consistent deploy strategy across environments.

## 2. Workflow Triggers

| Trigger             | Branch Pattern | Environment | Description                        |
| ------------------- | -------------- | ----------- | ---------------------------------- |
| `push`              | `main`         | Staging     | Deploys after all gates pass       |
| `push`              | `feature/*`    | —           | Lint, typecheck, test, build only  |
| `pull_request`      | `main`         | —           | PR validation before merge         |
| `workflow_dispatch` | Any            | Manual      | Ad-hoc run for debugging or hotfix |

## 3. Job Pipeline

```
push / PR
  │
  ├── lint ────────────── ESLint all apps/packages + markdownlint docs
  ├── typecheck ───────── tsc --noEmit --strict on all apps/packages
  ├── test ────────────── Jest unit + integration (testcontainers: Postgres + Redis)
  ├── build ───────────── turbo run build, verify Next.js standalone output
  │
  └── main push only
       │
       └── docker ─────── Build & push images to GHCR (:sha, :branch, :latest)
            │
            └── deploy ── Deploy to staging (or production on tag v*.*.*)
```

## 4. Lint

```yaml
lint:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: npm
    - run: npm ci
    - run: npm run lint
    - run: npx markdownlint-cli2 "docs/**/*.md" "*.md"
```

| Lint Target             | Tool              | Scope              |
| ----------------------- | ----------------- | ------------------ |
| `apps/*` + `packages/*` | ESLint            | `turbo run lint`   |
| `docs/` + root `*.md`   | markdownlint-cli2 | All Markdown files |

## 5. Typecheck

```yaml
typecheck:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: npm
    - run: npm ci
    - run: npx tsc --noEmit --strict
```

Runs `tsc --noEmit --strict` against all `tsconfig.json` files. Each workspace `tsconfig.json` must extend a root config with `strict: true`.

## 6. Test

```yaml
test:
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
    - run: npx prisma generate --schema=apps/api/prisma/schema.prisma
    - run: npx prisma migrate deploy --schema=apps/api/prisma/schema.prisma
      env:
        DATABASE_URL: postgresql://commerce:commerce@localhost:5432/commerce_test
    - run: npm test
      env:
        DATABASE_URL: postgresql://commerce:commerce@localhost:5432/commerce_test
        REDIS_HOST: localhost
        REDIS_PORT: 6379
```

| Test Layer  | Tool                  | Scope      | Dependencies          |
| ----------- | --------------------- | ---------- | --------------------- |
| Unit        | Jest                  | `apps/api` | —                     |
| Integration | Jest + testcontainers | `apps/api` | Postgres 17 + Redis 7 |

## 7. Build

```yaml
build:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: npm
    - run: npm ci
    - run: npx turbo run build
    - name: Verify Next.js standalone (api)
      run: test -f apps/api/.next/standalone/server.js
    - name: Verify Next.js standalone (storefront)
      run: test -f apps/storefront/.next/standalone/server.js
    - name: Verify Next.js standalone (admin)
      run: test -f apps/admin/.next/standalone/server.js
```

`turbo run build` builds all workspaces in dependency order. Next.js apps must be configured with `output: "standalone"` in `next.config.js`.

## 8. Docker

```yaml
docker:
  needs: [lint, typecheck, test, build]
  if: github.ref == 'refs/heads/main' || startsWith(github.ref, 'refs/tags/v')
  runs-on: ubuntu-latest
  permissions:
    contents: read
    packages: write
  strategy:
    matrix:
      app: [api, storefront, admin]
  steps:
    - uses: actions/checkout@v4
    - run: |
        IMAGE=ghcr.io/${{ github.repository }}/${{ matrix.app }}
        SHA_TAG=${{ github.sha }}
        BRANCH_TAG=${{ github.ref_name }}
        echo "IMAGE=$IMAGE" >> $GITHUB_ENV
        echo "SHA_TAG=$SHA_TAG" >> $GITHUB_ENV
        echo "BRANCH_TAG=$BRANCH_TAG" >> $GITHUB_ENV
    - name: Log in to GHCR
      run: echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin
    - name: Build and push
      uses: docker/build-push-action@v6
      with:
        context: .
        file: apps/${{ matrix.app }}/Dockerfile
        push: true
        tags: |
          ${{ env.IMAGE }}:${{ env.SHA_TAG }}
          ${{ env.IMAGE }}:${{ env.BRANCH_TAG }}
          ${{ env.IMAGE }}:latest
```

| Image Tag   | Format                         | Example    |
| ----------- | ------------------------------ | ---------- |
| Commit SHA  | `ghcr.io/org/repo/app:sha`     | `:3a8f1c9` |
| Branch name | `ghcr.io/org/repo/app:branch`  | `:main`    |
| Semver tag  | `ghcr.io/org/repo/app:version` | `:1.2.0`   |
| Latest      | `ghcr.io/org/repo/app:latest`  | `:latest`  |

## 9. Deploy

```yaml
deploy-staging:
  needs: [docker]
  if: github.ref == 'refs/heads/main'
  runs-on: ubuntu-latest
  environment: staging
  steps:
    - uses: actions/checkout@v4
    - run: |
        echo "Deploying ${{ github.sha }} to staging..."
        # kubectl set image, docker stack deploy, or SSH-based deploy script
        # ./deploy.sh staging ${{ github.sha }}

deploy-production:
  needs: [docker]
  if: startsWith(github.ref, 'refs/tags/v')
  runs-on: ubuntu-latest
  environment: production
  steps:
    - uses: actions/checkout@v4
    - run: |
        echo "Deploying ${{ github.ref_name }} to production..."
        # ./deploy.sh production ${{ github.ref_name }}
```

| Environment | Trigger        | Artefact             | Deploy Method            |
| ----------- | -------------- | -------------------- | ------------------------ |
| Staging     | Push to `main` | `ghcr.io/...:main`   | SSH / docker stack / k8s |
| Production  | Tag `v*.*.*`   | `ghcr.io/...:v*.*.*` | SSH / k8s rolling update |

## 10. Secrets

| Secret                    | Used In           | Description                                    |
| ------------------------- | ----------------- | ---------------------------------------------- |
| `DATABASE_URL`            | test, deploy      | Postgres connection string                     |
| `REDIS_HOST`              | test              | Redis hostname                                 |
| `REDIS_PORT`              | test              | Redis port                                     |
| `REDIS_PASSWORD`          | deploy, dev       | Redis auth                                     |
| `JWT_SECRET`              | test, deploy      | JWT signing key                                |
| `GHCR_TOKEN`              | docker            | GitHub Container Registry token `GITHUB_TOKEN` |
| `DEPLOY_SSH_KEY`          | deploy            | SSH private key for deploy target              |
| `STAGING_HOST`            | deploy-staging    | Staging server hostname                        |
| `PROD_HOST`               | deploy-production | Production server hostname                     |
| `SENTRY_DSN`              | build, deploy     | Sentry error tracking DSN                      |
| `NEXT_PUBLIC_POSTHOG_KEY` | build             | PostHog analytics key                          |

All secrets stored in GitHub Secrets → mapped to environment variables in each job. Documented in `.env.example`.

```bash
# .env.example (root)
DATABASE_URL=postgresql://user:pass@localhost:5432/commerce
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
JWT_SECRET=change-me
SENTRY_DSN=https://xxx@xxx.ingest.us.sentry.io/xxx
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
```

## 11. Quality Gates

| Gate                              | Enforced At             | Failure Behaviour              |
| --------------------------------- | ----------------------- | ------------------------------ |
| ESLint passes                     | lint job                | ❌ Pipeline halted             |
| TypeScript strict no errors       | typecheck job           | ❌ Pipeline halted             |
| All unit + integration tests pass | test job                | ❌ Pipeline halted             |
| All workspaces build              | build job               | ❌ Pipeline halted             |
| No known CVEs in dependencies     | `npm audit` in lint job | ⚠️ Warning, pipeline continues |
| Docker image builds and pushes    | docker job              | ❌ Deploy skipped              |
| Downstream health check           | deploy job              | ❌ Rollback triggered          |

## 12. Full Workflow

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, "feature/*"]
    tags: ["v*.*.*"]
  pull_request:
    branches: [main]
  workflow_dispatch:

env:
  NODE_VERSION: 22
  REGISTRY: ghcr.io

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npx markdownlint-cli2 "docs/**/*.md" "*.md" || true
      - run: npm audit --audit-level=high || true

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
      - run: npm ci
      - run: npx tsc --noEmit --strict

  test:
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
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
      - run: npm ci
      - run: npx prisma generate --schema=apps/api/prisma/schema.prisma
      - run: npx prisma migrate deploy --schema=apps/api/prisma/schema.prisma
        env:
          DATABASE_URL: postgresql://commerce:commerce@localhost:5432/commerce_test
      - run: npm test
        env:
          DATABASE_URL: postgresql://commerce:commerce@localhost:5432/commerce_test
          REDIS_HOST: localhost
          REDIS_PORT: 6379
          JWT_SECRET: test-secret

  build:
    needs: [lint, typecheck, test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
      - run: npm ci
      - run: npx turbo run build
      - run: |
          for app in api storefront admin; do
            if [ -f "apps/$app/.next/standalone/server.js" ]; then
              echo "✅ $app standalone verified"
            else
              echo "❌ $app standalone missing"
              exit 1
            fi
          done

  docker:
    needs: [lint, typecheck, test, build]
    if: github.ref == 'refs/heads/main' || startsWith(github.ref, 'refs/tags/v')
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    strategy:
      matrix:
        app: [api, storefront, admin]
    steps:
      - uses: actions/checkout@v4
      - name: Docker meta
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ github.repository }}/${{ matrix.app }}
          tags: |
            type=sha,format=short
            type=ref,event=branch
            type=ref,event=tag
            type=raw,value=latest,enable=${{ github.ref == 'refs/heads/main' }}
      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          file: apps/${{ matrix.app }}/Dockerfile
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}

  deploy-staging:
    needs: [docker]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to staging
        run: |
          chmod +x ./scripts/deploy.sh
          ./scripts/deploy.sh staging "${{ github.sha }}"
        env:
          DEPLOY_SSH_KEY: ${{ secrets.DEPLOY_SSH_KEY }}
          DEPLOY_HOST: ${{ secrets.STAGING_HOST }}

  deploy-production:
    needs: [docker]
    if: startsWith(github.ref, 'refs/tags/v')
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: |
          chmod +x ./scripts/deploy.sh
          ./scripts/deploy.sh production "${{ github.ref_name }}"
        env:
          DEPLOY_SSH_KEY: ${{ secrets.DEPLOY_SSH_KEY }}
          DEPLOY_HOST: ${{ secrets.PROD_HOST }}
```

## 13. Deploy Script Contract

```bash
# scripts/deploy.sh
# Usage: ./deploy.sh <environment> <tag>
#   environment: staging | production
#   tag: git SHA or semver (e.g., 3a8f1c9, v1.2.0)
#
# Required env: DEPLOY_SSH_KEY, DEPLOY_HOST
#
# Behaviour:
#   1. SSH into DEPLOY_HOST
#   2. Pull images from GHCR
#   3. docker compose up -d with new tag
#   4. Health check endpoint (10 retries, 5s interval)
#   5. On failure: rollback to previous tag
```

## 14. Edge Cases & Mitigations

| Edge Case                       | Mitigation                                                                       |
| ------------------------------- | -------------------------------------------------------------------------------- |
| Test container unavailable      | `services` block handles health checks; job fails early if DB/Redis unresponsive |
| Build cache miss                | Turborepo remote caching (optional); `npm ci` is deterministic                   |
| Docker push race on matrix      | Each app builds independently; no shared mutable state                           |
| Deploy fails mid-rollout        | `deploy.sh` implements health check + rollback on timeout                        |
| Secret missing for environment  | GitHub Actions env protection — job fails with clear error                       |
| Tag push without version prefix | Regex `v*.*.*` in trigger; non-matching tags skip deploy                         |
| Feature branch triggers deploy  | `if: github.ref == 'refs/heads/main'` guard on docker + deploy                   |
| npm audit false positive        | `--audit-level=high`; warning only, pipeline not blocked                         |
| Concurrent deploys to same env  | GitHub environment exclusivity — sequential queuing                              |
