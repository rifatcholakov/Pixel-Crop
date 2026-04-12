export interface ImageUploaderProps {
    onImageUpload: (file: File) => void;
    onError: (error: string) => void;
}

export interface ImageCropperProps {
    imageSrc: string;
    file: File;
    onReset: () => void;
    onError: (error: string) => void;
}