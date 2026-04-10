import { useRef, useEffect } from 'react'; // <-- Ensure useEffect is imported!
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styles from './ImageCropper.module.css';

import useCropMath from '@/hooks/useCropMath';
import { canvasPreview } from '@/utils/canvasPreview'; // <-- Import the engine!
import AspectControls from '../AspectControls';
import TruePixelControls from '../TruePixelControls';
import type { ImageCropperProps } from '@/types';
import LivePreview from '../LivePreview';

export default function ImageCropper({ imageSrc, onCropPixelsChange }: ImageCropperProps) {
    const imgRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null); // <-- 1. Create the canvas Reference

    const {
        crop, setCrop, aspect, setAspect,
        getTrueWidth, getTrueHeight, getTrueX, getTrueY,
        handleWidthChange, handleHeightChange, handleXChange, handleYChange
    } = useCropMath(imgRef);

    // 2. NEW MAGIC HOOK! Any time 'crop' math updates, redraw the canvas instantly!
    useEffect(() => {
        if (crop.width > 0 && crop.height > 0 && imgRef.current && canvasRef.current) {
            canvasPreview(imgRef.current, canvasRef.current, crop);
        }
    }, [crop]);

    return (
        <div className={styles.layout}>
            <div>
                <AspectControls setAspect={setAspect} setCrop={setCrop} />

                <ReactCrop
                    crop={crop}
                    aspect={aspect}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(_, percentCrop) => onCropPixelsChange(percentCrop)}
                >
                    <img ref={imgRef} src={imageSrc} alt="Crop preview" className={styles.responsiveImage} onLoad={() => setCrop({ ...crop })} />
                </ReactCrop>
            </div>

            <div className={styles.sidebar}>
                <TruePixelControls
                    aspect={aspect} getTrueWidth={getTrueWidth} getTrueHeight={getTrueHeight}
                    getTrueX={getTrueX} getTrueY={getTrueY} handleWidthChange={handleWidthChange}
                    handleHeightChange={handleHeightChange} handleXChange={handleXChange} handleYChange={handleYChange}
                />

                <LivePreview imgRef={imgRef} crop={crop} />
            </div>

        </div>
    );
}
