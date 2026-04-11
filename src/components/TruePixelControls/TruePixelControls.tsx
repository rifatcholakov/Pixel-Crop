import styles from './TruePixelControls.module.css';
import CropInput from '../CropInput';

type TruePixelControlsProps = {
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

export default function TruePixelControls(props: TruePixelControlsProps) {
    return (
        <div className={styles.container}>
            <h3>True Pixel Controls</h3>
            <div className={styles.controlsGrid}>
                <CropInput label="Width" value={props.getTrueWidth()} onChange={(e) => props.handleWidthChange(Number(e.target.value))} />
                <CropInput label="Height" value={props.getTrueHeight()} disabled={!!props.aspect} onChange={(e) => props.handleHeightChange(Number(e.target.value))} />
                <CropInput label="X position" value={props.getTrueX()} onChange={(e) => props.handleXChange(Number(e.target.value))} />
                <CropInput label="Y position" value={props.getTrueY()} onChange={(e) => props.handleYChange(Number(e.target.value))} />
            </div>
        </div>
    );
}
