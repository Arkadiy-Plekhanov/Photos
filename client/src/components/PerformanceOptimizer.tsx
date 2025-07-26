import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical next-page resources during idle time
    const preloadResources = () => {
      const criticalImages = [
        '/images/portfolio/wedding-2.jpg',
        '/images/portfolio/real-estate-1.jpg',
        '/images/services/real-estate.jpg',
        '/images/services/family.jpg'
      ];

      criticalImages.forEach((src, index) => {
        setTimeout(() => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = src;
          document.head.appendChild(link);
        }, index * 500); // Stagger loading
      });
    };

    // Use requestIdleCallback for non-critical preloading
    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadResources, { timeout: 2000 });
    } else {
      setTimeout(preloadResources, 1000);
    }

    // Service Worker registration for aggressive caching
    if ('serviceWorker' in navigator && 'caches' in window) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Silent fail for service worker
      });
    }

    // Connection optimization hints
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection && connection.effectiveType === 'slow-2g') {
        // Reduce image quality for slow connections
        document.documentElement.setAttribute('data-connection', 'slow');
      }
    }
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;