import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AspectControls from './AspectControls';

describe('AspectControls', () => {
    it('renders the aspect ratio buttons', () => {
        render(<AspectControls setAspect={() => { }} aspect={undefined} />);
        expect(screen.getByText('1:1')).toBeInTheDocument();
        expect(screen.getByText('16:9')).toBeInTheDocument();
        expect(screen.getByText('Free')).toBeInTheDocument();
    });

    it('calls setAspect with the correct ratio when clicked', () => {
        const mockSetAspect = vi.fn();
        render(<AspectControls setAspect={mockSetAspect} aspect={undefined} />);

        fireEvent.click(screen.getByText('1:1'));
        expect(mockSetAspect).toHaveBeenCalledWith(1);

        fireEvent.click(screen.getByText('Free'));
        expect(mockSetAspect).toHaveBeenCalledWith(undefined);
    });
});
