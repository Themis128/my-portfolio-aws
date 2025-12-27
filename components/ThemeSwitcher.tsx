import { useTheme } from '../lib/theme-context';
import { useState } from 'react';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="relative inline-flex items-center justify-center w-12 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background hover:shadow-lg hover:scale-105"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        {/* Switch knob */}
        <div
          className={`absolute w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
            theme === 'light' ? 'translate-x-0.5' : 'translate-x-5.5'
          } ${isAnimating ? 'scale-95' : 'scale-100'}`}
        />
        
        {/* Sun icon (light theme) */}
        <div className={`absolute left-1 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
          theme === 'light' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}>
          <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
          </svg>
        </div>

        {/* Moon icon (dark theme) */}
        <div className={`absolute right-1 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
          theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}>
          <svg className="w-3.5 h-3.5 text-indigo-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </div>
      </button>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      </div>
    </div>
  );
}
