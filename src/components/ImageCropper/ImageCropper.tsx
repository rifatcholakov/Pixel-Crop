import { useRef, useState } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styles from './ImageCropper.module.css';

import useCropMath from '@/hooks/useCropMath';
import useImageDownload from '@/hooks/useImageDownload';
import type { ImageCropperProps } from '@/types';
import LivePreview from '../LivePreview';
import CropperTopBar from './subcomponents/CropperTopBar';
import CropperDashboard from './subcomponents/CropperDashboard';

export default function ImageCropper({
    imageSrc, file, onReset, onError
}: ImageCropperProps) {
    const imgRef = useRef<HTMLImageElement>(null);
    const [cropPixels, setLocalCropPixels] = useState<Crop | null>(null);
    const [showPreview, setShowPreview] = useState(true);

    const cropMath = useCropMath(imgRef);
    const { crop, setCrop, aspect, setAspect } = cropMath;

    const { downloadCrop, isDownloading } = useImageDownload({ imageSrc, file, onError });

    return (
        <div className={styles.studioLayout}>
            <CropperTopBar 
                aspect={aspect} 
                setAspect={setAspect} 
                showPreview={showPreview} 
                setShowPreview={setShowPreview} 
            />

            <div className={styles.workspace}>
                <div className={styles.splitRow}>
                    <div className={styles.editorPane}>
                        <ReactCrop
                            crop={crop}
                            aspect={aspect}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(_, percentCrop) => {
                                setLocalCropPixels(percentCrop);
                            }}
                            className={styles.cropper}
                        >
                            <img
                                ref={imgRef}
                                src={imageSrc}
                                alt="Crop preview"
                                className={styles.responsiveImage}
                                onLoad={() => setCrop({ ...crop })}
                            />
                        </ReactCrop>
                    </div>

                    {showPreview && (
                        <>
                            <div className={styles.paneDivider} />
                            <div className={styles.previewPane}>
                                <LivePreview imgRef={imgRef} crop={crop} />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <CropperDashboard 
                cropMath={cropMath}
                file={file}
                imgRef={imgRef}
                onReset={onReset}
                downloadCrop={downloadCrop}
                cropPixels={cropPixels}
                isDownloading={isDownloading}
            />
        </div>
    );
}
