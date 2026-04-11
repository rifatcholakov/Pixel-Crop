import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Privacy from './Privacy';

describe('Privacy Page', () => {
  it('renders privacy policy heading', () => {
    render(<Privacy />);
    expect(screen.getByText('Privacy Policy')).toBeDefined();
  });

  it('renders all sections', () => {
    render(<Privacy />);
    const headings = ['1. Introduction', '2. The Data We Collect', '3. How We Use Your Data', '4. Cookie Policy', '5. Your Rights', '6. Contact Us'];
    headings.forEach(text => {
      expect(screen.getByText(text)).toBeDefined();
    });
  });
});
