import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, NavBody, NavItems, NavbarButton, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle } from "@/components/ui/resizable-navbar";
import { useHeroData } from "@/hooks/useWebsiteData";

interface NewHeaderProps {
  variant?: 'default' | 'dark';
}

const NewHeader = ({ variant }: NewHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Auto-detect if we need dark variant for white background pages
  const shouldUseDarkVariant = variant === 'dark' ||
    location.pathname === '/gallery' ||
    location.pathname === '/videos' ||
    location.pathname.startsWith('/couple/');

  // Fetch hero data from Firestore for consistent CTA text
  const { data: heroData } = useHeroData();

  // Use hero data or fallback text
  const ctaText = heroData?.ctaText || "Book Your Dates";

  const allNavItems = [
    { name: "Home", link: "#hero" },
    { name: "About", link: "#about" },
    { name: "Stories", link: "#services" },
    { name: "Gallery", link: "#gallery" },
    { name: "Films", link: "#video-showcase" },
    { name: "Contact", link: "#contact" },
  ];

  // Show only 'Home' option for gallery and couple pages
  const navItems = shouldUseDarkVariant ? [{ name: "Home", link: "/" }] : allNavItems;

  const handleNavClick = (sectionId: string) => {
    // Handle navigation to home page from other pages
    if (shouldUseDarkVariant && sectionId === "/") {
      window.location.href = "/";
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (href) {
      if (href === "/") {
        // Navigate to home page
        window.location.href = "/";
      } else {
        const sectionId = href.replace("#", "");
        handleNavClick(sectionId);
      }
    }
  };

  const CustomLogo = () => (
    <div
      className="flex items-center justify-center cursor-pointer flex-shrink-0 h-full"
      onClick={() => {
        if (shouldUseDarkVariant) {
          window.location.href = "/";
        } else {
          handleNavClick("hero");
        }
      }}
    >
      <img
        src="/LOGO.jpg"
        alt="Hashtag Chobi Logo"
        className="block h-16 md:h-18 w-auto object-contain"
      />
    </div>
  );

  return (
    <Navbar variant={shouldUseDarkVariant ? 'dark' : 'default'}>
      {/* Desktop Navigation */}
      <NavBody className="h-20 px-6">
        <CustomLogo />
        <NavItems
          items={navItems}
          onItemClick={handleItemClick}
        />
        <NavbarButton
          variant="primary"
          onClick={() => {
            if (shouldUseDarkVariant) {
              window.location.href = "/#contact";
            } else {
              handleNavClick("contact");
            }
          }}
          as="button"
          className="flex-shrink-0 text-xs focus:outline-none ml-4 !bg-white/20 hover:!bg-white/30 !backdrop-blur-sm !text-white hover:!text-white !border-white/30 hover:!border-white/50"
          navVariant={shouldUseDarkVariant ? 'dark' : 'default'}
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
            onClick={() => {
              if (shouldUseDarkVariant) {
                window.location.href = "/";
              } else {
                handleNavClick("hero");
              }
            }}
          >
            <img
              src="/LOGO.jpg"
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
          navVariant={shouldUseDarkVariant ? 'dark' : 'default'}
        >
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              onClick={(e) => {
                handleItemClick(e);
                setIsMobileMenuOpen(false);
              }}
              className={`block text-lg font-semibold transition-colors duration-200 font-sans ${shouldUseDarkVariant
                ? 'text-gray-900 hover:text-blush-600'
                : 'text-gray-900 hover:text-blush-600'
                }`}
            >
              {item.name}
            </a>
          ))}
          <NavbarButton
            variant="primary"
            onClick={() => {
              if (shouldUseDarkVariant) {
                window.location.href = "/#contact";
              } else {
                handleNavClick("contact");
              }
              setIsMobileMenuOpen(false);
            }}
            as="button"
            className="w-full mt-4 focus:outline-none !bg-golden-500 hover:!bg-golden-600 !text-black hover:!text-black"
            navVariant={shouldUseDarkVariant ? 'dark' : 'default'}
          >
            {ctaText}
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default NewHeader;
