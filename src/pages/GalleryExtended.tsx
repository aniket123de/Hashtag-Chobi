import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	X,
	Heart,
	Share2,
	Download,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import NewHeader from "@/components/NewHeader";
import Footer from "@/components/Footer";
import { FadeInText } from "@/components/ui/fade-in-section";
import { useExtendedGalleryData } from "@/hooks/useWebsiteData";
import { ExtendedGalleryImage } from "@/lib/services";

const GalleryExtended = () => {
	const [selectedImage, setSelectedImage] = useState<ExtendedGalleryImage | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string>("All");

	// Scroll to top on component mount
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	}, []);

	// Fetch extended gallery data from Firestore
	const { data: extendedGallery, loading, error } = useExtendedGalleryData();

	// Derive images and categories
	const images: ExtendedGalleryImage[] = extendedGallery?.images || [];
	const availableCategories = [
		"All",
		...Array.from(new Set(images.map((img) => img.category)))
	];

	// Helper to safely read page content fields
	type PageContent = { title?: string; highlight?: string; description?: string };
	const pageContent: PageContent = (extendedGallery?.pageContent && typeof extendedGallery.pageContent === 'object')
		? (extendedGallery.pageContent as PageContent)
		: {};

	// Show loading state
	if (loading) {
		return (
			<>
				<NewHeader />
				<div className="min-h-screen bg-gray-50 pt-20">
					<div className="max-w-6xl mx-auto px-6 py-12">
						<div className="text-center mb-12">
							<div className="animate-pulse">
								<div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
								<div className="h-12 bg-gray-300 rounded w-96 mx-auto mb-6"></div>
								<div className="h-6 bg-gray-300 rounded w-80 mx-auto"></div>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
								<div key={item} className="animate-pulse">
									<div className="aspect-square bg-gray-200 rounded-lg"></div>
								</div>
							))}
						</div>
					</div>
				</div>
				<Footer />
			</>
		);
	}

	// Show error state
	if (error) {
		return (
			<>
				<NewHeader />
				<div className="min-h-screen bg-gray-50 pt-20">
					<div className="max-w-6xl mx-auto px-6 py-12">
						<div className="text-center">
							<div className="text-red-500">
								<p>Error loading gallery. Please try again later.</p>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</>
		);
	}

	// If no gallery items, show empty state
	if (!images || images.length === 0) {
		return (
			<>
				<NewHeader />
				<div className="min-h-screen bg-gray-50 pt-20">
					<div className="max-w-6xl mx-auto px-6 py-12">
						<div className="text-center">
							<p className="text-gray-500">No gallery items available at the moment.</p>
						</div>
					</div>
				</div>
				<Footer />
			</>
		);
	}

	// Filter images by category
	const filteredImages = selectedCategory === "All"
		? images
		: images.filter((img) => img.category === selectedCategory);

	// Function to get grid class based on size
	const getGridClass = (size: string) => {
		switch (size) {
			case "small":
				return "col-span-1 row-span-1";
			case "medium":
				return "col-span-1 row-span-2";
			case "large":
				return "col-span-2 row-span-2";
			case "wide":
				return "col-span-2 row-span-1";
			case "tall":
				return "col-span-1 row-span-2";
			default:
				return "col-span-1 row-span-1";
		}
	};

	const openLightbox = (image: ExtendedGalleryImage) => {
		setSelectedImage(image);
	};

	const closeLightbox = () => {
		setSelectedImage(null);
	};

	const navigateImage = (direction: "prev" | "next") => {
		if (!selectedImage) return;

		const currentIndex = filteredImages.findIndex(
			(img) => img.id === selectedImage.id
		);
		let newIndex;

		if (direction === "prev") {
			newIndex =
				currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
		} else {
			newIndex =
				currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
		}

		setSelectedImage(filteredImages[newIndex]);
	};

	// Page content fallbacks
	const pageTitle = pageContent.title || "Our Complete";
	const pageHighlight = pageContent.highlight || "Gallery Collection";
	const pageDescription = pageContent.description ||
		"Explore our comprehensive collection of wedding photography, portraits, and special events. Each image tells a unique story of love, joy, and celebration.";

	return (
		<div className="min-h-screen bg-background">
			<NewHeader />

			{/* Hero Section */}
			<section className="pt-24 pb-16 bg-gradient-to-b from-cream-50 to-white">
				<div className="max-w-6xl mx-auto px-6 text-center">
					<FadeInText
						as="h1"
						className="text-4xl md:text-6xl font-serif text-gray-900 mb-6"
						delay={0.1}
					>
						{pageTitle}
						<span className="block text-blush-500 italic">
							{pageHighlight}
						</span>
					</FadeInText>
					<FadeInText
						as="p"
						className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans"
						delay={0.3}
					>
						{pageDescription}
					</FadeInText>
				</div>
			</section>

			{/* Filter Categories */}
			<section className="py-8 bg-background border-b border-gray-100">
				<div className="max-w-6xl mx-auto px-6">
					<div className="flex flex-wrap justify-center gap-4">
						{availableCategories.map((category) => (
							<motion.button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
									selectedCategory === category
										? "bg-blush-500 text-black shadow-lg"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								{category}
							</motion.button>
						))}
					</div>
				</div>
			</section>

			{/* Bento Grid Gallery */}
			<section className="py-16 bg-background">
				<div className="max-w-7xl mx-auto px-6">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
						{filteredImages.map((image, index) => (
							<motion.div
								key={image.id}
								className={`group relative overflow-hidden rounded-2xl cursor-pointer ${getGridClass(
									image.size
								)}`}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								onClick={() => openLightbox(image)}
								whileHover={{ scale: 1.02 }}
							>
								<img
									src={image.url}
									alt={image.alt}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
									loading="lazy"
								/>

								{/* Overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<div className="absolute bottom-4 left-4 right-4">
										<h3 className="text-white font-serif text-lg font-semibold mb-1">
											{image.title || image.alt}
										</h3>
										<p className="text-white/80 text-sm font-sans">
											{image.category}
										</p>
									</div>
								</div>

								{/* Category Badge */}
								<div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
									<span className="text-xs font-medium text-gray-800">
										{image.category}
									</span>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Lightbox Modal */}
			<AnimatePresence>
				{selectedImage && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
						onClick={closeLightbox}
					>
						{/* Close Button */}
						<button
							onClick={closeLightbox}
							className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
						>
							<X size={32} />
						</button>

						{/* Navigation Buttons */}
						<button
							onClick={(e) => {
								e.stopPropagation();
								navigateImage("prev");
							}}
							className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
						>
							<ChevronLeft size={48} />
						</button>

						<button
							onClick={(e) => {
								e.stopPropagation();
								navigateImage("next");
							}}
							className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
						>
							<ChevronRight size={48} />
						</button>

						{/* Image Container */}
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							className="max-w-4xl max-h-[80vh] relative"
							onClick={(e) => e.stopPropagation()}
						>
							<img
								src={selectedImage.url}
								alt={selectedImage.alt}
								className="w-full h-full object-contain rounded-lg"
							/>

							{/* Image Info */}
							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
								<h3 className="text-white font-serif text-2xl font-semibold mb-2">
									{selectedImage.title || selectedImage.alt}
								</h3>
								<p className="text-white/80 font-sans mb-4">
									{selectedImage.description || selectedImage.alt}
								</p>

								{/* Action Buttons */}
								<div className="flex gap-4">
									<button className="flex items-center gap-2 text-white hover:text-red-400 transition-colors">
										<Heart size={20} />
										<span className="text-sm">Like</span>
									</button>
									<button className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
										<Share2 size={20} />
										<span className="text-sm">Share</span>
									</button>
									<button className="flex items-center gap-2 text-white hover:text-green-400 transition-colors">
										<Download size={20} />
										<span className="text-sm">Download</span>
									</button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Back to Home CTA */}
			<section className="py-16 bg-gradient-to-r from-blush-500/10 to-golden-500/10">
				<div className="max-w-4xl mx-auto px-6 text-center">
					<FadeInText
						as="h2"
						className="text-3xl md:text-4xl font-serif text-gray-900 mb-6"
						delay={0.1}
					>
						Ready to Create Your Own
						<span className="block text-blush-500 italic">
							Beautiful Story?
						</span>
					</FadeInText>
					<FadeInText
						as="p"
						className="text-lg text-gray-600 mb-8 font-sans"
						delay={0.3}
					>
						Let's capture your special moments with the same passion and
						artistry you see in our gallery.
					</FadeInText>
					<FadeInText as="div" delay={0.5}>
						<Link
							to="/#contact"
							className="inline-block bg-blush-500 hover:bg-blush-600 text-black px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-sans"
						>
							Book Your Session
						</Link>
					</FadeInText>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default GalleryExtended;
