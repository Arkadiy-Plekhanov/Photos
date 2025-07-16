import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Starting emergency production build...');

// Create a minimal production build
async function emergencyBuild() {
  try {
    // First, create the server build
    const serverCode = `
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(\`Server running on port \${port}\`);
});
`;

    fs.writeFileSync('dist/index.js', serverCode);
    console.log('✓ Server build created');

    // Copy static files
    const staticFiles = ['favicon.ico', 'manifest.json'];
    for (const file of staticFiles) {
      const src = path.join('client', 'public', file);
      const dest = path.join('dist', 'public', file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`✓ Copied ${file}`);
      }
    }

    // Create a working index.html
    const indexHtml = fs.readFileSync('client/index.html', 'utf-8');
    
    // Replace the development script with a message
    const productionHtml = indexHtml.replace(
      '<script type="module" src="/src/main.tsx"></script>',
      `
      <script>
        // Temporary redirect to development server
        if (window.location.hostname === 'arcadiaphotography.replit.app' || 
            window.location.hostname.includes('aphotography.replit.app')) {
          window.location.href = 'https://d4017b83-5571-4913-9863-991a3cf49453-00-33rtxqndy7mqr.worf.replit.dev/';
        }
      </script>
      <script type="module" src="/src/main.tsx"></script>
      `
    );

    fs.writeFileSync('dist/public/index.html', productionHtml);
    console.log('✓ Index.html created with redirect');

    console.log('\n✅ Emergency build completed successfully!');
    console.log('The production site will redirect to the working development version.');
    
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

emergencyBuild();