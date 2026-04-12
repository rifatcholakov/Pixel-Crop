import styles from './AspectControls.module.css';

type AspectControlsProps = {
    aspect: number | undefined;
    setAspect: (aspect: number | undefined) => void;
};

const ASPECT_RATIOS = [
    { label: 'Free', value: undefined },
    { label: '1:1', value: 1 },
    { label: '16:9', value: 16 / 9 },
    { label: '4:3', value: 4 / 3 },
    { label: '2:3', value: 2 / 3 },
] as const;

export default function AspectControls({ aspect, setAspect }: AspectControlsProps) {

    return (
        <div className={styles.container}>
            {ASPECT_RATIOS.map((r) => (
                <button
                    key={r.label}
                    className={`${styles.button} ${aspect === r.value ? styles.active : ''}`}
                    onClick={() => setAspect(r.value)}
                >
                    {r.label}
                </button>
            ))}
        </div>
    );
}
