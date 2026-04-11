import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from './Home';

// Mock components
vi.mock('../../components/ImageUploader', () => ({
  default: ({ onImageUpload }: { onImageUpload: (f: File) => void }) => (
    <div data-testid="image-uploader">
      <button onClick={() => onImageUpload(new File([''], 'test.png', { type: 'image/png' }))}>
        Upload Mock
      </button>
    </div>
  )
}));

vi.mock('../../components/ImageCropper', () => ({
  default: () => <div data-testid="image-cropper">Image Cropper</div>
}));

describe('Home Page', () => {
  beforeEach(() => {
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'mock-url'),
      revokeObjectURL: vi.fn(),
    });
  });

  it('renders image uploader by default', () => {
    render(<Home />);
    expect(screen.getByTestId('image-uploader')).toBeDefined();
    expect(screen.queryByTestId('image-cropper')).toBeNull();
  });

  it('transitions to image cropper after upload', async () => {
    render(<Home />);
    
    const uploadBtn = screen.getByText('Upload Mock');
    fireEvent.click(uploadBtn);
    
    expect(await screen.findByTestId('image-cropper')).toBeDefined();
    expect(screen.queryByTestId('image-uploader')).toBeNull();
  });

  it('can reset back to uploader', async () => {
    render(<Home />);
    
    fireEvent.click(screen.getByText('Upload Mock'));
    expect(await screen.findByTestId('image-cropper')).toBeDefined();
    
    const resetBtn = screen.getByText('✕ Start Over');
    fireEvent.click(resetBtn);
    
    expect(screen.getByTestId('image-uploader')).toBeDefined();
  });
});
