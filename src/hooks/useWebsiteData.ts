import { useState, useEffect, useCallback } from 'react';
import { 
	AboutService,
	GalleryService,
	ServicesService,
	TestimonialsService,
	HeroService,
	VideoShowcaseService,
	WebsiteService,
	type AboutData,
	type GalleryItem,
	type Service,
	type Testimonial,
	type HeroData,
	type VideoShowcaseData
} from '../lib/services';

// Generic hook for data fetching
function useDataFetching<T>(
	fetchFunction: () => Promise<T>,
	dependencies: React.DependencyList = []
) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const result = await fetchFunction();
			setData(result);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
			console.error('Data fetching error:', err);
		} finally {
			setLoading(false);
		}
	}, [fetchFunction]);

	useEffect(() => {
		fetchData();
	}, dependencies);

	const refetch = useCallback(() => {
		fetchData();
	}, [fetchData]);

	return { data, loading, error, refetch };
}

// About data hook
export function useAboutData() {
	return useDataFetching(() => AboutService.getData());
}

// Gallery data hooks
export function useGalleryData() {
	return useDataFetching(() => GalleryService.getAll());
}

export function useGalleryByCategory(category: string) {
	return useDataFetching(
		() => GalleryService.getByCategory(category),
		[category]
	);
}

export function useGalleryCategories() {
	return useDataFetching(() => GalleryService.getCategories());
}

// Services data hooks
export function useServicesData() {
	return useDataFetching(() => ServicesService.getAll());
}

export function useServiceById(id: string) {
	return useDataFetching(
		() => ServicesService.getById(id),
		[id]
	);
}

// Testimonials data hooks
export function useTestimonialsData() {
	return useDataFetching(() => TestimonialsService.getAll());
}

export function useFeaturedTestimonials(limit: number = 3) {
	return useDataFetching(
		() => TestimonialsService.getFeatured(limit),
		[limit]
	);
}

// Hero data hook
export function useHeroData() {
	return useDataFetching(() => HeroService.getData());
}

// VideoShowcase data hook
export function useVideoShowcaseData() {
	return useDataFetching(() => VideoShowcaseService.getData());
}

// Website data hooks
export function useAllWebsiteData() {
	return useDataFetching(() => WebsiteService.getAllData());
}

export function useHomePageData() {
	return useDataFetching(() => WebsiteService.getHomePageData());
}

export function useGalleryPageData() {
	return useDataFetching(() => WebsiteService.getGalleryPageData());
}

// Utility hook for multiple data sources
export function useMultipleData<T extends Record<string, unknown>>(
	dataSources: Record<keyof T, () => Promise<unknown>>
) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAllData = async () => {
			try {
				setLoading(true);
				setError(null);

				const promises = Object.entries(dataSources).map(async ([key, fetchFn]) => {
					const result = await fetchFn();
					return [key, result];
				});

				const results = await Promise.all(promises);
				const combinedData = Object.fromEntries(results) as T;
				setData(combinedData);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred');
				console.error('Multiple data fetching error:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchAllData();
	}, [dataSources]);

	return { data, loading, error };
}

// Export types for convenience
export type {
	AboutData,
	GalleryItem,
	Service,
	Testimonial,
	HeroData,
	VideoShowcaseData
}; 