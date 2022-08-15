import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import MoonIcon from './icons/svg/moon-icon';
import SunIcon from './icons/svg/sun-icon';

export default function ThemeChanger({ className }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // when mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const setThemeHandler = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <button onClick={setThemeHandler} className={className}>
        {theme === 'light' && <MoonIcon />}
        {theme === 'dark' && <SunIcon />}
      </button>
    </>
  );
}
