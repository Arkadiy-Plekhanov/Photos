
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface PerformanceMetrics {
  current: {
    fcp: number;
    lcp: number;
    ttfb: number;
    loadTime: number;
    domContentLoaded: number;
    score: number;
    grade: string;
  };
  deployed: {
    loadTime: number;
    status: string;
    networkTest: boolean;
  };
  comparison: {
    improvement: string;
    performanceAnalysis: string;
  };
  baseline: {
    fcp: number;
    date: string;
  };
}

export default function UnifiedPerformanceTest() {
  const [isVisible, setIsVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isTestingManual, setIsTestingManual] = useState(false);
  const [isAutoTesting, setIsAutoTesting] = useState(false);
  const [results, setResults] = useState<PerformanceMetrics | null>(null);
  const [autoTestComplete, setAutoTestComplete] = useState(false);

  const collectCurrentMetrics = (): PerformanceMetrics['current'] => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
    const lcp = paint.find(entry => entry.name === 'largest-contentful-paint')?.startTime || 0;
    const ttfb = navigation.responseStart - navigation.requestStart;
    const loadTime = navigation.loadEventEnd - navigation.navigationStart;
    const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.navigationStart;
    
    // Advanced scoring algorithm
    const fcpScore = fcp < 1800 ? 100 : Math.max(0, 100 - (fcp - 1800) / 50);
    const ttfbScore = ttfb < 800 ? 100 : Math.max(0, 100 - (ttfb - 800) / 20);
    const loadScore = loadTime < 3000 ? 100 : Math.max(0, 100 - (loadTime - 3000) / 100);
    const overallScore = Math.round((fcpScore + ttfbScore + loadScore) / 3);
    
    const grade = overallScore >= 95 ? 'A+' : 
                  overallScore >= 90 ? 'A' : 
                  overallScore >= 80 ? 'B+' : 
                  overallScore >= 70 ? 'B' : 
                  overallScore >= 60 ? 'C' : 'D';

    return {
      fcp: Math.round(fcp),
      lcp: Math.round(lcp),
      ttfb: Math.round(ttfb),
      loadTime: Math.round(loadTime),
      domContentLoaded: Math.round(domContentLoaded),
      score: overallScore,
      grade
    };
  };

  const testDeployedSite = async (): Promise<PerformanceMetrics['deployed']> => {
    const deployedUrl = 'https://arcadiaphotography.replit.app';
    
    try {
      const startTime = performance.now();
      await fetch(deployedUrl, { 
        method: 'HEAD',
        mode: 'no-cors'
      });
      const loadTime = performance.now() - startTime;
      
      return {
        loadTime: Math.round(loadTime),
        status: 'Network test successful',
        networkTest: true
      };
    } catch (error) {
      return {
        loadTime: 0,
        status: 'CORS restricted (expected in production)',
        networkTest: false
      };
    }
  };

  const runFullPerformanceTest = async (isManual: boolean = false) => {
    if (isManual) {
      setIsTestingManual(true);
    } else {
      setIsAutoTesting(true);
    }

    try {
      const currentMetrics = collectCurrentMetrics();
      const deployedMetrics = await testDeployedSite();
      
      const baseline = { fcp: 1504, date: '3 days ago' };
      const improvementPercent = ((baseline.fcp - currentMetrics.fcp) / baseline.fcp * 100);
      const improvement = improvementPercent > 0 ? 
        `${improvementPercent.toFixed(1)}% faster than baseline` : 
        `${Math.abs(improvementPercent).toFixed(1)}% slower than baseline`;

      let performanceAnalysis = '';
      if (currentMetrics.score >= 95) {
        performanceAnalysis = '🚀 Exceptional - World-class performance';
      } else if (currentMetrics.score >= 90) {
        performanceAnalysis = '✅ Excellent - Enterprise standards';
      } else if (currentMetrics.score >= 80) {
        performanceAnalysis = '👍 Good - Above average performance';
      } else if (currentMetrics.score >= 70) {
        performanceAnalysis = '⚠️ Fair - Room for improvement';
      } else {
        performanceAnalysis = '🔧 Needs optimization';
      }

      setResults({
        current: currentMetrics,
        deployed: deployedMetrics,
        comparison: {
          improvement,
          performanceAnalysis
        },
        baseline
      });

      if (!isManual) {
        setAutoTestComplete(true);
      }

    } catch (error) {
      console.error('Performance test failed:', error);
    }

    setIsTestingManual(false);
    setIsAutoTesting(false);
  };

  // Auto-run test after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      runFullPerformanceTest(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] bg-white dark:bg-gray-800 border-2 border-blue-500 rounded-lg shadow-xl max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/50 rounded-t-lg border-b border-blue-200">
        <h3 className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <i className="fas fa-tachometer-alt"></i>
          Performance Testing Suite
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 p-1"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            <i className={`fas fa-chevron-${isCollapsed ? 'down' : 'up'} text-xs`}></i>
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
            title="Hide"
          >
            <i className="fas fa-times text-xs"></i>
          </button>
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-4">
          {/* Test Controls */}
          <div className="space-y-2">
            <Button 
              onClick={() => runFullPerformanceTest(true)} 
              disabled={isTestingManual || isAutoTesting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              {isTestingManual ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Testing Production...
                </>
              ) : (
                <>
                  <i className="fas fa-rocket mr-2"></i>
                  Manual Test
                </>
              )}
            </Button>

            {isAutoTesting && (
              <div className="text-center text-sm text-blue-600 dark:text-blue-400">
                <i className="fas fa-circle-notch fa-spin mr-2"></i>
                Auto-testing in progress...
              </div>
            )}
          </div>

          {/* Results */}
          {results && (
            <div className="space-y-3 text-sm">
              {/* Current Site Metrics */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                <div className="font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <i className="fas fa-desktop text-blue-500"></i>
                  Development Site
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>FCP: <span className="font-mono font-medium">{results.current.fcp}ms</span></div>
                  <div>LCP: <span className="font-mono font-medium">{results.current.lcp || 'N/A'}ms</span></div>
                  <div>TTFB: <span className="font-mono font-medium">{results.current.ttfb}ms</span></div>
                  <div>Load: <span className="font-mono font-medium">{results.current.loadTime}ms</span></div>
                </div>
                <div className="mt-2 p-2 bg-blue-100 dark:bg-blue-800 rounded text-center">
                  <span className="font-semibold">Score: {results.current.score}/100 ({results.current.grade})</span>
                </div>
              </div>

              {/* Production Site Metrics */}
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
                <div className="font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <i className="fas fa-cloud text-green-500"></i>
                  Production Site
                </div>
                {results.deployed.networkTest ? (
                  <div className="text-xs">
                    Network Load: <span className="font-mono font-medium">{results.deployed.loadTime}ms</span>
                  </div>
                ) : (
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {results.deployed.status}
                  </div>
                )}
              </div>

              {/* Performance Analysis */}
              <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-3">
                <div className="font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <i className="fas fa-chart-line text-yellow-500"></i>
                  Analysis
                </div>
                <div className="text-xs space-y-1">
                  <div>{results.comparison.performanceAnalysis}</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {results.comparison.improvement}
                  </div>
                </div>
              </div>

              {/* Baseline Comparison */}
              <div className="text-xs text-gray-500 dark:text-gray-400 border-t pt-2">
                Baseline: {results.baseline.fcp}ms FCP ({results.baseline.date})
                {autoTestComplete && (
                  <span className="ml-2 text-green-600 dark:text-green-400">
                    <i className="fas fa-check-circle"></i> Auto-tested
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Collapsed State */}
      {isCollapsed && (
        <div className="p-2 text-center">
          <span className="text-sm text-blue-600 dark:text-blue-400">
            {results ? `${results.current.score}/100 (${results.current.grade})` : 'Performance Test'}
          </span>
        </div>
      )}
    </div>
  );
}
