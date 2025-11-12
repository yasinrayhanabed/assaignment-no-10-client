import { useAuth } from '../contexts/AuthContext';
import { usePageTitle } from '../hooks/usePageTitle';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  usePageTitle('Dashboard');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.displayName}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* My Courses Card */}
          <Link 
            to="/my-courses" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">My Courses</h3>
                <p className="text-gray-600 text-sm">Manage courses you've created</p>
              </div>
              <div className="text-blue-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Enrolled Courses Card */}
          <Link 
            to="/my-enrolled-courses" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Enrolled Courses</h3>
                <p className="text-gray-600 text-sm">Continue your learning journey</p>
              </div>
              <div className="text-green-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Add Course Card */}
          <Link 
            to="/add-course" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Add New Course</h3>
                <p className="text-gray-600 text-sm">Create and share knowledge</p>
              </div>
              <div className="text-purple-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Profile Card */}
          <Link 
            to="/profile" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-orange-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">My Profile</h3>
                <p className="text-gray-600 text-sm">Update your information</p>
              </div>
              <div className="text-orange-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </Link>

          {/* All Courses Card */}
          <Link 
            to="/courses" 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-red-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Browse Courses</h3>
                <p className="text-gray-600 text-sm">Explore available courses</p>
              </div>
              <div className="text-red-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;