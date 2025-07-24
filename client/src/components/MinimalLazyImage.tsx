// Minimal lazy loading with maximum efficiency
import { useState, useRef, useEffect } from 'react';

interface MinimalLazyImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  width?: number;
  height?: number;
}

const MinimalLazyImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  quality = 50,
  width = 1440,
  height = 960
}: MinimalLazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection observer for non-priority images
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  // Generate optimized image URL
  const optimizedSrc = src.includes('?') 
    ? `${src}&w=${width}&q=${quality}`
    : `${src}?w=${width}&q=${quality}`;

  // LQIP placeholder
  const placeholderSrc = src.includes('?')
    ? `${src.split('?')[0]}?w=20&q=10&auto=format&cs=srgb`
    : `${src}?w=20&q=10&auto=format&cs=srgb`;

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {/* LQIP Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
        style={{ backgroundImage: `url(${placeholderSrc})` }}
      />
      
      {/* Main Image */}
      {inView && (
        <img
          src={optimizedSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
      
      {/* Loading overlay */}
      {inView && !loaded && (
        <div className="absolute inset-0 bg-ocean-blue/20 animate-pulse" />
      )}
    </div>
  );
};

export default MinimalLazyImage;