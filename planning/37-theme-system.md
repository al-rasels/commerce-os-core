e# Theme System Implementation Plan: 4-Theme Matrix

## Overview

Implement a 2-axis theme matrix with 4 visual modes controlled by a `data-theme` attribute on `<html>`:

| `data-theme` | Background | Accent Style | Visual Feel |
|---|---|---|---|
| `dark-muted` | Deep navy/slate | Subtle indigo | Current admin (dark, professional) |
| `dark-colorful` | Near-black | Vibrant violet + cyan | "Black colorful" (energetic) |
| `light-muted` | White/light gray | Subtle dark tones | "White mode" (clean, minimal) |
| `light-colorful` | White | Vibrant violet + cyan | "White colorful" (bright, playful) |

---

## Step 1: Define 4 Complete Color Palettes

### 1a. Update `ColorTokens` Interface

**File:** `packages/design-tokens/tokens.ts`

Change `ColorTokens` from flat keys to nested `muted`/`colorful` variants:

```typescript
export interface VariantColorTokens {
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  primaryContrast: string;
  accent: string;
  accentContrast: string;
  success: string;
  successContrast: string;
  warning: string;
  warningContrast: string;
  error: string;
  errorContrast: string;
}

export interface ColorTokens {
  muted: VariantColorTokens;
  colorful: VariantColorTokens;
}
```

### 1b. Add 4 Color Sets to `defaultTokens`

**File:** `packages/design-tokens/tokens.ts`

Replace the current `colors.light` and `colors.dark` with:

```typescript
export const defaultTokens: DesignTokens = {
  colors: {
    dark: {
      muted: {
        surface: "#0f1117",
        surfaceMuted: "#1a1d2e",
        text: "#f0f1f5",
        textMuted: "#8a8fa8",
        border: "#2a2e3f",
        primary: "#e8e9f0",
        primaryContrast: "#0f1117",
        accent: "#818cf8",
        accentContrast: "#0f1117",
        success: "#4ade80",
        successContrast: "#0f1117",
        warning: "#fbbf24",
        warningContrast: "#0f1117",
        error: "#f87171",
        errorContrast: "#0f1117",
      },
      colorful: {
        surface: "#0a0a0f",
        surfaceMuted: "#14141f",
        text: "#f5f5ff",
        textMuted: "#8888bb",
        border: "#2a2a4a",
        primary: "#7c3aed",
        primaryContrast: "#ffffff",
        accent: "#06b6d4",
        accentContrast: "#ffffff",
        success: "#10b981",
        successContrast: "#ffffff",
        warning: "#f59e0b",
        warningContrast: "#ffffff",
        error: "#ef4444",
        errorContrast: "#ffffff",
      },
    },
    light: {
      muted: {
        surface: "#ffffff",
        surfaceMuted: "#f5f5f5",
        text: "#111111",
        textMuted: "#666666",
        border: "#e5e5e5",
        primary: "#1a1a2e",
        primaryContrast: "#ffffff",
        accent: "#6366f1",
        accentContrast: "#ffffff",
        success: "#16a34a",
        successContrast: "#ffffff",
        warning: "#d97706",
        warningContrast: "#ffffff",
        error: "#dc2626",
        errorContrast: "#ffffff",
      },
      colorful: {
        surface: "#ffffff",
        surfaceMuted: "#faf5ff",
        text: "#0f0f1a",
        textMuted: "#5a5a8a",
        border: "#e8e0f0",
        primary: "#7c3aed",
        primaryContrast: "#ffffff",
        accent: "#0891b2",
        accentContrast: "#ffffff",
        success: "#059669",
        successContrast: "#ffffff",
        warning: "#d97706",
        warningContrast: "#ffffff",
        error: "#dc2626",
        errorContrast: "#ffffff",
      },
    },
  },
  // ... rest stays the same
};
```

---

## Step 2: Create CSS Variable Generator

**New file:** `packages/theme-engine/src/css-variables.ts`

A utility that generates CSS custom property declarations from the design tokens:

