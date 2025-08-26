import { FadeInText } from "@/components/ui/fade-in-section";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useGalleryData } from "@/hooks/useWebsiteData";
import { GalleryItem } from "@/lib/services";

const Gallery = () => {
  // Fetch gallery data from Firestore
  const { data: galleryItems, loading, error } = useGalleryData();

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-16">
            <FadeInText 
              as="span" 
              className="text-sm font-medium text-golden-500 tracking-wide uppercase font-sans"
              delay={0.1}
            >
              Portfolio
            </FadeInText>
            <FadeInText 
              as="h2" 
              className="text-4xl md:text-5xl font-serif text-gray-800 mt-2 mb-6"
              delay={0.3}
            >
              Our Recent
              <span className="text-blush-900 italic block">Love Stories</span>
            </FadeInText>
            <FadeInText 
              as="p" 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans"
              delay={0.5}
            >
              Explore a curated selection of our most beautiful weddings, each
              uniquely captured to reflect our couples' authentic love stories.
            </FadeInText>
          </div>

          {/* Loading Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-16">
            <FadeInText 
              as="span" 
              className="text-sm font-medium text-golden-500 tracking-wide uppercase font-sans"
              delay={0.1}
            >
              Portfolio
            </FadeInText>
            <FadeInText 
              as="h2" 
              className="text-4xl md:text-5xl font-serif text-gray-800 mt-2 mb-6"
              delay={0.3}
            >
              Our Recent
              <span className="text-blush-900 italic block">Love Stories</span>
            </FadeInText>
            <FadeInText 
              as="p" 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans"
              delay={0.5}
            >
              Explore a curated selection of our most beautiful weddings, each
              uniquely captured to reflect our couples' authentic love stories.
            </FadeInText>
          </div>

          {/* Error Message */}
          <div className="text-center">
            <div className="text-red-500">
              <p>Error loading gallery. Please try again later.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If no gallery items, show empty state
  if (!galleryItems || galleryItems.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-16">
            <FadeInText 
              as="span" 
              className="text-sm font-medium text-golden-500 tracking-wide uppercase font-sans"
              delay={0.1}
            >
              Portfolio
            </FadeInText>
            <FadeInText 
              as="h2" 
              className="text-4xl md:text-5xl font-serif text-gray-800 mt-2 mb-6"
              delay={0.3}
            >
              Our Recent
              <span className="text-blush-900 italic block">Love Stories</span>
            </FadeInText>
            <FadeInText 
              as="p" 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans"
              delay={0.5}
            >
              Explore a curated selection of our most beautiful weddings, each
              uniquely captured to reflect our couples' authentic love stories.
            </FadeInText>
          </div>

          {/* Empty State */}
          <div className="text-center">
            <p className="text-gray-500">No gallery items available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  // Take first 6 items for the preview gallery
  const previewItems = galleryItems.slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Portfolio title and description */}
          <FadeInText 
            as="span" 
            className="text-sm font-medium text-golden-500 tracking-wide uppercase font-sans"
            delay={0.1}
          >
            Portfolio
          </FadeInText>
          <FadeInText 
            as="h2" 
            className="text-4xl md:text-5xl font-serif text-gray-800 mt-2 mb-6"
            delay={0.3}
          >
            Our Recent
            <span className="text-blush-900 italic block">Love Stories</span>
          </FadeInText>
          <FadeInText 
            as="p" 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans"
            delay={0.5}
          >
            Explore a curated selection of our most beautiful weddings, each
            uniquely captured to reflect our couples' authentic love stories.
          </FadeInText>
        </div>

        {/* Gallery Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Loop through each gallery item */}
          {previewItems.map((item: GalleryItem, index: number) => (
            <Link
              key={item._id}
              to="/gallery"
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }} // Stagger animation for each image
            >
              <div className="aspect-square overflow-hidden">
                {/* Image with hover zoom effect */}
                <img
                  src={item.url}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Overlay (Title and Description) */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6 text-white">
                  {/* Category and Description */}
                  <div className="text-sm font-medium mb-1 font-sans">
                    {item.category}
                  </div>
                  <div className="text-xs opacity-90 font-sans">{item.alt}</div>
                </div>
                
                {/* View Gallery Icon */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-blush-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </Link>
          ))}
        </div>

        {/* View Full Gallery Button */}
        <div className="text-center mt-12">
          <FadeInText
            as="div"
            delay={0.7}
          >
            <Link
              to="/gallery"
              className="inline-flex items-center gap-3 bg-golden-500 hover:bg-golden-600 text-black px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-sans group"
            >
              View Complete Gallery
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeInText>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
