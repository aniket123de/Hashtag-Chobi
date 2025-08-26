import React, { useEffect, useState } from 'react';
import { VideoShowcaseHomeService } from '@/lib/services';

const PrismaticVideo: React.FC = () => {
  const [videoId, setVideoId] = useState<string>("lpz7exWaiCE");

  useEffect(() => {
    (async () => {
      const data = await VideoShowcaseHomeService.getData();
      if (data?.homePageVideoUrl) {
        const id = extractYouTubeId(data.homePageVideoUrl);
        if (id) setVideoId(id);
      }
    })();
  }, []);

  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  return (
    <div className="relative w-full">
      {/* Video Section with Content */}
      <div className="relative min-h-[50vh] sm:min-h-[65vh] lg:min-h-[85vh] xl:min-h-[90vh] flex items-center justify-center bg-black bg-[url('/crafting-unforgettable-moments.webp')] bg-cover bg-center overflow-hidden">
        {/* Upper Angular Border - Overlapping the video */}
        <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 lg:h-24 z-20">
          <svg
            viewBox="0 0 100 20"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <polygon
              points="0,0 80,20 100,0 100,0 0,0"
              fill="#FCFAF9"
              className="drop-shadow-lg"
            />
          </svg>
        </div>
        {/* Background Video - YouTube Embed */}
        <iframe
          className="absolute"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&enablejsapi=0&start=0`}
          title="Background Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          style={{ 
            pointerEvents: 'none',
            top: '50%',
            left: '50%',
            width: '177.77vh', // Force 16:9 aspect ratio based on height
            height: '56.25vw', // Force 16:9 aspect ratio based on width
            minWidth: '100%',
            minHeight: '100%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1
          }}
        ></iframe>

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
              fill="#FCFAF9"
              className="drop-shadow-lg"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PrismaticVideo;
