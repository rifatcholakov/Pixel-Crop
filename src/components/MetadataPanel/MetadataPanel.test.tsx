import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MetadataPanel from './MetadataPanel';

describe('MetadataPanel', () => {

    it('renders the file name, type, and size correctly', () => {
        const dummyFile = new File([''], 'vacation.png', { type: 'image/png' });

        // Hack the size property so it is exactly 2 Megabytes! 
        // (We do this so we don't have to fill memory with millions of blank characters)
        Object.defineProperty(dummyFile, 'size', { value: 2 * 1024 * 1024 });

        // Mock an image that has NOT completely loaded yet
        const dummyImgRef = { current: null };

        render(<MetadataPanel file={dummyFile} imgRef={dummyImgRef} />);

        // Check the title
        expect(screen.getByText('Image Metadata')).toBeInTheDocument();

        // Check the extracted file info
        expect(screen.getByText('vacation.png')).toBeInTheDocument();
        expect(screen.getByText('image/png')).toBeInTheDocument();
        expect(screen.getByText('2.00 MB')).toBeInTheDocument();
    });

    it('displays the native resolution when the image completely loads', () => {
        const dummyFile = new File([''], 'vacation.png', { type: 'image/png' });

        // Mock an Image Element that HAS completely loaded
        const loadedImg = document.createElement('img');
        Object.defineProperty(loadedImg, 'naturalWidth', { value: 1920 });
        Object.defineProperty(loadedImg, 'naturalHeight', { value: 1080 });

        const dummyImgRef = { current: loadedImg };

        render(<MetadataPanel file={dummyFile} imgRef={dummyImgRef} />);

        // The resolution string should successfully appear!
        expect(screen.getByText('1920 x 1080 px')).toBeInTheDocument();
    });

    it('hides the native resolution safely if the image is rendering (width = 0)', () => {
        const dummyFile = new File([''], 'vacation.png', { type: 'image/png' });

        // Mock an Image Element that is actively downloading
        const loadingImg = document.createElement('img');
        Object.defineProperty(loadingImg, 'naturalWidth', { value: 0 });

        const dummyImgRef = { current: loadingImg };

        render(<MetadataPanel file={dummyFile} imgRef={dummyImgRef} />);

        // The Resolution label should safely not exist yet
        expect(screen.queryByText(/Native Res:/i)).not.toBeInTheDocument();
    });

    it('returns null safely when file is null', () => {
        const dummyImgRef = { current: null };
        const { container } = render(<MetadataPanel file={null} imgRef={dummyImgRef} />);

        // The component should render nothing (return null)
        expect(container.firstChild).toBeNull();
    });

});
