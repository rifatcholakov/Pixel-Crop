import styles from '../ImageCropper.module.css';
import AspectControls from '../../AspectControls';

type CropperTopBarProps = {
    aspect: number | undefined;
    setAspect: (aspect: number | undefined) => void;
    showPreview: boolean;
    setShowPreview: (show: boolean) => void;
};

export default function CropperTopBar({
    aspect,
    setAspect,
    showPreview,
    setShowPreview
}: CropperTopBarProps) {
    return (
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
    );
}
