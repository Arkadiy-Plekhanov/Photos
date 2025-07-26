import { useEffect } from 'react';

const AdvancedImageOptimizer = () => {
  useEffect(() => {
    // Advanced image optimization for sub-2.5s LCP
    const implementAdvancedImageOptimization = () => {
      // Critical image prioritization
      const prioritizeCriticalImages = () => {
        // Hero image gets maximum priority
        const heroImage = document.querySelector('img[src*="wedding.jpg"]') as HTMLImageElement;
        if (heroImage) {
          heroImage.fetchPriority = 'high';
          heroImage.loading = 'eager';
          heroImage.decoding = 'sync';
          
          // Force immediate loading with highest priority
          const highPriorityPreload = document.createElement('link');
          highPriorityPreload.rel = 'preload';
          highPriorityPreload.href = heroImage.src;
          highPriorityPreload.as = 'image';
          highPriorityPreload.setAttribute('fetchpriority', 'high');
          document.head.insertBefore(highPriorityPreload, document.head.firstChild);
        }

        // Services images get high priority
        const serviceImages = document.querySelectorAll('img[src*="/images/services/"]');
        serviceImages.forEach(img => {
          const image = img as HTMLImageElement;
          image.fetchPriority = 'high';
          image.loading = 'eager';
        });
      };

      // Implement WebP with fallback for optimal compression
      const implementWebPOptimization = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          const image = img as HTMLImageElement;
          const originalSrc = image.src;
          
          // Skip if already optimized or if it's a critical image
          if (originalSrc.includes('.webp') || originalSrc.includes('wedding.jpg')) {
            return;
          }

          // Create WebP version URL
          const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          
          // Test WebP support and fallback
          const testWebP = () => {
            return new Promise<boolean>((resolve) => {
              const webpTest = new Image();
              webpTest.onload = () => resolve(webpTest.height === 1);
              webpTest.onerror = () => resolve(false);
              webpTest.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
            });
          };

          testWebP().then(supportsWebP => {
            if (supportsWebP) {
              // Try loading WebP version
              const webpImage = new Image();
              webpImage.onload = () => {
                image.src = webpSrc;
              };
              webpImage.onerror = () => {
                // Keep original if WebP fails
                console.log('WebP fallback for:', originalSrc);
              };
              webpImage.src = webpSrc;
            }
          });
        });
      };

      // Advanced lazy loading with intersection observer
      const implementAdvancedLazyLoading = () => {
        const lazyImages = document.querySelectorAll('img:not([src*="wedding.jpg"]):not([src*="/images/services/"])');
        
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                
                // Progressive enhancement for lazy images
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.removeAttribute('data-src');
                }
                
                // Apply optimizations to newly loaded images
                img.loading = 'lazy';
                img.decoding = 'async';
                
                observer.unobserve(img);
              }
            });
          }, {
            rootMargin: '100px 0px', // Load images 100px before they enter viewport
            threshold: 0.1
          });

          lazyImages.forEach(img => imageObserver.observe(img));
        }
      };

      // Image dimension optimization for CLS prevention
      const preventLayoutShift = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          const image = img as HTMLImageElement;
          
          // Ensure images have proper aspect ratios to prevent CLS
          if (!image.style.aspectRatio && !image.width && !image.height) {
            // Set common aspect ratios based on image type
            if (image.src.includes('wedding') || image.src.includes('portfolio')) {
              image.style.aspectRatio = '16/9'; // Landscape photos
            } else if (image.src.includes('testimonial') || image.src.includes('avatar')) {
              image.style.aspectRatio = '1/1'; // Square avatars
            } else {
              image.style.aspectRatio = '4/3'; // Default ratio
            }
            
            // Ensure proper sizing
            image.style.width = '100%';
            image.style.height = 'auto';
            image.style.objectFit = 'cover';
          }
        });
      };

      // Image preloading strategy for next critical images
      const preloadNextCriticalImages = () => {
        const criticalImageUrls = [
          '/images/portfolio/wedding-1.jpg',
          '/images/portfolio/wedding-2.jpg',
          '/images/about/team.jpg',
          '/images/services/real-estate.jpg',
          '/images/services/family.jpg'
        ];

        criticalImageUrls.forEach((url, index) => {
          // Stagger preloading to avoid bandwidth congestion
          setTimeout(() => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = url;
            link.as = 'image';
            link.setAttribute('fetchpriority', index < 2 ? 'high' : 'low');
            document.head.appendChild(link);
          }, index * 300); // 300ms intervals
        });
      };

      // Responsive image optimization
      const optimizeResponsiveImages = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          const image = img as HTMLImageElement;
          
          // Add srcset for responsive images if not already present
          if (!image.srcset && image.src) {
            const baseSrc = image.src.replace(/\.(jpg|jpeg|png)$/i, '');
            const extension = image.src.match(/\.(jpg|jpeg|png)$/i)?.[0] || '.jpg';
            
            // Generate srcset for different screen densities and sizes
            const srcset = [
              `${baseSrc}_480w${extension} 480w`,
              `${baseSrc}_768w${extension} 768w`,
              `${baseSrc}_1200w${extension} 1200w`,
              `${baseSrc}_1920w${extension} 1920w`
            ].join(', ');
            
            image.srcset = srcset;
            image.sizes = '(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px';
          }
        });
      };

      // Execute optimizations in order
      prioritizeCriticalImages();
      preventLayoutShift();
      
      // Defer non-critical optimizations
      setTimeout(() => {
        implementWebPOptimization();
        implementAdvancedLazyLoading();
        preloadNextCriticalImages();
        optimizeResponsiveImages();
      }, 100);
    };

    // Image error handling and fallbacks
    const implementImageErrorHandling = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const image = img as HTMLImageElement;
        
        image.addEventListener('error', () => {
          // Try fallback strategies
          const originalSrc = image.src;
          
          // Strategy 1: Try different format
          if (originalSrc.includes('.webp')) {
            const fallbackSrc = originalSrc.replace('.webp', '.jpg');
            image.src = fallbackSrc;
          }
          // Strategy 2: Try placeholder if all fails
          else if (!originalSrc.includes('placeholder')) {
            image.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIExvYWRpbmc8L3RleHQ+PC9zdmc+';
            image.alt = 'Image loading...';
          }
        });
      });
    };

    // Initialize advanced image optimization
    implementAdvancedImageOptimization();
    implementImageErrorHandling();

    // Performance measurement for images
    if ('PerformanceObserver' in window) {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('Image LCP optimization result:', entry.startTime + 'ms');
          }
        }
      });
      
      paintObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }, []);

  return null;
};

export default AdvancedImageOptimizer;