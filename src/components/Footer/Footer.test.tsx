import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('Footer', () => {
  it('renders branding and copyright', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('PixelCrop')).toBeDefined();
    expect(screen.getByText(/All rights reserved/)).toBeDefined();
  });

  it('contains legal links', () => {
    renderWithRouter(<Footer />);
    const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
    const termsLink = screen.getByRole('link', { name: /terms of service/i });
    const cookieLink = screen.getByRole('link', { name: /cookie settings/i });

    expect(privacyLink.getAttribute('href')).toBe('/privacy');
    expect(termsLink.getAttribute('href')).toBe('/terms');
    expect(cookieLink.getAttribute('href')).toBe('/cookie-settings');
  });
});
