import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollProgress from "@/components/ScrollProgress";
import DarkModeToggle from "@/components/DarkModeToggle";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useServiceWorker } from "@/hooks/useServiceWorker";
import CriticalResourcePreloader from "@/components/CriticalResourcePreloader";
import InstantLoader from "@/components/InstantLoader";
import React, { Suspense, lazy } from 'react';

// Lazy load pages for better performance
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const WeddingPage = lazy(() => import('./pages/WeddingPage'));
const FamilyPage = lazy(() => import('./pages/FamilyPage'));
const RealEstatePage = lazy(() => import('./pages/RealEstatePage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const BookingSuccessPage = lazy(() => import('./pages/BookingSuccessPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Licensing = lazy(() => import('./pages/Licensing'));
const NotFound = lazy(() => import('./pages/not-found'));

function Router() {
  return (
    <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/wedding-photography" component={WeddingPage} />
      <Route path="/real-estate-photography" component={RealEstatePage} />
      <Route path="/family-photography" component={FamilyPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:id" component={BlogPostPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/privacy-policy" component={PrivacyPage} />
      <Route path="/terms-of-service" component={TermsPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/booking-success" component={BookingSuccessPage} />
      <Route component={NotFound} />
    </Switch>
    </Suspense>
  );
}

function App() {
  useServiceWorker();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <InstantLoader />
            <CriticalResourcePreloader />
            {/* Development tools are conditionally rendered only in development mode */}
            <ScrollProgress />
            <DarkModeToggle />
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;