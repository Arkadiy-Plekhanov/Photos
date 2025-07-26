import { lazy, Suspense, useEffect } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import PerformanceOptimizer from '../components/PerformanceOptimizer';
import CriticalImageOptimizer from '../components/CriticalImageOptimizer';
import UltraPerformanceBooster from '../components/UltraPerformanceBooster';
import SuperiorPerformanceOptimizer from '../components/SuperiorPerformanceOptimizer';
import AdvancedImageOptimizer from '../components/AdvancedImageOptimizer';
import UltraFastCacheOptimizer from '../components/UltraFastCacheOptimizer';
import TurboModeOptimizer from '../components/TurboModeOptimizer';
import LocalFontOptimizer from '../components/LocalFontOptimizer';
import CriticalCSSOptimizer from '../components/CriticalCSSOptimizer';
import ExternalImageEliminator from '../components/ExternalImageEliminator';

// Lazy load non-critical sections for faster initial load
const ServicesSection = lazy(() => import('../components/ServicesSection'));
const PortfolioSection = lazy(() => import('../components/PortfolioSection'));
const TestimonialsSection = lazy(() => import('../components/TestimonialsSection'));
const AboutSection = lazy(() => import('../components/AboutSection'));
const BlogSection = lazy(() => import('../components/BlogSection'));
const ContactSection = lazy(() => import('../components/ContactSection'));
const Footer = lazy(() => import('../components/Footer'));

// Section loading placeholder
const SectionLoader = () => (
  <div className="h-32 flex items-center justify-center">
    <div className="animate-pulse w-full max-w-6xl mx-auto">
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
    </div>
  </div>
);

const Home = () => {
  useEffect(() => {
    // Quick performance check in development only
    if (process.env.NODE_ENV === 'development') {
      window.addEventListener('load', () => {
        const perfData = {
          domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
          loadComplete: performance.timing.loadEventEnd - performance.timing.navigationStart,
          fcp: performance.getEntriesByType('paint').find(p => p.name === 'first-contentful-paint')?.startTime || 0
        };
        console.log('Page Performance:', perfData);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-warm-white text-charcoal overflow-x-hidden">
      <PerformanceOptimizer />
      <CriticalImageOptimizer />
      <UltraPerformanceBooster />
      <SuperiorPerformanceOptimizer />
      <AdvancedImageOptimizer />
      <UltraFastCacheOptimizer />
      <TurboModeOptimizer />
      <LocalFontOptimizer />
      <CriticalCSSOptimizer />
      <ExternalImageEliminator />
      <Navigation />
      <HeroSection />
      <Suspense fallback={<SectionLoader />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <PortfolioSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <BlogSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;