import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import ImageCropper from './ImageCropper';

vi.mock('react-image-crop', () => ({
    default: (props: any) => (
        <div data-testid="react-image-crop-mock" data-crop={JSON.stringify(props.crop)}>
            {props.children}
        </div>
    )
}));

vi.mock('react-image-crop/dist/ReactCrop.css', () => ({}));

describe('ImageCropper', () => {

    beforeAll(() => {
        Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', { get: () => 1000, configurable: true });
        Object.defineProperty(HTMLImageElement.prototype, 'naturalHeight', { get: () => 1000, configurable: true });
    });

    it('renders the visual cropper and manual control inputs', () => {
        render(<ImageCropper imageSrc="dummy-image.jpg" onCropPixelsChange={() => { }} />);

        expect(screen.getByTestId('react-image-crop-mock')).toBeInTheDocument();
        expect(screen.getByLabelText(/width/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/height/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/x position/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/y position/i)).toBeInTheDocument();
    });

    it('updates the crop state when manual inputs change (Two-Way Sync)', () => {
        render(<ImageCropper imageSrc="dummy-image.jpg" onCropPixelsChange={() => { }} />);

        const widthInput = screen.getByLabelText(/width/i);
        const cropperMock = screen.getByTestId('react-image-crop-mock');

        fireEvent.change(widthInput, { target: { value: '350' } });

        const updatedCropProp = JSON.parse(cropperMock.getAttribute('data-crop') || '{}');

        expect(updatedCropProp.width).toBe(35);
    });

});
