import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = window.localStorage?.getItem('portfolio-theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#0a0e1a';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#f8f9fa';
    }
    try {
      window.localStorage?.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    } catch (e) {
      /* storage unavailable, ignore */
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
