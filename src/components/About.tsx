import { FadeInText } from "@/components/ui/fade-in-section";
import { useAbout } from "@/hooks/useAbout";
import { DEFAULT_ABOUT_DATA } from "@/lib/firestore";

const About = () => {
  const { data = DEFAULT_ABOUT_DATA, isLoading } = useAbout();
  const firstImage = data.images && data.images.length > 0 ? data.images[0] : undefined;

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-pulse text-gray-500">Loading about...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div className="relative animate-fade-in">
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <img
                src={firstImage?.url || "/placeholder.svg"}
                alt={firstImage?.alt || "About image"}
                className="w-full object-cover"
                loading="lazy"
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
                {data.title}
              </FadeInText>
              <FadeInText 
                as="h2" 
                className="text-4xl md:text-5xl font-serif text-gray-800 mt-2 mb-6"
                delay={0.3}
              >
                {data.subtitle}
              </FadeInText>
            </header>

            {/* Description */}
            <div className="space-y-6">
              <FadeInText 
                as="p" 
                className="text-gray-600 text-lg leading-relaxed font-sans"
                delay={0.5}
              >
                {data.description}
              </FadeInText>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200">
              {data.stats?.map((stat, index) => (
                <div className="text-center" key={index}>
                  <div className="text-3xl font-serif text-black mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide font-sans">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
