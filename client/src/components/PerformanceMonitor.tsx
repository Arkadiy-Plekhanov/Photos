import React from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

export default function PerformanceMonitor() {
  const { metrics, performanceScore, recommendations } = usePerformanceMonitor();

  // Show performance insights in development mode
  if (process.env.NODE_ENV === 'development' && performanceScore > 0) {
    // Visual performance indicator for development
    const getScoreColor = (score: number) => {
      if (score >= 80) return '#10b981'; // Green
      if (score >= 60) return '#f59e0b'; // Yellow
      return '#ef4444'; // Red
    };

    // Display floating performance indicator in development
    return (
      <div className="fixed top-20 right-4 z-50 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border text-xs font-mono max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: getScoreColor(performanceScore) }}
          />
          <span className="font-semibold">Performance: {performanceScore}/100</span>
        </div>
        
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="flex justify-between text-xs mb-1">
            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
            <span className="text-gray-600 dark:text-gray-400">
              {typeof value === 'number' ? Math.round(value) : value}
              {key.includes('Time') || key.includes('Paint') || key.includes('Delay') ? 'ms' : ''}
            </span>
          </div>
        ))}
        
        {recommendations.length > 0 && (
          <details className="mt-2">
            <summary className="cursor-pointer text-orange-600 dark:text-orange-400">
              Optimization Tips
            </summary>
            <ul className="mt-1 space-y-1">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-xs text-gray-600 dark:text-gray-400">• {rec}</li>
              ))}
            </ul>
          </details>
        )}
      </div>
    );
  }

  return null;
}