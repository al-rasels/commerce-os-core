# API Conventions: Services, Hooks, Data Fetching

## API Rules
- Always follow the existing API layer.
- Do not fetch directly inside UI unless the project already does so.
- Reuse existing client.
- Reuse interceptors.
- Reuse authentication flow.
- Reuse retry strategy.
- Reuse error strategy.

## State Management
- Respect existing project state hierarchy.
- Never introduce another state management approach.
- Use: Local state ↓ Feature state ↓ Global state (only where appropriate).
- Never promote local state unnecessarily.

## Performance Rules
- Avoid unnecessary rendering.
- Reuse existing memoization strategy.
- Avoid duplicate calculations.
- Avoid unnecessary state.
- Avoid unnecessary effects.
- Lazy load where appropriate.
