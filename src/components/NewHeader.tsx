import { useState } from "react";
import { Navbar, NavBody, NavItems, NavbarButton, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle } from "@/components/ui/resizable-navbar";
import Logo from "../assets/image/HashtagChobi-LOGO.png";
import { useHeroData } from "@/hooks/useWebsiteData";

const NewHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch hero data from Firestore for consistent CTA text
  const { data: heroData } = useHeroData();

  // Use hero data or fallback text
  const ctaText = heroData?.ctaText || "Book Your Session";

  const navItems = [
    { name: "Home", link: "#hero" },
    { name: "About", link: "#about" },
    { name: "Services", link: "#services" },
    { name: "Gallery", link: "#gallery" },
    { name: "Contact", link: "#contact" },
  ];

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      className="flex items-center justify-center cursor-pointer flex-shrink-0 h-full"
      onClick={() => handleNavClick("hero")}
    >
      <img
        src={Logo}
        alt="Hashtag Chobi Logo"
        className="block h-16 md:h-18 w-auto object-contain"
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
        />
        <NavbarButton
          variant="primary"
          onClick={() => handleNavClick("contact")}
          as="button"
          className="flex-shrink-0 text-xs focus:outline-none ml-4"
        >
          {ctaText}
        </NavbarButton>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <div className="flex-1" />
          <div
            className="flex items-center justify-center cursor-pointer flex-shrink-0"
            onClick={() => handleNavClick("hero")}
          >
            <img
              src={Logo}
              alt="Hashtag Chobi Logo"
              className="block h-16 w-auto object-contain"
            />
          </div>
          <div className="flex-1 flex justify-end">
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
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
              className="block text-lg font-semibold text-gray-900 hover:text-blush-600 transition-colors duration-200 font-sans"
            >
              {item.name}
            </a>
          ))}
          <NavbarButton
            variant="primary"
            onClick={() => {
              handleNavClick("contact");
              setIsMobileMenuOpen(false);
            }}
            as="button"
            className="w-full mt-4 focus:outline-none"
          >
            {ctaText}
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default NewHeader;
