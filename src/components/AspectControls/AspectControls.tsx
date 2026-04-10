import { type Crop } from 'react-image-crop';
import styles from './AspectControls.module.css';

type AspectControlsProps = {
    setAspect: (aspect: number | undefined) => void;
    setCrop: (crop: Crop) => void;
};

export default function AspectControls({ setAspect, setCrop }: AspectControlsProps) {
    return (
        <div className={styles.aspectRatios}>
            <strong>Aspect Ratio:</strong>
            <button onClick={() => setAspect(1)}>Square 1:1</button>
            <button onClick={() => setAspect(16 / 9)}>16:9 Landscape</button>
            <button onClick={() => setAspect(undefined)}>Freeform</button>
            <button
                onClick={() => {
                    setAspect(undefined);
                    setCrop({ unit: '%', x: 0, y: 0, width: 100, height: 100 });
                }}
                className={styles.resetButton}
            >
                Reset Crop
            </button>
        </div>
    );
}
