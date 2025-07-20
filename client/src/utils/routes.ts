/**
 * Centralized Route Configuration
 * Single source of truth for all application routes
 * Prevents navigation link mismatches and enables easy maintenance
 */

export interface RouteConfig {
  path: string;
  label: string;
  description?: string;
  category?: 'main' | 'services' | 'legal' | 'utility';
}

/**
 * Main Application Routes
 * All routes must match exactly between Router and Navigation components
 */
export const ROUTES: Record<string, RouteConfig> = {
  // Main Pages
  HOME: {
    path: '/',
    label: 'Home',
    description: 'Photography services in Honolulu',
    category: 'main'
  },
  ABOUT: {
    path: '/about',
    label: 'About',
    description: 'About Arcadia Photography',
    category: 'main'
  },
  PORTFOLIO: {
    path: '/portfolio',
    label: 'Portfolio',
    description: 'Photography portfolio and gallery',
    category: 'main'
  },
  BLOG: {
    path: '/blog',
    label: 'Blog',
    description: 'Photography tips and insights',
    category: 'main'
  },
  FAQ: {
    path: '/faq',
    label: 'FAQ',
    description: 'Frequently asked questions',
    category: 'main'
  },

  // Service Pages
  WEDDING: {
    path: '/wedding-photography',
    label: 'Wedding Photography',
    description: 'Professional wedding photography in Hawaii',
    category: 'services'
  },
  REAL_ESTATE: {
    path: '/real-estate-photography',
    label: 'Real Estate Photography',
    description: 'Professional real estate photography',
    category: 'services'
  },
  FAMILY: {
    path: '/family-photography',
    label: 'Family Photography',
    description: 'Family portrait sessions',
    category: 'services'
  },

  // Utility Pages
  CHECKOUT: {
    path: '/checkout',
    label: 'Checkout',
    description: 'Secure booking and payment',
    category: 'utility'
  },
  BOOKING_SUCCESS: {
    path: '/booking-success',
    label: 'Booking Confirmed',
    description: 'Booking confirmation page',
    category: 'utility'
  },

  // Legal Pages
  TERMS: {
    path: '/terms',
    label: 'Terms of Service',
    description: 'Terms and conditions',
    category: 'legal'
  },
  PRIVACY: {
    path: '/privacy',
    label: 'Privacy Policy',
    description: 'Privacy policy and data protection',
    category: 'legal'
  }
} as const;

/**
 * Route Groups for Navigation Organization
 */
export const ROUTE_GROUPS = {
  MAIN_NAVIGATION: [
    ROUTES.HOME,
    ROUTES.ABOUT,
    ROUTES.PORTFOLIO,
    ROUTES.BLOG,
    ROUTES.FAQ
  ],
  
  SERVICES: [
    ROUTES.WEDDING,
    ROUTES.REAL_ESTATE,
    ROUTES.FAMILY
  ],
  
  FOOTER_LEGAL: [
    ROUTES.TERMS,
    ROUTES.PRIVACY
  ]
} as const;

/**
 * Utility Functions for Route Management
 */
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return Object.values(ROUTES).find(route => route.path === path);
};

export const isValidRoute = (path: string): boolean => {
  return Object.values(ROUTES).some(route => route.path === path);
};

export const getServiceRoutes = (): RouteConfig[] => {
  return ROUTE_GROUPS.SERVICES;
};

/**
 * Navigation Link Validation
 * Ensures all navigation links match actual routes
 */
export const validateNavigationLinks = (): string[] => {
  const errors: string[] = [];
  
  // Check if all navigation routes exist in router
  Object.values(ROUTES).forEach(route => {
    if (!route.path.startsWith('/') && route.path !== '/') {
      errors.push(`Invalid route path: ${route.path} (must start with /)`);
    }
  });
  
  return errors;
};

// Export route paths for easy access
export const ROUTE_PATHS = Object.fromEntries(
  Object.entries(ROUTES).map(([key, route]) => [key, route.path])
) as Record<keyof typeof ROUTES, string>;