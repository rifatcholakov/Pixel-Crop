import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CookieSettings from './CookieSettings';

describe('CookieSettings', () => {
  beforeEach(() => {
    localStorage.clear();
    // Mock window.alert
    vi.stubGlobal('alert', vi.fn());
  });

  it('renders all categories', () => {
    render(<CookieSettings />);
    expect(screen.getByText('Strictly Necessary')).toBeDefined();
    expect(screen.getByText('Functional Cookies')).toBeDefined();
    expect(screen.getByText('Analytics Cookies')).toBeDefined();
  });

  it('toggles functional and analytics cookies', () => {
    render(<CookieSettings />);
    
    const functionalToggle = screen.getByLabelText('Toggle Functional Cookies');
    const analyticsToggle = screen.getByLabelText('Toggle Analytics Cookies');
    
    // Toggle functional
    fireEvent.click(functionalToggle);
    expect(functionalToggle.className).toContain('active');
    
    // Toggle analytics
    fireEvent.click(analyticsToggle);
    expect(analyticsToggle.className).toContain('active');
    
    // Toggle off
    fireEvent.click(functionalToggle);
    expect(functionalToggle.className).not.toContain('active');
  });

  it('saves preferences to localStorage', () => {
    render(<CookieSettings />);
    
    const functionalToggle = screen.getByLabelText('Toggle Functional Cookies');
    fireEvent.click(functionalToggle);
    
    const saveBtn = screen.getByText('Save Preferences');
    fireEvent.click(saveBtn);
    
    const saved = JSON.parse(localStorage.getItem('cookie-consent') || '{}');
    expect(saved.functional).toBe(true);
    expect(saved.analytics).toBe(false);
    expect(window.alert).toHaveBeenCalledWith('Settings saved successfully!');
  });
});
