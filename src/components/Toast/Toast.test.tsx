import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Toast from './Toast';
import { TOAST_DURATION_MS } from '@/utils/constants';

describe('Toast', () => {
    // 1. Before every test, tell Vitest to take control of the Date/Time clock!
    beforeEach(() => {
        vi.useFakeTimers();
    });

    // 2. Put the clock back to normal after the tests
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders the message correctly', () => {
        render(<Toast message="Something broke!" onClose={() => { }} />);
        expect(screen.getByText('Something broke!')).toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked manually', () => {
        const mockClose = vi.fn();
        render(<Toast message="Test" onClose={mockClose} />);

        // Find the 'x' button and click it
        fireEvent.click(screen.getByRole('button'));
        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('automatically calls onClose after 5 seconds', () => {
        const mockClose = vi.fn();
        render(<Toast message="Auto-close test" onClose={mockClose} />);

        // Ensure it hasn't fired immediately
        expect(mockClose).not.toHaveBeenCalled();

        // 3. Time travel exactly 5 seconds into the future!
        act(() => {
            vi.advanceTimersByTime(TOAST_DURATION_MS);
        });

        // 4. Verify the setTimeout hook triggered our close function!
        expect(mockClose).toHaveBeenCalledTimes(1);
    });
});
