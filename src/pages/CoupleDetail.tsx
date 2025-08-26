import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NewHeader from "@/components/NewHeader";
import Footer from "@/components/Footer";
import { FadeInText } from "@/components/ui/fade-in-section";
import { CoupleSelectionsService, CoupleImagesExtendedService, type CoupleSelection, type CoupleImagesExtendedDoc, type CoupleImagesExtendedImage } from "@/lib/services";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const CoupleDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<CoupleSelection | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [extended, setExtended] = useState<CoupleImagesExtendedDoc | null>(null);
  const [selectedImage, setSelectedImage] = useState<CoupleImagesExtendedImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

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
    window.scrollTo(0, 0);
    (async () => {
      try {
        setLoading(true);
        const all = await CoupleSelectionsService.getAll();
        const found = all.find(item => item._id.toLowerCase() === String(id).toLowerCase()) || null;
        setData(found);
        const ext = await CoupleImagesExtendedService.getData();
        setExtended(ext);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

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
          <div className="mb-6">
            <Link to="/couple" className="text-blush-600 hover:text-blush-700">← Back to Couple Selections</Link>
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

      <Footer />
    </div>
  );
};

export default CoupleDetail;


