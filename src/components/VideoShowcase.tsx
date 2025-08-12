import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import videoFile from '../assets/VIDEO.mp4';

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-['Playfair_Display']">
            Our Story in Motion
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-['EB_Garamond']">
            Experience the magic of our wedding photography and videography through this 
            cinematic showcase. Watch how we capture the essence of love, joy, and celebration 
            in every frame.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative max-w-4xl mx-auto">
          <div 
            className="relative bg-black rounded-2xl overflow-hidden shadow-2xl group"
            onMouseMove={showControlsTemporarily}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => isPlaying && setTimeout(() => setShowControls(false), 2000)}
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              poster="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            >
              <source 
                src={videoFile} 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>

            {/* Play Button Overlay (when paused) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <button
                  onClick={togglePlay}
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-900 rounded-full p-6 transform hover:scale-110 transition-all duration-300 shadow-2xl"
                  aria-label="Play video"
                >
                  <Play className="w-12 h-12 ml-1" fill="currentColor" />
                </button>
              </div>
            )}

            {/* Video Controls */}
            <div 
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Progress Bar */}
              <div 
                className="w-full h-2 bg-white bg-opacity-30 rounded-full mb-4 cursor-pointer group/progress"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full relative transition-all duration-150"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-rose-400 transition-colors duration-200"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" fill="currentColor" />
                    ) : (
                      <Play className="w-6 h-6 ml-1" fill="currentColor" />
                    )}
                  </button>

                  {/* Mute Button */}
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-rose-400 transition-colors duration-200"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>

                  {/* Time Display */}
                  <span className="text-white text-sm font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Fullscreen could be added here */}
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full opacity-20 blur-xl" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-xl" />
        </div>

        {/* Bottom Content */}
        <div className="text-center mt-12">
          <p className="text-gray-600 font-['EB_Garamond'] text-lg mb-8">
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
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-['Playfair_Display']">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-['EB_Garamond']">
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
