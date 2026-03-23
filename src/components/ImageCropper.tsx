import { useState } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

type ImageCropperProps = {
    imageSrc: string;
    // We pass the completed pixel values up to the parent when dragging stops
    onCropPixelsChange: (cropPixels: Crop) => void;
}

export default function ImageCropper({ imageSrc, onCropPixelsChange }: ImageCropperProps) {
    // Exactly matches your 4 number inputs!
    const [crop, setCrop] = useState<Crop>({
        unit: 'px',
        x: 0,
        y: 0,
        width: 200,
        height: 200
    });

    return (
        <div style={{ display: 'flex', gap: '2rem' }}>

            {/* 1. Visual Cropper */}
            <div>
                <ReactCrop
                    crop={crop}
                    onChange={c => setCrop(c)}
                    onComplete={(pixelCrop, percentCrop) => onCropPixelsChange(percentCrop)}
                >
                    <img src={imageSrc} alt="Crop" style={{ maxWidth: '100%' }} />
                </ReactCrop>
            </div>

            {/* 2. Manual Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3>Manual Controls</h3>

                {/* Example: I wired up Width for you! */}
                <div>
                    <label htmlFor="crop-width">Width: </label>
                    <input
                        id="crop-width"
                        type="number"
                        value={crop.width}
                        onChange={(e) => setCrop({ ...crop, width: Number(e.target.value) })}
                    />
                </div>

                <div>
                    <label htmlFor="crop-height">Height: </label>
                    <input
                        id="crop-height"
                        type="number"
                        value={crop.height}
                        onChange={(e) => setCrop({ ...crop, height: Number(e.target.value) })}
                    />
                </div>
                <div>
                    <label htmlFor="crop-x">X position: </label>
                    <input
                        id="crop-x"
                        type="number"
                        value={crop.x}
                        onChange={(e) => setCrop({ ...crop, x: Number(e.target.value) })}
                    />
                </div>
                <div>
                    <label htmlFor="crop-y">Y position: </label>
                    <input
                        id="crop-y"
                        type="number"
                        value={crop.y}
                        onChange={(e) => setCrop({ ...crop, y: Number(e.target.value) })}
                    />
                </div>

            </div>
        </div>
    );
}
