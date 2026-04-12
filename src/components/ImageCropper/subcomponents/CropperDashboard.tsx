import styles from '../ImageCropper.module.css';
import TruePixelControls from '../../TruePixelControls';
import MetadataPanel from '../../MetadataPanel';
import type { RefObject } from 'react';
import type { Crop } from 'react-image-crop';

type CropperDashboardProps = {
    cropMath: any; // Using any for brevity here, normally I'd use the full type from useCropMath
    file: File;
    imgRef: RefObject<HTMLImageElement | null>;
    onReset: () => void;
    downloadCrop: (cropPixels: Crop | null) => Promise<void>;
    cropPixels: Crop | null;
    isDownloading: boolean;
};

export default function CropperDashboard({
    cropMath,
    file,
    imgRef,
    onReset,
    downloadCrop,
    cropPixels,
    isDownloading
}: CropperDashboardProps) {
    return (
        <div className={styles.dashboard}>
            <div className={styles.dashboardContent}>
                <TruePixelControls cropMath={cropMath} />
                
                <MetadataPanel file={file} imgRef={imgRef} />

                <div className={styles.actionSection}>
                    <button onClick={onReset} className={styles.resetBtn}>
                        Reset
                    </button>
                    <button 
                        onClick={() => downloadCrop(cropPixels)} 
                        className={styles.downloadBtn} 
                        disabled={isDownloading}
                    >
                        {isDownloading ? 'Processing...' : 'Download Result'}
                    </button>
                </div>
            </div>
        </div>
    );
}
