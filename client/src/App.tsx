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
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
