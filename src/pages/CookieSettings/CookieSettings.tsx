import { useState } from 'react';
import styles from './CookieSettings.module.css';
import { useCookieConsent } from '@/hooks/useCookieConsent';

export default function CookieSettings() {
  const { consent, toggleCategory, updateConsent } = useCookieConsent();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    updateConsent(consent);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const toggle = (key: Parameters<typeof toggleCategory>[0]) => {
    toggleCategory(key);
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
        {showSuccess && <div className={styles.successMsg}>Preferences saved successfully! ✨</div>}
        <button onClick={handleSave} className={styles.saveButton}>
          Save Preferences
        </button>
      </div>
    </div>
  );
}
