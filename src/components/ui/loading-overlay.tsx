import React from 'react';
import Loader from './loader';

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  loaderSize?: 'sm' | 'md' | 'lg';
  overlayClass?: string;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children,
  loaderSize = 'md',
  overlayClass = '',
  message
}) => {
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {children}
      <div className={`absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50 ${overlayClass}`}>
        <Loader size={loaderSize} />
        {message && (
          <p className="text-white mt-4 text-sm font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
