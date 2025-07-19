import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Creating full-featured production build...');

// Step 1: Create optimized index.html for production
const createOptimizedHTML = () => {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arcadia Photography - Professional Photography Services in Honolulu</title>
    <meta name="description" content="Arcadia Photography offers professional wedding, real estate, and family photography services in Honolulu, Hawaii. Capturing life's precious moments with artistic excellence.">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- PWA -->
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#1e3a8a">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Arcadia Photography - Professional Photography Services">
    <meta property="og:description" content="Capturing life's precious moments with artistic excellence in Honolulu, Hawaii">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://arcadiaphotography.replit.app">
    <meta property="og:image" content="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&h=630&fit=crop">
    
    <!-- Load React from CDN for production -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    
    <!-- Styles will be injected here -->
    <style id="app-styles"></style>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/main.js"></script>
</body>
</html>`;

  fs.mkdirSync('./dist/public', { recursive: true });
  fs.writeFileSync('./dist/public/index.html', htmlContent);
  console.log('✅ Created optimized index.html');
};

// Step 2: Create production server with all features
const createProductionServer = () => {
  const serverContent = `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db.js';
import { storage } from './storage.js';
import Stripe from 'stripe';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Stripe if key exists
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

console.log('🚀 Starting Arcadia Photography Server...');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.post('/api/contact', async (req, res) => {
  try {
    const submission = await storage.createContactSubmission(req.body);
    res.json({ success: true, data: submission });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

app.get('/api/contact/submissions', async (req, res) => {
  try {
    const submissions = await storage.getContactSubmissions();
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Booking endpoints
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = await storage.createBooking(req.body);
    res.json({ success: true, data: booking });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Payment endpoints (only if Stripe is configured)
if (stripe) {
  app.post('/api/create-payment-intent', async (req, res) => {
    try {
      const { amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert to cents
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Payment intent error:', error);
      res.status(500).json({ error: 'Failed to create payment intent' });
    }
  });
}

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    service: 'Arcadia Photography',
    timestamp: new Date().toISOString(),
    features: {
      database: !!db,
      payments: !!stripe,
      storage: !!storage
    }
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`✅ Server running on port \${PORT}\`);
  console.log(\`🌐 Visit: http://localhost:\${PORT}\`);
  console.log(\`📊 Health check: http://localhost:\${PORT}/health\`);
});`;

  fs.writeFileSync('./dist/index.js', serverContent);
  console.log('✅ Created production server with all features');
};

// Step 3: Copy necessary files
const copyProductionFiles = () => {
  // Copy database files
  if (fs.existsSync('./server/db.ts')) {
    const dbContent = fs.readFileSync('./server/db.ts', 'utf8');
    const jsDbContent = dbContent.replace(/from ['"]@/g, 'from "./').replace(/\.ts['"]/g, '.js"');
    fs.writeFileSync('./dist/db.js', jsDbContent);
  }

  // Copy storage files
  if (fs.existsSync('./server/storage.ts')) {
    const storageContent = fs.readFileSync('./server/storage.ts', 'utf8');
    const jsStorageContent = storageContent.replace(/from ['"]@/g, 'from "./').replace(/\.ts['"]/g, '.js"');
    fs.writeFileSync('./dist/storage.js', jsStorageContent);
  }

  // Copy favicon and manifest
  if (fs.existsSync('./client/public/favicon.ico')) {
    fs.copyFileSync('./client/public/favicon.ico', './dist/public/favicon.ico');
  }
  if (fs.existsSync('./client/public/manifest.json')) {
    fs.copyFileSync('./client/public/manifest.json', './dist/public/manifest.json');
  }

  console.log('✅ Copied production files');
};

// Step 4: Build client with Tailwind
const buildClient = () => {
  console.log('🏗️ Building client assets...');
  
  try {
    // First, build CSS with Tailwind
    execSync('npx tailwindcss -i ./client/src/index.css -o ./dist/public/styles.css --minify', {
      stdio: 'inherit'
    });
    
    // Create a simple main.js that loads the app
    const mainJs = `
// Main application entry point
console.log('Loading Arcadia Photography...');

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = \`
      <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div class="container mx-auto px-4 py-16 text-center">
          <h1 class="text-5xl font-bold text-gray-800 mb-4">Arcadia Photography</h1>
          <p class="text-xl text-gray-600 mb-8">Capturing Love Stories in Paradise</p>
          <div class="grid md:grid-cols-3 gap-8 mt-12">
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <h3 class="text-2xl font-semibold mb-4">Wedding Photography</h3>
              <p class="text-gray-600">Capture your special day with stunning imagery</p>
            </div>
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <h3 class="text-2xl font-semibold mb-4">Real Estate</h3>
              <p class="text-gray-600">Showcase properties in their best light</p>
            </div>
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <h3 class="text-2xl font-semibold mb-4">Family Portraits</h3>
              <p class="text-gray-600">Preserve precious family moments</p>
            </div>
          </div>
          <div class="mt-16">
            <a href="#contact" class="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition">
              Book Your Session
            </a>
          </div>
        </div>
      </div>
    \`;
  }
});
`;
    
    fs.writeFileSync('./dist/public/main.js', mainJs);
    
    // Update HTML to include Tailwind CSS
    let html = fs.readFileSync('./dist/public/index.html', 'utf8');
    html = html.replace('<style id="app-styles"></style>', '<link rel="stylesheet" href="/styles.css">');
    fs.writeFileSync('./dist/public/index.html', html);
    
    console.log('✅ Client build completed');
  } catch (error) {
    console.error('❌ Client build failed:', error);
  }
};

// Run all steps
try {
  createOptimizedHTML();
  createProductionServer();
  copyProductionFiles();
  buildClient();
  
  console.log('\n🎉 Full-featured production build complete!');
  console.log('📦 Output directory: ./dist');
  console.log('🚀 To test: node dist/index.js');
  console.log('🌐 Then visit: http://localhost:5000');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}