```typescript
import type { DesignTokens } from "@commerceos/design-tokens";

type ThemeId = 'dark-muted' | 'dark-colorful' | 'light-muted' | 'light-colorful';

const THEME_IDS: ThemeId[] = ['dark-muted', 'dark-colorful', 'light-muted', 'light-colorful'];

const CSS_VAR_MAP: Record<string, string> = {
  surface: '--color-surface',
  surfaceMuted: '--color-surface-muted',
  text: '--color-foreground',
  textMuted: '--color-text-muted',
  border: '--color-border',
  primary: '--color-primary',
  primaryContrast: '--color-primary-foreground',
  accent: '--color-accent',
  accentContrast: '--color-accent-foreground',
  success: '--color-success',
  successContrast: '--color-success-contrast',
  warning: '--color-warning',
  warningContrast: '--color-warning-contrast',
  error: '--color-error',
  errorContrast: '--color-error-contrast',
};

export function generateThemeCSS(tokens: DesignTokens): string {
  let css = '';

  for (const themeId of THEME_IDS) {
    const [mode, variant] = themeId.split('-') as [string, string];
    const colors = tokens.colors[mode as keyof typeof tokens.colors][variant as keyof VariantColorTokens];

    css += `[data-theme="${themeId}"] {\n`;
    for (const [key, varName] of Object.entries(CSS_VAR_MAP)) {
      css += `  ${varName}: ${colors[key]};\n`;
    }

    // Add derived semantic colors
    css += `  --color-muted: color-mix(in oklab, var(--color-surface) 95%, var(--color-primary));\n`;
    css += `  --color-muted-foreground: var(--color-text-muted);\n`;
    css += `  --color-card: var(--color-surface);\n`;
    css += `  --color-card-foreground: var(--color-foreground);\n`;
    css += `  --color-popover: var(--color-surface);\n`;
    css += `  --color-popover-foreground: var(--color-foreground);\n`;
    css += `  --color-secondary: color-mix(in oklab, var(--color-surface) 90%, var(--color-accent));\n`;
    css += `  --color-secondary-foreground: var(--color-foreground);\n`;
    css += `  --color-destructive: var(--color-error);\n`;
    css += `  --color-destructive-foreground: var(--color-error-contrast);\n`;
    css += `  --color-ring: color-mix(in oklab, var(--color-primary) 50%, transparent);\n`;
    css += `  --color-input: var(--color-border);\n`;
    css += `}\n\n`;
  }

  return css;
}
```

---

## Step 3: Replace Admin's `index.css`

**File:** `apps/admin/src/index.css`

Replace the current content with the 4 theme blocks. Each theme block defines the full set of CSS variables using OKLCH for perceptual uniformity:

### Dark Muted (current admin — deep navy/slate)

```css
[data-theme="dark-muted"] {
  --color-surface: oklch(0.12 0.01 270);
  --color-surface-muted: oklch(0.15 0.015 270);
  --color-foreground: oklch(0.96 0.005 260);
  --color-text-muted: oklch(0.65 0.015 260);
  --color-border: oklch(0.25 0.015 270);
  --color-primary: oklch(0.92 0.01 260);
  --color-primary-foreground: oklch(0.12 0.01 270);
  --color-accent: oklch(0.6 0.18 270);
  --color-accent-foreground: oklch(0.12 0.01 270);
  --color-success: oklch(0.7 0.2 145);
  --color-success-contrast: oklch(0.12 0.01 270);
  --color-warning: oklch(0.75 0.2 85);
  --color-warning-contrast: oklch(0.12 0.01 270);
  --color-error: oklch(0.7 0.2 25);
  --color-error-contrast: oklch(0.985 0.002 80);
  --color-muted: oklch(0.2 0.01 270);
  --color-muted-foreground: oklch(0.65 0.015 260);
  --color-card: oklch(0.15 0.015 270);
  --color-card-foreground: oklch(0.96 0.005 260);
  --color-popover: oklch(0.15 0.015 270);
  --color-popover-foreground: oklch(0.96 0.005 260);
  --color-secondary: oklch(0.22 0.015 270);
  --color-secondary-foreground: oklch(0.96 0.005 260);
  --color-destructive: oklch(0.7 0.2 25);
  --color-destructive-foreground: oklch(0.985 0.002 80);
  --color-ring: oklch(0.6 0.18 270 / 0.5);
  --color-input: oklch(0.25 0.015 270);
}
```

