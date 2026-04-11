import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CookieBanner from './CookieBanner';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('CookieBanner', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  it('shows banner after delay if no consent exists', async () => {
    renderWithRouter(<CookieBanner />);
    
    // Initially not visible
    expect(screen.queryByText(/Browser Preferences/)).toBeNull();
    
    // Advance timers inside act
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    
    expect(screen.getByText(/Browser Preferences/)).toBeDefined();
  });

  it('saves consent and hides when "Accept All" is clicked', async () => {
    renderWithRouter(<CookieBanner />);
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    
    const acceptBtn = screen.getByText('Accept All');
    fireEvent.click(acceptBtn);
    
    const saved = JSON.parse(localStorage.getItem('cookie-consent') || '{}');
    expect(saved.analytics).toBe(true);
    expect(saved.functional).toBe(true);
    expect(screen.queryByText(/Browser Preferences/)).toBeNull();
  });

  it('saves minimal consent and hides when "Reject Non-Essential" is clicked', async () => {
    renderWithRouter(<CookieBanner />);
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    
    const rejectBtn = screen.getByText('Reject Non-Essential');
    fireEvent.click(rejectBtn);
    
    const saved = JSON.parse(localStorage.getItem('cookie-consent') || '{}');
    expect(saved.analytics).toBe(false);
    expect(saved.functional).toBe(false);
    expect(saved.necessary).toBe(true);
    expect(screen.queryByText(/Browser Preferences/)).toBeNull();
  });
});
