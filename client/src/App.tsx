import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useServiceWorker } from "@/hooks/useServiceWorker";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import WeddingPage from "@/pages/WeddingPage";
import RealEstatePage from "@/pages/RealEstatePage";
import FamilyPage from "@/pages/FamilyPage";
import AboutPage from "@/pages/AboutPage";
import PortfolioPage from "@/pages/PortfolioPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import ContactPage from "@/pages/ContactPage";
import FAQPage from "@/pages/FAQPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import CheckoutPage from "@/pages/CheckoutPage";
import BookingSuccessPage from "@/pages/BookingSuccessPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/wedding-photography" component={WeddingPage} />
      <Route path="/real-estate-photography" component={RealEstatePage} />
      <Route path="/family-photography" component={FamilyPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:id" component={BlogPostPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/booking-success" component={BookingSuccessPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // useServiceWorker();

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <ScrollToTop />
            <ScrollProgress />
            <DarkModeToggle />
            {/* <Toaster /> */}
            <Router />
          </div>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
