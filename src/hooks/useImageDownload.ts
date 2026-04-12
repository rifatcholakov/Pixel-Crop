import { useState } from 'react';
import type { Crop } from 'react-image-crop';
import { getCroppedImg, generateDownloadName } from '@/utils/cropImage';

type UseImageDownloadProps = {
    imageSrc: string | null;
    file: File | null;
    onError: (msg: string) => void;
};

export default function useImageDownload({ imageSrc, file, onError }: UseImageDownloadProps) {
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadCrop = async (cropPixels: Crop | null) => {
        if (!file || !imageSrc || !cropPixels) return;

        setIsDownloading(true);
        try {
            const cropResult = await getCroppedImg(imageSrc, cropPixels, file.type);
            
            if (!cropResult || !cropResult.blob) {
                onError("An error occurred generating the cropped image.");
                setIsDownloading(false);
                return;
            }

            const { blob, width, height } = cropResult;
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = generateDownloadName(file.name, width, height);
            a.click();
            
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('[Download Error]:', err);
            onError("Failed to crop the image or unexpected engine failure occurred.");
        } finally {
            setIsDownloading(false);
        }
    };

    return { downloadCrop, isDownloading };
}
