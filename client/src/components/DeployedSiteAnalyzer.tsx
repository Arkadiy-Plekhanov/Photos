import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  cls: number;
  fid: number;
  ttfb: number;
  loadTime: number;
  domContentLoaded: number;
  resourceLoadTime: number;
}

interface SiteAnalysis {
  url: string;
  timestamp: string;
  metrics: PerformanceMetrics;
  status: 'loading' | 'success' | 'error';
  error?: string;
}

export default function DeployedSiteAnalyzer() {
  // Only show in development environment or when explicitly testing
  if (process.env.NODE_ENV === 'production' && !window.location.search.includes('debug=true')) {
    return null;
  }
  const [currentSite, setCurrentSite] = useState<SiteAnalysis | null>(null);
  const [deployedSite, setDeployedSite] = useState<SiteAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getCurrentSiteMetrics = (): PerformanceMetrics => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
    const lcp = 0; // Will be updated by observer
    
    return {
      fcp: Math.round(fcp),
      lcp: 0,
      cls: 0,
      fid: 0,
      ttfb: Math.round(navigation.responseStart - navigation.requestStart),
      loadTime: Math.round(navigation.loadEventEnd - navigation.navigationStart),
      domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart),
      resourceLoadTime: Math.round(navigation.loadEventEnd - navigation.navigationStart)
    };
  };

  const analyzeDeployedSite = async () => {
    setIsAnalyzing(true);
    const deployedUrl = 'https://arcadiaphotography.replit.app';
    
    try {
      // Create iframe to load deployed site and measure performance
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = deployedUrl;
      document.body.appendChild(iframe);

      const startTime = performance.now();
      
      await new Promise((resolve, reject) => {
        iframe.onload = () => {
          try {
            const loadTime = performance.now() - startTime;
            
            // Try to access iframe performance data
            let iframeMetrics: PerformanceMetrics = {
              fcp: 0,
              lcp: 0,
              cls: 0,
              fid: 0,
              ttfb: 0,
              loadTime: Math.round(loadTime),
              domContentLoaded: 0,
              resourceLoadTime: Math.round(loadTime)
            };

            try {
              const iframeWindow = iframe.contentWindow;
              if (iframeWindow && iframeWindow.performance) {
                const nav = iframeWindow.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
                const paint = iframeWindow.performance.getEntriesByType('paint');
                
                iframeMetrics = {
                  fcp: Math.round(paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0),
                  lcp: 0,
                  cls: 0,
                  fid: 0,
                  ttfb: Math.round(nav.responseStart - nav.requestStart),
                  loadTime: Math.round(nav.loadEventEnd - nav.navigationStart),
                  domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.navigationStart),
                  resourceLoadTime: Math.round(nav.loadEventEnd - nav.navigationStart)
                };
              }
            } catch (crossOriginError) {
              console.warn('Could not access iframe performance data:', crossOriginError);
              // Use basic load time measurement
            }

            setDeployedSite({
              url: deployedUrl,
              timestamp: new Date().toISOString(),
              metrics: iframeMetrics,
              status: 'success'
            });

            resolve(null);
          } catch (error) {
            reject(error);
          } finally {
            document.body.removeChild(iframe);
          }
        };

        iframe.onerror = () => {
          document.body.removeChild(iframe);
          reject(new Error('Failed to load deployed site'));
        };

        // Timeout after 10 seconds
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
          reject(new Error('Timeout loading deployed site'));
        }, 10000);
      });

    } catch (error) {
      setDeployedSite({
        url: deployedUrl,
        timestamp: new Date().toISOString(),
        metrics: {
          fcp: 0, lcp: 0, cls: 0, fid: 0, ttfb: 0,
          loadTime: 0, domContentLoaded: 0, resourceLoadTime: 0
        },
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    setIsAnalyzing(false);
  };

  const analyzCurrentSite = () => {
    const metrics = getCurrentSiteMetrics();
    setCurrentSite({
      url: window.location.href,
      timestamp: new Date().toISOString(),
      metrics,
      status: 'success'
    });
  };

  const getPerformanceScore = (metrics: PerformanceMetrics): { score: number; grade: string; color: string } => {
    const fcpScore = metrics.fcp < 1800 ? 100 : Math.max(0, 100 - (metrics.fcp - 1800) / 50);
    const ttfbScore = metrics.ttfb < 800 ? 100 : Math.max(0, 100 - (metrics.ttfb - 800) / 20);
    const loadScore = metrics.loadTime < 3000 ? 100 : Math.max(0, 100 - (metrics.loadTime - 3000) / 100);
    
    const score = Math.round((fcpScore + ttfbScore + loadScore) / 3);
    
    if (score >= 90) return { score, grade: 'A+', color: 'bg-green-500' };
    if (score >= 80) return { score, grade: 'A', color: 'bg-green-400' };
    if (score >= 70) return { score, grade: 'B', color: 'bg-yellow-500' };
    if (score >= 60) return { score, grade: 'C', color: 'bg-orange-500' };
    return { score, grade: 'D', color: 'bg-red-500' };
  };

  const MetricsDisplay = ({ analysis }: { analysis: SiteAnalysis }) => {
    const { score, grade, color } = getPerformanceScore(analysis.metrics);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{analysis.url.includes('replit.app') ? 'Deployed Site' : 'Development'}</h4>
          <Badge className={`${color} text-white`}>
            {grade} ({score}/100)
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">First Contentful Paint:</span>
            <span className="ml-2 font-mono">{analysis.metrics.fcp}ms</span>
          </div>
          <div>
            <span className="text-gray-600">Time to First Byte:</span>
            <span className="ml-2 font-mono">{analysis.metrics.ttfb}ms</span>
          </div>
          <div>
            <span className="text-gray-600">Load Time:</span>
            <span className="ml-2 font-mono">{analysis.metrics.loadTime}ms</span>
          </div>
          <div>
            <span className="text-gray-600">DOM Content Loaded:</span>
            <span className="ml-2 font-mono">{analysis.metrics.domContentLoaded}ms</span>
          </div>
        </div>
        
        {analysis.status === 'error' && (
          <div className="text-red-600 text-sm">
            Error: {analysis.error}
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          Measured at: {new Date(analysis.timestamp).toLocaleTimeString()}
        </div>
      </div>
    );
  };

  const ComparisonView = () => {
    if (!currentSite || !deployedSite) return null;

    const currentScore = getPerformanceScore(currentSite.metrics);
    const deployedScore = getPerformanceScore(deployedSite.metrics);
    
    const fcpImprovement = currentSite.metrics.fcp > 0 && deployedSite.metrics.fcp > 0
      ? ((currentSite.metrics.fcp - deployedSite.metrics.fcp) / currentSite.metrics.fcp * 100)
      : 0;

    return (
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-3">Performance Comparison</h4>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-gray-600">Performance Score</div>
            <div className="text-lg font-mono">
              {deployedScore.score} vs {currentScore.score}
            </div>
            <div className={`text-xs ${deployedScore.score > currentScore.score ? 'text-green-600' : 'text-red-600'}`}>
              {deployedScore.score > currentScore.score ? '↑ Better' : '↓ Worse'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-gray-600">FCP Improvement</div>
            <div className="text-lg font-mono">
              {fcpImprovement > 0 ? '+' : ''}{fcpImprovement.toFixed(1)}%
            </div>
            <div className={`text-xs ${fcpImprovement > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fcpImprovement > 0 ? '↑ Faster' : '↓ Slower'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-gray-600">Load Time</div>
            <div className="text-lg font-mono">
              {deployedSite.metrics.loadTime}ms
            </div>
            <div className="text-xs text-gray-500">vs {currentSite.metrics.loadTime}ms</div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    // Auto-analyze current site on component mount
    analyzCurrentSite();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-96 shadow-lg border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Performance Testing</CardTitle>
        </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={analyzCurrentSite} variant="outline" size="sm">
              Current
            </Button>
            <Button 
              onClick={analyzeDeployedSite} 
              disabled={isAnalyzing}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isAnalyzing ? 'Testing...' : 'Test Production'}
            </Button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {currentSite && (
              <div className="p-3 bg-gray-50 rounded text-xs">
                <MetricsDisplay analysis={currentSite} />
              </div>
            )}
            
            {deployedSite && (
              <div className="p-3 bg-blue-50 rounded text-xs">
                <MetricsDisplay analysis={deployedSite} />
              </div>
            )}
          </div>

          <ComparisonView />
        </div>
      </CardContent>
    </Card>
    </div>
  );
}