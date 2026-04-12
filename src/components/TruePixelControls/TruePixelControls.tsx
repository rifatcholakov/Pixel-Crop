import styles from './TruePixelControls.module.css';
import CropInput from '../CropInput';

type CropMath = {
    aspect: number | undefined;
    getTrueWidth: () => number;
    getTrueHeight: () => number;
    getTrueX: () => number;
    getTrueY: () => number;
    handleWidthChange: (val: number) => void;
    handleHeightChange: (val: number) => void;
    handleXChange: (val: number) => void;
    handleYChange: (val: number) => void;
};

type TruePixelControlsProps = {
    cropMath: CropMath;
};

export default function TruePixelControls({ cropMath }: TruePixelControlsProps) {
    const { aspect, getTrueWidth, getTrueHeight, getTrueX, getTrueY,
        handleWidthChange, handleHeightChange, handleXChange, handleYChange } = cropMath;

    return (
        <div className={styles.container}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionTitle}>Precision</span>
            </div>
            <div className={styles.controlsGrid}>
                <CropInput label="W" value={getTrueWidth()} onChange={(e) => handleWidthChange(Number(e.target.value))} />
                <CropInput label="H" value={getTrueHeight()} disabled={!!aspect} onChange={(e) => handleHeightChange(Number(e.target.value))} />
                <CropInput label="X" value={getTrueX()} onChange={(e) => handleXChange(Number(e.target.value))} />
                <CropInput label="Y" value={getTrueY()} onChange={(e) => handleYChange(Number(e.target.value))} />
            </div>
        </div>
    );
}
