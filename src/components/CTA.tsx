import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  // Smoothly scrolls to a section by ID
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blush-500 via-golden-500 to-blush-600 relative overflow-hidden">
      {/* Background decorative circles with low opacity */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full" />
        <div className="absolute bottom-1/3 left-2/3 w-20 h-20 bg-white rounded-full" />
      </div>

      {/* Main content container with z-index to appear above background */}
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          {/* Heading with emphasis on 'Something Magical?' */}
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
            Ready to Create
            <span className="block italic">Something Magical?</span>
          </h2>

          {/* Supporting text */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let's transform your vision into an unforgettable celebration that
            you and your guests will treasure forever
          </p>

          {/* Call-to-action buttons container */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Button to scroll to contact section */}
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-white text-blush-600 hover:bg-gray-50 px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Schedule Your Consultation
            </Button>

            {/* Phone call button wrapped in Link */}
            <Link to="tel:+15551234567" aria-label="Call Us Now">
              <Button
                size="lg"
                className="bg-blush-500 hover:bg-blush-600 text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Call Us Now
              </Button>
            </Link>
          </div>

          {/* Additional info text */}
          <div className="mt-8 text-white/80">
            <p className="text-sm">
              ✨ Free consultation • 24/7 support • 100% satisfaction guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
