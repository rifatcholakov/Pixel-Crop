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

    it('translates user pixel input into percentages for height (handleHeightChange)', () => {
        const { result } = renderHook(() => useCropMath(mockImgRef));

        act(() => {
            result.current.handleHeightChange(500);
        });

        expect(result.current.crop.height).toBe(50);
    });

    it('translates user pixel input into percentages for X coordinate (handleXChange)', () => {
        const { result } = renderHook(() => useCropMath(mockImgRef));

        // Shrink width first (separate act so state commits before X uses it)
        act(() => { result.current.handleWidthChange(500); });
        // Now maxLimit = 100 - 50 = 50, so x=100px (10%) is valid
        act(() => { result.current.handleXChange(100); });

        expect(result.current.crop.x).toBe(10);
    });

    it('translates user pixel input into percentages for Y coordinate (handleYChange)', () => {
        const { result } = renderHook(() => useCropMath(mockImgRef));

        // Shrink height first (separate act so state commits before Y uses it)
        act(() => { result.current.handleHeightChange(600); });
        // Now maxLimit = 100 - 60 = 40, so y=200px (20%) is valid
        act(() => { result.current.handleYChange(200); });

        expect(result.current.crop.y).toBe(20);
    });

    it('updates height automatically when aspect ratio is locked and width changes', () => {
        const { result } = renderHook(() => useCropMath(mockImgRef));

        // Lock aspect to 16:9
        act(() => {
            result.current.setAspect(16 / 9);
        });

        // Change width to 160px
        act(() => {
            result.current.handleWidthChange(160);
        });

        // Height should automatically become 90px (9%)
        expect(result.current.crop.height).toBe(9);
    });
});
