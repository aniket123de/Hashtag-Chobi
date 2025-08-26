import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageLoader from "@/components/ui/page-loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import GalleryExtended from "./pages/GalleryExtended";
import VideoGallery from "./pages/VideoGallery";
import NotFound from "./pages/NotFound";
import Couple from "./pages/Couple";
import CoupleDetail from "./pages/CoupleDetail";

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
        <PageLoader initialLoading={true} loadingDuration={3500}>
          <Routes>
            {/* Home page route */}
            <Route path="/" element={<Index />} />

            {/* Extended gallery page */}
            <Route path="/gallery" element={<GalleryExtended />} />

            {/* Video gallery page */}
            <Route path="/videos" element={<VideoGallery />} />

            {/* Privacy policy page */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* Couple selection and detail pages */}
            <Route path="/couple" element={<Couple />} />
            <Route path="/couple/:id" element={<CoupleDetail />} />

            {/* Catch-all route for 404 Not Found */}
            {/* Place custom routes above this to ensure proper routing */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageLoader>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
