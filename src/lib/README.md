# Firestore Service Layer Documentation

This directory contains the service layer for fetching data from Firestore for the HashtagChobi photography website.

## Files

- `firestore.ts` - Core Firestore configuration and low-level data fetching functions
- `services.ts` - High-level service classes with caching and error handling
- `README.md` - This documentation file

## Firebase Configuration

The service layer uses the same Firebase configuration as the admin backend:

- **Project ID**: `hashtagchobi-673eb`
- **Environment Variables**: All config values use environment variables with fallbacks

### Required Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=hashtagchobi-673eb
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

## Data Collections

### Gallery Collection
- **Collection**: `gallery`
- **Type**: `GalleryItem[]`
- **Query**: Ordered by `createdAt` descending
- **Categories**: Wedding, Portrait, Event, etc.

### Services Collection
- **Collection**: `services`
- **Type**: `Service[]`
- **Query**: Ordered by `order` ascending

### Testimonials Collection
- **Collection**: `testimonials`
- **Type**: `Testimonial[]`
- **Query**: Ordered by `createdAt` descending

### Hero Document
- **Document**: `hero/main`
- **Type**: `HeroData`

### About Document
- **Document**: `about/main`
- **Type**: `AboutData`

## Usage

### Using Service Classes

```typescript
import { GalleryService, ServicesService, TestimonialsService } from '../lib/services';

// Fetch all gallery items
const gallery = await GalleryService.getAll();

// Fetch gallery by category
const weddingPhotos = await GalleryService.getByCategory('Wedding');

// Fetch all services
const services = await ServicesService.getAll();

// Fetch featured testimonials
const testimonials = await TestimonialsService.getFeatured(3);
```

### Using React Hooks

```typescript
import { useGalleryData, useServicesData, useHomePageData } from '../hooks/useWebsiteData';

function MyComponent() {
  const { data: gallery, loading, error } = useGalleryData();
  const { data: services } = useServicesData();
  const { data: homeData } = useHomePageData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
}
```

### Using Low-level Functions

```typescript
import { getGalleryData, getServicesData } from '../lib/firestore';

// Direct Firestore access
const gallery = await getGalleryData();
const services = await getServicesData();
```

## Caching

The service layer includes automatic caching with a 5-minute duration:

- **Cache Duration**: 5 minutes
- **Cache Keys**: Unique keys for each data type and query
- **Cache Management**: Automatic invalidation and manual clearing

### Cache Management

```typescript
import { clearCache, clearCacheEntry } from '../lib/services';

// Clear all cache
clearCache();

// Clear specific cache entry
clearCacheEntry('gallery-all');
```

## Error Handling

All service functions include comprehensive error handling:

- **Try-catch blocks** around all Firestore operations
- **Fallback data** for critical sections (Hero, About)
- **Console logging** for debugging
- **Graceful degradation** when data is unavailable

## Performance Optimizations

- **Firestore Lite**: Uses `firebase/firestore/lite` for better performance
- **Lazy Initialization**: Firebase app and Firestore instances are initialized only when needed
- **Caching**: 5-minute cache reduces Firestore reads
- **Parallel Fetching**: `getAllWebsiteData()` fetches all data in parallel

## TypeScript Support

All functions and data structures are fully typed:

```typescript
import type { GalleryItem, Service, Testimonial, HeroData } from '../lib/services';

// Type-safe data handling
const gallery: GalleryItem[] = await GalleryService.getAll();
```

## Best Practices

1. **Use React Hooks** for component data fetching
2. **Use Service Classes** for complex data operations
3. **Handle Loading States** in your components
4. **Implement Error Boundaries** for error handling
5. **Clear Cache** when data is updated in admin
6. **Use TypeScript** for type safety

## Troubleshooting

### Common Issues

1. **Firebase not initialized**: Check environment variables
2. **Permission denied**: Verify Firestore security rules
3. **Cache issues**: Clear cache with `clearCache()`
4. **Type errors**: Ensure all imports include proper types

### Debug Mode

Enable debug logging by setting:

```typescript
localStorage.setItem('debug', 'firestore:*');
```

This will log all Firestore operations to the console. 