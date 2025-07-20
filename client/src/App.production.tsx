import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Router } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollProgress from "@/components/ScrollProgress";
import DarkModeToggle from "@/components/DarkModeToggle";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useServiceWorker } from "@/hooks/useServiceWorker";
import CriticalResourcePreloader from "@/components/CriticalResourcePreloader";
import InstantLoader from "@/components/InstantLoader";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import WeddingPage from "@/pages/WeddingPage";
import RealEstatePage from "@/pages/RealEstatePage";
import FamilyPage from "@/pages/FamilyPage";
import AboutPage from "@/pages/AboutPage";
import PortfolioPage from "@/pages/PortfolioPage";
import BlogPage from "@/pages/BlogPage";
import FAQPage from "@/pages/FAQPage";
import CheckoutPage from "@/pages/CheckoutPage";
import BookingSuccessPage from "@/pages/BookingSuccessPage";

// Production-optimized query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  useServiceWorker();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <InstantLoader />
            <CriticalResourcePreloader />
            <ScrollProgress />
            <DarkModeToggle />
            <Toaster />
            <Router>
              <Route path="/" component={Home} />
              <Route path="/wedding" component={WeddingPage} />
              <Route path="/real-estate" component={RealEstatePage} />
              <Route path="/family" component={FamilyPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/portfolio" component={PortfolioPage} />
              <Route path="/blog" component={BlogPage} />
              <Route path="/faq" component={FAQPage} />
              <Route path="/checkout" component={CheckoutPage} />
              <Route path="/booking-success" component={BookingSuccessPage} />
              <Route component={NotFound} />
            </Router>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}