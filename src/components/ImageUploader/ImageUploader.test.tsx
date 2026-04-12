import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ImageUploader from './ImageUploader';

describe('ImageUploader', () => {
    it('renders the dropzone text and a hidden file input', () => {
        const { container } = render(<ImageUploader onImageUpload={vi.fn()} onError={vi.fn()} />);

        // Find our beautiful new UI text
        expect(screen.getByText(/Drag & Drop an image to begin/i)).toBeInTheDocument();

        // Verify the hidden input still exists under the hood (for click fallback!)
        const fileInput = container.querySelector('input[type="file"]');
        expect(fileInput).toBeInTheDocument();
        expect(fileInput).toHaveAttribute('accept', 'image/*');
    });

    it('handles manual clicks (simulating the native file picker)', () => {
        const mockOnImageUpload = vi.fn();
        const { container } = render(<ImageUploader onImageUpload={mockOnImageUpload} onError={vi.fn()} />);

        const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
        const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

        // Simulate Native File Picker upload
        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(mockOnImageUpload).toHaveBeenCalledTimes(1);
        expect(mockOnImageUpload).toHaveBeenCalledWith(file);
    });

    it('handles Drag and Drop functionality perfectly', () => {
        const mockOnImageUpload = vi.fn();
        render(<ImageUploader onImageUpload={mockOnImageUpload} onError={vi.fn()} />);

        // Since we didn't add a data-testid, we grab the DropZone via the text inside it!
        const dropZone = screen.getByText(/Drag & Drop an image to begin/i).parentElement?.parentElement as HTMLElement;
        const file = new File(['dummy content'], 'test.webp', { type: 'image/webp' });

        // 1. Simulate the user hovering a file over it
        fireEvent.dragOver(dropZone);

        // 2. Verify the text dynamically updated!
        expect(screen.getByText(/Drop your masterpiece here!/i)).toBeInTheDocument();

        // 3. Simulate letting go of the mouse button
        fireEvent.drop(dropZone, { dataTransfer: { files: [file] } });

        expect(mockOnImageUpload).toHaveBeenCalledTimes(1);
        expect(mockOnImageUpload).toHaveBeenCalledWith(file);
    });

    it('calls onError when a bad file format is dropped (e.g., PSD)', () => {
        const mockOnImageUpload = vi.fn();
        const mockOnError = vi.fn();
        render(<ImageUploader onImageUpload={mockOnImageUpload} onError={mockOnError} />);

        const dropZone = screen.getByText(/Drag & Drop an image to begin/i).parentElement?.parentElement as HTMLElement;
        const failFile = new File(['dummy psd'], 'image.psd', { type: 'image/vnd.adobe.photoshop' });

        fireEvent.drop(dropZone, { dataTransfer: { files: [failFile] } });

        expect(mockOnImageUpload).not.toHaveBeenCalled();
        expect(mockOnError).toHaveBeenCalledTimes(1);
        expect(mockOnError).toHaveBeenCalledWith(expect.stringMatching(/unsupported/i));
    });
});
