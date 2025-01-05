import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Menu, X, Github, Twitter } from 'lucide-react';
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
          <div className="hidden md:flex items-center space-x-6">
            <motion.a
              href="https://github.com/IgesAI/IgesAI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-100 hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Github className="w-7 h-7" />
            </motion.a>
            <motion.a
              href="https://x.com/IgesAI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-100 hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Twitter className="w-7 h-7" />
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
            <div className="w-px h-6 bg-blue-500/30 mx-4" />
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
          <div className="flex justify-center space-x-6 py-4">
            <motion.a
              href="https://github.com/IgesAI/IgesAI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-100 hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://x.com/IgesAI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-100 hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <Twitter className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;