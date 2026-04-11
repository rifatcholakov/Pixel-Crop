import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTheme } from './useTheme';

describe('useTheme Hook', () => {
    let mockMatchMedia: any;

    beforeEach(() => {
        // Clear DOM and LocalStorage before each test
        document.documentElement.removeAttribute('data-theme');
        localStorage.clear();

        // Setup MatchMedia Mock for default light mode initially
        mockMatchMedia = vi.fn().mockImplementation((query) => ({
            matches: false, // OS prefers light
            media: query,
            onchange: null,
            addListener: vi.fn(), 
            removeListener: vi.fn(), 
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: mockMatchMedia,
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('defaults to light theme when no storage or OS preference is set', () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe('light');
        expect(document.documentElement.getAttribute('data-theme')).toBeNull(); // Light has no raw attribute
    });

    it('boots into dark theme if OS prefers dark mode', () => {
        // Change mock to say OS prefers dark mode
        mockMatchMedia.mockImplementation((query: string) => ({
            matches: query === '(prefers-color-scheme: dark)',
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }));

        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe('dark');
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('loads previously stored user theme from localStorage independently of OS', () => {
        localStorage.setItem('pixelcrop-theme', 'dark');
        
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe('dark');
    });

    it('toggles themes correctly when toggleTheme is executed', () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe('light'); // Init purely light

        act(() => {
            result.current.toggleTheme();
        });

        expect(result.current.theme).toBe('dark');
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
        expect(localStorage.getItem('pixelcrop-theme')).toBe('dark');
    });
});
