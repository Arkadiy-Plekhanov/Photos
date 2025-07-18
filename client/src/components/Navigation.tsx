import { useState, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Link, useLocation } from 'wouter';

interface NavigationProps {
  variant?: 'default' | 'dark';
}

const Navigation: React.FC<NavigationProps> = ({ variant = 'default' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { isScrolled } = useScrollAnimation();
  const [location] = useLocation();
  const isHomePage = location === '/';

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  // Determine header background and text color based on variant and scroll
  const headerClass =
    variant === 'dark'
      ? 'bg-ocean-blue text-white'
      : isScrolled
      ? 'bg-ocean-blue/95 backdrop-blur-lg text-white'
      : 'glass-effect text-ocean-blue';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <i className="fas fa-camera text-2xl text-luxury-gold"></i>
            <span className={`text-2xl font-playfair font-bold ${variant === 'dark' ? 'text-white' : 'text-ocean-blue'}`}>
              Arcadia Photography
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center space-x-8"
          >
            <Link href="/" className={`${variant === 'dark' ? 'text-white' : 'text-ocean-blue'} hover:text-luxury-gold transition-colors duration-300 font-inter`}>
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className={`${variant === 'dark' ? 'text-white' : 'text-ocean-blue'} hover:text-luxury-gold transition-colors duration-300 font-inter flex items-center`}
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                Services
                <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link href="/weddings" className="block px-4 py-3 text-charcoal hover:bg-ocean-blue hover:text-white transition-colors">
                      <i className="fas fa-heart mr-2"></i>
                      Wedding & Elopement
                    </Link>
                    <Link href="/real-estate" className="block px-4 py-3 text-charcoal hover:bg-ocean-blue hover:text-white transition-colors">
                      <i className="fas fa-home mr-2"></i>
                      Real Estate Photography
                    </Link>
                    <Link href="/family-portraits" className="block px-4 py-3 text-charcoal hover:bg-ocean-blue hover:text-white transition-colors">
                      <i className="fas fa-users mr-2"></i>
                      Family & Portraits
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a
              href="#portfolio"
              onClick={(e) => handleSmoothScroll(e, '#portfolio')}
              className={`${variant === 'dark' ? 'text-white' : 'text-ocean-blue'} hover:text-luxury-gold transition-colors duration-300 font-inter`}
            >
              Portfolio
            </a>
            <a
              href="#about"
              onClick={(e) => handleSmoothScroll(e, '#about')}
              className={`${variant === 'dark' ? 'text-white' : 'text-ocean-blue'} hover:text-luxury-gold transition-colors duration-300 font-inter`}
            >
              About
            </a>
            <a
              href="#blog"
              onClick={(e) => handleSmoothScroll(e, '#blog')}
              className={`${variant === 'dark' ? 'text-white' : 'text-ocean-blue'} hover:text-luxury-gold transition-colors duration-300 font-inter`}
            >
              Blog
            </Link>

            {isHomePage ? (
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                className="bg-luxury-gold text-ocean-blue px-6 py-2 rounded-full font-inter font-medium hover:bg-sunset-orange transition-colors duration-300"
              >
                Contact
              </a>
            ) : (
              <Link href="/contact" className="bg-luxury-gold text-ocean-blue px-6 py-2 rounded-full font-inter font-medium hover:bg-sunset-orange transition-colors duration-300">
                Contact
              </Link>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${variant === 'dark' ? 'text-white' : 'text-ocean-blue'} text-2xl p-2 hover:text-luxury-gold transition-colors`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden mt-4 pb-4 space-y-4 ${variant === 'dark' ? 'bg-ocean-blue' : 'bg-white'} rounded-lg shadow-xl`}
            >
              <a
                href="#home"
                onClick={(e) => handleSmoothScroll(e, '#home')}
                className={`block ${variant === 'dark' ? 'text-white' : 'text-ocean-blue'} hover:text-luxury-gold transition-colors duration-300 font-inter`}
              >
                Home
              </Link>
              <div className="space-y-2">
                <p className={`${variant === 'dark' ? 'text-white/70' : 'text-ocean-blue/70'} text-sm font-inter`}>Services</p>
                <Link href="/wedding-photography" className={`block ${variant === 'dark' ? 'text-white' : 'text-ocean-blue'} hover:text-luxury-gold transition-colors duration-300 font-inter pl-4`}>
                  Wedding & Elopement
                </Link>
                <Link href="/real-estate-photography" className={`block ${variant === 'dark' ? 'text-white' : 'text-ocean-blue'} hover:text-luxury-gold transition-colors duration-300 font-inter pl-4`}>
                  Real Estate Photography
                </Link>
                <Link href="/family-photography" className={`block ${variant === 'dark' ? 'text-white' : 'text-ocean-blue'} hover:text-luxury-gold transition-colors duration-300 font-inter pl-4`}>
                  Family & Portraits
                </Link>
              </div>
              <a
                href="#portfolio"
                onClick={(e) => handleSmoothScroll(e, '#portfolio')}
                className={`block ${variant === 'dark' ? 'text-white' : 'text-ocean-blue'} hover:text-luxury-gold transition-colors duration-300 font-inter`}
              >
                Portfolio
              </a>
              <a
                href="#about"
                onClick={(e) => handleSmoothScroll(e, '#about')}
                className={`block ${variant === 'dark' ? 'text-white' : 'text-ocean-blue'} hover:text-luxury-gold transition-colors duration-300 font-inter`}
              >
                About
              </a>
              <a
                href="#blog"
                onClick={(e) => handleSmoothScroll(e, '#blog')}
                className={`block ${variant === 'dark' ? 'text-white' : 'text-ocean-blue'} hover:text-luxury-gold transition-colors duration-300 font-inter`}
              >
                Blog
              </a>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                className="block bg-luxury-gold text-ocean-blue px-6 py-2 rounded-full font-inter font-medium hover:bg-sunset-orange transition-colors duration-300 text-center"
              >
                Contact
              </a>
              {/* Additional Links */}
              <div className="border-t border-white/20 pt-4">
                <Link href="/cookie-policy" className={`block ${variant === 'dark' ? 'text-white' : 'text-ocean-blue'} hover:text-luxury-gold transition-colors duration-300 font-inter`}>
                  Cookie Policy
                </Link>
                <Link href="/licensing" className={`block ${variant === 'dark' ? 'text-white' : 'text-ocean-blue'} hover:text-luxury-gold transition-colors duration-300 font-inter`}>
                  Licensing
                </Link>
                <Link href="/faq" className={`block ${variant === 'dark' ? 'text-white' : 'text-ocean-blue'} hover:text-luxury-gold transition-colors duration-300 font-inter`}>
                  FAQ
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;