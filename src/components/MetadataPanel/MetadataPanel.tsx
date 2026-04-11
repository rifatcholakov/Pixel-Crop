import { type RefObject } from 'react';
import styles from './MetadataPanel.module.css';

type MetadataPanelProps = {
    file: File | null;
    imgRef: RefObject<HTMLImageElement | null>;
};

export default function MetadataPanel({ file, imgRef }: MetadataPanelProps) {
    if (!file) return null;

    // Convert Bytes to MegaBytes
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    const width = imgRef.current?.naturalWidth || 0;
    const height = imgRef.current?.naturalHeight || 0;

    return (
        <div className={styles.container} >
            <h3>Image Metadata </h3>
            < ul className={styles.list} >
                <li><strong>Name: </strong> {file.name}</li >
                <li><strong>Type: </strong> {file.type}</li >
                <li><strong>Size: </strong> {sizeMB} MB</li >
                {width > 0 && <li><strong>Native Res: </strong> {width} x {height} px</li >}
            </ul>
        </div>
    );
}
