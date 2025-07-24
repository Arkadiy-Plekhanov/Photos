
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  width?: number;
  height?: number;
}

export default function LazyImage({
  src,
  alt,
  className = '',
  placeholder,
  onLoad,
  onError,
  priority = false,
  sizes = '100vw',
  quality = 85,
  width,
  height
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate optimized image URLs
  const generateOptimizedSrc = (originalSrc: string, q: number = quality): string => {
    if (originalSrc.includes('unsplash')) {
      const url = new URL(originalSrc.split('?')[0]);
      const params = new URLSearchParams();
      
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      params.set('q', Math.min(q, 90).toString());
      params.set('fm', 'webp');
      params.set('auto', 'format');
      params.set('fit', 'crop');
      params.set('crop', 'entropy');
      
      return `${url.toString()}?${params.toString()}`;
    }
    return originalSrc;
  };

  // Generate LQIP (Low Quality Image Placeholder)
  const generateLQIP = (originalSrc: string): string => {
    if (originalSrc.includes('unsplash')) {
      return generateOptimizedSrc(originalSrc, 10).replace(/w=\d+/, 'w=20').replace(/h=\d+/, 'h=15');
    }
    return placeholder || `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width || 400} ${height || 300}"%3E%3Crect width="${width || 400}" height="${height || 300}" fill="%23f3f4f6"/%3E%3C/svg%3E`;
  };

  // Generate responsive srcSet
  const generateSrcSet = (originalSrc: string): string => {
    if (originalSrc.includes('unsplash')) {
      const widths = [400, 600, 800, 1024, 1280, 1600, 1920];
      return widths
        .map(w => `${generateOptimizedSrc(originalSrc).replace(/w=\d+/, `w=${w}`)} ${w}w`)
        .join(', ');
    }
    return originalSrc;
  };

  // Intersection Observer for non-priority images
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
  };

  if (error) {
    return (
      <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-gray-500">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* LQIP Background - shows immediately */}
      {!loaded && (
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url(${generateLQIP(src)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
            transform: 'scale(1.05)'
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      )}

      {/* Skeleton loader for non-intersecting images */}
      {!isInView && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      )}

      {/* Main image with WebP support */}
      {isInView && (
        <picture>
          {/* WebP format for modern browsers */}
          <source
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            type="image/webp"
          />
          
          {/* Fallback JPEG/PNG */}
          <motion.img
            src={generateOptimizedSrc(src)}
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            className={`relative z-20 w-full h-full object-cover transition-opacity duration-500 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={handleLoad}
            onError={handleError}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ 
              opacity: loaded ? 1 : 0,
              scale: loaded ? 1 : 1.02
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </picture>
      )}
    </div>
  );
}

// Utility component for lazy iframes
export function LazyIframe({
  src,
  title,
  className = '',
  width,
  height,
  ...props
}: React.IframeHTMLAttributes<HTMLIFrameElement>) {
  const [isInView, setIsInView] = useState(false);
  const iframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={iframeRef} className={`relative ${className}`}>
      {!isInView ? (
        <div 
          className="bg-gray-100 flex items-center justify-center animate-pulse"
          style={{ width, height: height || 400 }}
        >
          <span className="text-gray-500">Loading content...</span>
        </div>
      ) : (
        <iframe
          src={src}
          title={title}
          width={width}
          height={height}
          loading="lazy"
          className="w-full h-full"
          {...props}
        />
      )}
    </div>
  );
}
