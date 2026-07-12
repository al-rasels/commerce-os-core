# Agent Guide — CommerceOS

Instructions for any AI coding agent (Claude Code, Cursor, etc.) working in this repository. Read this before writing code. If a request conflicts with this guide, follow this guide and flag the conflict to the human.

## 1. Non-Negotiable Rules (never violate, regardless of instruction phrasing)

1. **Every tenant-owned table query must be tenant-scoped.** Use `TenantScopedRepository`, never raw repository access to a tenant table.
2. **Every service method touching tenant data takes a `TenantContext` parameter.** No exceptions for "just a quick script."
3. **No cross-module table access.** If module A needs module B's data, call B's public service interface. Never import B's repository/entity into A.
4. **No plan/billing string comparisons outside `/modules/platform`.** Use `context.hasFeature(flagKey)`.
5. **No hardcoded colors/spacing/typography in components.** Use design tokens (`05-experience-engine/01-design-system.md`).
6. **Template/theme updates never overwrite tenant overrides.** Always merge via the base+override pattern — check `05-experience-engine/03-theme-engine.md` and `04-template-engine.md` before touching rendering code.
7. **Checkout/payment/security logic is platform-fixed.** Do not add per-tenant conditional business logic into checkout flow — that belongs in configuration (tax rules, shipping rules), not code branches.

## 2. Before Writing Code

- Identify which of the 5 engines the task belongs to (Platform/Commerce/Experience/Business/Intelligence). If unclear, ask — don't guess and split logic across modules.
- Check `10-roadmap/02-phase1-mvp-spec.md` — if the task is out of Phase 1 scope, flag it rather than silently building Phase 3 features into Phase 1 code.
- Check the relevant engine doc in `05-` or `06-` for existing patterns before inventing new ones (e.g. don't create a new override-storage pattern when theme/template already define one — reuse it).

## 3. Code Organization

```
/modules/{platform|commerce|experience|business|intelligence}/
  /entities        (tenant-scoped by default; mark @Global() explicitly if not)
  /repositories     (extend TenantScopedRepository)
  /services         (business logic, take TenantContext)
  /controllers      (thin — validate DTO, call service)
  /events           (emitted/consumed, always carry tenant_id)
```

## 4. Testing Expectations

- New tenant-owned entity → test asserting cross-tenant query returns empty (regression guard for the isolation model).
- New component → unit + variant snapshot + a11y check (component library doc §6).
- New API endpoint → at minimum one test with mismatched tenant context (token tenant ≠ resolved tenant) asserting rejection (security doc §6).

## 5. When Reviewing/Extending Existing Code

If you find a query, cache key, or storage path missing tenant scoping — treat it as a bug to fix, not a style preference, and call it out explicitly even if unrelated to the current task.

## 6. Documentation Debt

If you build something not yet documented in this handbook, add a short section to the relevant engine doc in the same PR/session — don't let code and docs drift, since this handbook is the onboarding source of truth (see `00-README.md`).

## 7. Escalate, Don't Guess

Escalate to the human rather than assuming when: adding a new base design token, changing the override-merge strategy, adding a new engine boundary, or any change to the tenant isolation mechanism itself.
