
/*!
 * Lightweight Lazy Loading Polyfill
 * For browsers that don't support loading="lazy"
 */
(function() {
  'use strict';

  // Check if native lazy loading is supported
  if ('loading' in HTMLImageElement.prototype && 'loading' in HTMLIFrameElement.prototype) {
    return; // Native support available, no polyfill needed
  }

  // Intersection Observer polyfill for very old browsers
  if (!('IntersectionObserver' in window)) {
    // Fallback: load all images immediately
    document.addEventListener('DOMContentLoaded', function() {
      var lazyElements = document.querySelectorAll('[loading="lazy"]');
      lazyElements.forEach(function(element) {
        if (element.dataset.src) {
          element.src = element.dataset.src;
          element.removeAttribute('data-src');
        }
        if (element.dataset.srcset) {
          element.srcset = element.dataset.srcset;
          element.removeAttribute('data-srcset');
        }
      });
    });
    return;
  }

  // Main lazy loading implementation
  var lazyImageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var element = entry.target;
        
        // Load the image
        if (element.dataset.src) {
          element.src = element.dataset.src;
          element.removeAttribute('data-src');
        }
        
        if (element.dataset.srcset) {
          element.srcset = element.dataset.srcset;
          element.removeAttribute('data-srcset');
        }
        
        // Remove loading attribute
        element.removeAttribute('loading');
        
        // Stop observing this element
        lazyImageObserver.unobserve(element);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Initialize when DOM is ready
  function initializeLazyLoading() {
    var lazyElements = document.querySelectorAll('img[loading="lazy"], iframe[loading="lazy"]');
    
    lazyElements.forEach(function(element) {
      // Move src to data-src for lazy loading
      if (element.src && !element.dataset.src) {
        element.dataset.src = element.src;
        element.src = '';
      }
      
      if (element.srcset && !element.dataset.srcset) {
        element.dataset.srcset = element.srcset;
        element.srcset = '';
      }
      
      lazyImageObserver.observe(element);
    });
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLazyLoading);
  } else {
    initializeLazyLoading();
  }

  // Re-initialize for dynamically added content
  window.reinitializeLazyLoading = initializeLazyLoading;
})();
