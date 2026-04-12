import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useImageDownload from './useImageDownload';
import * as cropImageModule from '@/utils/cropImage';

// Mock the URL API (unavailable in jsdom)
const mockCreateObjectURL = vi.fn(() => 'blob:mock-url');
const mockRevokeObjectURL = vi.fn();
window.URL.createObjectURL = mockCreateObjectURL;
window.URL.revokeObjectURL = mockRevokeObjectURL;

// Mock document.createElement to intercept link clicks
const mockClick = vi.fn();
const originalCreateElement = document.createElement.bind(document);
vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
    if (tag === 'a') {
        const anchor = originalCreateElement('a') as HTMLAnchorElement;
        anchor.click = mockClick;
        return anchor;
    }
    return originalCreateElement(tag);
});

const dummyFile = new File([''], 'photo.jpg', { type: 'image/jpeg' });
const dummyCrop = { unit: '%' as const, x: 0, y: 0, width: 80, height: 80 };

describe('useImageDownload', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('does nothing if file, imageSrc, or cropPixels is missing', async () => {
        const { result } = renderHook(() =>
            useImageDownload({ imageSrc: null, file: null, onError: vi.fn() })
        );

        await act(async () => {
            await result.current.downloadCrop(null);
        });

        expect(mockClick).not.toHaveBeenCalled();
    });

    it('triggers a file download on success', async () => {
        vi.spyOn(cropImageModule, 'getCroppedImg').mockResolvedValue({
            blob: new Blob(['img'], { type: 'image/jpeg' }),
            width: 800,
            height: 600,
        });

        const { result } = renderHook(() =>
            useImageDownload({ imageSrc: 'data:image/jpeg;base64,...', file: dummyFile, onError: vi.fn() })
        );

        await act(async () => {
            await result.current.downloadCrop(dummyCrop);
        });

        expect(mockCreateObjectURL).toHaveBeenCalledTimes(1);
        expect(mockClick).toHaveBeenCalledTimes(1);
        expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
    });

    it('calls onError if getCroppedImg returns null', async () => {
        vi.spyOn(cropImageModule, 'getCroppedImg').mockResolvedValue(null);

        const mockOnError = vi.fn();
        const { result } = renderHook(() =>
            useImageDownload({ imageSrc: 'data:image/jpeg;base64,...', file: dummyFile, onError: mockOnError })
        );

        await act(async () => {
            await result.current.downloadCrop(dummyCrop);
        });

        expect(mockOnError).toHaveBeenCalledTimes(1);
        expect(mockClick).not.toHaveBeenCalled();
    });

    it('calls onError if getCroppedImg throws', async () => {
        vi.spyOn(cropImageModule, 'getCroppedImg').mockRejectedValue(new Error('Canvas failed'));

        const mockOnError = vi.fn();
        const { result } = renderHook(() =>
            useImageDownload({ imageSrc: 'data:image/jpeg;base64,...', file: dummyFile, onError: mockOnError })
        );

        await act(async () => {
            await result.current.downloadCrop(dummyCrop);
        });

        expect(mockOnError).toHaveBeenCalledTimes(1);
    });

    it('resets isDownloading to false after completing the download', async () => {
        vi.spyOn(cropImageModule, 'getCroppedImg').mockResolvedValue({
            blob: new Blob(['img'], { type: 'image/jpeg' }),
            width: 100,
            height: 100,
        });

        const { result } = renderHook(() =>
            useImageDownload({ imageSrc: 'data:image/jpeg;base64,...', file: dummyFile, onError: vi.fn() })
        );

        await act(async () => {
            await result.current.downloadCrop(dummyCrop);
        });

        // After resolution, isDownloading must be false
        expect(result.current.isDownloading).toBe(false);
    });
});
