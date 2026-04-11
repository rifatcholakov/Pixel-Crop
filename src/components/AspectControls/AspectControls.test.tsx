import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AspectControls from './AspectControls';

describe('AspectControls', () => {
    it('renders all the aspect ratio buttons', () => {
        render(<AspectControls setAspect={() => { }} setCrop={() => { }} aspect={undefined} />);
        expect(screen.getByText('Square 1:1')).toBeInTheDocument();
        expect(screen.getByText('16:9 Landscape')).toBeInTheDocument();
        expect(screen.getByText('Freeform')).toBeInTheDocument();
        expect(screen.getByText('Reset Crop')).toBeInTheDocument();
    });

    it('calls setAspect with the correct ratio when clicked', () => {
        const mockSetAspect = vi.fn();
        render(<AspectControls setAspect={mockSetAspect} setCrop={() => { }} aspect={undefined} />);

        fireEvent.click(screen.getByText('Square 1:1'));
        expect(mockSetAspect).toHaveBeenCalledWith(1);

        fireEvent.click(screen.getByText('Freeform'));
        expect(mockSetAspect).toHaveBeenCalledWith(undefined);
    });

    it('resets both aspect and crop when Reset is clicked', () => {
        const mockSetAspect = vi.fn();
        const mockSetCrop = vi.fn();
        render(<AspectControls setAspect={mockSetAspect} setCrop={mockSetCrop} aspect={undefined} />);

        fireEvent.click(screen.getByText('Reset Crop'));
        expect(mockSetAspect).toHaveBeenCalledWith(undefined);
        expect(mockSetCrop).toHaveBeenCalledWith({ unit: '%', x: 0, y: 0, width: 100, height: 100 });
    });
});
