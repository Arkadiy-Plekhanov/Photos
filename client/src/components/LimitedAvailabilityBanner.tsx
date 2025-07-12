import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LimitedAvailabilityBanner = () => {
  const [availableSlots, setAvailableSlots] = useState(7);
  
  // Simulate dynamic availability
  useEffect(() => {
    const timer = setInterval(() => {
      setAvailableSlots(prev => Math.max(3, prev - Math.floor(Math.random() * 2)));
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-sunset-orange text-white py-3 text-center relative overflow-hidden"
    >
      <div className="container mx-auto px-6 flex items-center justify-center gap-4">
        <span className="animate-pulse">
          <i className="fas fa-fire text-white mr-2"></i>
        </span>
        <p className="font-inter text-sm md:text-base">
          <strong>Limited Availability:</strong> Only {availableSlots} weekend dates left for 2024!
          <a 
            href="#contact" 
            className="ml-3 underline hover:text-luxury-gold transition-colors"
          >
            Reserve Your Date →
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default LimitedAvailabilityBanner;