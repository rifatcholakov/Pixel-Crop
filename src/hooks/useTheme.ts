import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'pixelcrop-theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === 'undefined') return 'light';

        const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
        if (stored === 'light' || stored === 'dark') return stored;

        return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia(DARK_QUERY);
        const handleChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem(THEME_STORAGE_KEY)) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    return { theme, toggleTheme };
}
