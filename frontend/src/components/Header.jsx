import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup-section');
    if (signupSection) {
      signupSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
    >
      {/* Glowing header background */}
      <div className="absolute inset-x-0 top-0 h-20 bg-navy-900/80 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-400/5 to-blue-500/10" />
        {/* Animated border effect */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center space-x-2"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="font-display text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                IGES AI
              </span>
            </motion.div>
          </Link>

          {/* Center Social Icons */}
          <div className="hidden md:flex items-center space-x-16">
            {/* Discord */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative group w-8"
            >
              <img 
                src="/discord-logo.svg" 
                alt="Discord"
                className="w-6 h-6 opacity-50 group-hover:opacity-75 transition-opacity mx-auto"
              />
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] text-blue-300/70 whitespace-nowrap bg-navy-900/80 px-1.5 py-0.5 rounded">
                Coming Soon
              </span>
            </motion.div>

            {/* Telegram */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative group w-8"
            >
              <img 
                src="/telegram-logo.svg" 
                alt="Telegram"
                className="w-6 h-6 opacity-50 group-hover:opacity-75 transition-opacity mx-auto"
              />
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] text-blue-300/70 whitespace-nowrap bg-navy-900/80 px-1.5 py-0.5 rounded">
                Coming Soon
              </span>
            </motion.div>

            {/* X (Twitter) */}
            <motion.a
              href="https://twitter.com/igesai"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-8 flex justify-center"
            >
              <img 
                src="/x-logo.svg" 
                alt="X (Twitter)"
                className="w-5 h-5 opacity-50 hover:opacity-75 transition-opacity"
              />
            </motion.a>

            {/* GitHub */}
            <motion.a
              href="https://github.com/IgesAI"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-8 flex justify-center"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 opacity-50 hover:opacity-75 transition-opacity fill-current text-white"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </motion.a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/features"
              className="font-sans px-4 py-2 rounded-lg text-blue-100 hover:text-blue-400 transition-colors relative group"
            >
              <span className="relative z-10">Features</span>
              <motion.div
                className="absolute inset-0 bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                layoutId="nav-hover-features"
              />
            </Link>
            <Link
              to="/technology"
              className="font-sans px-4 py-2 rounded-lg text-blue-100 hover:text-blue-400 transition-colors relative group"
            >
              <span className="relative z-10">Technology</span>
              <motion.div
                className="absolute inset-0 bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                layoutId="nav-hover-technology"
              />
            </Link>
            <Link
              to="/roadmap"
              className="font-sans px-4 py-2 rounded-lg text-blue-100 hover:text-blue-400 transition-colors relative group"
            >
              <span className="relative z-10">Roadmap</span>
              <motion.div
                className="absolute inset-0 bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                layoutId="nav-hover-roadmap"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-10 p-2 text-blue-100 hover:text-blue-400 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20
        }}
        transition={{ duration: 0.2 }}
        className={`absolute top-20 inset-x-0 md:hidden bg-navy-800/95 backdrop-blur-lg border-t border-blue-500/20 ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="p-4 space-y-4">
          <Link
            to="/features"
            className="block px-4 py-2 text-blue-100 hover:text-blue-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            to="/technology"
            className="block px-4 py-2 text-blue-100 hover:text-blue-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Technology
          </Link>
          <Link
            to="/roadmap"
            className="block px-4 py-2 text-blue-100 hover:text-blue-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Roadmap
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;