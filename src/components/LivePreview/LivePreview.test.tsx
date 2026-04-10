import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LivePreview from './LivePreview';

// Mock the canvas engine because our testing environment has no Graphics Card!
vi.mock('@/utils/canvasPreview', () => ({
    canvasPreview: vi.fn(),
}));

import { canvasPreview } from '@/utils/canvasPreview';

describe('LivePreview', () => {
    it('renders the canvas element', () => {
        // Create a fake DOM Image reference
        const dummyRef = { current: document.createElement('img') };
        const dummyCrop = { unit: '%', x: 0, y: 0, width: 50, height: 50 } as any;

        const { container } = render(<LivePreview imgRef={dummyRef} crop={dummyCrop} />);

        expect(screen.getByText(/Live Preview/i)).toBeInTheDocument();
        expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('calls canvasPreview engine when valid crop parameters are passed', () => {
        const dummyRef = { current: document.createElement('img') };
        const dummyCrop = { unit: '%', x: 0, y: 0, width: 50, height: 50 } as any;

        render(<LivePreview imgRef={dummyRef} crop={dummyCrop} />);

        // We successfully prove that our component tried to draw the image!
        expect(canvasPreview).toHaveBeenCalledTimes(1);
    });
});
