# Arcadia Photography Website

## Overview

This is a modern, responsive photography website built for Arcadia Photography, a Honolulu-based photography service specializing in weddings, real estate, and family portraits. The application features a sleek single-page design with smooth animations, contact form functionality, and a professional portfolio showcase with emphasis on stunning wedding photography.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2025)

### Database Configuration & Deployment Fixes (January 16, 2025)
- **PostgreSQL Database**: Successfully provisioned PostgreSQL database with proper environment variable configuration
- **DATABASE_URL Environment Variable**: Added DATABASE_URL to production environment for proper database connectivity
- **Database Schema Migration**: Applied database schema using `npm run db:push` to ensure all tables are properly created
- **Production Deployment Issue**: White screen problem identified - build process timing out due to large Lucide React imports
- **Service Worker Conflicts**: Removed service worker registration causing production caching issues
- **Current Issue**: Production build not completing, causing static file serving to fail in deployment

### SEO & Performance Enhancements
- **Dynamic SEO System**: Implemented comprehensive SEO management with dynamic title/meta tags for all pages
- **Mobile Optimization**: Enhanced mobile responsiveness across all components
- **Performance Improvements**: Added lazy loading system for images with placeholder effects
- **Contact Form Enhancement**: Improved validation, user experience, and error handling
- **CTA Optimization**: Enhanced call-to-action buttons with better conversion focus

### Front-End Engineering Excellence (January 2025)
- **Hero Image Optimization**: Added preload links and stable layout with aspect ratios
- **Sticky Navigation**: Enhanced navigation with scroll progress bar for better UX
- **Typography Scale**: Implemented consistent typography system with optimized line heights
- **Smooth Scrolling**: Added global smooth scrolling behavior for anchor links
- **Image Placeholders**: Enhanced image loading with animated placeholders and proper dimensions
- **Responsive Spacing**: Updated all components with responsive padding/margin utilities
- **Favicon & Theme**: Added photography-themed favicon and proper theme color meta tags
- **CSS Masonry Gallery**: Enhanced portfolio grid with hover effects and smooth transitions

### Advanced UI/UX Improvements (January 2025)
- **Progressive Web App (PWA)**: Implemented manifest.json and service worker for offline caching and app installation
- **Retina Image Support**: Added responsive image component with 1x, 2x, 3x resolution support via srcset
- **Accessibility Enhancements**: Created accessible gallery with ARIA labels, keyboard navigation, and focus management
- **Dark Mode System**: Implemented CSS variables theming with dark mode toggle and system preference detection
- **Skeleton Loading**: Enhanced LQIP (Low Quality Image Placeholder) system with smooth loading animations
- **JSON-LD Schema**: Added structured data markup for better SEO and rich snippets
- **Service Worker**: Implemented offline caching for critical assets, images, and fonts
- **Keyboard Navigation**: Full keyboard support for gallery lightbox with arrow keys and ESC functionality

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with custom CSS variables for brand colors
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions and scroll-triggered animations
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **API Design**: RESTful API with JSON responses

### Design System
- **Typography**: Multiple Google Fonts (Playfair Display, Inter, Dancing Script)
- **Color Scheme**: Custom ocean-themed palette with luxury gold accents
- **Component Library**: shadcn/ui components with Radix UI primitives
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

## Key Components

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Contact Submissions Table**: Form submissions with contact details, service requests, and status tracking
- **Bookings Table**: Payment-enabled bookings with Stripe integration, package details, and booking status tracking
- **Schema Validation**: Drizzle-Zod integration for type-safe database operations
- **Database**: PostgreSQL with Neon serverless provider
- **Storage**: DatabaseStorage class implemented with full CRUD operations for all entities

### Frontend Components
- **Navigation**: Sticky navigation with scroll-triggered background changes and dropdown menus
- **Hero Section**: Full-screen hero with rotating wedding images, "Love Stories in Paradise" branding, and award badges
- **Services Section**: Grid layout showcasing photography services with direct links to dedicated service pages
- **Portfolio Section**: Accessible gallery with keyboard navigation, lightbox functionality, and category filtering
- **Testimonials Section**: Customer reviews with star ratings
- **About Section**: Company information with statistics
- **Blog Section**: Latest blog posts preview
- **Contact Section**: Contact form with validation and submission handling
- **Footer**: Site links and social media integration
- **Dark Mode Toggle**: System preference detection with manual toggle and localStorage persistence
- **Responsive Images**: High-DPI support with automatic srcset generation for optimal loading
- **Skeleton Loaders**: Smooth placeholder animations during image loading to prevent layout shifts

