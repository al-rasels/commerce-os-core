import deepmerge from "deepmerge";
import type { DesignTokens } from "@commerceos/design-tokens";
import { defaultTokens } from "@commerceos/design-tokens";
import { minimalTheme } from "./themes/minimal";
import { boldTheme } from "./themes/bold";
import { emeraldLuxeTheme } from "./themes/emerald-luxe";
import { sapphireRoyalTheme } from "./themes/sapphire-royal";
import { violetGlowTheme } from "./themes/violet-glow";
import { amberSunsetTheme } from "./themes/amber-sunset";
import { darkModeProTheme } from "./themes/dark-mode-pro";
import { pastelBeautyTheme } from "./themes/pastel-beauty";
import { highContrastTheme } from "./themes/high-contrast";

export interface MergeResult<T> {
  resolved: T;
  conflicts: string[];
}

export type TenantTokenOverride = Partial<DesignTokens>;

export const ThemeRegistry = {
  default: defaultTokens,
  minimal: minimalTheme,
  bold: boldTheme,
  "emerald-luxe": emeraldLuxeTheme,
  "sapphire-royal": sapphireRoyalTheme,
  "violet-glow": violetGlowTheme,
  "amber-sunset": amberSunsetTheme,
  "dark-mode-pro": darkModeProTheme,
  "pastel-beauty": pastelBeautyTheme,
  "high-contrast": highContrastTheme,
};

export type ThemeBaseId = keyof typeof ThemeRegistry;

export function resolveOverride<T extends Record<string, unknown>>(
  base: T,
  override: Partial<T>,
): MergeResult<T> {
  const conflicts: string[] = [];

  detectConflicts(base, override, "", conflicts);

  const resolved = deepmerge(base, override, {
    arrayMerge: (_target, source) => source,
  }) as T;

  return { resolved, conflicts };
}

export function generateCssVariables(tokens: DesignTokens, mode: "light" | "dark" = "light"): string {
  const c = tokens.colors?.[mode]?.muted || tokens.colors?.light?.muted;
  const t = tokens.typography;
  const r = tokens.radii;
  const s = tokens.spacing;

  if (!c) return "";

  return `
    :root {
      --background: ${c.background};
      --foreground: ${c.foreground};
      --card: ${c.card};
      --card-foreground: ${c.cardForeground};
      --popover: ${c.popover};
      --popover-foreground: ${c.popoverForeground};
      --primary: ${c.primary};
      --primary-foreground: ${c.primaryForeground};
      --secondary: ${c.secondary};
      --secondary-foreground: ${c.secondaryForeground};
      --muted: ${c.muted};
      --muted-foreground: ${c.mutedForeground};
      --accent: ${c.accent};
      --accent-foreground: ${c.accentForeground};
      --destructive: ${c.destructive};
      --destructive-foreground: ${c.destructiveForeground};
      --border: ${c.border};
      --input: ${c.input};
      --ring: ${c.ring};
      --radius-sm: ${r?.sm || "2px"};
      --radius-md: ${r?.md || "6px"};
      --radius-lg: ${r?.lg || "12px"};
      --font-sans: ${t?.fontFamilies?.sans || "sans-serif"};
      --font-heading: ${t?.fontFamilies?.heading || "sans-serif"};
      --font-mono: ${t?.fontFamilies?.mono || "monospace"};
    }
  `.trim();
}

function detectConflicts(base: unknown, override: unknown, path: string, conflicts: string[]) {
  if (override === null || override === undefined) return;
  if (typeof override !== "object") return;
  if (Array.isArray(override)) return;
  if (typeof base !== "object" || base === null) return;
  if (Array.isArray(base)) return;

  for (const key of Object.keys(override as Record<string, unknown>)) {
    const nextPath = path ? `${path}.${key}` : key;
    if (!(key in (base as Record<string, unknown>))) {
      conflicts.push(nextPath);
      continue;
    }
    detectConflicts(
      (base as Record<string, unknown>)[key],
      (override as Record<string, unknown>)[key],
      nextPath,
      conflicts,
    );
  }
}
