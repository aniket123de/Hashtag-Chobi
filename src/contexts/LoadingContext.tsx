import React, { createContext, useContext, useState, useEffect } from 'react';

interface LoadingContextType {
  isAppLoading: boolean;
  setAppLoading: (loading: boolean) => void;
  isDataLoading: boolean;
  setDataLoading: (loading: boolean) => void;
  shouldShowContent: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: React.ReactNode;
  initialLoadingDuration?: number;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ 
  children, 
  initialLoadingDuration = 3500 
}) => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Handle initial app loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, initialLoadingDuration);

    return () => clearTimeout(timer);
  }, [initialLoadingDuration]);

  const setAppLoading = (loading: boolean) => {
    setIsAppLoading(loading);
  };

  const setDataLoading = (loading: boolean) => {
    setIsDataLoading(loading);
  };

  // Content should show after app loading is complete
  const shouldShowContent = !isAppLoading;

  const value = {
    isAppLoading,
    setAppLoading,
    isDataLoading,
    setDataLoading,
    shouldShowContent,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};