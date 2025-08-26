import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, getDocs, query, orderBy, type Firestore, type Timestamp } from "firebase/firestore/lite";

// Types
export type AboutImage = { url: string; alt: string; cloudinaryId?: string };
export type AboutStat = { label: string; value: string };
export type AboutData = {
	title: string;
	subtitle: string;
	description: string;
	images: AboutImage[];
	stats: AboutStat[];
};

// Gallery Types
export type GalleryItem = {
	_id: string;
	url: string;
	alt: string;
	category: string;
	title?: string; // Optional title for the image
	description?: string; // Optional description for the image
	cloudinaryId?: string;
	createdAt?: Timestamp; // Firestore timestamp
};

// Extended Gallery Types
export type ExtendedGalleryImage = {
	id: string;
	url: string;
	alt: string;
	category: string;
	title: string;
	description: string;
	size: string;
	cloudinaryId?: string;
};

export type ExtendedGalleryDoc = {
	pageContent: unknown;
	images: ExtendedGalleryImage[];
};

// Services Types
export type Service = {
	_id: string;
	title: string;
	description: string;
	image: string;
	price: string;
	order: number;
	category?: string; // Optional category for service classification
	cloudinaryId?: string;
};

// Testimonials Types
export type Testimonial = {
	_id: string;
	name: string;
	role: string;
	content: string;
	rating: number;
	image: string;
	cloudinaryId?: string;
	createdAt?: Timestamp; // Firestore timestamp
};

// Hero Types
export type HeroData = {
	title: string;
	subtitle: string;
	description: string;
	ctaText: string;
	backgroundImage: string;
	footerImage?: string; // Optional - used in Footer component
	cloudinaryId?: string;
	footerCloudinaryId?: string;
};

// VideoShowcase Types
export type VideoShowcaseData = {
	title: string;
	subtitle: string;
	description: string;
	videoUrl: string;
	videoUrl2: string;
	thumbnailUrl: string;
	cloudinaryId?: string;
};

// Default fallback for when the document doesn't exist
export const DEFAULT_ABOUT_DATA: AboutData = {
	title: "About Us",
	subtitle: "Preserving Love Stories, Frame by Frame",
	description:
		"With an artistic eye and a passion for storytelling, we have been capturing the magic of weddings since 2016.",
	images: [
		{ url: "/placeholder.svg", alt: "About image placeholder" }
	],
	stats: [
		{ label: "Weddings Captured", value: "500+" },
		{ label: "Years Experience", value: "8+" },
		{ label: "Client Satisfaction", value: "98%" }
	]
};

export const DEFAULT_HERO_DATA: HeroData = {
	title: "Capturing Life's Beautiful Moments",
	subtitle: "Professional Photography Services",
	description: "From weddings to corporate events, we specialize in creating timeless memories through our lens.",
	ctaText: "Book Your Session",
	backgroundImage: "/src/assets/image/HERO.jpg",
	footerImage: ""
};

export const DEFAULT_VIDEO_SHOWCASE_DATA: VideoShowcaseData = {
	title: "Our Story in Motion",
	subtitle: "Cinematic Wedding Stories",
	description: "Experience the magic of our wedding photography and videography through this cinematic showcase. Watch how we capture the essence of love, joy, and celebration in every frame.",
	videoUrl: "https://www.youtube.com/watch?v=XDp_YjH62B4",
	videoUrl2: "https://www.youtube.com/watch?v=XDp_YjH62B4",
	thumbnailUrl: "/src/assets/image/VIDEO_THUMBNAIL.jpg"
};

export const DEFAULT_EXTENDED_GALLERY_DATA: ExtendedGalleryDoc = {
	pageContent: {},
	images: []
};

// Lazy singleton initialization
let firebaseAppInstance: FirebaseApp | null = null;
let firestoreInstance: Firestore | null = null;

function getFirebaseConfig() {
	return {
		apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
		authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
		projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "hashtagchobi-673eb",
		storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
		messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
		appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
	};
}

