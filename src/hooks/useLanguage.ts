import { useState, useEffect } from 'react';
import { translations, Language } from '../data/translations';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem('language') as Language) || 'en'
  );

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'ar' : 'en'));
  };

  return { language, toggleLanguage, t: translations[language] };
};
