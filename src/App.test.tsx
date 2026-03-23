import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import App from './App';

describe('App Integration', () => {
    beforeAll(() => {
        // Mock browser-specific URL methods
        window.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/dummy');
        window.URL.revokeObjectURL = vi.fn();
    });


    it('navigates from Uploader to Cropper when a file is selected', () => {
        render(<App />);

        // 1. Initially, we should be on the upload screen
        const fileInput = screen.getByLabelText(/upload image/i);
        expect(fileInput).toBeInTheDocument();
        // The Download button should NOT exist yet
        expect(screen.queryByText(/download cropped image/i)).not.toBeInTheDocument();

        // 2. Simulate User Uploading an image
        const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
        fireEvent.change(fileInput, { target: { files: [file] } });

        // 3. The App should now render the Cropper screen!
        expect(window.URL.createObjectURL).toHaveBeenCalledWith(file);
        expect(screen.getByText(/download cropped image/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/width/i)).toBeInTheDocument(); // The cropper's manual inputs

        // The file input should be gone!
        expect(screen.queryByLabelText(/upload image/i)).not.toBeInTheDocument();
    });
});
