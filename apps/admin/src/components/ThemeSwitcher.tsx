import { useState, useRef, useEffect } from 'react';
import { useTheme, type ThemeMode } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

const THEMES: { id: ThemeMode; label: string; preview: string }[] = [
  { id: 'dark-muted', label: 'Indigo Midnight', preview: '#818cf8' },
  { id: 'dark-emerald', label: 'Emerald Luxe (Dark)', preview: '#10b981' },
  { id: 'light-emerald', label: 'Emerald Mint (Light)', preview: '#059669' },
  { id: 'dark-sapphire', label: 'Sapphire Royal', preview: '#3b82f6' },
  { id: 'dark-colorful', label: 'Violet Glow', preview: '#7c3aed' },
  { id: 'light-muted', label: 'Clean White', preview: '#6366f1' },
  { id: 'light-colorful', label: 'Light Colorful', preview: '#a855f7' },
];

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(!open)}
                className="w-full justify-start gap-2 px-2"
            >
                <Palette className="size-4" />
                <span>Themes</span>
            </Button>

            {open && (
                <div className="absolute bottom-full left-0 mb-2 w-48 rounded-lg border bg-popover p-2 shadow-xl z-50">
                    <div className="mb-1 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Switch Theme
                    </div>
                    {THEMES.map((t) => {
                        const isActive = theme === t.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => {
                                    setTheme(t.id);
                                    setOpen(false);
                                }}
                                className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent/10 ${isActive ? 'bg-accent/15 font-medium text-accent' : 'text-foreground'
                                    }`}
                            >
                                <span
                                    className="inline-block size-3 rounded-full border border-border"
                                    style={{ backgroundColor: t.preview }}
                                />
                                <span>{t.label}</span>
                                {isActive && <span className="ml-auto text-xs opacity-50">✓</span>}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}