export function getFirebaseApp(): FirebaseApp {
	if (firebaseAppInstance) return firebaseAppInstance;
	const existing = getApps();
	firebaseAppInstance = existing.length > 0 ? existing[0] : initializeApp(getFirebaseConfig());
	return firebaseAppInstance;
}

export function getDb(): Firestore {
	if (firestoreInstance) return firestoreInstance;
	firestoreInstance = getFirestore(getFirebaseApp());
	return firestoreInstance;
}

// Read-only fetchers
export async function getAboutData(): Promise<AboutData> {
	const database = getDb();
	const aboutRef = doc(database, "about", "main");
	const snapshot = await getDoc(aboutRef);

	if (!snapshot.exists()) {
		return DEFAULT_ABOUT_DATA;
	}

	const data = snapshot.data() as Partial<AboutData> | undefined;
	if (!data) return DEFAULT_ABOUT_DATA;

	// Basic normalization with fallbacks
	return {
		title: data.title ?? DEFAULT_ABOUT_DATA.title,
		subtitle: data.subtitle ?? DEFAULT_ABOUT_DATA.subtitle,
		description: data.description ?? DEFAULT_ABOUT_DATA.description,
		images: Array.isArray(data.images) ? data.images as AboutImage[] : DEFAULT_ABOUT_DATA.images,
		stats: Array.isArray(data.stats) ? data.stats as AboutStat[] : DEFAULT_ABOUT_DATA.stats
	};
}

// Gallery Service
export async function getGalleryData(): Promise<GalleryItem[]> {
	try {
		const database = getDb();
		const galleryRef = collection(database, "gallery");
		const galleryQuery = query(galleryRef, orderBy("createdAt", "desc"));
		const snapshot = await getDocs(galleryQuery);

		if (snapshot.empty) {
			return [];
		}

		return snapshot.docs.map(doc => ({
			_id: doc.id,
			...doc.data()
		})) as GalleryItem[];
	} catch (error) {
		console.error("Error fetching gallery data:", error);
		return [];
	}
}

export async function getGalleryByCategory(category: string): Promise<GalleryItem[]> {
	try {
		const allGallery = await getGalleryData();
		return allGallery.filter(item => 
			item.category.toLowerCase() === category.toLowerCase()
		);
	} catch (error) {
		console.error(`Error fetching gallery data for category ${category}:`, error);
		return [];
	}
}

// Extended Gallery Service
export async function getExtendedGalleryData(): Promise<ExtendedGalleryDoc> {
	try {
		const database = getDb();
		const ref = doc(database, "extendedGallery", "main");
		const snapshot = await getDoc(ref);

		if (!snapshot.exists()) {
			return DEFAULT_EXTENDED_GALLERY_DATA;
		}

		const data = snapshot.data() as Partial<ExtendedGalleryDoc> | undefined;
		if (!data) return DEFAULT_EXTENDED_GALLERY_DATA;

		return {
			pageContent: data.pageContent ?? {},
			images: Array.isArray(data.images) ? data.images as ExtendedGalleryImage[] : []
		};
	} catch (error) {
		console.error("Error fetching extended gallery data:", error);
		return DEFAULT_EXTENDED_GALLERY_DATA;
	}
}

// Services Service
export async function getServicesData(): Promise<Service[]> {
	try {
		const database = getDb();
		const servicesRef = collection(database, "services");
		const servicesQuery = query(servicesRef, orderBy("order", "asc"));
		const snapshot = await getDocs(servicesQuery);

		if (snapshot.empty) {
			return [];
		}

		return snapshot.docs.map(doc => ({
			_id: doc.id,
			...doc.data()
		})) as Service[];
	} catch (error) {
		console.error("Error fetching services data:", error);
		return [];
	}
}

