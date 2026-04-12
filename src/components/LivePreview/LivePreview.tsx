import { useRef, useEffect, type RefObject } from 'react';
import { type Crop } from 'react-image-crop';
import { canvasPreview } from '@/utils/canvasPreview';
import styles from './LivePreview.module.css';

type LivePreviewProps = {
    imgRef: RefObject<HTMLImageElement | null>;
    crop: Crop;
};

export default function LivePreview({ imgRef, crop }: LivePreviewProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (crop.width > 0 && crop.height > 0 && imgRef.current && canvasRef.current) {
            canvasPreview(imgRef.current, canvasRef.current, crop);
        }
    }, [crop]);

    return (
        <div className={styles.previewWrapper} data-testid="live-preview-wrapper">
            <canvas ref={canvasRef} className={styles.previewCanvas} />
            <div className={styles.badge}>Live Result</div>
        </div>
    );
}
