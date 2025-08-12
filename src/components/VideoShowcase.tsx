import React from 'react';

const VideoShowcase = () => {
  // YouTube video ID extracted from the URL
  const youtubeVideoId = "XDp_YjH62B4";

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Our Story in Motion
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-sans">
            Experience the magic of our wedding photography and videography through this 
            cinematic showcase. Watch how we capture the essence of love, joy, and celebration 
            in every frame.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
            {/* YouTube Video Embed */}
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1&controls=1&showinfo=0&autoplay=0&mute=0`}
                title="Hashtag Chobi - Wedding Photography Showcase"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full opacity-20 blur-xl" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-xl" />
        </div>

        {/* Bottom Content */}
        <div className="text-center mt-12">
          <p className="text-gray-600 font-sans text-lg mb-8">
            "Every love story deserves to be told beautifully. This is just a glimpse of how we bring your special moments to life."
          </p>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: "500+", label: "Weddings Captured" },
              { number: "50k+", label: "Photos Delivered" },
              { number: "200+", label: "Video Stories" },
              { number: "98%", label: "Happy Couples" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-serif">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-sans">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
