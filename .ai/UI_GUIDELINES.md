# UI Guidelines: Components, Styles, Accessibility

## Component Rules
Each component must have:
- Single responsibility.
- Small surface area.
- Minimal nesting.
- No duplicated JSX.
- No duplicated business logic.
If a component exceeds the project's normal size, split into reusable components.

## Styling Rules
- Never mix styling systems.
- If the project uses Tailwind, use Tailwind. If CSS Modules, use CSS Modules. If Styled Components, use Styled Components.
- Do not introduce alternatives.
- Follow existing class ordering.

## Accessibility
Every UI must maintain accessibility:
- Keyboard navigation.
- ARIA where appropriate.
- Proper semantic HTML.
- Focus management.
- Color contrast.
- Accessible forms.
