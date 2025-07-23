import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import PortfolioSection from '../components/PortfolioSection';
import TestimonialsSection from '../components/TestimonialsSection';
import AboutSection from '../components/AboutSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

const Home = () => {
  useSEO('home');

  return (
    <div className="min-h-screen bg-warm-white text-charcoal overflow-x-hidden">
      {/* Font Awesome Icon Test */}
      <div className="p-4 text-center">
        <i className="fas fa-camera-retro text-4xl text-blue-600"></i>
        <i className="fas fa-star text-2xl text-yellow-500 ml-4"></i>
        <i className="fab fa-instagram text-2xl text-pink-500 ml-4"></i>
      </div>
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <AboutSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;