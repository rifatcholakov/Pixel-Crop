import { type Crop } from 'react-image-crop';

const toTruePx = (percent: number, totalPx: number) => Math.round((percent / 100) * totalPx);

export function canvasPreview(
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    crop: Crop
) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const x = toTruePx(crop.x, image.naturalWidth);
    const y = toTruePx(crop.y, image.naturalHeight);
    const w = Math.max(1, toTruePx(crop.width, image.naturalWidth)); // Prevent 0-width crash
    const h = Math.max(1, toTruePx(crop.height, image.naturalHeight));

    canvas.width = w;
    canvas.height = h;

    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(image, x, y, w, h, 0, 0, w, h);
}
