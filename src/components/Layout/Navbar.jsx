import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
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
            <SignedIn>
              <Link to="/history" className="text-gray-300 hover:text-white transition-colors text-lg font-medium">
                History
              </Link>
            </SignedIn>
          </nav>
          
          {/* Auth Buttons */}
          <div className="flex items-center">
            <SignedOut>
              <Link to="/sign-in" className="flex items-center text-gray-300 hover:text-white transition-colors text-lg font-medium">
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
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

