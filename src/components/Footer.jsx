import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaGraduationCap, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#1E3A8A] via-[#3B82F6] to-[#2563EB] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/20 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <FaGraduationCap className="text-2xl text-white" />
              </div>
              <Link
                to="/"
                className="text-3xl font-extrabold text-white tracking-wide hover:text-blue-200 transition-all duration-300"
              >
                Learning Platform
              </Link>
            </div>
            <p className="text-blue-100 text-lg leading-relaxed mb-6 max-w-md">
              Empowering learners worldwide with quality education. Join thousands of students in their journey to success.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-blue-100">
                <FaEnvelope className="text-blue-300" />
                <span>info@learningplatform.com</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <FaPhone className="text-blue-300" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <FaMapMarkerAlt className="text-blue-300" />
                <span>123 Education St, Learning City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-300"></div>
            </h4>
            <div className="space-y-3">
              <Link to="/" className="block text-blue-100 hover:text-white hover:translate-x-2 transition-all duration-300">
                🏠 Home
              </Link>
              <Link to="/courses" className="block text-blue-100 hover:text-white hover:translate-x-2 transition-all duration-300">
                📚 Courses
              </Link>
              <Link to="/about" className="block text-blue-100 hover:text-white hover:translate-x-2 transition-all duration-300">
                ℹ️ About Us
              </Link>
              <Link to="/add-course" className="block text-blue-100 hover:text-white hover:translate-x-2 transition-all duration-300">
                ➕ Add Course
              </Link>
            </div>
          </div>

          {/* Connect With Us */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 relative">
              Connect With Us
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-300"></div>
            </h4>
            <div className="flex flex-wrap gap-4 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/10 hover:bg-blue-500 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <FaFacebookF className="text-xl text-white group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/10 hover:bg-pink-500 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <FaInstagram className="text-xl text-white group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/10 hover:bg-blue-600 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <FaLinkedinIn className="text-xl text-white group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/10 hover:bg-sky-500 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <FaTwitter className="text-xl text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <h5 className="font-semibold text-white mb-2">Newsletter</h5>
              <p className="text-blue-100 text-sm mb-3">Stay updated with our latest courses</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button className="px-2 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                  ✉️
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-100 text-center md:text-left">
              &copy; {currentYear} <span className="font-bold text-white">Learning Platform</span>. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm text-blue-100">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/support" className="hover:text-white transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;