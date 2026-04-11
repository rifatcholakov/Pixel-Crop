import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
    it('renders with appropriate aria-labels for accessibility', () => {
        const toggleMock = vi.fn();
        
        // Render in light theme
        const { rerender } = render(<ThemeToggle theme="light" toggleTheme={toggleMock} />);
        expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
        
        // Re-render in dark theme
        rerender(<ThemeToggle theme="dark" toggleTheme={toggleMock} />);
        expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
    });

    it('executes toggleTheme callback when clicked physically', () => {
        const toggleMock = vi.fn();
        render(<ThemeToggle theme="light" toggleTheme={toggleMock} />);
        
        const button = screen.getByRole('button');
        fireEvent.click(button);
        
        expect(toggleMock).toHaveBeenCalledTimes(1);
    });
});
