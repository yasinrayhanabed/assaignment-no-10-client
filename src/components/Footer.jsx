import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content pt-10 pb-6 mt-16 border-t border-gray-300">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-2xl font-extrabold text-primary tracking-wide hover:text-primary-focus transition-all duration-200"
            >
              LearnVerse
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Learn, Grow, and Master New Skills Anytime, Anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-lg mb-2 text-gray-700">Quick Links</h4>
            <div className="flex flex-col gap-1">
              <Link to="/" className="hover:text-primary transition-colors duration-200">
                Home
              </Link>
              <Link to="/courses" className="hover:text-primary transition-colors duration-200">
                Courses
              </Link>
              <Link to="/about" className="hover:text-primary transition-colors duration-200">
                About
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end space-x-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white transition-all duration-300"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white transition-all duration-300"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white transition-all duration-300"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white transition-all duration-300"
            >
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm text-gray-500">
          <p>
            &copy; {currentYear} <span className="font-semibold text-primary">LearnVerse</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
