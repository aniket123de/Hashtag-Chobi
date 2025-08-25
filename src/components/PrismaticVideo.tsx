import React from 'react';

const PrismaticVideo = () => {
  return (
    <div className="relative w-full">
      {/* Video Section with Content */}
      <div className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center bg-black bg-[url('/crafting-unforgettable-moments.webp')] bg-cover bg-center">
        {/* Upper Angular Border - Overlapping the video */}
        <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 lg:h-24 z-20">
          <svg
            viewBox="0 0 100 20"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <polygon
              points="0,0 80,20 100,0 100,0 0,0"
              fill="white"
              className="drop-shadow-lg"
            />
          </svg>
        </div>
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/crafting-unforgettable-moments.webp"
          onError={(e) => console.error('Video error:', e)}
          onLoadStart={() => console.log('Video loading started')}
          onCanPlay={() => console.log('Video can play')}
        >
          <source src="/Prismatic.mp4" type="video/mp4" />
          <source src="/prismatic.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Overlay Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-wider leading-tight">
            SOUL CINEMA
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-0">
            Every wedding is unique and so are our films. We spend a year being the best husband or wife 
            of everything within nature, and Soul Cinema. We're a husband & wife team 
            without and free-form way of documenting your one-day love story.
          </p>
        </div>

        {/* Lower Angular Border - Overlapping the video */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 lg:h-24 z-20">
          <svg
            viewBox="0 0 100 20"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <polygon
              points="0,20 20,0 100,20 100,20 0,20"
              fill="white"
              className="drop-shadow-lg"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PrismaticVideo;
