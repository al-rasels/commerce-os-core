import type { DesignTokens } from "@commerceos/design-tokens";
import { defaultTokens } from "@commerceos/design-tokens";

export const minimalTheme: Partial<DesignTokens> = {
  colors: {
    light: {
      surface: "#ffffff",
      surfaceMuted: "#fafafa",
      text: "#000000",
      textMuted: "#666666",
      border: "#eaeaea",
      primary: "#000000",
      primaryContrast: "#ffffff",
      accent: "#000000",
      accentContrast: "#ffffff",
      success: "#000000",
      successContrast: "#ffffff",
      warning: "#000000",
      warningContrast: "#ffffff",
      error: "#000000",
      errorContrast: "#ffffff",
    },
    dark: {
      surface: "#000000",
      surfaceMuted: "#111111",
      text: "#ffffff",
      textMuted: "#888888",
      border: "#333333",
      primary: "#ffffff",
      primaryContrast: "#000000",
      accent: "#ffffff",
      accentContrast: "#000000",
      success: "#ffffff",
      successContrast: "#000000",
      warning: "#ffffff",
      warningContrast: "#000000",
      error: "#ffffff",
      errorContrast: "#000000",
    },
  },
  typography: {
    ...defaultTokens.typography,
    fontFamilies: {
      sans: "Inter, sans-serif",
      mono: "monospace",
      heading: "Inter, sans-serif",
    },
  },
  radii: {
    none: "0",
    sm: "0",
    md: "0",
    lg: "0",
    xl: "0",
    "2xl": "0",
    full: "0",
  }
};
