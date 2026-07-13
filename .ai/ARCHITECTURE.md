# Architecture: Layering & Module Boundaries

## Architecture Enforcement
Respect existing dependency flow. Never violate architectural boundaries.
- Business logic must never leak into UI.
- Presentation must never communicate directly with infrastructure.

### Standard Separation:
UI ↓ Hooks ↓ Business Logic ↓ Services ↓ Repositories ↓ Database
Never reverse this flow.

## Reuse Before Create
Before creating any Component, Hook, Utility, Service, Type, Helper, Constant, Validation schema, or Store, search the project. 
- If an equivalent exists: Reuse it.
- If partially reusable: Extend it.
- Only create new code when absolutely necessary.

## DRY Enforcement
Never duplicate Business logic, Validation, Calculations, API calls, Transformations, Constants, Enums, Regex, Types, Interfaces, or Configurations. Refactor instead.
