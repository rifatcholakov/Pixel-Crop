import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MetadataPanel from './MetadataPanel';

describe('MetadataPanel', () => {

    it('renders the file name and size correctly', () => {
        const dummyFile = new File([''], 'vacation.png', { type: 'image/png' });
        Object.defineProperty(dummyFile, 'size', { value: 2 * 1024 * 1024 });

        const dummyImgRef = { current: null };

        render(<MetadataPanel file={dummyFile} imgRef={dummyImgRef} />);

        expect(screen.getByText('Asset')).toBeInTheDocument();
        expect(screen.getByText('vacation.png')).toBeInTheDocument();
        expect(screen.getByText('2.00 MB')).toBeInTheDocument();
    });

    it('displays the original resolution when the image loads', () => {
        const dummyFile = new File([''], 'vacation.png', { type: 'image/png' });

        const loadedImg = document.createElement('img');
        Object.defineProperty(loadedImg, 'naturalWidth', { value: 1920 });
        Object.defineProperty(loadedImg, 'naturalHeight', { value: 1080 });

        const dummyImgRef = { current: loadedImg };

        render(<MetadataPanel file={dummyFile} imgRef={dummyImgRef} />);

        expect(screen.getByText('1920 × 1080')).toBeInTheDocument();
    });

    it('hides the Original resolution stat when the image has not loaded yet', () => {
        const dummyFile = new File([''], 'photo.jpg', { type: 'image/jpeg' });
        // imgRef.current is null (image not mounted yet)
        const dummyImgRef = { current: null };

        render(<MetadataPanel file={dummyFile} imgRef={dummyImgRef} />);

        // Should render the panel but omit the resolution row
        expect(screen.getByText('photo.jpg')).toBeInTheDocument();
        expect(screen.queryByText(/×/)).not.toBeInTheDocument();
    });

    it('returns null if no file is provided', () => {
        const dummyImgRef = { current: null };
        const { container } = render(<MetadataPanel file={null} imgRef={dummyImgRef} />);
        expect(container.innerHTML).toBe('');
    });
});
