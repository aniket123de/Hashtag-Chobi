import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

// Initialize React Query client for data fetching and caching
const queryClient = new QueryClient();

const App = () => (
  // Provide React Query context to entire app
  <QueryClientProvider client={queryClient}>
    {/* TooltipProvider supplies tooltip context and styling */}
    <TooltipProvider>
      {/* Notification components for user feedback */}
      <Toaster />
      <Sonner />

      {/* Routing provider for client-side navigation */}
      <BrowserRouter>
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Index />} />

          {/* Privacy policy page */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Catch-all route for 404 Not Found */}
          {/* Place custom routes above this to ensure proper routing */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
