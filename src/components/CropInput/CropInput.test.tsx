import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CropInput from './CropInput';

describe('CropInput', () => {
    it('renders the label and displays the numeric value', () => {
        render(<CropInput label="X Position" value={150} disabled={false} onChange={() => { }} />);

        // This implicitly checks the htmlFor/id connection too!
        expect(screen.getByLabelText(/X Position/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue('150')).toBeInTheDocument();
    });

    it('fires the onChange callback when the user types', () => {
        const mockOnChange = vi.fn();
        render(<CropInput label="Width" value={100} disabled={false} onChange={mockOnChange} />);

        const input = screen.getByLabelText(/Width/i);
        fireEvent.change(input, { target: { value: '200' } });

        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('respects the disabled prop when requested', () => {
        render(<CropInput label="Height" value={50} disabled={true} onChange={() => { }} />);

        const input = screen.getByLabelText(/Height/i);
        expect(input).toBeDisabled();
    });
});
