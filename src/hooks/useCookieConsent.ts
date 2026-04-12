import { useState, useCallback } from 'react';

export type CookieConsent = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
};

const DEFAULT_CONSENT: CookieConsent = {
  necessary: true,
  functional: false,
  analytics: false,
};

const LOCAL_STORAGE_KEY = 'cookie-consent';

export function useCookieConsent() {
  const [consent, setConsentState] = useState<CookieConsent>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const updateConsent = useCallback((newConsent: CookieConsent) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newConsent));
    setConsentState(newConsent);
  }, []);

  const acceptAll = useCallback(() => {
    updateConsent({ necessary: true, functional: true, analytics: true });
  }, [updateConsent]);

  const rejectAll = useCallback(() => {
    updateConsent({ necessary: true, functional: false, analytics: false });
  }, [updateConsent]);

  const toggleCategory = useCallback((key: keyof CookieConsent) => {
    if (key === 'necessary') return; 
    setConsentState(prev => {
      const next = { ...prev || DEFAULT_CONSENT, [key]: !prev?.[key] };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return {
    consent: consent || DEFAULT_CONSENT,
    isFirstVisit: consent === null,
    acceptAll,
    rejectAll,
    updateConsent,
    toggleCategory,
  };
}
