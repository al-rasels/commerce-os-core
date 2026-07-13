# Security Rules: Validation, Auth, Secrets

## Security
- Never expose secrets.
- Never trust client input.
- Validate data.
- Sanitize output.
- Escape unsafe content.
- Respect authentication.
- Respect authorization.
- Never bypass security.

## Error Handling
- Never ignore errors.
- Never silently fail.
- Always use existing project error handling.
- Return meaningful errors.
- Keep error messages consistent.
- Never expose internal implementation.

## Logging
- Use only the project's logging strategy.
- Never leave debugging code (e.g. console.log).
