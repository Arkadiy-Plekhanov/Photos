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
const HomePage = lazy(() => import('./pages/Home'));
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
    <Switch>
      <Route path="/">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <HomePage />
        </Suspense>
      </Route>
      <Route path="/wedding-photography">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <WeddingPage />
        </Suspense>
      </Route>
      <Route path="/real-estate-photography">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <RealEstatePage />
        </Suspense>
      </Route>
      <Route path="/family-photography">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <FamilyPage />
        </Suspense>
      </Route>
      <Route path="/about">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <AboutPage />
        </Suspense>
      </Route>
      <Route path="/portfolio">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <PortfolioPage />
        </Suspense>
      </Route>
      <Route path="/blog">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <BlogPage />
        </Suspense>
      </Route>
      <Route path="/blog/:id">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <BlogPostPage />
        </Suspense>
      </Route>
      <Route path="/faq">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <FAQPage />
        </Suspense>
      </Route>
      <Route path="/privacy-policy">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <PrivacyPage />
        </Suspense>
      </Route>
      <Route path="/terms-of-service">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <TermsPage />
        </Suspense>
      </Route>
      <Route path="/checkout">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <CheckoutPage />
        </Suspense>
      </Route>
      <Route path="/booking-success">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <BookingSuccessPage />
        </Suspense>
      </Route>
      <Route>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <NotFound />
        </Suspense>
      </Route>
    </Switch>
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