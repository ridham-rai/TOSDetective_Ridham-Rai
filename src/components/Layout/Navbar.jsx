import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { FiLogIn, FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 shadow-lg py-5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 w-full">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-white text-2xl font-bold tracking-wide">🕵️ TOSDetective</Link>
          
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
            <Link to="/history" className="text-gray-300 hover:text-white transition-colors text-lg font-medium border border-gray-600 px-3 py-1 rounded">
              📊 History
            </Link>
          </nav>
          
          {/* Auth Buttons & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <Link to="/sign-in" className="hidden md:flex items-center text-gray-300 hover:text-white transition-colors text-lg font-medium">
                <FiLogIn className="mr-2" />
                Sign In
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10"
                  }
                }}
              />
            </SignedIn>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/analyze"
                className="text-gray-300 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Analyze
              </Link>
              <Link
                to="/compare"
                className="text-gray-300 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Compare
              </Link>
              <Link
                to="/future-predictor"
                className="text-gray-300 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Future Predictor
              </Link>
              <Link
                to="/accessibility"
                className="text-gray-300 hover:text-white transition-colors text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Accessibility
              </Link>
              <Link
                to="/history"
                className="text-gray-300 hover:text-white transition-colors text-lg font-medium border border-gray-600 px-3 py-1 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                📊 History
              </Link>
              <SignedOut>
                <Link
                  to="/sign-in"
                  className="flex items-center text-gray-300 hover:text-white transition-colors text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiLogIn className="mr-2" />
                  Sign In
                </Link>
              </SignedOut>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;

