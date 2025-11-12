import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth state
  const location = useLocation();

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <div className="navbar bg-base-100 shadow-lg fixed top-0 z-50 w-full">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"></path>
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/" className={isActiveRoute('/') ? 'text-primary underline' : ''}>Home</Link></li>
            <li><Link to="/courses" className={isActiveRoute('/courses') ? 'text-primary underline' : ''}>Courses</Link></li>
            {isLoggedIn && (
              <li>
                <details>
                  <summary className={location.pathname.startsWith('/dashboard') ? 'text-primary' : ''}>Dashboard</summary>
                  <ul className="p-2">
                    <li><Link to="/dashboard">Overview</Link></li>
                    <li><Link to="/dashboard/courses">My Courses</Link></li>
                    <li><Link to="/dashboard/progress">Progress</Link></li>
                    <li><Link to="/dashboard/profile">Profile</Link></li>
                  </ul>
                </details>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="text-xl font-bold text-primary">LearnVerse</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/" className={isActiveRoute('/') ? 'text-primary underline' : ''}>Home</Link></li>
          <li><Link to="/courses" className={isActiveRoute('/courses') ? 'text-primary underline' : ''}>Courses</Link></li>
          {isLoggedIn && (
            <li>
              <details>
                <summary className={location.pathname.startsWith('/dashboard') ? 'text-primary' : ''}>Dashboard</summary>
                <ul className="p-2">
                  <li><Link to="/dashboard">Overview</Link></li>
                  <li><Link to="/dashboard/courses">My Courses</Link></li>
                  <li><Link to="/dashboard/progress">Progress</Link></li>
                  <li><Link to="/dashboard/profile">Profile</Link></li>
                </ul>
              </details>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {isLoggedIn ? (
          <button onClick={() => setIsLoggedIn(false)} className="btn btn-outline btn-error">
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;