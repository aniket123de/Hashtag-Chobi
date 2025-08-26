import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NewHeader from "@/components/NewHeader";
import Footer from "@/components/Footer";
import { FadeInText } from "@/components/ui/fade-in-section";
import { CoupleSelectionsService, CoupleImagesExtendedService, type CoupleSelection, type CoupleImagesExtendedDoc, type CoupleImagesExtendedImage } from "@/lib/services";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";

const CoupleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<CoupleSelection | null>(null);
  const [allCouples, setAllCouples] = useState<CoupleSelection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [extended, setExtended] = useState<CoupleImagesExtendedDoc | null>(null);
  const [selectedImage, setSelectedImage] = useState<CoupleImagesExtendedImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  // Immediate scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Grid size helper matching GalleryExtended
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

  useEffect(() => {
    // Ensure scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    (async () => {
      try {
        setLoading(true);
        const all = await CoupleSelectionsService.getAll();
        setAllCouples(all);
        const found = all.find(item => item._id.toLowerCase() === String(id).toLowerCase()) || null;
        setData(found);
        
        // Set current index for navigation
        const index = all.findIndex(item => item._id.toLowerCase() === String(id).toLowerCase());
        setCurrentIndex(index);
        
        const ext = await CoupleImagesExtendedService.getData();
        setExtended(ext);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Navigation state
  const hasNext = currentIndex >= 0 && currentIndex < allCouples.length - 1;
  const hasPrevious = currentIndex > 0;

  // Navigation functions
  const goToPrevious = () => {
    if (currentIndex > 0) {
      // Reset scroll position before navigation
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      const previousCouple = allCouples[currentIndex - 1];
      navigate(`/couple/${previousCouple._id}`);
    }
  };

  const goToNext = () => {
    if (currentIndex < allCouples.length - 1) {
      // Reset scroll position before navigation
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      const nextCouple = allCouples[currentIndex + 1];
      navigate(`/couple/${nextCouple._id}`);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage) return; // Don't navigate if viewing an image
      
      if (e.key === 'ArrowLeft' && hasPrevious) {
        goToPrevious();
      } else if (e.key === 'ArrowRight' && hasNext) {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hasPrevious, hasNext, selectedImage]);

  // Derive filtered images and categories by selected couple title
  const allImages = extended?.images || [];
  const coupleTitle = data?.title || null;
  const imagesForCouple = coupleTitle
    ? allImages.filter(img => img.coupleSelectionTitle === coupleTitle)
    : allImages;
  const availableCategories = [
    "All",
    ...Array.from(new Set(imagesForCouple.map(img => img.category)))
  ];

  return (
    <div className="min-h-screen bg-background overflow-auto">
      <NewHeader />

      <section className="pt-24 pb-8 bg-gradient-to-b from-cream-50 to-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* Navigation header */}
          <div className="flex items-center justify-between mb-6">
            <Link 
              to="/#services" 
              className="text-blush-600 hover:text-blush-700 flex items-center gap-2"
              onClick={() => {
                // Small delay to ensure page loads before scrolling
                setTimeout(() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            
            {!loading && allCouples.length > 0 && currentIndex >= 0 && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">
                  {currentIndex + 1} of {allCouples.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={goToPrevious}
                    disabled={!hasPrevious}
                    className={`p-2 rounded-full border transition-all ${
                      hasPrevious 
                        ? 'border-blush-300 text-blush-600 hover:bg-blush-50 bg-white' 
                        : 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                    }`}
                    title={hasPrevious ? "Previous couple" : "No previous couple"}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={goToNext}
                    disabled={!hasNext}
                    className={`p-2 rounded-full border transition-all ${
                      hasNext 
                        ? 'border-blush-300 text-blush-600 hover:bg-blush-50 bg-white' 
                        : 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                    }`}
                    title={hasNext ? "Next couple" : "No next couple"}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {loading ? (
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-80 mb-4"></div>
              <div className="h-[420px] bg-gray-200 rounded-2xl" />
            </div>
          ) : !data ? (
            <div className="text-gray-600">Couple not found.</div>
          ) : (
            <>
              <FadeInText as="h1" className="text-4xl md:text-6xl font-serif text-gray-900 mb-6" delay={0.1}>
                {data.title}
              </FadeInText>

              <div className="rounded-2xl overflow-hidden shadow mb-6">
                <img src={data.image} alt={data.title} className="w-full h-auto object-cover" />
              </div>

              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
                {data.description}
              </p>
            </>
          )}
        </div>
      </section>

      {/* Couple Images Extended Section (same layout style as GalleryExtended) */}
      {imagesForCouple.length > 0 && (
        <>
          <section id="extended-gallery" className="py-8 bg-background border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-wrap justify-center gap-4">
                {availableCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-blush-500 text-black shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
                {(selectedCategory === "All"
                  ? imagesForCouple
                  : imagesForCouple.filter(img => img.category === selectedCategory)
                 ).map((image, index) => (
                  <motion.div
                    key={image.id}
                    className={`group relative overflow-hidden rounded-2xl cursor-pointer ${getGridClass(image.size)}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-serif text-lg font-semibold mb-1">{image.title || image.alt}</h3>
                        <p className="text-white/80 text-sm font-sans">{image.category}</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs font-medium text-gray-800">{image.category}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedImage(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="max-w-4xl max-h-[80vh] relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
                  >
                    <X size={32} />
                  </button>
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.alt}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Bottom Navigation */}
      {!loading && allCouples.length > 1 && currentIndex >= 0 && (
        <section className="py-12 bg-gray-50 border-t">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-center justify-between">
              {/* Previous couple */}
              <div className="flex-1">
                {hasPrevious ? (
                  <Link
                    to={`/couple/${allCouples[currentIndex - 1]._id}`}
                    className="group flex items-center gap-4 p-4 rounded-xl border bg-white hover:shadow-md transition-all"
                  >
                    <ChevronLeft className="text-blush-600 group-hover:translate-x-[-2px] transition-transform" size={24} />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-500 mb-1">Previous</p>
                      <h3 className="font-serif text-lg text-gray-900 truncate">
                        {allCouples[currentIndex - 1].title}
                      </h3>
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>

              {/* Center - Current position */}
              <div className="flex-shrink-0 mx-8 text-center">
                <div className="flex items-center gap-2">
                  {allCouples.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex ? 'bg-blush-500 w-6' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {currentIndex + 1} of {allCouples.length}
                </p>
              </div>

              {/* Next couple */}
              <div className="flex-1 flex justify-end">
                {hasNext ? (
                  <Link
                    to={`/couple/${allCouples[currentIndex + 1]._id}`}
                    className="group flex items-center gap-4 p-4 rounded-xl border bg-white hover:shadow-md transition-all"
                  >
                    <div className="min-w-0 text-right">
                      <p className="text-sm text-gray-500 mb-1">Next</p>
                      <h3 className="font-serif text-lg text-gray-900 truncate">
                        {allCouples[currentIndex + 1].title}
                      </h3>
                    </div>
                    <ChevronRight className="text-blush-600 group-hover:translate-x-[2px] transition-transform" size={24} />
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default CoupleDetail;


