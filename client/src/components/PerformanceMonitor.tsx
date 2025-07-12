import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
}

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    const measurePerformance = () => {
      if ('performance' in window) {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigationEntry.loadEventEnd - navigationEntry.navigationStart;

        // Get paint timings
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        
        setMetrics({
          loadTime: Math.round(loadTime),
          firstContentfulPaint: fcp ? Math.round(fcp.startTime) : 0,
          largestContentfulPaint: 0, // Would need Web Vitals library for accurate LCP
          cumulativeLayoutShift: 0, // Would need Web Vitals library for accurate CLS
        });

        // Log performance metrics for debugging
        if (process.env.NODE_ENV === 'development') {
          console.log('Performance Metrics:', {
            loadTime: Math.round(loadTime),
            firstContentfulPaint: fcp ? Math.round(fcp.startTime) : 0,
          });
        }
      }
    };

    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, []);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development' || !metrics) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
      <div>Load: {metrics.loadTime}ms</div>
      <div>FCP: {metrics.firstContentfulPaint}ms</div>
    </div>
  );
};

export default PerformanceMonitor;