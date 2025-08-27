import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeInText } from "@/components/ui/fade-in-section";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useVideoShowcaseData } from "@/hooks/useWebsiteData";
import { VideoShowcaseData } from "@/lib/services";
import { YouTubePlayer } from "@/types/youtube";

const VideoShowcase = () => {
  // Fetch video showcase data from Firestore
  const { data: videoShowcaseData, loading, error } = useVideoShowcaseData();

  // Extract YouTube video ID from the URL
  const getYouTubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "XDp_YjH62B4"; // Fallback to default
  };

  const youtubeVideoId = videoShowcaseData?.videoUrl ? getYouTubeVideoId(videoShowcaseData.videoUrl) : "XDp_YjH62B4";
  const youtubeVideoId2 = videoShowcaseData?.videoUrl2 ? getYouTubeVideoId(videoShowcaseData.videoUrl2) : "XDp_YjH62B4";

  // State to control video playback
  const [playerReady, setPlayerReady] = useState(false);
  const [playerReady2, setPlayerReady2] = useState(false);
  
  const playerRef = useRef<YouTubePlayer | null>(null);
  const playerRef2 = useRef<YouTubePlayer | null>(null);

  // Use intersection observer to detect when video section is visible
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5, // Trigger when 50% of the section is visible
    rootMargin: "-100px 0px -100px 0px", // Add some margin to prevent immediate triggering
    triggerOnce: false, // Allow multiple triggers for play/pause
  });

  // Initialize YouTube player (memoized to satisfy exhaustive-deps)
  const initializePlayer = useCallback(() => {
    if (window.YT && window.YT.Player) {
      // Initialize first player
      playerRef.current = new window.YT.Player("youtube-player-1", {
        videoId: youtubeVideoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          fs: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            console.log("YouTube player 1 ready");
            setPlayerReady(true);
            try {
              playerRef.current?.mute();
              playerRef.current?.playVideo();
            } catch (err) {
              console.debug("Autoplay start failed for player 1", err);
            }
          },
        },
      });

      // Initialize second player
      playerRef2.current = new window.YT.Player("youtube-player-2", {
        videoId: youtubeVideoId2,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          fs: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            console.log("YouTube player 2 ready");
            setPlayerReady2(true);
            try {
              playerRef2.current?.mute();
              playerRef2.current?.playVideo();
            } catch (err) {
              console.debug("Autoplay start failed for player 2", err);
            }
          },
        },
      });
    }
  }, [youtubeVideoId, youtubeVideoId2]);

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
      if (playerRef2.current) {
        playerRef2.current.destroy();
      }
    };
  }, [initializePlayer]);

  // Show loading state - return fallback content during loading instead of null
  if (loading) {
    return (
      <section
        id="video-showcase"
        className="py-20"
        style={{ backgroundColor: '#F0E9E0' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header Skeleton */}
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-80 mx-auto animate-pulse"></div>
          </div>

          {/* Video Player Skeleton */}
          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="aspect-video bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="aspect-video bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-20" style={{ backgroundColor: '#F0E9E0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-red-500">
              <p>Error loading video showcase. Please try again later.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Use default data if no data is available
  const data: VideoShowcaseData = videoShowcaseData || {
    title: "Our Story in Motion",
    subtitle: "Cinematic Wedding Stories",
    description: "Experience the magic of our wedding photography and videography through this cinematic showcase. Watch how we capture the essence of love, joy, and celebration in every frame.",
    videoUrl: "https://www.youtube.com/watch?v=XDp_YjH62B4",
    videoUrl2: "https://www.youtube.com/watch?v=XDp_YjH62B4",
    thumbnailUrl: "/src/assets/image/VIDEO_THUMBNAIL.jpg"
  };

  return (
    <section
      id="video-showcase"
      ref={elementRef}
      className="py-20"
      style={{ backgroundColor: '#F0E9E0' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeInText
            as="h2"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif"
            delay={0.1}
          >
            {data.title}
          </FadeInText>
          <FadeInText
            as="p"
            className="text-lg text-gray-600 max-w-3xl mx-auto font-sans"
            delay={0.3}
          >
            {data.description}
          </FadeInText>
        </div>

        {/* Video Player Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop: Side by side, Mobile: Stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* First Video */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              {/* YouTube Video Player 1 */}
              <div className="aspect-video relative">
                <div
                  id="youtube-player-1"
                  className="w-full h-full"
                  style={{ border: 0 }}
                />
                {/* Fullscreen button overlay */}
                <button
                  onClick={() => {
                    try {
                      // YouTube iframe API supports requestFullScreen via player API in some contexts
                      const iframe = document.querySelector('#youtube-player-1 iframe') as HTMLIFrameElement | null;
                      if (iframe && iframe.requestFullscreen) iframe.requestFullscreen();
                    } catch (err) {
                      console.debug("Fullscreen request failed for player 1", err);
                    }
                  }}
                  className="absolute bottom-3 right-3 z-10 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded"
                  aria-label="Fullscreen video 1"
                >
                  Fullscreen
                </button>
                
                {/* Loading State */}
                {!playerReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Second Video */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              {/* YouTube Video Player 2 */}
              <div className="aspect-video relative">
                <div
                  id="youtube-player-2"
                  className="w-full h-full"
                  style={{ border: 0 }}
                />
                {/* Fullscreen button overlay */}
                <button
                  onClick={() => {
                    try {
                      const iframe = document.querySelector('#youtube-player-2 iframe') as HTMLIFrameElement | null;
                      if (iframe && iframe.requestFullscreen) iframe.requestFullscreen();
                    } catch (err) {
                      console.debug("Fullscreen request failed for player 2", err);
                    }
                  }}
                  className="absolute bottom-3 right-3 z-10 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded"
                  aria-label="Fullscreen video 2"
                >
                  Fullscreen
                </button>
                
                {/* Loading State */}
                {!playerReady2 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  </div>
                )}
              </div>
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

          {/* View More Button */}
          <FadeInText
            as="div"
            className="text-center"
            delay={1.2}
          >
            <Link
              to="/videos"
              className="inline-flex items-center gap-3 bg-golden-500 hover:bg-golden-600 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
            >
              <span className="font-sans">View More Videos</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </FadeInText>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
