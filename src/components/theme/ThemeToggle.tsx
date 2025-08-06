import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
      <span className="absolute inset-0 flex items-center justify-center">
        {theme === 'light' ? '☀️' : '🌙'}
      </span>
    </button>
  );
};

export default ThemeToggle;