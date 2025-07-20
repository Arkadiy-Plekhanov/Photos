import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  webpSupport?: boolean;
}

export default function ResponsiveImage({
  src,
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  quality = 80,
  webpSupport = true
}: ResponsiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentFormat, setCurrentFormat] = useState<'webp' | 'jpg'>('webp');

  // Check WebP support
  const supportsWebP = () => {
    if (!webpSupport) return false;

    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  // Generate srcSet for different screen sizes and formats
  const generateSrcSet = (baseSrc: string, format: 'webp' | 'jpg' = 'jpg') => {
    if (baseSrc.includes('unsplash')) {
      const baseUrl = baseSrc.split('?')[0];
      const formatParam = format === 'webp' ? '&fm=webp' : '';

      return [
        `${baseUrl}?w=400&q=${quality}${formatParam} 400w`,
        `${baseUrl}?w=600&q=${quality}${formatParam} 600w`,
        `${baseUrl}?w=800&q=${quality}${formatParam} 800w`,
        `${baseUrl}?w=1024&q=${quality}${formatParam} 1024w`,
        `${baseUrl}?w=1280&q=${quality}${formatParam} 1280w`,
        `${baseUrl}?w=1600&q=${quality}${formatParam} 1600w`,
        `${baseUrl}?w=1920&q=${quality}${formatParam} 1920w`,
        `${baseUrl}?w=2400&q=${quality}${formatParam} 2400w`
      ].join(', ');
    }
    return baseSrc;
  };

  // Get the optimal src for the current viewport
  const getOptimalSrc = (baseSrc: string, format: 'webp' | 'jpg' = 'jpg') => {
    if (baseSrc.includes('unsplash')) {
      const width = Math.min(window.innerWidth * (window.devicePixelRatio || 1), 2400);
      const formatParam = format === 'webp' ? '&fm=webp' : '';
      const baseUrl = baseSrc.split('?')[0];
      return `${baseUrl}?w=${width}&q=${quality}${formatParam}`;
    }
    return baseSrc;
  };

  // Generate LQIP (Low Quality Image Placeholder)
  const getLQIP = (baseSrc: string) => {
    if (baseSrc.includes('unsplash')) {
      const baseUrl = baseSrc.split('?')[0];
      return `${baseUrl}?w=20&q=20&blur=50`;
    }
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3C/svg%3E';
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    if (currentFormat === 'webp') {
      // Fallback to JPEG if WebP fails
      setCurrentFormat('jpg');
    } else {
      setError(true);
    }
  };

  if (error) {
    return (
      <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-gray-500 text-sm">Image temporarily unavailable</span>
        </div>
      </div>
    );
  }

  const useWebP = supportsWebP() && webpSupport && currentFormat === 'webp';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* LQIP Background */}
      {!loaded && (
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${getLQIP(src)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(4px)',
            transform: 'scale(1.02)'
          }}
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      )}

      {/* Main Image with WebP support */}
      <picture>
        {useWebP && (
          <source
            srcSet={generateSrcSet(src, 'webp')}
            sizes={sizes}
            type="image/webp"
          />
        )}
        <motion.img
          src={getOptimalSrc(src, currentFormat)}
          srcSet={generateSrcSet(src, currentFormat)}
          sizes={sizes}
          alt={alt}
          className={`relative z-10 w-full h-full object-cover transition-all duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ 
            opacity: loaded ? 1 : 0,
            scale: loaded ? 1 : 1.02
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </picture>

      {/* Loading overlay */}
      {!loaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        />
      )}
    </div>
  );
}