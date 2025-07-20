import { useState, useRef, useEffect } from 'react';

interface LazyImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
}

export default function LazyImageLoader({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  quality = 50 
}: LazyImageLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Ultra-low quality placeholder for instant loading
  const generateLQIP = (originalSrc: string) => {
    if (originalSrc.includes('unsplash')) {
      return originalSrc.replace(/w=\d+/, 'w=20').replace(/q=\d+/, 'q=10');
    }
    return originalSrc;
  };

  // High quality version for after loading
  const generateHQSrc = (originalSrc: string) => {
    if (originalSrc.includes('unsplash')) {
      return originalSrc.replace(/q=\d+/, `q=${quality}`);
    }
    return originalSrc;
  };

  useEffect(() => {
    if (!priority && imgRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { rootMargin: '100px' }
      );
      
      observer.observe(imgRef.current);
      return () => observer.disconnect();
    }
  }, [priority]);

  useEffect(() => {
    if (isInView) {
      const img = new Image();
      img.src = generateHQSrc(src);
      img.onload = () => setIsLoaded(true);
    }
  }, [isInView, src, quality]);

  if (!isInView) {
    return (
      <div 
        ref={imgRef}
        className={`${className} bg-gradient-to-br from-ocean-blue/20 to-ocean-teal/20 animate-pulse`}
        style={{ minHeight: '200px' }}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* LQIP background */}
      <img
        src={generateLQIP(src)}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        } blur-sm scale-110`}
      />
      
      {/* High quality image */}
      <img
        src={generateHQSrc(src)}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
}