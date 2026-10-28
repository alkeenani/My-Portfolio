import React, { useEffect, useState } from 'react';
import {
  Home,
  User,
  GraduationCap,
  Briefcase,
  Code2,
  FolderKanban,
  Mail,
  Sun,
  Moon,
  Snowflake,
  Languages,
} from 'lucide-react';
import './NavDock.css';

interface NavDockProps {
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

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const NavDock: React.FC<NavDockProps> = ({
  theme,
  toggleTheme,
  language,
  toggleLanguage,
  t,
}) => {
  const [activeSection, setActiveSection] = useState<string>('home');

  const navItems: NavItem[] = [
    { id: 'home', label: t.home, icon: <Home size={19} strokeWidth={2} /> },
    { id: 'about', label: t.about, icon: <User size={19} strokeWidth={2} /> },
    { id: 'education', label: t.education, icon: <GraduationCap size={19} strokeWidth={2} /> },
    { id: 'services', label: t.services, icon: <Briefcase size={19} strokeWidth={2} /> },
    { id: 'skills', label: t.skills, icon: <Code2 size={19} strokeWidth={2} /> },
    { id: 'projects', label: t.projects, icon: <FolderKanban size={19} strokeWidth={2} /> },
    { id: 'contact', label: t.contact, icon: <Mail size={19} strokeWidth={2} /> },
  ];

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the entry that has the highest intersection ratio and isIntersecting
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        setActiveSection(visible[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0.1, 0.3, 0.6],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const getThemeIcon = () => {
    if (theme === 'light') return <Sun size={18} strokeWidth={2} />;
    if (theme === 'dark') return <Moon size={18} strokeWidth={2} />;
    return <Snowflake size={18} strokeWidth={2} />;
  };

  const getThemeAriaLabel = () => {
    if (theme === 'light') return 'Theme: Light. Click for Dark.';
    if (theme === 'dark') return 'Theme: Dark. Click for Winter.';
    return 'Theme: Winter. Click for Light.';
  };

  return (
    <nav className="nav-dock" aria-label="Quick Navigation">
      <div className="nav-dock-inner">
        {/* Navigation Items */}
        <div className="nav-dock-list" role="menubar" aria-orientation="vertical">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`nav-dock-item ${isActive ? 'active' : ''}`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                role="menuitem"
                tabIndex={0}
              >
                <span className="nav-dock-icon">{item.icon}</span>
                {isActive && <span className="nav-dock-indicator" aria-hidden="true" />}
                <span className="nav-dock-tooltip" role="tooltip">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="nav-dock-divider" aria-hidden="true" />

        {/* Controls: Theme & Language */}
        <div className="nav-dock-controls">
          <button
            type="button"
            onClick={toggleTheme}
            className="nav-dock-control-btn theme-btn"
            aria-label={getThemeAriaLabel()}
            title={getThemeAriaLabel()}
          >
            <span className="nav-dock-icon">{getThemeIcon()}</span>
            <span className="nav-dock-tooltip" role="tooltip">
              {theme === 'light' ? 'Dark Mode' : theme === 'dark' ? 'Winter Mode' : 'Light Mode'}
            </span>
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            className="nav-dock-control-btn lang-btn"
            aria-label={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
            title={language === 'en' ? 'العربية' : 'English'}
          >
            <span className="lang-label">{language === 'en' ? 'AR' : 'EN'}</span>
            <span className="nav-dock-tooltip" role="tooltip">
              {language === 'en' ? 'العربية' : 'English'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavDock;

