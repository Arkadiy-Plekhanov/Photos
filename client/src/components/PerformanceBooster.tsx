import { useEffect } from 'react';

export default function PerformanceBooster() {
  useEffect(() => {
    // Ultra-aggressive performance optimizations
    
    // 1. Prioritize critical resources
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        // Preconnect to critical domains during idle time
        const domains = [
          'https://fonts.gstatic.com',
          'https://images.unsplash.com',
          'https://cdnjs.cloudflare.com'
        ];
        
        domains.forEach(domain => {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = domain;
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        });
      });
    }

    // 2. Optimize rendering performance
    const style = document.createElement('style');
    style.textContent = `
      /* GPU acceleration for smooth animations */
      .parallax-bg {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000;
      }
      
      /* Optimize reflow/repaint */
      img {
        transform: translateZ(0);
      }
      
      /* Critical rendering optimizations */
      .hero-section {
        contain: strict;
      }
    `;
    document.head.appendChild(style);

    // 3. Aggressive resource hints
    const resourceHints = [
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      { rel: 'dns-prefetch', href: 'https://images.unsplash.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossOrigin: 'anonymous' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
    ];

    resourceHints.forEach(hint => {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if (hint.crossOrigin) link.crossOrigin = hint.crossOrigin;
      document.head.appendChild(link);
    });

    // 4. Force early font loading
    const fontFace = new FontFace('Inter', 'url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2)', {
      display: 'swap',
      weight: '400'
    });
    
    fontFace.load().then(() => {
      document.fonts.add(fontFace);
    }).catch(() => {
      // Fallback to system fonts if needed
    });

    // 5. Optimize paint and layout
    if ('PerformanceObserver' in window) {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            // Force immediate DOM content to be visible
            document.body.style.visibility = 'visible';
            document.body.style.opacity = '1';
          }
        }
      });
      paintObserver.observe({ type: 'paint', buffered: true });
    }

    // 6. Early cleanup of non-critical resources
    setTimeout(() => {
      // Remove non-critical preload links after loading
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach(link => {
        if (!link.href.includes('w=20')) { // Keep LQIP preloads
          link.remove();
        }
      });
    }, 5000);

  }, []);

  return null;
}