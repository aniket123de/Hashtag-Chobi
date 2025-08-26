import { 
	getAboutData, 
	getGalleryData, 
	getGalleryByCategory, 
	getServicesData, 
	getTestimonialsData, 
	getHeroData, 
	getVideoShowcaseData,
	getAllWebsiteData,
	getExtendedGalleryData,
	getCoupleSelections,
	getCoupleImagesExtendedData,
    getVideoGalleryHome,
	type AboutData,
	type GalleryItem,
	type Service,
	type Testimonial,
	type HeroData,
	type VideoShowcaseData,
	type ExtendedGalleryDoc,
	type ExtendedGalleryImage,
	type CoupleSelection,
	type CoupleImagesExtendedDoc,
	type CoupleImagesExtendedImage
} from './firestore';
import type { VideoGalleryHome } from './firestore';

// Cache for storing fetched data
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Utility function to check if cache is valid
function isCacheValid(key: string): boolean {
	const cached = cache.get(key);
	if (!cached) return false;
	return Date.now() - cached.timestamp < CACHE_DURATION;
}

// Utility function to set cache
function setCache<T>(key: string, data: T): void {
	cache.set(key, { data, timestamp: Date.now() });
}

// Utility function to get cache
function getCache<T>(key: string): T | null {
	const cached = cache.get(key);
	return cached ? (cached.data as T) : null;
}

// Clear cache utility
export function clearCache(): void {
	cache.clear();
}

// Clear specific cache entry
export function clearCacheEntry(key: string): void {
	cache.delete(key);
}

// About Service
export class AboutService {
	static async getData(): Promise<AboutData> {
		const cacheKey = 'about-data';
		
		if (isCacheValid(cacheKey)) {
			return getCache(cacheKey);
		}

		try {
			const data = await getAboutData();
			setCache(cacheKey, data);
			return data;
		} catch (error) {
			console.error('AboutService: Error fetching about data:', error);
			throw error;
		}
	}
}

// Gallery Service
export class GalleryService {
	static async getAll(): Promise<GalleryItem[]> {
		const cacheKey = 'gallery-all';
		
		if (isCacheValid(cacheKey)) {
			return getCache(cacheKey);
		}

		try {
			const data = await getGalleryData();
			setCache(cacheKey, data);
			return data;
		} catch (error) {
			console.error('GalleryService: Error fetching gallery data:', error);
			throw error;
		}
	}

	static async getByCategory(category: string): Promise<GalleryItem[]> {
		const cacheKey = `gallery-category-${category.toLowerCase()}`;
		
		if (isCacheValid(cacheKey)) {
			return getCache(cacheKey);
		}

		try {
			const data = await getGalleryByCategory(category);
			setCache(cacheKey, data);
			return data;
		} catch (error) {
			console.error(`GalleryService: Error fetching gallery data for category ${category}:`, error);
			throw error;
		}
	}

	static async getCategories(): Promise<string[]> {
		try {
			const allGallery = await this.getAll();
			const categories = [...new Set(allGallery.map(item => item.category))];
			return categories.sort();
		} catch (error) {
			console.error('GalleryService: Error fetching categories:', error);
			return [];
		}
	}
}

// Extended Gallery Service
export class ExtendedGalleryService {
	static async getData(): Promise<ExtendedGalleryDoc> {
		const cacheKey = 'extended-gallery-data';
		
		if (isCacheValid(cacheKey)) {
			return getCache(cacheKey);
		}

		try {
			const data = await getExtendedGalleryData();
			setCache(cacheKey, data);
			return data;
		} catch (error) {
			console.error('ExtendedGalleryService: Error fetching extended gallery data:', error);
			throw error;
		}
	}
}

// Couple Images Extended Service
export class CoupleImagesExtendedService {
    static async getData(): Promise<CoupleImagesExtendedDoc> {
        const cacheKey = 'couple-images-extended-data';
        if (isCacheValid(cacheKey)) {
            return getCache(cacheKey);
        }
        try {
            const data = await getCoupleImagesExtendedData();
            setCache(cacheKey, data);
            return data;
        } catch (error) {
            console.error('CoupleImagesExtendedService: Error fetching data:', error);
            throw error;
        }
    }
}

// Services Service
export class ServicesService {
	static async getAll(): Promise<Service[]> {
		const cacheKey = 'services-all';
		
		if (isCacheValid(cacheKey)) {
			return getCache(cacheKey);
		}

		try {
			const data = await getServicesData();
			setCache(cacheKey, data);
			return data;
		} catch (error) {
			console.error('ServicesService: Error fetching services data:', error);
			throw error;
		}
	}

