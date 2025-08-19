import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, doc, getDoc, type Firestore } from "firebase/firestore/lite";

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