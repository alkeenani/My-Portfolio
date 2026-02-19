import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Education from '../components/Education/Education';
import Services from '../components/Services/Services';
import Skills from '../components/Skills/Skills';
import Projects from '../components/Projects/Projects';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

const Home: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <>
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        language={language} 
        toggleLanguage={toggleLanguage} 
        t={t.nav} 
      />
      <Hero t={t.hero} />
      <main>
        <About t={t.about} />
        <Education t={t.education} />
        <Services t={t.services} />
        <Skills t={t.skills} />
        <Projects t={t.projects} language={language} />
        <Contact t={t.contact} />
      </main>
      <Footer t={t.footer} />
    </>
  );
};

export default Home;
