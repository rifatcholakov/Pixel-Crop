import styles from '../Privacy/Privacy.module.css';

export default function Terms() {
  return (
    <div className={styles.legalContainer}>
      <h1>Terms of Service</h1>
      <p className={styles.lastUpdated}>Last Updated: April 12, 2026</p>
      
      <section>
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using PixelCrop, you agree to be bound by these Terms of Service. 
          If you disagree with any part of the terms, you may not access the service.
        </p>
      </section>

      <section>
        <h2>2. Use License</h2>
        <p>
          PixelCrop is provided as a free tool for personal and commercial use. You are granted a 
          non-exclusive, non-transferable license to use the service for processing images.
        </p>
        <p>
          You may not:
        </p>
        <ul>
          <li>Use the service for any illegal or unauthorized purpose.</li>
          <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
          <li>Remove any copyright or other proprietary notations from the materials.</li>
        </ul>
      </section>

      <section>
        <h2>3. Disclaimer</h2>
        <p>
          The materials on PixelCrop are provided on an 'as is' basis. PixelCrop makes no warranties, 
          expressed or implied, and hereby disclaims and negates all other warranties including, 
          without limitation, implied warranties or conditions of merchantability, fitness for a 
          particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
      </section>

      <section>
        <h2>4. Limitations of Liability</h2>
        <p>
          In no event shall PixelCrop or its suppliers be liable for any damages (including, without 
          limitation, damages for loss of data or profit, or due to business interruption) arising out 
          of the use or inability to use the service.
        </p>
      </section>

      <section>
        <h2>5. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws and 
          you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
        </p>
      </section>
    </div>
  );
}
