import express from "express";
import compression from "compression";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// High-performance compression with optimal settings
app.use(compression({
  level: 9, // Maximum compression
  threshold: 1024, // Compress files over 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }
}));

// Ultra-performance headers with resource hints
app.use((req, res, next) => {
  // Aggressive caching for static assets
  if (req.url.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    res.set('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
    res.set('ETag', `"v2-${Date.now()}-${req.url}"`);
    
    // Preload hints for critical resources
    if (req.url.includes('wedding.jpg')) {
      res.set('Link', '</images/services/real-estate.jpg>; rel=prefetch, </images/services/family.jpg>; rel=prefetch');
    }
  } else if (req.url.endsWith('.html') || req.url === '/') {
    res.set('Cache-Control', 'public, max-age=1800'); // 30 minutes for HTML
    
    // Critical resource preload headers
    res.set('Link', [
      '</images/services/wedding.jpg>; rel=preload; as=image; fetchpriority=high',
      '</assets/index-BPfKS6Xo.js>; rel=preload; as=script',
      '</assets/index-zQ2Q43Ey.css>; rel=preload; as=style'
    ].join(', '));
  }
  
  // Performance and security headers
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('X-XSS-Protection', '1; mode=block');
  res.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  
  next();
});

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Simple logging for API requests
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    });
  }
  next();
});

// Register API routes
registerRoutes(app);

// Start the server first
const PORT = parseInt(process.env.PORT || '5000', 10);
const server = app.listen(PORT, "0.0.0.0", () => {
  log(`serving on port ${PORT}`);
});

// Serve static files from public directory in both dev and prod
app.use(express.static('public'));

// Setup Vite in development mode
if (process.env.NODE_ENV === "development") {
  setupVite(app, server);
} else {
  serveStatic(app);
}