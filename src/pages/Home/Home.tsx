import { useState, useEffect } from 'react';
import ImageUploader from '../../components/ImageUploader';
import ImageCropper from '../../components/ImageCropper';
import { getCroppedImg, generateDownloadName } from '../../utils/cropImage';
import { type Crop } from 'react-image-crop';
import styles from '../../App.module.css';
import Toast from '../../components/Toast';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [cropPixels, setCropPixels] = useState<Crop | null>(null);
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

  const handleDownload = async () => {
    if (!file || !previewSrc || !cropPixels) return;

    try {
      const cropResult = await getCroppedImg(previewSrc, cropPixels, file.type);

      if (!cropResult || !cropResult.blob) {
        setError("An error occurred generating the cropped image.");
        return;
      }

      const { blob: croppedBlob, width, height } = cropResult;
      const url = URL.createObjectURL(croppedBlob);

      const a = document.createElement('a');
      a.href = url;
      a.download = generateDownloadName(file.name, width, height);
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("Failed to crop the image.");
    }
  };

  return (
    <>
      {error && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}

      <main className={styles.mainCard}>
        <hr className={styles.divider} />

        {!previewSrc ? (
          <ImageUploader
            onImageUpload={(uploadedFile) => {
              setFile(uploadedFile);
              setError(null);
            }}
            onError={(errMsg) => setError(errMsg)}
          />
        ) : (
          <>
            <ImageCropper
              imageSrc={previewSrc}
              file={file}
              onCropPixelsChange={(pixels) => setCropPixels(pixels)}
            />

            <div className={styles.actionPanel}>
              <button onClick={handleDownload} className={styles.downloadButton}>
                ↓ Download Cropped Image
              </button>
              <button onClick={() => setFile(null)} className={styles.resetButton}>
                ✕ Start Over
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
