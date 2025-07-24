import { useEffect } from 'react';

export default function CriticalCSS() {
  useEffect(() => {
    // Smooth transition from static hero to React app
    const immediateHero = document.getElementById('immediate-hero');
    if (immediateHero) {
      // Fade out the static hero smoothly
      immediateHero.style.transition = 'opacity 0.5s ease-out';
      immediateHero.style.opacity = '0';
      
      setTimeout(() => {
        immediateHero.style.display = 'none';
        // Ensure app loaded class is set for any remaining transitions
        if (!document.body.classList.contains('app-loaded')) {
          document.body.classList.add('app-loaded');
        }
      }, 500);
    }
    
    // Progressive script loading after React is ready
    const loadProgressiveAssets = () => {
      // Load non-critical external scripts progressively
      setTimeout(() => {
        // Example: Load third-party analytics or widgets here
        console.log('Progressive assets loaded');
      }, 2000);
    };
    
    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadProgressiveAssets);
    } else {
      setTimeout(loadProgressiveAssets, 1000);
    }
  }, []);

  return null;
}