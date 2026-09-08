import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Play, Pause, Video, ChevronDown, ChevronUp, Music, Volume2, VolumeX } from 'lucide-react';

export default function AnimatedTraditionalMusicians() {
  const [minimized, setMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeBeat, setActiveBeat] = useState(null);

  const handleMusiciansTap = () => {
    setActiveBeat('Dhak Dhak Dhak! 🥁 Royal Wedding Dhol Beats');

    // Fire golden celebration confetti burst
    confetti({
      particleCount: 35,
      spread: 75,
      origin: { x: 0.85, y: 0.85 },
      colors: ['#FFD700', '#D4AF37', '#FFA500', '#FF4500'],
      ticks: 120,
    });

    setTimeout(() => {
      setActiveBeat(null);
    }, 2500);
  };

  return (
    <div className="fixed bottom-3 right-4 sm:right-8 z-40 flex flex-col items-end pointer-events-none">
      {/* Active Rhythm Note Toast Banner */}
      <AnimatePresence>
        {activeBeat && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="pointer-events-auto mb-2 px-5 py-2 rounded-full bg-[#3A0303]/95 text-[#FFD700] border-2 border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.5)] backdrop-blur-md font-sans-clean text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <Video className="w-3.5 h-3.5 text-[#FFD700] animate-pulse" />
            <span className="text-white italic">{activeBeat}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Real Dhol Players Video Loop Container (YouTube Shorts IlgGGiPrvJA) */}
      {!minimized && (
        <div className="relative pointer-events-auto flex flex-col items-center">
          {/* Live Video Indicator Pill Badge */}
          <div className="mb-1.5 flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D0202]/90 text-[#FFD700] border border-[#D4AF37]/60 backdrop-blur-md text-[10px] font-sans-clean uppercase tracking-widest font-bold shadow-lg z-20">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <Video className="w-3 h-3 text-[#FFD700]" />
            <span>Real Dhol Musicians Live Video</span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="ml-1 text-white hover:text-[#FFD700] transition-colors"
              title={isPlaying ? 'Pause Video' : 'Play Video'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Floating Musical Notes Animation overhead */}
          {isPlaying && (
            <div className="absolute -top-12 inset-x-0 flex justify-around pointer-events-none z-20">
              {['🎵', '🎶', '🥁', '🪘', '✨'].map((note, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -30, -60],
                    opacity: [0, 1, 0],
                    x: [0, i % 2 === 0 ? 12 : -12, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: 'easeOut',
                  }}
                  className="text-base font-bold text-[#FFD700] drop-shadow-[0_2px_10px_rgba(255,215,0,0.8)]"
                >
                  {note}
                </motion.span>
              ))}
            </div>
          )}

          {/* Real Dhol Musician Video Container (YouTube Shorts Embed IlgGGiPrvJA) */}
          <motion.div
            onClick={handleMusiciansTap}
            animate={
              isPlaying
                ? {
                    y: [0, -3, 0, -2, 0],
                    scale: [1, 1.01, 1],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="cursor-pointer relative w-48 sm:w-56 h-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-[#FFD700] shadow-[0_10px_30px_rgba(0,0,0,0.7)] bg-black transition-transform hover:scale-105"
            title="Tap to trigger celebration beats!"
          >
            {/* Embedded Live Video */}
            {isPlaying && (
              <iframe
                src={`https://www.youtube.com/embed/IlgGGiPrvJA?autoplay=1&mute=${isMuted ? '1' : '0'}&loop=1&playlist=IlgGGiPrvJA&controls=0&modestbranding=1&rel=0&enablejsapi=1&origin=${typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : ''}`}
                title="Real Traditional Dhol Musicians Live Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full border-0 pointer-events-none scale-125 mix-blend-screen"
                style={{
                  filter: 'contrast(1.1) brightness(1.05)',
                }}
              />
            )}

            {/* Glowing Golden Arch Frame Overlay */}
            <div className="absolute inset-0 border-2 border-[#FFD700]/50 rounded-2xl pointer-events-none shadow-inner" />

            {/* Tap for Beats Overlay Button */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-[#FFD700]/50 text-[#FFD700] text-[9px] font-sans-clean font-bold uppercase tracking-wider flex items-center gap-1 opacity-90 hover:opacity-100">
              <Sparkles className="w-3 h-3 text-[#FFD700]" />
              <span>Tap for Beats</span>
            </div>
          </motion.div>
        </div>
      )}

      {/* Floating Minimize / Toggle Badge */}
      <button
        onClick={() => setMinimized(!minimized)}
        className="pointer-events-auto mt-1 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#3A0303]/90 text-[#FFD700] border border-[#D4AF37]/60 shadow-xl text-[10px] font-sans-clean uppercase tracking-widest font-bold hover:bg-[#D4AF37] hover:text-[#210202] transition-colors"
      >
        <Sparkles className="w-3 h-3 text-[#FFD700]" />
        <span>{minimized ? 'Show Dhol Video' : 'Hide Dhol Video'}</span>
        {minimized ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
    </div>
  );
}
