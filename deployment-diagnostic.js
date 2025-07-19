console.log('Running deployment diagnostic...');
console.log('Node version:', process.version);
console.log('Environment:', process.env.NODE_ENV);
console.log('Database URL exists:', !!process.env.DATABASE_URL);
console.log('Port:', process.env.PORT || 5000);

// Test imports
try {
  await import('express');
  console.log('✅ Express is available');
} catch (e) {
  console.log('❌ Express import failed:', e.message);
}

try {
  await import('path');
  console.log('✅ Path module is available');
} catch (e) {
  console.log('❌ Path import failed:', e.message);
}

console.log('\nRecommended approach:');
console.log('1. Use the existing build system with npm run build');
console.log('2. Deploy using the standard Express server');
console.log('3. Ensure all dependencies are properly installed');