# Session 07 — Code Audit: Action Guide (Best Methods)

## Status: NEXT

## Dependencies

- [x] `06-code-audit-findings.md` (the global list this guide executes)
- [x] Mission prompt: `planning/38-code-audit-mission-prompt.md`

## Objective

Give the next build sessions a proven, ordered method for clearing the audit
findings: **P0 first, then P1, then P2/P3 while touching files.** Each section
below is a playbook for one action type with the general best-practice first,
then repo-specific steps.

---

## 0. Working rules (read these first)

1. **Fix one contract per pass.** The #1 failure mode in this repo is *two
   implementations disagreeing* (client vs server, source vs `dist`, schema vs
   DTO, doc vs code). For every task, find the **source of truth** for that
   layer, fix it, then rebuild consumers. Do not patch the symptom in two places.
2. **Never edit generated output.** `packages/*/dist/`, `prisma/seed.js`,
   `*.tsbuildinfo`, `.turbo/*.log` are generated — fix the source, then rebuild.
3. **`tsc --noEmit` + the test runner are your safety net** after every fix:
   - API: `cd apps/api && npx tsc -p tsconfig.build.json --noEmit && npx jest`
   - Admin/storefront/components: `npx tsc --noEmit && npx vitest run`
   - Repo: `npx turbo build && npm test`
4. **Verify claims before deleting.** Confidence "Medium" items need a 30-second
   grep to confirm the symbol really has no reference. Deleting is permanent.
5. **Delete > comment out.** Do not leave commented-out code; git history has it.
6. **Small atomic commits** with the finding ID (e.g. `fix(audit): P1-6 wrap
   catalog findMany where-clauses`). Makes the audit trail verifiable.

---

## 1. Playbook: FIX (contract mismatches & bugs) — P0-1..P0-9, P1-1..P1-42

**Best practice:** change the fewest layers to satisfy the existing contract, or
explicitly migrate the contract in one commit (never two).

### 1a. Prisma delegate / where-clause bugs (P0-1, P1-6, P1-8, P1-14, P1-16, P2-22)
1. Open the model in `apps/api/prisma/schema.prisma` and confirm the **exact
   delegate name** (`model TaxRule` → `prisma.taxRule`, not `tax_rule`).
2. Check the repository's `super(prisma, '...')` string against that name.
3. Grep the repo for the same wrong string (`grep -rn "'tax_rule'" apps/api/src`).
4. For `findMany` misuse: every non-`where` object must be wrapped —
   `findMany(ctx, { where: { slug: dto.slug } })`. Grep for `findMany(ctx, { [a-z_]+:` to find remaining offenders.
5. Add a tiny repo test asserting the delegate resolves and the where-clause
   filters by tenant before closing the task.

### 1b. Route↔DTO↔schema mismatches (P0-3, P0-4, P0-8, P1-7, P1-17, P1-36, P1-37, P1-38, P2-17, P2-42)
1. Print the real surface from code, not docs:
   - Routes: `grep -rn "@(Get|Post|Patch|Put|Delete)" apps/api/src/modules | grep Controller`
   - DTO→model: compare `dto/*.dto.ts` fields against the Prisma model.
2. Pick the direction: **DTO maps to schema** (rename/add fields) or **schema
   gains a column** (migration). Do not leave both.
3. Fix the client to call the real route; run `npm test` and a manual curl of
   one endpoint before/after.

### 1c. DI / instantiation bugs (P0-2, P1-15, P2-11, P2-13)
1. Replace `new PrismaService()` / `new X()` inside request handlers with
   constructor injection in the controller/service.
2. If a controller is unreachable, register it in the right module (`grep -n
   "controllers:" apps/api/src/**/*.module.ts`) or delete it.
3. Watch for duplicate route registration (P2-12): two controllers on the same
   path — keep the dedicated one.

### 1d. Frontend state / session bugs (P1-1, P1-2, P1-3, P1-4)
1. Pick ONE state holder for auth (`auth-store.ts` zustand persisted store) and
   route every read/write through it; delete `localStorage` ad-hoc reads.
2. Logout must call the API to clear the HttpOnly cookie **before** clearing
   client state.
