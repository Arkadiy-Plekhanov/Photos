/**
 * Route Validation Component
 * Development-only component that validates navigation links
 * Helps prevent broken links after optimizations
 */

import { useEffect } from 'react';
import { validateNavigationLinks, ROUTES } from '../utils/routes';

const RouteValidator = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const errors = validateNavigationLinks();
      
      if (errors.length > 0) {
        console.group('🔗 Route Validation Errors');
        errors.forEach(error => console.error(error));
        console.groupEnd();
      } else {
        console.log('✅ All navigation routes validated successfully');
      }

      // Log current route configuration
      console.group('📍 Current Route Configuration');
      Object.entries(ROUTES).forEach(([key, route]) => {
        console.log(`${key}: ${route.path} → ${route.label}`);
      });
      console.groupEnd();
    }
  }, []);

  // This component renders nothing, only validates in development
  return null;
};

export default RouteValidator;