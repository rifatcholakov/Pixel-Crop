import { type Crop } from 'react-image-crop';

export function generateDownloadName(originalName: string, width: number, height: number): string {
    const nameParts = originalName.split('.');
    const ext = nameParts.length > 1 ? `.${nameParts.pop()}` : '';
    const baseName = nameParts.join('.');
    return `cropped-${baseName}-${width}x${height}${ext}`;
}

// 1. Separate the "Loading" logic into a clean, reusable helper
const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => resolve(image);
        image.onerror = (e) => reject(e);
        image.src = url;
    });

export async function getCroppedImg(
    imageSrc: string,
    percentCrop: Crop,
    format: string = 'image/jpeg'
): Promise<{ blob: Blob, width: number, height: number } | null> {

    const image = await createImage(imageSrc);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');

    const x = Math.round((percentCrop.x / 100) * image.naturalWidth);
    const y = Math.round((percentCrop.y / 100) * image.naturalHeight);
    const w = Math.round((percentCrop.width / 100) * image.naturalWidth);
    const h = Math.round((percentCrop.height / 100) * image.naturalHeight);

    canvas.width = w;
    canvas.height = h;

    ctx.drawImage(image, x, y, w, h, 0, 0, w, h);

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (blob) resolve({ blob, width: w, height: h });
            else resolve(null);
        }, format);
    });
}
