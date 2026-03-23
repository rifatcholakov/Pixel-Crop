import { type Crop } from 'react-image-crop';

export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Crop,
    format: string = 'image/jpeg'
): Promise<Blob | null> {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.crossOrigin = 'anonymous';
        image.src = imageSrc;

        // When the image loads, write your canvas logic here!
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('Failed to get canvas context'));
                return;
            }

            const truePixelX = Math.round((pixelCrop.x / 100) * image.naturalWidth);
            const truePixelY = Math.round((pixelCrop.y / 100) * image.naturalHeight);
            const truePixelWidth = Math.round((pixelCrop.width / 100) * image.naturalWidth);
            const truePixelHeight = Math.round((pixelCrop.height / 100) * image.naturalHeight);

            canvas.width = truePixelWidth;
            canvas.height = truePixelHeight;

            ctx.drawImage(
                image,             // The source image
                truePixelX,       // Source X (Start cropping here)
                truePixelY,       // Source Y (Start cropping here)
                truePixelWidth,   // Source Width (Crop this much)
                truePixelHeight,  // Source Height (Crop this much)
                0,                 // Destination X (Draw starting at 0 on canvas)
                0,                 // Destination Y (Draw starting at 0 on canvas)
                truePixelWidth,   // Destination Width (Draw it this wide)
                truePixelHeight   // Destination Height (Draw it this tall)
            );

            canvas.toBlob((blob) => {
                resolve(blob);
            }, format);
        };

        image.onerror = () => reject(new Error('Failed to load image'));
    });
}
