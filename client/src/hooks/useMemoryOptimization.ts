
import { useEffect, useCallback, useRef } from 'react';

interface MemoryOptimizationOptions {
  cleanupInterval?: number;
  maxCacheSize?: number;
}

export function useMemoryOptimization(options: MemoryOptimizationOptions = {}) {
  const { cleanupInterval = 30000, maxCacheSize = 50 } = options;
  const cacheRef = useRef<Map<string, any>>(new Map());
  const cleanupTimeoutRef = useRef<NodeJS.Timeout>();

  // Cleanup function
  const cleanup = useCallback(() => {
    // Clear image object URLs to prevent memory leaks
    const images = document.querySelectorAll('img[src^="blob:"]');
    images.forEach((img) => {
      const src = (img as HTMLImageElement).src;
      if (src.startsWith('blob:')) {
        URL.revokeObjectURL(src);
      }
    });

    // Clear cache if too large
    if (cacheRef.current.size > maxCacheSize) {
      const entries = Array.from(cacheRef.current.entries());
      const toRemove = entries.slice(0, entries.length - maxCacheSize);
      toRemove.forEach(([key]) => {
        cacheRef.current.delete(key);
      });
    }

    // Force garbage collection if available
    if ('gc' in window && typeof window.gc === 'function') {
      window.gc();
    }
  }, [maxCacheSize]);

  // Set up cleanup interval
  useEffect(() => {
    cleanupTimeoutRef.current = setInterval(cleanup, cleanupInterval);
    
    return () => {
      if (cleanupTimeoutRef.current) {
        clearInterval(cleanupTimeoutRef.current);
      }
      cleanup();
    };
  }, [cleanup, cleanupInterval]);

  // Memory-aware cache operations
  const setCache = useCallback((key: string, value: any) => {
    cacheRef.current.set(key, value);
    if (cacheRef.current.size > maxCacheSize) {
      const firstKey = cacheRef.current.keys().next().value;
      cacheRef.current.delete(firstKey);
    }
  }, [maxCacheSize]);

  const getCache = useCallback((key: string) => {
    return cacheRef.current.get(key);
  }, []);

  return { setCache, getCache, cleanup };
}
