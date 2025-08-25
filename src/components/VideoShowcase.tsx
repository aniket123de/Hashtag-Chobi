import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { FadeInText } from "@/components/ui/fade-in-section";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useVideoShowcaseData } from "@/hooks/useWebsiteData";
import { VideoShowcaseData } from "@/lib/services";

// YouTube API type declarations
declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, config: unknown) => YouTubePlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayer {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  getPlayerState(): number;
  destroy(): void;
}

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

  // State to control video playback
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  
  // State for second video
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [hasStarted2, setHasStarted2] = useState(false);
  const [playerReady2, setPlayerReady2] = useState(false);
  const [isMuted2, setIsMuted2] = useState(true);
  const [showControls2, setShowControls2] = useState(false);
  const [userInteracted2, setUserInteracted2] = useState(false);
  
  const playerRef = useRef<YouTubePlayer | null>(null);
  const playerRef2 = useRef<YouTubePlayer | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const controlsTimeoutRef2 = useRef<NodeJS.Timeout | null>(null);

  // Use intersection observer to detect when video section is visible
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5, // Trigger when 50% of the section is visible
    rootMargin: "-100px 0px -100px 0px", // Add some margin to prevent immediate triggering
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
      if (playerRef2.current) {
        playerRef2.current.destroy();
      }
    };
  }, [youtubeVideoId]); // Re-initialize when video ID changes

  // Initialize YouTube player
  const initializePlayer = () => {
    if (window.YT && window.YT.Player) {
      // Initialize first player
      playerRef.current = new window.YT.Player("youtube-player-1", {
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
          onReady: () => {
            console.log("YouTube player 1 ready");
            setPlayerReady(true);
          },
          onStateChange: (event: { data: number }) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
            }
          },
        },
      });

      // Initialize second player
      playerRef2.current = new window.YT.Player("youtube-player-2", {
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
          onReady: () => {
            console.log("YouTube player 2 ready");
            setPlayerReady2(true);
          },
          onStateChange: (event: { data: number }) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying2(true);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying2(false);
            } else if (event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying2(false);
            }
          },
        },
      });
    }
  };

  // Manual control functions for first video
  const togglePlayPause = () => {
    if (!playerRef.current) return;
    
    setUserInteracted(true);
    
    try {
      const currentState = playerRef.current.getPlayerState();
      if (currentState === window.YT.PlayerState.PLAYING) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
        if (!hasStarted) setHasStarted(true);
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  const toggleFullscreen = () => {
    const playerElement = document.getElementById('youtube-player-1');
    if (playerElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerElement.requestFullscreen();
      }
    }
  };

  // Manual control functions for second video
  const togglePlayPause2 = () => {
    if (!playerRef2.current) return;
    
    setUserInteracted2(true);
    
    try {
      const currentState = playerRef2.current.getPlayerState();
      if (currentState === window.YT.PlayerState.PLAYING) {
        playerRef2.current.pauseVideo();
      } else {
        playerRef2.current.playVideo();
        if (!hasStarted2) setHasStarted2(true);
      }
    } catch (error) {
      console.error('Error toggling play/pause for video 2:', error);
    }
  };

  const toggleMute2 = () => {
    if (!playerRef2.current) return;
    
    try {
      if (isMuted2) {
        playerRef2.current.unMute();
        setIsMuted2(false);
      } else {
        playerRef2.current.mute();
        setIsMuted2(true);
      }
    } catch (error) {
      console.error('Error toggling mute for video 2:', error);
    }
  };

  const toggleFullscreen2 = () => {
    const playerElement = document.getElementById('youtube-player-2');
    if (playerElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerElement.requestFullscreen();
      }
    }
  };

  // Show/hide controls for first video
  const handleMouseEnter = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  // Show/hide controls for second video
  const handleMouseEnter2 = () => {
    setShowControls2(true);
    if (controlsTimeoutRef2.current) {
      clearTimeout(controlsTimeoutRef2.current);
    }
  };

  const handleMouseLeave2 = () => {
    controlsTimeoutRef2.current = setTimeout(() => {
      setShowControls2(false);
    }, 2000);
  };

  // Handle play/pause based on intersection (only if user hasn't interacted)
  useEffect(() => {
    if (!playerReady || !playerRef.current || userInteracted) return;

    console.log('Intersection changed:', isIntersecting, 'Has started:', hasStarted);

    if (isIntersecting) {
      // Start playing when section comes into view
      if (!hasStarted) {
        setHasStarted(true);
        setTimeout(() => {
          if (playerRef.current && playerRef.current.playVideo) {
            console.log('Starting video playback');
            playerRef.current.playVideo();
          }
        }, 500);
      } else {
        // Resume playing if paused
        try {
          const currentState = playerRef.current.getPlayerState();
          if (currentState === window.YT.PlayerState.PAUSED || currentState === window.YT.PlayerState.CUED) {
            console.log('Resuming video playback');
            playerRef.current.playVideo();
          }
        } catch (error) {
          console.error('Error getting player state:', error);
        }
      }
    } else if (hasStarted) {
      // Pause when section goes out of view (only if video has started)
      try {
        const currentState = playerRef.current.getPlayerState();
        if (currentState === window.YT.PlayerState.PLAYING) {
          console.log('Pausing video');
          playerRef.current.pauseVideo();
        }
      } catch (error) {
        console.error('Error pausing video:', error);
      }
    }
  }, [isIntersecting, hasStarted, playerReady, userInteracted]);

  // Handle play/pause for second video based on intersection
  useEffect(() => {
    if (!playerReady2 || !playerRef2.current || userInteracted2) return;

    if (isIntersecting) {
      // Start playing when section comes into view
      if (!hasStarted2) {
        setHasStarted2(true);
        setTimeout(() => {
          if (playerRef2.current && playerRef2.current.playVideo) {
            console.log('Starting video 2 playback');
            playerRef2.current.playVideo();
          }
        }, 700); // Slight delay after first video
      } else {
        // Resume playing if paused
        try {
          const currentState = playerRef2.current.getPlayerState();
          if (currentState === window.YT.PlayerState.PAUSED || currentState === window.YT.PlayerState.CUED) {
            console.log('Resuming video 2 playback');
            playerRef2.current.playVideo();
          }
        } catch (error) {
          console.error('Error getting player 2 state:', error);
        }
      }
    } else if (hasStarted2) {
      // Pause when section goes out of view (only if video has started)
      try {
        const currentState = playerRef2.current.getPlayerState();
        if (currentState === window.YT.PlayerState.PLAYING) {
          console.log('Pausing video 2');
          playerRef2.current.pauseVideo();
        }
      } catch (error) {
        console.error('Error pausing video 2:', error);
      }
    }
  }, [isIntersecting, hasStarted2, playerReady2, userInteracted2]);

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-300 rounded w-96 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-300 rounded w-80 mx-auto"></div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
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
    thumbnailUrl: "/src/assets/image/VIDEO_THUMBNAIL.jpg"
  };

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
            <div 
              className="relative bg-black rounded-2xl overflow-hidden shadow-2xl group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* YouTube Video Player 1 */}
              <div className="aspect-video relative">
                <div
                  id="youtube-player-1"
                  className="w-full h-full"
                  style={{ border: 0 }}
                />
                
                {/* Custom Video Controls Overlay */}
                <AnimatePresence>
                  {showControls && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
                    >
                      {/* Play/Pause Button - Center */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                        <motion.button
                          onClick={togglePlayPause}
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300 group"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isPlaying ? (
                            <Pause className="w-6 h-6 text-white" />
                          ) : (
                            <Play className="w-6 h-6 text-white ml-1" />
                          )}
                        </motion.button>
                      </div>

                      {/* Bottom Controls */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                        {/* Left Controls */}
                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={togglePlayPause}
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-1.5 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4 text-white" />
                            ) : (
                              <Play className="w-4 h-4 text-white ml-0.5" />
                            )}
                          </motion.button>

                          <motion.button
                            onClick={toggleMute}
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-1.5 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isMuted ? (
                              <VolumeX className="w-4 h-4 text-white" />
                            ) : (
                              <Volume2 className="w-4 h-4 text-white" />
                            )}
                          </motion.button>
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={toggleFullscreen}
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-1.5 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Maximize2 className="w-4 h-4 text-white" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Video Status Indicator */}
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                          <span className="text-white text-xs font-medium">
                            {isPlaying ? 'Playing' : 'Paused'}
                          </span>
                        </div>
                      </div>

                      {/* Auto-play Indicator */}
                      {!userInteracted && (
                        <div className="absolute top-3 right-3 pointer-events-none">
                          <div className="bg-blush-500/90 backdrop-blur-sm rounded-full px-2 py-1">
                            <span className="text-black text-xs font-medium">
                              Auto-play
                            </span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

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
            <div 
              className="relative bg-black rounded-2xl overflow-hidden shadow-2xl group"
              onMouseEnter={handleMouseEnter2}
              onMouseLeave={handleMouseLeave2}
            >
              {/* YouTube Video Player 2 */}
              <div className="aspect-video relative">
                <div
                  id="youtube-player-2"
                  className="w-full h-full"
                  style={{ border: 0 }}
                />
                
                {/* Custom Video Controls Overlay */}
                <AnimatePresence>
                  {showControls2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
                    >
                      {/* Play/Pause Button - Center */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                        <motion.button
                          onClick={togglePlayPause2}
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300 group"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isPlaying2 ? (
                            <Pause className="w-6 h-6 text-white" />
                          ) : (
                            <Play className="w-6 h-6 text-white ml-1" />
                          )}
                        </motion.button>
                      </div>

                      {/* Bottom Controls */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                        {/* Left Controls */}
                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={togglePlayPause2}
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-1.5 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isPlaying2 ? (
                              <Pause className="w-4 h-4 text-white" />
                            ) : (
                              <Play className="w-4 h-4 text-white ml-0.5" />
                            )}
                          </motion.button>

                          <motion.button
                            onClick={toggleMute2}
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-1.5 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isMuted2 ? (
                              <VolumeX className="w-4 h-4 text-white" />
                            ) : (
                              <Volume2 className="w-4 h-4 text-white" />
                            )}
                          </motion.button>
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={toggleFullscreen2}
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-1.5 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Maximize2 className="w-4 h-4 text-white" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Video Status Indicator */}
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                          <span className="text-white text-xs font-medium">
                            {isPlaying2 ? 'Playing' : 'Paused'}
                          </span>
                        </div>
                      </div>

                      {/* Auto-play Indicator */}
                      {!userInteracted2 && (
                        <div className="absolute top-3 right-3 pointer-events-none">
                          <div className="bg-blush-500/90 backdrop-blur-sm rounded-full px-2 py-1">
                            <span className="text-black text-xs font-medium">
                              Auto-play
                            </span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

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
