#!/usr/bin/env node

// Deployment Diagnostic Script
// This script will test multiple deployment configurations

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔍 DEPLOYMENT DIAGNOSTIC STARTED');
console.log('================================');

// Test 1: Check if build directory exists and is accessible
console.log('\n1. Checking build directory...');
try {
    const distExists = fs.existsSync('./dist');
    const publicExists = fs.existsSync('./dist/public');
    
    console.log(`✓ dist/ exists: ${distExists}`);
    console.log(`✓ dist/public/ exists: ${publicExists}`);
    
    if (publicExists) {
        const files = fs.readdirSync('./dist/public');
        console.log(`✓ Files in dist/public: ${files.join(', ')}`);
    }
} catch (error) {
    console.log(`✗ Error checking directories: ${error.message}`);
}

// Test 2: Create minimal working HTML
console.log('\n2. Creating minimal test page...');
const minimalHTML = `<!DOCTYPE html>
<html>
<head>
    <title>Test Page</title>
    <meta charset="UTF-8">
</head>
<body>
    <h1>Test Deployment</h1>
    <p>If you see this, the server is working!</p>
    <p>Timestamp: ${new Date().toISOString()}</p>
</body>
</html>`;

try {
    fs.mkdirSync('./dist/public', { recursive: true });
    fs.writeFileSync('./dist/public/test.html', minimalHTML);
    console.log('✓ Created test.html');
} catch (error) {
    console.log(`✗ Error creating test file: ${error.message}`);
}

// Test 3: Create ultra-simple server
console.log('\n3. Creating ultra-simple server...');
const simpleServer = `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting simple server...');

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        port: PORT,
        env: process.env.NODE_ENV || 'development'
    });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Fallback
app.get('*', (req, res) => {
    console.log('Request for:', req.url);
    res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(\`✅ Server running on port \${PORT}\`);
    console.log(\`✅ Static files from: \${path.join(__dirname, 'public')}\`);
});`;

try {
    fs.writeFileSync('./dist/simple-server.js', simpleServer);
    console.log('✓ Created simple-server.js');
} catch (error) {
    console.log(`✗ Error creating server: ${error.message}`);
}

// Test 4: Check environment
console.log('\n4. Environment check...');
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`PORT: ${process.env.PORT || 'not set'}`);
console.log(`Current working directory: ${process.cwd()}`);

// Test 5: Network test
console.log('\n5. Network connectivity test...');
try {
    const response = execSync('curl -s --connect-timeout 5 http://google.com', { timeout: 10000 });
    console.log('✓ Network connectivity OK');
} catch (error) {
    console.log('✗ Network connectivity issues');
}

console.log('\n================================');
console.log('🏁 DIAGNOSTIC COMPLETE');
console.log('\nNext steps:');
console.log('1. Run: node dist/simple-server.js');
console.log('2. Test: curl http://localhost:5000/health');
console.log('3. Test: curl http://localhost:5000/test.html');