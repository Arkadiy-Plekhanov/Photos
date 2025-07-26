import { useEffect } from 'react';

const ExternalImageEliminator = () => {
  useEffect(() => {
    // Eliminate all external image dependencies for optimal performance
    const eliminateExternalImages = () => {
      // 1. Replace Unsplash images with local alternatives
      const replaceUnsplashImages = () => {
        const images = document.querySelectorAll('img[src*="unsplash.com"]');
        const backgroundElements = document.querySelectorAll('[style*="unsplash.com"]');
        
        images.forEach(img => {
          const image = img as HTMLImageElement;
          const currentSrc = image.src;
          
          // Map common Unsplash images to local alternatives
          const imageMapping: { [key: string]: string } = {
            'photo-1439066615861-d1af74d74000': '/images/landscape-hero.jpg',
            'photo-1469474968028-56623f02e42e': '/images/portfolio/wedding-1.jpg',
            'photo-1522673607200-164d1b6ce486': '/images/services/wedding.jpg',
            'photo-1606216794074-735e91aa2c92': '/images/portfolio/wedding-2.jpg',
            'photo-1515934751635-c81c6bc9a2d8': '/images/services/real-estate.jpg',
            'photo-1511895426328-dc8714191300': '/images/services/family.jpg'
          };
          
          // Find matching local image
          for (const [unsplashId, localPath] of Object.entries(imageMapping)) {
            if (currentSrc.includes(unsplashId)) {
              console.log(`Replacing external image: ${unsplashId} -> ${localPath}`);
              
              // Preload local image first
              const localImage = new Image();
              localImage.onload = () => {
                image.src = localPath;
                image.setAttribute('data-optimized', 'local');
              };
              localImage.src = localPath;
              break;
            }
          }
        });

        // Handle background images
        backgroundElements.forEach(element => {
          const el = element as HTMLElement;
          const style = el.style.backgroundImage;
          
          if (style && style.includes('unsplash.com')) {
            // Replace with local hero image
            el.style.backgroundImage = 'url("/images/landscape-hero.jpg")';
            console.log('Replaced background image with local asset');
          }
        });
      };

      // 2. Optimize local image loading
      const optimizeLocalImages = () => {
        const localImages = document.querySelectorAll('img[src^="/images/"]');
        
        localImages.forEach(img => {
          const image = img as HTMLImageElement;
          
          // Add optimized loading attributes
          if (!image.loading) {
            image.loading = 'lazy';
          }
          if (!image.decoding) {
            image.decoding = 'async';
          }
          
          // Add WebP optimization hint
          if (!image.dataset.webpOptimized) {
            const originalSrc = image.src;
            const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            
            // Test if WebP version exists
            const webpTest = new Image();
            webpTest.onload = () => {
              image.src = webpSrc;
              image.dataset.webpOptimized = 'true';
            };
            webpTest.onerror = () => {
              // Keep original format if WebP not available
              image.dataset.webpOptimized = 'fallback';
            };
            webpTest.src = webpSrc;
          }
        });
      };

      // 3. Preload critical local images
      const preloadCriticalLocalImages = () => {
        const criticalImages = [
          '/images/landscape-hero.jpg',
          '/images/services/wedding.jpg',
          '/images/portfolio/wedding-1.jpg'
        ];

        criticalImages.forEach((src, index) => {
          const existingPreload = document.querySelector(`link[href="${src}"]`);
          if (!existingPreload) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = src;
            link.as = 'image';
            link.setAttribute('fetchpriority', index === 0 ? 'high' : 'low');
            document.head.appendChild(link);
          }
        });
      };

      // 4. Monitor and eliminate any remaining external requests
      const monitorExternalRequests = () => {
        if ('PerformanceObserver' in window) {
          const resourceObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'resource' && entry.name.includes('image')) {
                const resourceEntry = entry as PerformanceResourceTiming;
                
                // Alert on external image requests
                if (!entry.name.includes(window.location.hostname)) {
                  console.warn('External image detected:', {
                    url: entry.name,
                    duration: entry.duration,
                    size: resourceEntry.transferSize
                  });
                }
              }
            }
          });
          
          resourceObserver.observe({ entryTypes: ['resource'] });
        }
      };

      // Execute optimizations
      replaceUnsplashImages();
      optimizeLocalImages();
      preloadCriticalLocalImages();
      monitorExternalRequests();
    };

    // Image fallback system for reliability
    const implementImageFallbacks = () => {
      const addImageErrorHandling = () => {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
          const image = img as HTMLImageElement;
          
          image.addEventListener('error', () => {
            console.log(`Image failed to load: ${image.src}`);
            
            // Fallback hierarchy
            const fallbacks = [
              '/images/services/wedding.jpg', // Generic wedding photo
              '/images/landscape-hero.jpg',   // Hero landscape
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlmYTZiMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFyY2FkaWEgUGhvdG9ncmFwaHk8L3RleHQ+PC9zdmc+'
            ];
            
            // Try fallbacks in order
            const tryFallback = (index: number) => {
              if (index < fallbacks.length) {
                const fallbackSrc = fallbacks[index];
                
                if (image.src !== fallbackSrc) {
                  const testImage = new Image();
                  testImage.onload = () => {
                    image.src = fallbackSrc;
                  };
                  testImage.onerror = () => {
                    tryFallback(index + 1);
                  };
                  testImage.src = fallbackSrc;
                }
              }
            };
            
            tryFallback(0);
          });
        });
      };

      addImageErrorHandling();
    };

    // Initialize external image elimination
    eliminateExternalImages();
    implementImageFallbacks();

    // Re-run elimination after dynamic content loads
    setTimeout(() => {
      eliminateExternalImages();
    }, 2000);
  }, []);

  return null;
};

export default ExternalImageEliminator;