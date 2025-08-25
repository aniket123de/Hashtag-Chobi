import NewHeader from "@/components/NewHeader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VideoShowcase from "@/components/VideoShowcase";
import Services from "@/components/Services";
import PrismaticVideo from "@/components/PrismaticVideo";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Site Header */}
      <NewHeader />

      {/* Hero Section */}
      <section id="hero" aria-label="Hero Section">
        <Hero />
      </section>

      {/* About Us Section */}
      <section id="about" aria-label="About Section">
        <About />
      </section>

      {/* Video Showcase Section */}
      <section id="video" aria-label="Video Showcase Section">
        <VideoShowcase />
      </section>

      {/* Services Section */}
      <section id="services" aria-label="Services Section">
        <Services />
      </section>

      {/* Prismatic Video Section */}
      <section id="prismatic-video" aria-label="Prismatic Video Section">
        <PrismaticVideo youtubeVideoId="lpz7exWaiCE" />
      </section>

      {/* Client Testimonials Section */}
      <section id="testimonials" aria-label="Testimonials Section">
        <Testimonials />
      </section>

      {/* Portfolio Gallery Section */}
      <section id="gallery" aria-label="Gallery Section">
        <Gallery />
      </section>

      {/* Call To Action Section */}
      <CTA />

      {/* Contact Section */}
      <section id="contact" aria-label="Contact Section">
        <Contact />
      </section>

      {/* Site Footer */}
      <Footer />
    </div>
  );
};

export default Index;
