import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TruePixelControls from './TruePixelControls';

describe('TruePixelControls', () => {
    const mockCropMath = {
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

    it('renders all four input fields with compact labels', () => {
        render(<TruePixelControls cropMath={mockCropMath} />);
        expect(screen.getByLabelText(/^W$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^H$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^X$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Y$/i)).toBeInTheDocument();
    });

    it('disables the height input when an aspect ratio is locked', () => {
        render(<TruePixelControls cropMath={{ ...mockCropMath, aspect: 1 }} />); 

        const heightInput = screen.getByLabelText(/^H$/i);
        expect(heightInput).toBeDisabled();
    });

    it('calls the appropriate handler when input values change', () => {
        render(<TruePixelControls cropMath={mockCropMath} />);

        const widthInput = screen.getByLabelText(/^W$/i);
        fireEvent.change(widthInput, { target: { value: '200' } });
        expect(mockCropMath.handleWidthChange).toHaveBeenCalledWith(200);

        const heightInput = screen.getByLabelText(/^H$/i);
        fireEvent.change(heightInput, { target: { value: '300' } });
        expect(mockCropMath.handleHeightChange).toHaveBeenCalledWith(300);

        const xInput = screen.getByLabelText(/^X$/i);
        fireEvent.change(xInput, { target: { value: '50' } });
        expect(mockCropMath.handleXChange).toHaveBeenCalledWith(50);

        const yInput = screen.getByLabelText(/^Y$/i);
        fireEvent.change(yInput, { target: { value: '75' } });
        expect(mockCropMath.handleYChange).toHaveBeenCalledWith(75);
    });
});
