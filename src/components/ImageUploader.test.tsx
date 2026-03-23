import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ImageUploader from './ImageUploader';

describe('ImageUploader', () => {
    it('renders a file input that accepts images', () => {
        // We render the component with a dummy function
        render(<ImageUploader onImageUpload={() => { }} onError={vi.fn()} />);

        // We expect to find an input element with the label "Upload Image"
        const fileInput = screen.getByLabelText(/upload image/i);

        expect(fileInput).toBeInTheDocument();
        expect(fileInput).toHaveAttribute('type', 'file');
        expect(fileInput).toHaveAttribute('accept', 'image/*');
    });

    it('calls onImageUpload with the selected file when a valid image is chosen', () => {
        const mockOnImageUpload = vi.fn();
        render(<ImageUploader onImageUpload={mockOnImageUpload} onError={vi.fn()} />);

        const fileInput = screen.getByLabelText(/upload image/i);

        // Create a fake image file
        const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

        // Simulate a user selecting the file
        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(mockOnImageUpload).toHaveBeenCalledTimes(1);
        expect(mockOnImageUpload).toHaveBeenCalledWith(file);
    });

    it('calls onError when an unsupported browser format is uploaded (e.g., PSD)', () => {
        const mockOnImageUpload = vi.fn();
        const mockOnError = vi.fn();
        // We update the render to include our new onError prop
        render(<ImageUploader onImageUpload={mockOnImageUpload} onError={mockOnError} />);

        const fileInput = screen.getByLabelText(/upload image/i);

        // Simulate uploading a Photoshop file
        const file = new File(['dummy psd'], 'image.psd', { type: 'image/vnd.adobe.photoshop' });
        fireEvent.change(fileInput, { target: { files: [file] } });

        // It should NOT call the success callback
        expect(mockOnImageUpload).not.toHaveBeenCalled();

        // It SHOULD call the error callback with a message containing "unsupported"
        expect(mockOnError).toHaveBeenCalledTimes(1);
        expect(mockOnError).toHaveBeenCalledWith(expect.stringMatching(/unsupported/i));
    });
});
