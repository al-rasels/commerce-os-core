# Session 01: Environment Setup & Monorepo Alignment

**Milestone:** `M1: Foundation`
**Engine:** `Platform Engine (Module 1)`
**Task IDs:** `T-PLAT-M1-000`, `T-OPS-001`, `T-OPS-002`

## Context
As identified in Gap Analysis (Pass 3), the codebase requires foundational alignment before actual feature coding begins. This session guarantees that the `package.json` dependencies match our strict requirements, development containers (Postgres, Redis) are cleanly scaffolded, and the frontend testing frameworks are properly wired into the Turborepo graph.

## Acceptance Criteria

- [ ] `T-PLAT-M1-000`: Audit `package.json` across all apps and packages. 
    - Remove `csurf` (deprecated) and `bcrypt` (banned in favor of `argon2`).
    - Verify `vitest` (or `jest`) is successfully wired into all frontend applications.
- [ ] `T-OPS-001`: Set up a reproducible local development environment via `docker-compose.yml` for Postgres 15 and Redis 7.
- [ ] `T-OPS-002`: Ensure all environment variables `.env.example` templates exist and correctly map to the local containers.
- [ ] The `lint`, `test`, and `build` commands pass successfully in Turborepo (`npx turbo run lint test build`).
- [ ] No tenant-isolation violations or architectural drifts were introduced during environment setup.

## Next Step
Once completed, this task must be moved to `.tasks/completed/`, and work will seamlessly transition into `session-02-tenant-resolution.md`.
