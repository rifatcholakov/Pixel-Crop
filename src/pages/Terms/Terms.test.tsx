import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Terms from './Terms';

describe('Terms Page', () => {
  it('renders terms of service heading', () => {
    render(<Terms />);
    expect(screen.getByText('Terms of Service')).toBeDefined();
  });

  it('renders all sections', () => {
    render(<Terms />);
    const headings = ['1. Agreement to Terms', '2. Use License', '3. Disclaimer', '4. Limitations of Liability', '5. Governing Law'];
    headings.forEach(text => {
      expect(screen.getByText(text)).toBeDefined();
    });
  });
});
