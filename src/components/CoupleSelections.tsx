import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useHomePageData } from "@/hooks/useWebsiteData";

const CoupleSelections = () => {
  const { data, loading, error } = useHomePageData();
  const selections = data?.coupleSelections || [];

  if (error) return null;
  if (loading && selections.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (selections.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Couple Selections</h2>
          <p className="text-gray-600">Explore curated love stories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {selections.map((item, index) => (
            <motion.div
              key={item._id}
              className="group rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/couple/${item._id}#extended-gallery`} className="block">
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold font-serif text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoupleSelections;


