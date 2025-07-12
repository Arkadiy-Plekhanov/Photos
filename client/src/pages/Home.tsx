import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import PortfolioSection from '../components/PortfolioSection';
import TestimonialsSection from '../components/TestimonialsSection';
import AboutSection from '../components/AboutSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import TrustBadges from '../components/TrustBadges';
import LimitedAvailabilityBanner from '../components/LimitedAvailabilityBanner';
import SpecialOffer from '../components/SpecialOffer';

const Home = () => {
  return (
    <div className="min-h-screen bg-warm-white text-charcoal overflow-x-hidden">
      <LimitedAvailabilityBanner />
      <Navigation />
      <HeroSection />
      <TrustBadges />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <SpecialOffer />
      <AboutSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
