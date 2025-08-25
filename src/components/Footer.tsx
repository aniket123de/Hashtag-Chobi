import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Youtube } from "lucide-react";
import { FadeInText } from "@/components/ui/fade-in-section";
import { useHeroData } from "@/hooks/useWebsiteData";

const Footer = () => {
  // Fetch hero data from Firestore for consistent messaging
  const { data: heroData } = useHeroData();

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

  // Use hero data or fallback content
  const description = heroData?.description || 
    "Capturing love stories, frame by frame. Premier wedding photography and Cinematography since 2016, creating timeless memories that will be cherished for generations to come.";

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Image with Low Opacity - Only show when we have Firestore data */}
      {heroData && heroData.footerImage && heroData.footerImage.trim() !== "" && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: `url(${heroData.footerImage})` }}
        ></div>
      )}
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gray-900/60"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img
                src="/HashtagChobi-LOGO.png"
                alt="Hashtag Chobi Logo"
                className="h-[80px] w-auto object-contain cursor-pointer"
              />
            </div>
            <FadeInText 
              as="p" 
              className="text-white leading-relaxed mb-6 max-w-md font-sans"
              delay={0.1}
            >
              {description}
            </FadeInText>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {[
                {
                  href: "https://www.facebook.com/hashtagchobi",
                  label: "Facebook",
                  icon: <Facebook className="h-5 w-5" aria-hidden="true" />,
                },
                {
                  href: "https://www.instagram.com/hashtagchobi",
                  label: "Instagram",
                  icon: <Instagram className="h-5 w-5" aria-hidden="true" />,
                },
                {
                  href: "https://youtube.com/@raulhalder",
                  label: "Youtube",
                  icon: <Youtube className="h-5 w-5" aria-hidden="true" />,
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white hover:text-blush-500 transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services Navigation */}
          <div>
            <FadeInText 
              as="h4" 
              className="text-lg font-medium mb-6 font-serif"
              delay={0.2}
            >
              Services
            </FadeInText>
            <ul className="space-y-3 text-white">
              {[
                { id: "wedding-planning", label: "Wedding Planning" },
                { id: "corporate-events", label: "Corporate Events" },
                { id: "social-celebrations", label: "Social Celebrations" },
                { id: "destination-events", label: "Destination Events" },
                { id: "event-consultation", label: "Event Consultation" },
              ].map(({ id, label }) => (
                <li
                  key={id}
                  className="hover:text-blush-500 transition-colors cursor-pointer"
                  onClick={() => scrollToSection(id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      scrollToSection(id);
                    }
                  }}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <FadeInText 
              as="h4" 
              className="text-lg font-medium mb-6 font-serif"
              delay={0.3}
            >
              Contact
            </FadeInText>
            <div className="space-y-4 text-white">
              {/* Phone */}
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-blush-500" />
                <Link
                  to="tel:+15551234567"
                  className="hover:text-blush-500"
                  aria-label="Call us"
                >
                  +91 70032 16321
                </Link>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-blush-500" />
                <Link
                  to="mailto:Hashtagchobi@gmail.com"
                  className="hover:text-blush-500"
                  aria-label="Email us"
                >
                  Hashtagchobi@gmail.com
                </Link>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-blush-500 mt-1" />
                <address className="not-italic">
                  103/1a raja dinendra street
                  <br />
                  Kolkata - 700006
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with copyright and policy link */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm font-sans">
            © {new Date().getFullYear()} Hashtag Chobi. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="/privacy-policy"
              className="text-white hover:text-blush-500 text-sm transition-colors font-sans"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
