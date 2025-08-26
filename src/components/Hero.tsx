import { Button } from "@/components/ui/button";
import { FadeInText } from "@/components/ui/fade-in-section";
import { useHeroData } from "@/hooks/useWebsiteData";
import { HeroData } from "@/lib/services";

const Hero = () => {
  // Fetch hero data from Firestore - start fetching immediately
  const { data: heroData, loading, error } = useHeroData();

  // No need to manage loading state globally - let the content load naturally

  



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
      {/* Background Image - Only show when we have Firestore data */}
      {heroData && heroData.backgroundImage && (
        <img
          src={heroData.backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
          aria-hidden="true"
        />
      )}

      {/* Overlay to darken background for better text contrast */}
      <div className="absolute inset-0 bg-black opacity-50" aria-hidden="true" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {loading ? (
          // Simple loading state while data is being fetched
          <div className="animate-pulse">
            <div className="h-16 md:h-20 bg-white/20 rounded w-96 mx-auto mb-6"></div>
            <div className="h-6 md:h-8 bg-white/20 rounded w-80 mx-auto mb-8"></div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="h-12 bg-white/20 rounded-full w-48"></div>
              <div className="h-12 bg-white/20 rounded-full w-48"></div>
            </div>
          </div>
        ) : error ? (
          // Error state
          <div className="text-red-500">
            <p>Error loading hero content. Please try again later.</p>
          </div>
        ) : heroData ? (
          // Actual content from Firestore
          <>
            {/* Headline */}
            <FadeInText 
              as="h1" 
              className="text-5xl md:text-7xl font-serif text-gray-200 mb-6 leading-tight"
              delay={0.2}
              duration={0.8}
            >
              {heroData.title.split(' ').slice(0, 2).join(' ')}
              <span className="block text-blush-500 italic">
                {heroData.title.split(' ').slice(2, 4).join(' ')}
              </span>
              {heroData.title.split(' ').slice(4).join(' ')}
            </FadeInText>

            {/* Subheadline */}
            <FadeInText 
              as="p" 
              className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed font-sans font-light tracking-wide"
              delay={0.5}
              duration={0.8}
            >
              {heroData.description}
            </FadeInText>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-golden-500 hover:bg-golden-600 text-black px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-sans"
                aria-label={heroData.ctaText}
              >
                {heroData.ctaText}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("gallery")}
                className="bg-golden-500 hover:bg-golden-600 text-black border-2 border-golden-400 px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 font-sans"
                aria-label="View Our Portfolio"
              >
                View Our Portfolio
              </Button>
            </div>

            
          </>
        ) : null}

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
