import { Routes, Route, BrowserRouter } from "react-router-dom";
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

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const WeddingPage = lazy(() => import('./pages/WeddingPage'));
const RealEstatePage = lazy(() => import('./pages/RealEstatePage'));
const FamilyPage = lazy(() => import('./pages/FamilyPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Licensing = lazy(() => import('./pages/Licensing'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const BookingSuccessPage = lazy(() => import('./pages/BookingSuccessPage'));
const NotFound = lazy(() => import('./pages/not-found'));

function Router() {
  return (
    <Routes>
      <Route path="/" element={
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <Home />
        </Suspense>
      } />
      <Route path="/wedding-photography" element={
        <Suspense fallback={<InstantLoader />}>
          <WeddingPage />
        </Suspense>
      } />
      <Route path="/real-estate-photography" element={
        <Suspense fallback={<InstantLoader />}>
          <RealEstatePage />
        </Suspense>
      } />
      <Route path="/family-photography" element={
        <Suspense fallback={<InstantLoader />}>
          <FamilyPage />
        </Suspense>
      } />
      <Route path="/portfolio" element={
        <Suspense fallback={<InstantLoader />}>
          <PortfolioPage />
        </Suspense>
      } />
      <Route path="/about" element={
        <Suspense fallback={<InstantLoader />}>
          <AboutPage />
        </Suspense>
      } />
      <Route path="/blog" element={
        <Suspense fallback={<InstantLoader />}>
          <BlogPage />
        </Suspense>
      } />
      <Route path="/blog/:slug" element={
        <Suspense fallback={<InstantLoader />}>
          <BlogPostPage />
        </Suspense>
      } />
      <Route path="/faq" element={
        <Suspense fallback={<InstantLoader />}>
          <FAQPage />
        </Suspense>
      } />
      <Route path="/checkout" element={
        <Suspense fallback={<InstantLoader />}>
          <CheckoutPage />
        </Suspense>
      } />
      <Route path="/booking-success" element={
        <Suspense fallback={<InstantLoader />}>
          <BookingSuccessPage />
        </Suspense>
      } />
      <Route path="/terms" element={
        <Suspense fallback={<InstantLoader />}>
          <TermsPage />
        </Suspense>
      } />
      <Route path="/privacy" element={
        <Suspense fallback={<InstantLoader />}>
          <PrivacyPage />
        </Suspense>
      } />
      <Route path="/cookies" element={
        <Suspense fallback={<InstantLoader />}>
          <CookiePolicy />
        </Suspense>
      } />
      <Route path="/licensing" element={
        <Suspense fallback={<InstantLoader />}>
          <Licensing />
        </Suspense>
      } />
      <Route path="*" element={
        <Suspense fallback={<InstantLoader />}>
          <NotFound />
        </Suspense>
      } />
    </Routes>
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
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;