### Dark Colorful ("Black Colorful" — near-black, vibrant accents)

```css
[data-theme="dark-colorful"] {
  --color-surface: oklch(0.08 0.005 270);
  --color-surface-muted: oklch(0.12 0.015 270);
  --color-foreground: oklch(0.97 0.01 270);
  --color-text-muted: oklch(0.55 0.05 270);
  --color-border: oklch(0.2 0.03 280);
  --color-primary: oklch(0.55 0.22 270);
  --color-primary-foreground: oklch(0.98 0.005 270);
  --color-accent: oklch(0.65 0.25 190);
  --color-accent-foreground: oklch(0.98 0.005 270);
  --color-success: oklch(0.6 0.2 145);
  --color-success-contrast: oklch(0.98 0.005 270);
  --color-warning: oklch(0.65 0.2 85);
  --color-warning-contrast: oklch(0.98 0.005 270);
  --color-error: oklch(0.6 0.22 25);
  --color-error-contrast: oklch(0.98 0.005 270);
  --color-muted: oklch(0.15 0.02 270);
  --color-muted-foreground: oklch(0.55 0.05 270);
  --color-card: oklch(0.12 0.015 270);
  --color-card-foreground: oklch(0.97 0.01 270);
  --color-popover: oklch(0.12 0.015 270);
  --color-popover-foreground: oklch(0.97 0.01 270);
  --color-secondary: oklch(0.18 0.02 280);
  --color-secondary-foreground: oklch(0.97 0.01 270);
  --color-destructive: oklch(0.6 0.22 25);
  --color-destructive-foreground: oklch(0.98 0.005 270);
  --color-ring: oklch(0.55 0.22 270 / 0.6);
  --color-input: oklch(0.2 0.03 280);
}
```

### Light Muted ("White Mode" — clean, minimal)

```css
[data-theme="light-muted"] {
  --color-surface: oklch(0.98 0.005 270);
  --color-surface-muted: oklch(0.965 0.005 270);
  --color-foreground: oklch(0.15 0.01 270);
  --color-text-muted: oklch(0.5 0.01 270);
  --color-border: oklch(0.9 0.005 270);
  --color-primary: oklch(0.25 0.02 270);
  --color-primary-foreground: oklch(0.98 0.005 270);
  --color-accent: oklch(0.55 0.15 270);
  --color-accent-foreground: oklch(0.98 0.005 270);
  --color-success: oklch(0.55 0.18 145);
  --color-success-contrast: oklch(0.98 0.005 270);
  --color-warning: oklch(0.6 0.18 85);
  --color-warning-contrast: oklch(0.98 0.005 270);
  --color-error: oklch(0.55 0.2 25);
  --color-error-contrast: oklch(0.98 0.005 270);
  --color-muted: oklch(0.95 0.005 270);
  --color-muted-foreground: oklch(0.5 0.01 270);
  --color-card: oklch(0.995 0.002 270);
  --color-card-foreground: oklch(0.15 0.01 270);
  --color-popover: oklch(0.995 0.002 270);
  --color-popover-foreground: oklch(0.15 0.01 270);
  --color-secondary: oklch(0.93 0.005 270);
  --color-secondary-foreground: oklch(0.15 0.01 270);
  --color-destructive: oklch(0.55 0.2 25);
  --color-destructive-foreground: oklch(0.98 0.005 270);
  --color-ring: oklch(0.55 0.15 270 / 0.4);
  --color-input: oklch(0.9 0.005 270);
}
```

### Light Colorful ("White Colorful" — bright, playful)

