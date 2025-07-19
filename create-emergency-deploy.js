import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚨 Creating emergency deployment...');

// Create minimal production-ready HTML
const productionHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arcadia Photography - Professional Photography Services in Honolulu</title>
    <meta name="description" content="Arcadia Photography offers professional wedding, real estate, and family photography services in Honolulu, Hawaii.">
    <link rel="icon" href="/favicon.ico">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 100px 20px;
            text-align: center;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            font-weight: 700;
        }
        .hero p {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .cta-button {
            display: inline-block;
            background: white;
            color: #667eea;
            padding: 15px 40px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .services {
            padding: 80px 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .services h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 3rem;
            color: #333;
        }
        .service-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        .service-card {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.3s ease;
        }
        .service-card:hover {
            transform: translateY(-5px);
        }
        .service-card h3 {
            color: #667eea;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        .footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 40px 20px;
        }
        @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            .hero p { font-size: 1.2rem; }
            .services h2 { font-size: 2rem; }
        }
    </style>
</head>
<body>
    <div class="hero">
        <h1>Arcadia Photography</h1>
        <p>Capturing Love Stories in Paradise</p>
        <a href="#contact" class="cta-button">Book Your Session</a>
    </div>
    
    <div class="services">
        <h2>Our Services</h2>
        <div class="service-grid">
            <div class="service-card">
                <h3>Wedding Photography</h3>
                <p>Capture your special day with stunning, timeless images that tell your unique love story.</p>
            </div>
            <div class="service-card">
                <h3>Real Estate Photography</h3>
                <p>Professional property photography that showcases homes in their best light.</p>
            </div>
            <div class="service-card">
                <h3>Family Portraits</h3>
                <p>Beautiful family moments preserved with artistic excellence and personal touch.</p>
            </div>
        </div>
    </div>
    
    <div class="footer" id="contact">
        <h3>Contact Arcadia Photography</h3>
        <p>Professional Photography Services in Honolulu, Hawaii</p>
        <p>Email: info@arcadiaphotography.com | Phone: (808) 555-0123</p>
    </div>
</body>
</html>`;

// Create minimal production server
const productionServer = `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting Arcadia Photography server...');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        service: 'Arcadia Photography',
        timestamp: new Date().toISOString() 
    });
});

// Contact form endpoint (basic)
app.post('/api/contact', express.json(), (req, res) => {
    console.log('Contact form submission:', req.body);
    res.json({ success: true, message: 'Thank you for your inquiry!' });
});

// Handle all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(\`✅ Arcadia Photography server running on port \${PORT}\`);
    console.log(\`🌐 Visit: http://localhost:\${PORT}\`);
});`;

// Create directories and files
try {
    fs.mkdirSync('./dist', { recursive: true });
    fs.mkdirSync('./dist/public', { recursive: true });
    
    // Write production files
    fs.writeFileSync('./dist/public/index.html', productionHTML);
    fs.writeFileSync('./dist/index.js', productionServer);
    
    // Copy favicon if it exists
    if (fs.existsSync('./client/public/favicon.ico')) {
        fs.copyFileSync('./client/public/favicon.ico', './dist/public/favicon.ico');
    }
    
    console.log('✅ Emergency deployment created successfully!');
    console.log('✅ Files created:');
    console.log('   - dist/public/index.html');
    console.log('   - dist/index.js');
    console.log('   - dist/public/favicon.ico');
    console.log('');
    console.log('🚀 To test locally: node dist/index.js');
    console.log('🌐 Then visit: http://localhost:5000');
    
} catch (error) {
    console.error('❌ Error creating emergency deployment:', error);
}