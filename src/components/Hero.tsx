import { Button } from "@/components/ui/button";
import { FadeInText } from "@/components/ui/fade-in-section";
import HeroBG from "../assets/image/HERO.jpg";

const Hero = () => {
  /**
   * Smoothly scrolls to a section by its ID
   * @param sectionId - id of the target element
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden 
                 bg-gradient-to-br from-cream-50 via-blush-50 to-golden-50 pt-20"
    >
      {/* Background Image */}
      <img
        src={HeroBG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
        aria-hidden="true"
      />

      {/* Overlay to darken background for better text contrast */}
      <div className="absolute inset-0 bg-black opacity-50" aria-hidden="true" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Headline */}
        <FadeInText 
          as="h1" 
          className="text-5xl md:text-7xl font-serif text-gray-200 mb-6 leading-tight"
          delay={0.2}
          duration={0.8}
        >
          Capturing
          <span className="block text-blush-500 italic">Love Stories</span>
          Frame by Frame
        </FadeInText>

        {/* Subheadline */}
        <FadeInText 
          as="p" 
          className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed font-sans font-light tracking-wide"
          delay={0.5}
          duration={0.8}
        >
          Premier wedding photography and Cinematography since 2016, specializing in handcrafted weddings that beautifully narrate your unique love story
        </FadeInText>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => scrollToSection("contact")}
            className="bg-blush-500 hover:bg-blush-600 text-black px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-sans"
            aria-label="Book Your Session"
          >
            Book Your Session
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("gallery")}
            className="border-2 border-golden-400 hover:text-golden-700 hover:bg-golden-50 px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 font-sans"
            aria-label="View Our Portfolio"
          >
            View Our Portfolio
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 animate-bounce"
          aria-hidden="true"
        >
          <div className="w-6 h-10 border-2 border-blush-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blush-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
