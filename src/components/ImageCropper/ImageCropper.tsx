import { useRef } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styles from './ImageCropper.module.css';

import useCropMath from '@/hooks/useCropMath';
import AspectControls from '../AspectControls';
import TruePixelControls from '../TruePixelControls';
import type { ImageCropperProps } from '@/types';

export default function ImageCropper({ imageSrc, onCropPixelsChange }: ImageCropperProps) {
    const imgRef = useRef<HTMLImageElement>(null);

    const {
        crop, setCrop, aspect, setAspect,
        getTrueWidth, getTrueHeight, getTrueX, getTrueY,
        handleWidthChange, handleHeightChange, handleXChange, handleYChange
    } = useCropMath(imgRef);

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

            <TruePixelControls
                aspect={aspect}
                getTrueWidth={getTrueWidth}
                getTrueHeight={getTrueHeight}
                getTrueX={getTrueX}
                getTrueY={getTrueY}
                handleWidthChange={handleWidthChange}
                handleHeightChange={handleHeightChange}
                handleXChange={handleXChange}
                handleYChange={handleYChange}
            />
        </div>
    );

}
