import React, { useState } from 'react';
import './Navbar.css';

interface NavbarProps {
  theme: 'light' | 'dark' | 'winter';
  toggleTheme: () => void;
  language: 'en' | 'ar';
  toggleLanguage: () => void;
  t: {
    home: string;
    about: string;
    education: string;
    services: string;
    skills: string;
    projects: string;
    contact: string;
  };
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, language, toggleLanguage, t }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#home" className="logo" onClick={closeMenu}>
          {language === 'ar' ? '<محمد/>' : '<Mohamed/>'}
        </a>

        <div className="nav-controls mobile-only">
             <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle Theme">
              {theme === 'light' ? '🌙' : theme === 'dark' ? '❄️' : '☀️'}
            </button>
            <button onClick={toggleLanguage} className="lang-btn" aria-label="Toggle Language">
              {language === 'en' ? 'AR' : 'EN'}
            </button>
             <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
               {isOpen ? '✕' : '☰'}
            </button>
        </div>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <a href="#home" className="nav-link" onClick={closeMenu}>{t.home}</a>
          <a href="#about" className="nav-link" onClick={closeMenu}>{t.about}</a>
          <a href="#education" className="nav-link" onClick={closeMenu}>{t.education}</a>
          <a href="#services" className="nav-link" onClick={closeMenu}>{t.services}</a>
          <a href="#skills" className="nav-link" onClick={closeMenu}>{t.skills}</a>
          <a href="#projects" className="nav-link" onClick={closeMenu}>{t.projects}</a>
          <a href="#contact" className="nav-link" onClick={closeMenu}>{t.contact}</a>
          
          <div className="nav-controls desktop-only">
            <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle Theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button onClick={toggleLanguage} className="lang-btn" aria-label="Toggle Language">
              {language === 'en' ? 'AR' : 'EN'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
