import { useEffect } from 'react';

export default function InstantLoader() {
  useEffect(() => {
    // Force immediate content rendering for FCP optimization
    const optimizeRender = () => {
      // Show content immediately
      document.body.style.visibility = 'visible';
      document.body.style.opacity = '1';
      
      // Force browser to prioritize critical content
      const criticalElements = document.querySelectorAll('.hero-section, h1, .gradient-text');
      criticalElements.forEach(el => {
        (el as HTMLElement).style.willChange = 'auto';
        (el as HTMLElement).style.transform = 'translateZ(0)';
      });
      
      // Force immediate font rendering
      if (document.fonts) {
        document.fonts.ready.then(() => {
          const event = new CustomEvent('fonts-loaded');
          document.dispatchEvent(event);
        });
      }
      
      // Optimize critical path rendering
      requestAnimationFrame(() => {
        // Force layout calculation for critical elements
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
          heroSection.getBoundingClientRect();
        }
      });
    };

    // Run optimization immediately and on DOM ready
    optimizeRender();
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeRender);
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', optimizeRender);
    };
  }, []);

  return null;
}