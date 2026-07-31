# 38 — Full-Project Code Audit: Mission Prompt (Corrected & Complete)

> **Purpose:** This is the corrected, complete version of the original request.
> It is a reusable prompt/brief for running a full-project code audit and
> producing an actionable global findings list for the next build sessions.

## Original Request (as given)

> deploy multiple agents in different parts of the project giving them task to
> analyse and audit code for static, stale, erroneous and unnecessary or
> un-implemented code, features, block, functions, method and anything unfinished,
> collect them, create a full global list of things that are still necessary to
> focus or need to fix or implementing, save that doc to next task folder with
> instruction how to do it best methods. Before you do anything first make
> correction and create a complete prompt of my prompt.

## Corrected & Expanded Brief

### Mission Statement

Deploy a **fleet of audit agents**, each scoped to a **different region** of the
CommerceOS monorepo, to systematically find and catalogue every piece of code
that is **static, stale, erroneous, unnecessary, or unimplemented/unfinished**.
Collect all findings into **one global, ranked list**, then hand that list to the
next build sessions with **best-practice execution instructions**.

### Audit Categories (the 5 buckets)

| # | Category | What to hunt for |
|---|----------|------------------|
| 1 | **Static** | Hard-coded values/config that should be dynamic or environment-driven (magic numbers, inline secrets, frozen lists, hard-coded URLs/tenant ids, non-configurable behavior). |
| 2 | **Stale** | Leftover/superseded code: orphaned files, commented-out blocks, dead branches, old API versions, obsolete dependencies, abandoned features, stale config/docs referencing things that no longer exist, leftover artifacts (diffs, dumps). |
| 3 | **Erroneous** | Bugs and incorrect logic: wrong types/references, inverted conditions, broken error handling, mismatched contracts between frontend/backend/types, miswired handlers. |
| 4 | **Unnecessary** | Redundant or duplicate code: unused imports/exports, unused functions/methods/variables, duplicated implementations, pointless abstractions, dead endpoints, redundant config. |
| 5 | **Unimplemented / Unfinished** | Stubs and placeholders: `TODO`/`FIXME`/`HACK`/`XXX`, functions that throw "not implemented", empty bodies, `pass`-only methods, half-wired features, "coming soon" UI, missing handlers/endpoints, disconnected events. |

### Method

1. **Partition** the monorepo into audit regions (see Regions below).
2. **Deploy one agent per region** in parallel, each using the shared
   Audit Checklist + Severity Rubric below.
3. Each agent returns **structured findings**: `file:line`, short snippet,
   category (1–5), severity, confidence, and a recommended action.
4. **Collect, dedupe, and rank** all findings into **one global list**.
5. Save the global list **and** an execution guide into `.tasks/next/` so the
   next sessions can act on it immediately.

### Audit Regions (this monorepo)

- `apps/api` — backend services, routes, middleware, DB access
- `apps/storefront` — customer-facing frontend
- `apps/admin` — admin panel frontend
- `packages/components` — shared UI components
- `packages/design-tokens`, `packages/theme-engine`, `packages/ui-config` — design system & theming
- `packages/shared-types` — shared type contracts
- `tests/` — test suites
- Infra & config — root config, docker, CI (.github), env, tooling
- Docs & meta — planning/, docs, reports (alignment checks)

### Shared Audit Checklist (every agent applies this)

- [ ] Scan region for `TODO`, `FIXME`, `HACK`, `XXX`, `BUG`, `TEMP`, `WIP`, "not implemented"
- [ ] Find stubs / empty bodies / `throw new Error("not implemented")` / `pass`
- [ ] Find orphaned files & commented-out code blocks
- [ ] Find unused imports, exports, functions, variables (cross-reference usages)
- [ ] Find duplicate implementations of the same logic
- [ ] Find dead branches (unreachable code, impossible conditions)
- [ ] Find hard-coded values that should be config/env-driven
- [ ] Find broken references (imports/calls to symbols that don't exist)
- [ ] Find obsolete deps in package manifests; dead assets/fixtures
- [ ] Note anything half-wired (created but not connected, or connected but not finished)

### Severity Rubric

| Severity | Meaning | Typical action |
|----------|---------|----------------|
| **Critical** | Breaks runtime, security, or data integrity | Fix now |
| **High** | Real bug or missing feature; blocks a workflow | Fix next |
| **Medium** | Dead/stale/unnecessary; clean up when touching file | Remove/refactor |
| **Low** | Style/drift/trivial cleanup | Do last / batch |

Confidence: **High** (certain) or **Medium** (likely, needs human verification).

### Deliverables

1. `planning/38-code-audit-mission-prompt.md` — **this corrected prompt** (reusable brief).
2. `.tasks/next/06-code-audit-findings.md` — **the full global list** of
   everything that needs focus / fixing / implementing (ranked, categorized,
   with file:line evidence).
3. `.tasks/next/07-code-audit-action-guide.md` — **best-methods instructions**
   per category for how to fix/implement/remove each item.

### Output Rule

Every finding MUST include: `file:line`, snippet, category, severity,
confidence, recommended action. No bare "there's an issue in X" — always
evidence + action.
