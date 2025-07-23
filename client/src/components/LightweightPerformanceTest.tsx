import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  environment: string;
  grade: string;
  score: number;
  totalSize: string;
  javascript: string;
  css: string;
  images: string;
  fonts: string;
  cacheHit: string;
  resources: number;
  connection: string;
}

export default function LightweightPerformanceTest() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple performance calculation without heavy monitoring
    const calculateMetrics = () => {
      const resourceEntries = performance.getEntriesByType('resource');
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      // Estimate bundle sizes based on resource types
      let jsSize = 0;
      let cssSize = 0;
      let imageSize = 0;
      let fontSize = 0;
      
      resourceEntries.forEach((entry: any) => {
        const size = entry.transferSize || 0;
        if (entry.name.includes('.js')) jsSize += size;
        else if (entry.name.includes('.css')) cssSize += size;
        else if (entry.name.match(/\.(jpg|jpeg|png|webp|svg)/)) imageSize += size;
        else if (entry.name.match(/\.(woff|woff2|ttf)/)) fontSize += size;
      });
      
      const totalSize = jsSize + cssSize + imageSize + fontSize;
      
      // Calculate performance score based on metrics
      let score = 100;
      if (fcp > 2500) score -= 30;
      else if (fcp > 1800) score -= 15;
      if (loadTime > 3000) score -= 20;
      else if (loadTime > 2000) score -= 10;
      if (totalSize > 1000000) score -= 20; // 1MB
      if (resourceEntries.length > 50) score -= 10;
      
      const getGrade = (s: number) => {
        if (s >= 90) return 'A+';
        if (s >= 80) return 'A';
        if (s >= 70) return 'B';
        if (s >= 60) return 'C';
        return 'D';
      };
      
      setMetrics({
        environment: 'Development Environment',
        grade: getGrade(score),
        score: Math.max(0, score),
        totalSize: `${(totalSize / 1024).toFixed(1)} KB`,
        javascript: `${(jsSize / 1024).toFixed(1)} KB`,
        css: `${(cssSize / 1024).toFixed(1)} KB`,
        images: `${(imageSize / 1024).toFixed(1)} KB`,
        fonts: `${(fontSize / 1024).toFixed(1)} KB`,
        cacheHit: `${((resourceEntries.filter((r: any) => r.transferSize === 0).length / resourceEntries.length) * 100).toFixed(1)}%`,
        resources: resourceEntries.length,
        connection: (navigator as any).connection?.effectiveType || 'unknown'
      });
    };

    // Wait for page to load before calculating
    setTimeout(calculateMetrics, 3000);
  }, []);

  if (!metrics) return null;

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-20 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg cursor-pointer"
        style={{ zIndex: 10000, pointerEvents: 'auto', position: 'fixed' }}
      >
        📊 Test
      </button>
      
      {isVisible && (
        <div className="fixed bottom-16 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border max-w-sm" style={{ zIndex: 10000 }}>
          <div className="text-sm font-semibold mb-3">{metrics.environment}</div>
          <div className="text-lg font-bold mb-2">
            {metrics.score}/100 ({metrics.grade})
          </div>
          
          <div className="space-y-1 text-xs">
            <div><strong>Total Size:</strong> {metrics.totalSize}</div>
            <div><strong>JavaScript:</strong> {metrics.javascript}</div>
            <div><strong>CSS:</strong> {metrics.css}</div>
            <div><strong>Images:</strong> {metrics.images}</div>
            <div><strong>Fonts:</strong> {metrics.fonts}</div>
            <div><strong>Cache Hit:</strong> {metrics.cacheHit}</div>
            <div><strong>Resources:</strong> {metrics.resources}</div>
            <div><strong>Connection:</strong> {metrics.connection}</div>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="mt-3 text-xs text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}