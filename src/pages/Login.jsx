import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaGraduationCap, FaEye, FaEyeSlash, FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme(); // Dark mode context
  
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
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 mt-12 transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900'}`}>
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <FaGraduationCap className="text-2xl text-white" />
          </div>
          <h1 className={`${isDark ? 'text-gray-100' : 'text-gray-900'} text-2xl font-bold`}>Learning Platform</h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Welcome back! Please sign in to continue</p>
        </div>

        {/* Login Card */}
        <div className={`rounded-3xl shadow-2xl border p-8 transition-colors duration-300 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-md border-white/20'}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className={`text-sm font-semibold flex items-center gap-2 ${isDark ? 'text-gray-100' : 'text-gray-700'}`}>
                <FaEnvelope className="text-blue-600" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400 ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                placeholder="Enter your email"
                disabled={loading}
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className={`text-sm font-semibold flex items-center gap-2 ${isDark ? 'text-gray-100' : 'text-gray-700'}`}>
                <FaLock className="text-blue-600" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400 pr-12 ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                  placeholder="Enter your password"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="text-sm" /> Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`${isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'} px-4 font-medium`}>
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className={`w-full border-2 rounded-xl py-3 px-6 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-gray-100 hover:border-gray-500'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner size="text-sm" />
              ) : (
                <>
                  <img src="https://i.ibb.co.com/gF3yw26k/image8-2-removebg-preview.png" alt="Google" className="w-10 h-5" />
                  Continue with Google
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className={`text-center mt-8 pt-6 border-t transition-colors duration-300 ${isDark ? 'border-gray-700 text-gray-400' : 'border-gray-100 text-gray-600'}`}>
            <p>
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
