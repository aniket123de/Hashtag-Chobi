import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInText } from "@/components/ui/fade-in-section";
import { useTestimonialsData } from "@/hooks/useWebsiteData";
import { Testimonial } from "@/lib/services";

const Testimonials = () => {
  // Fetch testimonials data from Firestore
  const { data: testimonials, loading, error } = useTestimonialsData();

  /**
   * Smoothly scrolls to a specific section by ID
   * @param sectionId - The ID of the target section
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Show loading state
  if (loading) {
    return (
      <section
        className="py-20 bg-gradient-to-br from-golden-50 via-white to-blush-50"
        aria-label="Client Testimonials"
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <header className="text-center mb-16">
            <FadeInText 
              as="span" 
              className="text-sm font-medium text-black tracking-wide uppercase font-sans"
              delay={0.1}
            >
              Testimonials
            </FadeInText>
            <FadeInText 
              as="h2" 
              className="text-4xl md:text-5xl font-serif text-gray-800 mt-2 mb-6"
              delay={0.3}
            >
              What Our Clients
              <span className="text-golden-600 italic block">Are Saying</span>
            </FadeInText>
            <FadeInText 
              as="p" 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans"
              delay={0.5}
            >
              Don't just take our word for it—hear from the couples and companies who trusted us with their most important celebrations
            </FadeInText>
          </header>

          {/* Loading Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-lg border border-gray-100 animate-pulse"
              >
                {/* Rating Stars Skeleton */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-gray-300 rounded mr-1"></div>
                  ))}
                </div>

                {/* Testimonial Quote Skeleton */}
                <div className="space-y-3 mb-6">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>

                {/* Client Info Skeleton */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section
        className="py-20 bg-gradient-to-br from-golden-50 via-white to-blush-50"
        aria-label="Client Testimonials"
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <header className="text-center mb-16">
            <FadeInText 
              as="span" 
              className="text-sm font-medium text-black tracking-wide uppercase font-sans"
              delay={0.1}
            >
              Testimonials
            </FadeInText>
            <FadeInText 
              as="h2" 
              className="text-4xl md:text-5xl font-serif text-gray-800 mt-2 mb-6"
              delay={0.3}
            >
              What Our Clients
              <span className="text-golden-600 italic block">Are Saying</span>
            </FadeInText>
            <FadeInText 
              as="p" 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans"
              delay={0.5}
            >
              Don't just take our word for it—hear from the couples and companies who trusted us with their most important celebrations
            </FadeInText>
          </header>

          {/* Error Message */}
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <p>Error loading testimonials. Please try again later.</p>
            </div>
            <Button
              size="lg"
              onClick={() => window.location.reload()}
              className="bg-golden-500 hover:bg-golden-600 text-black px-6 py-3 rounded-full"
            >
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no testimonials
  if (!testimonials || testimonials.length === 0) {
    return (
      <section
        className="py-20 bg-gradient-to-br from-golden-50 via-white to-blush-50"
        aria-label="Client Testimonials"
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <header className="text-center mb-16">
            <FadeInText 
              as="span" 
              className="text-sm font-medium text-black tracking-wide uppercase font-sans"
              delay={0.1}
            >
              Testimonials
            </FadeInText>
            <FadeInText 
              as="h2" 
              className="text-4xl md:text-5xl font-serif text-gray-800 mt-2 mb-6"
              delay={0.3}
            >
              What Our Clients
              <span className="text-golden-600 italic block">Are Saying</span>
            </FadeInText>
            <FadeInText 
              as="p" 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans"
              delay={0.5}
            >
              Don't just take our word for it—hear from the couples and companies who trusted us with their most important celebrations
            </FadeInText>
          </header>

          {/* Empty State */}
          <div className="text-center">
            <div className="text-gray-500 mb-4">
              <p>No testimonials available at the moment.</p>
              <p className="text-sm mt-2">Check back soon for client feedback!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-20 bg-gradient-to-br from-golden-50 via-white to-blush-50"
      aria-label="Client Testimonials"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <header className="text-center mb-16">
          <FadeInText 
            as="span" 
            className="text-sm font-medium text-black tracking-wide uppercase font-sans"
            delay={0.1}
          >
            Testimonials
          </FadeInText>
          <FadeInText 
            as="h2" 
            className="text-4xl md:text-5xl font-serif text-gray-800 mt-2 mb-6"
            delay={0.3}
          >
            What Our Clients
            <span className="text-golden-600 italic block">Are Saying</span>
          </FadeInText>
          <FadeInText 
            as="p" 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans"
            delay={0.5}
          >
            Don't just take our word for it—hear from the couples and companies who trusted us with their most important celebrations
          </FadeInText>
        </header>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial: Testimonial, index: number) => (
            <article
              key={testimonial._id}
              className="bg-white rounded-lg p-8 shadow-lg border border-gray-100
                         hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
              tabIndex={0} // Make card focusable for keyboard users
              aria-labelledby={`${testimonial.name.replace(/\s+/g, "-").toLowerCase()}-title`}
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-4" aria-label={`${testimonial.rating} star rating`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Testimonial Quote */}
              <blockquote className="text-gray-600 leading-relaxed mb-6 italic font-sans">
                &quot;{testimonial.content}&quot;
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center">
                {/* Client Image or Initials Circle */}
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blush-200 to-golden-200
                               flex items-center justify-center mr-4 text-lg font-serif text-gray-700 select-none"
                    aria-hidden="true"
                  >
                    {testimonial.name.split(" ")[0][0]}
                  </div>
                )}

                {/* Name and Role */}
                <div>
                  <h3
                    id={`${testimonial.name.replace(/\s+/g, "-").toLowerCase()}-title`}
                    className="font-serif font-semibold text-gray-800 tracking-wide"
                  >
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-sans">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <FadeInText 
            as="p" 
            className="text-lg text-gray-600 mb-6 font-sans"
            delay={0.7}
          >
            Ready to create your own unforgettable experience?
          </FadeInText>
          <FadeInText 
            as="div" 
            delay={0.9}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-golden-500 hover:bg-golden-600 text-black px-8 py-4 text-lg font-medium
                         rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-sans"
            >
              Start Planning Today
            </Button>
          </FadeInText>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
