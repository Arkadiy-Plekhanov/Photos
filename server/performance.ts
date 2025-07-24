// Production performance middleware
import { Request, Response, NextFunction } from 'express';

export const performanceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Add response timing header before response starts
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    // Log slow requests in production (don't set headers after response sent)
    if (process.env.NODE_ENV === 'production' && duration > 1000) {
      console.warn(`Slow request: ${req.method} ${req.url} - ${duration}ms`);
    }
  });
  
  next();
};

export const etag = (req: Request, res: Response, next: NextFunction) => {
  // Enable ETags for better caching
  res.set('ETag', `"${Date.now()}"`);
  
  // Handle conditional requests
  if (req.headers['if-none-match'] === res.get('ETag')) {
    res.status(304).end();
    return;
  }
  
  next();
};