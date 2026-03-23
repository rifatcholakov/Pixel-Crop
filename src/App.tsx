import { useState, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import ImageCropper from './components/ImageCropper';
import { getCroppedImg } from './utils/cropImage';
import { type Crop } from 'react-image-crop';

export default function App() {
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
      const croppedBlob = await getCroppedImg(previewSrc, cropPixels, file.type);

      if (!croppedBlob) {
        setError("An error occurred generating the cropped image.");
        return;
      }

      const url = URL.createObjectURL(croppedBlob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `cropped-${file.name}`;
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("Failed to crop the image.");
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Image Cropper App</h1>

      {error && <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>}

      <hr style={{ margin: '2rem 0' }} />

      {!previewSrc ? (
        <ImageUploader
          onImageUpload={(uploadedFile) => {
            setFile(uploadedFile);
            setError(null);
          }}
          onError={(errMsg) => setError(errMsg)}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <ImageCropper
            imageSrc={previewSrc}
            onCropPixelsChange={(pixels) => setCropPixels(pixels)}
          />

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={handleDownload}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Download Cropped Image
            </button>

            <button
              onClick={() => setFile(null)}
              style={{ padding: '1rem', cursor: 'pointer' }}
            >
              Start Over
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
