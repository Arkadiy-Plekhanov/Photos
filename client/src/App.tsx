import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DarkModeToggle from "@/components/DarkModeToggle";
import ErrorBoundary from "@/components/ErrorBoundary";

import { lazy, Suspense } from "react";
import Home from "@/pages/Home";

// Lazy load all non-critical pages for code splitting
const NotFound = lazy(() => import("@/pages/not-found"));
const WeddingPage = lazy(() => import("@/pages/WeddingPage"));
const RealEstatePage = lazy(() => import("@/pages/RealEstatePage"));
const FamilyPage = lazy(() => import("@/pages/FamilyPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const PortfolioPage = lazy(() => import("@/pages/PortfolioPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const FAQPage = lazy(() => import("@/pages/FAQPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const BookingSuccessPage = lazy(() => import("@/pages/BookingSuccessPage"));

// Loading fallback component for code splitting
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/"><Home /></Route>
        <Route path="/wedding-photography" component={WeddingPage} />
        <Route path="/real-estate-photography" component={RealEstatePage} />
        <Route path="/family-photography" component={FamilyPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/portfolio" component={PortfolioPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:id" component={BlogPostPage} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/booking-success" component={BookingSuccessPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <DarkModeToggle />
            <Router />
            <Toaster />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;