
import React from 'react';
import { motion } from 'framer-motion';
import { useLazyImage } from '../hooks/useLazyLoad';

interface LazyImageAdvancedProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  onLoad?: () => void;
  onError?: () => void;
}

export default function LazyImageAdvanced({
  src,
  alt,
  className = '',
  width,
  height,
  quality = 80,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  placeholder = 'blur',
  onLoad,
  onError
}: LazyImageAdvancedProps) {
  const {
    ref,
    imageSrc,
    imageLoaded,
    hasError,
    lqipSrc,
    srcSet,
    webpSrcSet,
    handleLoad,
    handleError,
    isIntersecting
  } = useLazyImage(src, {
    threshold: 0.1,
    rootMargin: priority ? '0px' : '50px',
    triggerOnce: true
  });

  // Handle callbacks
  React.useEffect(() => {
    if (imageLoaded && onLoad) onLoad();
  }, [imageLoaded, onLoad]);

  React.useEffect(() => {
    if (hasError && onError) onError();
  }, [hasError, onError]);

  if (hasError) {
    return (
      <div ref={ref} className={`bg-gray-100 flex items-center justify-center ${className}`}>
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
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* LQIP Background */}
      {placeholder === 'blur' && !imageLoaded && imageSrc && (
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url(${lqipSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
            transform: 'scale(1.05)'
          }}
          animate={{ opacity: imageLoaded ? 0 : 0.8 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Skeleton Animation */}
      {!imageSrc && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
        </div>
      )}

      {/* Main Image with WebP Support */}
      {imageSrc && (
        <picture>
          {/* WebP format for modern browsers */}
          <source
            srcSet={webpSrcSet}
            sizes={sizes}
            type="image/webp"
          />
          
          {/* Fallback JPEG */}
          <motion.img
            src={imageSrc}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            className={`relative z-20 w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={handleLoad}
            onError={handleError}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ 
              opacity: imageLoaded ? 1 : 0,
              scale: imageLoaded ? 1 : 1.02
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
  const { ref, isIntersecting } = useLazyImage(src || '', {
    threshold: 0.1,
    rootMargin: '100px'
  });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {isIntersecting && src ? (
        <iframe
          src={src}
          title={title}
          width={width}
          height={height}
          loading="lazy"
          className="w-full h-full"
          {...props}
        />
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded animate-pulse" />
            <span className="text-sm text-gray-500">Loading content...</span>
          </div>
        </div>
      )}
    </div>
  );
}
