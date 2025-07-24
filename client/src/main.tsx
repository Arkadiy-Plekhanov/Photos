import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Intersection Observer polyfill for older browsers
if (!('IntersectionObserver' in window)) {
  import('intersection-observer').then(() => {
    console.log('IntersectionObserver polyfill loaded');
  });
}