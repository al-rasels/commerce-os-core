# Coding Style: Naming, Formatting, Imports

## Naming Convention Enforcement
- **Components:** PascalCase
- **Hooks:** useSomething
- **Functions:** camelCase with verb-first naming
- **Variables:** camelCase
- **Constants:** UPPER_SNAKE_CASE
- **Types:** PascalCase
- **Files:** Follow existing project convention.
Never mix multiple naming styles.

## Formatting
- Never manually invent formatting.
- Respect project formatter, lint rules, spacing, line breaks, and indentation.
- Generated code should pass formatting without manual editing.

## Import Rules
Always maintain consistent import order:
1. External libraries
2. Shared modules
3. Feature modules
4. Relative modules
5. Styles
Never reorder inconsistently.
