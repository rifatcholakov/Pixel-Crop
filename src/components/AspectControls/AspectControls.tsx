import styles from './AspectControls.module.css';

type AspectControlsProps = {
    aspect: number | undefined;
    setAspect: (aspect: number | undefined) => void;
};

export default function AspectControls({ aspect, setAspect }: AspectControlsProps) {
    const ratios = [
        { label: 'Free', value: undefined },
        { label: '1:1', value: 1 },
        { label: '16:9', value: 16 / 9 },
        { label: '4:3', value: 4 / 3 },
        { label: '2:3', value: 2 / 3 },
    ];

    return (
        <div className={styles.container}>
            {ratios.map((r) => (
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
