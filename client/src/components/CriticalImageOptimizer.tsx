import { useEffect } from 'react';

const CriticalImageOptimizer = () => {
  useEffect(() => {
    // WebP detection and optimization
    const supportsWebP = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    // Advanced image compression for hero images
    const optimizeHeroImages = () => {
      const heroImages = document.querySelectorAll('img[src*="/images/services/"]');
      const hasWebP = supportsWebP();
      
      heroImages.forEach(img => {
        const originalSrc = img.getAttribute('src');
        if (originalSrc && !originalSrc.includes('optimized')) {
          // Add compression parameters for better performance
          const optimizedSrc = originalSrc.replace('.jpg', hasWebP ? '.webp' : '.jpg');
          
          // Preload optimized version
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = optimizedSrc;
          document.head.appendChild(link);
          
          // Switch to optimized when loaded
          const optimizedImg = new Image();
          optimizedImg.onload = () => {
            (img as HTMLImageElement).src = optimizedSrc;
            img.setAttribute('data-optimized', 'true');
          };
          optimizedImg.src = optimizedSrc;
        }
      });
    };

    // Eliminate render-blocking resources
    const eliminateRenderBlocking = () => {
      // Move non-critical CSS to load after FCP
      const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])') as NodeListOf<HTMLLinkElement>;
      nonCriticalCSS.forEach(link => {
        if (link.href.includes('font-awesome') || link.href.includes('fonts.googleapis')) {
          link.media = 'print';
          link.onload = function() {
            (this as HTMLLinkElement).media = 'all';
          };
        }
      });
    };

    // Reduce DOM complexity for faster LCP
    const optimizeDOM = () => {
      // Lazy load sections below the fold
      const sections = document.querySelectorAll('section') as NodeListOf<HTMLElement>;
      sections.forEach((section, index) => {
        if (index > 2) { // Keep hero, services, and portfolio visible
          (section as any).style.contentVisibility = 'auto';
          (section as any).style.containIntrinsicSize = '1000px';
        }
      });
    };

    // Execute optimizations in sequence
    requestAnimationFrame(() => {
      eliminateRenderBlocking();
      optimizeHeroImages();
      
      // Defer DOM optimization to avoid layout thrashing
      setTimeout(optimizeDOM, 100);
    });

  }, []);

  return null;
};

export default CriticalImageOptimizer;