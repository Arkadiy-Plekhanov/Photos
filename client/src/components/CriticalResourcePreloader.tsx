import { useEffect } from 'react';

const CRITICAL_RESOURCES = [
  '/fonts/fonts.css'  // Local fonts only - no external dependencies
];

const HERO_IMAGES = [
  '/images/services/wedding.jpg'
];

const LQIP_IMAGES = [
  '/images/services/wedding.jpg'
];

export default function CriticalResourcePreloader() {
  useEffect(() => {
    // Preload critical fonts
    CRITICAL_RESOURCES.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = resource;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Preload LQIP images first for instant display
    LQIP_IMAGES.forEach((imageUrl) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageUrl;
      link.setAttribute('fetchpriority', 'high');
      document.head.appendChild(link);
    });

    // Preload hero images with medium priority
    HERO_IMAGES.forEach((imageUrl) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageUrl;
      document.head.appendChild(link);
    });

    // Preload critical API endpoints
    if ('serviceWorker' in navigator) {
      // Pre-warm service worker cache
      fetch('/api/contact/submissions', { 
        method: 'HEAD',
        cache: 'force-cache' 
      }).catch(() => {});
    }

    // DNS prefetch only for CDN (no external fonts needed)
    const dnsPrefetchDomains = [
      'https://cdnjs.cloudflare.com'
    ];

    dnsPrefetchDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

  }, []);

  return null;
}