import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Analyze', href: '/analyze' },
    { name: 'Compare', href: '/compare' },
    { name: 'Accessibility', href: '/accessibility' },
    { name: 'History', href: '/history' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-800 shadow-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="h-8 w-8 mr-2"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-full w-full text-blue-600">
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
                <span className="text-xl font-bold text-white">TOS Analyzer</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive(link.href)
                      ? 'border-blue-400 text-white'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Temporarily disabled auth */}
            <div className="text-sm text-gray-400">
              🌙 Dark Mode
            </div>

            <div className="flex items-center sm:hidden ml-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-700 focus:outline-none"
              >
                {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive(link.href)
                    ? 'bg-blue-900/20 border-blue-400 text-blue-300'
                    : 'border-transparent text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {/* Auth temporarily disabled */}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

