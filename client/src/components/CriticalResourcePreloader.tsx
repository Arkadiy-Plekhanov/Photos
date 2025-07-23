import { useEffect } from 'react';

const CRITICAL_RESOURCES = [
  // Preload critical local fonts
  '/fonts/webfonts/fa-solid-900.woff2',
  '/fonts/webfonts/fa-regular-400.woff2',
  '/fonts/webfonts/fa-brands-400.woff2',
  '/fonts/css/all.min.css'
];

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1440&q=50&auto=format&cs=srgb'
];

const LQIP_IMAGES = [
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=20&q=10&auto=format&cs=srgb'
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

    // DNS prefetch for external domains
    const dnsPrefetchDomains = [
      'https://images.unsplash.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
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