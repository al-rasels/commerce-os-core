# AGENTS.md — CommerceOS

This is the entrypoint file. Any AI coding agent (Claude Code, Cursor, etc.) opening this repo reads this file first, before touching any code. It exists so the agent never has to guess architecture, naming, or scope — every guess is a chance to drift from the spec.

## 0. What This Project Is

Multi-tenant e-commerce SaaS platform ("CommerceOS"). Five engines: Platform, Commerce, Experience, Business, Intelligence (see `02-architecture/01-system-architecture.md`). Currently in Phase 1 build (see `10-roadmap/02-phase1-mvp-spec.md`).

**Foundation: custom build, decided.** No OSS commerce core (Vendure/Medusa) is used — see `13-resources/01-reference-implementations-and-starters.md` Decision Log for why. `14-data-contracts/` is the literal source of truth for the Commerce Engine (REST APIs, Postgres/Prisma schema, `tenant_id`-column isolation). Never introduce GraphQL, Vendure/Medusa entities, or Channel-based tenancy concepts — that decision is closed, not a live option to reconsider mid-task.

## 1. Read Order Before Any Task

1. This file
2. `.agent/rules/` — all four rule files, in order (01 through 04). These are hard constraints, not suggestions.
3. The specific engine doc for your task (`05-experience-engine/*` or `06-commerce-business-engines/*`)
4. `14-data-contracts/01-phase1-entities.md` — exact field names/types. **Never invent a field name.** If a field you need isn't there, add it to the contract doc in the same session, don't silently invent it in code only.
5. `11-build-guide/01-session-by-session-build-guide.md` — which session/milestone this task belongs to

## 2. The Absolute Rules (full detail in `.agent/rules/`)

1. No tenant-owned data is ever queried, cached, stored, or queued without a resolved `TenantContext`.
2. No module imports another module's entities/repositories directly — only its exported service interface.
3. No hardcoded plan/billing checks outside `/modules/platform`.
4. No hardcoded colors/spacing/typography — design tokens only.
5. No field, table, or API shape invented without first checking `14-data-contracts/`.
6. No new architectural pattern (new merge strategy, new isolation mechanism, new engine) without flagging it to the human first — see escalation rules §5 below.

## 3. If You're Uncertain

Uncertainty is not a green light to improvise. In order of preference:
1. Search this docs folder for the answer (`grep -r` across the doc set is legitimate and expected).
2. Check `14-data-contracts/` for the exact shape.
3. If genuinely undocumented, add a minimal, explicit note to the relevant doc proposing the answer, flag it clearly in your response to the human as "assumed X, please confirm," and proceed — don't block on trivial gaps, but never proceed silently on architectural ones (§5).

## 4. Never Hallucinate These

- Table/column names → `14-data-contracts/01-phase1-entities.md` is the only source of truth. Not the vision doc, not memory of "how e-commerce schemas usually look."
- API routes/shapes → `14-data-contracts/02-api-contracts.md`.
- Component prop shapes → `14-data-contracts/03-component-contracts.md`.
- Which package to use for X → `12-tech-stack-and-packages/02-package-catalog.md`. Do not suggest or install a library not listed there without flagging it.

## 5. Escalate, Don't Guess (mandatory stop conditions)

Stop and ask the human before proceeding if the task requires:
- Adding/changing a base design token
- Changing the tenant isolation mechanism (query-scoping, cache-keying, storage-prefixing)
- Changing the theme/template override-merge strategy
- Adding a new top-level engine or module
- Choosing between building a feature custom vs. using an adopted foundation's built-in equivalent (Vendure/Medusa)
- Any change touching auth, payments, or the checkout state machine's core transitions

## 6. Task Pipeline (`.tasks/`)

The project uses a strict task tracking system in the `.tasks/` directory (`backlog/`, `next/`, `in-progress/`, `completed/`). 
**Rule:** Before completing any task in `in-progress/` and marking it done, you MUST ensure that the `next/` folder contains at least one fully prepared task file for the next session. Never leave the pipeline empty.

## 7. Definition of Done for Any Task

- [ ] Tenant-scoping verified for any new tenant-owned data path
- [ ] No cross-module direct table/entity access introduced
- [ ] Data contract doc updated if any new field/endpoint/component prop was introduced
- [ ] Tests added per `.agent/rules/04-testing-requirements.md`
- [ ] Relevant doc updated if a new pattern was introduced (docs-with-code rule)

## 7. File Map (quick index)

```
# Documentation (CommerceOS-Docs/)
.agent/AGENTS.md                              this file
.agent/rules/                                  hard constraints (read all 4 before coding)
.agent/skills/                                 exact code templates for recurring tasks
14-data-contracts/                             exact schemas — the anti-hallucination layer
11-build-guide/                                session-by-session execution plan
13-resources/                                  build-vs-adopt decision + OSS references
00-README.md                                   full doc index and reading order

# Live Project (root)
apps/api/                                      NestJS backend (REST API, Prisma, tenant resolution)
apps/storefront/                               Next.js storefront (SSR, tenant-facing)
apps/admin/                                    React + Vite admin dashboard (SPA, merchant-facing)
packages/design-tokens/                        light/dark token definitions
packages/components/                           shared UI component registry + cn() utility
packages/theme-engine/                         resolveOverride() merge logic (single implementation)
packages/shared-types/                         Zod schemas → inferred TS types (single source of truth)
packages/ui-config/                            shared Tailwind preset
apps/api/prisma/schema.prisma                  Phase 1 database schema (17 models, all tenant-scoped)
README.md                                      root project README with full structure reference
```
