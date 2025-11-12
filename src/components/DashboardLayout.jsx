import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActiveRoute = (path) => location.pathname === path;

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
  };

  return (
    <div className="flex h-screen pt-16">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-neutral text-base-100 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out pt-16 lg:pt-0`}>
        <div className="flex flex-col h-full">
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link 
              to="/dashboard/enrolled" 
              className={`block px-4 py-2 rounded hover:bg-neutral-focus ${isActiveRoute('/dashboard/enrolled') ? 'bg-neutral-focus' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              My Enrolled Courses
            </Link>
            <Link 
              to="/dashboard/add-course" 
              className={`block px-4 py-2 rounded hover:bg-neutral-focus ${isActiveRoute('/dashboard/add-course') ? 'bg-neutral-focus' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              Add Course
            </Link>
            <Link 
              to="/dashboard/my-courses" 
              className={`block px-4 py-2 rounded hover:bg-neutral-focus ${isActiveRoute('/dashboard/my-courses') ? 'bg-neutral-focus' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              My Added Courses
            </Link>
          </nav>
          <div className="p-4">
            <button 
              onClick={handleLogout}
              className="w-full btn btn-outline btn-error"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile menu button */}
        <div className="lg:hidden p-4">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="btn btn-ghost"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;