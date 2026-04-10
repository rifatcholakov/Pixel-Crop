import { type Crop } from 'react-image-crop';

export interface ImageUploaderProps {
    onImageUpload: (file: File) => void;
    onError: (error: string) => void;
}

export interface ImageCropperProps {
    imageSrc: string;
    file: File;
    onCropPixelsChange: (crop: Crop) => void;
}