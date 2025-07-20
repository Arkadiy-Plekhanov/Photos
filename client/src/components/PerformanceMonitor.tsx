
import React, { useEffect } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production for real performance data
    if (process.env.NODE_ENV !== 'production') return;

    const collectMetrics = () => {
      try {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');

        const metrics: Partial<PerformanceMetrics> = {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        };

        // Collect LCP using PerformanceObserver
        if ('PerformanceObserver' in window) {
          // Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            metrics.largestContentfulPaint = lastEntry.startTime;

            // Send metrics to analytics
            sendMetricsToAnalytics(metrics as PerformanceMetrics);
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

          // Cumulative Layout Shift
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            metrics.cumulativeLayoutShift = clsValue;
          });
          clsObserver.observe({ type: 'layout-shift', buffered: true });

          // First Input Delay
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              metrics.firstInputDelay = (entry as any).processingStart - entry.startTime;
              sendMetricsToAnalytics(metrics as PerformanceMetrics);
            }
          });
          fidObserver.observe({ type: 'first-input', buffered: true });
        }

        // Send initial metrics after 5 seconds
        setTimeout(() => {
          sendMetricsToAnalytics(metrics as PerformanceMetrics);
        }, 5000);

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
    };
  }, []);

  return null; // This component doesn't render anything
}

function sendMetricsToAnalytics(metrics: PerformanceMetrics) {
  // In a real application, you would send this to your analytics service
  console.log('Performance Metrics:', {
    loadTime: Math.round(metrics.loadTime),
    firstContentfulPaint: Math.round(metrics.firstContentfulPaint),
    largestContentfulPaint: Math.round(metrics.largestContentfulPaint),
    cumulativeLayoutShift: metrics.cumulativeLayoutShift?.toFixed(3),
    firstInputDelay: Math.round(metrics.firstInputDelay || 0),
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    connection: (navigator as any).connection?.effectiveType || 'unknown'
  });

  // Optional: Send to your own analytics endpoint
  // fetch('/api/analytics/performance', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(metrics)
  // }).catch(() => {});
}
