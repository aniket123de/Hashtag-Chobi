import ServiceBG from "../assets/image/SERVICES.jpg";
import { Carousel, Card } from "./ui/apple-cards-carousel";
import { FadeInText } from "@/components/ui/fade-in-section";
import { useServicesData } from "@/hooks/useWebsiteData";
import { Service } from "@/lib/services";

const Services = () => {
  // Fetch services data from Firestore
  const { data: services, loading, error } = useServicesData();

  // Show loading state
  if (loading) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-cream-50 to-white">
        <img
          src={ServiceBG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black opacity-50" aria-hidden="true" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-32 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-300 rounded w-96 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-300 rounded w-80 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-cream-50 to-white">
        <img
          src={ServiceBG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black opacity-50" aria-hidden="true" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="text-red-500">
              <p>Error loading services. Please try again later.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If no services data, show empty state
  if (!services || services.length === 0) {
    return (
      <section className="relative py-20 bg-gradient-to-b from-cream-50 to-white">
        <img
          src={ServiceBG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black opacity-50" aria-hidden="true" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <p className="text-gray-200">No services available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  // Map services to cards with dynamic data
  const cards = services.map((service: Service, index: number) => (
    <Card
      key={service._id}
      card={{
        src: service.image, // Use image from Firestore
        title: service.title,
        category: service.category || "Photography", // Default category if not provided
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed font-sans">
              {service.description}
            </p>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4 font-serif">
                Service Details:
              </h4>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600 font-sans">
                  <span className="w-2 h-2 bg-blush-500 rounded-full mr-3" />
                  Price: {service.price}
                </div>
                {service.category && (
                  <div className="flex items-center text-gray-600 font-sans">
                    <span className="w-2 h-2 bg-blush-500 rounded-full mr-3" />
                    Category: {service.category}
                  </div>
                )}
              </div>
            </div>
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 font-sans">
                Contact us for personalized pricing and package options tailored to your special day.
              </p>
            </div>
          </div>
        ),
      }}
      index={index}
    />
  ));

  return (
    <section
      className="relative py-20 bg-gradient-to-b from-cream-50 to-white"
      aria-label="Our Services"
    >
      {/* Background Image */}
      <img
        src={ServiceBG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <header className="text-center mb-16">
          <FadeInText 
            as="span" 
            className="text-sm font-medium text-white-500 tracking-wide uppercase font-sans"
            delay={0.1}
          >
            Our Services
          </FadeInText>
          <FadeInText 
            as="h2" 
            className="text-4xl md:text-5xl font-serif text-gray-200 mt-2 mb-6"
            delay={0.3}
          >
            Wedding Photography &
            <span className="text-blush-900 italic block">Cinematography Services</span>
          </FadeInText>
          <FadeInText 
            as="p" 
            className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-sans"
            delay={0.5}
          >
            From engagement sessions to wedding day coverage, we offer a full suite of photography and Cinematography services to capture your love story
          </FadeInText>
        </header>

        {/* Services Carousel */}
        <Carousel items={cards} />
      </div>
    </section>
  );
};

export default Services;
