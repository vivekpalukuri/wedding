import React, { useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { weddingConfig, getYouTubeId } from '../utils/config';

export default function MusicPlayer({ isMuted, toggleAudio, isOpened }) {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  // Extract valid 11-char YouTube ID from config
  const videoId = getYouTubeId(weddingConfig.backgroundMusicUrl) || 'm-RiOAOfCGs';

  const sendIframeCommand = (command, args = []) => {
    if (iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: command, args }),
          '*'
        );
      } catch (e) {}
    }
  };

  const playMusic = () => {
    sendIframeCommand('unMute');
    sendIframeCommand('setVolume', [90]);
    sendIframeCommand('playVideo');

    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      try {
        playerRef.current.unMute();
        playerRef.current.setVolume(90);
        playerRef.current.playVideo();
      } catch (e) {}
    }
  };

  const pauseMusic = () => {
    sendIframeCommand('pauseVideo');

    if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
      try {
        playerRef.current.pauseVideo();
      } catch (e) {}
    }
  };

  // Sync with isMuted and isOpened state changes
  useEffect(() => {
    if (isOpened && !isMuted) {
      playMusic();
    } else if (isOpened && isMuted) {
      pauseMusic();
    }
  }, [isMuted, isOpened]);

  // Lifecycle audio management: Pause playback when tab is hidden, resume when visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        pauseMusic();
      } else if (document.visibilityState === 'visible' && isOpened && !isMuted) {
        playMusic();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isOpened, isMuted]);

  // Pre-load YouTube iframe API from page start so audio is pre-buffered for mobile gestures
  useEffect(() => {
    const initYT = () => {
      if (window.YT && window.YT.Player && !playerRef.current) {
        playerRef.current = new window.YT.Player('wedding-bg-music-player', {
          events: {
            onReady: (event) => {
              if (isOpened && !isMuted) {
                event.target.unMute();
                event.target.setVolume(90);
                event.target.playVideo();
              }
            },
          },
        });
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initYT;
    } else {
      initYT();
    }
  }, []);

  return (
    <>
      {/* Background Audio Source - Pre-mounted from initial page load for instantaneous mobile playback */}
      <div className="fixed top-0 left-0 w-1 h-1 opacity-0 pointer-events-none overflow-hidden z-[-1]">
        <iframe
          id="wedding-bg-music-player"
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&mute=0&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1&origin=${typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : ''}&widget_referrer=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
          title="Wedding Celebration Song"
          allow="autoplay; encrypted-media"
          className="w-full h-full border-0"
        />
      </div>

      {/* Interactive Compact Music Pill Button (Visible once invitation is opened) */}
      {isOpened && (
        <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-6 z-40">
          <button
            onClick={toggleAudio}
            type="button"
            className="group flex items-center justify-start gap-2 bg-[#3A0303]/95 hover:bg-[#4E0404] backdrop-blur-md border-2 border-[#FFD700] text-[#FFF8E7] px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.6)] transition-all hover:scale-105 active:scale-95 cursor-pointer select-none w-[96px] sm:w-[106px]"
            title={isMuted ? 'Click to Play Wedding Song' : 'Click to Pause Wedding Song'}
            aria-label={isMuted ? 'Play Wedding Song' : 'Pause Wedding Song'}
          >
            {/* Gold Round Icon Badge */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFD700] text-[#3A0303] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform shrink-0">
              {isMuted ? (
                <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-[#3A0303] translate-x-0.5" />
              ) : (
                <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-[#3A0303]" />
              )}
            </div>

            {/* Compact Text */}
            <span className="font-sans-clean text-[10px] sm:text-[11px] uppercase tracking-wider text-[#FFD700] font-bold leading-none truncate">
              {isMuted ? 'Music 🎵' : 'Music 🎶'}
            </span>
          </button>
        </div>
      )}
    </>
  );
}
