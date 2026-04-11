import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCroppedImg, generateDownloadName } from './cropImage';

describe('getCroppedImg', () => {
    let mockDrawImage: any;
    let mockToBlob: any;

    beforeEach(() => {
        mockDrawImage = vi.fn();

        // Mock toBlob to immediately trigger its callback with a fake Blob of the requested type
        mockToBlob = vi.fn(function (this: any, callback: Function, type: string) {
            callback(new Blob(['fake data'], { type: type || 'image/png' }));
        });

        // Intercept document.createElement('canvas')
        const originalCreateElement = document.createElement.bind(document);
        vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
            if (tagName === 'canvas') {
                return {
                    width: 0,
                    height: 0,
                    getContext: vi.fn(() => ({ drawImage: mockDrawImage })),
                    toBlob: mockToBlob,
                } as any;
            }
            return originalCreateElement(tagName);
        });

        // Mock Image constructor because jsdom doesn't load image sources
        window.Image = class {
            onload: any;
            constructor() {
                setTimeout(() => { if (this.onload) this.onload(); }, 10);
            }
        } as any;
    });

    it('exports the image in the requested format (e.g., image/webp)', async () => {
        // Dummy crop data
        const crop = { unit: '%' as const, x: 10, y: 10, width: 100, height: 100 };

        // Execute the function you are about to write
        const result = await getCroppedImg('dummy-source.png', crop, 'image/webp');

        // Check if you drew it to the canvas
        expect(mockDrawImage).toHaveBeenCalledTimes(1);
        expect(mockToBlob).toHaveBeenCalledTimes(1);

        // MOST IMPORTANT BUSINESS LOGIC: Did you pass the right format?
        expect(mockToBlob.mock.calls[0][1]).toBe('image/webp');
        expect(result?.blob?.type).toBe('image/webp');
    });

    it('preserves the format for image/jpeg', async () => {
        const crop = { unit: '%' as const, x: 0, y: 0, width: 50, height: 50 };
        const result = await getCroppedImg('dummy.jpg', crop, 'image/jpeg');

        expect(mockToBlob.mock.calls[0][1]).toBe('image/jpeg');
        expect(result?.blob?.type).toBe('image/jpeg');
    });
});

describe('generateDownloadName', () => {
    it('appends dimensions and keeps the extension', () => {
        const name = generateDownloadName('vacation.png', 800, 600);
        expect(name).toBe('cropped-vacation-800x600.png');
    });

    it('handles filenames with multiple dots', () => {
        const name = generateDownloadName('my.favorite.picture.jpg', 1920, 1080);
        expect(name).toBe('cropped-my.favorite.picture-1920x1080.jpg');
    });

    it('handles files with no extension gracefully', () => {
        const name = generateDownloadName('unknown_file', 500, 500);
        expect(name).toBe('cropped-unknown_file-500x500');
    });
});
