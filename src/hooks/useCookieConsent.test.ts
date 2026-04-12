import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCookieConsent } from './useCookieConsent';

describe('useCookieConsent', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('initializes with default values if nothing is in localStorage', () => {
    const { result } = renderHook(() => useCookieConsent());
    
    expect(result.current.isFirstVisit).toBe(true);
    expect(result.current.consent).toEqual({
      necessary: true,
      functional: false,
      analytics: false,
    });
  });

  it('initializes with values from localStorage if they exist', () => {
    const saved = { necessary: true, functional: true, analytics: false };
    localStorage.setItem('cookie-consent', JSON.stringify(saved));
    
    const { result } = renderHook(() => useCookieConsent());
    
    expect(result.current.isFirstVisit).toBe(false);
    expect(result.current.consent).toEqual(saved);
  });

  it('acceptAll updates all categories to true', () => {
    const { result } = renderHook(() => useCookieConsent());
    
    act(() => {
      result.current.acceptAll();
    });
    
    expect(result.current.consent).toEqual({
      necessary: true,
      functional: true,
      analytics: true,
    });
    expect(localStorage.getItem('cookie-consent')).toContain('"analytics":true');
  });

  it('rejectAll updates non-essential categories to false', () => {
    const saved = { necessary: true, functional: true, analytics: true };
    localStorage.setItem('cookie-consent', JSON.stringify(saved));
    
    const { result } = renderHook(() => useCookieConsent());
    
    act(() => {
      result.current.rejectAll();
    });
    
    expect(result.current.consent).toEqual({
      necessary: true,
      functional: false,
      analytics: false,
    });
  });

  it('toggleCategory flips the value of a specific category', () => {
    const { result } = renderHook(() => useCookieConsent());
    
    act(() => {
      result.current.toggleCategory('functional');
    });
    
    expect(result.current.consent.functional).toBe(true);
    
    act(() => {
      result.current.toggleCategory('functional');
    });
    
    expect(result.current.consent.functional).toBe(false);
  });

  it('toggleCategory does nothing for the necessary category', () => {
    const { result } = renderHook(() => useCookieConsent());
    
    act(() => {
      result.current.toggleCategory('necessary');
    });
    
    expect(result.current.consent.necessary).toBe(true);
  });
});
