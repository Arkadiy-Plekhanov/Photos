import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import IndustryLazyImage from './IndustryLazyImage';

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1440&q=50&auto=format&cs=srgb',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1440&q=50&auto=format&cs=srgb',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1440&q=50&auto=format&cs=srgb'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      className="hero-section relative h-screen flex items-center justify-center overflow-hidden pt-16 dark:bg-gray-900"
      style={{ minHeight: '100vh' }}
    >
      {/* Background Image Carousel - Stunning Wedding Photography */}
      {heroImages.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: index === currentImageIndex ? 1 : 0,
            scale: index === currentImageIndex ? 1 : 1.1
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <IndustryLazyImage
            src={image}
            alt={`Wedding photography ${index + 1}`}
            className="w-full h-full object-cover parallax-bg"
            priority={true}
            quality={index === 0 ? 60 : 50}
            width={1440}
            height={960}
          />
        </motion.div>
      ))}

      {/* Enhanced Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-blue/40 via-transparent to-ocean-blue/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white dark:text-gray-100 px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mb-6"
        >
          <div className="inline-block bg-luxury-gold/20 backdrop-blur-sm px-6 py-2 rounded-full mb-4">
            <span className="text-luxury-gold font-inter font-semibold">
              ✨ Award-Winning Wedding Photography
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold mb-4 sm:mb-6 leading-tight"
        >
          Capturing{' '}
          <span className="gradient-text block md:inline">Love Stories</span>
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-dancing mt-1 sm:mt-2 text-luxury-gold">
            in Paradise
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base sm:text-lg md:text-xl font-inter mb-6 sm:mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed"
        >
          From intimate beach ceremonies to grand resort celebrations, we create cinematic wedding photography that captures the magic of your special day in Honolulu's most breathtaking locations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#portfolio"
            onClick={(e) => handleSmoothScroll(e, '#portfolio')}
            className="bg-luxury-gold text-ocean-blue px-6 sm:px-8 py-3 sm:py-4 rounded-full font-inter font-semibold hover:bg-sunset-orange transition-all duration-300 hover-scale shadow-2xl text-sm sm:text-base"
          >
            <i className="fas fa-images mr-2"></i>
            View Wedding Gallery
          </a>
          <a
            href="/checkout"
            className="border-2 border-white/80 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-inter font-semibold hover:bg-white hover:text-ocean-blue transition-all duration-300 hover-scale backdrop-blur-sm text-sm sm:text-base"
          >
            <i className="fas fa-calendar-check mr-2"></i>
            Book Your Date
          </a>
        </motion.div>

        {/* Image Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex justify-center gap-2 mt-8"
        >
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-luxury-gold' : 'bg-white/50'
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
      >
        <a
          href="#services"
          onClick={(e) => handleSmoothScroll(e, '#services')}
          className="text-white hover:text-luxury-gold transition-colors duration-300 cursor-pointer"
          aria-label="Scroll to services section"
        >
          <i className="fas fa-chevron-down text-2xl"></i>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;