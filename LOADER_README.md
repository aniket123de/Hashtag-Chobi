# Loader System

This project includes a comprehensive loading animation system with bouncing circles that appears during initial loading and route changes.

## Files Created

- `src/components/ui/loader.tsx` - Main loader component
- `src/components/ui/loader.css` - Loader CSS animations
- `src/components/ui/page-loader.tsx` - Page transition loader wrapper
- `src/components/ui/loading-overlay.tsx` - Loading overlay for specific content
- `src/hooks/use-loader.ts` - Custom hook for manual loading states
- `src/components/LoaderExamples.tsx` - Usage examples

## Features

### Automatic Loading
- **Initial Load**: Shows loader for 2 seconds when the app first loads
- **Route Changes**: Shows loader for 0.8 seconds when navigating between pages

### Manual Loading
Use the `useLoader` hook or `LoadingOverlay` component for custom loading states.

## Usage Examples

### Basic Loader
```tsx
import Loader from '@/components/ui/loader';

// In your component
<Loader size="md" />
```

### Manual Loading State
```tsx
import { useLoader } from '@/hooks/use-loader';

const MyComponent = () => {
  const { isLoading, startLoading } = useLoader();
  
  const handleAction = () => {
    startLoading(2000); // Show loader for 2 seconds
  };
  
  if (isLoading) {
    return <Loader size="lg" />;
  }
  
  return <div>Content</div>;
};
```

### Loading Overlay
```tsx
import LoadingOverlay from '@/components/ui/loading-overlay';

<LoadingOverlay 
  isLoading={isLoading} 
  message="Loading..."
  loaderSize="md"
>
  <div>Your content here</div>
</LoadingOverlay>
```

## Customization

### Loader Sizes
- `sm` - Small (75% scale)
- `md` - Medium (100% scale) 
- `lg` - Large (125% scale)

### Timing Configuration
Edit the `PageLoader` component to adjust:
- `loadingDuration` - Initial loading time (default: 2000ms)
- Route transition time (default: 800ms)

### Styling
Modify `loader.css` to customize:
- Circle colors
- Animation timing
- Shadow effects
- Background overlay

## Integration

The loader is automatically integrated into your app through the `PageLoader` wrapper in `App.tsx`. No additional setup required for basic functionality.

For custom loading states, import the components and hooks as needed in your individual components.
