import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './loader';

interface PageLoaderProps {
  children: React.ReactNode;
  initialLoading?: boolean;
  loadingDuration?: number;
}

const PageLoader: React.FC<PageLoaderProps> = ({ 
  children, 
  initialLoading = true,
  loadingDuration = 4500 // Increased to 4.5 seconds for better experience
}) => {
  const [isInitialLoading, setIsInitialLoading] = useState(initialLoading);
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const location = useLocation();
  
  // Handle initial app loading with smooth fade out
  useEffect(() => {
    if (initialLoading) {
      // Start fade out 1200ms before hiding completely for smoother transition
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, loadingDuration - 1200);
      
      // Hide loader completely
      const hideTimer = setTimeout(() => {
        setIsInitialLoading(false);
      }, loadingDuration);
      
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [initialLoading, loadingDuration]);

  // Handle route changes
  useEffect(() => {
    if (!isInitialLoading) {
      setIsRouteChanging(true);
      setFadeOut(false); // Reset fade out for route changes
      
      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, 300);
      
      const hideTimer = setTimeout(() => {
        setIsRouteChanging(false);
      }, 800);
      
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [location.pathname, isInitialLoading]);

  // Show initial loading screen
  if (isInitialLoading) {
    return (
      <div className={`loader-overlay ${fadeOut ? 'fade-out' : ''}`}>
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

  // Show route transition loading
  if (isRouteChanging) {
    return (
      <>
        {children}
        <div className={`page-loader ${fadeOut ? 'fade-out' : ''}`}>
          <Loader size="md" />
          <div className="mt-4 text-center">
            <p className="text-gray-600 font-medium">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
};

export default PageLoader;
