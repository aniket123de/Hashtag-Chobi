import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useHomePageData } from "@/hooks/useWebsiteData";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const CoupleSelections = () => {
  const { data, loading, error } = useHomePageData();
  const navigate = useNavigate();
  const selections = data?.coupleSelections || [];

  if (error) return null;
  if (loading && selections.length === 0) {
    // Create loading skeleton that matches the carousel layout
    const loadingItems = [...Array(3)].map((_, i) => (
      <div key={i} className="flex-shrink-0 w-56 md:w-96 h-80 md:h-[40rem] bg-gray-100 rounded-3xl animate-pulse" />
    ));

    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Couple Selections</h2>
            <p className="text-gray-600">Explore curated love stories</p>
          </div>
          <div className="flex gap-4 overflow-hidden px-4">
            {loadingItems}
          </div>
        </div>
      </section>
    );
  }

  if (selections.length === 0) return null;

  // Transform selections data for Apple Cards Carousel
  const carouselItems = selections.map((item, index) => (
    <Card
      key={item._id}
      index={index}
      card={{
        src: item.image,
        title: item.title,
        category: "Love Story",
        content: item.description,
        onClick: () => {
          // Reset scroll position before navigation
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          // Navigate to couple detail page
          navigate(`/couple/${item._id}`);
        }
      }}
    />
  ));

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Couple Selections</h2>
          <p className="text-gray-600">Explore curated love stories</p>
        </div>

        <Carousel items={carouselItems} />
      </div>
    </section>
  );
};

export default CoupleSelections;


