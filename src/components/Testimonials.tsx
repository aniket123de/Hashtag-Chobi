import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
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

  /**
   * Array of testimonial objects including client info, event, testimonial text, and rating
   */
  const testimonials = [
    {
      name: "Sarah & Michael",
      event: "Wedding",
      text: "Our wedding was absolutely perfect thanks to the incredible team at Eventory. Every detail was flawlessly executed, and our guests are still talking about how magical the evening was. We couldn't have asked for a better experience.",
      rating: 5,
    },
    {
      name: "Jennifer Martinez",
      event: "Corporate Gala",
      text: "The annual company gala exceeded all expectations. The attention to detail, vendor coordination, and seamless execution made our event a tremendous success. Our clients and employees were thoroughly impressed.",
      rating: 5,
    },
    {
      name: "David & Lisa Chen",
      event: "Anniversary Celebration",
      text: "For our 25th anniversary, we wanted something special and memorable. The team created an intimate yet elegant celebration that perfectly captured our love story. It was beyond our wildest dreams.",
      rating: 5,
    },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-br from-golden-50 via-white to-blush-50"
      aria-label="Client Testimonials"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <header className="text-center mb-16 animate-fade-in">
          <span className="text-sm font-medium text-blush-500 tracking-wide uppercase font-['EB_Garamond']">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mt-2 mb-6">
            What Our Clients
            <span className="text-golden-600 italic block">Are Saying</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-['EB_Garamond']">
            Don't just take our word for it—hear from the couples and companies who trusted us with their most important celebrations
          </p>
        </header>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
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
              <blockquote className="text-gray-600 leading-relaxed mb-6 italic font-['EB_Garamond']">
                &quot;{testimonial.text}&quot;
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center">
                {/* Initials Circle */}
                <div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blush-200 to-golden-200
                             flex items-center justify-center mr-4 text-lg font-serif text-gray-700 select-none"
                  aria-hidden="true"
                >
                  {testimonial.name.split(" ")[0][0]}
                </div>

                {/* Name and Event */}
                <div>
                  <h3
                    id={`${testimonial.name.replace(/\s+/g, "-").toLowerCase()}-title`}
                    className="font-modern font-semibold text-gray-800 tracking-wide"
                  >
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-['EB_Garamond']">{testimonial.event}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <p className="text-lg text-gray-600 mb-6">
            Ready to create your own unforgettable experience?
          </p>
          <Button
            size="lg"
            onClick={() => scrollToSection("contact")}
            className="bg-blush-500 hover:bg-blush-600 text-white px-8 py-4 text-lg font-medium
                       rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Planning Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
