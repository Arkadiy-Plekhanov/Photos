// Font proxy middleware for better caching control
import { Request, Response, NextFunction } from 'express';

export const fontProxyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Proxy Google Fonts requests to add proper cache headers
  if (req.url.startsWith('/fonts-proxy/')) {
    const fontUrl = req.url.replace('/fonts-proxy/', 'https://fonts.googleapis.com/');
    
    // Set long cache headers for font files
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.set('Access-Control-Allow-Origin', '*');
    
    // Fetch and proxy the font file
    fetch(fontUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Font fetch failed: ${response.status}`);
        }
        res.set('Content-Type', response.headers.get('content-type') || 'text/css');
        return response.text();
      })
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        console.error('Font proxy error:', error);
        res.status(404).send('Font not found');
      });
    
    return;
  }
  
  next();
};