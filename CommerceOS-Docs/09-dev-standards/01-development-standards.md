# Development Standards

## 1. Folder Structure (backend)

```
/modules/{engine}/{module}/
  entities/ repositories/ services/ controllers/ dto/ events/ tests/
```

## 2. Naming Conventions

- Tables: snake_case, plural (`product_variants`)
- Entities/Classes: PascalCase (`ProductVariant`)
- Feature flags: dot-namespaced (`inventory.advanced`, `builder.dragdrop`)
- Component registry IDs: `{kebab-name}.v{n}` (`hero.v1`, `product-grid.v2`)
- Cache keys: `{tenantId}:{module}:{key}`
- Events: `{entity}.{action}` past tense (`order.created`, `theme.updated`)

## 3. Git Workflow

- Trunk-based with short-lived feature branches (`feat/`, `fix/`, `chore/`)
- No direct commits to `main` — PR required, min 1 review
- PR template must include: which engine/module touched, tenant-isolation checklist (agent guide §1), test evidence

## 4. Code Review Checklist (non-negotiables from agent guide, enforced here)

- [ ] Tenant-scoped queries verified
- [ ] No cross-module direct table access
- [ ] No hardcoded plan checks outside platform module
- [ ] No hardcoded design tokens in components
- [ ] Tests included (unit minimum; isolation regression test if new tenant table)

## 5. Testing Layers

```
Unit           — service/component logic
Integration    — module boundaries, DB isolation
E2E            — critical flows (checkout, tenant provisioning, page publish)
Load           — shared-infra noisy-neighbor scenarios (Phase 2+)
Security       — auth bypass, cross-tenant access attempts
Accessibility  — automated (axe-core) on all components
```

## 6. Documentation-with-Code Rule

Any new module, engine boundary, or pattern not already in this handbook gets a short doc addition in the same PR (agent guide §6) — docs and code ship together, not as a follow-up.

## 7. Release Process

- Migrations follow expand/contract (database doc §7) for zero-downtime deploys
- Feature flags used to dark-launch risky changes per-tenant before global rollout
