import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = { necessary: true, functional: true, analytics: true };
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const consent = { necessary: true, functional: false, analytics: false };
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setIsVisible(false);
  };

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
          <button onClick={handleRejectAll} className={styles.rejectButton}>
            Reject Non-Essential
          </button>
          <button onClick={handleAcceptAll} className={styles.acceptButton}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
