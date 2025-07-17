import React from "react";
import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/ScrollToTop";

// Pages
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import PortfolioPage from "@/pages/PortfolioPage";
import WeddingPage from "@/pages/WeddingPage";
import RealEstatePage from "@/pages/RealEstatePage";
import FamilyPage from "@/pages/FamilyPage";
import ContactPage from "@/pages/ContactPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import FAQPage from "@/pages/FAQPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import CheckoutPage from "@/pages/CheckoutPage";
import BookingSuccessPage from "@/pages/BookingSuccessPage";
import NotFoundPage from "@/pages/not-found";

// Error Boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode }, 
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-red-800 mb-4">
              Something went wrong!
            </h1>
            <p className="text-red-600">
              Error: {this.state.error?.message || 'Unknown error'}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <ScrollToTop />
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={AboutPage} />
            <Route path="/portfolio" component={PortfolioPage} />
            <Route path="/weddings" component={WeddingPage} />
            <Route path="/real-estate" component={RealEstatePage} />
            <Route path="/family-portraits" component={FamilyPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/faq" component={FAQPage} />
            <Route path="/blog" component={BlogPage} />
            <Route path="/blog/:slug" component={BlogPostPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/privacy" component={PrivacyPage} />
            <Route path="/terms" component={TermsPage} />
            <Route path="/booking-success" component={BookingSuccessPage} />
            <Route component={NotFoundPage} />
          </Switch>
          <Toaster />
        </div>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;