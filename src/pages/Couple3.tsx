import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
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

const Couple3 = () => {
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

  // Hardcoded wedding photos for Arjun & Meera
  const weddingPhotos: WeddingImage[] = [
    {
      id: "1",
      url: "/src/assets/image/SERVICES.jpg",
      alt: "Backwater wedding ceremony",
      title: "Nature's Blessing",
      category: "Ceremony",
      size: "large"
    },
    {
      id: "2",
      url: "/src/assets/image/WEDDING.jpg",
      alt: "Traditional ceremony",
      title: "Sacred Traditions",
      category: "Ceremony",
      size: "medium"
    },
    {
      id: "3",
      url: "/src/assets/image/DESTINATION.jpg",
      alt: "Scenic couple shot",
      title: "Paradise Found",
      category: "Portraits",
      size: "wide"
    },
    {
      id: "4",
      url: "/src/assets/image/RECEPTION.jpg",
      alt: "Backwater reception",
      title: "Floating Celebration",
      category: "Reception",
      size: "small"
    },
    {
      id: "5",
      url: "/src/assets/image/HERO.jpg",
      alt: "Romantic portrait",
      title: "Pure Bliss",
      category: "Portraits",
      size: "tall"
    },
    {
      id: "6",
      url: "/src/assets/image/ABOUT.jpg",
      alt: "Candid moment",
      title: "Natural Joy",
      category: "BTS",
      size: "medium"
    },
    {
      id: "7",
      url: "/src/assets/image/BTS.jpg",
      alt: "Preparation shots",
      title: "Getting Ready",
      category: "BTS",
      size: "small"
    },
    {
      id: "8",
      url: "/src/assets/image/CTA.jpg",
      alt: "Nature celebration",
      title: "Eco Wedding",
      category: "Reception",
      size: "wide"
    },
    {
      id: "9",
      url: "/src/assets/image/CORPORATE.jpg",
      alt: "Family gathering",
      title: "Family Unity",
      category: "Family",
      size: "medium"
    },
    {
      id: "10",
      url: "/src/assets/image/SERVICE1.jpg",
      alt: "Sunset ceremony",
      title: "Golden Hour",
      category: "Ceremony",
      size: "large"
    },
    {
      id: "11",
      url: "/src/assets/image/SERVICE2.jpg",
      alt: "Traditional dance",
      title: "Cultural Heritage",
      category: "Reception",
      size: "small"
    },
    {
      id: "12",
      url: "/src/assets/image/SERVICE3.jpg",
      alt: "Blessing moment",
      title: "Divine Grace",
      category: "Portraits",
      size: "tall"
    }
  ];

  const categories = ["All", "Ceremony", "Reception", "Portraits", "BTS", "Family"];

  const filteredPhotos = selectedCategory === "All"
    ? weddingPhotos
    : weddingPhotos.filter(photo => photo.category === selectedCategory);



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
            Arjun & Meera
            <span className="block text-blush-500 italic">
              Wedding Gallery
            </span>
          </FadeInText>
          <FadeInText
            as="p"
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans"
            delay={0.3}
          >
            A serene celebration amidst nature's beauty. Where love flows like the gentle backwaters of Kerala.
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
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
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
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className={`group relative overflow-hidden rounded-2xl ${getGridClass(photo.size)}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-serif text-lg font-semibold mb-1">
                      {photo.title}
                    </h3>
                    <p className="text-white/80 text-sm font-sans">
                      {photo.category}
                    </p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-medium text-gray-800">
                    {photo.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            Let's capture your special moments with the same passion and artistry you see in our gallery.
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

export default Couple3;
