import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Link, useLocation } from 'wouter';
import { ROUTES, ROUTE_GROUPS } from '../utils/routes';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { isScrolled } = useScrollAnimation();
  const [location] = useLocation();
  const isHomePage = location === '/';
  const variant = 'light'; // TODO: Remove hardcoded variant

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  // Enhanced header styling with glass effect
  const headerClass = variant === 'dark'
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
            <span className="text-2xl font-playfair font-bold text-white">
              Arcadia Photography
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center space-x-8"
          >
            <Link href="/" className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter">
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter flex items-center"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                Services
                <i className="fas fa-chevron-down ml-1 text-xs transform group-hover:rotate-180 transition-transform duration-300"></i>
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link href={ROUTES.WEDDING.path} className="block px-4 py-2 text-gray-800 hover:bg-luxury-gold hover:text-white transition-colors duration-300">
                      {ROUTES.WEDDING.label}
                    </Link>
                    <Link href={ROUTES.FAMILY.path} className="block px-4 py-2 text-gray-800 hover:bg-luxury-gold hover:text-white transition-colors duration-300">
                      {ROUTES.FAMILY.label}
                    </Link>
                    <Link href={ROUTES.REAL_ESTATE.path} className="block px-4 py-2 text-gray-800 hover:bg-luxury-gold hover:text-white transition-colors duration-300">
                      {ROUTES.REAL_ESTATE.label}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href={ROUTES.PORTFOLIO.path} className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter">
              {ROUTES.PORTFOLIO.label}
            </Link>
            <Link href={ROUTES.ABOUT.path} className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter">
              {ROUTES.ABOUT.label}
            </Link>
            <Link href={ROUTES.BLOG.path} className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter">
              {ROUTES.BLOG.label}
            </Link>

            {isHomePage ? (
              <a 
                href="#contact" 
                onClick={(e) => handleSmoothScroll(e, '#contact')}
                className="bg-luxury-gold text-ocean-blue px-6 py-2 rounded-full hover:bg-white hover:text-ocean-blue transition-all duration-300 font-inter font-medium"
              >
                Contact
              </a>
            ) : (
              <Link href="/#contact" className="bg-luxury-gold text-ocean-blue px-6 py-2 rounded-full hover:bg-white hover:text-ocean-blue transition-all duration-300 font-inter font-medium">
                Contact
              </Link>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
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
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href={ROUTES.WEDDING.path} 
                  className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter pl-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {ROUTES.WEDDING.label}
                </Link>
                <Link 
                  href={ROUTES.FAMILY.path} 
                  className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter pl-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {ROUTES.FAMILY.label}
                </Link>
                <Link 
                  href={ROUTES.REAL_ESTATE.path} 
                  className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter pl-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {ROUTES.REAL_ESTATE.label}
                </Link>
                <Link 
                  href={ROUTES.PORTFOLIO.path} 
                  className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {ROUTES.PORTFOLIO.label}
                </Link>
                <Link 
                  href={ROUTES.ABOUT.path} 
                  className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {ROUTES.ABOUT.label}
                </Link>
                <Link 
                  href={ROUTES.BLOG.path} 
                  className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {ROUTES.BLOG.label}
                </Link>

                {isHomePage ? (
                  <a 
                    href="#contact" 
                    onClick={(e) => handleSmoothScroll(e, '#contact')}
                    className="bg-luxury-gold text-ocean-blue px-6 py-2 rounded-full hover:bg-white hover:text-ocean-blue transition-all duration-300 font-inter font-medium text-center"
                  >
                    Contact
                  </a>
                ) : (
                  <Link 
                    href="/#contact" 
                    className="bg-luxury-gold text-ocean-blue px-6 py-2 rounded-full hover:bg-white hover:text-ocean-blue transition-all duration-300 font-inter font-medium text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;