import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const SpecialOffer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 48,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        
        if (totalSeconds <= 0) {
          return { hours: 48, minutes: 0, seconds: 0 }; // Reset after expiry
        }
        
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-ocean-blue/5 to-luxury-gold/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 md:p-12 text-center shadow-2xl border-luxury-gold/30">
            <div className="inline-block px-4 py-2 bg-sunset-orange text-white rounded-full text-sm mb-4">
              <i className="fas fa-clock mr-2"></i>Limited Time Offer
            </div>
            
            <h2 className="text-3xl md:text-4xl font-playfair mb-4">
              Book Your 2024 Wedding & Save 20%
            </h2>
            
            <p className="text-lg text-charcoal/70 mb-6">
              Plus receive a complimentary engagement session ($500 value)
            </p>
            
            <div className="flex justify-center gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-ocean-blue">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-sm text-charcoal/60">Hours</div>
              </div>
              <div className="text-3xl font-bold text-ocean-blue">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ocean-blue">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-sm text-charcoal/60">Minutes</div>
              </div>
              <div className="text-3xl font-bold text-ocean-blue">:</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ocean-blue">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-sm text-charcoal/60">Seconds</div>
              </div>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-center gap-2 text-charcoal/70">
                <i className="fas fa-check text-tropical-green"></i>
                <span>Valid for weddings booked by March 31, 2024</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-charcoal/70">
                <i className="fas fa-check text-tropical-green"></i>
                <span>Applies to all wedding packages</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-charcoal/70">
                <i className="fas fa-check text-tropical-green"></i>
                <span>No hidden fees - transparent pricing</span>
              </div>
            </div>
            
            <a
              href="#contact"
              className="inline-block bg-luxury-gold text-ocean-blue px-8 py-4 rounded-full font-semibold hover:bg-sunset-orange transition-all duration-300 animate-pulse-subtle"
            >
              <i className="fas fa-gift mr-2"></i>
              Claim Your Discount Now
            </a>
            
            <p className="text-sm text-charcoal/50 mt-4">
              *Cannot be combined with other offers. Terms apply.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffer;