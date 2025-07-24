import Navigation from '../components/Navigation';
import OptimizedHeroSection from '../components/OptimizedHeroSection';
import ServicesSection from '../components/ServicesSection';
import PortfolioSection from '../components/PortfolioSection';
import TestimonialsSection from '../components/TestimonialsSection';
import AboutSection from '../components/AboutSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Home = () => {

  return (
    <div className="min-h-screen bg-warm-white text-charcoal overflow-x-hidden">
      <Navigation />
      <OptimizedHeroSection />
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