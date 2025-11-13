import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";
import {
  FaGraduationCap,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaUser,
  FaImage,
} from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();
  const { isDark } = useTheme(); // Dark mode

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const minLength = password.length >= 6;
    return hasUppercase && hasLowercase && minLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must have 1 uppercase, 1 lowercase, and minimum 6 characters"
      );
      return;
    }
    setLoading(true);
    try {
      await register(formData.email, formData.password, formData.name);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 mt-7 transition-colors duration-300 ${
        isDark
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 text-gray-900"
      }`}
    >
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mt-8 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <FaGraduationCap className="text-2xl text-white" />
          </div>
          <h1
            className={`text-2xl font-bold transition-colors duration-300 ${
              isDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Join Learning Platform
          </h1>
          <p
            className={`mt-2 transition-colors duration-300 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Create your account to start learning
          </p>
        </div>

        {/* Register Card */}
        <div
          className={`backdrop-blur-md rounded-3xl shadow-2xl border p-8 transition-colors duration-300 ${
            isDark
              ? "bg-gray-800 border-gray-700"
              : "bg-white/80 border-white/20"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                className={`text-sm font-semibold flex items-center gap-2 transition-colors duration-300 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <FaUser className="text-purple-600" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:border-transparent placeholder-gray-400 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-purple-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-purple-500"
                }`}
                placeholder="Enter your full name"
                disabled={loading}
                required
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                className={`text-sm font-semibold flex items-center gap-2 transition-colors duration-300 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <FaEnvelope className="text-blue-600" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:border-transparent placeholder-gray-400 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-blue-500"
                }`}
                placeholder="Enter your email"
                disabled={loading}
                required
              />
            </div>

            {/* Photo URL Field */}
            <div className="space-y-2">
              <label
                className={`text-sm font-semibold flex items-center gap-2 transition-colors duration-300 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <FaImage className="text-green-600" />
                Profile Photo URL{" "}
                <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:border-transparent placeholder-gray-400 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-green-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-green-500"
                }`}
                placeholder="https://example.com/photo.jpg"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                className={`text-sm font-semibold flex items-center gap-2 transition-colors duration-300 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <FaLock className="text-red-600" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:border-transparent placeholder-gray-400 pr-12 ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-red-500"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-red-500"
                  }`}
                  placeholder="Create a strong password"
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
              <p
                className={`text-xs p-2 rounded-lg transition-colors duration-300 ${
                  isDark ? "bg-gray-700 text-gray-400" : "bg-gray-50 text-gray-500"
                }`}
              >
                💡 Password must contain: 1 uppercase, 1 lowercase, minimum 6
                characters
              </p>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="text-sm" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div
                  className={`w-full border-t transition-colors duration-300 ${
                    isDark ? "border-gray-600" : "border-gray-200"
                  }`}
                ></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className={`px-4 font-medium transition-colors duration-300 ${
                    isDark ? "bg-gray-900 text-gray-400" : "bg-white text-gray-500"
                  }`}
                >
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Register Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner size="text-sm" />
              ) : (
                <>
                  <img
                    src="https://i.ibb.co.com/gF3yw26k/image8-2-removebg-preview.png"
                    alt="Google"
                    className="w-10 h-5"
                  />
                  Continue with Google
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div
            className={`text-center mt-8 pt-6 border-t transition-colors duration-300 ${
              isDark ? "border-gray-700" : "border-gray-100"
            }`}
          >
            <p
              className={`transition-colors duration-300 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
