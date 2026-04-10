import styles from "./CropInput.module.css";

type CropInputProps = {
    label: string;
    value: number;
    disabled?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CropInput({ label, value, disabled = false, onChange }: CropInputProps) {
    const inputId = `crop-input-${label.toLowerCase().replace(" ", "-")}`;

    return (
        <div className={styles.inputGroup}>
            <label htmlFor={inputId}>{label}: </label>
            <input
                type="number"
                id={inputId}
                value={value}
                disabled={disabled}
                onChange={onChange}
                min="0"
            />
        </div>
    )
}

