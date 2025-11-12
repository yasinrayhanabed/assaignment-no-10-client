import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16 px-4">
      <div className="card w-full max-w-md bg-white shadow-2xl rounded-2xl border border-gray-200">
        <div className="card-body p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-6">
            Login to access your courses and dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full focus:border-[#3B82F6] focus:ring focus:ring-[#3B82F6]/30 transition-all duration-200"
                disabled={loading}
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full focus:border-[#3B82F6] focus:ring focus:ring-[#3B82F6]/30 transition-all duration-200"
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              className="btn bg-[#3B82F6] hover:bg-[#2563EB] text-white w-full py-3 rounded-lg text-lg font-semibold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? <LoadingSpinner size="text-lg" /> : 'Login'}
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full py-3 rounded-lg text-lg font-semibold mt-2 text-gray-700 hover:text-white hover:bg-[#F59E0B] border-gray-300 hover:border-[#F59E0B] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? <LoadingSpinner size="text-lg" /> : 'Login with Google'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#3B82F6] hover:underline font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