```css
[data-theme="light-colorful"] {
  --color-surface: oklch(0.985 0.002 80);
  --color-surface-muted: oklch(0.97 0.005 290);
  --color-foreground: oklch(0.1 0.01 270);
  --color-text-muted: oklch(0.45 0.05 270);
  --color-border: oklch(0.88 0.01 280);
  --color-primary: oklch(0.5 0.22 270);
  --color-primary-foreground: oklch(0.98 0.005 270);
  --color-accent: oklch(0.55 0.25 190);
  --color-accent-foreground: oklch(0.98 0.005 270);
  --color-success: oklch(0.5 0.2 145);
  --color-success-contrast: oklch(0.98 0.005 270);
  --color-warning: oklch(0.55 0.2 85);
  --color-warning-contrast: oklch(0.98 0.005 270);
  --color-error: oklch(0.5 0.22 25);
  --color-error-contrast: oklch(0.98 0.005 270);
  --color-muted: oklch(0.95 0.005 290);
  --color-muted-foreground: oklch(0.45 0.05 270);
  --color-card: oklch(0.995 0.002 80);
  --color-card-foreground: oklch(0.1 0.01 270);
  --color-popover: oklch(0.995 0.002 80);
  --color-popover-foreground: oklch(0.1 0.01 270);
  --color-secondary: oklch(0.93 0.005 290);
  --color-secondary-foreground: oklch(0.1 0.01 270);
  --color-destructive: oklch(0.5 0.22 25);
  --color-destructive-foreground: oklch(0.98 0.005 270);
  --color-ring: oklch(0.5 0.22 270 / 0.5);
  --color-input: oklch(0.88 0.01 280);
}
```

### Keep these unchanged in `index.css`:

```css
@import "tailwindcss";

@theme inline {
  --color-background: var(--color-surface);
  --color-foreground: var(--color-foreground);
  --color-card: var(--color-card);
  --color-card-foreground: var(--color-card-foreground);
  --color-popover: var(--color-popover);
  --color-popover-foreground: var(--color-popover-foreground);
  --color-primary: var(--color-primary);
  --color-primary-foreground: var(--color-primary-foreground);
  --color-secondary: var(--color-secondary);
  --color-secondary-foreground: var(--color-secondary-foreground);
  --color-muted: var(--color-muted);
  --color-muted-foreground: var(--color-muted-foreground);
  --color-accent: var(--color-accent);
  --color-accent-foreground: var(--color-accent-foreground);
  --color-destructive: var(--color-destructive);
  --color-destructive-foreground: var(--color-destructive-foreground);
  --color-border: var(--color-border);
  --color-input: var(--color-input);
  --color-ring: var(--color-ring);
  --radius-xs: 0.25rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.625rem;
  --radius-xl: 0.75rem;
  --font-sans: "Inter", system-ui, sans-serif;
}

@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-border, currentColor);
  }

  html {
    color: var(--color-foreground);
    background-color: var(--color-surface);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background: radial-gradient(
      ellipse 80% 50% at 50% -20%,
      color-mix(in oklab, var(--color-primary) 15%, transparent),
      transparent
    );
    min-height: 100vh;
  }
}
```

**Changes from current:**
- Remove `@custom-variant dark (&:is(.dark *));` — no longer needed
- Change `html { background-color: var(--color-background); }` → `var(--color-surface)`
- Change body gradient to use `var(--color-primary)` instead of hardcoded oklch
- Add `--color-success-contrast`, `--color-warning-contrast`, `--color-error-contrast` to `@theme inline`

---

## Step 4: Create ThemeContext Provider

**New file:** `apps/admin/src/contexts/ThemeContext.tsx`

```typescript
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type ThemeMode = 'dark-muted' | 'dark-colorful' | 'light-muted' | 'light-colorful';

const THEME_KEY = 'admin_theme';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved && ['dark-muted', 'dark-colorful', 'light-muted', 'light-colorful'].includes(saved)) {
      return saved as ThemeMode;
    }
    return 'dark-muted';
  });

  const setTheme = (newTheme: ThemeMode) => {
    localStorage.setItem(THEME_KEY, newTheme);
    setThemeState(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
```

---

## Step 5: Wire ThemeProvider into App

**File:** `apps/admin/src/main.tsx`

