import { useState, useRef } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

type ImageCropperProps = {
    imageSrc: string;
    onCropPixelsChange: (crop: Crop) => void;
}

export default function ImageCropper({ imageSrc, onCropPixelsChange }: ImageCropperProps) {
    const [aspect, setAspect] = useState<number | undefined>(undefined);
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        x: 0,
        y: 0,
        width: 100,
        height: 100
    });

    const imgRef = useRef<HTMLImageElement>(null);

    const getTrueWidth = () => imgRef.current ? Math.round((crop.width / 100) * imgRef.current.naturalWidth) : 0;
    const getTrueHeight = () => imgRef.current ? Math.round((crop.height / 100) * imgRef.current.naturalHeight) : 0;
    const getTrueX = () => imgRef.current ? Math.round((crop.x / 100) * imgRef.current.naturalWidth) : 0;
    const getTrueY = () => imgRef.current ? Math.round((crop.y / 100) * imgRef.current.naturalHeight) : 0;

    return (
        <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
                {/* Fix 4: Aspect Ratio Toggles! */}
                <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <strong>Aspect Ratio:</strong>
                    <button onClick={() => setAspect(1)}>Square 1:1</button>
                    <button onClick={() => setAspect(16 / 9)}>16:9 Landscape</button>
                    <button onClick={() => setAspect(undefined)}>Freeform</button>
                </div>

                <ReactCrop
                    crop={crop}
                    aspect={aspect}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(_, percentCrop) => onCropPixelsChange(percentCrop)}
                >
                    <img
                        ref={imgRef}
                        src={imageSrc}
                        alt="Crop"
                        style={{ maxWidth: '100%' }}
                        onLoad={() => setCrop({ ...crop })}
                    />
                </ReactCrop>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3>True Pixel Controls</h3>

                <div>
                    <label htmlFor="crop-width">Width: </label>
                    <input
                        id="crop-width" type="number"
                        value={getTrueWidth()}
                        onChange={(e) => {
                            if (!imgRef.current) return;
                            // Fix 3: No zero widths!
                            const newNativePx = Math.max(10, Number(e.target.value));
                            let newPct = (newNativePx / imgRef.current.naturalWidth) * 100;
                            // Fix 2: Clamp width so it doesn't bleed off screen!
                            newPct = Math.min(100 - crop.x, newPct);

                            // Fix 4: Auto-calculate height if Aspect Ratio is locked
                            if (aspect) {
                                const newHeightNativePx = (newPct / 100 * imgRef.current.naturalWidth) / aspect;
                                const newHeightPct = (newHeightNativePx / imgRef.current.naturalHeight) * 100;
                                setCrop({ ...crop, width: newPct, height: newHeightPct });
                            } else {
                                setCrop({ ...crop, width: newPct });
                            }
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="crop-height">Height: </label>
                    <input
                        id="crop-height" type="number"
                        value={getTrueHeight()}
                        disabled={!!aspect} // Fix 4: Disable if Ratio is locked
                        onChange={(e) => {
                            if (!imgRef.current || aspect) return;
                            const newNativePx = Math.max(10, Number(e.target.value));
                            let newPct = (newNativePx / imgRef.current.naturalHeight) * 100;
                            newPct = Math.min(100 - crop.y, newPct);
                            setCrop({ ...crop, height: newPct });
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="crop-x">X position: </label>
                    <input
                        id="crop-x" type="number"
                        value={getTrueX()}
                        onChange={(e) => {
                            if (!imgRef.current) return;
                            const newNativePx = Math.max(0, Number(e.target.value)); // Clamp negative
                            let newPct = (newNativePx / imgRef.current.naturalWidth) * 100;
                            newPct = Math.min(100 - crop.width, newPct); // Clamp bleeding
                            setCrop({ ...crop, x: newPct });
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="crop-y">Y position: </label>
                    <input
                        id="crop-y" type="number"
                        value={getTrueY()}
                        onChange={(e) => {
                            if (!imgRef.current) return;
                            const newNativePx = Math.max(0, Number(e.target.value));
                            let newPct = (newNativePx / imgRef.current.naturalHeight) * 100;
                            newPct = Math.min(100 - crop.height, newPct);
                            setCrop({ ...crop, y: newPct });
                        }}
                    />
                </div>

            </div>
        </div>
    );
}
