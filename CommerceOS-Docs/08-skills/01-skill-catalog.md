# Skill Catalog — CommerceOS

Reusable, invokable procedures for agents/engineers performing recurring tasks in this codebase. Each skill: trigger, steps, guardrails.

## Skill: add-tenant-scoped-entity

**Trigger:** New database table for tenant-owned data.
**Steps:**
1. Add `tenant_id` column (NOT NULL, FK to tenants), indexed first in every composite index.
2. Create entity extending base `TenantScopedEntity`.
3. Repository extends `TenantScopedRepository` (auto-filter injected).
4. Write regression test: seed 2 tenants, assert querying as tenant A never returns tenant B rows.
**Guardrail:** If the table is genuinely global (reference data), mark `@Global()` explicitly and document why in the migration file comment — don't silently omit `tenant_id`.

## Skill: add-component-to-registry

**Trigger:** New reusable UI component for the storefront.
**Steps:**
1. Define `PropSchema` + variants (reuse existing component if only styling differs — see component library doc §1).
2. Consume design tokens only, no hardcoded values.
3. Register with stable ID (`{name}.v1`).
4. Add unit test, per-variant snapshot, a11y check.
**Guardrail:** Breaking prop change → new version ID, never mutate an existing one in place.

## Skill: add-feature-flag-gated-capability

**Trigger:** New capability that should be plan-restricted.
**Steps:**
1. Define flag key (`domain.capability`, e.g. `inventory.advanced`).
2. Map to default plans in plan config (business model doc §2).
3. Gate via `context.hasFeature(key)` at the service layer — never in the controller or UI-only.
**Guardrail:** Never hardcode a plan name check anywhere outside `/modules/platform`.

## Skill: theme-or-template-override-change

**Trigger:** Any change to how theme/template rendering merges base + tenant data.
**Steps:**
1. Confirm the base+override merge pattern still applies (theme-engine.md §2, template-engine.md §5).
2. Never write merchant customization data into the `*_base` tables.
3. Add a migration-safe conflict-resolution path if the base schema changes shape.
**Guardrail:** Escalate to human before changing the merge strategy itself (agent guide §7).

## Skill: cross-module-integration

**Trigger:** Module A needs data/action from Module B.
**Steps:**
1. Check if B already exposes a service interface method for this.
2. If not, add one to B's public service — don't import B's repository into A.
3. If it's a side-effect (not a synchronous need), prefer an event (`B emits`, `A consumes`) over direct call.
**Guardrail:** Never let two modules share a database transaction across module boundaries.

## Skill: new-api-endpoint

**Trigger:** New REST/GraphQL endpoint.
**Steps:**
1. DTO with validation.
2. Controller resolves `TenantContext` from request (never trust a body-supplied tenant_id).
3. Test with mismatched tenant token → assert rejection.
**Guardrail:** No endpoint bypasses the Tenant Context middleware, including internal/debug tooling.
