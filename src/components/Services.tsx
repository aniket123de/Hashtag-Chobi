import { Star, Calendar, Users, Image, Phone } from "lucide-react";
import ServiceBG from "../assets/image/SERVICES.jpg";

const Services = () => {
  /**
   * List of service offerings with icons, titles, descriptions, and features
   */
  const services = [
    {
      icon: Star,
      title: "Wedding Photography",
      description:
        "Complete wedding photography coverage from getting ready to reception, capturing every precious moment of your special day.",
      features: [
        "Full-day coverage",
        "Bridal preparations",
        "Ceremony & reception",
      ],
    },
    {
      icon: Calendar,
      title: "Wedding Videography",
      description:
        "Cinematic wedding films that tell your love story, preserving the emotions and memories for generations to come.",
      features: [
        "Highlight reels",
        "Full ceremony recording",
        "Reception coverage",
      ],
    },
    {
      icon: Users,
      title: "Engagement Sessions",
      description:
        "Pre-wedding photo sessions that capture your love story and personality, perfect for save-the-dates and wedding websites.",
      features: [
        "Location scouting",
        "Wardrobe consultation",
        "High-resolution images",
      ],
    },
    {
      icon: Image,
      title: "Destination Weddings",
      description:
        "Exotic locations and dreamy destinations captured with seamless coordination and local expertise.",
      features: [
        "Travel coordination",
        "Local permits",
        "Destination planning",
      ],
    },
    {
      icon: Phone,
      title: "Wedding Consultation",
      description:
        "Expert guidance and personalized advice to help you plan the perfect photography package within your budget.",
      features: [
        "Package planning",
        "Timeline creation",
        "Style consultation",
      ],
    },
    {
      icon: Calendar,
      title: "Portrait Sessions",
      description:
        "Professional portrait photography for couples, families, and individuals, creating timeless memories to treasure.",
      features: [
        "Studio & outdoor options",
        "Wardrobe guidance",
        "Retouched images",
      ],
    },
  ];

  return (
    <section
      className="relative py-20 bg-gradient-to-b from-cream-50 to-white bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${ServiceBG})` }}
      aria-label="Our Services"
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <header className="text-center mb-16 animate-fade-in">
          <span className="text-sm font-medium text-golden-500 tracking-wide uppercase">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-200 mt-2 mb-6">
            Wedding Photography &
            <span className="text-blush-500 italic block">Videography Services</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            From engagement sessions to wedding day coverage, we offer a full suite of photography and videography services to capture your love story
          </p>
        </header>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            // Create an id from the title for section linking
            const id = service.title.toLowerCase().split(" ").join("-");

            return (
              <article
                id={id}
                key={service.title}
                className="group bg-white rounded-lg p-8 shadow-lg border border-gray-100
                           hover:shadow-2xl hover:border-blush-200 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
                tabIndex={0} // Make cards focusable for accessibility
                aria-labelledby={`${id}-title`}
              >
                {/* Icon Container */}
                <div
                  className="w-16 h-16 bg-gradient-to-br from-blush-100 to-golden-100
                             rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                >
                  <service.icon className="w-8 h-8 text-blush-600" />
                </div>

                {/* Service Title */}
                <h3
                  id={`${id}-title`}
                  className="text-xl font-elegant font-medium text-gray-800 mb-4 group-hover:text-blush-600 transition-colors duration-300 tracking-wide"
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                {/* Features List */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-500"
                    >
                      <span className="w-1.5 h-1.5 bg-golden-400 rounded-full mr-3" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