3. Totals: compute in ONE place. Either the backend returns `total_cents`
   (incl. shipping/tax) and the UI renders it, or the UI computes and the
   backend charges the same formula. Never both independently.

---

## 2. Playbook: IMPLEMENT (mocks, disconnected workers, missing features)

**Best practice:** backend already exists → wire it. Backend doesn't exist →
build the smallest real endpoint first, then the UI. Do not gate a real feature
behind "Phase 1 MVP" copy.

- **Mocks that became pages** (Analytics, Visual Builder, returns/subscriptions/
  B2B, checkout-summary, cart-drawer, dashboard sparkline, cart cross-sells):
  1. Grep the backend for a matching module; if it serves data, consume it.
  2. If not, either (a) implement the smallest endpoint or (b) remove/gate the
     page + its nav entry + update docs. **Never ship fake numbers as production.**
  3. For dashboard sparkline: aggregate `order.created_at` per day — a real
     SQL `GROUP BY date_trunc('day', created_at)` beats fabricated percentages.
- **Disconnected workers** (search-sync P2-20): register the queue
  (`registerQueue('search_sync')` in the module) and emit jobs from the write
  path (catalog product upsert/delete). Add a unit test that a product update
  enqueues.
- **Husky** (P2-59): `npx husky add .husky/pre-commit "npx lint-staged"` and
  `.husky/commit-msg "npx --no -- commitlint --edit $1"`; commit the files.
- **E2E** (P2-53, P2-57): add root `playwright.config.ts` (testDir `tests/e2e`,
  webServer storefront `:3001`), a `test:e2e` script, and a CI step with
  `npx playwright install --with-deps`.
- **Email flows** (forgot-password / invite): wire the existing `resend`
  dependency into a mailer service; remove the `// In production, send email`
  comments. Until then mark the feature explicitly incomplete.

---

## 3. Playbook: REMOVE (dead code, committed artifacts, unused deps)

**Best practice:** remove at the edges first (unused exports/imports), then
unreferenced files, then build artifacts; verify with grep and `git status`.

1. **Unused imports/var/exports:** run `npx eslint --fix` and
   `npx depcheck`/`knip` (add temporarily) to find them; remove; re-run tests.
2. **Unreferenced files** (home-client, mobile-nav, ProvisionTenantDialog,
   TenantCacheService, dead hooks, fix-*.js, copy-components.js):
   `grep -rn "<symbol>" --include="*.ts*" apps packages` → confirm zero hits → `git rm`.
3. **Committed artifacts** (P0-9/P1-43/P1-44/P1-45, .turbo logs, seed.js,
   `nul`, starter SVGs, `.agents/*.zip`): `git rm` the file; add the pattern to
   `.gitignore` (`*.diff`, `*.rdb`, `.graphify/`, `.gsd/`, `.ai/`, `.opencode/`,
   `.npx-cache/`, `nul`). Consider `git filter-repo` ONLY if the repo goes public
   (it rewrites history — get sign-off first).
4. **Unused deps:** remove from the owning package.json, then `npm install` to
   sync the lockfile. For k6, note that the real binary is NOT an npm package —
   remove `k6@0.0.0` and document the standalone tool instead.
5. **Duplicate implementations** (ProductClient vs ProductPageClient, breadcrumb
   vs breadcrumbs, DataTable wrapper, local type copies): keep ONE, delete the
   rest, then update all importers (grep each importer).
6. **Stale `dist/` + old-API specs** (P1-29/P1-34/P2-58): rebuild the package
   (`rm -rf dist && tsc`), then fix consumers against the new API — do this in
   the same commit as the consumer updates so the tree never half-resolves.

---

## 4. Playbook: CONFIGURE (env, config, versions, secrets)

**Best practice:** no silent defaults for security-relevant values; one source
of truth per dimension; fail fast in production.

1. **Env contract** (P1-46): regenerate `.env.example` from the code — grep
   every `process.env.*` in apps/ and packages/, list those, and diff against
   `.env.example`. Delete keys nothing reads (or wire them). Never document a
   value code doesn't use.
