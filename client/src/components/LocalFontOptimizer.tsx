import { useEffect } from 'react';

const LocalFontOptimizer = () => {
  useEffect(() => {
    // Optimize local font loading for maximum performance
    const optimizeLocalFonts = () => {
      // Preload critical local fonts with highest priority
      const preloadCriticalFonts = () => {
        const fontPreloads = [
          { href: '/fonts/playfair-display.woff2', weight: '400' },
          { href: '/fonts/inter.woff2', weight: '400' },
          { href: '/fonts/playfair-display-bold.woff2', weight: '700' },
          { href: '/fonts/inter-bold.woff2', weight: '700' }
        ];

        fontPreloads.forEach(font => {
          const existingPreload = document.querySelector(`link[href="${font.href}"]`);
          if (!existingPreload) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = font.href;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.setAttribute('fetchpriority', 'high');
            document.head.appendChild(link);
          }
        });
      };

      // Implement font-display: swap for better text rendering
      const implementFontSwap = () => {
        const style = document.createElement('style');
        style.textContent = `
          @font-face {
            font-family: 'Playfair Display Local';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/fonts/playfair-display.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          
          @font-face {
            font-family: 'Inter Local';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/fonts/inter.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          
          /* Fallback font optimization */
          .font-playfair {
            font-family: 'Playfair Display Local', 'Playfair Display', serif;
          }
          
          .font-inter {
            font-family: 'Inter Local', 'Inter', system-ui, sans-serif;
          }
        `;
        document.head.appendChild(style);
      };

      // Font loading strategy optimization
      const optimizeFontLoading = () => {
        // Check if fonts are already loaded
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(() => {
            console.log('Local fonts loaded successfully');
            
            // Apply optimized font classes
            const elements = document.querySelectorAll('[class*="font-playfair"], [class*="font-inter"]');
            elements.forEach(el => {
              if (el.classList.contains('font-playfair')) {
                el.classList.add('font-playfair-local');
              }
              if (el.classList.contains('font-inter')) {
                el.classList.add('font-inter-local');
              }
            });
          });
        }

        // Load fonts programmatically for better control
        const loadFont = async (name: string, url: string, weight = '400') => {
          try {
            const font = new FontFace(name, `url(${url})`, {
              weight,
              display: 'swap'
            });
            
            const loadedFont = await font.load();
            document.fonts.add(loadedFont);
            console.log(`Font loaded: ${name}`);
          } catch (error) {
            console.log(`Font load error: ${name}`, error);
          }
        };

        // Load critical fonts immediately
        loadFont('Playfair Display Local', '/fonts/playfair-display.woff2', '400');
        loadFont('Inter Local', '/fonts/inter.woff2', '400');
        
        // Load additional weights after critical path
        setTimeout(() => {
          loadFont('Playfair Display Local', '/fonts/playfair-display-bold.woff2', '700');
          loadFont('Inter Local', '/fonts/inter-bold.woff2', '700');
        }, 1000);
      };

      // Font performance monitoring
      const monitorFontPerformance = () => {
        if ('PerformanceObserver' in window) {
          const fontObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'resource' && entry.name.includes('/fonts/')) {
                const resourceEntry = entry as PerformanceResourceTiming;
                console.log('Font loading performance:', {
                  name: entry.name,
                  duration: entry.duration,
                  transferSize: resourceEntry.transferSize,
                  cached: resourceEntry.transferSize === 0 ? 'HIT' : 'MISS'
                });
              }
            }
          });
          
          fontObserver.observe({ entryTypes: ['resource'] });
        }
      };

      // Execute font optimizations
      preloadCriticalFonts();
      implementFontSwap();
      optimizeFontLoading();
      monitorFontPerformance();
    };

    // Font fallback system
    const implementFontFallbacks = () => {
      const addFallbackCSS = () => {
        const style = document.createElement('style');
        style.textContent = `
          /* Optimized font fallbacks for better rendering */
          .font-playfair {
            font-family: 'Playfair Display', 'Times New Roman', serif;
            font-size-adjust: 0.481;
          }
          
          .font-inter {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size-adjust: 0.468;
          }
          
          /* Prevent invisible text during font swap */
          .font-playfair, .font-inter {
            text-rendering: optimizeSpeed;
          }
          
          /* Apply after fonts load */
          .fonts-loaded .font-playfair,
          .fonts-loaded .font-inter {
            text-rendering: optimizeLegibility;
          }
        `;
        document.head.appendChild(style);
      };

      addFallbackCSS();

      // Mark fonts as loaded when ready
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          document.documentElement.classList.add('fonts-loaded');
        });
      }
    };

    // Initialize optimizations
    optimizeLocalFonts();
    implementFontFallbacks();

    // Font loading status check
    const checkFontStatus = () => {
      const fonts = [
        'Playfair Display',
        'Inter'
      ];

      fonts.forEach(font => {
        if (document.fonts && document.fonts.check) {
          const isLoaded = document.fonts.check(`12px "${font}"`);
          console.log(`Font ${font}: ${isLoaded ? 'loaded' : 'loading'}`);
        }
      });
    };

    // Check status after a short delay
    setTimeout(checkFontStatus, 500);
  }, []);

  return null;
};

export default LocalFontOptimizer;