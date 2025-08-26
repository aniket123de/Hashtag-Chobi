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

export interface YouTubePlayer {
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  getPlayerState(): number;
  destroy(): void;
  getIframe(): HTMLIFrameElement;
}

export interface VideoData {
  id: string;
  title: string;
  description: string;
  category: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  duration: string;
  featured: boolean;
}

// This export is required for the global declaration to work
export {};
