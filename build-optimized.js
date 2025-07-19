import { build } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Building optimized production version...');

// Custom Vite config for optimized build
const buildConfig = {
  root: path.resolve(__dirname, 'client'),
  build: {
    outDir: path.resolve(__dirname, 'dist/public'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['framer-motion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'utils': ['clsx', 'tailwind-merge', 'date-fns']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-hook-form']
  }
};

// Create optimized icon exports to avoid importing all icons
const createOptimizedIcons = () => {
  const iconContent = `
// Optimized icon exports - only import what we need
export { 
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Star,
  Camera,
  Heart,
  Home,
  ArrowRight,
  Check,
  Send,
  Moon,
  Sun,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
`;
  
  fs.writeFileSync(path.join(__dirname, 'client/src/lib/icons.ts'), iconContent);
  console.log('✅ Created optimized icon exports');
};

// Build function
async function buildOptimized() {
  try {
    // Create optimized icons
    createOptimizedIcons();
    
    // Update imports in components to use optimized icons
    const componentsDir = path.join(__dirname, 'client/src/components');
    const files = fs.readdirSync(componentsDir);
    
    for (const file of files) {
      if (file.endsWith('.tsx')) {
        const filePath = path.join(componentsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace lucide-react imports with our optimized version
        content = content.replace(
          /from ['"]lucide-react['"]/g,
          'from "@/lib/icons"'
        );
        
        fs.writeFileSync(filePath, content);
      }
    }
    
    console.log('✅ Updated component imports');
    
    // Run Vite build
    await build(buildConfig);
    
    console.log('✅ Client build completed');
    
    // Build server
    const { build: esbuild } = await import('esbuild');
    await esbuild({
      entryPoints: ['server/index.ts'],
      bundle: true,
      platform: 'node',
      format: 'esm',
      outfile: 'dist/index.js',
      external: [
        'express',
        '@neondatabase/serverless',
        'ws',
        'connect-pg-simple',
        'express-session',
        'passport',
        'passport-local',
        'drizzle-orm',
        'drizzle-kit',
        'stripe'
      ],
      minify: true,
      target: 'node20'
    });
    
    console.log('✅ Server build completed');
    console.log('🎉 Optimized build complete!');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildOptimized();