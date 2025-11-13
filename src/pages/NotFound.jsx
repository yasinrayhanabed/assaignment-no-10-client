import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

const NotFound = () => {
  usePageTitle('404 - Page Not Found');

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary dark:text-blue-500">404</h1>
        <h2 className="text-2xl font-semibold text-neutral dark:text-gray-200 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="btn bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-xl text-white font-bold px-10 py-3 transition-colors duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
