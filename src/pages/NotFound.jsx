import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

const NotFound = () => {
  usePageTitle('404 - Page Not Found');

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-neutral mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="btn btn-primary px-10 py-3 bg-blue-500 rounded-xl text-white font-bold hover:bg-blue-600 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;