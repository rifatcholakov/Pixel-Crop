import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styles from './App.module.css';
import { useTheme } from './hooks/useTheme';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Footer from './components/Footer/Footer';
import CookieBanner from './components/CookieBanner/CookieBanner';

// Pages
import Home from './pages/Home/Home';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import CookieSettings from './pages/CookieSettings/CookieSettings';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <div className={styles.appWrapper}>
        <header className={styles.header}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1>PixelCrop</h1>
          </Link>
          <div className={styles.headerActions}>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookie-settings" element={<CookieSettings />} />
        </Routes>

        <Footer />
        <CookieBanner />
      </div>
    </BrowserRouter>
  );
}
