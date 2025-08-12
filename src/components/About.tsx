import AboutImage from "../assets/image/ABOUT.jpg";
import { FadeInText } from "@/components/ui/fade-in-section";

const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Section */}
          <div className="relative animate-fade-in">
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <img
                src={AboutImage}
                alt="Capturing Love Stories | Hashtag Chobi"
                className="w-full object-cover"
                loading="lazy" // Optimize image loading
              />
              {/* Gradient overlay on the image */}
              <div className="absolute inset-0 bg-gradient-to-t from-blush-900/20 to-transparent" />
            </div>

            {/* Decorative Circles behind the image */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-golden-100 rounded-full opacity-60 -z-10" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blush-100 rounded-full opacity-60 -z-10" />
          </div>

          {/* Content Section */}
          <div>
            {/* Heading */}
            <header className="mb-6">
              <FadeInText 
                as="span" 
                className="text-sm font-medium text-black tracking-wide uppercase font-sans"
                delay={0.1}
              >
                About Us
              </FadeInText>
              <FadeInText 
                as="h2" 
                className="text-4xl md:text-5xl font-serif text-gray-800 mt-2 mb-6"
                delay={0.3}
              >
                Preserving Love Stories,
                <span className="text-golden-600 italic block">Frame by Frame</span>
              </FadeInText>
            </header>

            {/* Description paragraphs */}
            <div className="space-y-6">
              <FadeInText 
                as="p" 
                className="text-gray-600 text-lg leading-relaxed font-sans"
                delay={0.5}
              >
                With an artistic eye and a passion for storytelling, we have been capturing 
                the magic of weddings since 2016. Every shot is handcrafted to reflect the 
                unique essence of each couple's journey.
              </FadeInText>
              <FadeInText 
                as="p" 
                className="text-gray-600 text-lg leading-relaxed font-sans"
                delay={0.7}
              >
                We believe in telling your authentic love story through our lens, creating 
                timeless memories that will be cherished for generations to come. Let us turn 
                your special moments into an unforgettable masterpiece.
              </FadeInText>
              <FadeInText 
                as="p" 
                className="text-gray-600 text-lg leading-relaxed font-sans"
                delay={0.9}
              >
                From intimate ceremonies to grand celebrations, we approach each wedding 
                with meticulous attention to detail and an unwavering commitment to excellence.
              </FadeInText>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200">
              {/* Weddings Captured */}
              <div className="text-center">
                <div className="text-3xl font-serif text-black mb-2">500+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide font-sans">Weddings Captured</div>
              </div>

              {/* Years Experience */}
              <div className="text-center">
                <div className="text-3xl font-serif text-black mb-2">8+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide font-sans">Years Experience</div>
              </div>

              {/* Client Satisfaction */}
              <div className="text-center">
                <div className="text-3xl font-serif text-black mb-2">98%</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide font-sans">Client Satisfaction</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