	static async getById(id: string): Promise<Service | null> {
		try {
			const allServices = await this.getAll();
			return allServices.find(service => service._id === id) || null;
		} catch (error) {
			console.error(`ServicesService: Error fetching service with id ${id}:`, error);
			return null;
		}
	}
}

// Testimonials Service
export class TestimonialsService {
	static async getAll(): Promise<Testimonial[]> {
		const cacheKey = 'testimonials-all';
		
		if (isCacheValid(cacheKey)) {
			return getCache(cacheKey);
		}

		try {
			const data = await getTestimonialsData();
			setCache(cacheKey, data);
			return data;
		} catch (error) {
			console.error('TestimonialsService: Error fetching testimonials data:', error);
			throw error;
		}
	}

	static async getFeatured(limit: number = 3): Promise<Testimonial[]> {
		try {
			const allTestimonials = await this.getAll();
			return allTestimonials.slice(0, limit);
		} catch (error) {
			console.error('TestimonialsService: Error fetching featured testimonials:', error);
			return [];
		}
	}
}

// Hero Service
export class HeroService {
	static async getData(): Promise<HeroData> {
		const cacheKey = 'hero-data';
		
		if (isCacheValid(cacheKey)) {
			return getCache(cacheKey);
		}

		try {
			const data = await getHeroData();
			setCache(cacheKey, data);
			return data;
		} catch (error) {
			console.error('HeroService: Error fetching hero data:', error);
			throw error;
		}
	}
}

// VideoShowcase Service
export class VideoShowcaseService {
	static async getData(): Promise<VideoShowcaseData> {
		const cacheKey = 'video-showcase-data';
		
		if (isCacheValid(cacheKey)) {
			return getCache(cacheKey);
		}

		try {
			const data = await getVideoShowcaseData();
			setCache(cacheKey, data);
			return data;
		} catch (error) {
			console.error('VideoShowcaseService: Error fetching video showcase data:', error);
			throw error;
		}
	}
}

// Video Gallery Home Service
export class VideoGalleryHomeService {
    static async getData(): Promise<VideoGalleryHome | null> {
        const cacheKey = 'video-gallery-home';
        if (isCacheValid(cacheKey)) return getCache(cacheKey);
        try {
            const data = await getVideoGalleryHome();
            if (data) setCache(cacheKey, data);
            return data;
        } catch (error) {
            console.error('VideoGalleryHomeService: Error fetching home video:', error);
            return null;
        }
    }
}

// Couple Selections Service
export class CoupleSelectionsService {
    static async getAll(): Promise<CoupleSelection[]> {
        const cacheKey = 'couple-selections-all';

        if (isCacheValid(cacheKey)) {
            return getCache(cacheKey);
        }

        try {
            const data = await getCoupleSelections();
            setCache(cacheKey, data);
            return data;
        } catch (error) {
            console.error('CoupleSelectionsService: Error fetching couple selections:', error);
            return [];
        }
    }
}

// Main Website Service - combines all services
export class WebsiteService {
	static async getAllData() {
		const cacheKey = 'website-all-data';
		
		if (isCacheValid(cacheKey)) {
			return getCache(cacheKey);
		}

		try {
			const data = await getAllWebsiteData();
			setCache(cacheKey, data);
			return data;
		} catch (error) {
			console.error('WebsiteService: Error fetching all website data:', error);
			throw error;
		}
	}

	static async getHomePageData() {
		try {
			const [hero, services, testimonials, videoShowcase, coupleSelections] = await Promise.all([
				HeroService.getData(),
				ServicesService.getAll(),
				TestimonialsService.getFeatured(3),
				VideoShowcaseService.getData(),
				CoupleSelectionsService.getAll()
			]);

			return {
				hero,
				services,
				testimonials,
				videoShowcase,
				coupleSelections
			};
		} catch (error) {
			console.error('WebsiteService: Error fetching home page data:', error);
			throw error;
		}
	}

	static async getGalleryPageData() {
		try {
			const [gallery, categories] = await Promise.all([
				GalleryService.getAll(),
				GalleryService.getCategories()
			]);

			return {
				gallery,
				categories
			};
		} catch (error) {
			console.error('WebsiteService: Error fetching gallery page data:', error);
			throw error;
		}
	}
}

// Export types for convenience
export type {
	AboutData,
	GalleryItem,
	Service,
	Testimonial,
	HeroData,
	VideoShowcaseData,
	ExtendedGalleryDoc,
	ExtendedGalleryImage,
	CoupleSelection,
	CoupleImagesExtendedDoc,
	CoupleImagesExtendedImage,
	VideoGalleryHome
}; 