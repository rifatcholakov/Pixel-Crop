import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.branding}>
          <h3>PixelCrop</h3>
          <p>Professional-grade image cropping, right in your browser.</p>
        </div>
        
        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
          
          <div className={styles.linkGroup}>
            <h4>Cookies</h4>
            <Link to="/cookie-settings">Cookie Settings</Link>
          </div>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <p>&copy; {currentYear} PixelCrop. All rights reserved.</p>
        <p className={styles.tagline}>Crafted with precision.</p>
      </div>
    </footer>
  );
}
