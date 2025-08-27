import { useEffect } from "react";
import NewHeader from "@/components/NewHeader";
import Footer from "@/components/Footer";
import { FadeInText } from "@/components/ui/fade-in-section";
import CoupleSelections from "@/components/CoupleSelections";

const Couple: React.FC = () => {
  useEffect(() => {
    // Enhanced scroll to top on component mount
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-auto">
      <NewHeader />

      <section className="pt-24 pb-8 bg-gradient-to-b from-cream-50 to-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <FadeInText as="h1" className="text-4xl md:text-6xl font-serif text-gray-900 mb-4" delay={0.1}>
          A journey of two souls, one story
          </FadeInText>
          <p className="text-gray-600 max-w-2xl mx-auto">
          From promises to portraits, love beautifully captured.
          </p>
        </div>
      </section>

      <CoupleSelections />

      <Footer />
    </div>
  );
};

export default Couple;


