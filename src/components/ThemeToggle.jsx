import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <FaSun className="w-5 h-5 text-yellow-500" />
      ) : (
        <FaMoon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};

export default ThemeToggle;