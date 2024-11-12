// src/hooks/useTheme.tsx
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as Theme) || 'system';
        }
        return 'system';
    });

    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = () => {
            if (theme === 'system') {
                setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    useEffect(() => {
        const newResolvedTheme = theme === 'system'
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : theme;

        setResolvedTheme(newResolvedTheme);

        // Atualiza a classe no documento
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newResolvedTheme);

        // Salva a preferência
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(current => {
            if (current === 'dark') return 'light';
            if (current === 'light') return 'system';
            return 'dark';
        });
    };

    const setThemeMode = (newTheme: Theme) => {
        setTheme(newTheme);
    };

    return {
        theme,
        resolvedTheme,
        toggleTheme,
        setTheme: setThemeMode
    };
}

export default useTheme;