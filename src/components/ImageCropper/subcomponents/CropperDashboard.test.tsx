import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CropperDashboard from './CropperDashboard';

describe('CropperDashboard', () => {
    const mockCropMath = {
        aspect: undefined,
        getTrueWidth: () => 800,
        getTrueHeight: () => 600,
        getTrueX: () => 10,
        getTrueY: () => 10,
        handleWidthChange: vi.fn(),
        handleHeightChange: vi.fn(),
        handleXChange: vi.fn(),
        handleYChange: vi.fn(),
    };

    const dummyFile = new File([''], 'test.png', { type: 'image/png' });
    const dummyImgRef = { current: null };

    const mockProps = {
        cropMath: mockCropMath,
        file: dummyFile,
        imgRef: dummyImgRef,
        onReset: vi.fn(),
        downloadCrop: vi.fn(),
        cropPixels: null,
        isDownloading: false,
    };

    it('renders all control sections', () => {
        render(<CropperDashboard {...mockProps} />);
        
        // Precision controls
        expect(screen.getByText('Precision')).toBeDefined();
        expect(screen.getByLabelText(/^W$/i)).toBeDefined();
        
        // Asset/Metadata
        expect(screen.getByText('Asset')).toBeDefined();
        expect(screen.getByText('test.png')).toBeDefined();
        
        // Actions
        expect(screen.getByText('Reset')).toBeDefined();
        expect(screen.getByText('Download Result')).toBeDefined();
    });

    it('calls onReset when reset button is clicked', () => {
        render(<CropperDashboard {...mockProps} />);
        
        const resetBtn = screen.getByText('Reset');
        fireEvent.click(resetBtn);
        
        expect(mockProps.onReset).toHaveBeenCalledTimes(1);
    });

    it('calls downloadCrop when download button is clicked', () => {
        render(<CropperDashboard {...mockProps} />);
        
        const downloadBtn = screen.getByText('Download Result');
        fireEvent.click(downloadBtn);
        
        expect(mockProps.downloadCrop).toHaveBeenCalledTimes(1);
    });

    it('disables download button and shows processing text when isDownloading is true', () => {
        render(<CropperDashboard {...mockProps} isDownloading={true} />);
        
        const downloadBtn = screen.getByText('Processing...');
        expect(downloadBtn).toBeDisabled();
    });
});
