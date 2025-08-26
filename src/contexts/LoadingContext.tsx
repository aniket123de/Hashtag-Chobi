import React, { createContext, useContext, useState, useEffect } from 'react';

interface LoadingContextType {
  isAppLoading: boolean;
  isContentLoading: boolean;
  setContentLoading: (loading: boolean) => void;
  registerLoadingComponent: (id: string) => void;
  unregisterLoadingComponent: (id: string) => void;
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
  initialLoadingDuration = 4500 
}) => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [loadingComponents, setLoadingComponents] = useState<Set<string>>(new Set());

  // Handle initial app loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, initialLoadingDuration);

    return () => clearTimeout(timer);
  }, [initialLoadingDuration]);

  const registerLoadingComponent = (id: string) => {
    setLoadingComponents(prev => new Set(prev).add(id));
    setIsContentLoading(true);
  };

  const unregisterLoadingComponent = (id: string) => {
    setLoadingComponents(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      if (newSet.size === 0) {
        setIsContentLoading(false);
      }
      return newSet;
    });
  };

  const setContentLoading = (loading: boolean) => {
    setIsContentLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{
      isAppLoading,
      isContentLoading,
      setContentLoading,
      registerLoadingComponent,
      unregisterLoadingComponent
    }}>
      {children}
    </LoadingContext.Provider>
  );
};