// Testimonials Service
export async function getTestimonialsData(): Promise<Testimonial[]> {
	try {
		const database = getDb();
		const testimonialsRef = collection(database, "testimonials");
		const testimonialsQuery = query(testimonialsRef, orderBy("createdAt", "desc"));
		const snapshot = await getDocs(testimonialsQuery);

		if (snapshot.empty) {
			return [];
		}

		return snapshot.docs.map(doc => ({
			_id: doc.id,
			...doc.data()
		})) as Testimonial[];
	} catch (error) {
		console.error("Error fetching testimonials data:", error);
		return [];
	}
}

// Hero Service
export async function getHeroData(): Promise<HeroData> {
	try {
		const database = getDb();
		const heroRef = doc(database, "hero", "main");
		const snapshot = await getDoc(heroRef);

		if (!snapshot.exists()) {
			return DEFAULT_HERO_DATA;
		}

		const data = snapshot.data() as Partial<HeroData> | undefined;
		if (!data) return DEFAULT_HERO_DATA;

		// Basic normalization with fallbacks
		return {
			title: data.title ?? DEFAULT_HERO_DATA.title,
			subtitle: data.subtitle ?? DEFAULT_HERO_DATA.subtitle,
			description: data.description ?? DEFAULT_HERO_DATA.description,
			ctaText: data.ctaText ?? DEFAULT_HERO_DATA.ctaText,
			backgroundImage: data.backgroundImage ?? DEFAULT_HERO_DATA.backgroundImage,
			footerImage: data.footerImage ?? DEFAULT_HERO_DATA.footerImage,
			cloudinaryId: data.cloudinaryId,
			footerCloudinaryId: data.footerCloudinaryId
		};
	} catch (error) {
		console.error("Error fetching hero data:", error);
		return DEFAULT_HERO_DATA;
	}
}

// VideoShowcase Service
export async function getVideoShowcaseData(): Promise<VideoShowcaseData> {
	try {
		const database = getDb();
		const videoShowcaseRef = doc(database, "videoShowcase", "main");
		const snapshot = await getDoc(videoShowcaseRef);

		if (!snapshot.exists()) {
			return DEFAULT_VIDEO_SHOWCASE_DATA;
		}

		const data = snapshot.data() as Partial<VideoShowcaseData> | undefined;
		if (!data) return DEFAULT_VIDEO_SHOWCASE_DATA;

		// Basic normalization with fallbacks
		return {
			title: data.title ?? DEFAULT_VIDEO_SHOWCASE_DATA.title,
			subtitle: data.subtitle ?? DEFAULT_VIDEO_SHOWCASE_DATA.subtitle,
			description: data.description ?? DEFAULT_VIDEO_SHOWCASE_DATA.description,
			videoUrl: data.videoUrl ?? DEFAULT_VIDEO_SHOWCASE_DATA.videoUrl,
			videoUrl2: data.videoUrl2 ?? DEFAULT_VIDEO_SHOWCASE_DATA.videoUrl2,
			thumbnailUrl: data.thumbnailUrl ?? DEFAULT_VIDEO_SHOWCASE_DATA.thumbnailUrl,
			cloudinaryId: data.cloudinaryId
		};
	} catch (error) {
		console.error("Error fetching video showcase data:", error);
		return DEFAULT_VIDEO_SHOWCASE_DATA;
	}
}

// Utility function to get all website data at once
export async function getAllWebsiteData() {
	try {
		const [about, gallery, services, testimonials, hero, videoShowcase] = await Promise.all([
			getAboutData(),
			getGalleryData(),
			getServicesData(),
			getTestimonialsData(),
			getHeroData(),
			getVideoShowcaseData()
		]);

		return {
			about,
			gallery,
			services,
			testimonials,
			hero,
			videoShowcase
		};
	} catch (error) {
		console.error("Error fetching all website data:", error);
		return {
			about: DEFAULT_ABOUT_DATA,
			gallery: [],
			services: [],
			testimonials: [],
			hero: DEFAULT_HERO_DATA,
			videoShowcase: DEFAULT_VIDEO_SHOWCASE_DATA
		};
	}
} 