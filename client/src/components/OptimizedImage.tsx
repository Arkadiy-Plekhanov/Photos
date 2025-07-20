import React from 'react';
import ResponsiveImage from './ResponsiveImage';
import LazyImage from './LazyImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  webpSupport?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  strategy?: 'responsive' | 'lazy';
}

/**
 * Enterprise-grade optimized image component that automatically selects
 * the best strategy based on context and provides maximum performance
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  quality = 85,
  webpSupport = true,
  placeholder,
  onLoad,
  onError,
  strategy = 'responsive'
}: OptimizedImageProps) {
  
  // Auto-determine strategy based on context if not specified
  const getOptimalStrategy = (): 'responsive' | 'lazy' => {
    if (strategy !== 'responsive' && strategy !== 'lazy') {
      // Auto-detect: use responsive for hero/above-fold, lazy for gallery/below-fold
      if (priority || className.includes('hero') || className.includes('featured')) {
        return 'responsive';
      }
      return 'lazy';
    }
    return strategy;
  };

  const optimalStrategy = getOptimalStrategy();

  // Enhanced props for both components
  const commonProps = {
    src,
    alt,
    className,
    onLoad,
    onError,
    priority
  };

  if (optimalStrategy === 'responsive') {
    return (
      <ResponsiveImage
        {...commonProps}
        sizes={sizes}
        quality={quality}
        webpSupport={webpSupport}
      />
    );
  }

  return (
    <LazyImage
      {...commonProps}
      placeholder={placeholder}
      sizes={sizes}
    />
  );
}

// Helper function to generate optimal image URLs for Unsplash
export function generateOptimalImageUrl(
  baseUrl: string, 
  width: number, 
  height?: number, 
  quality: number = 85,
  format: 'webp' | 'jpg' = 'jpg'
): string {
  if (!baseUrl.includes('unsplash')) {
    return baseUrl;
  }

  const url = new URL(baseUrl.split('?')[0]);
  const params = new URLSearchParams();
  
  // Optimize parameters for faster loading
  params.set('w', Math.min(width, 1920).toString()); // Cap max width
  if (height) params.set('h', Math.min(height, 1080).toString());
  params.set('q', Math.min(quality, 90).toString()); // Cap quality for performance
  if (format === 'webp') params.set('fm', 'webp');
  params.set('fit', 'crop');
  params.set('crop', 'entropy');
  params.set('auto', 'format'); // Auto format selection
  params.set('cs', 'srgb'); // Color space optimization
  
  return `${url.toString()}?${params.toString()}`;
}

// Helper to generate responsive image sets
export function generateResponsiveSet(
  baseUrl: string, 
  widths: number[] = [400, 600, 800, 1024, 1280, 1600, 1920],
  quality: number = 85,
  format: 'webp' | 'jpg' = 'jpg'
): string {
  return widths
    .map(width => `${generateOptimalImageUrl(baseUrl, width, undefined, quality, format)} ${width}w`)
    .join(', ');
}