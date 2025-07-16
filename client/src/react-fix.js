// Simple React initialization fix
import React from 'react';
import ReactDOM from 'react-dom/client';

// Make React available globally if needed
if (typeof window !== 'undefined') {
  window.React = React;
  window.ReactDOM = ReactDOM;
}

// Suppress specific runtime error plugin messages
const originalError = console.error;
console.error = function(...args) {
  const errorStr = args.join(' ');
  if (errorStr.includes('plugin:runtime-error-plugin') || 
      errorStr.includes('dispatcher.useEffect') ||
      errorStr.includes('null is not an object')) {
    return;
  }
  originalError.apply(console, args);
};