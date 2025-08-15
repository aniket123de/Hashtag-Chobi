import React, { useState } from "react";
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

// Import images
import Wedding from "../assets/image/WEDDING.jpg";
import Corporate from "../assets/image/CORPORATE.jpg";
import Social from "../assets/image/SOCIAL.jpg";
import Destination from "../assets/image/DESTINATION.jpg";
import BehindtheScenes from "../assets/image/BTS.jpg";
import Reception from "../assets/image/RECEPTION.jpg";
import Service1 from "../assets/image/SERVICE1.jpg";
import Service2 from "../assets/image/SERVICE2.jpg";
import Service3 from "../assets/image/SERVICE3.jpg";
import Service4 from "../assets/image/SERVICE4.jpg";
import Service5 from "../assets/image/SERVICE5.jpg";
import Service6 from "../assets/image/SERVICE6.jpg";
import Hero from "../assets/image/HERO.jpg";
import About from "../assets/image/ABOUT.jpg";
import Services from "../assets/image/SERVICES.jpg";

interface GalleryImage {
  id: number;
  url: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  size: "small" | "medium" | "large" | "wide" | "tall";
}

const GalleryExtended = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Extended gallery images with Bento grid sizing
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      url: Wedding,
      alt: "Elegant wedding ceremony",
      category: "Wedding",
      title: "Elegant Wedding Ceremony",
      description:
        "A beautiful outdoor wedding ceremony captured in golden hour light",
      size: "large",
    },
    {
      id: 2,
      url: Corporate,
      alt: "Corporate event photography",
      category: "Corporate",
      title: "Corporate Gala Event",
      description:
        "Professional corporate event with elegant lighting and decor",
      size: "medium",
    },
    {
      id: 3,
      url: Social,
      alt: "Social celebration",
      category: "Social",
      title: "Birthday Celebration",
      description: "Joyful social gathering with friends and family",
      size: "small",
    },
    {
      id: 4,
      url: Destination,
      alt: "Destination wedding",
      category: "Wedding",
      title: "Destination Wedding",
      description: "Romantic destination wedding by the ocean",
      size: "wide",
    },
    {
      id: 5,
      url: BehindtheScenes,
      alt: "Behind the scenes",
      category: "Behind the Scenes",
      title: "Behind the Magic",
      description: "Capturing the moments behind the perfect shot",
      size: "tall",
    },
    {
      id: 6,
      url: Reception,
      alt: "Wedding reception",
      category: "Wedding",
      title: "Reception Celebration",
      description: "Dancing and celebration at the wedding reception",
      size: "medium",
    },
    {
      id: 7,
      url: Service1,
      alt: "Bridal portrait",
      category: "Portrait",
      title: "Bridal Portrait",
      description: "Stunning bridal portrait with natural lighting",
      size: "small",
    },
    {
      id: 8,
      url: Service2,
      alt: "Couple photography",
      category: "Engagement",
      title: "Engagement Session",
      description: "Romantic couple photography in natural setting",
      size: "large",
    },
    {
      id: 9,
      url: Service3,
      alt: "Wedding details",
      category: "Wedding",
      title: "Wedding Details",
      description: "Beautiful wedding details and decorations",
      size: "small",
    },
    {
      id: 10,
      url: Service4,
      alt: "Family portrait",
      category: "Portrait",
      title: "Family Portrait",
      description: "Warm family portrait session",
      size: "medium",
    },
    {
      id: 11,
      url: Service5,
      alt: "Event photography",
      category: "Corporate",
      title: "Corporate Event",
      description: "Professional event photography",
      size: "wide",
    },
    {
      id: 12,
      url: Service6,
      alt: "Lifestyle photography",
      category: "Lifestyle",
      title: "Lifestyle Session",
      description: "Natural lifestyle photography",
      size: "tall",
    },
    {
      id: 13,
      url: Hero,
      alt: "Wedding ceremony",
      category: "Wedding",
      title: "Ceremony Moments",
      description: "Emotional wedding ceremony moments",
      size: "medium",
    },
    {
      id: 14,
      url: About,
      alt: "Portrait session",
      category: "Portrait",
      title: "Portrait Session",
      description: "Professional portrait photography",
      size: "small",
    },
    {
      id: 15,
      url: Services,
      alt: "Event setup",
      category: "Corporate",
      title: "Event Setup",
      description: "Beautiful event setup and decoration",
      size: "large",
    },
  ];

  const categories = [
    "All",
    ...Array.from(new Set(galleryImages.map((img) => img.category))),
  ];

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const getBentoGridClass = (size: string, index: number) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2";
      case "wide":
        return "col-span-2 row-span-1";
      case "tall":
        return "col-span-1 row-span-2";
      case "medium":
        return "col-span-1 row-span-1";
      case "small":
      default:
        return "col-span-1 row-span-1";
    }
  };

  const openLightbox = (image: GalleryImage) => {
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

  return (
    <div className="min-h-screen bg-white">
      <NewHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-cream-50 to-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <FadeInText
            as="h1"
            className="text-4xl md:text-6xl font-serif text-gray-900 mb-6"
            delay={0.1}
          >
            Our Complete
            <span className="block text-blush-500 italic">
              Gallery Collection
            </span>
          </FadeInText>
          <FadeInText
            as="p"
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans"
            delay={0.3}
          >
            Explore our comprehensive collection of wedding photography,
            portraits, and special events. Each image tells a unique story of
            love, joy, and celebration.
          </FadeInText>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${getBentoGridClass(
                  image.size,
                  index
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
                      {image.title}
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
                  {selectedImage.title}
                </h3>
                <p className="text-white/80 font-sans mb-4">
                  {selectedImage.description}
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