### Pages
- **Home Page**: Main landing page with all major sections and "Book Now" buttons
- **Wedding Photography Page**: Dedicated page for wedding services with packages, process, and gallery
- **Real Estate Photography Page**: Professional real estate photography services with pricing and features
- **Family Photography Page**: Family portrait services with session types and location suggestions
- **About Page**: Company story, team members, awards, and philosophy
- **Portfolio Page**: Full gallery with category filtering (Wedding, Real Estate, Family)
- **Blog Page**: Photography tips, behind-the-scenes content, and location guides
- **FAQ Page**: Comprehensive frequently asked questions organized by category
- **Checkout Page**: Secure payment processing for booking photography services
- **Booking Success Page**: Confirmation page after successful payment

### API Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact/submissions` - Retrieve all contact submissions (admin)
- `POST /api/bookings` - Create new booking with payment intent
- `GET /api/bookings` - Retrieve all bookings (admin)
- `PATCH /api/bookings/:id/status` - Update booking status
- `POST /api/create-payment-intent` - Create Stripe payment intent
- `POST /api/webhooks/stripe` - Handle Stripe webhook events

## Data Flow

1. **Contact Form Submission**: 
   - User fills out contact form → Frontend validation with Zod → API request to backend → Database storage → Success/error response
   
2. **Payment Processing**: 
   - User selects service/package → Creates booking → Stripe payment intent created → Secure payment with Stripe Elements → Webhook confirms payment → Booking status updated → Confirmation email sent

3. **Page Rendering**: 
   - Static content loaded immediately → Smooth scroll animations triggered by intersection observer → Dynamic content loaded as needed

4. **State Management**: 
   - React Query manages API calls and caching → Form state handled by React Hook Form → UI state managed by React hooks

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, React DOM
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Animations**: Framer Motion
- **Forms**: React Hook Form, Hookform Resolvers
- **HTTP Client**: Fetch API with React Query
- **Icons**: Font Awesome, Lucide React
- **Fonts**: Google Fonts (Playfair Display, Inter, Dancing Script)
- **Payment Processing**: Stripe React SDK, Stripe Elements
- **PWA**: Service Worker API, Web App Manifest
- **Accessibility**: ARIA attributes, keyboard navigation, focus management
- **Performance**: Intersection Observer API, CSS variables, responsive images

### Backend Dependencies
- **Server**: Express.js
- **Database**: Drizzle ORM, PostgreSQL driver
- **Validation**: Zod for schema validation
- **Session**: Express-session with connect-pg-simple
- **Payment Processing**: Stripe Node.js SDK
- **Development**: tsx for TypeScript execution

### Build Tools
- **Bundler**: Vite with React plugin
- **TypeScript**: Full TypeScript support with strict mode
- **Database**: Drizzle Kit for migrations
- **Development**: Replit-specific plugins for runtime error handling

## Deployment Strategy

### Development
- **Local Development**: `npm run dev` starts both frontend and backend
- **Database**: Drizzle Kit handles schema migrations with `npm run db:push`
- **Type Checking**: `npm run check` for TypeScript validation

### Production Build
- **Frontend**: Vite builds optimized React application to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: PostgreSQL with connection pooling via Neon serverless
- **Environment**: Requires `DATABASE_URL` environment variable

### Architecture Decisions

1. **Single Page Application**: Chosen for better user experience with smooth transitions and faster navigation
2. **Drizzle ORM**: Selected for type-safe database operations and excellent TypeScript integration
3. **Neon Database**: Serverless PostgreSQL provider for easy deployment and scaling
4. **React Query**: Handles server state management and API caching efficiently
5. **Tailwind CSS**: Utility-first CSS framework for rapid UI development
6. **Framer Motion**: Professional-grade animations for enhanced user experience
7. **Zod Validation**: Schema-first validation for both frontend and backend consistency

The application is designed to be maintainable, scalable, and performant while providing an excellent user experience for potential photography clients.