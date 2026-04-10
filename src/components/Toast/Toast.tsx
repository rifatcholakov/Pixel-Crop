import { useEffect } from 'react';
import styles from './Toast.module.css';
import { TOAST_DURATION_MS } from '@/utils/constants';

interface ToastProps {
    message: string;
    type?: 'error' | 'success' | 'info';
    onClose: () => void;
}

export default function Toast({ message, type = 'error', onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, TOAST_DURATION_MS);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div className={`${styles.toast} ${styles[type]}`}>
            <span>{message}</span>
            <button onClick={onClose} className={styles.closeBtn}>&times;</button>
        </div>
    );
}
