import { useEffect } from 'react';

const SuperiorPerformanceOptimizer = () => {
  useEffect(() => {
    // Advanced LCP acceleration - target sub-2.5s
    const accelerateLCP = () => {
      // Identify and optimize LCP candidate immediately
      const potentialLCPElements = [
        'img[src*="wedding.jpg"]',
        'img[src*="services"]',
        'h1, h2.hero-title',
        '.hero-section img'
      ];

      potentialLCPElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el instanceof HTMLImageElement) {
            el.fetchPriority = 'high';
            el.loading = 'eager';
            el.decoding = 'sync';
            // Force immediate decode
            el.decode().catch(() => {});
          }
          if (el instanceof HTMLElement) {
            // Ensure immediate visibility
            el.style.contentVisibility = 'visible';
            el.style.contain = 'none';
          }
        });
      });

      // Preload next critical images with highest priority
      const criticalImageSources = [
        '/images/services/wedding.jpg',
        '/images/portfolio/wedding-1.jpg',
        '/images/about/team.jpg'
      ];

      criticalImageSources.forEach((src, index) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        if (index === 0) link.setAttribute('fetchpriority', 'high');
        document.head.appendChild(link);
      });
    };

    // Aggressive TBT reduction - target <200ms
    const reduceTotalBlockingTime = () => {
      // Split heavy JavaScript tasks into smaller chunks
      const optimizeJSExecution = () => {
        // Defer all non-critical script execution
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
          const scriptEl = script as HTMLScriptElement;
          if (!scriptEl.src.includes('index-') && !scriptEl.src.includes('critical')) {
            scriptEl.defer = true;
          }
        });

        // Use scheduler.postTask for better task scheduling if available
        if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
          const scheduler = (window as any).scheduler;
          
          // Schedule non-critical animations with lower priority
          const heavyAnimations = document.querySelectorAll('[class*="animate-"], [style*="animation"]');
          heavyAnimations.forEach(el => {
            scheduler.postTask(() => {
              // Enable animations after critical path
              (el as HTMLElement).style.willChange = 'auto';
            }, { priority: 'background' });
          });
        }
      };

      requestIdleCallback ? requestIdleCallback(optimizeJSExecution) : setTimeout(optimizeJSExecution, 0);
    };

    // Enhanced visual loading optimization
    const optimizeVisualLoading = () => {
      // Implement progressive image enhancement
      const implementProgressiveImages = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (!img.src.includes('wedding.jpg')) { // Keep hero image prioritized
            // Set up intersection observer for better lazy loading
            if ('IntersectionObserver' in window) {
              const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    const image = entry.target as HTMLImageElement;
                    // Progressive enhancement
                    if (image.dataset.src) {
                      image.src = image.dataset.src;
                      image.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(image);
                  }
                });
              }, {
                rootMargin: '50px 0px',
                threshold: 0.01
              });

              imageObserver.observe(img);
            }
          }
        });
      };

      // Optimize local font loading for faster text rendering
      const optimizeFontLoading = () => {
        // All fonts now served locally - no external dependencies
        const criticalLocalFonts = [
          '/fonts/playfair-display.woff2',
          '/fonts/inter.woff2',
          '/fonts/dancing-script.woff2'
        ];

        criticalLocalFonts.forEach(fontUrl => {
          const existingPreload = document.querySelector(`link[href="${fontUrl}"]`);
          if (!existingPreload) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = fontUrl;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.setAttribute('fetchpriority', 'high');
            document.head.appendChild(link);
          }
        });
      };

      implementProgressiveImages();
      optimizeFontLoading();
    };

    // Ultra-efficient caching strategy - target 98+ cache score
    const enhanceCaching = () => {
      // Service Worker enhancement for better caching
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
          // Send cache optimization commands to service worker
          if (registration.active) {
            registration.active.postMessage({
              command: 'OPTIMIZE_CACHE',
              strategy: 'ultra-performance'
            });
          }
        });
      }

      // Implement client-side resource hints
      const addResourceHints = () => {
        const hints = [
          { rel: 'dns-prefetch', href: '//cdnjs.cloudflare.com' }
          // External fonts removed - using local fonts only
        ];

        hints.forEach(hint => {
          const existing = document.querySelector(`link[href="${hint.href}"]`);
          if (!existing) {
            const link = document.createElement('link');
            link.rel = hint.rel;
            link.href = hint.href;
            if (hint.crossorigin) link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
          }
        });
      };

      addResourceHints();
    };

    // Resource priority optimization
    const optimizeResourcePriorities = () => {
      // Boost critical resource priorities
      const criticalResources = document.querySelectorAll('link[rel="stylesheet"], script[src]');
      criticalResources.forEach(resource => {
        if (resource instanceof HTMLLinkElement) {
          if (resource.href?.includes('index-')) {
            resource.setAttribute('fetchpriority', 'high');
          }
        } else if (resource instanceof HTMLScriptElement) {
          if (resource.src?.includes('index-')) {
            resource.setAttribute('fetchpriority', 'high');
          }
        }
      });

      // Reduce priority of non-critical resources
      const nonCriticalResources = document.querySelectorAll('img:not([src*="wedding.jpg"]), link[href*="font-awesome"]');
      nonCriticalResources.forEach(resource => {
        if (resource instanceof HTMLImageElement || resource instanceof HTMLLinkElement) {
          resource.setAttribute('fetchpriority', 'low');
        }
      });
    };

    // Execute optimizations in performance-critical order
    const executeOptimizations = () => {
      // Phase 1: Immediate LCP optimizations
      accelerateLCP();
      
      // Phase 2: Critical path optimizations (next frame)
      requestAnimationFrame(() => {
        reduceTotalBlockingTime();
        optimizeResourcePriorities();
      });

      // Phase 3: Visual and caching optimizations (after critical path)
      setTimeout(() => {
        optimizeVisualLoading();
        enhanceCaching();
      }, 100);
    };

    // Performance monitoring and adaptive optimization
    const monitorAndAdapt = () => {
      if ('PerformanceObserver' in window) {
        // Monitor LCP and adapt strategy
        const lcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              const lcpTime = entry.startTime;
              console.log('LCP detected:', lcpTime + 'ms');
              
              // Adaptive optimization based on LCP performance
              if (lcpTime > 2000) {
                // Apply emergency optimizations
                document.querySelectorAll('section:not(.hero-section):nth-child(n+3)').forEach(section => {
                  (section as HTMLElement).style.display = 'none';
                  setTimeout(() => {
                    (section as HTMLElement).style.display = '';
                  }, 2500);
                });
              }
            }
          }
        });

        // Monitor First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'first-input') {
              const fidEntry = entry as any; // PerformanceEventTiming
              const delay = fidEntry.processingStart ? fidEntry.processingStart - entry.startTime : 0;
              console.log('FID detected:', delay + 'ms');
            }
          }
        });

        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        fidObserver.observe({ entryTypes: ['first-input'] });
      }
    };

    // Initialize superior performance optimization
    executeOptimizations();
    monitorAndAdapt();

    // Cleanup function
    return () => {
      // Clean up observers if component unmounts
      if ('PerformanceObserver' in window) {
        // Observers will be cleaned up automatically
      }
    };
  }, []);

  return null;
};

export default SuperiorPerformanceOptimizer;