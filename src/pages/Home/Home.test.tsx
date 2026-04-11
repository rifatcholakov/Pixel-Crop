import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from './Home';

// Mock components that are already tested elsewhere
vi.mock('../../components/ImageUploader', () => ({
  default: () => <div data-testid="image-uploader">Image Uploader</div>
}));

describe('Home Page', () => {
  beforeEach(() => {
    // Reset any mocks if necessary
  });

  it('renders image uploader by default', () => {
    render(<Home />);
    expect(screen.getByTestId('image-uploader')).toBeDefined();
  });
});
