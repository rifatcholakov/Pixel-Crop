import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CookieBanner.module.css';
import { useCookieConsent } from '@/hooks/useCookieConsent';

export default function CookieBanner() {
  const { isFirstVisit, acceptAll, rejectAll } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isFirstVisit) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isFirstVisit]);

  if (!isVisible) return null;

  return (
    <div className={styles.bannerWrapper}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <div className={styles.icon}>🍪</div>
          <div className={styles.text}>
            <h3>Browser Preferences</h3>
            <p>
              We use cookies to enhance your experience and analyze our traffic. 
              Choose your preferences or accept all to continue.
            </p>
          </div>
        </div>
        
        <div className={styles.actions}>
          <Link to="/cookie-settings" className={styles.settingsLink} onClick={() => setIsVisible(false)}>
            Settings
          </Link>
          <button onClick={() => { rejectAll(); setIsVisible(false); }} className={styles.rejectButton}>
            Reject Non-Essential
          </button>
          <button onClick={() => { acceptAll(); setIsVisible(false); }} className={styles.acceptButton}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
