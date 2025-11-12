import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useRef, useEffect } from 'react';
import { FaGraduationCap } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isActiveRoute = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      setProfileDropdownOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50 border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-extrabold text-primary tracking-wide hover:scale-105 transition-transform duration-200"
        >
          <div className="p-2 bg-primary/10 rounded-lg">
            <FaGraduationCap className="text-2xl text-primary" />
          </div>
          Learning Platform
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-6 text-[15px] font-medium">
          <li>
            <Link
              to="/"
              className={`${
                isActiveRoute('/') ? 'text-primary font-semibold border-b-2 border-primary' : 'hover:text-primary'
              } transition-colors duration-200`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/courses"
              className={`${
                isActiveRoute('/courses')
                  ? 'text-primary font-semibold border-b-2 border-primary'
                  : 'hover:text-primary'
              } transition-colors duration-200`}
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`${
                isActiveRoute('/about')
                  ? 'text-primary font-semibold border-b-2 border-primary'
                  : 'hover:text-primary'
              } transition-colors duration-200`}
            >
              About
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link
                  to="/add-course"
                  className={`${
                    isActiveRoute('/add-course')
                      ? 'text-primary font-semibold border-b-2 border-primary'
                      : 'hover:text-primary'
                  } transition-colors duration-200`}
                >
                  Add Course
                </Link>
              </li>
              <li>
                <Link
                  to="/my-courses"
                  className={`${
                    isActiveRoute('/my-courses')
                      ? 'text-primary font-semibold border-b-2 border-primary'
                      : 'hover:text-primary'
                  } transition-colors duration-200`}
                >
                  My Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/my-enrolled-courses"
                  className={`${
                    isActiveRoute('/my-enrolled-courses')
                      ? 'text-primary font-semibold border-b-2 border-primary'
                      : 'hover:text-primary'
                  } transition-colors duration-200`}
                >
                  Enrolled
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Right Side Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
          {user ? (
            <div className="flex items-center gap-2 relative" ref={dropdownRef}>
              <div 
                className="avatar cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary ring-offset-2">
                  <img 
                    src={user.photoURL || `https://via.placeholder.com/36x36/3B82F6/FFFFFF?text=${user.displayName?.charAt(0) || 'U'}`} 
                    alt={user.displayName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-sm font-medium">{user.displayName}</span>
              
              {profileDropdownOpen && (
                <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg border border-gray-200 py-2 w-48 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-sm text-white bg-blue-600 px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition-all hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm rounded-lg text-white py-2 px-3 bg-blue-600 rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-base-100 border-t shadow-md">
          <ul className="flex flex-col space-y-2 py-3 px-4">
            {/* Mobile Theme Toggle */}
            <li>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 w-full py-2 px-3 rounded hover:bg-gray-200"
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
                <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </li>
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 rounded ${
                  isActiveRoute('/') ? 'bg-primary text-white' : 'hover:bg-gray-200'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className={`block py-2 px-3 rounded ${
                  isActiveRoute('/courses') ? 'bg-primary text-white' : 'hover:bg-gray-200'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block py-2 px-3 rounded ${
                  isActiveRoute('/about') ? 'bg-primary text-white' : 'hover:bg-gray-200'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary">
                      <img 
                        src={user.photoURL || `https://via.placeholder.com/32x32/3B82F6/FFFFFF?text=${user.displayName?.charAt(0) || 'U'}`} 
                        alt={user.displayName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{user.displayName}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className={`block py-2 px-3 rounded ${
                      isActiveRoute('/dashboard') ? 'bg-primary text-white' : 'hover:bg-gray-200'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-course"
                    className={`block py-2 px-3 rounded ${
                      isActiveRoute('/add-course') ? 'bg-primary text-white' : 'hover:bg-gray-200'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Add Course
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-courses"
                    className={`block py-2 px-3 rounded ${
                      isActiveRoute('/my-courses') ? 'bg-primary text-white' : 'hover:bg-gray-200'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    My Courses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-enrolled-courses"
                    className={`block py-2 px-3 rounded ${
                      isActiveRoute('/my-enrolled-courses') ? 'bg-primary text-white' : 'hover:bg-gray-200'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Enrolled
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-white bg-red-500 p-2 text-left py-2 px-3 rounded hover:bg-red-600 text-red-100"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block text-white bg-blue-600 p-2 py-2 px-3 rounded hover:bg-blue-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block py-2 px-3 text-white bg-blue-600 p-2 py-2 px-3 rounded hover:bg-blue-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
