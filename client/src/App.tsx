import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollProgress from "@/components/ScrollProgress";
import DarkModeToggle from "@/components/DarkModeToggle";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useServiceWorker } from "@/hooks/useServiceWorker";
import CriticalResourcePreloader from "@/components/CriticalResourcePreloader";
import PerformanceBooster from "@/components/PerformanceBooster";
import InstantLoader from "@/components/InstantLoader";
import DeploymentAnalyzer from "@/components/DeploymentAnalyzer";
import DeployedSiteAnalyzer from "@/components/DeployedSiteAnalyzer";
import QuickPerformanceTest from "@/components/QuickPerformanceTest";
import AutoPerformanceTest from "@/components/AutoPerformanceTest";
import RouteValidator from "@/components/RouteValidator";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import WeddingPage from "@/pages/WeddingPage";
import RealEstatePage from "@/pages/RealEstatePage";
import FamilyPage from "@/pages/FamilyPage";
import AboutPage from "@/pages/AboutPage";
import PortfolioPage from "@/pages/PortfolioPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
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
  useServiceWorker();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <InstantLoader />
            <CriticalResourcePreloader />
            {/* Development tools - remove in production */}
            {process.env.NODE_ENV === 'development' && (
              <>
                <PerformanceBooster />
                <PerformanceMonitor />
                <DeploymentAnalyzer />
                <RouteValidator />
              </>
            )}
            {/* Performance testing tool - always available */}
            <QuickPerformanceTest />
            <AutoPerformanceTest />
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
