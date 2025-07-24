// Industry-grade hero section with minimal code footprint
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1440&q=60&auto=format&cs=srgb',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1440&q=50&auto=format&cs=srgb',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=1440&q=50&auto=format&cs=srgb'
];

const OptimizedHeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(new Set([0])); // Track loaded images

  // Smart progressive loading
  useEffect(() => {
    const loadImage = (index: number) => {
      if (loaded.has(index)) return;
      
      const img = new Image();
      img.onload = () => setLoaded(prev => new Set([...Array.from(prev), index]));
      img.src = HERO_IMAGES[index];
    };

    // Load next images progressively
    const timer = setTimeout(() => {
      loadImage(1);
      setTimeout(() => loadImage(2), 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [loaded]);

  // Carousel rotation - only advance to loaded images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % HERO_IMAGES.length;
        return loaded.has(next) ? next : prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [loaded]);

  const handleSmoothScroll = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-16 dark:bg-gray-900">
      {/* Background Images */}
      {HERO_IMAGES.map((src, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === current && loaded.has(i) ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        >
          {loaded.has(i) && (
            <img
              src={src}
              alt={`Wedding photography ${i + 1}`}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          )}
        </motion.div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-blue/40 via-transparent to-ocean-blue/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-block bg-luxury-gold/20 backdrop-blur-sm px-6 py-2 rounded-full mb-4">
            <span className="text-luxury-gold font-semibold">✨ Award-Winning Photography</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-8xl font-playfair font-bold mb-6 leading-tight"
        >
          Capturing{' '}
          <span className="gradient-text block md:inline">Love Stories</span>
          <span className="block text-3xl md:text-5xl xl:text-6xl font-dancing mt-2 text-luxury-gold">
            in Paradise
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl mb-8 opacity-95 max-w-3xl mx-auto"
        >
          From intimate beach ceremonies to grand resort celebrations, we create cinematic wedding photography in Honolulu's most breathtaking locations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#portfolio"
            onClick={(e) => handleSmoothScroll(e, '#portfolio')}
            className="bg-luxury-gold text-ocean-blue px-8 py-4 rounded-full font-semibold hover:bg-sunset-orange transition-all duration-300 shadow-2xl"
          >
            <i className="fas fa-images mr-2"></i>
            View Gallery
          </a>
          <a
            href="/checkout"
            className="border-2 border-white/80 text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-ocean-blue transition-all duration-300 backdrop-blur-sm"
          >
            <i className="fas fa-calendar-check mr-2"></i>
            Book Now
          </a>
        </motion.div>

        {/* Progress Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2"
        >
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => loaded.has(i) && setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === current ? 'bg-luxury-gold' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OptimizedHeroSection;