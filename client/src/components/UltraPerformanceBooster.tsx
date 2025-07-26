import { useEffect } from 'react';

const UltraPerformanceBooster = () => {
  useEffect(() => {
    // Ultra-critical LCP optimization
    const optimizeLCP = () => {
      // Prioritize LCP candidate elements
      const heroImage = document.querySelector('img[src*="wedding.jpg"]') as HTMLImageElement;
      if (heroImage) {
        heroImage.fetchPriority = 'high';
        heroImage.loading = 'eager';
        heroImage.decoding = 'sync';
      }

      // Remove unused critical CSS animations during initial load
      const animations = document.querySelectorAll('[style*="animation"], [class*="animate-"]');
      animations.forEach(el => {
        const element = el as HTMLElement;
        const tempStyle = element.style.animation;
        element.style.animation = 'none';
        
        // Re-enable after LCP
        setTimeout(() => {
          element.style.animation = tempStyle;
        }, 2100);
      });
    };

    // Advanced resource scheduling
    const scheduleResources = () => {
      // Defer heavy computations until after LCP
      const heavyTasks = [
        () => {
          // Lazy load blog section images
          const blogImages = document.querySelectorAll('img[src*="/images/blog/"]');
          blogImages.forEach(img => {
            (img as HTMLImageElement).loading = 'lazy';
          });
        },
        () => {
          // Defer testimonial avatars
          const avatars = document.querySelectorAll('img[src*="/images/testimonials/"]');
          avatars.forEach(img => {
            (img as HTMLImageElement).loading = 'lazy';
          });
        }
      ];

      heavyTasks.forEach((task, index) => {
        setTimeout(task, 2000 + (index * 500));
      });
    };

    // Critical path optimization
    const optimizeCriticalPath = () => {
      // Remove render-blocking elements temporarily
      const nonCriticalCSS = document.querySelectorAll('link[href*="font-awesome"], link[href*="dancing-script"]');
      nonCriticalCSS.forEach(link => {
        const linkEl = link as HTMLLinkElement;
        linkEl.media = 'print';
        
        // Restore after LCP paint
        setTimeout(() => {
          linkEl.media = 'all';
        }, 2100);
      });
    };

    // Execute optimizations in optimal order
    requestAnimationFrame(() => {
      optimizeLCP();
      optimizeCriticalPath();
      
      setTimeout(scheduleResources, 100);
    });

    // Monitor LCP and adjust strategy
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
            if (entry.startTime > 1800) {
              // Apply emergency optimizations if LCP is slow
              document.querySelectorAll('section:nth-child(n+4)').forEach(section => {
                (section as HTMLElement).style.display = 'none';
                setTimeout(() => {
                  (section as HTMLElement).style.display = '';
                }, 2500);
              });
            }
          }
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }, []);

  return null;
};

export default UltraPerformanceBooster;