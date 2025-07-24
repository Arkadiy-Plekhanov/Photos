// Critical CSS extraction configuration
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'critical-css': ['src/index.css']
        }
      }
    },
    cssCodeSplit: false // Keep CSS in single file for better control
  }
});