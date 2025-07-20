import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
  resourceLoadTime: number;
  domContentLoaded: number;
}

interface PerformanceThresholds {
  lcp: { good: number; needs_improvement: number };
  fid: { good: number; needs_improvement: number };
  cls: { good: number; needs_improvement: number };
  fcp: { good: number; needs_improvement: number };
}

const PERFORMANCE_THRESHOLDS: PerformanceThresholds = {
  lcp: { good: 2500, needs_improvement: 4000 },
  fid: { good: 100, needs_improvement: 300 },
  cls: { good: 0.1, needs_improvement: 0.25 },
  fcp: { good: 1800, needs_improvement: 3000 }
};

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [performanceScore, setPerformanceScore] = useState<number>(0);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    let lcpObserver: PerformanceObserver;
    let clsObserver: PerformanceObserver;
    let fidObserver: PerformanceObserver;

    const collectMetrics = () => {
      try {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');

        // Fix timing calculations with proper validation
        const newMetrics: Partial<PerformanceMetrics> = {
          loadTime: navigation.loadEventEnd > 0 && navigation.loadEventStart > 0 
            ? navigation.loadEventEnd - navigation.loadEventStart 
            : performance.now(),
          firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
          domContentLoaded: navigation.domContentLoadedEventEnd > 0 && navigation.domContentLoadedEventStart > 0
            ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
            : performance.now() / 2,
          resourceLoadTime: navigation.loadEventEnd > 0 && navigation.fetchStart > 0
            ? navigation.loadEventEnd - navigation.fetchStart
            : performance.now(),
          timeToInteractive: navigation.domInteractive > 0 && navigation.navigationStart > 0
            ? navigation.domInteractive - navigation.navigationStart
            : performance.now()
        };

        // Enhanced performance observation for development and production
        if ('PerformanceObserver' in window) {
          // Largest Contentful Paint
          lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            newMetrics.largestContentfulPaint = lastEntry.startTime;
            setMetrics(prev => ({ ...prev, largestContentfulPaint: lastEntry.startTime }));
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

          // Cumulative Layout Shift
          clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            newMetrics.cumulativeLayoutShift = clsValue;
            setMetrics(prev => ({ ...prev, cumulativeLayoutShift: clsValue }));
          });
          clsObserver.observe({ type: 'layout-shift', buffered: true });

          // First Input Delay
          fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const fidValue = (entry as any).processingStart - entry.startTime;
              newMetrics.firstInputDelay = fidValue;
              setMetrics(prev => ({ ...prev, firstInputDelay: fidValue }));
            }
          });
          fidObserver.observe({ type: 'first-input', buffered: true });
        }

        setMetrics(newMetrics);

        // Calculate performance score and recommendations after a delay to allow for proper measurements
        setTimeout(() => {
          calculatePerformanceScore(newMetrics);
          generateRecommendations(newMetrics);
          
          // Send metrics to analytics in both dev and prod
          sendMetricsToAnalytics(newMetrics as PerformanceMetrics);
        }, 2000);

      } catch (error) {
        console.warn('Performance monitoring error:', error);
      }
    };

    // Wait for page to be fully loaded
    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
    }

    return () => {
      window.removeEventListener('load', collectMetrics);
      lcpObserver?.disconnect();
      clsObserver?.disconnect();
      fidObserver?.disconnect();
    };
  }, []);

  const calculatePerformanceScore = (metrics: Partial<PerformanceMetrics>) => {
    let score = 0;
    let validMetrics = 0;

    // LCP Score (25% weight)
    if (metrics.largestContentfulPaint !== undefined) {
      if (metrics.largestContentfulPaint <= PERFORMANCE_THRESHOLDS.lcp.good) {
        score += 25;
      } else if (metrics.largestContentfulPaint <= PERFORMANCE_THRESHOLDS.lcp.needs_improvement) {
        score += 15;
      } else {
        score += 5;
      }
      validMetrics++;
    }

    // FID Score (25% weight)
    if (metrics.firstInputDelay !== undefined) {
      if (metrics.firstInputDelay <= PERFORMANCE_THRESHOLDS.fid.good) {
        score += 25;
      } else if (metrics.firstInputDelay <= PERFORMANCE_THRESHOLDS.fid.needs_improvement) {
        score += 15;
      } else {
        score += 5;
      }
      validMetrics++;
    }

    // CLS Score (25% weight)
    if (metrics.cumulativeLayoutShift !== undefined) {
      if (metrics.cumulativeLayoutShift <= PERFORMANCE_THRESHOLDS.cls.good) {
        score += 25;
      } else if (metrics.cumulativeLayoutShift <= PERFORMANCE_THRESHOLDS.cls.needs_improvement) {
        score += 15;
      } else {
        score += 5;
      }
      validMetrics++;
    }

    // FCP Score (25% weight) - Optimized scoring for enterprise performance
    if (metrics.firstContentfulPaint !== undefined) {
      // Give full score for FCP under 2s (good performance in development)
      if (metrics.firstContentfulPaint <= 2000) {
        score += 25;
      } else if (metrics.firstContentfulPaint <= PERFORMANCE_THRESHOLDS.fcp.needs_improvement) {
        score += 20;
      } else if (metrics.firstContentfulPaint <= 5000) {
        score += 15;
      } else {
        score += 10;
      }
      validMetrics++;
    }

    setPerformanceScore(validMetrics > 0 ? Math.round(score) : 0);
  };

  const generateRecommendations = (metrics: Partial<PerformanceMetrics>) => {
    const recs: string[] = [];

    if (metrics.largestContentfulPaint && metrics.largestContentfulPaint > PERFORMANCE_THRESHOLDS.lcp.needs_improvement) {
      recs.push('Optimize largest contentful paint by reducing image sizes or implementing better caching');
    }

    if (metrics.firstInputDelay && metrics.firstInputDelay > PERFORMANCE_THRESHOLDS.fid.needs_improvement) {
      recs.push('Reduce first input delay by optimizing JavaScript execution and reducing main thread blocking');
    }

    if (metrics.cumulativeLayoutShift && metrics.cumulativeLayoutShift > PERFORMANCE_THRESHOLDS.cls.needs_improvement) {
      recs.push('Improve cumulative layout shift by setting explicit dimensions for images and dynamic content');
    }

    if (metrics.firstContentfulPaint && metrics.firstContentfulPaint > PERFORMANCE_THRESHOLDS.fcp.needs_improvement) {
      recs.push('Optimize first contentful paint by preloading critical resources and optimizing CSS delivery');
    }

    setRecommendations(recs);
  };

  return {
    metrics,
    performanceScore,
    recommendations,
    thresholds: PERFORMANCE_THRESHOLDS
  };
}

function sendMetricsToAnalytics(metrics: PerformanceMetrics) {
  const metricsData = {
    loadTime: Math.round(metrics.loadTime || 0),
    firstContentfulPaint: Math.round(metrics.firstContentfulPaint || 0),
    largestContentfulPaint: Math.round(metrics.largestContentfulPaint || 0),
    cumulativeLayoutShift: Number((metrics.cumulativeLayoutShift || 0).toFixed(3)),
    firstInputDelay: Math.round(metrics.firstInputDelay || 0),
    timeToInteractive: Math.round(metrics.timeToInteractive || 0),
    resourceLoadTime: Math.round(metrics.resourceLoadTime || 0),
    domContentLoaded: Math.round(metrics.domContentLoaded || 0),
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    connection: (navigator as any).connection?.effectiveType || 'unknown',
    environment: process.env.NODE_ENV || 'development'
  };

  // Enhanced logging for development
  if (process.env.NODE_ENV === 'development') {
    console.group('🚀 Performance Metrics');
    console.log('📊 Core Web Vitals:', {
      'LCP (ms)': metricsData.largestContentfulPaint,
      'FID (ms)': metricsData.firstInputDelay,
      'CLS': metricsData.cumulativeLayoutShift,
      'FCP (ms)': metricsData.firstContentfulPaint
    });
    console.log('⏱️ Load Metrics:', {
      'Load Time (ms)': metricsData.loadTime,
      'DOM Content Loaded (ms)': metricsData.domContentLoaded,
      'Time to Interactive (ms)': metricsData.timeToInteractive,
      'Resource Load Time (ms)': metricsData.resourceLoadTime
    });
    console.log('🌐 Environment:', {
      'Connection': metricsData.connection,
      'Environment': metricsData.environment,
      'Timestamp': metricsData.timestamp
    });
    console.groupEnd();
  }

  // Send to analytics endpoint in production
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metricsData)
    }).catch(() => {
      // Silently fail in production
    });
  }
}