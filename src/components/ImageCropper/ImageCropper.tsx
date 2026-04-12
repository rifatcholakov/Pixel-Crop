import { useRef, useState } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styles from './ImageCropper.module.css';

import useCropMath from '@/hooks/useCropMath';
import useImageDownload from '@/hooks/useImageDownload';
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

    const cropMath = useCropMath(imgRef);
    const { crop, setCrop, aspect, setAspect } = cropMath;

    const { downloadCrop, isDownloading } = useImageDownload({ imageSrc, file, onError });

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
                    <TruePixelControls cropMath={cropMath} />
                    
                    <MetadataPanel file={file} imgRef={imgRef} />

                    <div className={styles.actionSection}>
                        <button onClick={onReset} className={styles.resetBtn}>
                            Reset
                        </button>
                        <button onClick={() => downloadCrop(cropPixels)} className={styles.downloadBtn} disabled={isDownloading}>
                            {isDownloading ? 'Processing...' : 'Download Result'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
