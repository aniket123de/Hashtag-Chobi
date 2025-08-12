import React, { useState, useEffect, useRef } from "react";
import { FadeInText } from "@/components/ui/fade-in-section";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

// YouTube API type declarations
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const VideoShowcase = () => {
  // YouTube video ID extracted from the URL
  const youtubeVideoId = "XDp_YjH62B4";

  // State to control video playback
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const playerRef = useRef<any>(null);

  // Use intersection observer to detect when video section is visible
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3, // Trigger when 30% of the section is visible
    rootMargin: "0px",
    triggerOnce: false, // Allow multiple triggers for play/pause
  });

  // Load YouTube Player API
  useEffect(() => {
    // Load YouTube API script if not already loaded
    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    } else {
      initializePlayer();
    }

    return () => {
      // Cleanup
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // Initialize YouTube player
  const initializePlayer = () => {
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: youtubeVideoId,
        playerVars: {
          autoplay: 0,
          mute: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: (event: any) => {
            console.log("YouTube player ready");
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          },
        },
      });
    }
  };

  // Handle play/pause based on intersection
  useEffect(() => {
    if (
      playerRef.current &&
      playerRef.current.playVideo &&
      playerRef.current.pauseVideo
    ) {
      if (isIntersecting) {
        // Start playing when section comes into view
        if (!hasStarted) {
          setHasStarted(true);
          playerRef.current.playVideo();
        } else if (!isPlaying) {
          playerRef.current.playVideo();
        }
      } else {
        // Pause when section goes out of view
        if (isPlaying) {
          playerRef.current.pauseVideo();
        }
      }
    }
  }, [isIntersecting, hasStarted, isPlaying]);

  return (
    <section
      ref={elementRef}
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeInText
            as="h2"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif"
            delay={0.1}
          >
            Our Story in Motion
          </FadeInText>
          <FadeInText
            as="p"
            className="text-lg text-gray-600 max-w-3xl mx-auto font-sans"
            delay={0.3}
          >
            Experience the magic of our wedding photography and videography
            through this cinematic showcase. Watch how we capture the essence of
            love, joy, and celebration in every frame.
          </FadeInText>
        </div>

        {/* Video Player Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
            {/* YouTube Video Player */}
            <div className="aspect-video">
              <div
                id="youtube-player"
                className="w-full h-full"
                style={{ border: 0 }}
              />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full opacity-20 blur-xl" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-xl" />
        </div>

        {/* Bottom Content */}
        <div className="text-center mt-12">
          <FadeInText
            as="p"
            className="text-gray-600 font-sans text-lg mb-8"
            delay={0.5}
          >
            "Every love story deserves to be told beautifully. This is just a
            glimpse of how we bring your special moments to life."
          </FadeInText>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: "500+", label: "Weddings Captured" },
              { number: "50k+", label: "Photos Delivered" },
              { number: "200+", label: "Video Stories" },
              { number: "98%", label: "Happy Couples" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <FadeInText
                  as="div"
                  className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-serif"
                  delay={0.7 + index * 0.1}
                >
                  {stat.number}
                </FadeInText>
                <FadeInText
                  as="div"
                  className="text-sm text-gray-600 font-sans"
                  delay={0.8 + index * 0.1}
                >
                  {stat.label}
                </FadeInText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