Add `ThemeProvider` wrapping `AuthProvider`:

```typescript
import { ThemeProvider } from '@/contexts/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
```

---

## Step 6: Update `index.html`

**File:** `apps/admin/index.html`

Remove the `class="dark"` that was added earlier — the `data-theme` attribute is now managed by `ThemeProvider`:

```html
<html lang="en">
```

---

## Step 7: Build ThemeSwitcher Component

**New file:** `apps/admin/src/components/ThemeSwitcher.tsx`

A dropdown component with 4 options, each with an icon and label:

```tsx
import { useState } from 'react';
import { useTheme, type ThemeMode } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Palette, Sparkles } from 'lucide-react';

const THEMES: { id: ThemeMode; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'dark-muted', label: 'Dark (Muted)', icon: Moon, color: '#818cf8' },
  { id: 'dark-colorful', label: 'Dark Colorful', icon: Sparkles, color: '#7c3aed' },
  { id: 'light-muted', label: 'Light (Muted)', icon: Sun, color: '#6366f1' },
  { id: 'light-colorful', label: 'Light Colorful', icon: Palette, color: '#7c3aed' },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  // Implementation: dropdown with 4 items, each showing icon + label + color dot
  // On click: setTheme(theme.id), close dropdown, persist to localStorage
}
```

Place this component in `AdminLayout.tsx` sidebar footer, below the "Change Password" link.

---

## Step 8: Audit Hardcoded Color Classes

Search for hardcoded Tailwind color classes across the admin app and replace with semantic CSS variable references:

| Hardcoded Tailwind Class | Replace With |
|---|---|
| `bg-zinc-50`, `bg-gray-50`, `bg-white` | `bg-background` |
| `bg-zinc-100`, `bg-gray-100` | `bg-muted` |
| `text-zinc-900`, `text-gray-900`, `text-black` | `text-foreground` |
| `text-zinc-500`, `text-gray-500` | `text-muted-foreground` |
| `border-zinc-200`, `border-gray-200` | `border` |
| `bg-zinc-900` | `bg-card` or `bg-primary` |
| `text-zinc-100`, `text-white` (on dark bg) | `text-primary-foreground` or `text-card-foreground` |

**Key files to audit:**
- `apps/admin/src/pages/LoginPage.tsx` — uses `bg-zinc-50`, `bg-zinc-950`, `bg-zinc-50`, `text-zinc-900` etc.
- `apps/admin/src/layouts/AdminLayout.tsx` — sidebar uses `bg-sidebar` (should be fine if shadcn)
- `apps/admin/src/pages/DashboardPage.tsx` — uses `bg-gradient-to-br`, `bg-muted/30` etc.
- All page components in `apps/admin/src/pages/*`

---

## Step 9: Apply to Storefront (Next.js)

**File:** `apps/storefront/src/app/globals.css` (or equivalent)

Add the same 4 `[data-theme]` CSS blocks. The storefront's CSS variables should map to the same token names.

**File:** `apps/storefront/src/app/layout.tsx`

Add a `ThemeProvider` similar to the admin's, reading from `localStorage` with key `storefront_theme`.

---

## Implementation Order

| Phase | Step | Files | Time |
|---|---|---|---|
| 1 | Define color tokens | `packages/design-tokens/tokens.ts` | 1h |
| 2 | Rewrite admin `index.css` with 4 themes | `apps/admin/src/index.css` | 1.5h |
| 3 | Create ThemeContext + ThemeProvider | `apps/admin/src/contexts/ThemeContext.tsx`, `main.tsx` | 0.5h |
| 4 | Update `index.html` | `apps/admin/index.html` | 5min |
| 5 | Build ThemeSwitcher UI | `apps/admin/src/components/ThemeSwitcher.tsx`, `AdminLayout.tsx` | 1h |
| 6 | Audit + fix hardcoded colors in admin | All `apps/admin/src/pages/*.tsx` | 3-4h |
| 7 | Apply to storefront | `apps/storefront/` | 2-3h |

**Total estimated time: ~9-11 hours**