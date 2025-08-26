import React from 'react';
import { 
	useGalleryData, 
	useServicesData, 
	useTestimonialsData, 
	useHeroData,
	useHomePageData 
} from '../hooks/useWebsiteData';

// Example component showing how to use the service layer
export function ExampleUsage() {
	// Individual data fetching
	const { data: gallery, loading: galleryLoading, error: galleryError } = useGalleryData();
	const { data: services, loading: servicesLoading } = useServicesData();
	const { data: testimonials } = useTestimonialsData();
	const { data: hero } = useHeroData();

	// Combined data fetching for home page
	const { data: homeData, loading: homeLoading, error: homeError } = useHomePageData();

	if (homeLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-lg">Loading website data...</div>
			</div>
		);
	}

	if (homeError) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-red-500">Error loading data: {homeError}</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Hero Section */}
			{hero && (
				<section className="mb-12">
					<h1 className="text-4xl font-bold mb-4">{hero.title}</h1>
					<p className="text-xl mb-2">{hero.subtitle}</p>
					<p className="text-gray-600 mb-4">{hero.description}</p>
					<button className="bg-blue-500 text-white px-6 py-2 rounded">
						{hero.ctaText}
					</button>
				</section>
			)}

			{/* Services Section */}
			{services && services.length > 0 && (
				<section className="mb-12">
					<h2 className="text-3xl font-bold mb-6">Our Services</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{services.map((service) => (
							<div key={service._id} className="border rounded-lg p-4">
								<img 
									src={service.image} 
									alt={service.title}
									className="w-full h-48 object-cover rounded mb-4"
								/>
								<h3 className="text-xl font-semibold mb-2">{service.title}</h3>
								<p className="text-gray-600 mb-2">{service.description}</p>
								<p className="text-lg font-bold text-blue-600">{service.price}</p>
							</div>
						))}
					</div>
				</section>
			)}

			{/* Gallery Section */}
			{gallery && gallery.length > 0 && (
				<section className="mb-12">
					<h2 className="text-3xl font-bold mb-6">Gallery</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{gallery.slice(0, 8).map((item) => (
							<div key={item._id} className="relative group">
								<img 
									src={item.url} 
									alt={item.alt}
									className="w-full h-48 object-cover rounded"
								/>
								<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded flex items-center justify-center">
									<span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										{item.category}
									</span>
								</div>
							</div>
						))}
					</div>
				</section>
			)}

			{/* Testimonials Section */}
			{testimonials && testimonials.length > 0 && (
				<section className="mb-12">
					<h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{testimonials.slice(0, 3).map((testimonial) => (
							<div key={testimonial._id} className="border rounded-lg p-6">
								<div className="flex items-center mb-4">
									<img 
										src={testimonial.image} 
										alt={testimonial.name}
										className="w-12 h-12 rounded-full mr-4"
									/>
									<div>
										<h4 className="font-semibold">{testimonial.name}</h4>
										<p className="text-gray-600 text-sm">{testimonial.role}</p>
									</div>
								</div>
								<p className="text-gray-700 mb-3">{testimonial.content}</p>
								<div className="flex text-yellow-400">
									{[...Array(testimonial.rating)].map((_, i) => (
										<span key={i}>★</span>
									))}
								</div>
							</div>
						))}
					</div>
				</section>
			)}

			{/* Data Summary */}
			<div className="bg-gray-100 rounded-lg p-6">
				<h3 className="text-xl font-semibold mb-4">Data Summary</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
					<div>
						<div className="text-2xl font-bold text-blue-600">
							{services?.length || 0}
						</div>
						<div className="text-sm text-gray-600">Services</div>
					</div>
					<div>
						<div className="text-2xl font-bold text-green-600">
							{gallery?.length || 0}
						</div>
						<div className="text-sm text-gray-600">Gallery Items</div>
					</div>
					<div>
						<div className="text-2xl font-bold text-purple-600">
							{testimonials?.length || 0}
						</div>
						<div className="text-sm text-gray-600">Testimonials</div>
					</div>
					<div>
						<div className="text-2xl font-bold text-orange-600">
							{gallery ? [...new Set(gallery.map(item => item.category))].length : 0}
						</div>
						<div className="text-sm text-gray-600">Categories</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Example of using the service classes directly
export async function ExampleServiceUsage() {
	// This would be used in server-side functions or event handlers
	const { GalleryService, ServicesService, TestimonialsService } = await import('../lib/services');
	
	try {
		// Fetch data using service classes
		const [gallery, services, testimonials] = await Promise.all([
			GalleryService.getAll(),
			ServicesService.getAll(),
			TestimonialsService.getFeatured(3)
		]);

		console.log('Gallery items:', gallery.length);
		console.log('Services:', services.length);
		console.log('Featured testimonials:', testimonials.length);

		return { gallery, services, testimonials };
	} catch (error) {
		console.error('Error fetching data:', error);
		return { gallery: [], services: [], testimonials: [] };
	}
} 