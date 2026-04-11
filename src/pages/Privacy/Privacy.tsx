import styles from './Privacy.module.css';

export default function Privacy() {
  return (
    <div className={styles.legalContainer}>
      <h1>Privacy Policy</h1>
      <p className={styles.lastUpdated}>Last Updated: April 12, 2026</p>
      
      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to PixelCrop. We respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you about how we look after your personal data when you visit our 
          website and tell you about your privacy rights and how the law protects you.
        </p>
      </section>

      <section>
        <h2>2. The Data We Collect</h2>
        <p>
          PixelCrop is a client-side tool. This means that your images are processed entirely within your browser. 
          We do not upload, store, or transmit your images to any servers. 
        </p>
        <p>
          However, we may collect technical data such as IP addresses, browser types, and usage patterns 
          through cookies to improve our service, provided you have given us consent.
        </p>
      </section>

      <section>
        <h2>3. How We Use Your Data</h2>
        <p>
          We use your data only for the following purposes:
        </p>
        <ul>
          <li>To provide and maintain our service.</li>
          <li>To monitor the usage of our service and improve performance.</li>
          <li>To remember your preferences (such as theme and cookie settings).</li>
        </ul>
      </section>

      <section>
        <h2>4. Cookie Policy</h2>
        <p>
          We use cookies to distinguish you from other users of our website. This helps us to provide you 
          with a good experience when you browse our website and also allows us to improve our site.
        </p>
      </section>

      <section>
        <h2>5. Your Rights</h2>
        <p>
          Under certain circumstances, you have rights under data protection laws in relation to your personal data, 
          including the right to request access, correction, erasure, or restriction of processing.
        </p>
      </section>

      <section>
        <h2>6. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy or our privacy practices, please contact us at 
          privacy@pixelcrop.studio.
        </p>
      </section>
    </div>
  );
}
