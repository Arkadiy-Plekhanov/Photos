import React, { useState, useEffect } from 'react';
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
}

export default function LazyImage({
  src,
  alt,
  className = '',
  placeholder,
  onLoad,
  onError,
  priority = false,
  sizes = '100vw'
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  // Generate LQIP (Low Quality Image Placeholder) from original image
  const generateLQIP = (originalSrc: string): string => {
    // Create a blurred, low-quality placeholder
    if (originalSrc.includes('unsplash')) {
      return `${originalSrc}&w=20&q=10&blur=10`;
    }
    return placeholder || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%23f0f0f0"/%3E%3C/svg%3E';
  };

  // Generate responsive srcSet for different screen densities
  const generateSrcSet = (originalSrc: string): string => {
    if (originalSrc.includes('unsplash')) {
      const baseUrl = originalSrc.split('?')[0];
      const params = new URLSearchParams(originalSrc.split('?')[1] || '');
      const width = params.get('w') || '800';
      const height = params.get('h') || '600';

      return [
        `${baseUrl}?w=${width}&h=${height}&q=75 1x`,
        `${baseUrl}?w=${parseInt(width) * 1.5}&h=${parseInt(height) * 1.5}&q=75 1.5x`,
        `${baseUrl}?w=${parseInt(width) * 2}&h=${parseInt(height) * 2}&q=75 2x`
      ].join(', ');
    }
    return src;
  };

  useEffect(() => {
    // Preload image if priority is set
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => setImageSrc(src);
      img.onerror = () => setError(true);
    } else {
      // Use Intersection Observer for lazy loading
      const img = new Image();
      img.src = src;
      img.onload = () => setImageSrc(src);
      img.onerror = () => setError(true);
    }
  }, [src, priority]);

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
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-gray-500 text-sm">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* LQIP Background */}
      {!loaded && imageSrc && (
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url(${generateLQIP(src)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
            transform: 'scale(1.1)'
          }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}

      {/* Skeleton Animation */}
      {!loaded && !imageSrc && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        />
      )}

      {/* Main Image */}
      {imageSrc && (
        <motion.img
          src={imageSrc}
          srcSet={generateSrcSet(src)}
          sizes={sizes}
          alt={alt}
          className={`relative z-20 w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ 
            opacity: loaded ? 1 : 0,
            scale: loaded ? 1 : 1.05
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
    </div>
  );
}