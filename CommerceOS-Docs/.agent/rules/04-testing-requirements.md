# Rule 04 — Testing Requirements (STRICT — PR blocks without these)

No task is "done" without the tests below. This is not aspirational — treat a missing required test as a build error, not a suggestion.

## 1. New Tenant-Owned Table → Mandatory

- Isolation regression test (Rule 01 §7) — non-negotiable, every single tenant table, no exceptions for "small"/"internal" tables.

## 2. New Authenticated Endpoint → Mandatory

- Happy path test (valid request → expected response)
- Cross-tenant token rejection test (Rule 01 §8)
- Permission-denial test (actor without required permission → 403)
- Input validation test (malformed DTO → 400, not a 500 or silent pass-through)

## 3. New Component (Experience Engine) → Mandatory

- Unit test: given props, renders expected output/structure
- One snapshot test per declared variant
- a11y automated check (axe-core) — zero violations required, not "reduced"
- Token-only usage check: no hardcoded color/spacing value present in the component's styles (grep-checkable: no raw hex, no raw px outside the token file)

## 4. New Cross-Module Interaction → Mandatory

- Test asserting the caller only touches the callee's public service (i.e., mocking the callee's service in the caller's unit test — if the caller can't be tested with the callee's internals mocked out, the boundary is violated, per Rule 02)

## 5. New Merge/Override Logic (theme, template, page layout) → Mandatory

- Test: base + empty override → resolves to base unchanged
- Test: base + partial override → override wins only on overlapping keys, base fills the rest
- Test: base version bump with existing override present → override survives unchanged, no data loss
- Test: conflicting keys (base removes a key the override references) → must be flagged/handled explicitly, never silently dropped or silently crash

## 6. New Concurrency-Sensitive Path (stock reservation, checkout) → Mandatory

- Test: N concurrent requests against 1 unit of stock → exactly 1 succeeds, N-1 receive a clear "out of stock" error, no oversell
- Test: reservation TTL expiry releases stock back to available pool

## 7. Test File Location & Naming

```
{module}/
  {feature}.service.ts
  {feature}.service.spec.ts       ← unit tests, co-located
  {feature}.e2e-spec.ts           ← if the module has a dedicated E2E flow, in module's /test folder
```

## 8. What Counts as "Passing"

- All tests green in CI, not just locally.
- No test skipped/marked `.skip()`/`.todo()` merged into main without an explicit tracked reason and owner — an agent should never silently skip a failing test to make a PR look green.

## 9. Minimum Coverage Expectation (Phase 1)

Not a hard percentage gate (avoid coverage theater), but every Phase 1 milestone in `10-roadmap/02-phase1-mvp-spec.md` must have its "Done When" / acceptance criteria backed by an actual automated test, not a manual click-through claimed as verification.
