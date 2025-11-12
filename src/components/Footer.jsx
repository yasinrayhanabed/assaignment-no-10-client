import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-base-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-xl font-bold text-primary">LearnVerse</Link>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <FaFacebook className="text-2xl hover:text-primary transition-colors cursor-pointer" />
            <FaInstagram className="text-2xl hover:text-primary transition-colors cursor-pointer" />
            <FaLinkedin className="text-2xl hover:text-primary transition-colors cursor-pointer" />
            <FaTwitter className="text-2xl hover:text-primary transition-colors cursor-pointer" />
          </div>
          
          <div>
            <p>&copy; {currentYear} LearnVerse</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;