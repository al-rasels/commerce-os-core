import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type ThemeMode = 'dark-muted' | 'dark-colorful' | 'light-muted' | 'light-colorful';

const THEME_KEY = 'admin_theme';
const VALID_THEMES: ThemeMode[] = ['dark-muted', 'dark-colorful', 'light-muted', 'light-colorful'];

interface ThemeContextType {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<ThemeMode>(() => {
        try {
            const saved = localStorage.getItem(THEME_KEY);
            if (saved && VALID_THEMES.includes(saved as ThemeMode)) {
                return saved as ThemeMode;
            }
        } catch {
            // localStorage unavailable
        }
        return 'dark-muted';
    });

    const setTheme = (newTheme: ThemeMode) => {
        try {
            localStorage.setItem(THEME_KEY, newTheme);
        } catch {
            // localStorage unavailable
        }
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