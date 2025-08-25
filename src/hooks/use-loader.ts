import { useState, useEffect } from 'react';

interface UseLoaderOptions {
  duration?: number;
  autoStart?: boolean;
}

export const useLoader = (options: UseLoaderOptions = {}) => {
  const { duration = 1000, autoStart = false } = options;
  const [isLoading, setIsLoading] = useState(autoStart);

  const startLoading = (customDuration?: number) => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, customDuration || duration);

    return () => clearTimeout(timer);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (autoStart) {
      const cleanup = startLoading();
      return cleanup;
    }
  }, [autoStart, duration]);

  return {
    isLoading,
    startLoading,
    stopLoading
  };
};
