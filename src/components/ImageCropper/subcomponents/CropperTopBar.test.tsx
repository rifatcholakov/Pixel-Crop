import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CropperTopBar from './CropperTopBar';

describe('CropperTopBar', () => {
    const mockProps = {
        aspect: undefined,
        setAspect: vi.fn(),
        showPreview: true,
        setShowPreview: vi.fn(),
    };

    it('renders aspect controls and preview toggle', () => {
        render(<CropperTopBar {...mockProps} />);
        
        // Check for common aspect ratio labels
        expect(screen.getByText('1:1')).toBeDefined();
        expect(screen.getByText('16:9')).toBeDefined();
        
        // Check for toggle button text
        expect(screen.getByText('Hide Preview')).toBeDefined();
    });

    it('shows "Split Preview" when showPreview is false', () => {
        render(<CropperTopBar {...mockProps} showPreview={false} />);
        expect(screen.getByText('Split Preview')).toBeDefined();
    });

    it('calls setShowPreview when toggle button is clicked', () => {
        render(<CropperTopBar {...mockProps} />);
        
        const toggleBtn = screen.getByText('Hide Preview');
        fireEvent.click(toggleBtn);
        
        expect(mockProps.setShowPreview).toHaveBeenCalledWith(false);
    });
});
