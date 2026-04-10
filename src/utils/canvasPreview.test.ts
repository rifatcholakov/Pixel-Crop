import { describe, it, expect, vi, beforeEach } from 'vitest';
import { canvasPreview } from './canvasPreview';
import { type Crop } from 'react-image-crop';

describe('canvasPreview', () => {
    let mockDrawImage: ReturnType<typeof vi.fn>;
    let dummyCanvas: HTMLCanvasElement;
    let dummyImage: HTMLImageElement;
    let dummyCrop: Crop;

    beforeEach(() => {
        // Create a spy to track if our engine actually tries to draw pixels
        mockDrawImage = vi.fn();

        // Setup a Dummy Canvas and hijack its getContext method!
        dummyCanvas = document.createElement('canvas');
        vi.spyOn(dummyCanvas, 'getContext').mockReturnValue({
            drawImage: mockDrawImage,
            imageSmoothingQuality: 'low',
        } as any);

        // Setup Dummy Image with fake Native Resolutions
        dummyImage = document.createElement('img');
        Object.defineProperty(dummyImage, 'naturalWidth', { value: 1000, configurable: true });
        Object.defineProperty(dummyImage, 'naturalHeight', { value: 2000, configurable: true });

        // Setup Dummy Crop (10% x/y margin, 50% width/height)
        dummyCrop = { unit: '%', x: 10, y: 20, width: 50, height: 40 };

        vi.clearAllMocks();
    });

    it('early returns safely if canvas rendering context is null', () => {
        // Override getContext to return null simulating a dead browser
        vi.spyOn(dummyCanvas, 'getContext').mockReturnValue(null);

        canvasPreview(dummyImage, dummyCanvas, dummyCrop);

        // It should thoughtfully abort rather than throw a Null Pointer Exception!
        expect(mockDrawImage).not.toHaveBeenCalled();
    });

    it('correctly translates percentage crops into precision True Pixels on the canvas', () => {
        canvasPreview(dummyImage, dummyCanvas, dummyCrop);

        // Validate Dimensions: 
        // True Width: 50% of 1000 = 500
        // True Height: 40% of 2000 = 800
        expect(dummyCanvas.width).toBe(500);
        expect(dummyCanvas.height).toBe(800);

        // Verify we manually set it to maximum graphics quality!
        const ctx = dummyCanvas.getContext('2d') as any;
        expect(ctx.imageSmoothingQuality).toBe('high');

        // Verify the exact mathematical drawing coordinates
        // True X: 10% of 1000 = 100
        // True Y: 20% of 2000 = 400
        expect(mockDrawImage).toHaveBeenCalledTimes(1);
        expect(mockDrawImage).toHaveBeenCalledWith(
            dummyImage,
            100, 400, // Source X, Y
            500, 800, // Source Width, Height
            0, 0,     // Destination X, Y
            500, 800  // Destination Width, Height
        );
    });

    it('safely enforces a minimum width/height of 1 pixel to prevent total collapse crashes', () => {
        const collapsedCrop: Crop = { unit: '%', x: 0, y: 0, width: 0, height: 0 };

        canvasPreview(dummyImage, dummyCanvas, collapsedCrop);

        // Even though width is 0%, our Math.max backup logic enforces 1px!
        expect(dummyCanvas.width).toBe(1);
        expect(dummyCanvas.height).toBe(1);
    });
});
