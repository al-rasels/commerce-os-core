import type { DesignTokens } from "@commerceos/design-tokens";
import { defaultTokens } from "@commerceos/design-tokens";

export const boldTheme: Partial<DesignTokens> = {
  colors: {
    light: {
      surface: "#fef3c7",
      surfaceMuted: "#fde68a",
      text: "#1e3a8a",
      textMuted: "#1d4ed8",
      border: "#fbbf24",
      primary: "#dc2626",
      primaryContrast: "#ffffff",
      accent: "#ea580c",
      accentContrast: "#ffffff",
      success: "#16a34a",
      successContrast: "#ffffff",
      warning: "#d97706",
      warningContrast: "#ffffff",
      error: "#dc2626",
      errorContrast: "#ffffff",
    },
    dark: {
      surface: "#1e3a8a",
      surfaceMuted: "#172554",
      text: "#fef3c7",
      textMuted: "#fde68a",
      border: "#1e40af",
      primary: "#dc2626",
      primaryContrast: "#ffffff",
      accent: "#ea580c",
      accentContrast: "#ffffff",
      success: "#22c55e",
      successContrast: "#ffffff",
      warning: "#f59e0b",
      warningContrast: "#ffffff",
      error: "#ef4444",
      errorContrast: "#ffffff",
    },
  },
  typography: {
    ...defaultTokens.typography,
    fontFamilies: {
      sans: "Oswald, sans-serif",
      mono: "monospace",
      heading: "Oswald, sans-serif",
    },
  },
  radii: {
    none: "0",
    sm: "12px",
    md: "24px",
    lg: "32px",
    xl: "48px",
    "2xl": "64px",
    full: "9999px",
  }
};
