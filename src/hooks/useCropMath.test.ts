import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useCropMath from './useCropMath';

describe('useCropMath', () => {
    let mockImgRef: { current: HTMLImageElement | null };

    beforeEach(() => {
        // Create a fake image that is exactly 1000x1000 pixels
        mockImgRef = {
            current: {
                naturalWidth: 1000,
                naturalHeight: 1000,
            } as HTMLImageElement
        };
    });

    it('initializes with 100% crop dimensions', () => {
        const { result } = renderHook(() => useCropMath(mockImgRef));

        expect(result.current.crop.width).toBe(100);
        expect(result.current.crop.height).toBe(100);
    });

    it('converts percentages to true pixels correctly (Getters)', () => {
        const { result } = renderHook(() => useCropMath(mockImgRef));

        // At 100% of a 1000px image, the getter should return 1000
        expect(result.current.getTrueWidth()).toBe(1000);
        expect(result.current.getTrueHeight()).toBe(1000);
    });

    it('translates user pixel input into percentages (Setters)', () => {
        const { result } = renderHook(() => useCropMath(mockImgRef));

        // Pretend user typed "250" into the width box. 
        // We use act() because we are modifying React state!
        act(() => {
            result.current.handleWidthChange(250);
        });

        // (250 / 1000) * 100 = 25%
        expect(result.current.crop.width).toBe(25);
    });

    it('clamps user input to bounds so the box never goes off-screen', () => {
        const { result } = renderHook(() => useCropMath(mockImgRef));

        // Pretend user typed 5000px into the width box (way bigger than the 1000px image!)
        act(() => {
            result.current.handleWidthChange(5000);
        });

        // The math should detect it's out of bounds and clamp it strictly to 100%
        expect(result.current.crop.width).toBe(100);
    });

    it('clamps user input so negative dimensions are coerced to 0 pixels', () => {
        const { result } = renderHook(() => useCropMath(mockImgRef));

        act(() => {
            result.current.handleWidthChange(-50);
        });

        // Due to MIN_CROP_PIXELS = 0 and Math.max(0, val), width safely bottoms out at 0%
        expect(result.current.crop.width).toBe(0);
    });
});
