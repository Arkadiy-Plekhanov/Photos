import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import WeddingPage from "@/pages/WeddingPage";
import RealEstatePage from "@/pages/RealEstatePage";
import FamilyPage from "@/pages/FamilyPage";
import AboutPage from "@/pages/AboutPage";
import PortfolioPage from "@/pages/PortfolioPage";
import BlogPage from "@/pages/BlogPage";
import FAQPage from "@/pages/FAQPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";

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
      <Route path="/faq" component={FAQPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/18085551234?text=Hi%20Arcadia%20Photography!%20I'm%20interested%20in%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Chat on WhatsApp"
        >
          <i className="fab fa-whatsapp" style={{ lineHeight: '60px' }}></i>
        </a>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
