import React, { useState, useRef } from 'react';
import { SUPPORTED_MIME_TYPES } from "@/utils/constants";
import type { ImageUploaderProps } from "@/types";
import styles from "./ImageUploader.module.css";

export default function ImageUploader({ onImageUpload, onError }: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const processFile = (file?: File) => {
        if (!file) {
            onError("No file selected.");
            return;
        }
        if (!SUPPORTED_MIME_TYPES.includes(file.type)) {
            onError("Unsupported file format. Please upload a JPEG, PNG, WEBP, or AVIF.");
            return;
        }
        onImageUpload(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0]; // Grab the dropped file!
        processFile(file);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        processFile(file);

        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className={styles.uploadContainer}>
            <div
                className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className={styles.hiddenInput}
                    accept="image/*"
                    onChange={handleInputChange}
                />

                <div className={styles.uploadContent}>
                    <div className={styles.iconWrapper}>
                        <svg className={styles.uploadIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                    </div>
                    <h2 className={styles.welcomeTitle}>Welcome to PixelCrop ✨</h2>
                    <h3 className={styles.actionTitle}>{isDragging ? "Drop your masterpiece here!" : "Drag & Drop an image to begin"}</h3>
                    <p className={styles.subtext}>Supports high-res JPEG, PNG, WEBP, and AVIF formats.</p>
                    
                    <button className={styles.browseButton}>Browse Files</button>
                </div>
            </div>
        </div>
    );
}
