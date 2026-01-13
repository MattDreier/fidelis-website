import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const logo = `${import.meta.env.BASE_URL}assets/logo-transparent.png`;
const altLogoLight = `${import.meta.env.BASE_URL}assets/alt-logo-light-mode.png`;
const altLogoDark = `${import.meta.env.BASE_URL}assets/alt-logo-dark-mode.png`;
const instagramIcon = `${import.meta.env.BASE_URL}assets/IG.webp`;

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [useAltLogo, setUseAltLogo] = useState(false);
  const { scrollY } = useScroll();

  // Determine which logo to display based on alt toggle and theme
  const currentLogo = useAltLogo
    ? (isDark ? altLogoDark : altLogoLight)
    : logo;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  // Initialize dark mode from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored ? stored === 'true' : prefersDark;

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <button
            onClick={() => setUseAltLogo(!useAltLogo)}
            className="flex items-center z-50 cursor-pointer"
            aria-label="Toggle logo variant"
          >
            <img
              src={currentLogo}
              alt="Fidelis Renewables - Residential Solar & Battery Service"
              className="h-20 w-auto"
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-text-primary-light dark:text-text-primary-dark" />
              ) : (
                <Moon className="w-5 h-5 text-text-primary-light dark:text-text-primary-dark" />
              )}
            </button>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="Follow us on Instagram"
            >
              <img
                src={instagramIcon}
                alt="Instagram"
                className="h-8 w-8 rounded-lg brightness-0 dark:brightness-0 dark:invert"
              />
            </a>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center gap-3 z-50">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-text-primary-light dark:text-text-primary-dark" />
              ) : (
                <Moon className="w-5 h-5 text-text-primary-light dark:text-text-primary-dark" />
              )}
            </button>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="Follow us on Instagram"
            >
              <img
                src={instagramIcon}
                alt="Instagram"
                className="h-7 w-7 rounded-lg brightness-0 dark:brightness-0 dark:invert"
              />
            </a>
          </div>
        </div>
      </div>

    </motion.header>
  );
};

export default Header;
