import { SUPPORTED_MIME_TYPES } from "@/utils/constants";
import type { ImageUploaderProps } from "@/types";

export default function ImageUploader({ onImageUpload, onError }: ImageUploaderProps) {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            onError("No file selected");
            return;
        }

        const mimeType = file.type;
        const isSupported = SUPPORTED_MIME_TYPES.includes(mimeType)

        if (!isSupported) {
            onError("Unsupported file format");
            return;
        }

        onImageUpload(file);
    }


    return (
        <div>
            <label htmlFor="image-upload">Upload Image</label>
            <input type="file" id="image-upload" accept="image/*" onChange={handleInputChange} />
        </div>
    );
}
