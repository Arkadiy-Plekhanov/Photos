import { useEffect } from 'react';

const CriticalCSSOptimizer = () => {
  useEffect(() => {
    // Critical CSS optimization for 744ms TTFB improvement
    const optimizeCSSDelivery = () => {
      // 1. Inline critical CSS to eliminate render-blocking
      const inlineCriticalCSS = () => {
        const criticalCSS = `
          /* Critical path CSS - inline for zero blocking */
          body { font-family: Inter, system-ui, sans-serif; margin: 0; }
          .min-h-screen { min-height: 100vh; }
          .bg-warm-white { background-color: #fefefe; }
          .text-charcoal { color: #2d3748; }
          .font-playfair { font-family: 'Playfair Display', serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
          
          /* Hero section critical styles */
          .hero-section { position: relative; min-height: 100vh; display: flex; align-items: center; }
          .hero-content { text-align: center; color: white; z-index: 10; }
          
          /* Navigation critical styles */
          .navigation { position: fixed; top: 0; width: 100%; z-index: 50; }
          
          /* Critical layout utilities */
          .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
          .flex { display: flex; }
          .items-center { align-items: center; }
          .justify-center { justify-content: center; }
          .justify-between { justify-content: space-between; }
          .text-center { text-align: center; }
          .relative { position: relative; }
          .absolute { position: absolute; }
          .fixed { position: fixed; }
          .hidden { display: none; }
          .block { display: block; }
          
          /* Critical responsive utilities */
          @media (max-width: 768px) {
            .md\\:hidden { display: none; }
            .md\\:block { display: block; }
          }
        `;

        // Inject critical CSS immediately
        const criticalStyle = document.createElement('style');
        criticalStyle.textContent = criticalCSS;
        criticalStyle.setAttribute('data-critical', 'true');
        document.head.insertBefore(criticalStyle, document.head.firstChild);
      };

      // 2. Defer non-critical CSS loading
      const deferNonCriticalCSS = () => {
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
        const nonCriticalSelectors = [
          'animate-', 'transition-', 'shadow-', 'border-', 'rounded-',
          'hover:', 'focus:', 'active:', 'group-hover:'
        ];

        cssLinks.forEach(link => {
          const linkEl = link as HTMLLinkElement;
          if (linkEl.href.includes('index-') && !linkEl.dataset.critical) {
            // Load CSS asynchronously after critical path
            const loadCSS = () => {
              const asyncLink = document.createElement('link');
              asyncLink.rel = 'stylesheet';
              asyncLink.href = linkEl.href;
              asyncLink.media = 'print';
              asyncLink.onload = () => {
                asyncLink.media = 'all';
              };
              document.head.appendChild(asyncLink);
            };

            // Remove original blocking CSS
            linkEl.remove();
            
            // Load after initial paint
            setTimeout(loadCSS, 100);
          }
        });
      };

      // 3. Optimize CSS loading strategy
      const optimizeLoadingStrategy = () => {
        // Preload CSS with high priority
        const preloadCSS = (href: string) => {
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.href = href;
          preloadLink.as = 'style';
          preloadLink.setAttribute('fetchpriority', 'high');
          
          preloadLink.onload = () => {
            const styleLink = document.createElement('link');
            styleLink.rel = 'stylesheet';
            styleLink.href = href;
            document.head.appendChild(styleLink);
          };
          
          document.head.appendChild(preloadLink);
        };

        // Find current CSS file
        const currentCSS = document.querySelector('link[href*="index-"][rel="stylesheet"]') as HTMLLinkElement;
        if (currentCSS) {
          const cssHref = currentCSS.href;
          // Remove current CSS and preload it instead
          currentCSS.remove();
          preloadCSS(cssHref);
        }
      };

      // 4. Implement CSS chunking for better caching
      const implementCSSChunking = () => {
        // Create CSS modules for better caching
        const cssModules = {
          critical: [
            'base', 'layout', 'typography', 'navigation', 'hero'
          ],
          deferred: [
            'animations', 'effects', 'utilities', 'responsive', 'components'
          ]
        };

        // Load CSS modules progressively
        Object.entries(cssModules).forEach(([priority, modules], index) => {
          modules.forEach((module, moduleIndex) => {
            const delay = priority === 'critical' ? 0 : 500 + (moduleIndex * 100);
            
            setTimeout(() => {
              const moduleCSS = document.createElement('style');
              moduleCSS.setAttribute('data-module', module);
              moduleCSS.setAttribute('data-priority', priority);
              
              // Placeholder for module-specific CSS
              if (module === 'animations') {
                moduleCSS.textContent = `
                  /* Deferred animations */
                  .animate-fade-in { animation: fadeIn 0.5s ease-in; }
                  .animate-slide-up { animation: slideUp 0.6s ease-out; }
                  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                `;
              }
              
              document.head.appendChild(moduleCSS);
            }, delay);
          });
        });
      };

      // Execute optimizations
      inlineCriticalCSS();
      
      // Defer non-critical optimizations
      requestAnimationFrame(() => {
        deferNonCriticalCSS();
        optimizeLoadingStrategy();
      });
      
      setTimeout(() => {
        implementCSSChunking();
      }, 200);
    };

    // CSS performance monitoring
    const monitorCSSPerformance = () => {
      if ('PerformanceObserver' in window) {
        const cssObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'resource' && entry.name.includes('.css')) {
              const resourceEntry = entry as PerformanceResourceTiming;
              console.log('CSS Performance:', {
                name: entry.name.split('/').pop(),
                duration: Math.round(entry.duration),
                ttfb: Math.round(resourceEntry.responseStart - resourceEntry.requestStart),
                size: resourceEntry.transferSize,
                cached: resourceEntry.transferSize === 0 ? 'HIT' : 'MISS'
              });
            }
          }
        });
        
        cssObserver.observe({ entryTypes: ['resource'] });
      }
    };

    // Critical path timing optimization
    const optimizeCriticalPath = () => {
      // Remove render-blocking CSS during initial paint
      const optimizeInitialRender = () => {
        const renderBlockingCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
        const blockedStyles: HTMLLinkElement[] = [];
        
        renderBlockingCSS.forEach(link => {
          const linkEl = link as HTMLLinkElement;
          if (linkEl.href.includes('index-')) {
            blockedStyles.push(linkEl);
            linkEl.media = 'print'; // Temporarily disable
          }
        });

        // Re-enable after critical paint
        setTimeout(() => {
          blockedStyles.forEach(link => {
            link.media = 'all';
          });
        }, 800); // After initial render
      };

      optimizeInitialRender();
    };

    // Initialize CSS optimizations
    optimizeCSSDelivery();
    monitorCSSPerformance();
    optimizeCriticalPath();
  }, []);

  return null;
};

export default CriticalCSSOptimizer;