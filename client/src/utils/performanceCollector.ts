
interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

class PerformanceCollector {
  private metrics: PerformanceMetric[] = [];
  private observers: Map<string, PerformanceObserver> = new Map();
  private batchSize = 10;
  private flushInterval = 30000; // 30 seconds

  constructor() {
    this.initializeObservers();
    this.scheduleFlush();
  }

  private initializeObservers() {
    // Core Web Vitals
    this.observeWebVitals();
    
    // Resource loading
    this.observeResources();
    
    // Navigation timing
    this.observeNavigation();
    
    // Long tasks
    this.observeLongTasks();
  }

  private observeWebVitals() {
    try {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.addMetric('FCP', entry.startTime, {
              entryType: entry.entryType
            });
          }
        });
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.set('fcp', fcpObserver);

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.addMetric('LCP', lastEntry.startTime, {
          element: lastEntry.element?.tagName || 'unknown',
          size: lastEntry.size || 0
        });
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', lcpObserver);

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.addMetric('FID', entry.processingStart - entry.startTime, {
            eventType: entry.name
          });
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.set('fid', fidObserver);

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.addMetric('CLS', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('cls', clsObserver);

    } catch (error) {
      console.warn('Some performance observers not supported:', error);
    }
  }

  private observeResources() {
    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.addMetric('Resource Load', entry.duration, {
          name: entry.name,
          type: entry.initiatorType,
          size: entry.transferSize || 0,
          fromCache: entry.transferSize === 0
        });
      });
    });
    resourceObserver.observe({ entryTypes: ['resource'] });
    this.observers.set('resource', resourceObserver);
  }

  private observeNavigation() {
    const navigationObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.addMetric('Navigation', entry.duration, {
          type: entry.type,
          redirectCount: entry.redirectCount,
          domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
          loadComplete: entry.loadEventEnd - entry.loadEventStart
        });
      });
    });
    navigationObserver.observe({ entryTypes: ['navigation'] });
    this.observers.set('navigation', navigationObserver);
  }

  private observeLongTasks() {
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.addMetric('Long Task', entry.duration, {
            attribution: entry.attribution?.map(attr => ({
              name: attr.name,
              containerType: attr.containerType,
              containerSrc: attr.containerSrc,
              containerId: attr.containerId,
              containerName: attr.containerName
            }))
          });
        });
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
      this.observers.set('longtask', longTaskObserver);
    } catch (error) {
      console.warn('Long task observer not supported:', error);
    }
  }

  private addMetric(name: string, value: number, metadata?: Record<string, any>) {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now(),
      metadata
    });

    // Auto-flush if batch size reached
    if (this.metrics.length >= this.batchSize) {
      this.flush();
    }
  }

  private async flush() {
    if (this.metrics.length === 0) return;

    const metricsToSend = [...this.metrics];
    this.metrics = [];

    try {
      // Send to analytics endpoint
      await this.sendMetrics(metricsToSend);
    } catch (error) {
      console.warn('Failed to send performance metrics:', error);
      // Re-add metrics for retry
      this.metrics.unshift(...metricsToSend);
    }
  }

  private async sendMetrics(metrics: PerformanceMetric[]) {
    if (process.env.NODE_ENV === 'development') {
      console.group('📊 Performance Metrics');
      metrics.forEach(metric => {
        console.log(`${metric.name}: ${metric.value.toFixed(2)}ms`, metric.metadata);
      });
      console.groupEnd();
      return;
    }

    // Send to your analytics service
    try {
      await fetch('/api/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metrics,
          session: this.getSessionId(),
          userAgent: navigator.userAgent,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          connection: this.getConnectionInfo()
        }),
      });
    } catch (error) {
      throw error;
    }
  }

  private scheduleFlush() {
    setInterval(() => {
      this.flush();
    }, this.flushInterval);

    // Flush on page unload
    window.addEventListener('beforeunload', () => {
      if (this.metrics.length > 0) {
        navigator.sendBeacon('/api/performance', JSON.stringify({
          metrics: this.metrics,
          session: this.getSessionId()
        }));
      }
    });
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('performance-session-id');
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('performance-session-id', sessionId);
    }
    return sessionId;
  }

  private getConnectionInfo() {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
    }
    return null;
  }

  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  public clearMetrics(): void {
    this.metrics = [];
  }

  public destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.clearMetrics();
  }
}

export const performanceCollector = new PerformanceCollector();
export type { PerformanceMetric };
