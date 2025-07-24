
import { useState, useEffect, useRef, useCallback } from 'react';

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  fallbackDelay?: number;
}

interface UseLazyLoadReturn {
  ref: React.RefObject<HTMLElement>;
  isIntersecting: boolean;
  isLoaded: boolean;
  load: () => void;
}

export const useLazyLoad = ({
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  fallbackDelay = 300
}: UseLazyLoadOptions = {}): UseLazyLoadReturn => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const load = useCallback(() => {
    setIsLoaded(true);
    if (triggerOnce && observerRef.current) {
      observerRef.current.disconnect();
    }
  }, [triggerOnce]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setTimeout(() => {
        setIsIntersecting(true);
        load();
      }, fallbackDelay);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          load();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, load, fallbackDelay]);

  return {
    ref,
    isIntersecting,
    isLoaded,
    load
  };
};

// Enhanced image lazy loading with WebP support and LQIP
export const useLazyImage = (src: string, options: UseLazyLoadOptions = {}) => {
  const { ref, isIntersecting, isLoaded } = useLazyLoad(options);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate LQIP (Low Quality Image Placeholder)
  const generateLQIP = useCallback((originalSrc: string): string => {
    if (originalSrc.includes('unsplash')) {
      return `${originalSrc}&w=20&q=10&blur=50`;
    }
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3C/svg%3E';
  }, []);

  // Generate responsive srcSet
  const generateSrcSet = useCallback((originalSrc: string, format: 'webp' | 'jpg' = 'jpg'): string => {
    if (originalSrc.includes('unsplash')) {
      const baseUrl = originalSrc.split('?')[0];
      const formatParam = format === 'webp' ? '&fm=webp' : '';
      
      return [
        `${baseUrl}?w=400&q=80${formatParam} 400w`,
        `${baseUrl}?w=800&q=80${formatParam} 800w`,
        `${baseUrl}?w=1200&q=80${formatParam} 1200w`,
        `${baseUrl}?w=1600&q=80${formatParam} 1600w`,
        `${baseUrl}?w=2000&q=75${formatParam} 2000w`
      ].join(', ');
    }
    return originalSrc;
  }, []);

  useEffect(() => {
    if (isIntersecting && src && !imageSrc) {
      setImageSrc(src);
    }
  }, [isIntersecting, src, imageSrc]);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  return {
    ref,
    imageSrc,
    imageLoaded,
    hasError,
    lqipSrc: generateLQIP(src),
    srcSet: generateSrcSet(imageSrc || src),
    webpSrcSet: generateSrcSet(imageSrc || src, 'webp'),
    handleLoad,
    handleError,
    isIntersecting
  };
};
