import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, ArrowLeft, Filter, Grid3X3, List, X } from "lucide-react";
import { Link } from "react-router-dom";
import NewHeader from "@/components/NewHeader";
import Footer from "@/components/Footer";
import { FadeInText } from "@/components/ui/fade-in-section";

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

interface VideoData {
  id: string;
  title: string;
  description: string;
  category: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  duration: string;
  featured: boolean;
}

// Sample video data fallback (non-home) - ideally fetched from Firestore in future
const sampleVideos: VideoData[] = [
  {
    id: "1",
    title: "Romantic Wedding Ceremony",
    description: "A beautiful outdoor ceremony capturing the most precious moments of love and commitment.",
    category: "Wedding",
    youtubeUrl: "https://www.youtube.com/watch?v=XDp_YjH62B4",
    thumbnailUrl: "/src/assets/image/WEDDING.jpg",
    duration: "3:45",
    featured: true,
  },
  {
    id: "2",
    title: "Corporate Event Highlights",
    description: "Professional coverage of corporate events and business celebrations.",
    category: "Corporate",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "/src/assets/image/CORPORATE.jpg",
    duration: "2:30",
    featured: false,
  },
  {
    id: "3",
    title: "Reception Party Magic",
    description: "The joy and celebration of wedding receptions captured in cinematic style.",
    category: "Reception",
    youtubeUrl: "https://www.youtube.com/watch?v=XDp_YjH62B4",
    thumbnailUrl: "/src/assets/image/RECEPTION.jpg",
    duration: "4:20",
    featured: true,
  },
  {
    id: "4",
    title: "Behind The Scenes",
    description: "A glimpse into our creative process and the making of beautiful memories.",
    category: "BTS",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "/src/assets/image/BTS.jpg",
    duration: "5:15",
    featured: false,
  },
  {
    id: "5",
    title: "Destination Wedding Dreams",
    description: "Exotic locations and breathtaking scenery for the perfect destination wedding.",
    category: "Destination",
    youtubeUrl: "https://www.youtube.com/watch?v=XDp_YjH62B4",
    thumbnailUrl: "/src/assets/image/DESTINATION.jpg",
    duration: "6:30",
    featured: true,
  },
  {
    id: "6",
    title: "Social Media Highlights",
    description: "Quick, engaging content perfect for sharing your special moments.",
    category: "Social",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "/src/assets/image/SOCIAL.jpg",
    duration: "1:45",
    featured: false,
  },
];

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  const playerRef = useRef<YouTubePlayer | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get categories
  const categories = ["All", ...Array.from(new Set(sampleVideos.map(video => video.category)))];

  // Filter videos based on selected category
  const filteredVideos = selectedCategory === "All" 
    ? sampleVideos 
    : sampleVideos.filter(video => video.category === selectedCategory);

  // Extract YouTube video ID
  const getYouTubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "XDp_YjH62B4";
  };

  // Load YouTube Player API
  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        console.log("YouTube API ready");
      };
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // Initialize player when video is selected
  useEffect(() => {
    if (selectedVideo && window.YT && window.YT.Player) {
      const videoId = getYouTubeVideoId(selectedVideo.youtubeUrl);
      
      playerRef.current = new window.YT.Player("video-player", {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: () => {
            setPlayerReady(true);
            setIsPlaying(true);
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
    }
  }, [selectedVideo]);

  // Control functions
  const togglePlayPause = () => {
    if (!playerRef.current) return;
    
    try {
      const currentState = playerRef.current.getPlayerState();
      if (currentState === window.YT.PlayerState.PLAYING) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
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
    const playerElement = document.getElementById('video-player');
    if (playerElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerElement.requestFullscreen();
      }
    }
  };

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

  const closeVideoModal = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }
    setSelectedVideo(null);
    setPlayerReady(false);
    setIsPlaying(false);
  };

  return (
    <>
      <NewHeader />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>

          {/* Page Title */}
          <div className="text-center mb-12">
            <FadeInText
              as="h1"
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-serif"
              delay={0.1}
            >
              Video Gallery
            </FadeInText>
            <FadeInText
              as="p"
              className="text-xl text-gray-600 max-w-3xl mx-auto font-sans"
              delay={0.3}
            >
              Explore our collection of cinematic stories, each crafted with passion and attention to detail. From intimate ceremonies to grand celebrations, witness love in motion.
            </FadeInText>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-rose-500 text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === "grid" ? "bg-rose-500 text-white" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === "list" ? "bg-rose-500 text-white" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Videos Grid/List */}
          <motion.div
            layout
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }
          >
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group cursor-pointer ${
                  viewMode === "list" ? "flex gap-6 bg-white rounded-2xl p-6 shadow-lg" : ""
                }`}
                onClick={() => setSelectedVideo(video)}
              >
                {/* Video Thumbnail */}
                <div className={`relative overflow-hidden rounded-2xl ${
                  viewMode === "list" ? "w-80 flex-shrink-0" : ""
                } ${video.featured ? "ring-2 ring-rose-300" : ""}`}>
                  <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 relative">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>

                    {/* Featured Badge */}
                    {video.featured && (
                      <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                </div>

                {/* Video Info */}
                <div className={`${viewMode === "grid" ? "mt-4" : "flex-1"}`}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif font-bold text-lg text-gray-900 group-hover:text-rose-600 transition-colors duration-300">
                      {video.title}
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">
                      {video.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {video.description.length > 120 
                      ? `${video.description.substring(0, 120)}...` 
                      : video.description
                    }
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Play className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">No videos found</h3>
              <p className="text-gray-600">Try selecting a different category to see more videos.</p>
            </div>
          )}
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeVideoModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-black rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] relative"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Close Button */}
                <button
                  onClick={closeVideoModal}
                  className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Video Player */}
                <div className="aspect-video relative">
                  <div
                    id="video-player"
                    className="w-full h-full"
                  />

                  {/* Custom Controls */}
                  <AnimatePresence>
                    {showControls && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
                      >
                        {/* Center Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                          <motion.button
                            onClick={togglePlayPause}
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-4 transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isPlaying ? (
                              <Pause className="w-8 h-8 text-white" />
                            ) : (
                              <Play className="w-8 h-8 text-white ml-1" />
                            )}
                          </motion.button>
                        </div>

                        {/* Bottom Controls */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                          <div className="flex items-center gap-3">
                            <motion.button
                              onClick={togglePlayPause}
                              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                            >
                              {isPlaying ? (
                                <Pause className="w-5 h-5 text-white" />
                              ) : (
                                <Play className="w-5 h-5 text-white ml-0.5" />
                              )}
                            </motion.button>

                            <motion.button
                              onClick={toggleMute}
                              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                            >
                              {isMuted ? (
                                <VolumeX className="w-5 h-5 text-white" />
                              ) : (
                                <Volume2 className="w-5 h-5 text-white" />
                              )}
                            </motion.button>
                          </div>

                          <motion.button
                            onClick={toggleFullscreen}
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Maximize2 className="w-5 h-5 text-white" />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Loading State */}
                  {!playerReady && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-6 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-gray-300 mb-3">
                    {selectedVideo.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="bg-rose-500 text-white text-sm px-3 py-1 rounded-full">
                      {selectedVideo.category}
                    </span>
                    <span className="text-gray-400 text-sm">
                      Duration: {selectedVideo.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </>
  );
};

export default VideoGallery;
