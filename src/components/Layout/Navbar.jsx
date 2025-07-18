import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

function Navbar() {
  return (
    <header className="bg-gray-800 shadow-lg py-5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 w-full">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-white text-2xl font-bold">TOS Analyzer</Link>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-12">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors text-lg font-medium">
              Home
            </Link>
            <Link to="/analyze" className="text-gray-300 hover:text-white transition-colors text-lg font-medium">
              Analyze
            </Link>
            <Link to="/compare" className="text-gray-300 hover:text-white transition-colors text-lg font-medium">
              Compare
            </Link>
            <Link to="/future-predictor" className="text-gray-300 hover:text-white transition-colors text-lg font-medium">
              Future Predictor
            </Link>
            <Link to="/accessibility" className="text-gray-300 hover:text-white transition-colors text-lg font-medium">
              Accessibility
            </Link>
            <Link to="/history" className="text-gray-300 hover:text-white transition-colors text-lg font-medium">
              History
            </Link>
          </nav>
          
          {/* Demo Mode Indicator */}
          <div className="flex items-center">
            <span className="text-gray-400 text-sm">Demo Mode</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

