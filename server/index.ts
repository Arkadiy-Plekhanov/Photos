import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { performanceMiddleware } from "./performance";
import { fontProxyMiddleware } from "./fontProxy";

const app = express();

// Add performance monitoring
app.use(performanceMiddleware);

// Add font proxy for better caching
app.use(fontProxyMiddleware);

// Enable high-performance compression for production (70% size reduction)
app.use(compression({
  level: process.env.NODE_ENV === 'production' ? 9 : 6, // Maximum compression in production
  threshold: 1024, // Only compress responses larger than 1KB
  filter: (req, res) => {
    // Don't compress images and videos (already compressed)
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Compress all text-based content
    return compression.filter(req, res);
  },

}));

// Add expires headers for static assets
app.use((req, res, next) => {
  // Set cache headers for static assets
  if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    // Cache static assets for 1 year
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
    res.set('Expires', new Date(Date.now() + 31536000000).toUTCString());
  } else if (req.url.match(/\.(html|htm)$/)) {
    // Cache HTML for 1 hour
    res.set('Cache-Control', 'public, max-age=3600');
    res.set('Expires', new Date(Date.now() + 3600000).toUTCString());
  }
  
  // Add cache headers for external font resources via proxy
  if (req.url.includes('fonts.googleapis.com')) {
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Security and performance headers
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('X-XSS-Protection', '1; mode=block');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Performance optimizations
  if (process.env.NODE_ENV === 'production') {
    res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    // Add preload hints for critical resources
    if (req.url === '/') {
      res.set('Link', [
        '</assets/index.js>; rel=preload; as=script',
        '</assets/index.css>; rel=preload; as=style',
        '<https://fonts.googleapis.com>; rel=preconnect',
        '<https://images.unsplash.com>; rel=dns-prefetch'
      ].join(', '));
    }
  }
  
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      
      // Enhanced logging with sensitive data filtering
      if (capturedJsonResponse) {
        const sanitizedResponse = sanitizeSensitiveData(capturedJsonResponse);
        logLine += ` :: ${JSON.stringify(sanitizedResponse)}`;
      }

      // Log request headers for debugging (without sensitive info)
      const sanitizedHeaders = sanitizeSensitiveData(req.headers);
      if (res.statusCode >= 400) {
        logLine += ` | Headers: ${JSON.stringify(sanitizedHeaders)}`;
      }

      // Truncate if too long
      if (logLine.length > 200) {
        logLine = logLine.slice(0, 199) + "…";
      }

      // Color-coded logging based on status
      if (res.statusCode >= 500) {
        log(`🔴 ${logLine}`);
      } else if (res.statusCode >= 400) {
        log(`🟡 ${logLine}`);
      } else if (res.statusCode >= 300) {
        log(`🔵 ${logLine}`);
      } else {
        log(`🟢 ${logLine}`);
      }

      // Performance monitoring
      if (duration > 1000) {
        log(`⚠️  SLOW REQUEST: ${req.method} ${path} took ${duration}ms`);
      }
    }
  });

  next();
});

// Utility function to sanitize sensitive data from logs
function sanitizeSensitiveData(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;
  
  const sensitiveKeys = [
    'password', 'token', 'secret', 'key', 'authorization', 
    'cookie', 'stripe', 'payment', 'card', 'cvv', 'ssn',
    'email', 'phone', 'address'
  ];
  
  const sanitized = Array.isArray(obj) ? [] : {};
  
  for (const [key, value] of Object.entries(obj)) {
    const keyLower = key.toLowerCase();
    const isSensitive = sensitiveKeys.some(sensitiveKey => 
      keyLower.includes(sensitiveKey)
    );
    
    if (isSensitive) {
      (sanitized as any)[key] = '***REDACTED***';
    } else if (typeof value === 'object' && value !== null) {
      (sanitized as any)[key] = sanitizeSensitiveData(value);
    } else {
      (sanitized as any)[key] = value;
    }
  }
  
  return sanitized;
}

(async () => {
  registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  const server = app.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
})();
