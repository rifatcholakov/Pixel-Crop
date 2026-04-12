import { useState, useEffect } from 'react';
import ImageUploader from '../../components/ImageUploader';
import ImageCropper from '../../components/ImageCropper';
import styles from '../../App.module.css';
import Toast from '../../components/Toast';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewSrc(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewSrc(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleReset = () => {
    setFile(null);

    setError(null);
  };

  return (
    <>
      {error && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}

      <main className={styles.mainCard}>
        {!previewSrc ? (
          <ImageUploader
            onImageUpload={(uploadedFile) => {
              setFile(uploadedFile);
              setError(null);
            }}
            onError={(errMsg) => setError(errMsg)}
          />
        ) : (
          <ImageCropper
            imageSrc={previewSrc}
            file={file!}

            onReset={handleReset}
            onError={(errMsg) => setError(errMsg)}
          />
        )}
      </main>
    </>
  );
}
