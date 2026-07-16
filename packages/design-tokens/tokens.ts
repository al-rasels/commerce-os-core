export interface ColorTokens {
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

export interface TypographyTokens {
  fontFamilies: {
    sans: string;
    mono: string;
    heading: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
    "5xl": string;
    "6xl": string;
  };
  fontWeights: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  lineHeights: {
    none: string;
    tight: string;
    snug: string;
    normal: string;
    relaxed: string;
    loose: string;
  };
  letterSpacings: {
    tight: string;
    normal: string;
    wide: string;
  };
}

export interface SpacingTokens {
  "0": string;
  "0.5": string;
  "1": string;
  "1.5": string;
  "2": string;
  "2.5": string;
  "3": string;
  "3.5": string;
  "4": string;
  "5": string;
  "6": string;
  "7": string;
  "8": string;
  "9": string;
  "10": string;
  "11": string;
  "12": string;
  "14": string;
  "16": string;
  "20": string;
  "24": string;
  "28": string;
  "32": string;
  "36": string;
  "40": string;
  "44": string;
  "48": string;
  "52": string;
  "56": string;
  "60": string;
  "64": string;
  "72": string;
  "80": string;
  "96": string;
}

export interface ShadowTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  inner: string;
}

export interface RadiusTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  full: string;
}

export interface BreakpointTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

export interface DesignTokens {
  colors: {
    light: ColorTokens;
    dark: ColorTokens;
  };
  spacing: SpacingTokens;
  typography: TypographyTokens;
  shadows: ShadowTokens;
  radii: RadiusTokens;
  breakpoints: BreakpointTokens;
}

export const defaultTokens: DesignTokens = {
  colors: {
    light: {
      surface: "#ffffff",
      surfaceMuted: "#f5f5f5",
      text: "#111111",
      textMuted: "#555555",
      border: "#e2e2e2",
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
    dark: {
      surface: "#0f0f0f",
      surfaceMuted: "#1a1a1a",
      text: "#f5f5f5",
      textMuted: "#a0a0a0",
      border: "#2a2a2a",
      primary: "#818cf8",
      primaryContrast: "#0f0f0f",
      accent: "#818cf8",
      accentContrast: "#0f0f0f",
      success: "#22c55e",
      successContrast: "#0f0f0f",
      warning: "#f59e0b",
      warningContrast: "#0f0f0f",
      error: "#ef4444",
      errorContrast: "#0f0f0f",
    },
  },
  spacing: {
    "0": "0px",
    "0.5": "0.125rem",
    "1": "0.25rem",
    "1.5": "0.375rem",
    "2": "0.5rem",
    "2.5": "0.625rem",
    "3": "0.75rem",
    "3.5": "0.875rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
    "11": "2.75rem",
    "12": "3rem",
    "14": "3.5rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "44": "11rem",
    "48": "12rem",
    "52": "13rem",
    "56": "14rem",
    "60": "15rem",
    "64": "16rem",
    "72": "18rem",
    "80": "20rem",
    "96": "24rem",
  },
  typography: {
    fontFamilies: {
      sans: "'Inter Variable', 'Inter', ui-sans-serif, system-ui, sans-serif",
      mono: "'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, monospace",
      heading: "'Inter Variable', 'Inter', ui-sans-serif, system-ui, sans-serif",
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },
    fontWeights: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeights: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
    },
    letterSpacings: {
      tight: "-0.025em",
      normal: "0em",
      wide: "0.025em",
    },
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  },
  radii: {
    none: "0px",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    full: "9999px",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};
