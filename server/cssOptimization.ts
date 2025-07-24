// CSS optimization middleware to handle render-blocking CSS
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

export const cssOptimizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Inline critical CSS for main route
  if (req.url === '/' || req.url === '/index.html') {
    try {
      const htmlPath = path.join(process.cwd(), 'dist/public/index.html');
      
      if (fs.existsSync(htmlPath)) {
        let html = fs.readFileSync(htmlPath, 'utf8');
        
        // Find and inline critical CSS
        const cssPath = path.join(process.cwd(), 'dist/public/assets');
        if (fs.existsSync(cssPath)) {
          const cssFiles = fs.readdirSync(cssPath).filter(file => file.startsWith('index-') && file.endsWith('.css'));
          
          if (cssFiles.length > 0) {
            const criticalCssPath = path.join(cssPath, cssFiles[0]);
            const criticalCss = fs.readFileSync(criticalCssPath, 'utf8');
            
            // Inline critical CSS and make original CSS non-blocking
            html = html.replace(
              /<link[^>]*rel="stylesheet"[^>]*href="[^"]*index-[^"]*\.css"[^>]*>/,
              `<style>${criticalCss}</style>`
            );
          }
        }
        
        res.send(html);
        return;
      }
    } catch (error) {
      console.warn('CSS optimization failed, falling back to default:', error);
    }
  }
  
  next();
};