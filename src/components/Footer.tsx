import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assets/image/HashtagChobi-LOGO.png";
import FooterBG from "../assets/image/FOOTER.jpg";
import { FadeInText } from "@/components/ui/fade-in-section";

const Footer = () => {
  // Get current year dynamically for copyright
  const currentYear = new Date().getFullYear();

  // Smooth scroll to a section by ID
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative text-white py-16 overflow-hidden">
      {/* Background Image */}
      <img
        src={FooterBG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-3">
              {/* Logo */}
              <img
                src={Logo}
                alt="Hashtag Chobi Logo"
                className="h-[80px] w-auto object-contain cursor-pointer"
              />
            </div>
            <FadeInText 
              as="p" 
              className="text-white leading-relaxed mb-6 max-w-md font-sans"
              delay={0.1}
            >
              Capturing love stories, frame by frame. Premier wedding photography 
              and Cinematography since 2016, creating timeless memories that will be 
              cherished for generations to come.
            </FadeInText>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {[
                {
                  href: "https://www.facebook.com",
                  label: "Facebook",
                  icon: <Facebook className="h-5 w-5" aria-hidden="true" />,
                },
                {
                  href: "https://www.instagram.com",
                  label: "Instagram",
                  icon: <Instagram className="h-5 w-5" aria-hidden="true" />,
                },
                {
                  href: "https://www.twitter.com",
                  label: "Twitter",
                  icon: <Twitter className="h-5 w-5" aria-hidden="true" />,
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
                  +1 (555) 123-4567
                </Link>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-blush-500" />
                <Link
                  to="mailto:hello@eventory.com"
                  className="hover:text-blush-500"
                  aria-label="Email us"
                >
                  hello@eventory.com
                </Link>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-blush-500 mt-1" />
                <address className="not-italic">
                  123 Event Plaza, Suite 456
                  <br />
                  New York, NY 10001
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with copyright and policy link */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm font-sans">
            © {currentYear} Hashtag Chobi. All rights reserved.
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
