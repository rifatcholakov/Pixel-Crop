import { useState, useEffect } from 'react';
import styles from './CookieSettings.module.css';

type CookieConsent = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
};

export default function CookieSettings() {
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('cookie-consent');
    if (saved) {
      setConsent(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    alert('Settings saved successfully!');
  };

  const toggle = (key: keyof CookieConsent) => {
    if (key === 'necessary') return; // Cannot toggle necessary
    setConsent(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.settingsWrapper}>
      <div className={styles.header}>
        <h1>Cookie Preference Center</h1>
        <p>Manage how we use cookies to improve your experience.</p>
      </div>

      <div className={styles.categories}>
        <div className={styles.category}>
          <div className={styles.categoryInfo}>
            <h3>Strictly Necessary</h3>
            <p>These cookies are essential for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as setting your privacy preferences or theme.</p>
          </div>
          <div className={styles.toggleWrapper}>
            <span className={styles.alwaysOn}>Always On</span>
          </div>
        </div>

        <div className={styles.category}>
          <div className={styles.categoryInfo}>
            <h3>Functional Cookies</h3>
            <p>These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.</p>
          </div>
          <div className={styles.toggleWrapper}>
            <button 
              className={`${styles.toggle} ${consent.functional ? styles.active : ''}`}
              onClick={() => toggle('functional')}
              aria-label="Toggle Functional Cookies"
            >
              <div className={styles.slider} />
            </button>
          </div>
        </div>

        <div className={styles.category}>
          <div className={styles.categoryInfo}>
            <h3>Analytics Cookies</h3>
            <p>These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.</p>
          </div>
          <div className={styles.toggleWrapper}>
            <button 
              className={`${styles.toggle} ${consent.analytics ? styles.active : ''}`}
              onClick={() => toggle('analytics')}
              aria-label="Toggle Analytics Cookies"
            >
              <div className={styles.slider} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <button onClick={handleSave} className={styles.saveButton}>
          Save Preferences
        </button>
      </div>
    </div>
  );
}
