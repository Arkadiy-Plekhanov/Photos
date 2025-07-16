
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ContactSection from '../components/ContactSection';
import { useSEO } from '../hooks/useSEO';

const ContactPage = () => {
  useSEO('contact');
  
  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default ContactPage;

const ContactPage = () => {
  useSEO({
    title: "Contact Arcadia Photography - Book Your Session Today",
    description: "Ready to capture your special moments? Contact Arcadia Photography to book your wedding, real estate, or family photography session in Oahu, Hawaii.",
    keywords: "contact photographer Oahu, book photography session Hawaii, Arcadia Photography contact",
  });

  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-ocean-blue/40" />
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-playfair font-bold mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-inter"
          >
            Ready to create something beautiful together?
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
      
      <Footer />
    </div>
  );
};

export default ContactPage;
