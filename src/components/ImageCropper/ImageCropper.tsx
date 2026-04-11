import { useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styles from './ImageCropper.module.css';

import useCropMath from '@/hooks/useCropMath';
import { canvasPreview } from '@/utils/canvasPreview';
import AspectControls from '../AspectControls';
import TruePixelControls from '../TruePixelControls';
import type { ImageCropperProps } from '@/types';
import LivePreview from '../LivePreview';
import MetadataPanel from '../MetadataPanel';

export default function ImageCropper({
    imageSrc, file, onCropPixelsChange
}: ImageCropperProps) {
    const imgRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const {
        crop, setCrop, aspect, setAspect,
        getTrueWidth, getTrueHeight, getTrueX, getTrueY,
        handleWidthChange, handleHeightChange, handleXChange, handleYChange
    } = useCropMath(imgRef);

    useEffect(() => {
        if (crop.width > 0 && crop.height > 0 && imgRef.current && canvasRef.current) {
            canvasPreview(imgRef.current, canvasRef.current, crop);
        }
    }, [crop]);

    return (
        <div className={styles.mainLayout}>
            {/* Split Stage: Editor vs Preview */}
            <div className={styles.stageArea}>
                <div className={styles.editorCol}>
                    <AspectControls setAspect={setAspect} setCrop={setCrop} aspect={aspect} />

                    <ReactCrop
                        crop={crop}
                        aspect={aspect}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(_, percentCrop) => onCropPixelsChange(percentCrop)}
                    >
                        <img ref={imgRef} src={imageSrc} alt="Crop preview" className={styles.responsiveImage} onLoad={() => setCrop({ ...crop })} />
                    </ReactCrop>
                </div>

                <div className={styles.previewCol}>
                    <LivePreview imgRef={imgRef} crop={crop} />
                </div>
            </div>

            {/* Bottom Controls Dashboard */}
            <div className={styles.dashboardArea}>
                <TruePixelControls
                    aspect={aspect} getTrueWidth={getTrueWidth} getTrueHeight={getTrueHeight}
                    getTrueX={getTrueX} getTrueY={getTrueY} handleWidthChange={handleWidthChange}
                    handleHeightChange={handleHeightChange} handleXChange={handleXChange} handleYChange={handleYChange}
                />
                <MetadataPanel file={file} imgRef={imgRef} />
            </div>
        </div>
    );
}
