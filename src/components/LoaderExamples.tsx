// Example usage of the loader components
import React from 'react';
import Loader from '@/components/ui/loader';
import LoadingOverlay from '@/components/ui/loading-overlay';
import { useLoader } from '@/hooks/use-loader';

const LoaderExamples = () => {
  const { isLoading, startLoading, stopLoading } = useLoader();

  const handleStartLoading = () => {
    startLoading(3000); // Load for 3 seconds
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Loader Examples</h1>
      
      {/* Basic loader usage */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Loaders</h2>
        <div className="flex gap-4 items-center">
          <div className="bg-gray-100 p-4 rounded">
            <p className="mb-2">Small</p>
            <Loader size="sm" />
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p className="mb-2">Medium</p>
            <Loader size="md" />
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p className="mb-2">Large</p>
            <Loader size="lg" />
          </div>
        </div>
      </div>

      {/* Loading overlay example */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Loading Overlay</h2>
        <button 
          onClick={handleStartLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start Loading
        </button>
        
        <LoadingOverlay 
          isLoading={isLoading} 
          message="Loading content..."
          loaderSize="lg"
        >
          <div className="bg-gray-200 p-8 rounded min-h-[200px]">
            <p>This content will be overlaid with a loader when loading state is active.</p>
            <p>Click the button above to see the loading overlay in action.</p>
          </div>
        </LoadingOverlay>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Usage Notes</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>The loader automatically shows during initial app load</li>
          <li>Route transitions trigger the loader automatically</li>
          <li>Use the `useLoader` hook for manual loading states</li>
          <li>Use `LoadingOverlay` to overlay specific content areas</li>
          <li>The loader is responsive and works well on all screen sizes</li>
        </ul>
      </div>
    </div>
  );
};

export default LoaderExamples;
