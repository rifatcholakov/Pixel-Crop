import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LivePreview from './LivePreview';

// Mock the canvas engine
vi.mock('@/utils/canvasPreview', () => ({
    canvasPreview: vi.fn(),
}));

import { canvasPreview } from '@/utils/canvasPreview';

describe('LivePreview', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the canvas element and badge', () => {
        const dummyRef = { current: document.createElement('img') };
        const dummyCrop = { unit: '%', x: 0, y: 0, width: 50, height: 50 } as any;

        const { container } = render(<LivePreview imgRef={dummyRef} crop={dummyCrop} />);

        expect(screen.getByText(/Live Result/i)).toBeInTheDocument();
        expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('calls canvasPreview engine when valid crop parameters are passed', () => {
        const dummyRef = { current: document.createElement('img') };
        const dummyCrop = { unit: '%', x: 0, y: 0, width: 50, height: 50 } as any;

        render(<LivePreview imgRef={dummyRef} crop={dummyCrop} />);

        expect(canvasPreview).toHaveBeenCalledTimes(1);
    });
});
