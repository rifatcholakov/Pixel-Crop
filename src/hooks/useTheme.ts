import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
    // 1. Initialize state prioritizing localStorage, then falling back to OS settings
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('pixelcrop-theme') as Theme | null;
            if (stored === 'light' || stored === 'dark') {
                return stored;
            }
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'light'; // Default to light if no OS preference is broadcasted
    });

    // 2. Synchronize theme state with the DOM and localStorage
    useEffect(() => {
        const root = window.document.documentElement;
        
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }

        localStorage.setItem('pixelcrop-theme', theme);
    }, [theme]);

    // 3. Listen to OS-level theme changes in real-time (only if the user hasn't explicitly set a preference)
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            // If there's no stored preference, automatically switch based on OS behavior
            if (!localStorage.getItem('pixelcrop-theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme };
}
