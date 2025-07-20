import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
