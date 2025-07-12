import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isScrolled } = useScrollAnimation();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-ocean-blue/95 backdrop-blur-lg' : 'glass-effect'
      }`}
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
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, '#home')}
              className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={(e) => handleSmoothScroll(e, '#services')}
              className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter"
            >
              Services
            </a>
            <a
              href="#portfolio"
              onClick={(e) => handleSmoothScroll(e, '#portfolio')}
              className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter"
            >
              Portfolio
            </a>
            <a
              href="#about"
              onClick={(e) => handleSmoothScroll(e, '#about')}
              className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter"
            >
              About
            </a>
            <a
              href="#blog"
              onClick={(e) => handleSmoothScroll(e, '#blog')}
              className="text-white hover:text-luxury-gold transition-colors duration-300 font-inter"
            >
              Blog
            </a>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="bg-luxury-gold text-ocean-blue px-6 py-2 rounded-full font-inter font-medium hover:bg-sunset-orange transition-colors duration-300"
            >
              Contact
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
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
              className="md:hidden mt-4 pb-4 space-y-4"
            >
              <a
                href="#home"
                onClick={(e) => handleSmoothScroll(e, '#home')}
                className="block text-white hover:text-luxury-gold transition-colors duration-300 font-inter"
              >
                Home
              </a>
              <a
                href="#services"
                onClick={(e) => handleSmoothScroll(e, '#services')}
                className="block text-white hover:text-luxury-gold transition-colors duration-300 font-inter"
              >
                Services
              </a>
              <a
                href="#portfolio"
                onClick={(e) => handleSmoothScroll(e, '#portfolio')}
                className="block text-white hover:text-luxury-gold transition-colors duration-300 font-inter"
              >
                Portfolio
              </a>
              <a
                href="#about"
                onClick={(e) => handleSmoothScroll(e, '#about')}
                className="block text-white hover:text-luxury-gold transition-colors duration-300 font-inter"
              >
                About
              </a>
              <a
                href="#blog"
                onClick={(e) => handleSmoothScroll(e, '#blog')}
                className="block text-white hover:text-luxury-gold transition-colors duration-300 font-inter"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
