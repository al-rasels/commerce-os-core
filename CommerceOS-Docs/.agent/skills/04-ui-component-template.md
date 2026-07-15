---
name: frontend-ui-component
description: Exact template and architectural rules for building elite, reusable React UI components. Use this skill WHENEVER generating a new UI component.
---

# Skill — Elite Frontend UI Component

When tasked with creating or modifying a reusable UI component in this project, you MUST use this exact template and architecture. This ensures absolute consistency, fluid responsiveness, zero-latency prefetching, and robust variant handling.

## 1. Architectural Rules
1. **Component Contract:** Define strict prop interfaces extending `React.ComponentPropsWithoutRef`.
2. **Variant Engine:** Use `cva` (Class Variance Authority) for all visual variants (size, color, layout). Never use messy chained ternaries for classes.
3. **Class Merging:** Always wrap `cva()` output in the `cn()` utility (`clsx` + `tailwind-merge`) to allow safe class overrides from parents.
4. **Micro-Interactions:** All interactive elements must have a 150ms `ease-out` transition for hover/focus states (`transition-all duration-150 ease-out`).
5. **Prefetching:** Any internal navigation link MUST utilize `<Link prefetch={true}>` and, where applicable, hover-based data prefetching.

## 2. Exact Code Template

```tsx
import * as React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils'; // Assumes cn utility exists in packages/components

// 1. Define CVA Variants
const componentVariants = cva(
  // Base styles applied to ALL variants. 
  // MUST include transitions for elite fluency (150ms ease-out).
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:brightness-110 active:scale-95',
        destructive: 'bg-destructive text-destructive-foreground hover:brightness-110 active:scale-95',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-95',
        ghost: 'hover:bg-accent hover:text-accent-foreground active:scale-95',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10', // Touch target min 40x40
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// 2. Define Props Interface
// Extends native HTML button attributes AND the CVA variant props
export interface ComponentProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, 
  VariantProps<typeof componentVariants> {
  
  // Custom props
  isLoading?: boolean;
  href?: string; // If provided, renders as a Link for zero-latency prefetching
}

// 3. Component Implementation
export const EliteComponent = React.forwardRef<HTMLButtonElement, ComponentProps>(
  ({ className, variant, size, isLoading, href, children, ...props }, ref) => {
    
    // Elite Pattern: Intent-driven routing
    if (href) {
      return (
        <Link 
          href={href} 
          prefetch={true} // CRITICAL: Zero-latency prefetching
          className={cn(componentVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="absolute animate-spin">
            {/* Standard Spinner SVG */}
            <svg className="h-4 w-4" viewBox="0 0 24 24">...</svg>
          </span>
        ) : null}
        
        {/* Prevent layout shift during loading state by hiding text but keeping width */}
        <span className={cn(isLoading && 'opacity-0')}>
          {children}
        </span>
      </button>
    );
  }
);
EliteComponent.displayName = 'EliteComponent';
```

## 3. Mandatory Testing (Jest)

You MUST include a snapshot and behavior test adjacent to the component.

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EliteComponent } from './EliteComponent';

describe('EliteComponent', () => {
  it('renders base variant correctly (snapshot)', () => {
    const { container } = render(<EliteComponent>Click Me</EliteComponent>);
    expect(container).toMatchSnapshot();
  });

  it('renders as a prefetching Link when href is provided', () => {
    render(<EliteComponent href="/test">Nav Link</EliteComponent>);
    const link = screen.getByRole('link', { name: /nav link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });
});
```
