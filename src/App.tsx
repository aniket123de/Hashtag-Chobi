import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoadingProvider, useLoading } from "@/contexts/LoadingContext";
import Loader from "@/components/ui/loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import GalleryExtended from "./pages/GalleryExtended";
import VideoGallery from "./pages/VideoGallery";
import NotFound from "./pages/NotFound";
import CoupleDetail from "./pages/CoupleDetail";

// Initialize React Query client for data fetching and caching
const queryClient = new QueryClient();

const AppContent = () => {
  const { isAppLoading, shouldShowContent } = useLoading();

  // Show loader only while app is initializing
  if (isAppLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-cream-50 via-blush-50 to-golden-50 flex flex-col items-center justify-center z-50">
        <Loader size="lg" />
        <div className="mt-6 text-center">
          <p className="text-gray-700 text-lg font-medium animate-pulse">
            Crafting Your Visual Experience...
          </p>
          <p className="text-gray-500 text-sm mt-2">
            #HashtagChobi - Capturing Moments That Matter
          </p>
        </div>
      </div>
    );
  }

  if (!shouldShowContent) {
    return null;
  }

  return (
    <Routes>
      {/* Home page route */}
      <Route path="/" element={<Index />} />

      {/* Extended gallery page */}
      <Route path="/gallery" element={<GalleryExtended />} />

      {/* Video gallery page */}
      <Route path="/videos" element={<VideoGallery />} />

      {/* Privacy policy page */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      {/* Couple detail pages */}
      <Route path="/couple/:id" element={<CoupleDetail />} />

      {/* Catch-all route for 404 Not Found */}
      {/* Place custom routes above this to ensure proper routing */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  // Provide React Query context to entire app
  <QueryClientProvider client={queryClient}>
    {/* TooltipProvider supplies tooltip context and styling */}
    <TooltipProvider>
      {/* Loading context provider */}
      <LoadingProvider initialLoadingDuration={3500}>
        {/* Notification components for user feedback */}
        <Toaster />
        <Sonner />

        {/* Routing provider for client-side navigation */}
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </LoadingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
