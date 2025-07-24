import { useState, useRef, useEffect } from 'react';

interface IndustryLazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export default function IndustryLazyImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  sizes = '100vw',
  quality = 75
}: IndustryLazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate optimized URLs for Unsplash images
  const getOptimizedSrc = (originalSrc: string, q: number = quality): string => {
    if (originalSrc.includes('unsplash.com')) {
      const url = new URL(originalSrc.split('?')[0]);
      const params = new URLSearchParams();
      
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      params.set('q', Math.min(q, 85).toString());
      params.set('auto', 'format');
      params.set('fit', 'crop');
      
      return `${url.toString()}?${params.toString()}`;
    }
    return originalSrc;
  };

  // Generate LQIP (Low Quality Image Placeholder)
  const getLQIP = (originalSrc: string): string => {
    if (originalSrc.includes('unsplash.com')) {
      return getOptimizedSrc(originalSrc, 5).replace(/w=\d+/, 'w=20').replace(/h=\d+/, 'h=15');
    }
    // Fallback SVG placeholder
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width || 400} ${height || 300}'%3E%3Crect width='100%25' height='100%25' fill='%23f8fafc'/%3E%3C/svg%3E`;
  };

  // Generate responsive srcSet
  const getSrcSet = (originalSrc: string): string => {
    if (originalSrc.includes('unsplash.com')) {
      const widths = [400, 600, 800, 1200, 1600];
      return widths
        .map(w => `${getOptimizedSrc(originalSrc).replace(/w=\d+/, `w=${w}`)} ${w}w`)
        .join(', ');
    }
    return originalSrc;
  };

  // Native Intersection Observer for maximum performance
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Load 50px before entering viewport
        threshold: 0
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const optimizedSrc = getOptimizedSrc(src);
  const lqipSrc = getLQIP(src);
  const srcSet = getSrcSet(src);

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
    >
      {/* LQIP Placeholder - Always visible initially */}
      <img
        src={lqipSrc}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-0' : 'opacity-100'}`}
        style={{ filter: 'blur(5px)', transform: 'scale(1.1)' }}
      />
      
      {/* Main Image - Only loads when in view */}
      {inView && (
        <img
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={{ 
            contentVisibility: 'auto',
            contain: 'layout style paint'
          }}
        />
      )}
    </div>
  );
}