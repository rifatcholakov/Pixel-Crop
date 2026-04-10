import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TruePixelControls from './TruePixelControls';

describe('TruePixelControls', () => {
    // Reusable mock props to keep our tests clean
    const mockProps = {
        aspect: undefined,
        getTrueWidth: () => 100,
        getTrueHeight: () => 100,
        getTrueX: () => 0,
        getTrueY: () => 0,
        handleWidthChange: vi.fn(),
        handleHeightChange: vi.fn(),
        handleXChange: vi.fn(),
        handleYChange: vi.fn(),
    };

    it('renders all four input fields', () => {
        render(<TruePixelControls {...mockProps} />);
        expect(screen.getByLabelText(/Width/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Height/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/X position/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Y position/i)).toBeInTheDocument();
    });

    it('disables the height input when an aspect ratio is locked', () => {
        render(<TruePixelControls {...mockProps} aspect={1} />); // Force aspect ratio to 1

        const heightInput = screen.getByLabelText(/Height/i);
        expect(heightInput).toBeDisabled();
    });

    it('calls the appropriate handler when input values change', () => {
        render(<TruePixelControls {...mockProps} />);

        const widthInput = screen.getByLabelText(/Width/i);
        fireEvent.change(widthInput, { target: { value: '200' } });

        expect(mockProps.handleWidthChange).toHaveBeenCalledWith(200);
    });
});