2. **Secrets** (P1-19, Meilisearch key, Stripe key, preview-secret):
   remove all `|| 'default-secret'` fallbacks; throw at bootstrap when missing
   in non-dev; centralize so guards and modules read the same config.
3. **CORS** (P1-16): `origin: '*'` + `credentials: true` is illegal — require
   `CORS_ORIGIN` outside dev; use an explicit allowlist.
4. **Versions** (P1-47): pick Node 22 (CI) and Postgres 16 (CI/README); align
   `README.md`, `Dockerfile`, `docker-compose.yml`, CI, and `run.bat` in one
   commit. Admin port: 5173 everywhere (delete `ADMIN_URL`).
5. **Tokens** (P1-22, P2-27): settle on the nested variant schema; make the
   generator emit the exact var names consumers reference; rebuild `dist`.

---

## 5. Playbook: VERIFY (uncertain, contradictory, or environment-dependent)

**Best practice:** resolve with evidence before acting; the answer may be "no
change needed" — record that.

- Schema drift (P1-17): run `npx prisma migrate diff --from-migrations
  prisma/migrations --to-schema-datamodel prisma/schema.prisma` and reconcile.
- Stale reports (P0-9, P2-62/63/64/67, UI-AUDIT-REPORT): regenerate from code;
  add a status column ("Done / Partial / Not built") so future readers aren't
  misled.
- ComponentMetadata gating (P2-28) and `TenantAdminController` registration
  (P2-13): grep the registry/schema and module list; align keys and unions.
- Controller 200-vs-401 e2e expectations (P1-20): mint a real token or assert
  401 — never leave a test that contradicts the guard.
- Theme-engine spec (P2-55): add `"test": "vitest run"` + config so it actually
  runs; if it fails, fix the code not the test.

---

## 6. Suggested execution order (batched into sessions)

1. **Session A — unblock the runtime:** P0-1 (tax/shipping delegates), P0-2
   (PrismaClient DI), P0-3/P0-4 (storefront data layer), P0-5 (CSRF), P0-6
   (components compile), P0-7 (auth spec crash). Verify: `turbo build` + `npm test` green.
2. **Session B — repo hygiene:** P0-8 (super-admin path), P0-9 + P1-43/44/45
   (conflicts/rdb/graphify + gitignore), P1-46/P1-47 (env + versions). One commit each.
3. **Session C — API correctness:** P1-6..P1-21 (catalog/builder where-clauses,
   variant DTO, softDelete, auth role, permission guards, inventory/returns,
   cart/checkout tenant scoping).
4. **Session D — storefront + admin real wiring:** P1-1..P1-5, P1-35..P1-42,
   P2-1..P2-10, P2-38..P2-52 (state, checkout, mocks→real, role gating).
5. **Session E — design system convergence:** P1-22..P1-28, P2-25..P2-36
   (one token schema, theme application, ui-config, shared-types).
6. **Session F — tests & tools:** P1-29/P1-34/P2-53..P2-58 + P2-59/60/61
   (rewrite stale specs, wire E2E/k6/husky, remove dead deps).
7. **Session G — docs & meta:** P2-62..P2-67, P3 batch cleanup, then regenerate
   PROGRESS_REPORT/MASTER_TASKLIST from the now-true code.

## Acceptance criteria for this guide

- [ ] Every P0 has a commit referencing its ID and the tree builds + tests pass.
- [ ] No remaining `|| 'secret'` fallbacks, fake totals, or mock "pending implementation" pages.
- [ ] `.env.example`, README, docker-compose, CI, and app configs agree on versions/ports/keys.
- [ ] `git status` shows no `.graphify/`, `*.rdb`, `*.diff`, `dist/*.spec.js`, or generated logs.
- [ ] All tests run in CI (unit + e2e), and skipped/placeholder tests are gone.
- [ ] PROGRESS_REPORT.md and MASTER_TASKLIST.md match the actual code.

## Notes

- This guide assumes the findings in `06-code-audit-findings.md`; re-verify each
  item (grep + read) before acting — a month-old audit line is a hint, not a fact.
- When a session is done, move its task file to `.tasks/completed/` and ensure
  `next/` still has a prepared task (per `.tasks/README.md`).
