import { type RefObject } from 'react';
import styles from './MetadataPanel.module.css';

type MetadataPanelProps = {
    file: File;
    imgRef: RefObject<HTMLImageElement | null>;
};

export default function MetadataPanel({ file, imgRef }: MetadataPanelProps) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    const width = imgRef.current?.naturalWidth ?? 0;
    const height = imgRef.current?.naturalHeight ?? 0;

    return (
        <div className={styles.container}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionTitle}>Asset</span>
            </div>
            <div className={styles.statsRow}>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Name</span>
                    <span className={styles.statValue} title={file.name}>{file.name}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Size</span>
                    <span className={styles.statValue}>{sizeMB} MB</span>
                </div>
                {width > 0 && (
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Original</span>
                        <span className={styles.statValue}>{width} × {height}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
