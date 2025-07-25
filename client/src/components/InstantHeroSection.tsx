// Instant-loading hero with progressive enhancement and wow effects
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

const InstantHeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const controls = useAnimation();
  
  const heroImages = [
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=45&auto=format&fm=webp&cs=srgb',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=40&auto=format&fm=webp&cs=srgb',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=40&auto=format&fm=webp&cs=srgb'
  ];

  // Optimal carousel rotation timing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Perfect balance between viewing time and engagement
    return () => clearInterval(interval);
  }, []);

  // Wow effect animations on mount
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  // Progressive image preloading
  useEffect(() => {
    heroImages.forEach((src, index) => {
      if (index > 0) {
        const img = new Image();
        img.src = src;
      }
    });
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5,
        delay: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Instant CSS Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            transitionDuration: '1200ms',
            willChange: 'opacity'
          }}
        />
      ))}

      {/* Beautiful Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-blue/40 via-transparent to-ocean-blue/60" />
      
      {/* Animated Pattern Overlay for Depth */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>

      {/* Hero Content with Wow Effects */}
      <motion.div 
        className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto"
        initial="hidden"
        animate={controls}
        variants={contentVariants}
      >
        {/* Award Badge with Floating Animation */}
        <motion.div 
          variants={childVariants}
          className="mb-6"
          animate={{
            y: [0, -10, 0],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <div className="inline-block bg-luxury-gold/20 backdrop-blur-md px-6 py-2 rounded-full border border-luxury-gold/30">
            <span className="text-luxury-gold font-inter font-semibold text-sm md:text-base">
              ✨ Award-Winning Wedding Photography
            </span>
          </div>
        </motion.div>

        {/* Main Title with Stagger Effect */}
        <motion.h1 
          variants={childVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold mb-4 leading-tight"
        >
          <span className="block">Capturing</span>
          <span className="gradient-text block md:inline text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            Love Stories
          </span>
        </motion.h1>

        {/* Subtitle with Elegant Script */}
        <motion.div
          variants={childVariants}
          className="mb-6"
        >
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-dancing text-luxury-gold animate-glow">
            in Paradise
          </span>
        </motion.div>

        {/* Description with Fade Effect */}
        <motion.p 
          variants={childVariants}
          className="text-lg md:text-xl lg:text-2xl font-inter mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed"
        >
          From intimate beach ceremonies to grand resort celebrations, we create cinematic wedding photography 
          that captures the magic of your special day in Honolulu's most breathtaking locations.
        </motion.p>

        {/* CTA Buttons with Elegant Delayed Appearance */}
        <motion.div 
          variants={buttonVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="/wedding-photography"
            className="group bg-luxury-gold text-ocean-blue px-8 py-4 rounded-full font-inter font-semibold 
                     hover:bg-sunset-orange transition-all duration-500 shadow-2xl text-base md:text-lg
                     relative overflow-hidden backdrop-blur-sm"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <span className="relative z-10">
              <i className="fas fa-images mr-2"></i>
              View Wedding Gallery
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-sunset-orange/20 to-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </motion.a>
          
          <motion.a
            href="/checkout"
            className="group border-2 border-white/80 text-white px-8 py-4 rounded-full font-inter 
                     font-semibold hover:bg-white hover:text-ocean-blue transition-all duration-500 
                     backdrop-blur-sm text-base md:text-lg relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgba(255,255,255,1)",
              boxShadow: "0 0 30px rgba(255,255,255,0.3)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <span className="relative z-10">
              <i className="fas fa-calendar-check mr-2"></i>
              Book Your Date
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
          </motion.a>
        </motion.div>

        {/* Carousel Indicators with Progress */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3"
        >
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className="relative w-12 h-1 bg-white/30 rounded-full overflow-hidden transition-all duration-300
                       hover:bg-white/50"
              aria-label={`Go to slide ${index + 1}`}
            >
              <motion.div
                className="absolute inset-0 bg-luxury-gold"
                initial={{ scaleX: 0 }}
                animate={{ 
                  scaleX: index === currentImageIndex ? 1 : 0,
                  transition: { duration: index === currentImageIndex ? 5 : 0.3 }
                }}
                style={{ originX: 0 }}
              />
            </button>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <i className="fas fa-chevron-down text-white/60 text-2xl"></i>
        </motion.div>
      </motion.div>

      {/* Parallax Effect on Scroll */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px rgba(212, 175, 55, 0.5); }
          50% { text-shadow: 0 0 30px rgba(212, 175, 55, 0.8); }
        }
        
        .animate-shimmer {
          animation: shimmer 8s linear infinite;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default InstantHeroSection;