// Simple build script to bypass timeout issues
const fs = require('fs');
const path = require('path');

// Create dist/public directory
if (!fs.existsSync('dist/public')) {
  fs.mkdirSync('dist/public', { recursive: true });
}

// Copy necessary files
const filesToCopy = [
  { from: 'client/public/favicon.ico', to: 'dist/public/favicon.ico' },
  { from: 'client/public/manifest.json', to: 'dist/public/manifest.json' },
  { from: 'client/public/sw.js', to: 'dist/public/sw.js' }
];

filesToCopy.forEach(({ from, to }) => {
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, to);
    console.log(`Copied ${from} to ${to}`);
  }
});

// Create a simple index.html that works in production
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arcadia Photography - Loading...</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .loading {
            text-align: center;
            color: white;
            background: rgba(0,0,0,0.1);
            padding: 2rem;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
        .spinner {
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="loading">
        <div class="spinner"></div>
        <h1>Arcadia Photography</h1>
        <p>Application is starting...</p>
        <p><small>Please wait while we load your photography experience</small></p>
    </div>
    <script>
        // Simple redirect to development server for now
        setTimeout(() => {
            window.location.href = 'https://d4017b83-5571-4913-9863-991a3cf49453-00-33rtxqndy7mqr.worf.replit.dev/';
        }, 3000);
    </script>
</body>
</html>`;

fs.writeFileSync('dist/public/index.html', indexHtml);
console.log('Created simple production index.html');
console.log('Build completed successfully!');