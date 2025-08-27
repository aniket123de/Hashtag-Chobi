import ServiceBG from "../assets/image/SERVICES.jpg";
import { Carousel, Card } from "./ui/apple-cards-carousel";
import { FadeInText } from "@/components/ui/fade-in-section";

// Sample couples data - you can later fetch this from Firestore
const couplesData = [
  {
    id: "couple1",
    groomName: "Aniket",
    brideName: "Debosmita", 
    coverImage: "/src/assets/image/WEDDING.jpg",
    category: "Traditional Wedding",
    description: "A beautiful traditional wedding ceremony filled with love, laughter, and unforgettable moments.",
    date: "December 15, 2023",
    venue: "Kolkata, West Bengal"
  },
  {
    id: "couple2",
    groomName: "Rahul",
    brideName: "Priya",
    coverImage: "/src/assets/image/RECEPTION.jpg", 
    category: "Destination Wedding",
    description: "An enchanting destination wedding celebrating love against breathtaking backdrops.",
    date: "March 22, 2024",
    venue: "Goa, India"
  },
  {
    id: "couple3",
    groomName: "Arjun",
    brideName: "Sneha",
    coverImage: "/src/assets/image/CORPORATE.jpg",
    category: "Garden Wedding", 
    description: "A romantic garden wedding surrounded by nature's beauty and intimate moments.",
    date: "January 8, 2024",
    venue: "Bangalore, Karnataka"
  },
  {
    id: "couple4",
    groomName: "Vikram",
    brideName: "Kavya",
    coverImage: "/src/assets/image/DESTINATION.jpg",
    category: "Royal Wedding",
    description: "A grand royal wedding celebration with traditional elegance and modern touches.",
    date: "November 30, 2023", 
    venue: "Udaipur, Rajasthan"
  }
];

const Services = () => {

  // Map couples to cards
  const cards = couplesData.map((couple, index) => (
    <Card
      key={couple.id}
      card={{
        src: couple.coverImage,
        title: `${couple.groomName} ♥ ${couple.brideName}`,
        category: couple.category,
        href: `/${couple.id}`, // Add href for direct navigation
        content: (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2 font-serif">
                {couple.groomName} ♥ {couple.brideName}
              </h3>
              <p className="text-blush-600 font-medium mb-4">{couple.category}</p>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed font-sans">
              {couple.description}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-600 font-sans">
                <span className="w-2 h-2 bg-blush-500 rounded-full mr-3" />
                Date: {couple.date}
              </div>
              <div className="flex items-center text-gray-600 font-sans">
                <span className="w-2 h-2 bg-blush-500 rounded-full mr-3" />
                Venue: {couple.venue}
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <div className="w-full bg-blush-500 text-white font-medium py-3 px-6 rounded-lg text-center font-sans">
                View Wedding Album
              </div>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-gray-500 font-sans text-center">
                Click to explore their beautiful wedding story
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
      className="relative py-20"
      style={{ backgroundColor: '#F0E9E0' }}
      aria-label="Wedding Albums"
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
            Wedding Albums
          </FadeInText>
          <FadeInText 
            as="h2" 
            className="text-4xl md:text-5xl font-serif text-gray-200 mt-2 mb-6"
            delay={0.3}
          >
            Beautiful Love Stories &
            <span className="text-blush-900 italic block">Captured Forever</span>
          </FadeInText>
          <FadeInText 
            as="p" 
            className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-sans"
            delay={0.5}
          >
            Discover the magical moments we've captured for couples on their special day. Each album tells a unique story of love, joy, and celebration.
          </FadeInText>
        </header>

        {/* Services Carousel */}
        <Carousel items={cards} />
      </div>
    </section>
  );
};

export default Services;
