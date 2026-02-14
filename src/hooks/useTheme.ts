import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'winter';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'winter';
      return 'light';
    });
  };

  return { theme, toggleTheme };
};
