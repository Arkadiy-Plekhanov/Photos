
import React, { useState, useRef, useEffect } from 'react';

interface WebPImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  lazy?: boolean;
  priority?: boolean;
}

export default function WebPImageOptimizer({
  src,
  alt,
  className = '',
  width,
  height,
  quality = 85,
  lazy = true,
  priority = false
}: WebPImageOptimizerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [imageSrc, setImageSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate optimized image URLs
  const generateSrcSet = (baseSrc: string) => {
    const sizes = [400, 800, 1200, 1600];
    return sizes.map(size => 
      `${baseSrc}?w=${size}&q=${quality}&fm=webp ${size}w`
    ).join(', ');
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority]);

  // Set image source when in view
  useEffect(() => {
    if (isInView) {
      setImageSrc(src);
    }
  }, [isInView, src]);

  // LQIP (Low Quality Image Placeholder)
  const lqipSrc = `${src}?w=20&q=20&blur=10`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* LQIP Background */}
      {!isLoaded && (
        <img
          src={lqipSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}
      
      {/* Main Image */}
      <img
        ref={imgRef}
        src={imageSrc}
        srcSet={isInView ? generateSrcSet(src) : undefined}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        style={{
          aspectRatio: width && height ? `${width} / ${height}` : undefined
        }}
      />
      
      {/* Loading indicator */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="animate-pulse w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      )}
    </div>
  );
}
