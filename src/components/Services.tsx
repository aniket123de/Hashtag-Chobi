import { Star, Calendar, Users, Image, Phone } from "lucide-react";
import ServiceBG from "../assets/image/SERVICES.jpg";
import Service1Img from "../assets/image/SERVICE1.jpg";
import Service2Img from "../assets/image/SERVICE2.jpg";
import Service3Img from "../assets/image/SERVICE3.jpg";
import Service4Img from "../assets/image/SERVICE4.jpg";
import Service5Img from "../assets/image/SERVICE5.jpg";
import Service6Img from "../assets/image/SERVICE6.jpg";
import { Carousel, Card } from "./ui/apple-cards-carousel";

const Services = () => {
  /**
   * List of service offerings with icons, titles, descriptions, and features
   */
  const services = [
    {
      icon: Star,
      title: "Wedding Photography",
      category: "Photography",
      src: Service1Img,
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
      title: "Wedding Cinematography",
      category: "Cinematography",
      src: Service2Img,
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
      category: "Photography",
      src: Service3Img,
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
      category: "Photography",
      src: Service4Img,
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
      category: "Consultation",
      src: Service5Img,
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
      category: "Photography",
      src: Service6Img,
      description:
        "Professional portrait photography for couples, families, and individuals, creating timeless memories to treasure.",
      features: [
        "Studio & outdoor options",
        "Wardrobe guidance",
        "Retouched images",
      ],
    },
  ];

  const cards = services.map((service) => (
    <Card
      key={service.title}
      card={{
        src: service.src,
        title: service.title,
        category: service.category,
        content: (
          <div className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed font-sans">
              {service.description}
            </p>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4 font-serif">
                What's Included:
              </h4>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-gray-600 font-sans"
                  >
                    <span className="w-2 h-2 bg-blush-500 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 font-sans">
                Contact us for personalized pricing and package options tailored to your special day.
              </p>
            </div>
          </div>
        ),
      }}
      index={services.indexOf(service)}
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
        <header className="text-center mb-16 animate-fade-in">
          <span className="text-sm font-medium text-white-500 tracking-wide uppercase font-sans">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-200 mt-2 mb-6">
            Wedding Photography &
            <span className="text-blush-900 italic block">Cinematography Services</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-sans">
            From engagement sessions to wedding day coverage, we offer a full suite of photography and Cinematography services to capture your love story
          </p>
        </header>

        {/* Services Carousel */}
        <Carousel items={cards} />
      </div>
    </section>
  );
};

export default Services;
