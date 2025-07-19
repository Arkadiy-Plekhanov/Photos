import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 5002;

console.log('🚀 Testing production server on port', PORT);

// Simple health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', port: PORT });
});

// Test API endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Production test server is working!' });
});

app.listen(PORT, () => {
  console.log(`✅ Test server running on http://localhost:${PORT}`);
});