import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import ImageCropper from './ImageCropper';

// Mock the 3rd Party Cropper library
vi.mock('react-image-crop', () => ({
    default: (props: any) => (
        <div data-testid="react-image-crop-mock" data-crop={JSON.stringify(props.crop)}>
            {props.children}
        </div>
    )
}));

vi.mock('react-image-crop/dist/ReactCrop.css', () => ({}));

// Mock our Canvas Engine
vi.mock('@/utils/canvasPreview', () => ({
    canvasPreview: vi.fn(),
}));

// Mock LivePreview
vi.mock('../LivePreview', () => ({
    default: () => (
        <div data-testid="live-preview-mock">
            Live Preview
        </div>
    )
}));

describe('ImageCropper', () => {

    beforeAll(() => {
        Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', { get: () => 1000, configurable: true });
        Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', { get: () => 1000, configurable: true });
    });

    const dummyFile = new File([''], 'dummy.jpg', { type: 'image/jpeg' });
    const mockOnReset = vi.fn();
    const mockOnError = vi.fn();

    it('renders the visual cropper and studio controls', () => {
        render(
            <ImageCropper 
                imageSrc="dummy-image.jpg" 
                file={dummyFile} 
                onCropPixelsChange={() => { }} 
                onReset={mockOnReset}
                onError={mockOnError}
            />
        );

        expect(screen.getByTestId('react-image-crop-mock')).toBeInTheDocument();
        expect(screen.getByLabelText(/^W$/i)).toBeInTheDocument();
    });

    it('toggles the live preview', () => {
        render(
            <ImageCropper 
                imageSrc="dummy-image.jpg" 
                file={dummyFile} 
                onCropPixelsChange={() => { }} 
                onReset={mockOnReset}
                onError={mockOnError}
            />
        );

        expect(screen.getByTestId('live-preview-mock')).toBeInTheDocument();

        const toggleBtn = screen.getByText(/Hide Preview/i);
        fireEvent.click(toggleBtn);

        expect(screen.queryByTestId('live-preview-mock')).not.toBeInTheDocument();
        expect(screen.getByText(/Split Preview/i)).toBeInTheDocument();
    });

    it('utilizes the simplified absolute-fill architecture for CSS height synchronization', () => {
        const { container } = render(
            <ImageCropper 
                imageSrc="dummy-image.jpg" 
                file={dummyFile} 
                onCropPixelsChange={() => { }} 
                onReset={mockOnReset}
                onError={mockOnError}
            />
        );

        // Verify that the splitRow structure exists
        const splitRow = container.querySelector('[class*="splitRow"]');
        expect(splitRow).toBeInTheDocument();

        // Verify both symmetrical panes exist as direct children of the row
        const editorPane = splitRow?.querySelector('[class*="editorPane"]');
        const previewPane = splitRow?.querySelector('[class*="previewPane"]');
        
        expect(editorPane).toBeInTheDocument();
        expect(previewPane).toBeInTheDocument();

        // Verify LivePreview is rendered directly inside previewPane without extra nested wrappers
        const mockLivePreview = screen.getByTestId('live-preview-mock');
        expect(previewPane).toContainElement(mockLivePreview);
        expect(mockLivePreview.parentElement).toEqual(previewPane);
    });
});
