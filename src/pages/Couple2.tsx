import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Calendar, MapPin, Camera, X, ChevronLeft, ChevronRight, Share2, Download, Play } from 'lucide-react';
import NewHeader from "@/components/NewHeader";
import Footer from "@/components/Footer";
import { FadeInText } from "@/components/ui/fade-in-section";

interface WeddingImage {
  id: string;
  url: string;
  alt: string;
  title: string;
  category: string;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
}

const Couple2 = () => {
  const [selectedImage, setSelectedImage] = useState<WeddingImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  // Fix scrolling issues on component mount
  useEffect(() => {
    // Ensure page starts at top
    window.scrollTo(0, 0);
    
    // Reset any overflow restrictions
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    
    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);
  
  // Couple information
  const coupleInfo = {
    names: "Rajesh & Priya",
    date: "March 8, 2024",
    venue: "Royal Heritage Palace, Rajasthan",
    photographer: "HashtagChobi Studios"
  };
  
  // Hardcoded wedding photos for Rajesh & Priya
  const weddingPhotos: WeddingImage[] = [
    {
      id: "1",
      url: "/src/assets/image/DESTINATION.jpg",
      alt: "Destination wedding ceremony",
      title: "Royal Ceremony",
      category: "Ceremony",
      size: "large"
    },
    {
      id: "2", 
      url: "/src/assets/image/RECEPTION.jpg",
      alt: "Reception celebration",
      title: "Grand Reception",
      category: "Reception",
      size: "medium"
    },
    {
      id: "3",
      url: "/src/assets/image/WEDDING.jpg", 
      alt: "Traditional wedding",
      title: "Sacred Union",
      category: "Ceremony",
      size: "wide"
    },
    {
      id: "4",
      url: "/src/assets/image/HERO.jpg",
      alt: "Couple portrait",
      title: "Eternal Love",
      category: "Portraits",
      size: "small"
    },
    {
      id: "5",
      url: "/src/assets/image/ABOUT.jpg",
      alt: "Romantic moment",
      title: "Perfect Match",
      category: "Portraits",
      size: "tall"
    },
    {
      id: "6",
      url: "/src/assets/image/BTS.jpg",
      alt: "Behind the scenes",
      title: "Preparation Time",
      category: "BTS",
      size: "medium"
    },
    {
      id: "7",
      url: "/src/assets/image/CORPORATE.jpg",
      alt: "Family gathering",
      title: "Family Bonds",
      category: "Family",
      size: "small"
    },
    {
      id: "8",
      url: "/src/assets/image/CTA.jpg",
      alt: "Celebration moment",
      title: "Joy & Laughter",
      category: "Reception",
      size: "wide"
    },
    {
      id: "9",
      url: "/src/assets/image/SERVICES.jpg",
      alt: "Wedding rituals",
      title: "Sacred Rituals",
      category: "Ceremony",
      size: "medium"
    },
    {
      id: "10",
      url: "/src/assets/image/SERVICE1.jpg",
      alt: "Dance performance",
      title: "Cultural Dance",
      category: "Reception",
      size: "large"
    },
    {
      id: "11",
      url: "/src/assets/image/SERVICE2.jpg",
      alt: "Henna ceremony",
      title: "Mehndi Magic",
      category: "BTS",
      size: "small"
    },
    {
      id: "12",
      url: "/src/assets/image/SERVICE3.jpg",
      alt: "Couple blessing",
      title: "Divine Blessings",
      category: "Portraits",
      size: "tall"
    }
  ];

  const categories = ["All", "Ceremony", "Reception", "Portraits", "BTS", "Family"];

  const filteredPhotos = selectedCategory === "All" 
    ? weddingPhotos 
    : weddingPhotos.filter(photo => photo.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(filteredPhotos[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedImage(filteredPhotos[nextIndex]);
  };

  const prevImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedImage(filteredPhotos[prevIndex]);
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1 h-60';
      case 'medium':
        return 'col-span-1 row-span-2 h-80';
      case 'large':
        return 'col-span-2 row-span-2 h-80';
      case 'wide':
        return 'col-span-2 row-span-1 h-60';
      case 'tall':
        return 'col-span-1 row-span-3 h-96';
      default:
        return 'col-span-1 row-span-1 h-60';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 overflow-auto">
      <NewHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </Link>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-cyan-500" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {coupleInfo.names}
              </h1>
              <Heart className="w-8 h-8 text-cyan-500" />
            </div>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              A magnificent royal celebration where tradition meets elegance. Every moment captured with royal grandeur.
            </p>
          </motion.div>

          {/* Wedding Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-20"
          >
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-cyan-100">
              <Calendar className="w-8 h-8 text-cyan-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Wedding Date</h3>
              <p className="text-lg font-semibold text-gray-800">{coupleInfo.date}</p>
            </div>
            
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-cyan-100">
              <MapPin className="w-8 h-8 text-cyan-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Venue</h3>
              <p className="text-lg font-semibold text-gray-800">{coupleInfo.venue}</p>
            </div>
            
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-cyan-100">
              <Camera className="w-8 h-8 text-cyan-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Photography</h3>
              <p className="text-lg font-semibold text-gray-800">{coupleInfo.photographer}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
              Wedding Gallery
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Royal <span className="text-cyan-600">Memories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From ancient traditions to modern celebrations, every moment captured with regal elegance
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-cyan-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-cyan-100 hover:text-cyan-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Bento Grid Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className={`${getSizeClasses(photo.size)} group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500`}
                onClick={() => openLightbox(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-1">{photo.title}</h3>
                      <p className="text-white/80 text-sm">{photo.category}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Highlights */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-cyan-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
              Video Highlights
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Relive the <span className="text-cyan-600">Grandeur</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the royal celebration through our cinematic wedding highlights
            </p>
          </div>

          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl overflow-hidden shadow-2xl">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-cyan-600 transition-colors cursor-pointer">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <p className="text-gray-600 font-medium">Royal Wedding Cinematic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-cyan-500 via-cyan-600 to-blue-600 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-10 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-10 left-20 w-60 h-60 bg-white/5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Create Your Royal
              <br />
              <span className="text-cyan-100">Wedding Album</span>
            </h2>
            <p className="text-xl text-cyan-100 mb-10 max-w-2xl mx-auto">
              Let us capture your special day with the elegance and grandeur it deserves. 
              Every wedding is a royal celebration in our eyes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-cyan-600 px-8 py-4 rounded-full font-semibold hover:bg-cyan-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Book Your Session
              </Link>
              <Link
                to="/gallery"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-cyan-600 transition-all duration-300"
              >
                View More Galleries
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>

              {/* Image info */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
                    <p className="text-sm text-gray-300">{selectedImage.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Couple2;
