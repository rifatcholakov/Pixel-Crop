import { useState, type RefObject } from "react";
import { type Crop } from "react-image-crop";
import { MIN_CROP_PIXELS } from "@/utils/constants";

export default function useCropMath(imageRef: RefObject<HTMLImageElement | null>) {
    const [aspect, setAspect] = useState<number | undefined>(undefined);
    const [crop, setCrop] = useState<Crop>({ unit: "%", x: 0, y: 0, width: 100, height: 100 });

    // ==========================================
    // 1. REUSABLE MATH HELPERS
    // ==========================================
    const toTruePx = (percent: number, totalPx: number) => Math.round((percent / 100) * totalPx);
    const toPercent = (typedPx: number, totalPx: number) => (typedPx / totalPx) * 100;

    // ===============================================================
    // 2. GETTERS: Translate internal percentages into display pixels
    // ===============================================================

    const getTrueWidth = () => imageRef.current ? toTruePx(crop.width, imageRef.current.naturalWidth) : 0;
    const getTrueHeight = () => imageRef.current ? toTruePx(crop.height, imageRef.current.naturalHeight) : 0;
    const getTrueX = () => imageRef.current ? toTruePx(crop.x, imageRef.current.naturalWidth) : 0;
    const getTrueY = () => imageRef.current ? toTruePx(crop.y, imageRef.current.naturalHeight) : 0;

    // ==============================================================
    // 3. SETTERS: Translate user pixel inputs into safe percentages
    // ==============================================================

    const handleWidthChange = (val: number) => {
        if (!imageRef.current) return;

        const safePx = Math.max(MIN_CROP_PIXELS, val);
        const maxLimit = 100 - crop.x;    // Can't push off the right side

        const newPercent = Math.min(maxLimit, toPercent(safePx, imageRef.current.naturalWidth));

        if (aspect) {
            // Auto-calculate the matching height!
            const newHeightPx = safePx / aspect;
            const newHeightPercent = toPercent(newHeightPx, imageRef.current.naturalHeight);
            setCrop({ ...crop, width: newPercent, height: newHeightPercent });
        } else {
            setCrop({ ...crop, width: newPercent });
        }
    };

    const handleHeightChange = (val: number) => {
        if (!imageRef.current || aspect) return;

        const safePx = Math.max(MIN_CROP_PIXELS, val);
        const maxLimit = 100 - crop.y;    // Can't push off the bottom

        const newPercent = Math.min(maxLimit, toPercent(safePx, imageRef.current.naturalHeight));
        setCrop({ ...crop, height: newPercent });
    };

    const handleXChange = (val: number) => {
        if (!imageRef.current) return;

        const safePx = Math.max(0, val);     // No negative X coordinates
        const maxLimit = 100 - crop.width;   // Can't push the box off the right side

        const newPercent = Math.min(maxLimit, toPercent(safePx, imageRef.current.naturalWidth));
        setCrop({ ...crop, x: newPercent });
    };

    const handleYChange = (val: number) => {
        if (!imageRef.current) return;

        const safePx = Math.max(0, val);      // No negative Y coordinates
        const maxLimit = 100 - crop.height;   // Can't push the box off the bottom

        const newPercent = Math.min(maxLimit, toPercent(safePx, imageRef.current.naturalHeight));
        setCrop({ ...crop, y: newPercent });
    };

    return {
        crop, setCrop, aspect, setAspect,
        getTrueWidth, getTrueHeight, getTrueX, getTrueY,
        handleWidthChange, handleHeightChange, handleXChange, handleYChange
    };
}
