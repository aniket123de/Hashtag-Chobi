import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import Logo from "../assets/image/HashtagChobi-LOGO.png";

const NewHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Handles navigation clicks:
   * - If on homepage, smoothly scroll to section and update URL hash
   * - Otherwise, navigate to homepage and pass sectionId in state for scrolling after navigation
   */
  const handleNavClick = (sectionId: string) => {
    const isHome = location.pathname === "/";

    if (isHome) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        // Update URL hash without adding history entry
        history.replaceState(null, "", `#${sectionId}`);
      }
    } else {
      // Navigate to homepage with state to scroll to section after load
      navigate("/", { state: { scrollToId: sectionId } });
    }
  };

  // Navigation items for header menu
  const navItems = [
    { name: "Home", link: "#hero" },
    { name: "About", link: "#about" },
    { name: "Services", link: "#services" },
    { name: "Gallery", link: "#gallery" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Contact", link: "#contact" },
  ];

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (href) {
      const sectionId = href.replace("#", "");
      handleNavClick(sectionId);
    }
  };

  const CustomLogo = () => (
    <div
      className="flex h-20 items-center justify-center cursor-pointer flex-shrink-0"
      onClick={() => handleNavClick("hero")}
    >
      <img
        src={Logo}
        alt="Hashtag Chobi Logo"
        className="block h-16 md:h-20 w-auto object-contain"
      />
    </div>
  );

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody className="h-20 px-6">
        <CustomLogo />
        <NavItems
          items={navItems}
          onItemClick={handleItemClick}
          className="text-white"
        />
        <NavbarButton
          variant="dark"
          onClick={() => handleNavClick("contact")}
          as="button"
          className="flex-shrink-0 text-xs px-3 py-2 bg-black text-white rounded-full focus:bg-blush-700 focus:outline-none"
        >
          Book Session
        </NavbarButton>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <div
            className="flex h-16 items-center justify-center cursor-pointer flex-shrink-0"
            onClick={() => handleNavClick("hero")}
          >
            <img
              src={Logo}
              alt="Hashtag Chobi Logo"
              className="block h-14 w-auto object-contain"
            />
          </div>
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              onClick={(e) => {
                handleItemClick(e);
                setIsMobileMenuOpen(false);
              }}
              className="block text-lg font-semibold text-gray-900 hover:text-blush-600 transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
          <NavbarButton
            variant="dark"
            onClick={() => {
              handleNavClick("contact");
              setIsMobileMenuOpen(false);
            }}
            as="button"
            className="w-full mt-4 bg-black text-white rounded-full focus:bg-blush-700 focus:outline-none"
          >
            Book Your Session
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default NewHeader;
