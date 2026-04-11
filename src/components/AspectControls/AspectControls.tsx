import { type Crop } from 'react-image-crop';
import styles from './AspectControls.module.css';

type AspectControlsProps = {
    aspect: number | undefined;
    setAspect: (aspect: number | undefined) => void;
    setCrop: (crop: Crop) => void;
};

export default function AspectControls({ aspect, setAspect, setCrop }: AspectControlsProps) {
    return (
        <div className={styles.container}>
            <span>Aspect Ratios:</span>
            <button className={`${styles.button} ${aspect === 1 ? styles.active : ''}`} onClick={() => setAspect(1)}>Square 1:1</button>
            <button className={`${styles.button} ${aspect === 16 / 9 ? styles.active : ''}`} onClick={() => setAspect(16 / 9)}>16:9 Landscape</button>
            <button className={`${styles.button} ${aspect === undefined ? styles.active : ''}`} onClick={() => setAspect(undefined)}>Freeform</button>
            <button
                onClick={() => {
                    setAspect(undefined);
                    setCrop({ unit: '%', x: 0, y: 0, width: 100, height: 100 });
                }}
                className={`${styles.button} ${styles.resetButton}`}
            >
                Reset Crop
            </button>
        </div>
    );
}
