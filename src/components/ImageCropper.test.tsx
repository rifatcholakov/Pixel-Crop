import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ImageCropper from './ImageCropper';

// Mock react-image-crop
vi.mock('react-image-crop', () => ({
    default: () => <div data-testid="react-image-crop-mock" />
}));

// Mock the CSS file so it doesn't break jsdom parser
vi.mock('react-image-crop/dist/ReactCrop.css', () => ({}));

describe('ImageCropper', () => {
    it('renders the visual cropper and manual control inputs', () => {
        render(<ImageCropper imageSrc="dummy-image.jpg" onCropPixelsChange={() => { }} />);

        expect(screen.getByTestId('react-image-crop-mock')).toBeInTheDocument();

        expect(screen.getByLabelText(/width/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/height/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/x position/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/y position/i)).toBeInTheDocument();
    });
});
