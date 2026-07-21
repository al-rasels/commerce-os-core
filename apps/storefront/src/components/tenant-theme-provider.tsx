'use client';

import React, { useEffect } from 'react';

type ResolvedTheme = {
  themeBaseId?: string;
  tokensJson?: Record<string, string>;
  tokens_json?: Record<string, string>;
};

export function TenantThemeProvider({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme?: ResolvedTheme;
}) {
  useEffect(() => {
    const tokens = theme?.tokensJson || theme?.tokens_json;
    if (tokens) {
      const root = document.documentElement;
      Object.entries(tokens).forEach(([key, value]) => {
        // Assume backend returns keys without '--' prefix, add it here
        const varName = key.startsWith('--') ? key : `--${key}`;
        root.style.setProperty(varName, value);
      });
    }
  }, [theme]);

  return <>{children}</>;
}
