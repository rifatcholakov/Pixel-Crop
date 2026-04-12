import { useRef, useState } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styles from './ImageCropper.module.css';

import useCropMath from '@/hooks/useCropMath';
import { getCroppedImg, generateDownloadName } from '@/utils/cropImage';
import AspectControls from '../AspectControls';
import TruePixelControls from '../TruePixelControls';
import type { ImageCropperProps } from '@/types';
import LivePreview from '../LivePreview';
import MetadataPanel from '../MetadataPanel';

export default function ImageCropper({
    imageSrc, file, onReset, onError
}: ImageCropperProps) {
    const imgRef = useRef<HTMLImageElement>(null);
    const [cropPixels, setLocalCropPixels] = useState<Crop | null>(null);
    const [showPreview, setShowPreview] = useState(true);

    const {
        crop, setCrop, aspect, setAspect,
        getTrueWidth, getTrueHeight, getTrueX, getTrueY,
        handleWidthChange, handleHeightChange, handleXChange, handleYChange
    } = useCropMath(imgRef);

    const handleDownload = async () => {
        if (!file || !imageSrc || !cropPixels) return;

        try {
            const cropResult = await getCroppedImg(imageSrc, cropPixels, file.type);
            if (!cropResult || !cropResult.blob) {
                onError("An error occurred generating the cropped image.");
                return;
            }

            const { blob: croppedBlob, width, height } = cropResult;
            const url = URL.createObjectURL(croppedBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = generateDownloadName(file.name, width, height);
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            onError("Failed to crop the image.");
        }
    };

    return (
        <div className={styles.studioLayout}>
            {/* 1. TOP BAR: Aspect Selection + Toggles */}
            <div className={styles.topBar}>
                <div className={styles.topBarContent}>
                    <AspectControls aspect={aspect} setAspect={setAspect} />
                    <div className={styles.topBarDivider} />
                    <button 
                        className={`${styles.toggleBtn} ${showPreview ? styles.activeToggle : ''}`}
                        onClick={() => setShowPreview(!showPreview)}
                    >
                        {showPreview ? 'Hide Preview' : 'Split Preview'}
                    </button>
                </div>
            </div>

            {/* 2. MAIN WORKSPACE: Symmetrical Flex Row */}
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

            {/* 3. BOTTOM DASHBOARD: Controls + Info + Actions */}
            <div className={styles.dashboard}>
                <div className={styles.dashboardContent}>
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
                    
                    <MetadataPanel file={file} imgRef={imgRef} />

                    <div className={styles.actionSection}>
                        <button onClick={onReset} className={styles.resetBtn}>
                            Reset
                        </button>
                        <button onClick={handleDownload} className={styles.downloadBtn}>
                            Download Result
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
